import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";

const ALLOWED_ZONES = new Set([
  "US","GB","DE","FR","ES","IT","PL","NL","SE","NO","DK","FI","AT","CH","BE","PT",
  "CN","IN","JP","KR","AU","BR","CA","MX","ZA","EG","NG","AR","CL","TR",
  "SA","ID","MY","TH","PH","VN","PK","UA","RO","GR"
]);

// In-memory rate limit: 60 requests per minute per IP for electricity-maps proxy
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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
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
      const data = await r.json();
      res.json(data);
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
      const data = await r.json();
      res.json(data);
    } catch (e: any) {
      res.status(502).json({ error: e.message });
    }
  });

  return httpServer;
}
