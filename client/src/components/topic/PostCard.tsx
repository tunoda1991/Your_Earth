import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Share2, MoreHorizontal, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/glass/GlassCard";
import { motion } from "framer-motion";

interface PostCardProps {
  author: string;
  authorRole?: string;
  timestamp: string;
  content: string;
  sources?: { title: string; url: string }[];
  reactions?: number;
  comments?: number;
  imageUrl?: string;
  onUserClick?: (userName: string) => void;
}

// User avatar mapping
const userAvatars: Record<string, string> = {
  "Dr. Sarah Chen": "https://images.unsplash.com/photo-1752937285396-df7c206f47f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNjaWVudGlzdCUyMHJlc2VhcmNoZXJ8ZW58MXx8fHwxNzcwNDk0Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "Chef Emma Kim": "https://images.unsplash.com/photo-1731990456159-988fae774abd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMGNoZWYlMjBraXRjaGVufGVufDF8fHx8MTc3MDQ5NDY3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "Marcus Rodriguez": "https://images.unsplash.com/photo-1682029536305-2f4fe39310e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXNwYW5pYyUyMG1hbiUyMGF0aGxldGUlMjBmaXRuZXNzfGVufDF8fHx8MTc3MDQ5NDY3OHww&ixlib=rb-4.1.0&q=80&w=1080",
  "Dr. Amara Johnson": "https://images.unsplash.com/photo-1632054226770-9ce6a8915462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW1lcmljYW4lMjB3b21hbiUyMGRvY3RvciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzA0OTQ2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
};

export function PostCard({ 
  author, 
  authorRole, 
  timestamp, 
  content, 
  sources = [], 
  reactions = 0, 
  comments = 0,
  imageUrl,
  onUserClick
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(reactions);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    // Handle share functionality
    console.log("Sharing post by", author);
  };

  const handleUserClick = () => {
    if (onUserClick) {
      onUserClick(author);
    }
  };

  return (
    <GlassCard className="p-6 space-y-4 hover:bg-white/8 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Avatar 
              className="h-12 w-12 border-2 border-white/10 cursor-pointer hover:border-green-500/50 transition-colors shadow-lg" 
              onClick={handleUserClick}
            >
              {userAvatars[author] && <AvatarImage src={userAvatars[author]} alt={author} className="object-cover" />}
              <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold">
                {author.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span 
                className="font-semibold text-white hover:text-green-400 cursor-pointer transition-colors"
                onClick={handleUserClick}
              >
                {author}
              </span>
              {authorRole && (
                <Badge variant="secondary" className="text-xs bg-white/10 text-white/80 border-white/20">
                  {authorRole}
                </Badge>
              )}
            </div>
            <span className="text-xs text-white/50">{timestamp}</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="hover:bg-white/5 text-white/70 hover:text-white -mr-2"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="text-sm leading-relaxed text-white/90 pl-[60px]">{content}</div>

      {/* Image */}
      {imageUrl && (
        <div className="rounded-xl overflow-hidden border border-white/10 ml-[60px]">
          <img src={imageUrl} alt="Post content" className="w-full h-auto" />
        </div>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <div className="space-y-2 pl-[60px]">
          <span className="text-xs font-semibold text-white/60">Source(s):</span>
          <div className="flex flex-wrap gap-2">
            {sources.map((source, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs cursor-pointer hover:bg-white/10 bg-white/5 text-white/80 border-white/20 transition-all"
                onClick={() => window.open(source.url, '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                {source.title}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/10 pl-[60px]">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLike}
          className={`text-white/60 hover:text-white hover:bg-white/5 transition-all ${
            isLiked ? 'text-red-400 hover:text-red-300' : ''
          }`}
        >
          <Heart className={`h-4 w-4 mr-1.5 ${isLiked ? 'fill-current' : ''}`} />
          <span className="font-medium">{likeCount}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowComments(!showComments)}
          className="text-white/60 hover:text-white hover:bg-white/5 transition-all"
        >
          <MessageSquare className="h-4 w-4 mr-1.5" />
          <span className="font-medium">{comments}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleShare}
          className="text-white/60 hover:text-white hover:bg-white/5 ml-auto transition-all"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="pl-[60px] pt-4 border-t border-white/10 space-y-3"
        >
          <div className="text-sm text-white/60">
            {comments > 0 ? `${comments} comments` : 'No comments yet. Be the first to comment!'}
          </div>
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 border border-white/10">
              <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xs">
                U
              </AvatarFallback>
            </Avatar>
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 focus:bg-white/10 transition-all"
            />
          </div>
        </motion.div>
      )}
    </GlassCard>
  );
}