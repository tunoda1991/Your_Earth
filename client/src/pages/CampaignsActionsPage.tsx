import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/glass/GlassCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  Target,
  Users,
  TrendingUp,
  Zap,
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Globe,
  Leaf,
  Droplets,
  Wind,
  Factory,
  Share2,
  Heart,
  ExternalLink,
  Search,
  Filter,
  Award,
  Megaphone,
  Vote,
  FileText,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

interface CampaignsActionsPageProps {
  onNavigate?: (page: string) => void;
  user?: any;
}

const campaignStats = [
  {
    title: "Active Campaigns",
    value: "247",
    change: "+23 this month",
    icon: Target,
  },
  {
    title: "People Mobilized",
    value: "156K",
    change: "+5.2K this week",
    icon: Users,
  },
  {
    title: "Cities Impacted",
    value: "445",
    change: "+18 new cities",
    icon: Globe,
  },
  {
    title: "Actions Completed",
    value: "89K",
    change: "+1.2K today",
    icon: TrendingUp,
  },
];

const quickActions = [
  {
    id: 1,
    title: "Sign Climate Emergency Declaration",
    description: "Add your name to the global petition demanding urgent climate action",
    icon: FileText,
    participants: 45230,
    timeEstimate: "2 min",
    category: "Advocacy",
    impact: "High",
    color: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  {
    id: 2,
    title: "Share Renewable Energy Facts",
    description: "Spread awareness about clean energy on social media",
    icon: Share2,
    participants: 12450,
    timeEstimate: "3 min",
    category: "Awareness",
    impact: "Medium",
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  {
    id: 3,
    title: "Contact Your Representative",
    description: "Send a message about supporting climate legislation",
    icon: MessageSquare,
    participants: 8920,
    timeEstimate: "5 min",
    category: "Advocacy",
    impact: "High",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    id: 4,
    title: "Calculate Your Carbon Footprint",
    description: "Track your environmental impact and get personalized recommendations",
    icon: Leaf,
    participants: 34210,
    timeEstimate: "10 min",
    category: "Education",
    impact: "Medium",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    id: 5,
    title: "Vote for Climate Champions",
    description: "Research and support pro-climate candidates in upcoming elections",
    icon: Vote,
    participants: 23450,
    timeEstimate: "15 min",
    category: "Political",
    impact: "High",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: 6,
    title: "Join Local Climate Group",
    description: "Connect with climate activists in your community",
    icon: Users,
    participants: 15670,
    timeEstimate: "1 min",
    category: "Community",
    impact: "High",
    color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
];

const campaigns = [
  {
    id: 1,
    title: "Solar Schools Initiative",
    description: "Help install solar panels in 100 schools across underserved communities to provide clean energy education",
    image: "https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzb2xhciUyMHBhbmVsc3xlbnwxfHx8fDE3NzAyNTg0Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    goal: 100,
    current: 67,
    deadline: "Dec 31, 2024",
    participants: 2340,
    category: "Energy",
    categoryIcon: Zap,
    impact: "500,000 students impacted",
    difficulty: "Medium",
    trending: true,
    featured: true,
  },
  {
    id: 2,
    title: "Urban Forest Restoration",
    description: "Plant 10,000 native trees in urban areas to improve air quality, reduce heat islands, and enhance biodiversity",
    image: "https://images.unsplash.com/photo-1633975531445-94aa5f8d5a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVlJTIwcGxhbnRpbmclMjB2b2x1bnRlZXJzJTIwbmF0dXJlfGVufDF8fHx8MTc3MDIwNzcyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    goal: 10000,
    current: 8234,
    deadline: "Spring 2025",
    participants: 1850,
    category: "Nature",
    categoryIcon: Leaf,
    impact: "2,400 tons CO₂ offset annually",
    difficulty: "Easy",
    trending: false,
    featured: true,
  },
  {
    id: 3,
    title: "Clean Energy Policy Advocacy",
    description: "Advocate for renewable energy legislation in local and state governments to accelerate the transition to clean energy",
    image: "https://images.unsplash.com/photo-1766184537344-3c5898cf5c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwYWN0aXZpc20lMjBwcm90ZXN0JTIwbWFyY2h8ZW58MXx8fHwxNzcwMzIzNjgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    goal: 50,
    current: 23,
    deadline: "Nov 30, 2024",
    participants: 890,
    category: "Policy",
    categoryIcon: Megaphone,
    impact: "State-wide policy change",
    difficulty: "Hard",
    trending: true,
    featured: false,
  },
  {
    id: 4,
    title: "Ocean Cleanup Drive",
    description: "Remove plastic waste from coastlines and protect marine ecosystems through organized cleanup events",
    image: "https://images.unsplash.com/photo-1610093666020-baec20684087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGNsZWFudXAlMjBwbGFzdGljJTIwd2FzdGV8ZW58MXx8fHwxNzcwMzIzNjgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    goal: 1000,
    current: 567,
    deadline: "Summer 2025",
    participants: 3240,
    category: "Water",
    categoryIcon: Droplets,
    impact: "50 tons plastic removed",
    difficulty: "Easy",
    trending: false,
    featured: true,
  },
  {
    id: 5,
    title: "Sustainable Cities Initiative",
    description: "Transform urban infrastructure with green buildings, bike lanes, and public transit improvements",
    image: "https://images.unsplash.com/photo-1630404991412-9504d094e8ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGNpdHklMjBncmVlbiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MDI3ODA1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    goal: 25,
    current: 18,
    deadline: "Dec 2025",
    participants: 5670,
    category: "Urban",
    categoryIcon: Factory,
    impact: "15 cities transformed",
    difficulty: "Hard",
    trending: true,
    featured: false,
  },
  {
    id: 6,
    title: "Air Quality Monitoring Network",
    description: "Deploy citizen-science air quality sensors to track pollution and hold polluters accountable",
    image: "https://images.unsplash.com/photo-1569163139394-de4e5f43e5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwcGV0aXRpb24lMjBzaWduaW5nJTIwYWR2b2NhY3l8ZW58MXx8fHwxNzcwMzIzNjgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    goal: 500,
    current: 342,
    deadline: "Spring 2025",
    participants: 1240,
    category: "Air",
    categoryIcon: Wind,
    impact: "100+ communities monitored",
    difficulty: "Medium",
    trending: false,
    featured: false,
  },
];

const categories = [
  { value: "all", label: "All Categories", icon: Globe },
  { value: "energy", label: "Energy", icon: Zap },
  { value: "nature", label: "Nature", icon: Leaf },
  { value: "water", label: "Water", icon: Droplets },
  { value: "air", label: "Air Quality", icon: Wind },
  { value: "policy", label: "Policy", icon: Megaphone },
  { value: "urban", label: "Urban", icon: Factory },
];

export function CampaignsActionsPage({ onNavigate, user }: CampaignsActionsPageProps) {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      searchQuery === "" ||
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || campaign.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-3xl p-12 shadow-2xl">
              <div className="text-center">
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-2 mb-6">
                  <Target className="h-4 w-4 mr-2" />
                  Climate Action Hub
                </Badge>

                <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
                  Campaigns &{" "}
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Actions
                  </span>
                </h1>

                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                  Join powerful campaigns and complete quick actions to drive immediate climate impact.
                  Together, we can create the change our planet needs.
                </p>

                {/* Floating Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {campaignStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2,
                        }}
                      >
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                          <IconComponent className="h-6 w-6 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-400 mb-1">{stat.title}</div>
                        <div className="text-xs text-slate-500">{stat.change}</div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 px-8 py-6 text-lg"
                    onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Take Action Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="backdrop-blur-lg bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                    onClick={() => onNavigate && onNavigate("action-create")}
                  >
                    Start Your Campaign
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="campaigns">
                <Target className="h-4 w-4 mr-2" />
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="quick-actions">
                <Zap className="h-4 w-4 mr-2" />
                Quick Actions
              </TabsTrigger>
            </TabsList>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns" className="space-y-8">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Featured Campaigns */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-2xl">Featured Campaigns</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCampaigns
                    .filter((c) => c.featured)
                    .map((campaign) => {
                      const IconComponent = campaign.categoryIcon;
                      const progress = (campaign.current / campaign.goal) * 100;
                      const isFavorite = favorites.includes(campaign.id);

                      return (
                        <GlassCard key={campaign.id} variant="medium" hover className="h-full flex flex-col">
                          <CardContent className="p-0 flex-1 flex flex-col">
                            {/* Image */}
                            <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                              <ImageWithFallback
                                src={campaign.image}
                                alt={campaign.title}
                                className="w-full h-full object-cover"
                              />
                              {campaign.trending && (
                                <Badge className="absolute top-3 left-3 bg-red-500/90 text-white border-0">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute top-3 right-3"
                                onClick={() => toggleFavorite(campaign.id)}
                              >
                                <Heart
                                  className={`h-4 w-4 ${
                                    isFavorite ? "fill-red-500 text-red-500" : ""
                                  }`}
                                />
                              </Button>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                              <div className="flex items-start gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-green-500/10">
                                  <IconComponent className="h-5 w-5 text-green-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-xs">
                                      {campaign.category}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className={
                                        campaign.difficulty === "Easy"
                                          ? "text-green-400 border-green-400/50"
                                          : campaign.difficulty === "Medium"
                                          ? "text-yellow-400 border-yellow-400/50"
                                          : "text-red-400 border-red-400/50"
                                      }
                                    >
                                      {campaign.difficulty}
                                    </Badge>
                                  </div>
                                  <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                                </div>
                              </div>

                              <p className="text-muted-foreground mb-4 line-clamp-2">
                                {campaign.description}
                              </p>

                              {/* Progress */}
                              <div className="mb-4">
                                <div className="flex items-center justify-between text-sm mb-2">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="font-medium">
                                    {campaign.current} / {campaign.goal}
                                  </span>
                                </div>
                                <Progress value={progress} className="h-2" />
                                <div className="text-xs text-muted-foreground mt-1">
                                  {progress.toFixed(0)}% complete
                                </div>
                              </div>

                              {/* Spacer */}
                              <div className="flex-1"></div>

                              {/* Stats */}
                              <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="text-center p-2 bg-muted/30 rounded-lg">
                                  <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                                  <div className="text-xs font-medium">
                                    {campaign.participants.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Participants</div>
                                </div>
                                <div className="text-center p-2 bg-muted/30 rounded-lg">
                                  <Calendar className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                                  <div className="text-xs font-medium">{campaign.deadline}</div>
                                  <div className="text-xs text-muted-foreground">Deadline</div>
                                </div>
                                <div className="text-center p-2 bg-muted/30 rounded-lg">
                                  <Award className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                                  <div className="text-xs font-medium truncate">{campaign.impact}</div>
                                  <div className="text-xs text-muted-foreground">Impact</div>
                                </div>
                              </div>

                              {/* Button with margin */}
                              <div className="mb-6">
                                <Button
                                  className="w-full"
                                  onClick={() =>
                                    onNavigate && onNavigate("campaign-detail")
                                  }
                                >
                                  Join Campaign
                                  <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </GlassCard>
                      );
                    })}
                </div>
              </div>

              {/* All Campaigns */}
              <div>
                <h2 className="text-2xl mb-6">All Active Campaigns</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCampaigns
                    .filter((c) => !c.featured)
                    .map((campaign) => {
                      const IconComponent = campaign.categoryIcon;
                      const progress = (campaign.current / campaign.goal) * 100;
                      const isFavorite = favorites.includes(campaign.id);

                      return (
                        <GlassCard key={campaign.id} variant="medium" hover className="h-full flex flex-col">
                          <CardContent className="p-0 flex-1 flex flex-col">
                            {/* Image */}
                            <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                              <ImageWithFallback
                                src={campaign.image}
                                alt={campaign.title}
                                className="w-full h-full object-cover"
                              />
                              {campaign.trending && (
                                <Badge className="absolute top-3 left-3 bg-red-500/90 text-white border-0">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute top-3 right-3 h-8 w-8"
                                onClick={() => toggleFavorite(campaign.id)}
                              >
                                <Heart
                                  className={`h-4 w-4 ${
                                    isFavorite ? "fill-red-500 text-red-500" : ""
                                  }`}
                                />
                              </Button>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex-1 flex flex-col">
                              <div className="flex items-start gap-2 mb-3">
                                <div className="p-1.5 rounded-lg bg-green-500/10">
                                  <IconComponent className="h-4 w-4 text-green-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold mb-1 line-clamp-2">{campaign.title}</h3>
                                  <Badge variant="outline" className="text-xs">
                                    {campaign.category}
                                  </Badge>
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {campaign.description}
                              </p>

                              {/* Progress */}
                              <div className="mb-3">
                                <Progress value={progress} className="h-1.5 mb-1" />
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>
                                    {campaign.current} / {campaign.goal}
                                  </span>
                                  <span>{progress.toFixed(0)}%</span>
                                </div>
                              </div>

                              {/* Spacer */}
                              <div className="flex-1"></div>

                              {/* Stats */}
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {campaign.participants.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {campaign.deadline}
                                </div>
                              </div>

                              {/* Button with margin */}
                              <div className="mb-6">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={() =>
                                    onNavigate && onNavigate("campaign-detail")
                                  }
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </GlassCard>
                      );
                    })}
                </div>
              </div>
            </TabsContent>

            {/* Quick Actions Tab */}
            <TabsContent value="quick-actions" className="space-y-8">
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl mb-2">Quick Climate Actions</h2>
                  <p className="text-muted-foreground">
                    Make an immediate impact with these quick, powerful actions. Every action counts!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quickActions.map((action) => {
                    const IconComponent = action.icon;
                    return (
                      <GlassCard key={action.id} variant="medium" hover className="h-full flex flex-col">
                        <CardContent className="p-6 flex-1 flex flex-col">
                          <div className="flex items-start gap-4 mb-4">
                            <div className={`p-3 rounded-xl ${action.color}`}>
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {action.category}
                                </Badge>
                                <Badge
                                  variant={action.impact === "High" ? "default" : "secondary"}
                                  className="text-xs"
                                >
                                  {action.impact} Impact
                                </Badge>
                              </div>
                              <h3 className="font-semibold mb-2">{action.title}</h3>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4">
                            {action.description}
                          </p>

                          {/* Spacer */}
                          <div className="flex-1"></div>

                          {/* Stats */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {action.participants.toLocaleString()} participants
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {action.timeEstimate}
                            </div>
                          </div>

                          {/* Button with margin */}
                          <div className="mb-6">
                            <Button className="w-full">
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Complete Action
                            </Button>
                          </div>
                        </CardContent>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Impact Section */}
          <section className="mt-16 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Our Collective Impact
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Together, we're making a real difference in the fight against climate change
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold mb-2">2.3M Tons</h3>
                <p className="text-muted-foreground">
                  CO₂ emissions prevented through our campaigns and actions
                </p>
              </Card>

              <Card className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-3xl font-bold mb-2">127 Countries</h3>
                <p className="text-muted-foreground">
                  Global network of climate activists taking action
                </p>
              </Card>

              <Card className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-3xl font-bold mb-2">456 Policies</h3>
                <p className="text-muted-foreground">
                  Climate policies influenced by our advocacy efforts
                </p>
              </Card>
            </div>
          </section>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </div>
  );
}