import type {
  User, InsertUser,
  FeedPost, Comment, Reaction,
  FeedEvent, EventRsvp,
  Group, GroupMember,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { DatabaseStorage } from "./dbStorage";

export interface IStorage {
  setUserName(name: string): void;
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Posts
  getPosts(opts: { category?: string; search?: string; groupId?: string; limit?: number; offset?: number }): Promise<{ posts: PostWithMeta[]; total: number }>;
  getPost(id: string, userName?: string): Promise<PostWithMeta | undefined>;
  createPost(data: Omit<FeedPost, "id" | "createdAt">): Promise<FeedPost>;
  deletePost(id: string): Promise<boolean>;
  togglePin(id: string): Promise<FeedPost | undefined>;
  // Comments
  getComments(postId: string): Promise<Comment[]>;
  createComment(data: Omit<Comment, "id" | "createdAt">): Promise<Comment>;
  deleteComment(id: string): Promise<boolean>;
  // Reactions
  addReaction(postId: string, userName: string, type: string): Promise<Reaction>;
  removeReaction(postId: string, userName: string, type: string): Promise<boolean>;
  // Events
  getEvents(opts?: { category?: string; upcoming?: boolean }): Promise<EventWithMeta[]>;
  getEvent(id: string): Promise<EventWithMeta | undefined>;
  createEvent(data: Omit<FeedEvent, "id" | "createdAt">): Promise<FeedEvent>;
  deleteEvent(id: string): Promise<boolean>;
  rsvpEvent(eventId: string, userName: string, status: string): Promise<EventRsvp>;
  cancelRsvp(eventId: string, userName: string): Promise<boolean>;
  // Groups
  getGroups(opts?: { category?: string; search?: string }): Promise<GroupWithMeta[]>;
  getGroup(id: string): Promise<GroupWithMeta | undefined>;
  createGroup(data: Omit<Group, "id" | "createdAt">): Promise<Group>;
  updateGroup(id: string, data: Partial<Pick<Group, "name" | "description" | "category" | "type" | "imageUrl">>): Promise<Group | undefined>;
  deleteGroup(id: string): Promise<boolean>;
  joinGroup(groupId: string, userName: string, role?: string): Promise<GroupMember>;
  leaveGroup(groupId: string, userName: string): Promise<boolean>;
  updateMemberRole(groupId: string, userName: string, role: string): Promise<GroupMember | undefined>;
  getGroupMembers(groupId: string): Promise<GroupMember[]>;
  // Stats
  getStats(): Promise<{ posts: number; events: number; groups: number; members: number }>;
}

export interface PostWithMeta extends FeedPost {
  reactions: Record<string, number>;
  userReactions: string[];
  commentCount: number;
}

export interface EventWithMeta extends FeedEvent {
  rsvpCounts: Record<string, number>;
  userRsvp: string | null;
  attendees: string[];
}

export interface GroupWithMeta extends Group {
  memberCount: number;
  isMember: boolean;
  userRole: string | null;
}

function ago(hours: number): Date {
  return new Date(Date.now() - hours * 3600_000);
}
function future(hours: number): Date {
  return new Date(Date.now() + hours * 3600_000);
}
function avatar(name: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private _posts: Map<string, FeedPost> = new Map();
  private _comments: Map<string, Comment> = new Map();
  private _reactions: Map<string, Reaction> = new Map();
  private _events: Map<string, FeedEvent> = new Map();
  private _rsvps: Map<string, EventRsvp> = new Map();
  private _groups: Map<string, Group> = new Map();
  private _members: Map<string, GroupMember> = new Map();
  private _userName = "";

  constructor() {
    this.seed();
  }

  setUserName(name: string) { this._userName = name; }

  // ── Users ──────────────────────────────────────────────
  async getUser(id: string) { return this.users.get(id); }
  async getUserByUsername(username: string) {
    return [...this.users.values()].find(u => u.username === username);
  }
  async createUser(data: InsertUser): Promise<User> {
    const user: User = { ...data, id: randomUUID() };
    this.users.set(user.id, user);
    return user;
  }

  // ── Posts ───────────────────────────────────────────────
  async getPosts({ category, search, groupId, limit = 20, offset = 0 }: {
    category?: string; search?: string; groupId?: string; limit?: number; offset?: number;
  }): Promise<{ posts: PostWithMeta[]; total: number }> {
    let arr = [...this._posts.values()];
    if (category && category !== "all") arr = arr.filter(p => p.category === category);
    if (groupId) arr = arr.filter(p => p.groupId === groupId);
    if (search) {
      const q = search.toLowerCase();
      arr = arr.filter(p => p.content.toLowerCase().includes(q) || p.authorName.toLowerCase().includes(q));
    }
    arr.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    const total = arr.length;
    const sliced = arr.slice(offset, offset + limit);
    return { posts: sliced.map(p => this.enrichPost(p)), total };
  }

  async getPost(id: string): Promise<PostWithMeta | undefined> {
    const p = this._posts.get(id);
    return p ? this.enrichPost(p) : undefined;
  }

  async createPost(data: Omit<FeedPost, "id" | "createdAt">): Promise<FeedPost> {
    const post: FeedPost = { ...data, id: randomUUID(), createdAt: new Date() };
    this._posts.set(post.id, post);
    return post;
  }

  async deletePost(id: string) {
    if (!this._posts.has(id)) return false;
    this._posts.delete(id);
    for (const [k, c] of this._comments) if (c.postId === id) this._comments.delete(k);
    for (const [k, r] of this._reactions) if (r.postId === id) this._reactions.delete(k);
    return true;
  }

  async togglePin(id: string) {
    const p = this._posts.get(id);
    if (!p) return undefined;
    p.pinned = !p.pinned;
    return p;
  }

  private enrichPost(p: FeedPost): PostWithMeta {
    const postReactions = [...this._reactions.values()].filter(r => r.postId === p.id);
    const counts: Record<string, number> = {};
    const userR: string[] = [];
    for (const r of postReactions) {
      counts[r.type] = (counts[r.type] || 0) + 1;
      if (r.userName === this._userName) userR.push(r.type);
    }
    const commentCount = [...this._comments.values()].filter(c => c.postId === p.id).length;
    return { ...p, reactions: counts, userReactions: userR, commentCount };
  }

  // ── Comments ───────────────────────────────────────────
  async getComments(postId: string): Promise<Comment[]> {
    return [...this._comments.values()]
      .filter(c => c.postId === postId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createComment(data: Omit<Comment, "id" | "createdAt">): Promise<Comment> {
    const comment: Comment = { ...data, id: randomUUID(), createdAt: new Date() };
    this._comments.set(comment.id, comment);
    return comment;
  }

  async deleteComment(id: string) {
    return this._comments.delete(id);
  }

  // ── Reactions ──────────────────────────────────────────
  async addReaction(postId: string, userName: string, type: string): Promise<Reaction> {
    const existing = [...this._reactions.values()].find(
      r => r.postId === postId && r.userName === userName && r.type === type
    );
    if (existing) return existing;
    const reaction: Reaction = { id: randomUUID(), postId, userName, type, createdAt: new Date() };
    this._reactions.set(reaction.id, reaction);
    return reaction;
  }

  async removeReaction(postId: string, userName: string, type: string) {
    for (const [k, r] of this._reactions) {
      if (r.postId === postId && r.userName === userName && r.type === type) {
        this._reactions.delete(k);
        return true;
      }
    }
    return false;
  }

  // ── Events ─────────────────────────────────────────────
  async getEvents({ category, upcoming } = {} as { category?: string; upcoming?: boolean }): Promise<EventWithMeta[]> {
    let arr = [...this._events.values()];
    if (category && category !== "all") arr = arr.filter(e => e.category === category);
    if (upcoming) arr = arr.filter(e => e.startDate.getTime() > Date.now());
    arr.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    return arr.map(e => this.enrichEvent(e));
  }

  async getEvent(id: string): Promise<EventWithMeta | undefined> {
    const e = this._events.get(id);
    return e ? this.enrichEvent(e) : undefined;
  }

  async createEvent(data: Omit<FeedEvent, "id" | "createdAt">): Promise<FeedEvent> {
    const event: FeedEvent = { ...data, id: randomUUID(), createdAt: new Date() };
    this._events.set(event.id, event);
    return event;
  }

  async deleteEvent(id: string) {
    if (!this._events.has(id)) return false;
    this._events.delete(id);
    for (const [k, r] of this._rsvps) if (r.eventId === id) this._rsvps.delete(k);
    return true;
  }

  async rsvpEvent(eventId: string, userName: string, status: string): Promise<EventRsvp> {
    for (const [k, r] of this._rsvps) {
      if (r.eventId === eventId && r.userName === userName) this._rsvps.delete(k);
    }
    const rsvp: EventRsvp = { id: randomUUID(), eventId, userName, status, createdAt: new Date() };
    this._rsvps.set(rsvp.id, rsvp);
    return rsvp;
  }

  async cancelRsvp(eventId: string, userName: string) {
    for (const [k, r] of this._rsvps) {
      if (r.eventId === eventId && r.userName === userName) { this._rsvps.delete(k); return true; }
    }
    return false;
  }

  private enrichEvent(e: FeedEvent): EventWithMeta {
    const rsvps = [...this._rsvps.values()].filter(r => r.eventId === e.id);
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
  async getGroups({ category, search } = {} as { category?: string; search?: string }): Promise<GroupWithMeta[]> {
    let arr = [...this._groups.values()];
    if (category && category !== "all") arr = arr.filter(g => g.category === category);
    if (search) {
      const q = search.toLowerCase();
      arr = arr.filter(g => g.name.toLowerCase().includes(q) || (g.description ?? "").toLowerCase().includes(q));
    }
    arr.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return arr.map(g => this.enrichGroup(g));
  }

  async getGroup(id: string): Promise<GroupWithMeta | undefined> {
    const g = this._groups.get(id);
    return g ? this.enrichGroup(g) : undefined;
  }

  async createGroup(data: Omit<Group, "id" | "createdAt">): Promise<Group> {
    const group: Group = { ...data, id: randomUUID(), createdAt: new Date() };
    this._groups.set(group.id, group);
    const member: GroupMember = { id: randomUUID(), groupId: group.id, userName: data.creatorName, role: "admin", joinedAt: new Date() };
    this._members.set(member.id, member);
    return group;
  }

  async updateGroup(id: string, data: Partial<Pick<Group, "name" | "description" | "category" | "type" | "imageUrl">>) {
    const g = this._groups.get(id);
    if (!g) return undefined;
    Object.assign(g, data);
    return g;
  }

  async deleteGroup(id: string) {
    if (!this._groups.has(id)) return false;
    this._groups.delete(id);
    for (const [k, m] of this._members) if (m.groupId === id) this._members.delete(k);
    for (const p of this._posts.values()) if (p.groupId === id) p.groupId = null;
    return true;
  }

  async joinGroup(groupId: string, userName: string, role = "member"): Promise<GroupMember> {
    const existing = [...this._members.values()].find(m => m.groupId === groupId && m.userName === userName);
    if (existing) return existing;
    const member: GroupMember = { id: randomUUID(), groupId, userName, role, joinedAt: new Date() };
    this._members.set(member.id, member);
    return member;
  }

  async leaveGroup(groupId: string, userName: string) {
    for (const [k, m] of this._members) {
      if (m.groupId === groupId && m.userName === userName) { this._members.delete(k); return true; }
    }
    return false;
  }

  async updateMemberRole(groupId: string, userName: string, role: string) {
    const m = [...this._members.values()].find(x => x.groupId === groupId && x.userName === userName);
    if (!m) return undefined;
    (m as any).role = role;
    return m;
  }

  async getGroupMembers(groupId: string): Promise<GroupMember[]> {
    return [...this._members.values()].filter(m => m.groupId === groupId);
  }

  private enrichGroup(g: Group): GroupWithMeta {
    const members = [...this._members.values()].filter(m => m.groupId === g.id);
    const userMember = members.find(m => m.userName === this._userName);
    return { ...g, memberCount: members.length, isMember: !!userMember, userRole: userMember?.role ?? null };
  }

  // ── Stats ──────────────────────────────────────────────
  async getStats() {
    const uniqueMembers = new Set<string>();
    for (const p of this._posts.values()) uniqueMembers.add(p.authorName);
    for (const m of this._members.values()) uniqueMembers.add(m.userName);
    return {
      posts: this._posts.size,
      events: this._events.size,
      groups: this._groups.size,
      members: uniqueMembers.size,
    };
  }

  // ── Seed Data ──────────────────────────────────────────
  private seed() {
    const groups: Omit<Group, "createdAt">[] = [
      { id: "g1", name: "Climate Reality Project", description: "Grassroots movement for climate solutions across communities worldwide.", category: "policy", type: "open", imageUrl: null, creatorName: "Maria Santos" },
      { id: "g2", name: "Renewable Energy Enthusiasts", description: "Sharing breakthroughs, installations, and tips for clean energy adoption.", category: "energy", type: "open", imageUrl: null, creatorName: "Alex Chen" },
      { id: "g3", name: "Ocean Conservation Network", description: "Protecting marine ecosystems through research, advocacy, and direct action.", category: "nature", type: "open", imageUrl: null, creatorName: "Kai Nakamura" },
      { id: "g4", name: "Sustainable Food Systems", description: "Building regenerative agriculture and equitable food networks.", category: "food", type: "open", imageUrl: null, creatorName: "Priya Sharma" },
      { id: "g5", name: "Green Tech Innovators", description: "Engineers and entrepreneurs developing climate technology solutions.", category: "technology", type: "open", imageUrl: null, creatorName: "Jordan Miller" },
    ];
    for (const g of groups) this._groups.set(g.id, { ...g, createdAt: ago(200 + Math.random() * 500) });

    const memberSeed: [string, string, string][] = [
      ["g1", "Maria Santos", "admin"], ["g1", "Alex Chen", "member"], ["g1", "Lena Müller", "moderator"],
      ["g2", "Alex Chen", "admin"], ["g2", "Jordan Miller", "member"], ["g2", "Sofia Rossi", "member"], ["g2", "Priya Sharma", "member"],
      ["g3", "Kai Nakamura", "admin"], ["g3", "Olivia Johnson", "member"], ["g3", "Lena Müller", "member"],
      ["g4", "Priya Sharma", "admin"], ["g4", "Maria Santos", "member"], ["g4", "Aisha Okafor", "member"],
      ["g5", "Jordan Miller", "admin"], ["g5", "Alex Chen", "member"], ["g5", "Kai Nakamura", "member"],
    ];
    for (const [gid, name, role] of memberSeed) {
      const m: GroupMember = { id: randomUUID(), groupId: gid, userName: name, role, joinedAt: ago(100 + Math.random() * 400) };
      this._members.set(m.id, m);
    }

    const postSeed: Omit<FeedPost, "id" | "createdAt">[] = [
      { authorName: "Alex Chen", authorAvatar: avatar("Alex Chen"), content: "Our community solar project just reached 500kW capacity! This means clean energy for over 200 households. Three years of organizing, permitting, and building — and it's finally paying off. Next milestone: 1MW by end of year. #CommunitySolar #CleanEnergy", imageUrl: null, category: "energy", pinned: true, groupId: "g2" },
      { authorName: "Kai Nakamura", authorAvatar: avatar("Kai Nakamura"), content: "New research from our team: Kelp forests in the Pacific Northwest are absorbing 20x more CO₂ per hectare than previously estimated. The implications for blue carbon credits are enormous. Paper dropping next week in Nature Climate Change.", imageUrl: null, category: "nature", pinned: false, groupId: "g3" },
      { authorName: "Maria Santos", authorAvatar: avatar("Maria Santos"), content: "City council just approved the bike lane expansion — 50 new miles by 2027! This was 18 months of community organizing. Protected lanes connecting all major transit hubs. Huge win for sustainable mobility. 🚲", imageUrl: null, category: "mobility", pinned: false, groupId: null },
      { authorName: "Priya Sharma", authorAvatar: avatar("Priya Sharma"), content: "Our food cooperative just hit 1,000 members! We've sourced 45 tons of produce from local regenerative farms this quarter alone. The demand for sustainable food is real and growing fast.", imageUrl: null, category: "food", pinned: false, groupId: "g4" },
      { authorName: "Jordan Miller", authorAvatar: avatar("Jordan Miller"), content: "Just deployed our AI-powered grid optimization system across the northeast corridor. Early results: 15% reduction in peak demand, 22% better renewable integration. The grid of the future is intelligent.", imageUrl: null, category: "technology", pinned: false, groupId: "g5" },
      { authorName: "Lena Müller", authorAvatar: avatar("Lena Müller"), content: "The EU's new Carbon Border Adjustment Mechanism is now fully operational. First reports show a 12% reduction in carbon-intensive imports. This is what effective climate policy looks like.", imageUrl: null, category: "policy", pinned: false, groupId: "g1" },
      { authorName: "Aisha Okafor", authorAvatar: avatar("Aisha Okafor"), content: "Green hydrogen is finally becoming cost-competitive for steel manufacturing. Our plant in Rotterdam achieved a 73% emissions reduction in the latest production run. Heavy industry decarbonization is possible.", imageUrl: null, category: "industry", pinned: false, groupId: null },
      { authorName: "Sofia Rossi", authorAvatar: avatar("Sofia Rossi"), content: "Incredible milestone: our rooftop garden network now spans 200 buildings in downtown Milan. We're producing 8 tons of vegetables monthly while reducing urban heat island effect by 2°C in participating blocks.", imageUrl: null, category: "nature", pinned: false, groupId: null },
      { authorName: "Olivia Johnson", authorAvatar: avatar("Olivia Johnson"), content: "The electric bus fleet in our city now covers 80% of routes! Ridership is up 34% since the transition. Cleaner air, quieter streets, and lower operating costs. Triple win.", imageUrl: null, category: "mobility", pinned: false, groupId: null },
      { authorName: "Alex Chen", authorAvatar: avatar("Alex Chen"), content: "Excited about the new solar panel recycling facility in Arizona. It can process 10,000 panels per day, recovering 95% of materials including silver and silicon. Closing the loop on solar energy.", imageUrl: null, category: "energy", pinned: false, groupId: "g2" },
      { authorName: "Kai Nakamura", authorAvatar: avatar("Kai Nakamura"), content: "Ocean plastic cleanup update: our autonomous vessel collected 4.2 tons of plastic from the Great Pacific Garbage Patch this month. New AI-guided collection system is 3x more efficient than manual methods.", imageUrl: null, category: "technology", pinned: false, groupId: "g3" },
      { authorName: "Priya Sharma", authorAvatar: avatar("Priya Sharma"), content: "Community composting program results are in: we diverted 50 tons from landfill last quarter and produced 20 tons of premium compost for local farms. Waste → resource. The circular economy in action.", imageUrl: null, category: "food", pinned: false, groupId: "g4" },
    ];
    postSeed.forEach((p, i) => {
      const id = `p${i + 1}`;
      this._posts.set(id, { ...p, id, createdAt: ago(i * 6 + Math.random() * 5) });
    });

    const commentSeed: [string, string, string][] = [
      ["p1", "Maria Santos", "This is incredible progress! Our neighborhood is looking to do something similar."],
      ["p1", "Lena Müller", "What was the biggest challenge in the permitting process?"],
      ["p1", "Jordan Miller", "The economics keep getting better. Congrats to the whole team!"],
      ["p2", "Olivia Johnson", "This could be a game-changer for coastal communities seeking carbon credits."],
      ["p2", "Alex Chen", "Fascinating research. Would love to see the methodology."],
      ["p3", "Priya Sharma", "Protected lanes make such a difference. Our city needs this!"],
      ["p4", "Aisha Okafor", "1000 members! That's amazing growth. How did you scale?"],
      ["p5", "Kai Nakamura", "15% peak reduction is huge. What ML models are you using?"],
      ["p5", "Alex Chen", "This is exactly the kind of infrastructure modernization we need."],
      ["p6", "Maria Santos", "CBAM is proving that well-designed policy works. More countries should follow."],
      ["p7", "Jordan Miller", "Green hydrogen for steel is the breakthrough we've been waiting for."],
      ["p8", "Kai Nakamura", "200 buildings! The urban agriculture movement is real."],
      ["p9", "Sofia Rossi", "Electric buses transformed transit in our city too. The air quality improvement is noticeable."],
      ["p10", "Lena Müller", "Panel recycling is critical as first-gen installations reach end of life."],
      ["p11", "Priya Sharma", "AI-guided collection — impressive engineering. What's the detection accuracy?"],
      ["p12", "Alex Chen", "Circular food systems are the future. Great work scaling this."],
    ];
    commentSeed.forEach(([postId, name, content], i) => {
      const c: Comment = { id: `c${i + 1}`, postId, authorName: name, authorAvatar: avatar(name), content, createdAt: ago(i * 2 + Math.random() * 3) };
      this._comments.set(c.id, c);
    });

    const reactionSeed: [string, string, string][] = [
      ["p1","Maria Santos","like"],["p1","Lena Müller","like"],["p1","Jordan Miller","like"],["p1","Kai Nakamura","repost"],["p1","Priya Sharma","save"],
      ["p2","Alex Chen","like"],["p2","Olivia Johnson","like"],["p2","Sofia Rossi","like"],["p2","Maria Santos","repost"],
      ["p3","Kai Nakamura","like"],["p3","Aisha Okafor","like"],["p3","Jordan Miller","like"],["p3","Priya Sharma","like"],
      ["p4","Alex Chen","like"],["p4","Aisha Okafor","like"],["p4","Maria Santos","repost"],
      ["p5","Kai Nakamura","like"],["p5","Lena Müller","like"],["p5","Alex Chen","save"],
      ["p6","Jordan Miller","like"],["p6","Priya Sharma","like"],["p6","Alex Chen","like"],
      ["p7","Sofia Rossi","like"],["p7","Alex Chen","like"],["p7","Kai Nakamura","repost"],
      ["p8","Maria Santos","like"],["p8","Alex Chen","like"],
      ["p9","Lena Müller","like"],["p9","Maria Santos","like"],
      ["p10","Jordan Miller","like"],["p10","Kai Nakamura","save"],
      ["p11","Alex Chen","like"],["p11","Jordan Miller","repost"],
      ["p12","Sofia Rossi","like"],["p12","Olivia Johnson","like"],
    ];
    for (const [postId, userName, type] of reactionSeed) {
      const r: Reaction = { id: randomUUID(), postId, userName, type, createdAt: ago(Math.random() * 48) };
      this._reactions.set(r.id, r);
    }

    const eventSeed: Omit<FeedEvent, "id" | "createdAt">[] = [
      { creatorName: "Maria Santos", title: "Global Climate March 2026", description: "Join millions worldwide demanding immediate climate action. Meet at City Hall at 10 AM for the march to the Capitol.", startDate: future(48), endDate: future(54), location: "City Hall Plaza", category: "policy", imageUrl: null, maxAttendees: 5000 },
      { creatorName: "Alex Chen", title: "Solar Installation Workshop", description: "Hands-on workshop on residential solar panel installation. Bring work gloves. All materials provided.", startDate: future(120), endDate: future(128), location: "Community Center, Room 204", category: "energy", imageUrl: null, maxAttendees: 30 },
      { creatorName: "Priya Sharma", title: "Community Garden Planting Day", description: "Spring planting day! We'll be putting in 500 native plants and starting the summer vegetable beds.", startDate: future(200), endDate: future(208), location: "Riverside Community Garden", category: "food", imageUrl: null, maxAttendees: 50 },
      { creatorName: "Kai Nakamura", title: "Beach Cleanup & Ocean Health Talk", description: "Morning cleanup followed by a talk on microplastics research and what we can do about it.", startDate: future(340), endDate: future(346), location: "Sunset Beach, Main Parking Lot", category: "nature", imageUrl: null, maxAttendees: 100 },
      { creatorName: "Jordan Miller", title: "Carbon Footprint Assessment Workshop", description: "Learn to measure and reduce your personal and organizational carbon footprint using our open-source tools.", startDate: future(500), endDate: future(504), location: "Online (Zoom)", category: "technology", imageUrl: null, maxAttendees: null },
    ];
    eventSeed.forEach((e, i) => {
      const id = `e${i + 1}`;
      this._events.set(id, { ...e, id, createdAt: ago(50 + i * 20) });
    });

    const rsvpSeed: [string, string, string][] = [
      ["e1","Alex Chen","going"],["e1","Lena Müller","going"],["e1","Jordan Miller","interested"],["e1","Priya Sharma","going"],["e1","Kai Nakamura","going"],
      ["e2","Maria Santos","going"],["e2","Priya Sharma","interested"],["e2","Sofia Rossi","going"],
      ["e3","Alex Chen","going"],["e3","Olivia Johnson","going"],["e3","Aisha Okafor","interested"],
      ["e4","Sofia Rossi","going"],["e4","Alex Chen","interested"],
      ["e5","Lena Müller","going"],["e5","Aisha Okafor","going"],["e5","Maria Santos","interested"],
    ];
    for (const [eventId, userName, status] of rsvpSeed) {
      const r: EventRsvp = { id: randomUUID(), eventId, userName, status, createdAt: ago(Math.random() * 100) };
      this._rsvps.set(r.id, r);
    }
  }
}

function initStorage(): IStorage {
  if (db) {
    console.log("[storage] Using PostgreSQL database (DATABASE_URL is set)");
    return new DatabaseStorage(db);
  }
  console.log("[storage] Using in-memory storage (set DATABASE_URL to persist data)");
  return new MemStorage();
}

export const storage = initStorage();
