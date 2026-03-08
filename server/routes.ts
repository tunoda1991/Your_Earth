import type { Express, Request, Response, NextFunction } from "express";
import { type Server } from "http";
import { storage } from "./storage";

const ALLOWED_ZONES = new Set([
  "US","GB","DE","FR","ES","IT","PL","NL","SE","NO","DK","FI","AT","CH","BE","PT",
  "CN","IN","JP","KR","AU","BR","CA","MX","ZA","EG","NG","AR","CL","TR",
  "SA","ID","MY","TH","PH","VN","PK","UA","RO","GR"
]);

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 60;
const requestTimes = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string") return xff.split(",")[0].trim();
  return req.socket?.remoteAddress ?? "unknown";
}

function rateLimitElectricityMaps(req: Request, res: Response, next: NextFunction): void {
  const ip = getClientIp(req);
  const now = Date.now();
  let times = requestTimes.get(ip) ?? [];
  times = times.filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_REQUESTS) {
    res.status(429).json({ error: "Too many requests; try again later." });
    return;
  }
  times.push(now);
  requestTimes.set(ip, times);
  next();
}

function userName(req: Request): string {
  return (req.headers["x-user-name"] as string) || "Anonymous";
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ── Electricity Maps (existing) ────────────────────────
  const electricityMapsRateLimit = rateLimitElectricityMaps;

  app.get("/api/electricity-maps/carbon-intensity/:zone", electricityMapsRateLimit, async (req, res) => {
    const zone = req.params.zone.toUpperCase();
    if (!ALLOWED_ZONES.has(zone)) return res.status(400).json({ error: "Invalid zone" });
    const key = process.env.ELECTRICITY_MAPS_API_KEY;
    if (!key) return res.status(500).json({ error: "API key not configured" });
    try {
      const r = await fetch(
        `https://api-access.electricitymaps.com/free-tier/carbon-intensity/latest?zone=${zone}`,
        { headers: { "auth-token": key } }
      );
      if (!r.ok) return res.status(r.status).json({ error: `Upstream error: ${r.status}` });
      res.json(await r.json());
    } catch (e: any) {
      res.status(502).json({ error: e.message });
    }
  });

  app.get("/api/electricity-maps/power-breakdown/:zone", electricityMapsRateLimit, async (req, res) => {
    const zone = req.params.zone.toUpperCase();
    if (!ALLOWED_ZONES.has(zone)) return res.status(400).json({ error: "Invalid zone" });
    const key = process.env.ELECTRICITY_MAPS_API_KEY;
    if (!key) return res.status(500).json({ error: "API key not configured" });
    try {
      const r = await fetch(
        `https://api-access.electricitymaps.com/free-tier/power-breakdown/latest?zone=${zone}`,
        { headers: { "auth-token": key } }
      );
      if (!r.ok) return res.status(r.status).json({ error: `Upstream error: ${r.status}` });
      res.json(await r.json());
    } catch (e: any) {
      res.status(502).json({ error: e.message });
    }
  });

  // ── Feed Posts ──────────────────────────────────────────
  app.get("/api/feed/posts", async (req, res) => {
    try {
      storage.setUserName(userName(req));
      const { category, search, groupId, limit, offset } = req.query as Record<string, string>;
      const result = await storage.getPosts({
        category, search, groupId,
        limit: limit ? parseInt(limit) : 20,
        offset: offset ? parseInt(offset) : 0,
      });
      res.json(result);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/feed/posts/:id", async (req, res) => {
    try {
      storage.setUserName(userName(req));
      const post = await storage.getPost(req.params.id);
      if (!post) return res.status(404).json({ error: "Post not found" });
      res.json(post);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.post("/api/feed/posts", async (req, res) => {
    try {
      const { content, category, imageUrl, groupId } = req.body;
      if (!content?.trim()) return res.status(400).json({ error: "Content is required" });
      const name = userName(req);
      const post = await storage.createPost({
        authorName: name,
        authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        content: content.trim(),
        imageUrl: imageUrl || null,
        category: category || "general",
        pinned: false,
        groupId: groupId || null,
      });
      res.status(201).json(post);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.delete("/api/feed/posts/:id", async (req, res) => {
    try {
      const ok = await storage.deletePost(req.params.id);
      if (!ok) return res.status(404).json({ error: "Post not found" });
      res.json({ ok: true });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.patch("/api/feed/posts/:id/pin", async (req, res) => {
    try {
      const post = await storage.togglePin(req.params.id);
      if (!post) return res.status(404).json({ error: "Post not found" });
      res.json(post);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── Comments ───────────────────────────────────────────
  app.get("/api/feed/posts/:id/comments", async (req, res) => {
    try {
      res.json(await storage.getComments(req.params.id));
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.post("/api/feed/posts/:id/comments", async (req, res) => {
    try {
      const { content } = req.body;
      if (!content?.trim()) return res.status(400).json({ error: "Content is required" });
      const name = userName(req);
      const comment = await storage.createComment({
        postId: req.params.id,
        authorName: name,
        authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        content: content.trim(),
      });
      res.status(201).json(comment);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.delete("/api/feed/comments/:id", async (req, res) => {
    try {
      const ok = await storage.deleteComment(req.params.id);
      if (!ok) return res.status(404).json({ error: "Comment not found" });
      res.json({ ok: true });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── Reactions ──────────────────────────────────────────
  app.post("/api/feed/posts/:id/reactions", async (req, res) => {
    try {
      const { type } = req.body;
      if (!type) return res.status(400).json({ error: "Reaction type is required" });
      const reaction = await storage.addReaction(req.params.id, userName(req), type);
      res.status(201).json(reaction);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.delete("/api/feed/posts/:id/reactions", async (req, res) => {
    try {
      const { type } = req.query as Record<string, string>;
      if (!type) return res.status(400).json({ error: "Reaction type is required" });
      const ok = await storage.removeReaction(req.params.id, userName(req), type);
      res.json({ ok });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── Events ─────────────────────────────────────────────
  app.get("/api/feed/events", async (req, res) => {
    try {
      storage.setUserName(userName(req));
      const { category, upcoming } = req.query as Record<string, string>;
      res.json(await storage.getEvents({ category, upcoming: upcoming === "true" }));
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/feed/events/:id", async (req, res) => {
    try {
      storage.setUserName(userName(req));
      const event = await storage.getEvent(req.params.id);
      if (!event) return res.status(404).json({ error: "Event not found" });
      res.json(event);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.post("/api/feed/events", async (req, res) => {
    try {
      const { title, description, startDate, endDate, location, category, maxAttendees } = req.body;
      if (!title?.trim()) return res.status(400).json({ error: "Title is required" });
      if (!startDate) return res.status(400).json({ error: "Start date is required" });
      const event = await storage.createEvent({
        creatorName: userName(req),
        title: title.trim(),
        description: description?.trim() || null,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        location: location?.trim() || null,
        category: category || "general",
        imageUrl: null,
        maxAttendees: maxAttendees ? parseInt(maxAttendees) : null,
      });
      res.status(201).json(event);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.delete("/api/feed/events/:id", async (req, res) => {
    try {
      const ok = await storage.deleteEvent(req.params.id);
      if (!ok) return res.status(404).json({ error: "Event not found" });
      res.json({ ok: true });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.post("/api/feed/events/:id/rsvp", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) return res.status(400).json({ error: "Status is required" });
      const rsvp = await storage.rsvpEvent(req.params.id, userName(req), status);
      res.status(201).json(rsvp);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.delete("/api/feed/events/:id/rsvp", async (req, res) => {
    try {
      const ok = await storage.cancelRsvp(req.params.id, userName(req));
      res.json({ ok });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── Groups ─────────────────────────────────────────────
  app.get("/api/feed/groups", async (req, res) => {
    try {
      storage.setUserName(userName(req));
      const { category, search } = req.query as Record<string, string>;
      res.json(await storage.getGroups({ category, search }));
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/feed/groups/:id", async (req, res) => {
    try {
      storage.setUserName(userName(req));
      const group = await storage.getGroup(req.params.id);
      if (!group) return res.status(404).json({ error: "Group not found" });
      res.json(group);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.post("/api/feed/groups", async (req, res) => {
    try {
      const { name, description, category, type } = req.body;
      if (!name?.trim()) return res.status(400).json({ error: "Name is required" });
      const group = await storage.createGroup({
        name: name.trim(),
        description: description?.trim() || null,
        category: category || "general",
        type: type || "open",
        imageUrl: null,
        creatorName: userName(req),
      });
      res.status(201).json(group);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.put("/api/feed/groups/:id", async (req, res) => {
    try {
      const group = await storage.updateGroup(req.params.id, req.body);
      if (!group) return res.status(404).json({ error: "Group not found" });
      res.json(group);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.delete("/api/feed/groups/:id", async (req, res) => {
    try {
      const ok = await storage.deleteGroup(req.params.id);
      if (!ok) return res.status(404).json({ error: "Group not found" });
      res.json({ ok: true });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/feed/groups/:id/members", async (req, res) => {
    try {
      res.json(await storage.getGroupMembers(req.params.id));
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.post("/api/feed/groups/:id/members", async (req, res) => {
    try {
      const member = await storage.joinGroup(req.params.id, userName(req));
      res.status(201).json(member);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.delete("/api/feed/groups/:id/members", async (req, res) => {
    try {
      const ok = await storage.leaveGroup(req.params.id, userName(req));
      res.json({ ok });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.patch("/api/feed/groups/:id/members/:userName", async (req, res) => {
    try {
      const { role } = req.body;
      if (!role) return res.status(400).json({ error: "Role is required" });
      const member = await storage.updateMemberRole(req.params.id, req.params.userName, role);
      if (!member) return res.status(404).json({ error: "Member not found" });
      res.json(member);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── Stats ──────────────────────────────────────────────
  app.get("/api/feed/stats", async (_req, res) => {
    try {
      res.json(await storage.getStats());
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  return httpServer;
}
