import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ── Feed Posts ──────────────────────────────────────────
export const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  authorName: text("author_name").notNull(),
  authorAvatar: text("author_avatar"),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull().default("general"),
  pinned: boolean("pinned").notNull().default(false),
  groupId: varchar("group_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type FeedPost = typeof posts.$inferSelect;

// ── Comments ────────────────────────────────────────────
export const comments = pgTable("comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").notNull(),
  authorName: text("author_name").notNull(),
  authorAvatar: text("author_avatar"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type Comment = typeof comments.$inferSelect;

// ── Reactions ───────────────────────────────────────────
export const reactions = pgTable("reactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").notNull(),
  userName: text("user_name").notNull(),
  type: text("type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type Reaction = typeof reactions.$inferSelect;

// ── Events ──────────────────────────────────────────────
export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  creatorName: text("creator_name").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  location: text("location"),
  category: text("category").notNull().default("general"),
  imageUrl: text("image_url"),
  maxAttendees: integer("max_attendees"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type FeedEvent = typeof events.$inferSelect;

// ── Event RSVPs ─────────────────────────────────────────
export const eventRsvps = pgTable("event_rsvps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  userName: text("user_name").notNull(),
  status: text("status").notNull().default("going"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type EventRsvp = typeof eventRsvps.$inferSelect;

// ── Groups ──────────────────────────────────────────────
export const groups = pgTable("groups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull().default("general"),
  type: text("type").notNull().default("open"),
  imageUrl: text("image_url"),
  creatorName: text("creator_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type Group = typeof groups.$inferSelect;

// ── Group Members ───────────────────────────────────────
export const groupMembers = pgTable("group_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  groupId: varchar("group_id").notNull(),
  userName: text("user_name").notNull(),
  role: text("role").notNull().default("member"),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});
export type GroupMember = typeof groupMembers.$inferSelect;
