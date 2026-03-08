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
  { url: "https://www.ecowatch.com/feed", source_name: "EcoWatch", source_type: "news" },
  { url: "https://grist.org/feed/", source_name: "Grist", source_type: "news" },
  { url: "https://www.renewableenergyworld.com/feed/", source_name: "Renewable Energy World", source_type: "news" },
  { url: "https://www.greentechmedia.com/feed", source_name: "GreenTech Media", source_type: "news" },
  { url: "https://www.desmog.com/feed/", source_name: "DeSmog", source_type: "news" },
  { url: "https://theenergymix.com/feed/", source_name: "The Energy Mix", source_type: "news" },
  { url: "https://www.canarymedia.com/feed", source_name: "Canary Media", source_type: "news" },
  { url: "https://climatechangenews.com/feed/", source_name: "Climate Home News", source_type: "news" },
  { url: "https://www.greenbiz.com/feed", source_name: "GreenBiz", source_type: "news" },
];

const GNEWS_QUERIES = [
  "climate change",
  "renewable energy solar wind",
  "electric vehicle EV",
  "carbon emissions net zero",
  "biodiversity conservation",
  "sustainable agriculture food",
  "climate policy COP",
  "green hydrogen",
  "deforestation forest",
  "ocean pollution plastic",
];

interface RawArticle {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source_name: string;
  source_type: string;
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
  if (!title || title.length < 15) return false;
  if (title.length > 300) return false;
  const upperRatio = (title.match(/[A-Z]/g) || []).length / title.length;
  if (upperRatio > 0.7 && title.length > 20) return false;
  return true;
}

function isRecent(pubDate: string, maxAgeDays = 7): boolean {
  if (!pubDate) return true;
  const parsed = new Date(pubDate);
  if (isNaN(parsed.getTime())) return true;
  const ageDays = (Date.now() - parsed.getTime()) / (1000 * 60 * 60 * 24);
  return ageDays <= maxAgeDays;
}

function hasSubstantiveContent(desc: string): boolean {
  return desc.length >= 30;
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
    const isDuplicate = kept.some((k) => titleSimilarity(k.title, a.title) > 0.75);
    if (isDuplicate) continue;
    kept.push(a);
  }
  return kept;
}

async function fetchRSSArticles(): Promise<RawArticle[]> {
  const allArticles: RawArticle[] = [];
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      try {
        const resp = await fetch(feed.url, {
          headers: { "User-Agent": "ClimateScope/1.0" },
          signal: AbortSignal.timeout(10000),
        });
        if (!resp.ok) return [];
        const xml = await resp.text();
        const items = xml.split(/<item[\s>]/i).slice(1);
        return items.slice(0, 10).map((item) => ({
          title: extractTag(item, "title"),
          link: extractTag(item, "link") || extractTag(item, "guid"),
          description: extractTag(item, "description").slice(0, 500),
          pubDate: extractTag(item, "pubDate"),
          source_name: feed.source_name,
          source_type: feed.source_type,
        })).filter((a) => a.title && a.link);
      } catch (e) {
        console.warn(`Failed to fetch ${feed.source_name}:`, e);
        return [];
      }
    })
  );
  for (const result of results) {
    if (result.status === "fulfilled") allArticles.push(...result.value);
  }
  return allArticles;
}

async function fetchGNewsArticles(apiKey: string): Promise<RawArticle[]> {
  const allArticles: RawArticle[] = [];
  for (const query of GNEWS_QUERIES) {
    try {
      const resp = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${apiKey}`,
        { signal: AbortSignal.timeout(10000) }
      );
      if (!resp.ok) continue;
      const data = await resp.json();
      for (const a of data.articles || []) {
        allArticles.push({
          title: a.title,
          link: a.url,
          description: a.description || a.content || "",
          pubDate: a.publishedAt,
          source_name: a.source?.name || "GNews",
          source_type: "news",
        });
      }
    } catch (e) {
      console.warn(`GNews "${query}" failed:`, e);
    }
  }
  return allArticles;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Fetching RSS feeds...");
    const rssArticles = await fetchRSSArticles();
    console.log(`Got ${rssArticles.length} RSS articles`);

    const gnewsKey = Deno.env.get("GNEWS_API_KEY");
    let gnewsArticles: RawArticle[] = [];
    if (gnewsKey) {
      console.log("Fetching GNews...");
      gnewsArticles = await fetchGNewsArticles(gnewsKey);
      console.log(`Got ${gnewsArticles.length} GNews articles`);
    }

    let allRaw = [...rssArticles, ...gnewsArticles];
    allRaw = allRaw.filter((a) => isValidTitle(a.title));
    allRaw = allRaw.filter((a) => isRecent(a.pubDate));
    allRaw = allRaw.filter((a) => hasSubstantiveContent(a.description));
    allRaw = allRaw.filter((a) => isClimateRelevant(a.title, a.description));
    allRaw = deduplicateArticles(allRaw);

    if (allRaw.length === 0) {
      return new Response(JSON.stringify({ error: "No articles passed quality filters" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const urls = allRaw.map((a) => a.link);
    const { data: existing } = await supabase.from("articles").select("source_url, title").in("source_url", urls);
    const existingUrls = new Set((existing || []).map((e: any) => e.source_url));

    const { data: recentDbArticles } = await supabase
      .from("articles").select("title")
      .gte("published_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order("published_at", { ascending: false }).limit(500);
    const dbTitles = (recentDbArticles || []).map((r: any) => r.title);

    allRaw = allRaw.filter((a) => {
      if (existingUrls.has(a.link)) return false;
      return !dbTitles.some((dbTitle: string) => titleSimilarity(dbTitle, a.title) > 0.7);
    });

    if (allRaw.length === 0) {
      return new Response(JSON.stringify({ success: true, inserted: 0, message: "No new unique articles" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
      const batch = allRaw.slice(i, i + BATCH_SIZE);
      const articleSummaries = batch.map((a, idx) =>
        `[${idx}] "${a.title}" — ${a.description.slice(0, 200)}`
      ).join("\n");

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [
            {
              role: "system",
              content: `You are a climate news analyst and quality filter. For each article, provide:
- A concise 2-3 sentence summary focusing on the key climate impact or development
- Sector: energy, mobility, food, industry, technology, policy, or nature
- Sentiment: positive, neutral, or negative
- Region: specific country/region (e.g. "US", "EU", "China", "Global")
- trending: true only for genuinely significant breaking stories
- relevance_score: 1-10 rating of how relevant and important this is for climate-aware readers

Use the enrich_articles tool.`,
            },
            { role: "user", content: `Analyze these climate news articles:\n\n${articleSummaries}` },
          ],
          tools: [{
            type: "function",
            function: {
              name: "enrich_articles",
              description: "Return enriched metadata for each article",
              parameters: {
                type: "object",
                properties: {
                  articles: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        index: { type: "number" },
                        summary: { type: "string" },
                        sector: { type: "string", enum: ["energy", "mobility", "food", "industry", "technology", "policy", "nature"] },
                        sentiment: { type: "string", enum: ["positive", "neutral", "negative"] },
                        region: { type: "string" },
                        trending: { type: "boolean" },
                        relevance_score: { type: "number" },
                      },
                      required: ["index", "summary", "sector", "sentiment", "region", "trending", "relevance_score"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["articles"],
                additionalProperties: false,
              },
            },
          }],
          tool_choice: { type: "function", function: { name: "enrich_articles" } },
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          await new Promise((r) => setTimeout(r, 10000));
          i -= BATCH_SIZE;
          continue;
        }
        if (response.status === 402) break;
        continue;
      }

      const aiData = await response.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall) continue;

      const parsed = JSON.parse(toolCall.function.arguments);
      const enriched = parsed.articles || [];
      const qualityFiltered = enriched.filter((e: any) => (e.relevance_score ?? 5) >= 5);

      const articlesToInsert = qualityFiltered.map((e: any) => {
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
        if (error) {
          console.error("Insert error:", error);
        } else {
          totalInserted += data?.length || 0;
        }
      }

      if (i + BATCH_SIZE < allRaw.length) {
        await new Promise((r) => setTimeout(r, 2000));
      }
    }

    return new Response(JSON.stringify({ success: true, inserted: totalInserted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("curate-news error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
