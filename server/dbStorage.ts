import {
  eq, and, or, desc, asc, gt, ilike, count, inArray,
} from "drizzle-orm";
import {
  users, posts, comments, reactions, events, eventRsvps, groups, groupMembers,
} from "@shared/schema";
import type {
  User, InsertUser, FeedPost, Comment, Reaction,
  FeedEvent, EventRsvp, Group, GroupMember,
} from "@shared/schema";
import type { IStorage, PostWithMeta, EventWithMeta, GroupWithMeta } from "./storage";
import type { DB } from "./db";

export class DatabaseStorage implements IStorage {
  private _userName = "";

  constructor(private db: DB) {}

  setUserName(name: string) { this._userName = name; }

  // ── Users ──────────────────────────────────────────────

  async getUser(id: string) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string) {
    const [user] = await this.db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(data: InsertUser): Promise<User> {
    const [user] = await this.db.insert(users).values(data).returning();
    return user;
  }

  // ── Posts ───────────────────────────────────────────────

  async getPosts(opts: {
    category?: string; search?: string; groupId?: string;
    limit?: number; offset?: number; sort?: "latest" | "oldest";
  }): Promise<{ posts: PostWithMeta[]; total: number }> {
    const { category, search, groupId, limit = 20, offset = 0, sort = "latest" } = opts;

    const conditions = [];
    if (category && category !== "all") conditions.push(eq(posts.category, category));
    if (groupId) conditions.push(eq(posts.groupId, groupId));
    if (search) {
      const q = `%${search}%`;
      const searchCond = or(ilike(posts.content, q), ilike(posts.authorName, q));
      if (searchCond) conditions.push(searchCond);
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [{ total }] = await this.db
      .select({ total: count() }).from(posts).where(where);

    const timeOrder = sort === "oldest" ? asc(posts.createdAt) : desc(posts.createdAt);
    const rows = await this.db.select().from(posts)
      .where(where)
      .orderBy(desc(posts.pinned), timeOrder)
      .limit(limit)
      .offset(offset);

    if (rows.length === 0) return { posts: [], total: Number(total) };

    const postIds = rows.map(p => p.id);
    const allReactions = await this.db.select().from(reactions)
      .where(inArray(reactions.postId, postIds));
    const commentCounts = await this.db
      .select({ postId: comments.postId, cnt: count() })
      .from(comments)
      .where(inArray(comments.postId, postIds))
      .groupBy(comments.postId);

    const reactionsByPost = new Map<string, Reaction[]>();
    for (const r of allReactions) {
      if (!reactionsByPost.has(r.postId)) reactionsByPost.set(r.postId, []);
      reactionsByPost.get(r.postId)!.push(r);
    }
    const commentCountMap = new Map(commentCounts.map(c => [c.postId, Number(c.cnt)]));

    const enriched: PostWithMeta[] = rows.map(p => {
      const postReactions = reactionsByPost.get(p.id) || [];
      const counts: Record<string, number> = {};
      const userR: string[] = [];
      for (const r of postReactions) {
        counts[r.type] = (counts[r.type] || 0) + 1;
        if (r.userName === this._userName) userR.push(r.type);
      }
      return { ...p, reactions: counts, userReactions: userR, commentCount: commentCountMap.get(p.id) || 0 };
    });

    return { posts: enriched, total: Number(total) };
  }

  async getPost(id: string): Promise<PostWithMeta | undefined> {
    const [p] = await this.db.select().from(posts).where(eq(posts.id, id));
    if (!p) return undefined;
    return this.enrichPost(p);
  }

  async createPost(data: Omit<FeedPost, "id" | "createdAt">): Promise<FeedPost> {
    const [post] = await this.db.insert(posts).values(data).returning();
    return post;
  }

  async deletePost(id: string) {
    const existing = await this.db.select({ id: posts.id }).from(posts).where(eq(posts.id, id));
    if (existing.length === 0) return false;
    await this.db.delete(comments).where(eq(comments.postId, id));
    await this.db.delete(reactions).where(eq(reactions.postId, id));
    await this.db.delete(posts).where(eq(posts.id, id));
    return true;
  }

  async togglePin(id: string) {
    const [p] = await this.db.select().from(posts).where(eq(posts.id, id));
    if (!p) return undefined;
    const [updated] = await this.db.update(posts)
      .set({ pinned: !p.pinned })
      .where(eq(posts.id, id))
      .returning();
    return updated;
  }

  private async enrichPost(p: FeedPost): Promise<PostWithMeta> {
    const postReactions = await this.db.select().from(reactions).where(eq(reactions.postId, p.id));
    const counts: Record<string, number> = {};
    const userR: string[] = [];
    for (const r of postReactions) {
      counts[r.type] = (counts[r.type] || 0) + 1;
      if (r.userName === this._userName) userR.push(r.type);
    }
    const [{ commentCount }] = await this.db
      .select({ commentCount: count() }).from(comments).where(eq(comments.postId, p.id));
    return { ...p, reactions: counts, userReactions: userR, commentCount: Number(commentCount) };
  }

  // ── Comments ───────────────────────────────────────────

  async getComments(postId: string): Promise<Comment[]> {
    return this.db.select().from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(asc(comments.createdAt));
  }

  async createComment(data: Omit<Comment, "id" | "createdAt">): Promise<Comment> {
    const [comment] = await this.db.insert(comments).values(data).returning();
    return comment;
  }

  async deleteComment(id: string) {
    const result = await this.db.delete(comments).where(eq(comments.id, id)).returning();
    return result.length > 0;
  }

  // ── Reactions ──────────────────────────────────────────

  async addReaction(postId: string, userName: string, type: string): Promise<Reaction> {
    const [existing] = await this.db.select().from(reactions)
      .where(and(eq(reactions.postId, postId), eq(reactions.userName, userName), eq(reactions.type, type)));
    if (existing) return existing;
    const [reaction] = await this.db.insert(reactions).values({ postId, userName, type }).returning();
    return reaction;
  }

  async removeReaction(postId: string, userName: string, type: string) {
    const result = await this.db.delete(reactions)
      .where(and(eq(reactions.postId, postId), eq(reactions.userName, userName), eq(reactions.type, type)))
      .returning();
    return result.length > 0;
  }

  // ── Events ─────────────────────────────────────────────

  async getEvents(opts = {} as { category?: string; upcoming?: boolean }): Promise<EventWithMeta[]> {
    const conditions = [];
    if (opts.category && opts.category !== "all") conditions.push(eq(events.category, opts.category));
    if (opts.upcoming) conditions.push(gt(events.startDate, new Date()));

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const rows = await this.db.select().from(events).where(where).orderBy(asc(events.startDate));
    return Promise.all(rows.map(e => this.enrichEvent(e)));
  }

  async getEvent(id: string): Promise<EventWithMeta | undefined> {
    const [e] = await this.db.select().from(events).where(eq(events.id, id));
    return e ? this.enrichEvent(e) : undefined;
  }

  async createEvent(data: Omit<FeedEvent, "id" | "createdAt">): Promise<FeedEvent> {
    const [event] = await this.db.insert(events).values(data).returning();
    return event;
  }

  async deleteEvent(id: string) {
    const existing = await this.db.select({ id: events.id }).from(events).where(eq(events.id, id));
    if (existing.length === 0) return false;
    await this.db.delete(eventRsvps).where(eq(eventRsvps.eventId, id));
    await this.db.delete(events).where(eq(events.id, id));
    return true;
  }

  async rsvpEvent(eventId: string, userName: string, status: string): Promise<EventRsvp> {
    await this.db.delete(eventRsvps)
      .where(and(eq(eventRsvps.eventId, eventId), eq(eventRsvps.userName, userName)));
    const [rsvp] = await this.db.insert(eventRsvps).values({ eventId, userName, status }).returning();
    return rsvp;
  }

  async cancelRsvp(eventId: string, userName: string) {
    const result = await this.db.delete(eventRsvps)
      .where(and(eq(eventRsvps.eventId, eventId), eq(eventRsvps.userName, userName)))
      .returning();
    return result.length > 0;
  }

  private async enrichEvent(e: FeedEvent): Promise<EventWithMeta> {
    const rsvps = await this.db.select().from(eventRsvps).where(eq(eventRsvps.eventId, e.id));
    const counts: Record<string, number> = {};
    let userRsvp: string | null = null;
    const attendees: string[] = [];
    for (const r of rsvps) {
      counts[r.status] = (counts[r.status] || 0) + 1;
      if (r.userName === this._userName) userRsvp = r.status;
      if (r.status === "going") attendees.push(r.userName);
    }
    return { ...e, rsvpCounts: counts, userRsvp, attendees };
  }

  // ── Groups ─────────────────────────────────────────────

  async getGroups(opts = {} as { category?: string; search?: string }): Promise<GroupWithMeta[]> {
    const conditions = [];
    if (opts.category && opts.category !== "all") conditions.push(eq(groups.category, opts.category));
    if (opts.search) {
      const q = `%${opts.search}%`;
      const searchCond = or(ilike(groups.name, q), ilike(groups.description, q));
      if (searchCond) conditions.push(searchCond);
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const rows = await this.db.select().from(groups).where(where).orderBy(desc(groups.createdAt));
    return Promise.all(rows.map(g => this.enrichGroup(g)));
  }

  async getGroup(id: string): Promise<GroupWithMeta | undefined> {
    const [g] = await this.db.select().from(groups).where(eq(groups.id, id));
    return g ? this.enrichGroup(g) : undefined;
  }

  async createGroup(data: Omit<Group, "id" | "createdAt">): Promise<Group> {
    const [group] = await this.db.insert(groups).values(data).returning();
    await this.db.insert(groupMembers).values({
      groupId: group.id, userName: data.creatorName, role: "admin",
    });
    return group;
  }

  async updateGroup(id: string, data: Partial<Pick<Group, "name" | "description" | "category" | "type" | "imageUrl">>) {
    const result = await this.db.update(groups).set(data).where(eq(groups.id, id)).returning();
    return result[0];
  }

  async deleteGroup(id: string) {
    const existing = await this.db.select({ id: groups.id }).from(groups).where(eq(groups.id, id));
    if (existing.length === 0) return false;
    await this.db.delete(groupMembers).where(eq(groupMembers.groupId, id));
    await this.db.update(posts).set({ groupId: null }).where(eq(posts.groupId, id));
    await this.db.delete(groups).where(eq(groups.id, id));
    return true;
  }

  async joinGroup(groupId: string, userName: string, role = "member"): Promise<GroupMember> {
    const [existing] = await this.db.select().from(groupMembers)
      .where(and(eq(groupMembers.groupId, groupId), eq(groupMembers.userName, userName)));
    if (existing) return existing;
    const [member] = await this.db.insert(groupMembers).values({ groupId, userName, role }).returning();
    return member;
  }

  async leaveGroup(groupId: string, userName: string) {
    const result = await this.db.delete(groupMembers)
      .where(and(eq(groupMembers.groupId, groupId), eq(groupMembers.userName, userName)))
      .returning();
    return result.length > 0;
  }

  async updateMemberRole(groupId: string, userName: string, role: string) {
    const result = await this.db.update(groupMembers)
      .set({ role })
      .where(and(eq(groupMembers.groupId, groupId), eq(groupMembers.userName, userName)))
      .returning();
    return result[0];
  }

  async getGroupMembers(groupId: string): Promise<GroupMember[]> {
    return this.db.select().from(groupMembers).where(eq(groupMembers.groupId, groupId));
  }

  private async enrichGroup(g: Group): Promise<GroupWithMeta> {
    const members = await this.db.select().from(groupMembers).where(eq(groupMembers.groupId, g.id));
    const userMember = members.find(m => m.userName === this._userName);
    return { ...g, memberCount: members.length, isMember: !!userMember, userRole: userMember?.role ?? null };
  }

  // ── Stats ──────────────────────────────────────────────

  async getStats() {
    const [{ postCount }] = await this.db.select({ postCount: count() }).from(posts);
    const [{ eventCount }] = await this.db.select({ eventCount: count() }).from(events);
    const [{ groupCount }] = await this.db.select({ groupCount: count() }).from(groups);

    const postAuthors = await this.db.selectDistinct({ name: posts.authorName }).from(posts);
    const memberNames = await this.db.selectDistinct({ name: groupMembers.userName }).from(groupMembers);
    const unique = new Set([...postAuthors.map(a => a.name), ...memberNames.map(m => m.name)]);

    return {
      posts: Number(postCount),
      events: Number(eventCount),
      groups: Number(groupCount),
      members: unique.size,
    };
  }
}
