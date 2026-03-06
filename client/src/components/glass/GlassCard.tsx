import { ReactNode } from "react";
import { cn } from "@/components/../lib/utils";

type GlassVariant = "subtle" | "medium" | "prominent";
type Category = "default" | "energy" | "food" | "mobility" | "industry" | "technology" | "policy" | "nature";

interface GlassCardProps {
  children: ReactNode;
  variant?: GlassVariant;
  category?: Category;
  className?: string;
  hover?: boolean;
  shimmer?: boolean;
  floating?: boolean;
  onClick?: () => void;
}

const variantClasses: Record<GlassVariant, string> = {
  subtle: "glass-subtle",
  medium: "glass-medium",
  prominent: "glass-prominent"
};

const categoryBorderColors: Record<Category, string> = {
  default: "border-white/10",
  energy: "border-yellow-500/20",
  food: "border-orange-500/20",
  mobility: "border-blue-500/20",
  industry: "border-slate-500/20",
  technology: "border-purple-500/20",
  policy: "border-red-500/20",
  nature: "border-green-500/20"
};

const categoryGlowColors: Record<Category, string> = {
  default: "hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
  energy: "hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]",
  food: "hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]",
  mobility: "hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
  industry: "hover:shadow-[0_0_20px_rgba(100,116,139,0.3)]",
  technology: "hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
  policy: "hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
  nature: "hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
};

export function GlassCard({
  children,
  variant = "medium",
  category = "default",
  className,
  hover = false,
  shimmer = false,
  floating = false,
  onClick
}: GlassCardProps) {
  return (
    <div
      className={cn(
        // Base glassmorphism styles
        variantClasses[variant],
        "rounded-2xl overflow-hidden transition-all duration-300",
        
        // Category border
        categoryBorderColors[category],
        
        // Hover effects
        hover && "hover-lift cursor-pointer",
        hover && categoryGlowColors[category],
        
        // Floating animation
        floating && "animate-float will-animate-transform",
        
        // Shimmer effect
        shimmer && "relative",
        
        // Custom classes
        className
      )}
      onClick={onClick}
    >
      {/* Shimmer overlay */}
      {shimmer && (
        <div className="absolute inset-0 glass-shimmer pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {/* Glass shimmer gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-2xl" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}