import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Pin } from "lucide-react";
import { GlassCard } from "@/components/glass/GlassCard";
import { motion } from "framer-motion";

interface ResourceCardProps {
  title: string;
  source: string;
  summary: string;
  url?: string;
  isPinned?: boolean;
  lastUpdated?: string;
}

export function ResourceCard({ title, source, summary, url, isPinned, lastUpdated }: ResourceCardProps) {
  const handleOpenResource = () => {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.log("Opening resource:", title);
    }
  };

  return (
    <GlassCard className="h-full hover:bg-white/10 transition-all group cursor-pointer">
      <div className="p-6 space-y-4 h-full flex flex-col">
        <div>
          <div className="flex items-start justify-between gap-2 mb-3">
            <Badge 
              variant={isPinned ? "default" : "secondary"} 
              className={isPinned 
                ? "text-xs bg-green-600/80 text-white border-green-500/30" 
                : "text-xs bg-white/10 text-white/80 border-white/20"
              }
            >
              {isPinned && <Pin className="h-3 w-3 mr-1" />}
              {isPinned ? "Featured" : source}
            </Badge>
            {lastUpdated && (
              <span className="text-xs text-white/50">
                {lastUpdated}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold leading-tight text-white group-hover:text-green-400 transition-colors mb-3">
            {title}
          </h3>
        </div>
        
        <p className="text-sm leading-relaxed text-white/70 flex-1">
          {summary}
        </p>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="outline" 
            className="w-full bg-white/5 hover:bg-green-600 hover:text-white hover:border-green-600 text-white border-white/20 transition-all" 
            size="sm"
            onClick={handleOpenResource}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Resource
          </Button>
        </motion.div>
      </div>
    </GlassCard>
  );
}
