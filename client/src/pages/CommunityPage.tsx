import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/glass/GlassCard";
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Zap, 
  UtensilsCrossed, 
  Car, 
  Factory, 
  Laptop, 
  Scale, 
  TreePine,
  Award,
  Globe,
  TrendingUp,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { BlinkingStars } from "@/components/BlinkingStars";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { GlassHero } from "@/components/glass/GlassHero";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";

interface CommunityPageProps {
  category?: string;
  onNavigate?: (page: string) => void;
}

const communityModules = [
  {
    title: "Community Feed",
    slug: "feed",
    icon: MessageCircle,
    description: "The real-time pulse of the Your Earth community. Browse posts, discussions, and updates across all 7 climate categories. Like, repost, comment, and share what matters to you.",
    color: "green",
    stats: {
      Posts: "8.4K",
      Members: "47K+"
    },
    features: [
      "Cross-category activity stream",
      "Like, repost & bookmark posts",
      "Community compose & discussions",
      "Live disaster & climate event alerts"
    ]
  },
  {
    title: "Energy",
    slug: "energy",
    icon: Zap,
    description: "Join discussions on renewable energy, sustainability practices, and clean power solutions",
    color: "yellow",
    stats: {
      Members: "15.2K",
      Posts: "8.9K"
    },
    features: [
      "Solar & wind energy discussions",
      "Home efficiency tips",
      "Grid modernization updates"
    ]
  },
  {
    title: "Food & Agriculture",
    slug: "food",
    icon: UtensilsCrossed,
    description: "Connect with sustainable food advocates, farmers, and nutrition experts",
    color: "orange",
    stats: {
      Members: "12.4K",
      Posts: "6.2K"
    },
    features: [
      "Sustainable farming methods",
      "Plant-based nutrition",
      "Food waste reduction"
    ]
  },
  {
    title: "Mobility & Transport",
    slug: "mobility",
    icon: Car,
    description: "Explore clean transportation solutions, EV adoption, and urban mobility",
    color: "blue",
    stats: {
      Members: "18.7K",
      Posts: "11.3K"
    },
    features: [
      "Electric vehicle community",
      "Public transit advocacy",
      "Bike-friendly city planning"
    ]
  },
  {
    title: "Industry & Manufacturing",
    slug: "industry",
    icon: Factory,
    description: "Network with professionals driving green manufacturing and sustainable business",
    color: "gray",
    stats: {
      Members: "9.8K",
      Posts: "4.5K"
    },
    features: [
      "Industrial decarbonization",
      "Circular economy practices",
      "Supply chain sustainability"
    ]
  },
  {
    title: "Technology & Innovation",
    slug: "technology",
    icon: Laptop,
    description: "Discover climate tech innovations and connect with developers building solutions",
    color: "purple",
    stats: {
      Members: "21.5K",
      Posts: "14.7K"
    },
    features: [
      "Climate tech startups",
      "AI for sustainability",
      "Green software development"
    ]
  },
  {
    title: "Policy & Governance",
    slug: "policy",
    icon: Scale,
    description: "Engage in climate policy discussions and advocate for systemic change",
    color: "red",
    stats: {
      Members: "7.9K",
      Posts: "5.1K"
    },
    features: [
      "Climate legislation tracking",
      "Policy advocacy campaigns",
      "International climate agreements"
    ]
  },
  {
    title: "Nature & Conservation",
    slug: "nature",
    icon: TreePine,
    description: "Join conservationists protecting biodiversity and restoring ecosystems",
    color: "green",
    stats: {
      Members: "16.3K",
      Posts: "9.8K"
    },
    features: [
      "Wildlife conservation projects",
      "Reforestation initiatives",
      "Ocean protection efforts"
    ]
  }
];

export function CommunityPage({ category, onNavigate }: CommunityPageProps) {
  return (
    <div className="pt-8">
      {/* Hero Section with Blinking Stars */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        {/* Blinking Stars Background */}
        <BlinkingStars />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Large Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-3xl p-12 shadow-2xl">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  Climate Community Hub
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-5xl lg:text-7xl font-bold text-center mb-6 text-white">
                Connect with{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  52K+ Members
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-center text-slate-300 mb-12 max-w-2xl mx-auto">
                Join 7 specialized communities driving climate action worldwide
              </p>

              {/* Floating Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* 52K Members */}
                <motion.div
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-7 w-7 text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">52K</div>
                  <div className="text-slate-400">Active Members</div>
                </motion.div>

                {/* 8.9K Posts */}
                <motion.div
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-7 w-7 text-emerald-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">8.9K</div>
                  <div className="text-slate-400">Discussions</div>
                </motion.div>

                {/* 89 Countries */}
                <motion.div
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-7 w-7 text-cyan-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">89</div>
                  <div className="text-slate-400">Countries</div>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 px-8 py-6 text-lg"
                  onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Explore Communities
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="backdrop-blur-lg bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                  onClick={() => onNavigate && onNavigate('community-create')}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Create Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Categories Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <TreePine className="h-4 w-4 mr-2" />
              7 Community Categories
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Find Your <span className="text-primary">Climate Tribe</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with like-minded individuals passionate about specific areas of climate action,
              share knowledge, and collaborate on solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {communityModules.map((module, index) => {
              const IconComponent = module.icon;
              
              return (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className={`h-1 bg-gradient-to-r ${
                    module.color === 'yellow' ? 'from-yellow-500 to-yellow-600' : 
                    module.color === 'orange' ? 'from-orange-500 to-orange-600' :
                    module.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    module.color === 'gray' ? 'from-gray-500 to-gray-600' :
                    module.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    module.color === 'red' ? 'from-red-500 to-red-600' :
                    'from-green-500 to-green-600'
                  }`} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className={`w-14 h-14 rounded-lg ${
                        module.color === 'yellow' ? 'bg-yellow-500/10' : 
                        module.color === 'orange' ? 'bg-orange-500/10' :
                        module.color === 'blue' ? 'bg-blue-500/10' :
                        module.color === 'gray' ? 'bg-gray-500/10' :
                        module.color === 'purple' ? 'bg-purple-500/10' :
                        module.color === 'red' ? 'bg-red-500/10' :
                        'bg-green-500/10'
                      } flex items-center justify-center`}>
                        <IconComponent className={`h-7 w-7 ${
                          module.color === 'yellow' ? 'text-yellow-500' : 
                          module.color === 'orange' ? 'text-orange-500' :
                          module.color === 'blue' ? 'text-blue-500' :
                          module.color === 'gray' ? 'text-gray-500' :
                          module.color === 'purple' ? 'text-purple-500' :
                          module.color === 'red' ? 'text-red-500' :
                          'text-green-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                        <div className="flex items-center flex-wrap gap-2">
                          {Object.entries(module.stats).map(([key, value]) => (
                            <Badge key={key} variant="secondary" className="text-xs">
                              {value} {key}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col pb-6">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {module.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-medium text-sm">Popular Topics:</h4>
                      <ul className="space-y-2">
                        {module.features?.map((feature, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              module.color === 'yellow' ? 'bg-yellow-500' : 
                              module.color === 'orange' ? 'bg-orange-500' :
                              module.color === 'blue' ? 'bg-blue-500' :
                              module.color === 'gray' ? 'bg-gray-500' :
                              module.color === 'purple' ? 'bg-purple-500' :
                              module.color === 'red' ? 'bg-red-500' :
                              'bg-green-500'
                            }`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-1"></div>

                    <Button 
                      className="w-full group" 
                      onClick={() => onNavigate && onNavigate(`community-${module.slug}`)}
                    >
                      <span>Join Community</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </div>
  );
}