import { Newspaper, MessageCircle, FileText } from "lucide-react";
import type { SourceType } from "@/types/connect";

const sourceConfig: Record<SourceType, { icon: typeof Newspaper; label: string }> = {
  news: { icon: Newspaper, label: "News" },
  social: { icon: MessageCircle, label: "Social" },
  disclosure: { icon: FileText, label: "Disclosure" },
};

interface ConnectSourceBadgeProps {
  type: SourceType;
  className?: string;
}

export function ConnectSourceBadge({ type, className = "" }: ConnectSourceBadgeProps) {
  const { icon: Icon, label } = sourceConfig[type];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-slate-300 ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
