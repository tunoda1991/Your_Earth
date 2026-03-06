import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  Flag, 
  TrendingUp, 
  AlertTriangle, 
  Globe, 
  Home,
  ChevronRight,
  Sparkles,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { GlassHero } from "@/components/glass/GlassHero";
import { CorporateMonitorTab } from "@/components/climate-data/CorporateMonitorTab";
import { CountryPledgesTab } from "@/components/climate-data/CountryPledgesTab";
import { CO2TrajectoryTab } from "@/components/climate-data/CO2TrajectoryTab";
import { ClimateDisastersTab } from "@/components/climate-data/ClimateDisastersTab";
import { MapVisualizationsTab } from "@/components/climate-data/MapVisualizationsTab";
import { DataSourcesFooter } from "@/components/climate-data/DataSourcesFooter";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";

interface ClimateDataDashboardPageProps {
  onNavigate: (page: string) => void;
  user?: any;
}

export function ClimateDataDashboardPage({ onNavigate, user }: ClimateDataDashboardPageProps) {
  const [activeTab, setActiveTab] = useState('corporate');

  const stats = [
    { label: 'CO2', value: '420ppm', trend: '+2.4ppm/yr', icon: BarChart3 },
    { label: 'Warming', value: '+1.2°C', trend: '+0.06°C/decade', icon: TrendingUp },
    { label: 'Companies Tracked', value: '2,847', trend: '+142 this year', icon: Factory },
    { label: 'Countries Monitoring', value: '89', trend: 'Global coverage', icon: Globe },
  ];

  return (
    <GradientBackground category="default" orbCount={3}>
      <div className="pt-8">
        {/* Hero Section */}
        <GlassHero category="default" size="lg">
          <div className="text-center">
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-2 mb-6">
              <BarChart3 className="h-4 w-4 mr-2" />
              Climate Data & Analytics
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
              Climate{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Data Dashboard
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Real-time tracking of global climate progress and corporate accountability. 
              Comprehensive data across emissions, pledges, and climate impacts.
            </p>

            {/* Floating Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => {
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
                    <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                    <div className="text-xs text-emerald-400">{stat.trend}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-8 py-6 text-lg"
                onClick={() => setActiveTab('corporate')}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Explore Data
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-lg bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                View Sources
              </Button>
            </div>
          </div>
        </GlassHero>

        {/* Tab Navigation & Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* Horizontal Tab List */}
            <TabsList className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-xl grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger 
                value="corporate"
                className="data-[state=active]:bg-red-500/20 data-[state=active]:text-white data-[state=active]:border-red-500/50 border border-transparent rounded-lg transition-all duration-300 py-4"
              >
                <Factory className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Corporate Monitor</span>
                <span className="sm:hidden">Corporate</span>
              </TabsTrigger>
              <TabsTrigger 
                value="pledges"
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-white data-[state=active]:border-blue-500/50 border border-transparent rounded-lg transition-all duration-300 py-4"
              >
                <Flag className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Country Pledges</span>
                <span className="sm:hidden">Pledges</span>
              </TabsTrigger>
              <TabsTrigger 
                value="trajectory"
                className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-white data-[state=active]:border-yellow-500/50 border border-transparent rounded-lg transition-all duration-300 py-4"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">CO2 Trajectory</span>
                <span className="sm:hidden">CO2</span>
              </TabsTrigger>
              <TabsTrigger 
                value="disasters"
                className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-white data-[state=active]:border-orange-500/50 border border-transparent rounded-lg transition-all duration-300 py-4"
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Climate Disasters</span>
                <span className="sm:hidden">Disasters</span>
              </TabsTrigger>
              <TabsTrigger 
                value="map"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white data-[state=active]:border-purple-500/50 border border-transparent rounded-lg transition-all duration-300 py-4"
              >
                <Globe className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Map Visualizations</span>
                <span className="sm:hidden">Map</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Content with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <TabsContent value="corporate" className="mt-0">
                  <CorporateMonitorTab />
                </TabsContent>

                <TabsContent value="pledges" className="mt-0">
                  <CountryPledgesTab />
                </TabsContent>

                <TabsContent value="trajectory" className="mt-0">
                  <CO2TrajectoryTab />
                </TabsContent>

                <TabsContent value="disasters" className="mt-0">
                  <ClimateDisastersTab />
                </TabsContent>

                <TabsContent value="map" className="mt-0">
                  <MapVisualizationsTab />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          {/* Data Sources Footer */}
          <DataSourcesFooter />
        </div>
      </div>
      
      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </GradientBackground>
  );
}