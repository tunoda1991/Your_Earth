import { HeroSection } from "@/components/HeroSection";
import { GlobalMap } from "@/components/GlobalMap";
import { CategoryCards } from "@/components/CategoryCards";
import { LiveImpactTicker } from "@/components/LiveImpactTicker";
import { HighConvertingCTA } from "@/components/HighConvertingCTA";
import { FeatureGrid } from "@/components/FeatureGrid";
import { FeatureCarousel } from "@/components/FeatureCarousel";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/glass/GlassCard";
import { GlassStrong, GlassMedium, SolidCard } from "@/components/glass/GlassVariants";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button-variants";
import { NewBadge, SuccessBadge } from "@/components/ui/badge-variants";
import { PageTitle, LeadText, SectionTitle, GradientText } from "@/components/ui/typography";
import { FadeInUp, StaggerContainer, StaggerItem, ScrollReveal, FloatAnimation } from "@/components/ui/animations";
import { motion } from "framer-motion";
import { HeroEarth3D } from "@/components/HeroEarth3D";
import { 
  BookOpen, 
  Users, 
  Target, 
  Database, 
  Calculator,
  BarChart3,
  ArrowRight,
  Zap,
  UtensilsCrossed,
  Car,
  Factory,
  Laptop,
  Scale,
  TreePine,
  Sparkles,
  Globe2,
  CheckCircle2
} from "lucide-react";

interface HomePageProps {
  onNavigate?: (page: string) => void;
  user?: any;
}

export function HomePage({ onNavigate, user }: HomePageProps) {
  const communityCategories = [
    { icon: Zap, name: "Energy", slug: "energy" },
    { icon: UtensilsCrossed, name: "Food", slug: "food" },
    { icon: Car, name: "Mobility", slug: "mobility" },
    { icon: Factory, name: "Industry", slug: "industry" },
    { icon: Laptop, name: "Technology", slug: "technology" },
    { icon: Scale, name: "Policy", slug: "policy" },
    { icon: TreePine, name: "Nature", slug: "nature" }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Hero Section with 3D Earth Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
        
        {/* Interactive 3D Earth Component */}
        <HeroEarth3D />

        {/* Dark Glassmorphism Container */}
        <div className="relative z-10 container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Glassmorphism Card with Dark Theme */}
            <div className="relative backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-3xl p-12 md:p-16 shadow-2xl">
              {/* Glass effect shimmer */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent" />
              
              {/* Content */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Badge 
                    variant="outline" 
                    className="mb-6 border-green-500/50 bg-green-500/10 text-green-400 text-sm px-4 py-1.5"
                  >
                    <Sparkles className="h-3 w-3 mr-2" />
                    Platform for Climate Action
                  </Badge>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  <span className="text-white">Your </span>
                  <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Earth
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-xl md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
                >
                  Empowering global climate action through community, knowledge, and real-time data. 
                  Join millions fighting for a sustainable future.
                </motion.p>

                {/* Floating Glassmorphism Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  className="flex flex-wrap justify-center gap-4 mb-8"
                >
                  {/* Members Stat */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl px-6 py-4 shadow-lg hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30">
                        <Users className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">50K+</div>
                        <div className="text-xs text-slate-300">Members</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Campaigns Stat */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="relative backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl px-6 py-4 shadow-lg hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30">
                        <Target className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">247</div>
                        <div className="text-xs text-slate-300">Campaigns</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* CO2 Saved Stat */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="relative backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl px-6 py-4 shadow-lg hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-400/30">
                        <Sparkles className="h-6 w-6 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">2.3M kg</div>
                        <div className="text-xs text-slate-300">CO₂ Saved</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Two Prominent CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  {/* Vibrant Green CTA Button */}
                  <Button 
                    size="lg"
                    onClick={() => onNavigate?.(user ? 'dashboard' : 'signup')}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 px-8 py-6 text-lg font-bold rounded-xl shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500/70 transition-all duration-300 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {user ? 'Go to Dashboard' : 'Start Your Journey'}
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>

                  {/* White/Glass CTA Button */}
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => onNavigate?.('learn')}
                    className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-6 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <span className="flex items-center gap-2">
                      Explore Features
                      <Globe2 className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    </span>
                  </Button>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="mt-12 flex flex-wrap justify-center gap-8 text-slate-300"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span className="text-sm">Free to Join</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span className="text-sm">Global Community</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span className="text-sm">Real Impact</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Live Impact Ticker - Real-time Activity Feed */}
      <LiveImpactTicker />
      
      {/* Interactive Climate Data Globe Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Interactive Climate Data Globe
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-2">
              Explore real-time climate data from around the world
            </p>
            <p className="text-white/60 text-base max-w-3xl mx-auto">
              Click on data points to see detailed information about temperature changes, CO₂ emissions, and power generation facilities
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <iframe
              src="/energy-map.html"
              width="100%"
              height="600"
              style={{ border: 'none', borderRadius: '12px', overflow: 'hidden' }}
              title="Global Energy & Transport Infrastructure Map"
              data-testid="energy-map-iframe"
            />
          </motion.div>
        </div>
      </section>
      
      {/* Platform Capabilities Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <FeatureGrid onNavigate={onNavigate} />
      </motion.div>
      
      {/* Find Your Community Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        <CategoryCards onJoin={(categoryId) => onNavigate?.(`community-${categoryId}`)} />
      </motion.div>
      
      {/* Join 50,000+ Climate Champions Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <HighConvertingCTA 
          onStartFree={() => onNavigate?.(user ? 'dashboard' : 'signup')}
          onSeeHowItWorks={() => onNavigate?.('learn')}
        />
      </motion.div>
      
      {/* Take Climate Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        <FeatureCarousel />
      </motion.div>      
      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </div>
  );
}