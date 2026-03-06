import { ReactNode } from "react";
import { cn } from "@/components/../lib/utils";

type GlassVariant = "subtle" | "medium" | "prominent";
type Category = "default" | "energy" | "food" | "mobility" | "industry" | "technology" | "policy" | "nature";

interface GlassSectionProps {
  children: ReactNode;
  variant?: GlassVariant;
  category?: Category;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

const variantClasses: Record<GlassVariant, string> = {
  subtle: "glass-subtle",
  medium: "glass-medium",
  prominent: "glass-prominent"
};

const paddingClasses: Record<string, string> = {
  none: "",
  sm: "p-4",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-12",
  xl: "p-12 md:p-16"
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

export function GlassSection({
  children,
  variant = "medium",
  category = "default",
  className,
  padding = "lg",
  fullWidth = false
}: GlassSectionProps) {
  return (
    <section
      className={cn(
        // Base glassmorphism styles
        variantClasses[variant],
        "rounded-3xl overflow-hidden",
        
        // Category border
        categoryBorderColors[category],
        
        // Padding
        paddingClasses[padding],
        
        // Width
        !fullWidth && "container mx-auto max-w-[1140px]",
        
        // Custom classes
        className
      )}
    >
      {/* Glass shimmer gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-3xl" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
