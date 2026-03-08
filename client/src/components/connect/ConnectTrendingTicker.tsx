import { ConnectSectorBadge } from "./ConnectSectorBadge";
import type { Article } from "@/types/connect";

interface ConnectTrendingTickerProps {
  articles: Article[];
  onArticleClick?: (id: string) => void;
}

export function ConnectTrendingTicker({ articles, onArticleClick }: ConnectTrendingTickerProps) {
  const trendingArticles = articles.filter((a) => a.trending);
  if (trendingArticles.length === 0) return null;

  const doubled = [...trendingArticles, ...trendingArticles];

  return (
    <div className="w-full overflow-hidden glass-medium border-y border-white/10 py-3">
      <div className="flex items-center gap-4">
        <span className="flex-shrink-0 px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full whitespace-nowrap ml-4">
          🔥 Trending
        </span>
        <div className="overflow-hidden flex-1">
          <div className="flex items-center gap-8 animate-ticker whitespace-nowrap">
            {doubled.map((article, i) => (
              <div
                key={`${article.id}-${i}`}
                onClick={() => onArticleClick?.(article.id)}
                className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition-colors flex-shrink-0"
              >
                <ConnectSectorBadge sector={article.sector} />
                <span className="text-sm text-slate-300 hover:text-white transition-colors">
                  {article.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
