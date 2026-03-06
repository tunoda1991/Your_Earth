import { Badge } from "./badge";
import { LucideIcon } from "lucide-react";

interface BadgeVariantProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

// Status Badges
export function SuccessBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge className={`bg-green-500/10 text-green-400 border-green-500/20 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

export function WarningBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge className={`bg-yellow-500/10 text-yellow-400 border-yellow-500/20 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

export function ErrorBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge className={`bg-red-500/10 text-red-400 border-red-500/20 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

export function InfoBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge className={`bg-blue-500/10 text-blue-400 border-blue-500/20 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

// Category Badges
export function EnergyBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge className={`bg-amber-500/10 text-amber-400 border-amber-500/20 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

export function FoodBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge className={`bg-orange-500/10 text-orange-400 border-orange-500/20 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

export function MobilityBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge className={`bg-blue-500/10 text-blue-400 border-blue-500/20 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

export function IndustryBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge className={`bg-slate-500/10 text-slate-400 border-slate-500/20 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

export function TechnologyBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge className={`bg-purple-500/10 text-purple-400 border-purple-500/20 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

export function PolicyBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge className={`bg-red-500/10 text-red-400 border-red-500/20 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

export function NatureBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge className={`bg-emerald-500/10 text-emerald-400 border-emerald-500/20 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

// Generic Category Badge with dynamic category
export function CategoryBadge({ 
  children, 
  icon: Icon, 
  category,
  className = "" 
}: BadgeVariantProps & { category: "energy" | "food" | "mobility" | "industry" | "technology" | "policy" | "nature" }) {
  const categoryStyles = {
    energy: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    food: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    mobility: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    industry: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    technology: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    policy: "bg-red-500/10 text-red-400 border-red-500/20",
    nature: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <Badge className={`${categoryStyles[category]} ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

// Subtle Badge - Low emphasis
export function SubtleBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge variant="outline" className={`bg-white/5 text-white/70 border-white/10 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

// Prominent Badge - High emphasis
export function ProminentBadge({ children, icon: Icon, className = "" }: BadgeVariantProps) {
  return (
    <Badge className={`bg-white/15 text-white border-white/30 font-semibold ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

// New Badge - Highlight new content
export function NewBadge({ children = "New", icon: Icon, className = "" }: Partial<BadgeVariantProps>) {
  return (
    <Badge className={`bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30 animate-pulse ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

// Count Badge - Numbers (notifications, etc.)
export function CountBadge({ count, className = "" }: { count: number; className?: string }) {
  return (
    <Badge className={`bg-red-500 text-white border-0 font-bold min-w-[20px] h-5 flex items-center justify-center px-1.5 ${className}`}>
      {count > 99 ? "99+" : count}
    </Badge>
  );
}

// Live Badge - Pulsing indicator
export function LiveBadge({ children = "Live", icon: Icon, className = "" }: Partial<BadgeVariantProps>) {
  return (
    <Badge className={`bg-red-500/20 text-red-400 border-red-500/30 ${className}`}>
      <span className="relative flex h-2 w-2 mr-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}

// Verified Badge
export function VerifiedBadge({ children = "Verified", icon: Icon, className = "" }: Partial<BadgeVariantProps>) {
  return (
    <Badge className={`bg-blue-500/10 text-blue-400 border-blue-500/20 ${className}`}>
      {Icon && <Icon className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}
