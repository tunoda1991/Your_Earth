import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import { projectId, publicAnonKey } from "@/utils/supabase/info";
import type { Article, Sector, SectorSlug, SourceType } from "@/types/connect";

export function useArticles(sector?: string, sourceType?: string) {
  return useQuery({
    queryKey: ["connect-articles", sector, sourceType],
    queryFn: async (): Promise<Article[]> => {
      let query = supabase
        .from("articles")
        .select("*")
        .order("published_at", { ascending: false });

      if (sector) query = query.eq("sector", sector);
      if (sourceType && sourceType !== "all") query = query.eq("source_type", sourceType);

      const { data, error } = await query;
      if (error) throw error;

      return (data || []).map((row: any) => ({
        id: row.id,
        title: row.title,
        summary: row.summary,
        sector: row.sector as SectorSlug,
        source_url: row.source_url,
        source_name: row.source_name || "Unknown",
        source_type: (row.source_type || "news") as SourceType,
        image_url: row.image_url || "",
        published_at: row.published_at,
        sentiment: row.sentiment as "positive" | "neutral" | "negative" | undefined,
        trending: row.trending || false,
        region: row.region || "Global",
      }));
    },
  });
}

export function useSectors() {
  return useQuery({
    queryKey: ["connect-sectors"],
    queryFn: async (): Promise<Sector[]> => {
      const { data: sectorsData, error } = await supabase.from("sectors").select("*");
      if (error) throw error;

      const { data: articles } = await supabase.from("articles").select("sector");
      const counts: Record<string, number> = {};
      (articles || []).forEach((a: any) => {
        counts[a.sector] = (counts[a.sector] || 0) + 1;
      });

      return (sectorsData || []).map((row: any) => ({
        id: row.id,
        name: row.name,
        slug: row.slug as SectorSlug,
        description: row.description || "",
        icon: row.icon || "Leaf",
        articleCount: counts[row.slug] || 0,
      }));
    },
  });
}

export function useArticle(id: string) {
  return useQuery({
    queryKey: ["connect-article", id],
    queryFn: async (): Promise<Article | null> => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        title: data.title,
        summary: data.summary,
        sector: data.sector as SectorSlug,
        source_url: data.source_url,
        source_name: data.source_name || "Unknown",
        source_type: (data.source_type || "news") as SourceType,
        image_url: data.image_url || "",
        published_at: data.published_at,
        sentiment: data.sentiment as "positive" | "neutral" | "negative" | undefined,
        trending: data.trending || false,
        region: (data as any).region || "Global",
      };
    },
    enabled: !!id,
  });
}

export function useCurateNews() {
  const curateUrl = `https://${projectId}.supabase.co/functions/v1/curate-news`;

  return async () => {
    const response = await fetch(curateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Failed to curate news");
    }
    return response.json();
  };
}
