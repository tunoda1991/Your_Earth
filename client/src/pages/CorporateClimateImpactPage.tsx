import { CorporateMonitor } from "@/components/CorporateMonitor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/glass/GlassCard";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { Building2, TrendingUp, AlertTriangle, Award, BarChart3, Globe, Factory, Leaf } from "lucide-react";

const impactStats = [
  {
    title: "Companies Tracked",
    value: "2,847",
    change: "+156 this month",
    icon: Building2
  },
  {
    title: "CO₂ Emissions Monitored",
    value: "15.2B tons",
    change: "+2.3% from last year",
    icon: Factory
  },
  {
    title: "Clean Energy Leaders",
    value: "428",
    change: "+67 new companies",
    icon: Leaf
  },
  {
    title: "ESG Score Average",
    value: "64/100",
    change: "+4 points improvement",
    icon: Award
  }
];

const keyInsights = [
  {
    title: "Top Polluting Industries",
    items: ["Oil & Gas (34%)", "Coal Mining (28%)", "Steel Production (18%)", "Chemicals (12%)", "Cement (8%)"],
    trend: "up",
    color: "red"
  },
  {
    title: "Leading Clean Sectors",  
    items: ["Solar Energy (42%)", "Wind Power (31%)", "Electric Vehicles (15%)", "Hydroelectric (8%)", "Bioenergy (4%)"],
    trend: "up",
    color: "green"
  },
  {
    title: "ESG Improvements",
    items: ["Tesla (+12 points)", "Vestas (+9 points)", "Ørsted (+8 points)", "NextEra (+7 points)", "Iberdrola (+6 points)"],
    trend: "up", 
    color: "blue"
  },
  {
    title: "Emission Reductions",
    items: ["Unilever (-15%)", "Microsoft (-12%)", "IKEA (-10%)", "Google (-8%)", "Apple (-7%)"],
    trend: "down",
    color: "green"
  }
];

interface CorporateClimateImpactPageProps {
  onNavigate?: (page: string) => void;
}

export function CorporateClimateImpactPage({ onNavigate }: CorporateClimateImpactPageProps) {
  return (
    <div>
      {/* Main Corporate Monitor */}
      <CorporateMonitor />

      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </div>
  );
}