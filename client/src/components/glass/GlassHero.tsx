import { ReactNode } from "react";
import { cn } from "@/components/../lib/utils";

type Category = "default" | "energy" | "food" | "mobility" | "industry" | "technology" | "policy" | "nature";

interface GlassHeroProps {
  children: ReactNode;
  category?: Category;
  className?: string;
  centered?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses: Record<string, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-20",
  lg: "py-20 md:py-24",
  xl: "py-24 md:py-32"
};

const categoryGradients: Record<Category, string> = {
  default: "from-slate-950 via-blue-950 to-slate-950",
  energy: "from-slate-950 via-yellow-950 to-slate-950",
  food: "from-slate-950 via-orange-950 to-slate-950",
  mobility: "from-slate-950 via-blue-950 to-slate-950",
  industry: "from-slate-950 via-slate-900 to-slate-950",
  technology: "from-slate-950 via-purple-950 to-slate-950",
  policy: "from-slate-950 via-red-950 to-slate-950",
  nature: "from-slate-950 via-green-950 to-slate-950"
};

const categoryOrbColors: Record<Category, { primary: string; secondary: string }> = {
  default: {
    primary: "bg-green-500/20",
    secondary: "bg-blue-500/20"
  },
  energy: {
    primary: "bg-yellow-500/20",
    secondary: "bg-orange-500/20"
  },
  food: {
    primary: "bg-orange-500/20",
    secondary: "bg-red-500/20"
  },
  mobility: {
    primary: "bg-blue-500/20",
    secondary: "bg-cyan-500/20"
  },
  industry: {
    primary: "bg-slate-500/20",
    secondary: "bg-gray-500/20"
  },
  technology: {
    primary: "bg-purple-500/20",
    secondary: "bg-pink-500/20"
  },
  policy: {
    primary: "bg-red-500/20",
    secondary: "bg-pink-500/20"
  },
  nature: {
    primary: "bg-green-500/20",
    secondary: "bg-emerald-500/20"
  }
};

export function GlassHero({
  children,
  category = "default",
  className,
  centered = true,
  size = "lg"
}: GlassHeroProps) {
  const orbColors = categoryOrbColors[category];

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-br",
        categoryGradients[category],
        sizeClasses[size],
        className
      )}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={cn(
            "absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow",
            orbColors.primary
          )} 
        />
        <div 
          className={cn(
            "absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow animate-delay-500",
            orbColors.secondary
          )} 
        />
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div
          className={cn(
            centered && "max-w-5xl mx-auto"
          )}
        >
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Glass effect shimmer */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            {/* Content */}
            <div className="relative">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
