import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GlassCard } from "@/components/glass/GlassCard";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Search,
  Filter,
  ChevronDown,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Users,
  TrendingUp,
  Zap,
  UtensilsCrossed,
  Car,
  Factory,
  Laptop,
  Scale,
  TreePine,
  X,
  Star,
  CheckCircle,
} from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const INTEREST_CATEGORIES = [
  { value: "energy", label: "Energy", icon: Zap, color: "bg-yellow-500" },
  { value: "food", label: "Food", icon: UtensilsCrossed, color: "bg-green-500" },
  { value: "mobility", label: "Mobility", icon: Car, color: "bg-blue-500" },
  { value: "industry", label: "Industry", icon: Factory, color: "bg-gray-500" },
  { value: "technology", label: "Technology", icon: Laptop, color: "bg-purple-500" },
  { value: "policy", label: "Policy", icon: Scale, color: "bg-indigo-500" },
  { value: "nature", label: "Nature", icon: TreePine, color: "bg-emerald-500" },
];

const JOB_TYPES = [
  { value: "all", label: "All Types" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
];

const EXPERIENCE_LEVELS = [
  { value: "all", label: "All Levels" },
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
  { value: "lead", label: "Lead/Manager" },
  { value: "executive", label: "Executive" },
];

// Dummy job listings (these would come from the backend in production)
const DUMMY_JOBS = [
  {
    id: "1",
    title: "Solar Project Engineer",
    company: "SunPower Technologies",
    location: "San Francisco, CA",
    remote: true,
    salary: "$85k - $120k",
    type: "full-time",
    experience: "mid",
    category: "energy",
    description: "Lead the design and implementation of utility-scale solar projects. Work with cross-functional teams to optimize energy output and reduce installation costs.",
    requirements: ["3+ years in renewable energy", "PE license preferred", "Project management experience"],
    posted: "2 days ago",
    applicants: 24,
    logo: "https://images.unsplash.com/photo-1638068110878-c412de93e0a5?w=100",
    featured: true,
  },
  {
    id: "2",
    title: "Sustainable Agriculture Specialist",
    company: "GreenFields Co-op",
    location: "Portland, OR",
    remote: false,
    salary: "$65k - $85k",
    type: "full-time",
    experience: "mid",
    category: "food",
    description: "Develop and implement regenerative farming practices. Train farmers on sustainable techniques and monitor soil health improvements.",
    requirements: ["Degree in Agriculture or Environmental Science", "Knowledge of permaculture", "Strong communication skills"],
    posted: "5 days ago",
    applicants: 18,
    logo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100",
    featured: false,
  },
  {
    id: "3",
    title: "EV Charging Infrastructure Planner",
    company: "ChargeFuture",
    location: "Austin, TX",
    remote: true,
    salary: "$75k - $105k",
    type: "full-time",
    experience: "mid",
    category: "mobility",
    description: "Plan and optimize electric vehicle charging networks across urban areas. Analyze traffic patterns and energy demand to maximize efficiency.",
    requirements: ["Urban planning or engineering background", "Data analysis skills", "Knowledge of EV technology"],
    posted: "1 week ago",
    applicants: 32,
    logo: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=100",
    featured: true,
  },
  {
    id: "4",
    title: "Green Manufacturing Engineer",
    company: "EcoIndustries Inc.",
    location: "Detroit, MI",
    remote: false,
    salary: "$90k - $130k",
    type: "full-time",
    experience: "senior",
    category: "industry",
    description: "Lead initiatives to reduce manufacturing carbon footprint. Implement circular economy principles and optimize resource efficiency.",
    requirements: ["5+ years manufacturing experience", "Lean/Six Sigma certification", "Sustainability background"],
    posted: "3 days ago",
    applicants: 15,
    logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100",
    featured: false,
  },
  {
    id: "5",
    title: "Climate Tech Product Manager",
    company: "TerraData Solutions",
    location: "Seattle, WA",
    remote: true,
    salary: "$110k - $160k",
    type: "full-time",
    experience: "senior",
    category: "technology",
    description: "Drive product strategy for climate data analytics platform. Work with scientists and developers to build tools that accelerate climate action.",
    requirements: ["Product management experience", "Understanding of climate science", "Technical background"],
    posted: "4 days ago",
    applicants: 41,
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100",
    featured: true,
  },
  {
    id: "6",
    title: "Climate Policy Analyst",
    company: "Clean Energy Coalition",
    location: "Washington, DC",
    remote: false,
    salary: "$70k - $95k",
    type: "full-time",
    experience: "mid",
    category: "policy",
    description: "Analyze climate legislation and policy proposals. Prepare briefings and recommendations for advocacy campaigns.",
    requirements: ["Master's in Public Policy or related field", "2+ years policy experience", "Strong writing skills"],
    posted: "1 day ago",
    applicants: 28,
    logo: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=100",
    featured: false,
  },
  {
    id: "7",
    title: "Reforestation Project Coordinator",
    company: "Global Forest Initiative",
    location: "Multiple Locations",
    remote: false,
    salary: "$55k - $75k",
    type: "full-time",
    experience: "entry",
    category: "nature",
    description: "Coordinate tree planting projects and manage volunteer teams. Monitor forest health and track carbon sequestration metrics.",
    requirements: ["Environmental science background", "Project coordination experience", "Willingness to travel"],
    posted: "6 days ago",
    applicants: 52,
    logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100",
    featured: false,
  },
  {
    id: "8",
    title: "Wind Energy Technician",
    company: "WindWorks Energy",
    location: "Iowa / Remote",
    remote: true,
    salary: "$60k - $85k",
    type: "full-time",
    experience: "mid",
    category: "energy",
    description: "Maintain and repair wind turbines. Perform regular inspections and troubleshoot mechanical and electrical issues.",
    requirements: ["Technical certification", "Experience with renewable energy systems", "Physical fitness for climbing"],
    posted: "3 days ago",
    applicants: 19,
    logo: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=100",
    featured: false,
  },
  {
    id: "9",
    title: "Sustainable Supply Chain Manager",
    company: "CircularGoods",
    location: "New York, NY",
    remote: true,
    salary: "$95k - $135k",
    type: "full-time",
    experience: "senior",
    category: "industry",
    description: "Transform supply chain operations to minimize environmental impact. Implement circular economy principles and track sustainability metrics.",
    requirements: ["Supply chain management experience", "Sustainability certification", "Data analytics skills"],
    posted: "2 days ago",
    applicants: 27,
    logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100",
    featured: true,
  },
  {
    id: "10",
    title: "Climate Data Scientist",
    company: "AtmosAI",
    location: "Boston, MA",
    remote: true,
    salary: "$120k - $170k",
    type: "full-time",
    experience: "senior",
    category: "technology",
    description: "Develop machine learning models to predict climate patterns and optimize renewable energy systems. Work with large-scale climate datasets.",
    requirements: ["PhD or Master's in relevant field", "Python/R proficiency", "Experience with climate data"],
    posted: "1 week ago",
    applicants: 38,
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100",
    featured: false,
  },
  {
    id: "11",
    title: "Urban Sustainability Consultant",
    company: "GreenCity Partners",
    location: "Chicago, IL",
    remote: false,
    salary: "$70k - $100k",
    type: "contract",
    experience: "mid",
    category: "policy",
    description: "Advise cities on sustainability initiatives. Develop climate action plans and work with municipal governments on implementation.",
    requirements: ["Urban planning background", "Consulting experience", "Strong presentation skills"],
    posted: "5 days ago",
    applicants: 22,
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100",
    featured: false,
  },
  {
    id: "12",
    title: "Organic Farm Manager",
    company: "Harvest Haven Farms",
    location: "Vermont",
    remote: false,
    salary: "$50k - $70k",
    type: "full-time",
    experience: "mid",
    category: "food",
    description: "Manage day-to-day operations of organic farm. Oversee crop planning, staff management, and market sales.",
    requirements: ["Farm management experience", "Organic certification knowledge", "Physical stamina"],
    posted: "4 days ago",
    applicants: 16,
    logo: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=100",
    featured: false,
  },
  {
    id: "13",
    title: "E-Bike Fleet Operations Manager",
    company: "PedalPower Systems",
    location: "Denver, CO",
    remote: false,
    salary: "$65k - $90k",
    type: "full-time",
    experience: "mid",
    category: "mobility",
    description: "Manage electric bike sharing fleet. Optimize bike distribution, maintenance schedules, and user experience.",
    requirements: ["Operations management experience", "Data-driven decision making", "Customer service focus"],
    posted: "2 days ago",
    applicants: 21,
    logo: "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=100",
    featured: false,
  },
  {
    id: "14",
    title: "Wildlife Conservation Biologist",
    company: "Biodiversity Trust",
    location: "Multiple Locations",
    remote: false,
    salary: "$60k - $85k",
    type: "full-time",
    experience: "mid",
    category: "nature",
    description: "Conduct field research on endangered species. Develop and implement conservation strategies to protect biodiversity.",
    requirements: ["Biology degree", "Field research experience", "Species identification skills"],
    posted: "1 week ago",
    applicants: 44,
    logo: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=100",
    featured: false,
  },
  {
    id: "15",
    title: "Clean Energy Finance Analyst",
    company: "GreenInvest Capital",
    location: "San Francisco, CA",
    remote: true,
    salary: "$85k - $125k",
    type: "full-time",
    experience: "mid",
    category: "energy",
    description: "Analyze investment opportunities in renewable energy projects. Build financial models and conduct due diligence.",
    requirements: ["Finance or economics degree", "Financial modeling skills", "Interest in clean energy"],
    posted: "3 days ago",
    applicants: 35,
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100",
    featured: true,
  },
];

interface JobsPageProps {
  onNavigate?: (page: string) => void;
  user?: any;
}

export function JobsPage({ onNavigate, user }: JobsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [jobType, setJobType] = useState("all");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"all" | "saved">("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter jobs based on all criteria
  const filteredJobs = DUMMY_JOBS.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(job.category);

    const matchesType = jobType === "all" || job.type === jobType;

    const matchesExperience = experienceLevel === "all" || job.experience === experienceLevel;

    const matchesLocation =
      locationFilter === "" ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesRemote = !showRemoteOnly || job.remote;

    const matchesView = viewMode === "all" || savedJobs.includes(job.id);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesType &&
      matchesExperience &&
      matchesLocation &&
      matchesRemote &&
      matchesView
    );
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => {
      if (prev.includes(jobId)) {
        toast.success("Job removed from saved");
        return prev.filter((id) => id !== jobId);
      } else {
        toast.success("Job saved successfully");
        return [...prev, jobId];
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setJobType("all");
    setExperienceLevel("all");
    setLocationFilter("");
    setShowRemoteOnly(false);
    setSearchQuery("");
  };

  const activeFilterCount =
    selectedCategories.length +
    (jobType !== "all" ? 1 : 0) +
    (experienceLevel !== "all" ? 1 : 0) +
    (locationFilter !== "" ? 1 : 0) +
    (showRemoteOnly ? 1 : 0);

  const jobStats = [
    {
      title: "Total Openings",
      value: DUMMY_JOBS.length.toString(),
      icon: Briefcase,
      change: "+12 this week",
    },
    {
      title: "Companies Hiring",
      value: new Set(DUMMY_JOBS.map((j) => j.company)).size.toString(),
      icon: Building2,
      change: "+3 new companies",
    },
    {
      title: "Avg. Salary",
      value: "$85k",
      icon: DollarSign,
      change: "+5% from last year",
    },
    {
      title: "Remote Jobs",
      value: DUMMY_JOBS.filter((j) => j.remote).length.toString(),
      icon: MapPin,
      change: "60% of positions",
    },
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-3xl p-12 shadow-2xl">
              <div className="text-center">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-2 mb-6">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Clean Industry Careers
                </Badge>

                <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
                  Find Your{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Climate Career
                  </span>
                </h1>

                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                  Connect with employers leading the transition to a sustainable future. Browse opportunities
                  across renewable energy, sustainable agriculture, green tech, and more.
                </p>

                {/* Floating Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {jobStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                          <IconComponent className="h-6 w-6 text-purple-400" />
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
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg"
                    onClick={() => {
                      if (user) {
                        window.scrollTo({ top: 600, behavior: "smooth" });
                      } else {
                        onNavigate && onNavigate("signup");
                      }
                    }}
                  >
                    {user ? "Browse Jobs" : "Sign Up to Apply"}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="backdrop-blur-lg bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                    onClick={() => onNavigate && onNavigate("profile")}
                  >
                    Post a Job
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Jobs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter Pills */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl">Browse by Category</h2>
              {selectedCategories.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategories([])}
                  className="text-muted-foreground"
                >
                  Clear Categories
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {INTEREST_CATEGORIES.map((category) => {
                const IconComponent = category.icon;
                const isSelected = selectedCategories.includes(category.value);
                const jobCount = DUMMY_JOBS.filter((j) => j.category === category.value).length;
                return (
                  <Button
                    key={category.value}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => toggleCategory(category.value)}
                    className="gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    {category.label}
                    <Badge variant={isSelected ? "secondary" : "outline"} className="ml-1">
                      {jobCount}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs, companies, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge variant="secondary">{activeFilterCount}</Badge>
                    )}
                  </Button>
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <Separator className="my-4" />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Job Type</Label>
                          <Select value={jobType} onValueChange={setJobType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {JOB_TYPES.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Experience Level</Label>
                          <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {EXPERIENCE_LEVELS.map((level) => (
                                <SelectItem key={level.value} value={level.value}>
                                  {level.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Location</Label>
                          <Input
                            placeholder="City, state, or country..."
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="remote"
                            checked={showRemoteOnly}
                            onChange={(e) => setShowRemoteOnly(e.target.checked)}
                            className="rounded"
                          />
                          <Label htmlFor="remote">Remote only</Label>
                        </div>

                        {activeFilterCount > 0 && (
                          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                            Clear all filters
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          {/* View Mode Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl">
                {viewMode === "all" ? "All Jobs" : "Saved Jobs"} ({filteredJobs.length})
              </h3>
              <p className="text-sm text-muted-foreground">
                Showing {filteredJobs.length} of {DUMMY_JOBS.length} opportunities
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("all")}
              >
                All Jobs
              </Button>
              <Button
                variant={viewMode === "saved" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("saved")}
                className="gap-2"
              >
                <Bookmark className="h-4 w-4" />
                Saved ({savedJobs.length})
              </Button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="p-12 text-center">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl mb-2">No jobs found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button onClick={clearAllFilters}>Clear all filters</Button>
                  </Card>
                </motion.div>
              ) : (
                filteredJobs.map((job) => {
                  const categoryInfo = INTEREST_CATEGORIES.find((c) => c.value === job.category);
                  const IconComponent = categoryInfo?.icon || Briefcase;
                  const isSaved = savedJobs.includes(job.id);

                  return (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className={job.featured ? "border-primary/50" : ""}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex gap-4 flex-1">
                              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                <Building2 className="h-8 w-8 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <div>
                                    <CardTitle className="text-xl mb-1 flex items-center gap-2">
                                      {job.title}
                                      {job.featured && (
                                        <Badge variant="default" className="gap-1">
                                          <Star className="h-3 w-3" />
                                          Featured
                                        </Badge>
                                      )}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-2">
                                      <Building2 className="h-3 w-3" />
                                      {job.company}
                                    </CardDescription>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {job.location}
                                  </div>
                                  {job.remote && (
                                    <Badge variant="secondary" className="gap-1">
                                      <Laptop className="h-3 w-3" />
                                      Remote
                                    </Badge>
                                  )}
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />
                                    {job.salary}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {job.posted}
                                  </div>
                                </div>

                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                  {job.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="gap-1">
                                    <IconComponent className="h-3 w-3" />
                                    {categoryInfo?.label}
                                  </Badge>
                                  <Badge variant="outline">{job.type}</Badge>
                                  <Badge variant="outline">
                                    {job.experience.charAt(0).toUpperCase() + job.experience.slice(1)} Level
                                  </Badge>
                                  <Badge variant="secondary" className="gap-1">
                                    <Users className="h-3 w-3" />
                                    {job.applicants} applicants
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleSaveJob(job.id)}
                              >
                                {isSaved ? (
                                  <BookmarkCheck className="h-5 w-5 text-primary" />
                                ) : (
                                  <Bookmark className="h-5 w-5" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => toast.success("Application started! (Demo)")}>
                                Apply Now
                              </Button>
                              <Button variant="outline" size="sm" className="gap-2">
                                View Details
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {/* Load More */}
          {filteredJobs.length > 0 && filteredJobs.length >= 10 && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Jobs
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Job Seeker Resources */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Career Resources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tools and guidance to help you land your dream climate career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Resume Review</CardTitle>
                <CardDescription>
                  Get your resume reviewed by climate industry professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Submit Resume
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mentorship Program</CardTitle>
                <CardDescription>
                  Connect with experienced professionals in your field of interest
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Find a Mentor
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Skills Training</CardTitle>
                <CardDescription>
                  Access free courses to build in-demand climate tech skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onNavigate && onNavigate("learn")}
                >
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Employer CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl mb-4">Hiring for Your Climate Company?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Connect with passionate professionals ready to accelerate the clean energy transition.
                Post your job listings and find top talent in the climate sector.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={() => onNavigate && onNavigate("signup")}>
                  Post a Job
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </div>
  );
}