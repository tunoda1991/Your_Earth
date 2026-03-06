import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, BarChart3, TrendingUp, Users, GraduationCap, Building2, Globe, Factory, Leaf, Award, Target, ArrowRight, Calculator, Flag, AlertTriangle, Sparkles, LineChart, Plane, Database, Zap, Network } from "lucide-react";
import { CO2Timeline } from "@/components/CO2Timeline";
import { motion } from "framer-motion";
import { BlinkingStars } from "@/components/BlinkingStars";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { GlassHero } from "@/components/glass/GlassHero";
import { GlassCard } from "@/components/glass/GlassCard";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";

const learningStats = [
  {
    title: "Active Learners",
    value: "47,234",
    change: "+23% this month",
    icon: Users
  },
  {
    title: "Companies Tracked",
    value: "2,847",
    change: "+156 new companies",
    icon: Building2
  },
  {
    title: "Courses Available",
    value: "324",
    change: "+18 new courses",
    icon: BookOpen
  },
  {
    title: "Certificates Issued",
    value: "12,456",
    change: "+34% completion rate",
    icon: Award
  }
];

const learningModules = [
  {
    title: "Climate Education",
    description: "Access world-class climate science education from leading experts with interactive courses, certifications, and skill assessments.",
    icon: GraduationCap,
    slug: "education",
    features: [
      "324+ expert-led courses",
      "Interactive learning modules",
      "Professional certifications",
      "Skill progress tracking"
    ],
    stats: {
      courses: "324",
      experts: "150+",
      students: "47K+"
    },
    color: "blue",
    hasSubcategories: false
  },
  {
    title: "Carbon Calculator",
    description: "Calculate your individual carbon footprint across transportation, diet, energy, and lifestyle choices with actionable reduction insights.",
    icon: Calculator,
    slug: "calculator",
    features: [
      "Comprehensive lifestyle tracking",
      "Real-time emission calculations", 
      "Personalized reduction tips",
      "Global impact comparisons"
    ],
    stats: {
      categories: "6+",
      factors: "Real-time",
      insights: "Personal"
    },
    color: "green",
    hasSubcategories: false
  },
  {
    title: "Climate Data Dashboard",
    description: "Real-time climate data, emissions tracking, flight monitoring, and interactive visualizations across multiple data layers.",
    icon: BarChart3,
    slug: "climate-data-dashboard",
    subcategories: [
      {
        icon: LineChart,
        label: "Climate Overview",
        description: "Global climate metrics"
      },
      {
        icon: Factory,
        label: "TRACE Emissions",
        description: "Global emissions tracking"
      },
      {
        icon: Plane,
        label: "Flight Tracker",
        description: "Real-time aviation data"
      },
      {
        icon: Building2,
        label: "Corporate Data",
        description: "Company climate impact"
      },
      {
        icon: Globe,
        label: "Interactive Maps",
        description: "Visual data layers"
      }
    ],
    stats: {
      datasets: "Live",
      coverage: "Global",
      updates: "Real-time"
    },
    color: "cyan",
    hasSubcategories: true
  },
  {
    title: "Corporate Monitor",
    description: "Track corporate climate accountability with comprehensive emissions data, sustainability commitments, and real-world impact tracking.",
    icon: Building2,
    slug: "corporate",
    features: [
      "2,847 companies tracked",
      "Real-time emissions data",
      "Sustainability commitments",
      "Climate accountability scores"
    ],
    stats: {
      companies: "2,847",
      updates: "Daily",
      coverage: "Global"
    },
    color: "orange",
    hasSubcategories: false
  },
  {
    title: "Organization Bank",
    description: "Bloomberg-style database of climate champions and polluters. Access comprehensive financial, sustainability, and emissions data for informed decision-making.",
    icon: Database,
    slug: "databank",
    features: [
      "Climate champions & polluters database",
      "Financial & ESG metrics",
      "Bloomberg-style visualizations",
      "Category-based organization"
    ],
    stats: {
      organizations: "5,000+",
      updates: "Daily",
      coverage: "Global"
    },
    color: "purple",
    hasSubcategories: false
  },
  {
    title: "Infrastructure Map",
    description: "Explore global energy infrastructure — power plants, renewable facilities, and industrial sites — across 164 countries. Capacity-based sizing, 8 facility sub-types, live data from WRI Global Power Plant Database.",
    icon: Globe,
    slug: "infra-map",
    features: [
      "164 countries covered",
      "8 facility sub-types",
      "Capacity-based dot sizing",
      "3D globe + 2D Mercator views"
    ],
    stats: {
      facilities: "35,000+",
      countries: "164",
      view: "3D / 2D"
    },
    color: "teal",
    hasSubcategories: false
  },
  {
    title: "Disaster Map",
    description: "Interactive 3D globe of 152 global climate disaster events — floods, wildfires, hurricanes, heatwaves and more. Filter by type, search by location, view photographic records with Supabase-backed media.",
    icon: AlertTriangle,
    slug: "disaster-map",
    features: [
      "152 documented disaster events",
      "10 disaster type categories",
      "Photo records per event",
      "Terminal-style data aesthetic"
    ],
    stats: {
      events: "152",
      types: "10",
      view: "3D globe"
    },
    color: "orange",
    hasSubcategories: false
  },
  {
    title: "Live Electricity Map",
    description: "Real-time global carbon intensity and electricity mix by country and grid zone. See which regions are running clean vs fossil-heavy right now, updated every 15 minutes.",
    icon: Zap,
    slug: "electricity-map",
    features: [
      "190+ countries & grid zones",
      "Live carbon intensity (gCO₂eq/kWh)",
      "Electricity mix by source",
      "Updates every 15 minutes"
    ],
    stats: {
      zones: "350+",
      granularity: "15 min",
      view: "Live"
    },
    color: "yellow",
    hasSubcategories: false
  },
  {
    title: "Emissions Map",
    description: "Explore global emissions sources from Climate TRACE — 500+ top emitters by sector, year slider, and 3D globe or 2D map with country borders.",
    icon: BarChart3,
    slug: "emissions-map",
    features: [
      "Climate TRACE API v7",
      "Sector-based filtering",
      "Year slider (2015–2024)",
      "3D globe + 2D map views"
    ],
    stats: {
      sources: "500+",
      sectors: "10",
      view: "3D / 2D"
    },
    color: "rose",
    hasSubcategories: false
  },
  {
    title: "User Network",
    description: "Visualize the global community of climate advocates — see who is connected to whom, where they reside, and how the network spans across continents.",
    icon: Network,
    slug: "user-network",
    features: [
      "40+ global climate advocates",
      "Connection arcs across continents",
      "Role & connection type filters",
      "3D globe + 2D map views"
    ],
    stats: {
      members: "40",
      connections: "65",
      view: "3D / 2D"
    },
    color: "indigo",
    hasSubcategories: false
  }
];

interface LearnPageProps {
  onNavigate?: (page: string) => void;
  user?: any;
}

export function LearnPage({ onNavigate, user }: LearnPageProps) {
  // Calculate user's birth year if available
  const userBirthYear = user?.birthYear || undefined;

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
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-2">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Climate Education Hub
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-5xl lg:text-7xl font-bold text-center mb-6 text-white">
                Master{" "}
                <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Climate
                </span>{" "}
                Science
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-center text-slate-300 mb-12 max-w-2xl mx-auto">
                324+ expert-led courses to transform your understanding
              </p>

              {/* Floating Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* 324 Courses */}
                <motion.div
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-7 w-7 text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">324</div>
                  <div className="text-slate-400">Courses</div>
                </motion.div>

                {/* 47K Learners */}
                <motion.div
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-7 w-7 text-green-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">47K</div>
                  <div className="text-slate-400">Learners</div>
                </motion.div>

                {/* 150 Certificates */}
                <motion.div
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-7 w-7 text-emerald-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">150</div>
                  <div className="text-slate-400">Certificates</div>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 px-8 py-6 text-lg"
                  onClick={() => onNavigate && onNavigate('learn-education')}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Learning
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="backdrop-blur-lg bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                  onClick={() => onNavigate && onNavigate('learn-education')}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Browse Courses
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modules Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Target className="h-4 w-4 mr-2" />
              10 Learning Paths
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Choose Your <span className="text-primary">Learning Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our specialized modules designed to provide comprehensive climate knowledge, 
              real-time data, and actionable insights for your climate journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto items-stretch">
            {learningModules.map((module, index) => {
              const IconComponent = module.icon;
              
              // Special rendering for Climate Data Dashboard card
              if (module.hasSubcategories) {
                return (
                  <GlassCard key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 lg:col-span-2 h-full flex flex-col">
                    {/* Top accent bar - cyan gradient */}
                    <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600" />
                    
                    <CardHeader className="pb-4">
                      {/* Icon section */}
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-8 w-8 text-cyan-500" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{module.title}</CardTitle>
                          {/* Subtitle badges */}
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-xs bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                              Live Data
                            </Badge>
                            <Badge variant="secondary" className="text-xs bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                              5 Categories
                            </Badge>
                            <Badge variant="secondary" className="text-xs bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                              Global Coverage
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col pb-6">
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {module.description}
                      </p>

                      {/* Subcategories section */}
                      <div className="space-y-3 mb-6">
                        <h4 className="font-semibold text-sm text-cyan-600">Data Categories</h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {module.subcategories?.map((subcat, i) => {
                            const SubIcon = subcat.icon;
                            return (
                              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-cyan-500/20 text-center">
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                  <SubIcon className="h-5 w-5 text-cyan-500" />
                                </div>
                                <div className="text-xs font-semibold">{subcat.label}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex-1"></div>

                      {/* Button */}
                      <Button 
                        className="w-full group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700" 
                        onClick={() => onNavigate && onNavigate(module.slug)}
                      >
                        <span>Explore Climate Data</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </GlassCard>
                );
              }
              
              // Standard card rendering for other modules
              return (
                <GlassCard key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                  <div className={`h-1 bg-gradient-to-r ${
                    module.color === 'blue' ? 'from-blue-500 to-blue-600' : 
                    module.color === 'green' ? 'from-green-500 to-green-600' :
                    module.color === 'orange' ? 'from-orange-500 to-orange-600' :
                    module.color === 'teal' ? 'from-teal-500 to-teal-600' :
                    module.color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
                    module.color === 'rose' ? 'from-rose-500 to-rose-600' :
                    module.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                    'from-purple-500 to-purple-600'
                  }`} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className={`w-14 h-14 rounded-lg ${
                        module.color === 'blue' ? 'bg-blue-500/10' : 
                        module.color === 'green' ? 'bg-green-500/10' :
                        module.color === 'orange' ? 'bg-orange-500/10' :
                        module.color === 'teal' ? 'bg-teal-500/10' :
                        module.color === 'yellow' ? 'bg-yellow-500/10' :
                        module.color === 'rose' ? 'bg-rose-500/10' :
                        module.color === 'indigo' ? 'bg-indigo-500/10' :
                        'bg-purple-500/10'
                      } flex items-center justify-center`}>
                        <IconComponent className={`h-7 w-7 ${
                          module.color === 'blue' ? 'text-blue-500' : 
                          module.color === 'green' ? 'text-green-500' :
                          module.color === 'orange' ? 'text-orange-500' :
                          module.color === 'teal' ? 'text-teal-500' :
                          module.color === 'yellow' ? 'text-yellow-500' :
                          module.color === 'rose' ? 'text-rose-500' :
                          module.color === 'indigo' ? 'text-indigo-500' :
                          'text-purple-500'
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

                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {module.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-medium text-sm">Key Features:</h4>
                      <ul className="space-y-2">
                        {module.features?.map((feature, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              module.color === 'blue' ? 'bg-blue-500' : 
                              module.color === 'green' ? 'bg-green-500' :
                              module.color === 'orange' ? 'bg-orange-500' :
                              module.color === 'teal' ? 'bg-teal-500' :
                              module.color === 'yellow' ? 'bg-yellow-500' :
                              module.color === 'rose' ? 'bg-rose-500' :
                              module.color === 'indigo' ? 'bg-indigo-500' :
                              'bg-purple-500'
                            }`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-1"></div>

                    <div className="mb-6">
                      <Button 
                        className="w-full group" 
                        onClick={() => onNavigate && onNavigate(`learn-${module.slug}`)}
                      >
                        <span>Explore {module.title}</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </GlassCard>
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