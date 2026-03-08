export type SectorSlug = "energy" | "mobility" | "food" | "industry" | "technology" | "policy" | "nature";

export type SourceType = "news" | "social" | "disclosure";

export interface Sector {
  id: string;
  name: string;
  slug: SectorSlug;
  description: string;
  icon: string;
  articleCount: number;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  sector: SectorSlug;
  source_url: string;
  source_name: string;
  source_type: SourceType;
  image_url: string;
  published_at: string;
  sentiment?: "positive" | "neutral" | "negative";
  trending?: boolean;
  region?: string;
}
