import { BlinkingStars } from "@/components/BlinkingStars";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { GlassHero } from "@/components/glass/GlassHero";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Target, 
  Calendar, 
  Briefcase, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Zap, 
  MapPin, 
  Sparkles, 
  Globe, 
  Award 
} from "lucide-react";

interface ActionPageProps {
  onNavigate?: (page: string) => void;
  user?: any;
}

const actionModules = [
  {
    title: "Campaigns & Actions",
    slug: "campaigns-actions",
    icon: Target,
    description: "Join powerful campaigns and complete quick actions to drive immediate climate impact",
    color: "green",
    stats: {
      Active: "247",
      Completed: "89K+"
    },
    features: [
      "Petition signing & advocacy",
      "Local climate action groups",
      "Corporate accountability campaigns"
    ]
  },
  {
    title: "Events & Gatherings",
    slug: "events",
    icon: Calendar,
    description: "Connect through local meetups, virtual summits, and global climate events",
    color: "blue",
    stats: {
      Monthly: "127",
      Attendees: "45K+"
    },
    features: [
      "Climate strikes & marches",
      "Virtual learning workshops",
      "Community organizing events"
    ]
  },
  {
    title: "Climate Jobs & Careers",
    slug: "jobs",
    icon: Briefcase,
    description: "Find meaningful careers in sustainability, clean energy, and climate technology",
    color: "purple",
    stats: {
      Openings: "3,247",
      Companies: "890+"
    },
    features: [
      "Renewable energy positions",
      "Climate tech startups",
      "Sustainability consulting roles"
    ]
  },
  {
    title: "Green Marketplace",
    slug: "marketplace",
    icon: ShoppingBag,
    description: "Discover and support businesses committed to sustainable practices",
    color: "emerald",
    stats: {
      Products: "12K+",
      Vendors: "1,850"
    },
    features: [
      "Carbon-neutral products",
      "Ethical fashion & goods",
      "Zero-waste alternatives"
    ]
  }
];

export function ActionPage({ onNavigate, user }: ActionPageProps) {
  return (
    <div className="pt-8">
      {/* Hero Section with Blinking Stars */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950">
        {/* Blinking Stars Background */}
        <BlinkingStars />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Large Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-3xl p-12 shadow-2xl">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-2">
                  <Target className="h-4 w-4 mr-2" />
                  Climate Action Hub
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-5xl lg:text-7xl font-bold text-center mb-6 text-white">
                Take{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Real Action
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-center text-slate-300 mb-12 max-w-2xl mx-auto">
                247 active campaigns · 156K people mobilized · 445 cities impacted
              </p>

              {/* Floating Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* 89K Actions */}
                <motion.div
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-7 w-7 text-green-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">89K</div>
                  <div className="text-slate-400">Actions Taken</div>
                </motion.div>

                {/* 156K People */}
                <motion.div
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-7 w-7 text-emerald-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">156K</div>
                  <div className="text-slate-400">Mobilized</div>
                </motion.div>

                {/* 445 Cities */}
                <motion.div
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-7 w-7 text-cyan-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">445</div>
                  <div className="text-slate-400">Cities</div>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 px-8 py-6 text-lg"
                  onClick={() => onNavigate && onNavigate('action-create')}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start a Campaign
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="backdrop-blur-lg bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                  onClick={() => onNavigate && onNavigate('action')}
                >
                  <Target className="h-5 w-5 mr-2" />
                  Browse Actions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Categories Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Zap className="h-4 w-4 mr-2" />
              4 Ways to Take Action
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Choose Your <span className="text-primary">Impact Path</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From grassroots activism to career changes, find the perfect way to contribute
              to climate solutions and make a meaningful difference.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {actionModules.map((module, index) => {
              const IconComponent = module.icon;
              
              return (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className={`h-1 bg-gradient-to-r ${
                    module.color === 'green' ? 'from-green-500 to-green-600' : 
                    module.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    module.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-emerald-500 to-emerald-600'
                  }`} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className={`w-14 h-14 rounded-lg ${
                        module.color === 'green' ? 'bg-green-500/10' : 
                        module.color === 'blue' ? 'bg-blue-500/10' :
                        module.color === 'purple' ? 'bg-purple-500/10' :
                        'bg-emerald-500/10'
                      } flex items-center justify-center`}>
                        <IconComponent className={`h-7 w-7 ${
                          module.color === 'green' ? 'text-green-500' : 
                          module.color === 'blue' ? 'text-blue-500' :
                          module.color === 'purple' ? 'text-purple-500' :
                          'text-emerald-500'
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
                      <h4 className="font-medium text-sm">Key Features:</h4>
                      <ul className="space-y-2">
                        {module.features?.map((feature, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              module.color === 'green' ? 'bg-green-500' : 
                              module.color === 'blue' ? 'bg-blue-500' :
                              module.color === 'purple' ? 'bg-purple-500' :
                              'bg-emerald-500'
                            }`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-1"></div>

                    <Button 
                      className="w-full group" 
                      onClick={() => onNavigate && onNavigate(module.slug)}
                    >
                      <span>Explore {module.title}</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Collective Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Together, we're creating measurable change for our planet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2.3M Tons CO₂</h3>
              <p className="text-muted-foreground text-sm">
                Carbon emissions prevented through our campaigns and actions.
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">150K Trees Planted</h3>
              <p className="text-muted-foreground text-sm">
                Reforestation projects supported by our community worldwide.
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold mb-3">45K Tons Waste</h3>
              <p className="text-muted-foreground text-sm">
                Diverted from landfills through circular economy initiatives.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </div>
  );
}