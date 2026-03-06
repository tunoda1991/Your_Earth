import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserPlus, UserCheck } from "lucide-react";

interface StarUserRowProps {
  name: string;
  role: "Researcher" | "Organizer" | "Practitioner" | "Expert";
  expertise?: string;
  avatar?: string;
  onUserClick?: (userName: string) => void;
}

// User avatar mapping
const userAvatars: Record<string, string> = {
  "Dr. Sarah Chen": "https://images.unsplash.com/photo-1752937285396-df7c206f47f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNjaWVudGlzdCUyMHJlc2VhcmNoZXJ8ZW58MXx8fHwxNzcwNDk0Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "Chef Emma Kim": "https://images.unsplash.com/photo-1731990456159-988fae774abd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMGNoZWYlMjBraXRjaGVufGVufDF8fHx8MTc3MDQ5NDY3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "Marcus Rodriguez": "https://images.unsplash.com/photo-1682029536305-2f4fe39310e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXNwYW5pYyUyMG1hbiUyMGF0aGxldGUlMjBmaXRuZXNzfGVufDF8fHx8MTc3MDQ5NDY3OHww&ixlib=rb-4.1.0&q=80&w=1080",
  "Dr. Amara Johnson": "https://images.unsplash.com/photo-1632054226770-9ce6a8915462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW1lcmljYW4lMjB3b21hbiUyMGRvY3RvciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzA0OTQ2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
};

export function StarUserRow({ name, role, expertise, avatar, onUserClick }: StarUserRowProps) {
  const [isConnected, setIsConnected] = useState(false);

  const roleColors = {
    Researcher: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    Organizer: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    Practitioner: "bg-green-500/20 text-green-300 border-green-500/30",
    Expert: "bg-orange-500/20 text-orange-300 border-orange-500/30"
  };

  const handleUserClick = () => {
    if (onUserClick) {
      onUserClick(name);
    }
  };

  const handleConnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConnected(!isConnected);
  };

  const avatarUrl = avatar || userAvatars[name];

  return (
    <motion.div 
      className="flex items-center justify-between py-4 border-b border-white/10 last:border-0 hover:bg-white/5 -mx-2 px-2 rounded-lg transition-all cursor-pointer group"
      whileHover={{ x: 4 }}
      onClick={handleUserClick}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar className="h-12 w-12 flex-shrink-0 border-2 border-white/20 group-hover:border-green-500/50 transition-colors shadow-lg">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} className="object-cover" />}
            <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-base truncate text-white group-hover:text-green-400 transition-colors">
            {name}
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant="outline" className={`text-xs font-medium ${roleColors[role]}`}>
              {role}
            </Badge>
            {expertise && (
              <span className="text-xs text-white/70 truncate">{expertise}</span>
            )}
          </div>
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleConnect}
          className={`ml-3 flex-shrink-0 transition-all font-medium ${
            isConnected 
              ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-500/40' 
              : 'bg-white/5 hover:bg-white/10 text-white border-white/20'
          }`}
        >
          {isConnected ? (
            <>
              <UserCheck className="h-3.5 w-3.5 mr-1.5" />
              Connected
            </>
          ) : (
            <>
              <UserPlus className="h-3.5 w-3.5 mr-1.5" />
              Connect
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
