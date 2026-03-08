import { format } from "date-fns";
import { ConnectSectorBadge } from "./ConnectSectorBadge";
import { ConnectSourceBadge } from "./ConnectSourceBadge";
import type { Article } from "@/types/connect";

interface ConnectArticleCardProps {
  article: Article;
  featured?: boolean;
  onArticleClick?: (id: string) => void;
}

export function ConnectArticleCard({ article, featured = false, onArticleClick }: ConnectArticleCardProps) {
  return (
    <div
      onClick={() => onArticleClick?.(article.id)}
      className={`group cursor-pointer rounded-xl glass-medium border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:scale-[1.02] ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
    >
      {article.image_url && (
        <div className={`overflow-hidden ${featured ? "h-full min-h-[200px]" : "h-48"}`}>
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <ConnectSectorBadge sector={article.sector} />
          <ConnectSourceBadge type={article.source_type} />
          {article.trending && (
            <span className="text-xs font-semibold text-orange-400 flex items-center gap-1">
              🔥 Trending
            </span>
          )}
        </div>

        <h3 className={`font-bold text-white group-hover:text-green-400 transition-colors line-clamp-2 ${
          featured ? "text-xl" : "text-lg"
        }`}>
          {article.title}
        </h3>

        <p className="text-sm text-slate-400 line-clamp-2">
          {article.summary}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-2">
          <span>{article.source_name}</span>
          <span>{format(new Date(article.published_at), "MMM d, yyyy")}</span>
        </div>
      </div>
    </div>
  );
}
