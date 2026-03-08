import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NotificationsPanel } from "./NotificationsPanel";
import {
  Globe2,
  Search,
  Bell,
  User,
  Menu,
  X,
  BookOpen,
  Users,
  Target,
  Database,
  Calculator,
  BarChart3,
  Building2,
  ChevronDown,
  ArrowRight,
  Settings,
  LogOut,
  Home,
  Zap,
  UtensilsCrossed,
  Car,
  Factory,
  Laptop,
  Scale,
  TreePine,
  Calendar,
  Briefcase,
  ShoppingBag,
  LineChart,
  Plane,
  Globe,
    MessageCircle,
    Newspaper
  } from "lucide-react";

interface NavigationProps {
  onNavigate?: (page: string) => void;
  user?: any;
  currentPage?: string;
  onLogout?: () => void;
}

export function Navigation({ onNavigate, user, currentPage, onLogout }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLearnMenuOpen, setIsLearnMenuOpen] = useState(false);
  const [isCommunityMenuOpen, setIsCommunityMenuOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [isDataMenuOpen, setIsDataMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest(".mobile-menu") && !target.closest(".mobile-menu-button")) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const mainNavItems = [
    { label: "Learn", page: "learn", hasDropdown: true },
    { label: "Community", page: "community", hasDropdown: true },
    { label: "Take Action", page: "action", hasDropdown: true },
  ];

  const learnCategories = [
    {
      icon: BookOpen,
      title: "Climate Education",
      description: "Master climate science through expert-designed courses",
      page: "learn-education",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: Calculator,
      title: "Carbon Calculator",
      description: "Calculate and track your carbon footprint",
      page: "learn-calculator",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      icon: BarChart3,
      title: "Climate Data Dashboard",
      description: "Real-time climate data and interactive visualizations",
      page: "climate-data-dashboard",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20"
    },
    {
      icon: BarChart3,
      title: "Corporate Monitor",
      description: "Track company emissions and climate commitments",
      page: "learn-corporate",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      icon: Building2,
      title: "Organization Bank",
      description: "Explore climate organizations and their impact",
      page: "learn-databank",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      icon: Globe,
      title: "Your Globe",
      description: "Interactive maps: infrastructure, disasters, electricity, emissions & network",
      page: "your-globe",
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/20"
    }
  ];

  const communityCategories = [
    {
      icon: Newspaper,
      title: "Connect",
      description: "AI-curated climate news and insights",
      page: "connect",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20"
    },
    {
      icon: MessageCircle,
      title: "Feed",
      description: "Live climate community activity & discussions",
      page: "community-feed",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      icon: Zap,
      title: "Energy",
      description: "Renewable energy & sustainability",
      page: "community-energy",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20"
    },
    {
      icon: UtensilsCrossed,
      title: "Food",
      description: "Sustainable agriculture & nutrition",
      page: "community-food",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      icon: Car,
      title: "Mobility",
      description: "Clean transportation solutions",
      page: "community-mobility",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: Factory,
      title: "Industry",
      description: "Green manufacturing & business",
      page: "community-industry",
      color: "text-gray-500",
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/20"
    },
    {
      icon: Laptop,
      title: "Technology",
      description: "Climate tech & innovation",
      page: "community-technology",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      icon: Scale,
      title: "Policy",
      description: "Climate policy & governance",
      page: "community-policy",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    },
    {
      icon: TreePine,
      title: "Nature",
      description: "Conservation & biodiversity",
      page: "community-nature",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    }
  ];

  const actionCategories = [
    {
      icon: Target,
      title: "Campaigns & Actions",
      description: "Join campaigns and complete quick actions",
      page: "campaigns-actions",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      icon: Calendar,
      title: "Events & Gatherings",
      description: "Connect through local and virtual events",
      page: "events",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: Briefcase,
      title: "Climate Jobs",
      description: "Find careers in the clean industry",
      page: "jobs",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      icon: ShoppingBag,
      title: "Green Marketplace",
      description: "Shop sustainable products",
      page: "marketplace",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20"
    }
  ];

  const dataCategories = [
    {
      icon: LineChart,
      title: "Climate Dashboard",
      description: "Interactive climate data visualizations",
      page: "climate-data-dashboard",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20"
    },
    {
      icon: BarChart3,
      title: "Climate TRACE",
      description: "Global emissions tracking & analysis",
      page: "climate-trace",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      icon: Plane,
      title: "Flight Tracker",
      description: "Real-time aviation emissions data",
      page: "flights",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: Building2,
      title: "Corporate Accountability",
      description: "Track corporate climate impact",
      page: "accountability",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Implement search functionality
    }
  };

  return (
    <>
      {/* Sticky Navigation Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? "backdrop-blur-xl bg-slate-900/80 border-b border-white/10 shadow-lg" 
            : "backdrop-blur-md bg-slate-900/60"
          }
        `}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Left */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => onNavigate?.("home")}
            >
              <div className="relative">
                <Globe2 className="h-8 w-8 text-green-400 group-hover:text-green-300 transition-colors group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md group-hover:bg-green-400/30 transition-all" />
              </div>
              <span className="text-xl md:text-2xl font-black text-white hidden sm:block">
                Your <span className="text-green-400">Earth</span>
              </span>
            </div>

            {/* Main Navigation - Center (Desktop) */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.hasDropdown ? (
                    <button
                      className={`
                        relative px-4 py-2 text-sm font-semibold text-slate-200 
                        hover:text-white transition-colors flex items-center gap-1 group
                        ${currentPage === item.page ? "text-white" : ""}
                      `}
                      onMouseEnter={() => {
                        if (item.label === "Learn") setIsLearnMenuOpen(true);
                        if (item.label === "Community") setIsCommunityMenuOpen(true);
                        if (item.label === "Take Action") setIsActionMenuOpen(true);
                      }}
                      onMouseLeave={() => {
                        if (item.label === "Learn") setIsLearnMenuOpen(false);
                        if (item.label === "Community") setIsCommunityMenuOpen(false);
                        if (item.label === "Take Action") setIsActionMenuOpen(false);
                      }}
                      onClick={() => {
                        // Navigate to the page
                        onNavigate?.(item.page);
                        // Close all dropdowns
                        setIsLearnMenuOpen(false);
                        setIsCommunityMenuOpen(false);
                        setIsActionMenuOpen(false);
                      }}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        item.label === "Learn" ? (isLearnMenuOpen ? "rotate-180" : "") :
                        item.label === "Community" ? (isCommunityMenuOpen ? "rotate-180" : "") :
                        item.label === "Take Action" ? (isActionMenuOpen ? "rotate-180" : "") :
                        ""
                      }`} />
                      
                      {/* Underline Animation */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: currentPage === item.page ? 1 : 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </button>
                  ) : (
                    <button
                      className={`
                        relative px-4 py-2 text-sm font-semibold text-slate-200 
                        hover:text-white transition-colors group
                        ${currentPage === item.page ? "text-white" : ""}
                      `}
                      onClick={() => onNavigate?.(item.page)}
                    >
                      {item.label}
                      
                      {/* Underline Animation */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: currentPage === item.page ? 1 : 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Search Bar - Center (Desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search climate topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:bg-white/10 focus:border-green-400/50 transition-all rounded-full"
                />
              </div>
            </form>

            {/* Right Side - User Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Notifications */}
              {user && (
                <button 
                  onClick={() => setIsNotificationsPanelOpen(true)}
                  className="relative p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                </button>
              )}

              {/* User Profile / Login */}
              {user ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-full transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 backdrop-blur-xl bg-slate-900/95 border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-white/10">
                          <div className="font-semibold text-white">{user.name || "User"}</div>
                          <div className="text-xs text-slate-400">{user.email}</div>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => {
                              onNavigate?.("dashboard");
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/10 rounded-lg transition-all"
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </button>
                          <button
                            onClick={() => {
                              onNavigate?.("settings");
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/10 rounded-lg transition-all"
                          >
                            <Settings className="h-4 w-4" />
                            Settings
                          </button>
                          <button
                            onClick={() => {
                              // Handle logout
                              onLogout?.();
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate?.("login")}
                    className="text-slate-200 hover:text-white hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onNavigate?.("signup")}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0"
                  >
                    Get Started
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mobile-menu-button lg:hidden p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mega Menu Dropdown - Learn Section (Desktop) */}
        <AnimatePresence>
          {isLearnMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block absolute left-0 right-0 top-full border-t border-white/10"
              onMouseEnter={() => setIsLearnMenuOpen(true)}
              onMouseLeave={() => setIsLearnMenuOpen(false)}
            >
              <div className="backdrop-blur-xl bg-slate-900/95 py-8">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {learnCategories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            onNavigate?.(category.page);
                            setIsLearnMenuOpen(false);
                          }}
                          className={`
                            group relative p-6 rounded-xl cursor-pointer
                            backdrop-blur-sm ${category.bgColor} 
                            border ${category.borderColor}
                            hover:scale-105 transition-all duration-300
                          `}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          <div className="relative">
                            <div className={`inline-flex p-3 rounded-lg ${category.bgColor} border ${category.borderColor} mb-4`}>
                              <Icon className={`h-6 w-6 ${category.color}`} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{category.title}</h3>
                            <p className="text-sm text-slate-400 mb-4">{category.description}</p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-green-400 group-hover:text-green-300 transition-colors">
                              Explore
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mega Menu Dropdown - Community Section (Desktop) */}
        <AnimatePresence>
          {isCommunityMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block absolute left-0 right-0 top-full border-t border-white/10"
              onMouseEnter={() => setIsCommunityMenuOpen(true)}
              onMouseLeave={() => setIsCommunityMenuOpen(false)}
            >
              <div className="backdrop-blur-xl bg-slate-900/95 py-8">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {communityCategories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            onNavigate?.(category.page);
                            setIsCommunityMenuOpen(false);
                          }}
                          className={`
                            group relative p-6 rounded-xl cursor-pointer
                            backdrop-blur-sm ${category.bgColor} 
                            border ${category.borderColor}
                            hover:scale-105 transition-all duration-300
                          `}
                        >
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          <div className="relative">
                            <div className={`inline-flex p-3 rounded-lg ${category.bgColor} border ${category.borderColor} mb-4`}>
                              <Icon className={`h-6 w-6 ${category.color}`} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{category.title}</h3>
                            <p className="text-sm text-slate-400 mb-4">{category.description}</p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-green-400 group-hover:text-green-300 transition-colors">
                              Explore
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mega Menu Dropdown - Take Action Section (Desktop) */}
        <AnimatePresence>
          {isActionMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block absolute left-0 right-0 top-full border-t border-white/10"
              onMouseEnter={() => setIsActionMenuOpen(true)}
              onMouseLeave={() => setIsActionMenuOpen(false)}
            >
              <div className="backdrop-blur-xl bg-slate-900/95 py-8">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {actionCategories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            onNavigate?.(category.page);
                            setIsActionMenuOpen(false);
                          }}
                          className={`
                            group relative p-6 rounded-xl cursor-pointer
                            backdrop-blur-sm ${category.bgColor} 
                            border ${category.borderColor}
                            hover:scale-105 transition-all duration-300
                          `}
                        >
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          <div className="relative">
                            <div className={`inline-flex p-3 rounded-lg ${category.bgColor} border ${category.borderColor} mb-4`}>
                              <Icon className={`h-6 w-6 ${category.color}`} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{category.title}</h3>
                            <p className="text-sm text-slate-400 mb-4">{category.description}</p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-green-400 group-hover:text-green-300 transition-colors">
                              Explore
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mega Menu Dropdown - Data Section (Desktop) */}
        <AnimatePresence>
          {isDataMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block absolute left-0 right-0 top-full border-t border-white/10"
              onMouseEnter={() => setIsDataMenuOpen(true)}
              onMouseLeave={() => setIsDataMenuOpen(false)}
            >
              <div className="backdrop-blur-xl bg-slate-900/95 py-8">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {dataCategories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            onNavigate?.(category.page);
                            setIsDataMenuOpen(false);
                          }}
                          className={`
                            group relative p-6 rounded-xl cursor-pointer
                            backdrop-blur-sm ${category.bgColor} 
                            border ${category.borderColor}
                            hover:scale-105 transition-all duration-300
                          `}
                        >
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          <div className="relative">
                            <div className={`inline-flex p-3 rounded-lg ${category.bgColor} border ${category.borderColor} mb-4`}>
                              <Icon className={`h-6 w-6 ${category.color}`} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{category.title}</h3>
                            <p className="text-sm text-slate-400 mb-4">{category.description}</p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-green-400 group-hover:text-green-300 transition-colors">
                              Explore
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Full-Screen Overlay Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-menu fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" />

            {/* Content */}
            <div className="relative h-full overflow-y-auto">
              <div className="container mx-auto px-4 py-24">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-8">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Search climate topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border-white/10 text-white text-lg placeholder:text-slate-400 focus:bg-white/10 focus:border-green-400/50 transition-all rounded-2xl"
                    />
                  </div>
                </form>

                {/* Navigation Items */}
                <nav className="space-y-2 mb-8">
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => {
                      onNavigate?.("home");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-4 px-6 py-4 text-lg font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
                  >
                    <Home className="h-6 w-6" />
                    Home
                  </motion.button>

                  {mainNavItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (index + 1) * 0.05 }}
                    >
                      <button
                        onClick={() => {
                          onNavigate?.(item.page);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-lg font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
                      >
                        <span className="flex items-center gap-4">
                          {item.label === "Learn" && <BookOpen className="h-6 w-6" />}
                          {item.label === "Community" && <Users className="h-6 w-6" />}
                          {item.label === "Take Action" && <Target className="h-6 w-6" />}
                          {item.label === "Data" && <Database className="h-6 w-6" />}
                          {item.label === "Feed" && <Rss className="h-6 w-6" />}
                          {item.label}
                        </span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </motion.div>
                  ))}
                </nav>

                {/* Learn Categories */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 px-6">
                    Learning Resources
                  </h3>
                  <div className="space-y-3">
                    {learnCategories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          onClick={() => {
                            onNavigate?.(category.page);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`
                            p-4 rounded-2xl cursor-pointer
                            ${category.bgColor} border ${category.borderColor}
                            active:scale-95 transition-all
                          `}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${category.bgColor} border ${category.borderColor}`}>
                              <Icon className={`h-6 w-6 ${category.color}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-white mb-1">{category.title}</h4>
                              <p className="text-sm text-slate-400">{category.description}</p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-400" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* User Actions */}
                {user ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <button
                      onClick={() => {
                        onNavigate?.("dashboard");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold"
                    >
                      <User className="h-6 w-6" />
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        // Handle logout
                        onLogout?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-4 px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-semibold"
                    >
                      <LogOut className="h-6 w-6" />
                      Sign Out
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <Button
                      size="lg"
                      onClick={() => {
                        onNavigate?.("signup");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-6 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 rounded-2xl"
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        onNavigate?.("login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-6 text-lg bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-2xl"
                    >
                      Sign In
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Panel */}
      <NotificationsPanel 
        isOpen={isNotificationsPanelOpen}
        onClose={() => setIsNotificationsPanelOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}