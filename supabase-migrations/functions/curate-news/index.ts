import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RSS_FEEDS = [
  { url: "https://www.carbonbrief.org/feed/", source_name: "Carbon Brief", source_type: "news" },
  { url: "https://www.theguardian.com/environment/climate-crisis/rss", source_name: "The Guardian", source_type: "news" },
  { url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml", source_name: "BBC Environment", source_type: "news" },
  { url: "https://insideclimatenews.org/feed/", source_name: "Inside Climate News", source_type: "news" },
  { url: "https://cleantechnica.com/feed/", source_name: "CleanTechnica", source_type: "news" },
  { url: "https://electrek.co/feed/", source_name: "Electrek", source_type: "news" },
  { url: "https://grist.org/feed/", source_name: "Grist", source_type: "news" },
  { url: "https://www.canarymedia.com/feed", source_name: "Canary Media", source_type: "news" },
  { url: "https://climatechangenews.com/feed/", source_name: "Climate Home News", source_type: "news" },
];

const GNEWS_QUERIES = ["climate change", "renewable energy"];

interface RawArticle {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source_name: string;
  source_type: string;
}

function fetchWithTimeout(url: string, opts: RequestInit = {}, ms = 4000): Promise<Response> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    fetch(url, opts).then(
      (res) => { clearTimeout(timer); resolve(res); },
      (err) => { clearTimeout(timer); reject(err); },
    );
  });
}

function extractTag(xml: string, tag: string): string {
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`, "i");
  const cdataMatch = xml.match(cdataRe);
  if (cdataMatch) return cdataMatch[1].trim();
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const match = xml.match(re);
  return match ? match[1].replace(/<[^>]+>/g, "").trim() : "";
}

function isValidTitle(title: string): boolean {
  if (!title || title.length < 15 || title.length > 300) return false;
  const upperRatio = (title.match(/[A-Z]/g) || []).length / title.length;
  return !(upperRatio > 0.7 && title.length > 20);
}

function isRecent(pubDate: string, maxAgeDays = 7): boolean {
  if (!pubDate) return true;
  const parsed = new Date(pubDate);
  if (isNaN(parsed.getTime())) return true;
  return (Date.now() - parsed.getTime()) / (1000 * 60 * 60 * 24) <= maxAgeDays;
}

const CLIMATE_KEYWORDS = [
  "climate", "carbon", "emission", "renewable", "solar", "wind", "electric vehicle",
  "ev", "battery", "hydrogen", "biodiversity", "deforestation", "ocean", "pollution",
  "net zero", "green", "sustainable", "energy transition", "fossil fuel", "coal",
  "methane", "glacier", "sea level", "drought", "wildfire", "flood", "heat wave",
  "paris agreement", "cop2", "cop3", "ipcc", "esg", "decarboni",
];

function isClimateRelevant(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase();
  return CLIMATE_KEYWORDS.some((kw) => text.includes(kw));
}

function normalizeForDedup(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

function titleSimilarity(a: string, b: string): number {
  const wordsA = new Set(normalizeForDedup(a).split(" "));
  const wordsB = new Set(normalizeForDedup(b).split(" "));
  const intersection = [...wordsA].filter((w) => wordsB.has(w)).length;
  const union = new Set([...wordsA, ...wordsB]).size;
  return union === 0 ? 0 : intersection / union;
}

function deduplicateArticles(articles: RawArticle[]): RawArticle[] {
  const seen = new Set<string>();
  const kept: RawArticle[] = [];
  for (const a of articles) {
    if (seen.has(a.link)) continue;
    seen.add(a.link);
    if (kept.some((k) => titleSimilarity(k.title, a.title) > 0.75)) continue;
    kept.push(a);
  }
  return kept;
}

async function fetchRSSArticles(): Promise<RawArticle[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      try {
        const resp = await fetchWithTimeout(feed.url, {
          headers: { "User-Agent": "ClimateScope/1.0" },
        }, 4000);
        if (!resp.ok) return [];
        const xml = await resp.text();
        const items = xml.split(/<item[\s>]/i).slice(1);
        return items.slice(0, 5).map((item) => ({
          title: extractTag(item, "title"),
          link: extractTag(item, "link") || extractTag(item, "guid"),
          description: extractTag(item, "description").slice(0, 500),
          pubDate: extractTag(item, "pubDate"),
          source_name: feed.source_name,
          source_type: feed.source_type,
        })).filter((a) => a.title && a.link);
      } catch {
        return [];
      }
    })
  );
  const allArticles: RawArticle[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") allArticles.push(...result.value);
  }
  return allArticles;
}

async function fetchGNewsArticles(apiKey: string): Promise<RawArticle[]> {
  const results = await Promise.allSettled(
    GNEWS_QUERIES.map(async (query) => {
      try {
        const resp = await fetchWithTimeout(
          `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=5&apikey=${apiKey}`,
          {}, 4000,
        );
        if (!resp.ok) return [];
        const data = await resp.json();
        return (data.articles || []).map((a: any) => ({
          title: a.title,
          link: a.url,
          description: a.description || a.content || "",
          pubDate: a.publishedAt,
          source_name: a.source?.name || "GNews",
          source_type: "news" as const,
        }));
      } catch {
        return [];
      }
    })
  );
  const allArticles: RawArticle[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") allArticles.push(...r.value);
  }
  return allArticles;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const MAX_WALL_MS = 50000;

  try {
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Fetching articles...");
    const [rssArticles, gnewsArticles] = await Promise.all([
      fetchRSSArticles(),
      Deno.env.get("GNEWS_API_KEY") ? fetchGNewsArticles(Deno.env.get("GNEWS_API_KEY")!) : Promise.resolve([]),
    ]);
    console.log(`RSS: ${rssArticles.length}, GNews: ${gnewsArticles.length}`);

    let allRaw = [...rssArticles, ...gnewsArticles]
      .filter((a) => isValidTitle(a.title))
      .filter((a) => isRecent(a.pubDate))
      .filter((a) => a.description.length >= 30)
      .filter((a) => isClimateRelevant(a.title, a.description));
    allRaw = deduplicateArticles(allRaw);

    if (allRaw.length === 0) {
      return new Response(JSON.stringify({ success: true, inserted: 0, message: "No articles passed filters" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const urls = allRaw.map((a) => a.link);
    const { data: existing } = await supabase.from("articles").select("source_url").in("source_url", urls);
    const existingUrls = new Set((existing || []).map((e: any) => e.source_url));

    const { data: recentDbArticles } = await supabase
      .from("articles").select("title")
      .gte("published_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order("published_at", { ascending: false }).limit(300);
    const dbTitles = (recentDbArticles || []).map((r: any) => r.title);

    allRaw = allRaw.filter((a) => {
      if (existingUrls.has(a.link)) return false;
      return !dbTitles.some((t: string) => titleSimilarity(t, a.title) > 0.7);
    });

    if (allRaw.length === 0) {
      return new Response(JSON.stringify({ success: true, inserted: 0, message: "No new unique articles" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    allRaw = allRaw.slice(0, 30);

    const BATCH_SIZE = 15;
    const sectorImages: Record<string, string> = {
      energy: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      mobility: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
      food: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
      industry: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      technology: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      policy: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
      nature: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    };

    let totalInserted = 0;

    for (let i = 0; i < allRaw.length; i += BATCH_SIZE) {
      if (Date.now() - startTime > MAX_WALL_MS) {
        console.log("Approaching wall clock limit, stopping early");
        break;
      }

      const batch = allRaw.slice(i, i + BATCH_SIZE);
      const articleSummaries = batch.map((a, idx) =>
        `[${idx}] "${a.title}" — ${a.description.slice(0, 150)}`
      ).join("\n");

      try {
        const response = await fetchWithTimeout(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: `You are a climate news analyst. Analyze each article and return a JSON object with an "articles" array.

For each article provide: index (number), summary (2-3 sentences on climate impact), sector (one of: energy, mobility, food, industry, technology, policy, nature), sentiment (positive/neutral/negative), region (e.g. "US", "EU", "Global"), trending (boolean, true only for major breaking stories), relevance_score (1-10).

Articles:
${articleSummaries}

Respond with ONLY valid JSON.` }] }],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2,
              },
            }),
          },
          20000,
        );

        if (!response.ok) {
          console.error(`Gemini ${response.status}: ${await response.text().catch(() => "")}`);
          if (response.status === 429) {
            await new Promise((r) => setTimeout(r, 3000));
            i -= BATCH_SIZE;
          }
          continue;
        }

        const aiData = await response.json();
        const text = aiData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) { console.warn("Empty Gemini response"); continue; }

        let parsed: any;
        try { parsed = JSON.parse(text); } catch { console.warn("Bad JSON:", text.slice(0, 100)); continue; }
        const enriched = (parsed.articles || []).filter((e: any) => (e.relevance_score ?? 5) >= 5);

        const articlesToInsert = enriched.map((e: any) => {
          const raw = batch[e.index];
          if (!raw) return null;
          return {
            title: raw.title,
            summary: e.summary,
            sector: e.sector,
            source_url: raw.link,
            source_name: raw.source_name,
            source_type: raw.source_type,
            image_url: sectorImages[e.sector] || sectorImages.nature,
            sentiment: e.sentiment,
            trending: e.trending || false,
            region: e.region || "Global",
            published_at: raw.pubDate ? new Date(raw.pubDate).toISOString() : new Date().toISOString(),
          };
        }).filter(Boolean);

        if (articlesToInsert.length > 0) {
          const { data, error } = await supabase.from("articles").insert(articlesToInsert).select();
          if (error) console.error("Insert error:", error);
          else totalInserted += data?.length || 0;
        }
      } catch (err) {
        console.error("Batch error:", err);
      }
    }

    return new Response(JSON.stringify({ success: true, inserted: totalInserted, elapsed_ms: Date.now() - startTime }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("curate-news error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
