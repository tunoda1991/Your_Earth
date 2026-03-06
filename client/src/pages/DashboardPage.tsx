import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ClimateDataDashboard } from "@/components/ClimateDataDashboard";
import { InteractiveMapVisualization } from "@/components/InteractiveMapVisualization";
import { LiveImpactTicker } from "@/components/LiveImpactTicker";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { motion } from "framer-motion";
import {
  TrendingUp, Activity, Target, Users, BookOpen,
  Leaf, Zap, BarChart3, Sparkles, MessageCircle, Calendar, Heart
} from "lucide-react";
import { supabase } from "@/utils/supabase/client";

interface DashboardPageProps {
  user?: any;
  onNavigate?: (page: string) => void;
}

interface DashboardStats {
  postCount: number;
  followersCount: number;
  followingCount: number;
  reactionsReceived: number;
  communitiesJoined: number;
  eventsJoined: number;
}

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  created_at: string;
}

export function DashboardPage({ user, onNavigate }: DashboardPageProps) {
  const [stats, setStats] = useState<DashboardStats>({
    postCount: 0,
    followersCount: 0,
    followingCount: 0,
    reactionsReceived: 0,
    communitiesJoined: 0,
    eventsJoined: 0,
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    loadDashboardData();
  }, [user?.id]);

  async function loadDashboardData() {
    setIsLoading(true);
    try {
      const [
        { count: postCount },
        { count: followersCount },
        { count: followingCount },
        { count: communitiesJoined },
        { count: eventsJoined },
        { data: activityData },
        { data: userPosts },
      ] = await Promise.all([
        supabase.from("posts").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_id", user.id),
        supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", user.id),
        supabase.from("community_members").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("event_attendees").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("user_activity").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
        supabase.from("posts").select("id").eq("user_id", user.id),
      ]);

      let reactionsReceived = 0;
      if (userPosts && userPosts.length > 0) {
        const postIds = userPosts.map((p: any) => p.id);
        const { count: reactionCount } = await supabase
          .from("reactions")
          .select("*", { count: "exact", head: true })
          .in("post_id", postIds);
        reactionsReceived = reactionCount || 0;
      }

      setStats({
        postCount: postCount || 0,
        followersCount: followersCount || 0,
        followingCount: followingCount || 0,
        reactionsReceived,
        communitiesJoined: communitiesJoined || 0,
        eventsJoined: eventsJoined || 0,
      });

      setRecentActivity(activityData || []);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const statCards = [
    { title: "Posts", value: stats.postCount, icon: MessageCircle, description: "Posts published", gradient: "from-blue-500 to-cyan-600" },
    { title: "Followers", value: stats.followersCount, icon: Users, description: "People following you", gradient: "from-purple-500 to-pink-600" },
    { title: "Reactions", value: stats.reactionsReceived, icon: Heart, description: "Reactions on your posts", gradient: "from-rose-500 to-red-600" },
    { title: "Communities", value: stats.communitiesJoined, icon: Zap, description: "Communities joined", gradient: "from-orange-500 to-amber-600" },
  ];

  const activityIconMap: Record<string, { icon: any; color: string }> = {
    post: { icon: MessageCircle, color: "text-blue-400" },
    reaction: { icon: Heart, color: "text-rose-400" },
    follow: { icon: Users, color: "text-purple-400" },
    join_community: { icon: Zap, color: "text-yellow-400" },
    join_event: { icon: Calendar, color: "text-green-400" },
    join_campaign: { icon: Target, color: "text-orange-400" },
  };

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }

  const displayName = user?.user_metadata?.name || user?.email?.split("@")[0] || "Climate Champion";

  return (
    <GradientBackground>
      <div className="min-h-screen pt-24 pb-12">
        <LiveImpactTicker />

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-8 w-8 text-green-400" />
              <h1 className="text-4xl font-bold text-white">
                Welcome back, {displayName}!
              </h1>
            </div>
            <p className="text-slate-300 text-lg">Here's your climate impact dashboard</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <h3 className="text-sm text-slate-400 mb-2">{stat.title}</h3>
                  <div className="text-3xl font-bold text-white mb-1">
                    {isLoading
                      ? <div className="h-8 w-12 bg-white/10 rounded animate-pulse" />
                      : stat.value
                    }
                  </div>
                  <p className="text-xs text-slate-400">{stat.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Network Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Your Network</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Followers", value: stats.followersCount },
                    { label: "Following", value: stats.followingCount },
                    { label: "Events Joined", value: stats.eventsJoined },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-4 rounded-xl bg-white/5">
                      <div className="text-3xl font-bold text-white mb-1">
                        {isLoading
                          ? <div className="h-8 w-10 bg-white/10 rounded animate-pulse mx-auto" />
                          : item.value
                        }
                      </div>
                      <p className="text-slate-400 text-sm">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Carbon Footprint chart placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-white mb-1">Carbon Footprint Trend</h2>
                <p className="text-slate-400 mb-6">Your monthly emissions over time</p>
                <div className="h-[200px] flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl bg-white/5">
                  <div className="text-center space-y-4">
                    <BarChart3 className="h-12 w-12 mx-auto text-slate-500" />
                    <p className="text-slate-400 text-sm">Calculate your footprint to see trends</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate?.("learn-calculator")}
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      Calculate Footprint
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
              >
                <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : recentActivity.length === 0 ? (
                  <div className="text-center py-6">
                    <Activity className="h-8 w-8 mx-auto text-slate-500 mb-2" />
                    <p className="text-slate-400 text-sm">No activity yet. Start by making a post!</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 bg-white/5 border-white/10 text-white hover:bg-white/10"
                      onClick={() => onNavigate?.("feed")}
                    >
                      Go to Feed
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentActivity.map((item) => {
                      const mapping = activityIconMap[item.type] || { icon: Activity, color: "text-slate-400" };
                      const Icon = mapping.icon;
                      return (
                        <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                          <div className={`mt-1 ${mapping.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm text-white">{item.description}</p>
                            <p className="text-xs text-slate-400">{timeAgo(item.created_at)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
              >
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  {[
                    { label: "Go to Feed", icon: MessageCircle, page: "community-feed" },
                    { label: "Continue Learning", icon: BookOpen, page: "learn" },
                    { label: "Explore Communities", icon: Users, page: "community" },
                    { label: "Browse Events", icon: Calendar, page: "events" },
                    { label: "Join a Campaign", icon: Target, page: "action" },
                  ].map((action) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.page}
                        variant="outline"
                        className="w-full justify-start bg-white/5 border-white/10 text-white hover:bg-white/10"
                        onClick={() => onNavigate?.(action.page)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <ClimateDataDashboard />
        <InteractiveMapVisualization />
      </div>

      <ComprehensiveFooter onNavigate={onNavigate} />
    </GradientBackground>
  );
}