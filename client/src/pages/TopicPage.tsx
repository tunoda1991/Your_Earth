import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GlassCard } from "@/components/glass/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Users, 
  Shield, 
  TrendingUp, 
  BookOpen, 
  MessageSquare, 
  Flag,
  Calendar,
  ArrowLeft,
  Sparkles,
  Activity,
  Heart,
  Share2,
  MoreHorizontal,
  Send,
  Image as ImageIcon,
  Link2,
  Award,
  Zap,
  Target,
  CheckCircle2
} from "lucide-react";
import { ResourceCard } from "@/components/topic/ResourceCard";
import { ActionCard } from "@/components/topic/ActionCard";
import { PostCard } from "@/components/topic/PostCard";
import { QACard } from "@/components/topic/QACard";
import { DecisionLineTracker } from "@/components/topic/DecisionLineTracker";
import { StarUserRow } from "@/components/topic/StarUserRow";
import { SubgroupCard } from "@/components/topic/SubgroupCard";
import { ReputationMeter } from "@/components/topic/ReputationMeter";
import { OutcomeCard } from "@/components/topic/OutcomeCard";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";

interface TopicPageProps {
  topicName?: string;
  topicData?: any;
  onNavigate?: (page: string) => void;
  user?: any;
}

export function TopicPage({ topicName, topicData, onNavigate, user }: TopicPageProps) {
  // Use topicData if provided, otherwise use defaults
  const displayName = topicData?.title || topicName || "Plant-Based Nutrition";
  const displayDescription = topicData?.description || "Explore the science, benefits, and practical guides for transitioning to and thriving on plant-based diets. Connect with nutritionists, chefs, and fellow advocates.";
  const displayMembers = topicData?.members || "12,456";
  const displayPosts = topicData?.posts || 1243;
  
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [composerText, setComposerText] = useState("");

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('communities');
    } else {
      window.history.back();
    }
  };

  const handleUserClick = (userName: string) => {
    if (onNavigate) {
      onNavigate('profile');
    }
  };

  const handlePostSubmit = () => {
    if (composerText.trim()) {
      // Handle post submission
      console.log("Posting:", composerText);
      setComposerText("");
      setShowComposer(false);
    }
  };

  return (
    <GradientBackground>
      <div className="pt-20 min-h-screen">
        {/* Hero/Header Section */}
        <section className="relative py-6 lg:py-12 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 hover:text-white transition-all"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Communities
              </Button>
            </motion.div>

            {/* Glassmorphic Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="p-6 md:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                  <div className="flex-1">
                    {/* Topic Badge & Stats */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 px-3 py-1">
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                        Active Community
                      </Badge>
                      <div className="flex items-center gap-2 text-white/70">
                        <Users className="h-4 w-4" />
                        <span className="text-sm font-medium">{displayMembers} members</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm font-medium">{displayPosts} posts</span>
                      </div>
                    </div>
                    
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent leading-tight">
                      {displayName}
                    </h1>
                    
                    <p className="text-lg lg:text-xl text-white/70 leading-relaxed max-w-3xl mb-6">
                      {displayDescription}
                    </p>

                    {/* Topic Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge variant="outline" className="bg-white/5 text-white/70 border-white/20 hover:bg-white/10 cursor-pointer transition-colors">
                        <Shield className="h-3 w-3 mr-1.5" />
                        Moderated
                      </Badge>
                      <Badge variant="outline" className="bg-green-500/10 text-green-300 border-green-500/30 hover:bg-green-500/20 cursor-pointer transition-colors">
                        <TrendingUp className="h-3 w-3 mr-1.5" />
                        45 tons CO₂ reduced
                      </Badge>
                      <Badge variant="outline" className="bg-white/5 text-white/70 border-white/20 hover:bg-white/10 cursor-pointer transition-colors">
                        Related: Sustainable Agriculture • Zero Waste
                      </Badge>
                    </div>

                    {/* Quick Action Link */}
                    <Button 
                      variant="link" 
                      className="px-0 text-green-400 hover:text-green-300 group"
                      onClick={() => setActiveTab("resources")}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start here: Beginner's Guide
                      <motion.span
                        className="ml-1"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 min-w-[200px]">
                    <Button 
                      size="lg"
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={isFollowing 
                        ? "bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all" 
                        : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25 transition-all"
                      }
                    >
                      {isFollowing ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 mr-2" />
                          Following
                        </>
                      ) : (
                        <>
                          <Users className="h-5 w-5 mr-2" />
                          Follow Topic
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      size="lg"
                      variant="outline"
                      onClick={() => setNotificationEnabled(!notificationEnabled)}
                      className={notificationEnabled
                        ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/40 transition-all"
                        : "bg-white/5 hover:bg-white/10 text-white border-white/20 transition-all"
                      }
                    >
                      <Bell className={`h-5 w-5 mr-2 ${notificationEnabled ? 'fill-current' : ''}`} />
                      Notifications
                    </Button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10">
                  <motion.div 
                    className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{displayPosts}</div>
                    <div className="text-sm text-white/60">Posts</div>
                  </motion.div>
                  <motion.div 
                    className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-1">456</div>
                    <div className="text-sm text-white/60">Questions</div>
                  </motion.div>
                  <motion.div 
                    className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-1">89</div>
                    <div className="text-sm text-white/60">Events</div>
                  </motion.div>
                  <motion.div 
                    className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-1">234</div>
                    <div className="text-sm text-white/60">Resources</div>
                  </motion.div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Tabs Navigation - Sticky */}
        <div className="sticky top-20 z-40 backdrop-blur-xl bg-slate-950/90 border-y border-white/10 shadow-lg">
          <div className="container mx-auto px-4 max-w-7xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b-0 h-14 gap-2">
                <TabsTrigger 
                  value="posts" 
                  className="data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:shadow-lg text-white/60 hover:text-white/80 hover:bg-white/5 transition-all px-6 rounded-lg"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discuss
                </TabsTrigger>
                <TabsTrigger 
                  value="qa"
                  className="data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:shadow-lg text-white/60 hover:text-white/80 hover:bg-white/5 transition-all px-6 rounded-lg"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Q&A
                </TabsTrigger>
                <TabsTrigger 
                  value="actions"
                  className="data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:shadow-lg text-white/60 hover:text-white/80 hover:bg-white/5 transition-all px-6 rounded-lg"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Actions
                </TabsTrigger>
                <TabsTrigger 
                  value="events"
                  className="data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:shadow-lg text-white/60 hover:text-white/80 hover:bg-white/5 transition-all px-6 rounded-lg"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Events
                </TabsTrigger>
                <TabsTrigger 
                  value="resources"
                  className="data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:shadow-lg text-white/60 hover:text-white/80 hover:bg-white/5 transition-all px-6 rounded-lg"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Resources
                </TabsTrigger>
                <TabsTrigger 
                  value="connect"
                  className="data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:shadow-lg text-white/60 hover:text-white/80 hover:bg-white/5 transition-all px-6 rounded-lg"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Connect
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Discuss Tab */}
            <TabsContent value="posts" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Main Feed Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Post Composer */}
                  <GlassCard className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 text-white font-semibold text-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUserClick(user?.name || 'User')}
                      >
                        {user?.name?.[0] || "U"}
                      </motion.div>
                      <div className="flex-1 space-y-3">
                        <textarea
                          value={composerText}
                          onChange={(e) => setComposerText(e.target.value)}
                          placeholder="Share your insights, ask questions, or add evidence..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none min-h-[100px]"
                          onFocus={() => setShowComposer(true)}
                        />
                        
                        <AnimatePresence>
                          {showComposer && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-white/70 hover:text-white hover:bg-white/5"
                                >
                                  <ImageIcon className="h-4 w-4 mr-2" />
                                  Image
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-white/70 hover:text-white hover:bg-white/5"
                                >
                                  <Link2 className="h-4 w-4 mr-2" />
                                  Source
                                </Button>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setShowComposer(false);
                                    setComposerText("");
                                  }}
                                  className="text-white/70 hover:text-white hover:bg-white/5"
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  size="sm" 
                                  onClick={handlePostSubmit}
                                  disabled={!composerText.trim()}
                                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Post
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Feed Posts */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <PostCard
                      author="Dr. Sarah Chen"
                      authorRole="Researcher"
                      timestamp="2 hours ago"
                      content="New meta-analysis published this week: plant-based diets associated with 25% lower risk of type 2 diabetes. Key factors include fiber intake, whole grains, and reduced saturated fat. Thread with full breakdown below 🧵"
                      sources={[
                        { title: "JAMA Internal Medicine", url: "#" },
                        { title: "Study methodology", url: "#" }
                      ]}
                      reactions={234}
                      comments={56}
                      onUserClick={handleUserClick}
                    />

                    <PostCard
                      author="Marcus Rodriguez"
                      authorRole="Practitioner"
                      timestamp="5 hours ago"
                      content="After 18 months plant-based: bloodwork came back perfect. Cholesterol dropped 40 points, energy levels improved significantly. Happy to share my meal planning strategy if anyone's interested in transitioning."
                      reactions={189}
                      comments={43}
                      onUserClick={handleUserClick}
                    />

                    <PostCard
                      author="Chef Emma Kim"
                      authorRole="Organizer"
                      timestamp="1 day ago"
                      content="Hosting a free plant-based cooking workshop next Saturday at Green Community Kitchen. We'll cover protein-rich meals, batch cooking, and budget-friendly shopping tips. 30 spots available - link in bio!"
                      reactions={312}
                      comments={87}
                      onUserClick={handleUserClick}
                    />
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Top Questions Widget */}
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        Top Questions
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-green-400 hover:text-green-300 hover:bg-white/5"
                        onClick={() => setActiveTab("qa")}
                      >
                        View all
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <QACard
                        question="How do I get enough iron on a plant-based diet?"
                        author="Alex Thompson"
                        timestamp="3 hours ago"
                        tags={["nutrition", "beginners"]}
                        upvotes={45}
                        answers={12}
                        hasAcceptedAnswer
                        excerpt="I'm concerned about iron deficiency. What are the best plant sources?"
                        onUserClick={handleUserClick}
                        compact
                      />

                      <QACard
                        question="Best B12 supplement brands?"
                        author="Jordan Lee"
                        timestamp="1 day ago"
                        tags={["supplements"]}
                        upvotes={28}
                        answers={8}
                        hasAcceptedAnswer
                        onUserClick={handleUserClick}
                        compact
                      />

                      <QACard
                        question="Traveling in Europe - restaurant tips?"
                        author="Sam Parker"
                        timestamp="2 days ago"
                        tags={["travel"]}
                        upvotes={19}
                        answers={15}
                        onUserClick={handleUserClick}
                        compact
                      />
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full mt-4 bg-white/5 hover:bg-white/10 text-white border-white/20"
                      onClick={() => setActiveTab("qa")}
                    >
                      Ask a Question
                    </Button>
                  </GlassCard>

                  {/* Community Stats */}
                  <GlassCard className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Target className="h-5 w-5 text-green-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Community Impact</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Food waste reduced</span>
                        <span className="text-lg font-bold text-green-400">45 tons</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Policy changes</span>
                        <span className="text-lg font-bold text-green-400">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Active campaigns</span>
                        <span className="text-lg font-bold text-green-400">8</span>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            </TabsContent>

            {/* Q&A Tab */}
            <TabsContent value="qa" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white">Questions & Answers</h2>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    Ask a Question
                  </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <QACard
                    question="How do I get enough iron on a plant-based diet?"
                    author="Alex Thompson"
                    timestamp="3 hours ago"
                    tags={["nutrition", "beginners"]}
                    upvotes={45}
                    answers={12}
                    hasAcceptedAnswer
                    excerpt="I'm concerned about iron deficiency. What are the best plant sources and how can I improve absorption?"
                    onUserClick={handleUserClick}
                  />

                  <QACard
                    question="Best B12 supplement brands?"
                    author="Jordan Lee"
                    timestamp="1 day ago"
                    tags={["supplements", "health"]}
                    upvotes={28}
                    answers={8}
                    hasAcceptedAnswer
                    onUserClick={handleUserClick}
                  />

                  <QACard
                    question="Traveling in Europe - restaurant tips?"
                    author="Sam Parker"
                    timestamp="2 days ago"
                    tags={["travel", "lifestyle"]}
                    upvotes={19}
                    answers={15}
                    onUserClick={handleUserClick}
                  />

                  <QACard
                    question="How to handle family gatherings and holidays?"
                    author="Taylor Brown"
                    timestamp="3 days ago"
                    tags={["lifestyle", "social"]}
                    upvotes={34}
                    answers={22}
                    onUserClick={handleUserClick}
                  />
                </div>
              </motion.div>
            </TabsContent>

            {/* Actions Tab */}
            <TabsContent value="actions" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">Take Action</h2>

                <div className="space-y-8">
                  {/* Decision-line Tracker */}
                  <GlassCard className="p-8">
                    <DecisionLineTracker
                      goal={300}
                      current={247}
                      label="Help us reach our goal to petition the USDA for updated dietary guidelines"
                      deadline="Apr 12"
                      unit="comments"
                    />
                  </GlassCard>

                  {/* Actions Board */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ActionCard
                      title="Submit Public Comment on USDA Guidelines"
                      brief="The USDA is accepting public input on the 2030 Dietary Guidelines. Add your voice supporting plant-based recommendations."
                      target="USDA"
                      deadline="Apr 12, 2026"
                      role="Anyone"
                      status="open"
                    />
                    <ActionCard
                      title="Sign Restaurant Disclosure Petition"
                      brief="Require chain restaurants to label climate impact of menu items, helping diners make informed choices."
                      target="Congress"
                      deadline="May 1, 2026"
                      role="US residents"
                      status="in-progress"
                    />
                    <ActionCard
                      title="Join School Lunch Advocacy Campaign"
                      brief="Work with local schools to add nutritious plant-based options to cafeteria menus."
                      target="School boards"
                      deadline="Ongoing"
                      role="Parents, educators"
                      status="open"
                    />
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">Upcoming Events</h2>

                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-white text-lg">Community Events</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white/70 hover:text-white hover:bg-white/5"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      View calendar
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: "Plant-Based Cooking Workshop", date: "Sat, Feb 8 • 2-4pm", location: "Green Community Kitchen", rsvp: 28 },
                      { title: "Nutrition Q&A with Dr. Chen", date: "Wed, Feb 12 • 7pm", location: "Virtual", rsvp: 156 },
                      { title: "Vegan Restaurant Crawl", date: "Fri, Feb 14 • 6-9pm", location: "Downtown SF", rsvp: 45 },
                      { title: "Documentary Screening: The Game Changers", date: "Sun, Feb 16 • 5pm", location: "Community Center", rsvp: 67 },
                      { title: "Meal Prep Sunday Meetup", date: "Sun, Feb 23 • 10am-1pm", location: "Shared Kitchen Space", rsvp: 34 }
                    ].map((event, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start justify-between py-4 px-4 border border-white/10 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-white mb-1">{event.title}</div>
                          <div className="flex items-center gap-3 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {event.date}
                            </span>
                            <span>•</span>
                            <span>{event.location}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              {event.rsvp} RSVPs
                            </span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-white/5 hover:bg-green-600 hover:text-white hover:border-green-600 text-white border-white/20 transition-all ml-4"
                        >
                          RSVP
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white">Learning Resources</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white/70 hover:text-white hover:bg-white/5"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Glossary
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ResourceCard
                    title="Plant-Based Nutrition: The Complete Evidence-Based Guide"
                    source="Academy of Nutrition"
                    summary="Comprehensive review of nutritional adequacy, health benefits, and practical meal planning for plant-based diets."
                    isPinned
                    lastUpdated="Jan 2026"
                  />
                  <ResourceCard
                    title="Protein Requirements on Vegan Diets"
                    source="NIH"
                    summary="Meta-analysis examining protein needs and bioavailability from plant sources across different age groups."
                  />
                  <ResourceCard
                    title="Environmental Impact of Dietary Choices"
                    source="EPA"
                    summary="Data-driven comparison of carbon footprint, water use, and land requirements across diet types."
                  />
                  <ResourceCard
                    title="B12 Supplementation Guidelines"
                    source="Vegan Health"
                    summary="Evidence-based recommendations for vitamin B12 intake, testing, and supplement selection."
                  />
                  <ResourceCard
                    title="Transitioning Guide: Week-by-Week Plan"
                    source="Plant-Based Treaty"
                    summary="Structured 12-week program for gradually adopting plant-based eating with meal plans and shopping lists."
                  />
                  <ResourceCard
                    title="Athletic Performance on Plant-Based Diets"
                    source="Sports Medicine Journal"
                    summary="Research review on endurance, recovery, and muscle building for plant-based athletes."
                  />
                </div>
              </motion.div>
            </TabsContent>

            {/* Connect Tab */}
            <TabsContent value="connect" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <h2 className="text-3xl font-bold text-white">Connect</h2>

                {/* Community Experts & Subgroups */}
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Column - Star Users & Member Directory */}
                  <div className="lg:col-span-2 space-y-6">
                    <GlassCard className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-400" />
                        Community Experts
                      </h3>
                      <div>
                        <StarUserRow 
                          name="Dr. Sarah Chen" 
                          role="Researcher" 
                          expertise="Nutritional biochemistry"
                          onUserClick={handleUserClick}
                        />
                        <StarUserRow 
                          name="Chef Emma Kim" 
                          role="Organizer" 
                          expertise="Culinary education"
                          onUserClick={handleUserClick}
                        />
                        <StarUserRow 
                          name="Marcus Rodriguez" 
                          role="Practitioner" 
                          expertise="Athlete nutrition"
                          onUserClick={handleUserClick}
                        />
                        <StarUserRow 
                          name="Dr. Amara Johnson" 
                          role="Expert" 
                          expertise="Public health policy"
                          onUserClick={handleUserClick}
                        />
                      </div>
                    </GlassCard>

                    {/* Member Directory */}
                    <GlassCard className="p-6">
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                        <h3 className="font-semibold text-white text-lg">Member Directory</h3>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs cursor-pointer bg-white/10 text-white/80 hover:bg-white/20 transition-colors">
                            City
                          </Badge>
                          <Badge variant="outline" className="text-xs cursor-pointer bg-white/5 text-white/60 border-white/20 hover:bg-white/10 transition-colors">
                            Skills
                          </Badge>
                          <Badge variant="outline" className="text-xs cursor-pointer bg-white/5 text-white/60 border-white/20 hover:bg-white/10 transition-colors">
                            Availability
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-white/70 text-center py-8">
                        {displayMembers} members • Filter by location, skills, or availability
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full bg-white/5 hover:bg-white/10 text-white border-white/20" 
                        size="sm"
                      >
                        Browse Directory
                      </Button>
                    </GlassCard>
                  </div>

                  {/* Right Column - Subgroups */}
                  <div className="lg:col-span-1 space-y-6">
                    <h3 className="text-xl font-semibold text-white">Subgroups</h3>
                    <div className="space-y-4">
                      <SubgroupCard
                        name="Bay Area Vegans"
                        type="City"
                        members={1234}
                        description="Local meetups, restaurant reviews, and community events in the SF Bay Area."
                        isVetted
                      />
                      <SubgroupCard
                        name="Plant-Based Athletes"
                        type="Professional Guild"
                        members={892}
                        description="Training tips, meal plans, and performance optimization for athletes."
                      />
                      <SubgroupCard
                        name="UC Berkeley Vegan Society"
                        type="Campus"
                        members={456}
                        description="Student-led group organizing dinners, film screenings, and activism."
                      />
                    </div>
                  </div>
                </div>

                {/* Impact & Reputation Sections */}
                <div className="space-y-12">
                  {/* Evidence & Impact */}
                  <section>
                    <h3 className="text-2xl font-bold text-white mb-6">Community Impact</h3>

                    {/* Impact Counters */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <GlassCard className="p-6 text-center bg-green-500/5 border-green-500/20">
                        <div className="text-4xl font-bold font-mono text-green-400 mb-2">2,347</div>
                        <div className="text-sm text-white/70">Public comments submitted</div>
                      </GlassCard>
                      <GlassCard className="p-6 text-center bg-blue-500/5 border-blue-500/20">
                        <div className="text-4xl font-bold font-mono text-blue-400 mb-2">89</div>
                        <div className="text-sm text-white/70">Public hearings attended</div>
                      </GlassCard>
                      <GlassCard className="p-6 text-center bg-emerald-500/5 border-emerald-500/20">
                        <div className="text-4xl font-bold font-mono text-emerald-400 mb-2">12</div>
                        <div className="text-sm text-white/70">Policy changes passed</div>
                      </GlassCard>
                    </div>

                    {/* Outcomes */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <OutcomeCard
                        title="California School Lunch Program Expansion"
                        status="PASSED"
                        date="Dec 15, 2025"
                        description="Bill AB-1234 passed requiring all public schools to offer daily plant-based meal options. Implementation begins Fall 2026."
                        artifacts={[
                          { label: "Full bill text", url: "#" },
                          { label: "Vote record", url: "#" },
                          { label: "Impact report", url: "#" }
                        ]}
                      />
                      <OutcomeCard
                        title="Restaurant Menu Labeling Initiative"
                        status="IN PROGRESS"
                        date="Ongoing"
                        description="City ordinance requiring carbon footprint disclosure on menus. Currently in committee review with strong public support."
                        artifacts={[
                          { label: "Draft ordinance", url: "#" },
                          { label: "Public comments", url: "#" }
                        ]}
                      />
                    </div>
                  </section>

                  {/* Reputation */}
                  <section>
                    <h3 className="text-2xl font-bold text-white mb-6">Your Reputation</h3>

                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <GlassCard className="p-6">
                          <ReputationMeter
                            points={2847}
                            level="Contributor"
                            badges={[
                              { name: "Verified Member", type: "verified" },
                              { name: "Evidence Pro", type: "evidence" },
                              { name: "Active Organizer", type: "organizer" }
                            ]}
                            contributions={{
                              answersAccepted: 23,
                              actionsCompleted: 15,
                              sourcesAdded: 47
                            }}
                          />
                        </GlassCard>
                      </div>

                      <div>
                        <GlassCard className="p-6">
                          <h4 className="font-semibold text-white mb-4">Available Roles</h4>
                          <div className="space-y-4">
                            <div>
                              <div className="font-medium text-sm text-white mb-1">Moderator</div>
                              <div className="text-xs text-white/60 mb-2">Help maintain community standards</div>
                              <Button variant="outline" size="sm" className="w-full bg-white/5 hover:bg-white/10 text-white border-white/20">
                                Apply
                              </Button>
                            </div>
                            <div className="pt-3 border-t border-white/10">
                              <div className="font-medium text-sm text-white mb-1">Event Host</div>
                              <div className="text-xs text-white/60 mb-2">Organize local meetups</div>
                              <Button variant="outline" size="sm" className="w-full bg-white/5 hover:bg-white/10 text-white border-white/20">
                                Apply
                              </Button>
                            </div>
                            <div className="pt-3 border-t border-white/10">
                              <div className="font-medium text-sm text-white mb-1">Curator</div>
                              <div className="text-xs text-white/60 mb-2">Maintain resource library</div>
                              <Button variant="outline" size="sm" className="w-full bg-white/5 hover:bg-white/10 text-white border-white/20">
                                Apply
                              </Button>
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                    </div>
                  </section>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <ComprehensiveFooter onNavigate={onNavigate} />
    </GradientBackground>
  );
}