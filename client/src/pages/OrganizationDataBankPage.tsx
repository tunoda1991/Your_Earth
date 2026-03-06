import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { 
  Factory, 
  Zap, 
  Search, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  Leaf, 
  AlertTriangle,
  Award,
  Filter,
  Globe,
  DollarSign,
  Users,
  Calendar,
  ExternalLink,
  BarChart3,
  UtensilsCrossed,
  Car,
  Laptop,
  Scale,
  TreePine,
  Sparkles,
  BookOpen,
  ChevronRight,
  Database,
  Flame
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { motion } from "framer-motion";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { GlassHero } from "@/components/glass/GlassHero";

const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: Globe },
  { id: 'energy', name: 'Energy', icon: Zap },
  { id: 'food', name: 'Food', icon: UtensilsCrossed },
  { id: 'mobility', name: 'Mobility', icon: Car },
  { id: 'industry', name: 'Industry', icon: Factory },
  { id: 'technology', name: 'Technology', icon: Laptop },
  { id: 'policy', name: 'Policy', icon: Scale },
  { id: 'nature', name: 'Nature', icon: TreePine }
];

const bankStats = [
  {
    title: "Organizations",
    value: "2,500+",
    change: "+180 this quarter",
    icon: Building2
  },
  {
    title: "Data Points",
    value: "5.2M",
    change: "Real-time tracking",
    icon: BarChart3
  },
  {
    title: "Countries",
    value: "195",
    change: "Global coverage",
    icon: Globe
  },
  {
    title: "Verified",
    value: "98.5%",
    change: "Accuracy rate",
    icon: Award
  }
];

const CLIMATE_CHAMPIONS = [
  {
    id: 1,
    name: "Tesla Inc.",
    category: "mobility",
    type: "for-profit",
    description: "Electric vehicles and clean energy solutions",
    country: "United States",
    founded: "2003",
    employees: "127,855",
    marketCap: "$789B",
    revenue: "$96.8B",
    esgScore: 89,
    climateImpact: {
      co2Avoided: "45.2M tons/year",
      renewableEnergy: "100%",
      carbonNeutral: true
    },
    financials: {
      revenue: 96.8,
      growth: "+18.8%",
      profit: "$12.6B",
      rnd: "$3.8B"
    },
    metrics: [
      { label: "EVs Delivered", value: "1.8M", trend: "up" },
      { label: "Battery Capacity", value: "100 GWh", trend: "up" },
      { label: "Charging Stations", value: "45,000+", trend: "up" }
    ],
    logo: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200",
    verified: true
  },
  {
    id: 2,
    name: "Ørsted",
    category: "energy",
    type: "for-profit",
    description: "Global leader in offshore wind energy",
    country: "Denmark",
    founded: "2006",
    employees: "7,292",
    marketCap: "$45B",
    revenue: "$21.4B",
    esgScore: 95,
    climateImpact: {
      co2Avoided: "16.4M tons/year",
      renewableEnergy: "100%",
      carbonNeutral: true
    },
    financials: {
      revenue: 21.4,
      growth: "+12.4%",
      profit: "$3.2B",
      rnd: "$890M"
    },
    metrics: [
      { label: "Offshore Wind", value: "13 GW", trend: "up" },
      { label: "Countries", value: "15", trend: "up" },
      { label: "Green Jobs", value: "7,292", trend: "up" }
    ],
    logo: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=200",
    verified: true
  },
  {
    id: 3,
    name: "Impossible Foods",
    category: "food",
    type: "for-profit",
    description: "Plant-based meat alternatives reducing agricultural emissions",
    country: "United States",
    founded: "2011",
    employees: "800",
    marketCap: "$7B (Private)",
    revenue: "$500M",
    esgScore: 87,
    climateImpact: {
      co2Avoided: "3.5M tons/year",
      landSaved: "1.2M hectares",
      waterSaved: "450M liters"
    },
    financials: {
      revenue: 0.5,
      growth: "+65%",
      funding: "$2B",
      rnd: "$120M"
    },
    metrics: [
      { label: "Products Sold", value: "50M lbs", trend: "up" },
      { label: "Retail Locations", value: "22,000+", trend: "up" },
      { label: "Countries", value: "12", trend: "up" }
    ],
    logo: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=200",
    verified: true
  },
  {
    id: 4,
    name: "The Nature Conservancy",
    category: "nature",
    type: "non-profit",
    description: "Global environmental conservation organization",
    country: "United States",
    founded: "1951",
    employees: "3,500",
    assets: "$8.2B",
    revenue: "$1.1B",
    esgScore: 98,
    climateImpact: {
      landProtected: "125M acres",
      carbonSequestered: "25M tons/year",
      projectsActive: "400+"
    },
    financials: {
      donations: 1.1,
      growth: "+8%",
      programSpend: "87%",
      impact: "$4.8B"
    },
    metrics: [
      { label: "Protected Land", value: "125M acres", trend: "up" },
      { label: "Countries", value: "79", trend: "stable" },
      { label: "Members", value: "1M+", trend: "up" }
    ],
    logo: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200",
    verified: true
  },
  {
    id: 5,
    name: "Climeworks",
    category: "technology",
    type: "for-profit",
    description: "Direct air capture technology for carbon removal",
    country: "Switzerland",
    founded: "2009",
    employees: "450",
    marketCap: "$1.2B (Private)",
    revenue: "$45M",
    esgScore: 92,
    climateImpact: {
      co2Captured: "900K tons/year (capacity)",
      facilitiesOperating: "18",
      carbonRemoval: "Permanent"
    },
    financials: {
      revenue: 0.045,
      growth: "+180%",
      funding: "$780M",
      rnd: "$32M"
    },
    metrics: [
      { label: "CO₂ Captured", value: "900K tons", trend: "up" },
      { label: "Facilities", value: "18", trend: "up" },
      { label: "Partners", value: "45", trend: "up" }
    ],
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200",
    verified: true
  }
];

const CLIMATE_POLLUTERS = [
  {
    id: 1,
    name: "Saudi Aramco",
    category: "industry",
    industry: "Oil & Gas",
    description: "World's largest oil producing company",
    country: "Saudi Arabia",
    founded: "1933",
    employees: "70,000",
    marketCap: "$2.1T",
    revenue: "$604B",
    esgScore: 15,
    climateImpact: {
      co2Emissions: "1,590M tons/year",
      scope1: "55M tons",
      scope3: "1,535M tons"
    },
    financials: {
      revenue: 604,
      growth: "+46%",
      profit: "$161B",
      dividends: "$78B"
    },
    metrics: [
      { label: "Oil Production", value: "13.6M bbl/day", trend: "up" },
      { label: "Gas Production", value: "13.7B scf/day", trend: "up" },
      { label: "Proven Reserves", value: "268B bbl", trend: "stable" }
    ],
    logo: "https://images.unsplash.com/photo-1553322378-eb94e5966b0c?w=200",
    verified: true,
    pollutionRank: 1
  },
  {
    id: 2,
    name: "China Energy Investment Corp",
    category: "industry",
    industry: "Coal Mining & Power",
    description: "World's largest coal mining and power company",
    country: "China",
    founded: "2017",
    employees: "340,000",
    marketCap: "$65B",
    revenue: "$85B",
    esgScore: 12,
    climateImpact: {
      co2Emissions: "1,280M tons/year",
      coalProduction: "560M tons/year",
      powerGeneration: "240 GW (mostly coal)"
    },
    financials: {
      revenue: 85,
      growth: "+8%",
      profit: "$3.2B",
      assets: "$298B"
    },
    metrics: [
      { label: "Coal Production", value: "560M tons", trend: "up" },
      { label: "Power Capacity", value: "240 GW", trend: "up" },
      { label: "Coal Plants", value: "145", trend: "stable" }
    ],
    logo: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=200",
    verified: true,
    pollutionRank: 2
  },
  {
    id: 3,
    name: "Gazprom",
    category: "industry",
    industry: "Natural Gas",
    description: "Russia's largest natural gas producer",
    country: "Russia",
    founded: "1989",
    employees: "471,600",
    marketCap: "$45B",
    revenue: "$156B",
    esgScore: 18,
    climateImpact: {
      co2Emissions: "780M tons/year",
      methaneLeaks: "High",
      gasProduction: "514B m³/year"
    },
    financials: {
      revenue: 156,
      growth: "-25%",
      profit: "$34B",
      exports: "185B m³"
    },
    metrics: [
      { label: "Gas Production", value: "514B m³", trend: "down" },
      { label: "Pipeline Length", value: "177K km", trend: "stable" },
      { label: "Gas Reserves", value: "35T m³", trend: "stable" }
    ],
    logo: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=200",
    verified: true,
    pollutionRank: 3
  },
  {
    id: 4,
    name: "ExxonMobil",
    category: "industry",
    industry: "Oil & Gas",
    description: "American multinational oil and gas corporation",
    country: "United States",
    founded: "1999",
    employees: "62,000",
    marketCap: "$467B",
    revenue: "$413B",
    esgScore: 22,
    climateImpact: {
      co2Emissions: "720M tons/year",
      scope1: "120M tons",
      scope3: "600M tons"
    },
    financials: {
      revenue: 413,
      growth: "+44%",
      profit: "$56B",
      capex: "$23B"
    },
    metrics: [
      { label: "Oil Production", value: "3.7M bbl/day", trend: "stable" },
      { label: "Refining Capacity", value: "4.6M bbl/day", trend: "stable" },
      { label: "Chemical Sales", value: "$35B", trend: "up" }
    ],
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200",
    verified: true,
    pollutionRank: 4
  },
  {
    id: 5,
    name: "Coal India Limited",
    category: "industry",
    industry: "Coal Mining",
    description: "World's largest coal producer by volume",
    country: "India",
    founded: "1975",
    employees: "250,000",
    marketCap: "$45B",
    revenue: "$18B",
    esgScore: 16,
    climateImpact: {
      co2Emissions: "650M tons/year",
      coalProduction: "622M tons/year",
      miningArea: "2.4M hectares"
    },
    financials: {
      revenue: 18,
      growth: "+12%",
      profit: "$2.1B",
      production: "622M tons"
    },
    metrics: [
      { label: "Coal Production", value: "622M tons", trend: "up" },
      { label: "Mines Operating", value: "340", trend: "stable" },
      { label: "Market Share", value: "82% (India)", trend: "stable" }
    ],
    logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200",
    verified: true,
    pollutionRank: 5
  }
];

interface OrganizationDataBankPageProps {
  onNavigate?: (page: string) => void;
}

export function OrganizationDataBankPage({ onNavigate }: OrganizationDataBankPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [activeTab, setActiveTab] = useState("champions");
  const [selectedOrg, setSelectedOrg] = useState<any>(null);

  const filteredChampions = CLIMATE_CHAMPIONS.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || org.category === selectedCategory;
    const matchesType = selectedType === "all" || org.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const filteredPolluters = CLIMATE_POLLUTERS.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || org.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <GradientBackground category="default" orbCount={3}>
      <div className="pt-8">
        {/* Hero Section */}
        <GlassHero category="default" size="lg">
          <div className="text-center">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2 mb-6">
              <Building2 className="h-4 w-4 mr-2" />
              Organization Data Bank
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
              Climate{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Organization Database
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Comprehensive financial and sustainability data for 2,500+ climate champions and polluters. 
              Bloomberg-style insights for informed decision making.
            </p>

            {/* Floating Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {bankStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="h-6 w-6 text-blue-400" />
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
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 px-8 py-6 text-lg"
                onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Explore Database
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-lg bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Download Reports
              </Button>
            </div>
          </div>
        </GlassHero>

        {/* Filter Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative md:col-span-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search organizations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {activeTab === "champions" && (
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <Building2 className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="for-profit">For-Profit</SelectItem>
                        <SelectItem value="non-profit">Non-Profit</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Organizations Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="champions" className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Climate Champions ({filteredChampions.length})
                </TabsTrigger>
                <TabsTrigger value="polluters" className="flex items-center gap-2">
                  <Flame className="h-4 w-4" />
                  Major Polluters ({filteredPolluters.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="champions" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredChampions.map(org => (
                    <OrganizationCard 
                      key={org.id} 
                      org={org} 
                      type="champion"
                      onClick={() => setSelectedOrg(org)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="polluters" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredPolluters.map(org => (
                    <OrganizationCard 
                      key={org.id} 
                      org={org} 
                      type="polluter"
                      onClick={() => setSelectedOrg(org)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Climate TRACE Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Global Emissions Data
                </Badge>
                <h2 className="text-4xl font-bold mb-4">
                  Independent <span className="text-primary">Emissions Tracking</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Explore comprehensive emissions tracking from Climate TRACE
                </p>
              </div>
              
              <Card className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-1">Climate TRACE</CardTitle>
                        <CardDescription className="text-base">
                          Independent greenhouse gas emissions tracking
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Live Data
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      Access detailed emissions data from 70,000+ facilities worldwide, powered by satellite imagery, 
                      AI, and advanced analytics. Track emissions by sector, country, and asset with unprecedented detail.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 rounded-lg bg-muted">
                        <div className="text-2xl font-bold text-primary">42.5 Gt</div>
                        <div className="text-xs text-muted-foreground mt-1">Total Emissions 2023</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted">
                        <div className="text-2xl font-bold text-primary">195</div>
                        <div className="text-xs text-muted-foreground mt-1">Countries Tracked</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted">
                        <div className="text-2xl font-bold text-primary">70,000+</div>
                        <div className="text-xs text-muted-foreground mt-1">Facilities</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted">
                        <div className="text-2xl font-bold text-primary">7</div>
                        <div className="text-xs text-muted-foreground mt-1">Major Sectors</div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      size="lg"
                      onClick={() => onNavigate && onNavigate('learn-trace')}
                    >
                      Explore Climate TRACE Data
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 max-w-5xl mx-auto">
              <CardContent className="p-12 text-center">
                <Database className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Access the Full Database</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Get complete financial and climate data on all organizations. Perfect for investors, researchers, and advocates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Request Full Access
                  </Button>
                  <Button variant="outline" size="lg">
                    Download Sample Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Organization Detail Modal */}
      <Dialog open={!!selectedOrg} onOpenChange={() => setSelectedOrg(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="org-detail-description">
          <DialogDescription id="org-detail-description" className="sr-only">
            Detailed information about the selected organization
          </DialogDescription>
          {selectedOrg && <OrganizationDetail org={selectedOrg} type={activeTab} />}
        </DialogContent>
      </Dialog>
      
      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </GradientBackground>
  );
}

function OrganizationCard({ org, type, onClick }: { org: any; type: 'champion' | 'polluter'; onClick: () => void }) {
  const categoryInfo = CATEGORIES.find(c => c.id === org.category);
  const CategoryIcon = categoryInfo?.icon || Building2;
  const isChampion = type === 'champion';

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <ImageWithFallback 
              src={org.logo} 
              alt={org.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <CardTitle className="text-xl flex items-center gap-2 flex-wrap">
                  {org.name}
                  {org.verified && <Badge variant="secondary" className="text-xs"><Award className="h-3 w-3 mr-1" />Verified</Badge>}
                </CardTitle>
                <CardDescription className="mt-1">{org.description}</CardDescription>
              </div>
              {!isChampion && org.pollutionRank && (
                <Badge variant="destructive" className="flex-shrink-0">
                  #{org.pollutionRank} Polluter
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <CategoryIcon className="h-4 w-4" />
            {categoryInfo?.name}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {org.country}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Founded {org.founded}
          </div>
        </div>

        <Separator />

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4">
          {org.metrics.slice(0, 3).map((metric: any, idx: number) => (
            <div key={idx} className="text-center">
              <div className="text-lg font-bold">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        <Separator />

        {/* ESG Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>ESG Score</span>
            <span className="font-bold">{org.esgScore}/100</span>
          </div>
          <Progress 
            value={org.esgScore} 
            className={`h-2 ${
              org.esgScore >= 70 ? '[&>div]:bg-green-500' :
              org.esgScore >= 40 ? '[&>div]:bg-yellow-500' :
              '[&>div]:bg-red-500'
            }`}
          />
        </div>

        <Button variant="outline" className="w-full group">
          View Full Details
          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}

function OrganizationDetail({ org, type }: { org: any; type: string }) {
  const isChampion = type === 'champions';
  const categoryInfo = CATEGORIES.find(c => c.id === org.category);
  const CategoryIcon = categoryInfo?.icon || Building2;

  return (
    <div className="space-y-6">
      {/* Header */}
      <DialogHeader>
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <ImageWithFallback 
              src={org.logo} 
              alt={org.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <DialogTitle className="text-2xl flex items-center gap-2 flex-wrap">
              {org.name}
              {org.verified && <Badge variant="secondary"><Award className="h-3 w-3 mr-1" />Verified</Badge>}
              {!isChampion && org.pollutionRank && (
                <Badge variant="destructive">#{org.pollutionRank} Global Polluter</Badge>
              )}
            </DialogTitle>
            <DialogDescription className="mt-2">{org.description}</DialogDescription>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <CategoryIcon className="h-4 w-4" />
                {categoryInfo?.name}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {org.country}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Founded {org.founded}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {org.employees} employees
              </div>
            </div>
          </div>
        </div>
      </DialogHeader>

      <Separator />

      {/* Financial Overview */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Financial Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{isChampion ? org.marketCap : `$${org.financials.revenue}B`}</div>
              <div className="text-sm text-muted-foreground">{isChampion ? 'Market Cap' : 'Revenue'}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{org.financials.growth}</div>
              <div className="text-sm text-muted-foreground">YoY Growth</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{isChampion ? org.revenue : org.financials.profit}</div>
              <div className="text-sm text-muted-foreground">{isChampion ? 'Annual Revenue' : 'Net Profit'}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{org.esgScore}/100</div>
              <div className="text-sm text-muted-foreground">ESG Score</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Climate Impact */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          {isChampion ? <Leaf className="h-5 w-5 text-green-600" /> : <Flame className="h-5 w-5 text-red-600" />}
          Climate Impact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(org.climateImpact).map(([key, value]) => (
            <Card key={key} className={isChampion ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}>
              <CardContent className="p-4">
                <div className="font-bold text-lg">{value as string}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Key Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Key Performance Metrics
        </h3>
        <div className="space-y-3">
          {org.metrics.map((metric: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">{metric.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">{metric.value}</span>
                {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                {metric.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Official Website
        </Button>
        <Button variant="outline" className="flex-1">
          <BarChart3 className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>
    </div>
  );
}