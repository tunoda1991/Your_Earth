import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SOCIAL_FEEDS = [
  { url: "https://www.reddit.com/r/climate/hot.json?limit=15", source_name: "r/climate", source_type: "social", platform: "reddit" },
  { url: "https://www.reddit.com/r/environment/hot.json?limit=15", source_name: "r/environment", source_type: "social", platform: "reddit" },
  { url: "https://www.reddit.com/r/renewableenergy/hot.json?limit=15", source_name: "r/renewableenergy", source_type: "social", platform: "reddit" },
  { url: "https://www.reddit.com/r/climatechange/hot.json?limit=10", source_name: "r/climatechange", source_type: "social", platform: "reddit" },
  { url: "https://www.reddit.com/r/electricvehicles/hot.json?limit=10", source_name: "r/electricvehicles", source_type: "social", platform: "reddit" },
  { url: "https://www.reddit.com/r/energy/hot.json?limit=10", source_name: "r/energy", source_type: "social", platform: "reddit" },
  { url: "https://mastodon.social/tags/climate.rss", source_name: "Mastodon #climate", source_type: "social", platform: "mastodon" },
  { url: "https://mastodon.social/tags/climatechange.rss", source_name: "Mastodon #climatechange", source_type: "social", platform: "mastodon" },
  { url: "https://mastodon.social/tags/renewableenergy.rss", source_name: "Mastodon #renewableenergy", source_type: "social", platform: "mastodon" },
];

interface SocialPost {
  title: string;
  text: string;
  url: string;
  author: string;
  date: string;
  score: number;
  source_name: string;
  platform: string;
}

function extractTag(xml: string, tag: string): string {
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`, "i");
  const cdataMatch = xml.match(cdataRe);
  if (cdataMatch) return cdataMatch[1].trim();
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const match = xml.match(re);
  return match ? match[1].replace(/<[^>]+>/g, "").trim() : "";
}

async function fetchRedditPosts(feed: typeof SOCIAL_FEEDS[0]): Promise<SocialPost[]> {
  try {
    const resp = await fetch(feed.url, {
      headers: { "User-Agent": "ClimateScope/1.0 (climate news aggregator)" },
      signal: AbortSignal.timeout(10000),
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    const children = data?.data?.children || [];
    return children
      .filter((c: any) => c.data && !c.data.stickied && c.data.selftext !== "[removed]")
      .map((c: any) => ({
        title: c.data.title || "",
        text: (c.data.selftext || c.data.title || "").slice(0, 500),
        url: c.data.url?.startsWith("http") ? c.data.url : `https://reddit.com${c.data.permalink}`,
        author: c.data.author || "anonymous",
        date: c.data.created_utc ? new Date(c.data.created_utc * 1000).toISOString() : new Date().toISOString(),
        score: c.data.score || 0,
        source_name: feed.source_name,
        platform: feed.platform,
      }))
      .filter((p: SocialPost) => p.title);
  } catch (e) {
    console.warn(`Reddit error for ${feed.source_name}:`, e);
    return [];
  }
}

async function fetchMastodonPosts(feed: typeof SOCIAL_FEEDS[0]): Promise<SocialPost[]> {
  try {
    const resp = await fetch(feed.url, {
      headers: { "User-Agent": "ClimateScope/1.0" },
      signal: AbortSignal.timeout(10000),
    });
    if (!resp.ok) return [];
    const xml = await resp.text();
    const items = xml.split(/<item[\s>]/i).slice(1);
    return items.slice(0, 15).map((item) => {
      const title = extractTag(item, "title");
      const description = extractTag(item, "description").slice(0, 500);
      const link = extractTag(item, "link") || extractTag(item, "guid");
      const pubDate = extractTag(item, "pubDate");
      const creator = extractTag(item, "dc:creator") || extractTag(item, "author");
      return {
        title: title || description.slice(0, 120),
        text: description || title,
        url: link,
        author: creator || "mastodon user",
        date: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        score: 0,
        source_name: feed.source_name,
        platform: feed.platform,
      };
    }).filter((p) => p.text && p.url);
  } catch (e) {
    console.warn(`Mastodon error for ${feed.source_name}:`, e);
    return [];
  }
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

    const results = await Promise.allSettled(
      SOCIAL_FEEDS.map((feed) =>
        feed.platform === "reddit" ? fetchRedditPosts(feed) : fetchMastodonPosts(feed)
      )
    );

    const allPosts: SocialPost[] = [];
    for (const result of results) {
      if (result.status === "fulfilled") allPosts.push(...result.value);
    }

    if (allPosts.length === 0) {
      return new Response(JSON.stringify({ success: true, inserted: 0, message: "No social posts found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const seen = new Set<string>();
    const uniquePosts = allPosts.filter((p) => {
      if (seen.has(p.url)) return false;
      seen.add(p.url);
      return true;
    });

    const urls = uniquePosts.map((p) => p.url);
    const { data: existing } = await supabase.from("articles").select("source_url").in("source_url", urls);
    const existingUrls = new Set((existing || []).map((e: any) => e.source_url));
    const newPosts = uniquePosts.filter((p) => !existingUrls.has(p.url));

    if (newPosts.length === 0) {
      return new Response(JSON.stringify({ success: true, inserted: 0, message: "No new social posts" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const BATCH_SIZE = 15;
    let totalInserted = 0;
    const sectorImages: Record<string, string> = {
      energy: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      mobility: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
      food: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
      industry: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      technology: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      policy: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
      nature: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    };

    for (let i = 0; i < newPosts.length; i += BATCH_SIZE) {
      const batch = newPosts.slice(i, i + BATCH_SIZE);
      const postSummaries = batch
        .map((p, idx) => `[${idx}] [${p.platform}] u/${p.author} on ${p.source_name}: "${p.title}" — ${p.text.slice(0, 200)} (score: ${p.score})`)
        .join("\n");

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
              content: `You are a climate social media analyst. For each social post, provide:
- A concise 1-2 sentence summary of the climate relevance
- Sector: energy, mobility, food, industry, technology, policy, or nature
- Sentiment: positive, neutral, or negative
- Region: country/region or "Global"
- trending: true if score > 50, false otherwise

Use the enrich_posts tool.`,
            },
            { role: "user", content: `Analyze these climate-related social media posts:\n\n${postSummaries}` },
          ],
          tools: [{
            type: "function",
            function: {
              name: "enrich_posts",
              description: "Return enriched metadata for each social post",
              parameters: {
                type: "object",
                properties: {
                  posts: {
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
                      },
                      required: ["index", "summary", "sector", "sentiment", "region", "trending"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["posts"],
                additionalProperties: false,
              },
            },
          }],
          tool_choice: { type: "function", function: { name: "enrich_posts" } },
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          await new Promise((r) => setTimeout(r, 10000));
          i -= BATCH_SIZE;
          continue;
        }
        continue;
      }

      const aiData = await response.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall) continue;

      const parsed = JSON.parse(toolCall.function.arguments);
      const enriched = parsed.posts || [];

      const articlesToInsert = enriched.map((e: any) => {
        const raw = batch[e.index];
        if (!raw) return null;
        const platformIcon = raw.platform === "reddit" ? "\u{1F534}" : "\u{1F418}";
        return {
          title: `${platformIcon} ${raw.title.slice(0, 200)}`,
          summary: e.summary,
          sector: e.sector,
          source_url: raw.url,
          source_name: `${raw.source_name} (${raw.author})`,
          source_type: "social",
          image_url: sectorImages[e.sector] || sectorImages.nature,
          sentiment: e.sentiment,
          trending: e.trending || false,
          region: e.region || "Global",
          published_at: raw.date,
        };
      }).filter(Boolean);

      if (articlesToInsert.length > 0) {
        const { data, error } = await supabase.from("articles").insert(articlesToInsert).select();
        if (error) {
          console.error("Insert error:", JSON.stringify(error));
        } else {
          totalInserted += data?.length || 0;
        }
      }

      if (i + BATCH_SIZE < newPosts.length) {
        await new Promise((r) => setTimeout(r, 2000));
      }
    }

    return new Response(JSON.stringify({ success: true, inserted: totalInserted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("curate-social error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
