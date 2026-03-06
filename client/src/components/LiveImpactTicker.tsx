import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Award, 
  Leaf, 
  Zap, 
  Heart,
  MessageCircle,
  TrendingUp,
  MapPin,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ActivityItem {
  id: string;
  type: "join" | "milestone" | "action" | "achievement" | "discussion" | "event";
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  location?: string;
  message: string;
  icon: React.ElementType;
  color: string;
  timestamp: string;
}

const activityTypes = {
  join: { icon: Users, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  milestone: { icon: Award, color: "text-yellow-400", bgColor: "bg-yellow-500/10" },
  action: { icon: Target, color: "text-green-400", bgColor: "bg-green-500/10" },
  achievement: { icon: TrendingUp, color: "text-purple-400", bgColor: "bg-purple-500/10" },
  discussion: { icon: MessageCircle, color: "text-pink-400", bgColor: "bg-pink-500/10" },
  event: { icon: Calendar, color: "text-cyan-400", bgColor: "bg-cyan-500/10" }
};

// Sample activity data
const sampleActivities: ActivityItem[] = [
  {
    id: "1",
    type: "join",
    user: { name: "Sarah Chen", initials: "SC", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    message: "joined Clean Energy Community",
    icon: Users,
    color: "text-blue-400",
    timestamp: "2 min ago"
  },
  {
    id: "2",
    type: "milestone",
    location: "NYC",
    message: "NYC hit 1,000 actions milestone! 🎉",
    icon: Award,
    color: "text-yellow-400",
    timestamp: "5 min ago"
  },
  {
    id: "3",
    type: "action",
    user: { name: "Marcus Johnson", initials: "MJ", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    message: "completed Solar Panel Installation pledge",
    icon: Target,
    color: "text-green-400",
    timestamp: "8 min ago"
  },
  {
    id: "4",
    type: "achievement",
    user: { name: "Aisha Patel", initials: "AP", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    message: "earned Climate Champion badge",
    icon: TrendingUp,
    color: "text-purple-400",
    timestamp: "12 min ago"
  },
  {
    id: "5",
    type: "discussion",
    user: { name: "Li Wei", initials: "LW", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100" },
    message: "started discussion on Electric Vehicle Adoption",
    icon: MessageCircle,
    color: "text-pink-400",
    timestamp: "15 min ago"
  },
  {
    id: "6",
    type: "event",
    location: "Berlin",
    message: "Climate Strike event starting in 2 hours",
    icon: Calendar,
    color: "text-cyan-400",
    timestamp: "18 min ago"
  },
  {
    id: "7",
    type: "join",
    user: { name: "Emma Rodriguez", initials: "ER", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" },
    message: "joined Sustainable Food Community",
    icon: Users,
    color: "text-blue-400",
    timestamp: "22 min ago"
  },
  {
    id: "8",
    type: "milestone",
    location: "Tokyo",
    message: "Tokyo community saved 50,000 kg CO₂ this month!",
    icon: Award,
    color: "text-yellow-400",
    timestamp: "25 min ago"
  },
  {
    id: "9",
    type: "action",
    user: { name: "James Wilson", initials: "JW", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    message: "planted 100 trees with local community",
    icon: Leaf,
    color: "text-green-400",
    timestamp: "28 min ago"
  },
  {
    id: "10",
    type: "achievement",
    user: { name: "Yuki Tanaka", initials: "YT", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
    message: "reached 30-day sustainability streak",
    icon: Zap,
    color: "text-purple-400",
    timestamp: "32 min ago"
  }
];

export function LiveImpactTicker() {
  const [activities, setActivities] = useState<ActivityItem[]>(sampleActivities);
  const [visibleActivities, setVisibleActivities] = useState<ActivityItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Initialize with first 3 items
    setVisibleActivities(activities.slice(0, 3));

    // Rotate through activities
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % activities.length;
        setVisibleActivities((prevVisible) => {
          const newVisible = [...prevVisible];
          newVisible.shift(); // Remove first item
          newVisible.push(activities[(nextIndex + 2) % activities.length]); // Add new item at end
          return newVisible;
        });
        return nextIndex;
      });
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [activities]);

  return (
    <section className="relative overflow-hidden bg-slate-900/30 backdrop-blur-sm border-y border-slate-700/30 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6">
          {/* Live Indicator */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            </div>
            <span className="text-sm font-medium text-white">LIVE</span>
          </div>

          {/* Scrolling Activity Feed */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-6">
              <AnimatePresence mode="popLayout">
                {visibleActivities.map((activity) => {
                  const typeConfig = activityTypes[activity.type];
                  const Icon = typeConfig.icon;

                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-3 shrink-0 bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-slate-700/30 min-w-[320px]"
                    >
                      {/* Avatar or Icon */}
                      {activity.user ? (
                        <Avatar className="h-8 w-8 border-2 border-slate-700">
                          <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                          <AvatarFallback className="text-xs bg-slate-700 text-white">
                            {activity.user.initials}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className={`w-8 h-8 rounded-full ${typeConfig.bgColor} flex items-center justify-center`}>
                          <Icon className={`h-4 w-4 ${typeConfig.color}`} />
                        </div>
                      )}

                      {/* Activity Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-200 truncate">
                          {activity.user && (
                            <span className="font-medium text-white">
                              {activity.user.name}{" "}
                            </span>
                          )}
                          {activity.location && (
                            <span className="font-medium text-white">
                              {activity.location}{" "}
                            </span>
                          )}
                          <span className="text-slate-300">{activity.message}</span>
                        </p>
                        <p className="text-xs text-slate-500">{activity.timestamp}</p>
                      </div>

                      {/* Type Badge */}
                      <Badge 
                        variant="secondary" 
                        className={`${typeConfig.bgColor} ${typeConfig.color} border-0 shrink-0`}
                      >
                        {activity.type}
                      </Badge>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Total Impact Counter */}
          <div className="shrink-0 hidden lg:block">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg px-4 py-2 border border-green-500/20">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-green-400" />
                <div>
                  <div className="text-xs text-slate-400">Total Impact</div>
                  <div className="text-sm font-bold text-white">2.3M kg CO₂</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Edges for Fade Effect */}
      <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-slate-900/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-slate-900/30 to-transparent pointer-events-none" />
    </section>
  );
}
