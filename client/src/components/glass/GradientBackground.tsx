import { ReactNode } from "react";
import { cn } from "@/components/../lib/utils";
import { AnimatedOrbs } from "./AnimatedOrbs";

type PageType = "landing" | "category" | "topic" | "profile" | "auth" | "marketplace" | "jobs" | "dashboard";
type Category = "default" | "energy" | "food" | "mobility" | "industry" | "technology" | "policy" | "nature";

interface GradientBackgroundProps {
  children: ReactNode;
  pageType?: PageType;
  category?: Category;
  className?: string;
  withOrbs?: boolean;
  orbCount?: 2 | 3 | 4 | 5;
  pattern?: boolean;
}

const pageTypeGradients: Record<PageType, string> = {
  landing: "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950",
  category: "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
  topic: "bg-slate-950",
  profile: "bg-gradient-to-b from-slate-950 to-slate-900",
  auth: "bg-gradient-to-br from-slate-950 via-green-950/30 to-slate-950",
  marketplace: "bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-950",
  jobs: "bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950",
  dashboard: "bg-slate-950"
};

const categoryGradients: Record<Category, string> = {
  default: "from-slate-950 via-blue-950/50 to-slate-950",
  energy: "from-slate-950 via-yellow-950/40 to-slate-950",
  food: "from-slate-950 via-orange-950/40 to-slate-950",
  mobility: "from-slate-950 via-blue-950/40 to-slate-950",
  industry: "from-slate-950 via-slate-900 to-slate-950",
  technology: "from-slate-950 via-purple-950/40 to-slate-950",
  policy: "from-slate-950 via-red-950/40 to-slate-950",
  nature: "from-slate-950 via-green-950/40 to-slate-950"
};

const categoryPatterns: Record<Category, string> = {
  default: "",
  energy: "pattern-energy",
  food: "pattern-food",
  mobility: "pattern-mobility",
  industry: "pattern-industry",
  technology: "pattern-technology",
  policy: "pattern-policy",
  nature: "pattern-nature"
};

export function GradientBackground({
  children,
  pageType = "landing",
  category,
  className,
  withOrbs = true,
  orbCount = 2,
  pattern = false
}: GradientBackgroundProps) {
  // Use category gradient if category is specified, otherwise use pageType gradient
  const gradientClass = category 
    ? `bg-gradient-to-br ${categoryGradients[category]}`
    : pageTypeGradients[pageType];

  const patternClass = category && pattern ? categoryPatterns[category] : "";

  return (
    <div 
      className={cn(
        "min-h-screen relative",
        gradientClass,
        patternClass,
        className
      )}
    >
      {/* Animated Orbs */}
      {withOrbs && (
        <AnimatedOrbs 
          category={category || "default"} 
          count={orbCount}
          size="lg"
          blur="xl"
        />
      )}

      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px"
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
