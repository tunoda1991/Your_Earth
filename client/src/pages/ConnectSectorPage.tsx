import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Car, Leaf, Factory, Cpu, Scale, TreePine, ArrowLeft } from "lucide-react";
import { useArticles, useSectors } from "@/hooks/use-connect-data";
import { ConnectArticleCard } from "@/components/connect/ConnectArticleCard";
import type { SourceType, SectorSlug } from "@/types/connect";
import type { AppUser } from "@/types/app";

const iconMap: Record<string, typeof Zap> = {
  Zap, Car, Leaf, Factory, Cpu, Scale, TreePine,
};

const sectorTextColor: Record<SectorSlug, string> = {
  energy: "text-[var(--category-energy)]",
  mobility: "text-[var(--category-mobility)]",
  food: "text-[var(--category-food)]",
  industry: "text-[var(--category-industry)]",
  technology: "text-[var(--category-technology)]",
  policy: "text-[var(--category-policy)]",
  nature: "text-[var(--category-nature)]",
};

const sourceFilters: { value: SourceType | "all"; label: string }[] = [
  { value: "all", label: "All Sources" },
  { value: "news", label: "News" },
  { value: "social", label: "Social" },
  { value: "disclosure", label: "Disclosures" },
];

interface ConnectSectorPageProps {
  sectorSlug?: string;
  onNavigate?: (page: string) => void;
  onArticleClick?: (id: string) => void;
  user?: AppUser | null;
}

export function ConnectSectorPage({ sectorSlug, onNavigate, onArticleClick, user }: ConnectSectorPageProps) {
  const [sourceFilter, setSourceFilter] = useState<SourceType | "all">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const { data: dbSectors } = useSectors();
  const { data: dbArticles, isLoading } = useArticles(
    sectorSlug,
    sourceFilter !== "all" ? sourceFilter : undefined
  );

  const sector = dbSectors?.find((s) => s.slug === sectorSlug);
  const Icon = sector ? iconMap[sector.icon] || Leaf : Leaf;

  const sortedArticles = useMemo(() => {
    if (!dbArticles) return [];
    return [...dbArticles].sort((a, b) => {
      const da = new Date(a.published_at).getTime();
      const db = new Date(b.published_at).getTime();
      return sortBy === "newest" ? db - da : da - db;
    });
  }, [dbArticles, sortBy]);

  if (!sector && dbSectors) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-white">Sector Not Found</h1>
        <button
          onClick={() => onNavigate?.("connect")}
          className="text-green-400 hover:text-green-300 transition-colors"
        >
          ← Back to Connect
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10" />
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <button
            onClick={() => onNavigate?.("connect")}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Connect
          </button>

          {sector && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/10`}>
                  <Icon className={`h-8 w-8 ${sectorTextColor[sector.slug]}`} />
                </div>
                <div>
                  <h1 className={`text-3xl md:text-4xl font-black ${sectorTextColor[sector.slug]}`}>
                    {sector.name}
                  </h1>
                  <p className="text-sm text-slate-400">{sector.articleCount} articles curated</p>
                </div>
              </div>
              <p className="text-slate-400 max-w-2xl">{sector.description}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Filters & Articles */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {sourceFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setSourceFilter(f.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  sourceFilter === f.value
                    ? "bg-green-500 text-white"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
            className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-white border border-white/10 focus:ring-2 focus:ring-green-400/30 outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-xl glass-medium border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : sortedArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No articles found with the selected filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article) => (
              <ConnectArticleCard
                key={article.id}
                article={article}
                onArticleClick={onArticleClick}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
