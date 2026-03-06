import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  BookOpen,
  MessageCircle,
  Settings,
  CreditCard,
  Shield,
  Users,
  HelpCircle,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { GradientBackground } from "@/components/glass/GradientBackground";

interface HelpCenterPageProps {
  onNavigate: (page: string) => void;
}

export function HelpCenterPage({ onNavigate }: HelpCenterPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of Your Earth",
      articleCount: 12,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Users,
      title: "Community & Networking",
      description: "Connect with climate champions",
      articleCount: 18,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Manage your profile and preferences",
      articleCount: 15,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: CreditCard,
      title: "Donations & Billing",
      description: "Support campaigns and manage payments",
      articleCount: 8,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Keep your data safe",
      articleCount: 10,
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: MessageCircle,
      title: "Campaigns & Actions",
      description: "Create and join climate campaigns",
      articleCount: 20,
      color: "text-teal-500",
      bgColor: "bg-teal-500/10"
    }
  ];

  const popularArticles = [
    {
      title: "How to create your first climate campaign",
      category: "Campaigns",
      views: "12.5K views"
    },
    {
      title: "Understanding your carbon footprint calculation",
      category: "Getting Started",
      views: "9.8K views"
    },
    {
      title: "Connecting with local climate action groups",
      category: "Community",
      views: "8.2K views"
    },
    {
      title: "Setting up two-factor authentication",
      category: "Security",
      views: "7.1K views"
    },
    {
      title: "How donations support climate initiatives",
      category: "Billing",
      views: "6.4K views"
    }
  ];

  return (
    <GradientBackground category="default" orbCount={3}>
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Help Center
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              How can we help you?
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Search our knowledge base or browse categories below
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/10 backdrop-blur-lg border-white/20 text-white placeholder:text-slate-400 text-lg"
              />
            </div>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Card 
                  key={index} 
                  className="bg-slate-900/50 backdrop-blur-xl border-white/10 hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                        <category.icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <CardTitle className="text-white text-lg">{category.title}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500">
                      {category.articleCount} articles
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Popular Articles */}
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Popular Articles</CardTitle>
                  <CardDescription className="text-slate-400">
                    Most viewed help articles this week
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {popularArticles.map((article, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <Badge variant="secondary" className="text-xs">
                            {article.category}
                          </Badge>
                          <span>{article.views}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Still need help?</CardTitle>
                  <CardDescription className="text-slate-400">
                    Can't find what you're looking for?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600"
                    onClick={() => onNavigate('contact')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 hover:bg-white/10"
                    onClick={() => onNavigate('community')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Ask Community
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <HelpCircle className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Feature Request?
                  </h3>
                  <p className="text-sm text-slate-300 mb-4">
                    Have an idea to improve Your Earth? We'd love to hear it!
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 hover:bg-white/10"
                    size="sm"
                  >
                    Submit Feedback
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-white">Support Status</span>
                  </div>
                  <p className="text-sm text-slate-400">
                    All systems operational
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Average response time: 4 hours
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}