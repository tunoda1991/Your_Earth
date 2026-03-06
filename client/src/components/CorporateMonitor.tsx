import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  ThumbsUp,
  Heart,
  Users,
  Trophy,
  Sparkles,
  BookOpen
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { GlassHero } from "@/components/glass/GlassHero";

const pollutingCompanies = [
  {
    id: 1,
    name: "PetroGlobal Corp",
    country: "United States",
    countryCode: "US",
    industry: "Oil & Gas",
    co2Emissions: "187.5M",
    emissionsChange: "+2.3%",
    marketCap: "$245B",
    esgScore: 23,
    status: "high-polluter",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMG9mZmljZSUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3NTg2MjA2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    name: "CoalPower Industries",
    country: "China",
    countryCode: "CN",
    industry: "Coal Mining",
    co2Emissions: "234.7M",
    emissionsChange: "+1.8%",
    marketCap: "$156B",
    esgScore: 18,
    status: "high-polluter",
    logo: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTg2MjA2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    name: "SteelMax Corporation",
    country: "India",
    countryCode: "IN",
    industry: "Steel Production",
    co2Emissions: "89.2M",
    emissionsChange: "-0.5%",
    marketCap: "$78B",
    esgScore: 31,
    status: "moderate-polluter",
    logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTg2MjA2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    name: "ChemGiant Ltd",
    country: "Germany",
    countryCode: "DE",
    industry: "Chemicals",
    co2Emissions: "56.8M",
    emissionsChange: "+3.1%",
    marketCap: "$89B",
    esgScore: 28,
    status: "moderate-polluter",
    logo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTg2MjA2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 5,
    name: "BrasOil Enterprises",
    country: "Brazil",
    countryCode: "BR",
    industry: "Oil & Gas",
    co2Emissions: "123.4M",
    emissionsChange: "+4.2%",
    marketCap: "$67B",
    esgScore: 25,
    status: "high-polluter",
    logo: "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTg2MjA2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const cleanCompanies = [
  {
    id: 1,
    name: "SolarTech Solutions",
    country: "Denmark",
    countryCode: "DK",
    industry: "Solar Energy",
    renewableCapacity: "12.5 GW",
    capacityChange: "+18.7%",
    marketCap: "$89B",
    esgScore: 94,
    status: "leading-clean",
    logo: "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsc3xlbnwxfHx8fDE3NTg2MjA2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    name: "WindForce Global",
    country: "Norway",
    countryCode: "NO",
    industry: "Wind Energy",
    renewableCapacity: "8.9 GW",
    capacityChange: "+22.1%",
    marketCap: "$76B",
    esgScore: 91,
    status: "leading-clean",
    logo: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwdHVyYmluZXN8ZW58MXx8fHwxNzU4NjIwNjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    name: "Tesla Inc",
    country: "United States",
    countryCode: "US",
    industry: "Electric Vehicles",
    renewableCapacity: "6.2 GW",
    capacityChange: "+15.3%",
    marketCap: "$847B",
    esgScore: 87,
    status: "leading-clean",
    logo: "https://images.unsplash.com/photo-1617788138017-80ad40651399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhciUyMGNoYXJnaW5nfGVufDF8fHx8MTc1ODYyMDY0OXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    name: "GreenHydro Power",
    country: "Canada",
    countryCode: "CA",
    industry: "Hydroelectric",
    renewableCapacity: "15.7 GW",
    capacityChange: "+8.9%",
    marketCap: "$54B",
    esgScore: 89,
    status: "leading-clean",
    logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWRyb2VsZWN0cmljJTIwZGFtfGVufDF8fHx8MTc1ODYyMDY0OXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 5,
    name: "BioFuels Innovations",
    country: "Sweden",
    countryCode: "SE",
    industry: "Bioenergy",
    renewableCapacity: "4.3 GW",
    capacityChange: "+26.4%",
    marketCap: "$23B",
    esgScore: 92,
    status: "leading-clean",
    logo: "https://images.unsplash.com/photo-1766246719951-0d21674dd9b2?w=800&q=80"
  }
];

const monitorStats = [
  {
    title: "Companies Tracked",
    value: "2,847",
    change: "+156 this month",
    icon: Building2
  },
  {
    title: "Climate Leaders",
    value: "892",
    change: "+45 new leaders",
    icon: Award
  },
  {
    title: "Active Users",
    value: "15,234",
    change: "+8% growth",
    icon: Users
  },
  {
    title: "Data Points",
    value: "1.2M",
    change: "Real-time updates",
    icon: TrendingUp
  }
];

const corporateLeaders = [
  {
    rank: 1,
    name: "Ørsted",
    country: "Denmark",
    industry: "Offshore Wind",
    esgScore: 95,
    co2Avoided: "16.4M tons/year",
    renewableCapacity: "13 GW",
    change: "+22%"
  },
  {
    rank: 2,
    name: "Vestas Wind Systems",
    country: "Denmark",
    industry: "Wind Turbines",
    esgScore: 93,
    co2Avoided: "14.8M tons/year",
    renewableCapacity: "11.5 GW",
    change: "+18%"
  },
  {
    rank: 3,
    name: "NextEra Energy",
    country: "United States",
    industry: "Renewable Energy",
    esgScore: 91,
    co2Avoided: "12.2M tons/year",
    renewableCapacity: "10.8 GW",
    change: "+15%"
  },
  {
    rank: 4,
    name: "Iberdrola",
    country: "Spain",
    industry: "Renewable Power",
    esgScore: 90,
    co2Avoided: "11.5M tons/year",
    renewableCapacity: "9.8 GW",
    change: "+20%"
  },
  {
    rank: 5,
    name: "Enel Green Power",
    country: "Italy",
    industry: "Renewable Energy",
    esgScore: 89,
    co2Avoided: "10.3M tons/year",
    renewableCapacity: "9.2 GW",
    change: "+17%"
  }
];

const countryStats = [
  { country: "United States", polluters: 47, cleaners: 23, ratio: 2.04 },
  { country: "China", polluters: 62, cleaners: 18, ratio: 3.44 },
  { country: "India", polluters: 34, cleaners: 12, ratio: 2.83 },
  { country: "Germany", polluters: 18, cleaners: 31, ratio: 0.58 },
  { country: "Norway", polluters: 3, cleaners: 42, ratio: 0.07 },
  { country: "Denmark", polluters: 2, cleaners: 38, ratio: 0.05 },
];

export function CorporateMonitor() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [supportedCompanies, setSupportedCompanies] = useState<number[]>([]);

  // Initialize with some default supported companies
  const [companySupportCounts, setCompanySupportCounts] = useState<Record<number, number>>({
    1: 12453,  // SolarTech Solutions
    2: 9876,   // WindForce Global
    3: 25432,  // Tesla
    4: 6543,   // GreenHydro Power
    5: 4321,   // BioFuels Innovations
  });

  const toggleSupport = (companyId: number, companyName: string) => {
    setSupportedCompanies((prev) => {
      if (prev.includes(companyId)) {
        setCompanySupportCounts((counts) => ({
          ...counts,
          [companyId]: (counts[companyId] || 0) - 1,
        }));
        toast.success(`Removed support from ${companyName}`);
        return prev.filter((id) => id !== companyId);
      } else {
        setCompanySupportCounts((counts) => ({
          ...counts,
          [companyId]: (counts[companyId] || 0) + 1,
        }));
        toast.success(`You're now supporting ${companyName}! 🌱`, {
          description: "Your support helps highlight climate leaders",
        });
        return [...prev, companyId];
      }
    });
  };

  const getStatusColor = (status: string) => {
    if (status === "high-polluter") return "text-red-500 bg-red-50 dark:bg-red-950";
    if (status === "moderate-polluter") return "text-orange-500 bg-orange-50 dark:bg-orange-950";
    if (status === "leading-clean") return "text-green-500 bg-green-50 dark:bg-green-950";
    return "text-gray-500 bg-gray-50 dark:bg-gray-950";
  };

  const getStatusIcon = (status: string) => {
    if (status === "high-polluter") return <AlertTriangle className="h-4 w-4" />;
    if (status === "moderate-polluter") return <Factory className="h-4 w-4" />;
    if (status === "leading-clean") return <Award className="h-4 w-4" />;
    return <Building2 className="h-4 w-4" />;
  };

  const filteredPolluters = pollutingCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !selectedCountry || selectedCountry === "all" || company.country === selectedCountry;
    const matchesIndustry = !selectedIndustry || selectedIndustry === "all" || company.industry.includes(selectedIndustry);
    return matchesSearch && matchesCountry && matchesIndustry;
  });

  const filteredCleaners = cleanCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !selectedCountry || selectedCountry === "all" || company.country === selectedCountry;
    const matchesIndustry = !selectedIndustry || selectedIndustry === "all" || company.industry.includes(selectedIndustry);
    return matchesSearch && matchesCountry && matchesIndustry;
  });

  return (
    <GradientBackground category="industry" orbCount={3}>
      <div className="pt-8">
        {/* Hero Section */}
        <GlassHero category="industry" size="lg">
          <div className="text-center">
            <Badge className="bg-slate-500/10 text-slate-300 border-slate-500/20 px-4 py-2 mb-6">
              <Building2 className="h-4 w-4 mr-2" />
              Corporate Monitor
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
              Corporate{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Climate Impact
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Track corporate climate performance, support clean energy leaders, and hold polluters accountable. 
              Real-time data on 2,800+ companies worldwide.
            </p>

            {/* Floating Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {monitorStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-500/20 flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="h-6 w-6 text-slate-300" />
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
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 px-8 py-6 text-lg"
                onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Explore Companies
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-lg bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                View Reports
              </Button>
            </div>
          </div>
        </GlassHero>

        {/* Filter Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="China">China</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Norway">Norway</SelectItem>
                      <SelectItem value="Denmark">Denmark</SelectItem>
                      <SelectItem value="Brazil">Brazil</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Sweden">Sweden</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="Oil & Gas">Oil & Gas</SelectItem>
                      <SelectItem value="Coal">Coal</SelectItem>
                      <SelectItem value="Steel">Steel</SelectItem>
                      <SelectItem value="Solar">Solar Energy</SelectItem>
                      <SelectItem value="Wind">Wind Energy</SelectItem>
                      <SelectItem value="Electric">Electric Vehicles</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span>Advanced</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Companies Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="cleaners" className="space-y-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="cleaners" className="flex items-center space-x-2">
                  <Leaf className="h-4 w-4" />
                  <span>Clean Leaders ({filteredCleaners.length})</span>
                </TabsTrigger>
                <TabsTrigger value="polluters" className="flex items-center space-x-2">
                  <Factory className="h-4 w-4" />
                  <span>Major Polluters ({filteredPolluters.length})</span>
                </TabsTrigger>
              </TabsList>

              {/* Clean Companies */}
              <TabsContent value="cleaners" className="space-y-6">
                {/* Top Supporters Banner */}
                {supportedCompanies.length > 0 && (
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 max-w-5xl mx-auto">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-500 rounded-full p-3">
                            <Heart className="h-5 w-5 text-white fill-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">You're supporting {supportedCompanies.length} climate leader{supportedCompanies.length > 1 ? 's' : ''}!</h4>
                            <p className="text-sm text-muted-foreground">Your voice helps amplify companies doing great climate work</p>
                          </div>
                        </div>
                        <Trophy className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCleaners.map((company) => {
                    const isSupported = supportedCompanies.includes(company.id);
                    const supportCount = companySupportCounts[company.id] || 0;
                    
                    return (
                      <motion.div
                        key={company.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${isSupported ? 'ring-2 ring-green-500' : ''}`}>
                          <div className="h-64 relative overflow-hidden">
                            <img
                              src={company.logo}
                              alt={company.name}
                              className="w-full h-full object-cover"
                            />
                            <Badge className={`absolute top-4 right-4 ${getStatusColor(company.status)}`}>
                              {getStatusIcon(company.status)}
                              <span className="ml-1">Clean Leader</span>
                            </Badge>
                            {isSupported && (
                              <div className="absolute top-4 left-4 bg-green-500 rounded-full p-2">
                                <Heart className="h-4 w-4 text-white fill-white" />
                              </div>
                            )}
                          </div>
                          
                          <CardHeader>
                            <CardTitle className="text-lg">{company.name}</CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{company.country} • {company.industry}</span>
                            </CardDescription>
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Renewable Capacity</span>
                                <div className="flex items-center space-x-1">
                                  <span className="font-bold text-green-500">{company.renewableCapacity}</span>
                                  <TrendingUp className="h-3 w-3 text-green-500" />
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Market Cap</span>
                                <div className="font-bold">{company.marketCap}</div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>ESG Score</span>
                                <span>{company.esgScore}/100</span>
                              </div>
                              <Progress value={company.esgScore} className="h-2" />
                            </div>

                            {/* Support Stats */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{supportCount.toLocaleString()} supporters</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button
                                variant={isSupported ? "default" : "outline"}
                                size="sm"
                                className="flex-1 gap-2"
                                onClick={() => toggleSupport(company.id, company.name)}
                              >
                                {isSupported ? (
                                  <>
                                    <Heart className="h-4 w-4 fill-current" />
                                    Supporting
                                  </>
                                ) : (
                                  <>
                                    <ThumbsUp className="h-4 w-4" />
                                    Support
                                  </>
                                )}
                              </Button>
                              <Badge variant="outline" className="text-green-500">
                                {company.capacityChange}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Polluters Tab */}
              <TabsContent value="polluters" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPolluters.map((company) => (
                    <Card key={company.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="h-64 relative overflow-hidden">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge className={`absolute top-4 right-4 ${getStatusColor(company.status)}`}>
                          {getStatusIcon(company.status)}
                          <span className="ml-1">High Polluter</span>
                        </Badge>
                      </div>
                      
                      <CardHeader>
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <CardDescription className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{company.country} • {company.industry}</span>
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">CO₂ Emissions</span>
                            <div className="flex items-center space-x-1">
                              <span className="font-bold text-red-500">{company.co2Emissions}</span>
                              <TrendingUp className="h-3 w-3 text-red-500" />
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Market Cap</span>
                            <div className="font-bold">{company.marketCap}</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>ESG Score</span>
                            <span>{company.esgScore}/100</span>
                          </div>
                          <Progress value={company.esgScore} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-red-500">
                            {company.emissionsChange} emissions
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Country Leaderboard Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Award className="h-4 w-4 mr-2" />
                Top Performers
              </Badge>
              <h2 className="text-4xl font-bold mb-4">
                Corporate <span className="text-primary">Climate Leaders</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Companies leading the renewable energy transition, ranked by ESG score and climate impact
              </p>
            </div>

            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {corporateLeaders.map((leader, index) => (
                    <div key={leader.rank} className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-muted'
                      }`}>
                        <span className="font-bold text-white">{leader.rank}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <span className="font-medium text-lg">{leader.name}</span>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3" />
                              <span>{leader.country}</span>
                              <span>•</span>
                              <span>{leader.industry}</span>
                            </div>
                          </div>
                          <Badge variant="default" className="bg-green-500">
                            ESG: {leader.esgScore}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Leaf className="h-3 w-3 text-green-500" />
                            <span>{leader.co2Avoided}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Zap className="h-3 w-3 text-yellow-500" />
                            <span>{leader.renewableCapacity}</span>
                          </div>
                        </div>
                        <Progress 
                          value={leader.esgScore} 
                          className="h-2 mt-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 max-w-5xl mx-auto">
              <CardContent className="p-12 text-center">
                <Building2 className="h-16 w-16 text-blue-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Ready to Drive Corporate Accountability?</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Use this data to make informed decisions, support clean companies, and advocate for climate action.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Download Full Report
                  </Button>
                  <Button variant="outline" size="lg">
                    Set Up Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </GradientBackground>
  );
}