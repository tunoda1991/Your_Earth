import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, CheckCircle2, MessageSquare } from "lucide-react";
import { GlassCard } from "@/components/glass/GlassCard";
import { motion } from "framer-motion";

interface QACardProps {
  question: string;
  author: string;
  timestamp: string;
  tags?: string[];
  upvotes?: number;
  answers?: number;
  hasAcceptedAnswer?: boolean;
  excerpt?: string;
  onUserClick?: (userName: string) => void;
  compact?: boolean;
}

// User avatar mapping
const userAvatars: Record<string, string> = {
  "Alex Thompson": "https://images.unsplash.com/photo-1615381508491-7941f95b7f10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHBlcnNvbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzcwNDk0Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "Jordan Lee": "https://images.unsplash.com/photo-1615381508491-7941f95b7f10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHBlcnNvbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzcwNDk0Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "Sam Parker": "https://images.unsplash.com/photo-1615381508491-7941f95b7f10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHBlcnNvbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzcwNDk0Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "Taylor Brown": "https://images.unsplash.com/photo-1615381508491-7941f95b7f10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHBlcnNvbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzcwNDk0Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
};

export function QACard({ 
  question, 
  author, 
  timestamp, 
  tags = [], 
  upvotes = 0, 
  answers = 0,
  hasAcceptedAnswer = false,
  excerpt,
  onUserClick,
  compact = false
}: QACardProps) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(upvotes);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isUpvoted) {
      setUpvoteCount(upvoteCount - 1);
    } else {
      setUpvoteCount(upvoteCount + 1);
    }
    setIsUpvoted(!isUpvoted);
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUserClick) {
      onUserClick(author);
    }
  };

  const handleQuestionClick = () => {
    console.log("Opening question:", question);
    // Navigate to question detail page
  };

  return (
    <GlassCard 
      className={`${compact ? 'p-4' : 'p-6'} space-y-3 hover:bg-white/10 transition-all cursor-pointer group`}
      onClick={handleQuestionClick}
    >
      {/* Header with status */}
      <div className="flex items-start justify-between gap-3">
        <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold leading-tight flex-1 text-white group-hover:text-green-400 transition-colors`}>
          {question}
        </h3>
        {hasAcceptedAnswer && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
          </motion.div>
        )}
      </div>

      {/* Excerpt */}
      {excerpt && !compact && (
        <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs font-normal bg-white/10 text-white/80 border-white/20 hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Tag clicked:", tag);
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className={`flex items-center justify-between ${compact ? 'text-[11px]' : 'text-xs'} text-white/60 pt-2 border-t border-white/10`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Avatar 
                className={`${compact ? 'h-5 w-5' : 'h-6 w-6'} border border-white/10 cursor-pointer hover:border-green-500/50 transition-colors`}
                onClick={handleUserClick}
              >
                {userAvatars[author] ? (
                  <AvatarImage src={userAvatars[author]} alt={`${author}'s avatar`} />
                ) : (
                  <AvatarFallback className={`${compact ? 'text-[10px]' : 'text-xs'} bg-gradient-to-br from-green-500 to-emerald-600 text-white`}>
                    {author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </motion.div>
            <span 
              className="hover:text-white cursor-pointer transition-colors"
              onClick={handleUserClick}
            >
              {author}
            </span>
          </div>
          <span>•</span>
          <span>{timestamp}</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            className={`flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/10 transition-all ${
              isUpvoted ? 'text-green-400' : 'text-white/60 hover:text-white'
            }`}
            onClick={handleUpvote}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className={`h-3.5 w-3.5 ${isUpvoted ? 'fill-current' : ''}`} />
            <span className="font-medium">{upvoteCount}</span>
          </motion.button>
          <div className="flex items-center gap-1 text-white/60">
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="font-medium">{answers}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}