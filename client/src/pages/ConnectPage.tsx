import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useArticles, useSectors, useCurateNews } from "@/hooks/use-connect-data";
import { ConnectSectorGrid } from "@/components/connect/ConnectSectorGrid";
import { ConnectArticleCard } from "@/components/connect/ConnectArticleCard";
import { ConnectTrendingTicker } from "@/components/connect/ConnectTrendingTicker";
import type { AppUser } from "@/types/app";

interface ConnectPageProps {
  onNavigate?: (page: string) => void;
  user?: AppUser | null;
  onSectorClick?: (slug: string) => void;
  onArticleClick?: (id: string) => void;
}

export function ConnectPage({ onNavigate, user, onSectorClick, onArticleClick }: ConnectPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [curating, setCurating] = useState(false);
  const queryClient = useQueryClient();
  const curateNews = useCurateNews();

  const { data: dbArticles, isLoading: articlesLoading } = useArticles();
  const { data: dbSectors, isLoading: sectorsLoading } = useSectors();

  const allArticles = dbArticles || [];
  const allSectors = dbSectors || [];

  const filteredArticles = useMemo(() => {
    if (!searchQuery) return allArticles;
    const q = searchQuery.toLowerCase();
    return allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.sector.includes(q)
    );
  }, [searchQuery, allArticles]);

  const handleCurate = async () => {
    setCurating(true);
    try {
      const result = await curateNews();
      toast.success(`Curated ${result.inserted} new articles!`);
      queryClient.invalidateQueries({ queryKey: ["connect-articles"] });
      queryClient.invalidateQueries({ queryKey: ["connect-sectors"] });
    } catch (e: any) {
      toast.error(e.message || "Failed to curate news");
    } finally {
      setCurating(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            AI-Curated{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Climate News
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-8"
          >
            Real-time intelligence across energy, mobility, food, industry, technology, policy, and nature — powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:bg-white/10 focus:border-green-400/50 transition-all rounded-full outline-none"
              />
            </form>

            <button
              onClick={handleCurate}
              disabled={curating}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-full transition-all disabled:opacity-50 whitespace-nowrap"
            >
              <RefreshCw className={`h-4 w-4 ${curating ? "animate-spin" : ""}`} />
              {curating ? "Curating..." : "Curate News with AI"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Trending Ticker */}
      <ConnectTrendingTicker articles={allArticles} onArticleClick={onArticleClick} />

      {/* Sectors */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Explore by Sector</h2>
        {sectorsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-32 rounded-xl glass-medium border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : (
          <ConnectSectorGrid sectors={allSectors} onSectorClick={onSectorClick} />
        )}
      </section>

      {/* Latest Stories */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6">
          {searchQuery ? `Results for "${searchQuery}"` : "Latest Stories"}
        </h2>
        {articlesLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-xl glass-medium border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No articles found. Click "Curate News with AI" to get started!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, i) => (
              <ConnectArticleCard
                key={article.id}
                article={article}
                featured={i === 0}
                onArticleClick={onArticleClick}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
