import { cn } from "@/components/../lib/utils";

type Category = "default" | "energy" | "food" | "mobility" | "industry" | "technology" | "policy" | "nature";
type OrbSize = "sm" | "md" | "lg" | "xl";
type OrbCount = 2 | 3 | 4 | 5;

interface AnimatedOrbsProps {
  category?: Category;
  count?: OrbCount;
  size?: OrbSize;
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
}

const categoryOrbSets: Record<Category, string[]> = {
  default: [
    "bg-green-500/20",
    "bg-blue-500/20",
    "bg-teal-500/20"
  ],
  energy: [
    "bg-yellow-500/20",
    "bg-orange-500/20",
    "bg-amber-500/20"
  ],
  food: [
    "bg-orange-500/20",
    "bg-red-500/20",
    "bg-yellow-500/20"
  ],
  mobility: [
    "bg-blue-500/20",
    "bg-cyan-500/20",
    "bg-sky-500/20"
  ],
  industry: [
    "bg-slate-500/20",
    "bg-gray-500/20",
    "bg-zinc-500/20"
  ],
  technology: [
    "bg-purple-500/20",
    "bg-pink-500/20",
    "bg-violet-500/20"
  ],
  policy: [
    "bg-red-500/20",
    "bg-pink-500/20",
    "bg-rose-500/20"
  ],
  nature: [
    "bg-green-500/20",
    "bg-emerald-500/20",
    "bg-lime-500/20"
  ]
};

const orbSizeClasses: Record<OrbSize, string> = {
  sm: "w-64 h-64",
  md: "w-80 h-80",
  lg: "w-96 h-96",
  xl: "w-[32rem] h-[32rem]"
};

const blurClasses: Record<string, string> = {
  sm: "blur-2xl",
  md: "blur-3xl",
  lg: "blur-[64px]",
  xl: "blur-[96px]"
};

const orbPositions = [
  { top: "top-1/4", left: "left-1/4", delay: "" },
  { top: "bottom-1/4", left: "right-1/4", delay: "animate-delay-500" },
  { top: "top-1/2", left: "right-1/3", delay: "animate-delay-300" },
  { top: "bottom-1/3", left: "left-1/3", delay: "animate-delay-700" },
  { top: "top-1/3", left: "left-1/2", delay: "animate-delay-400" }
];

export function AnimatedOrbs({
  category = "default",
  count = 2,
  size = "lg",
  className,
  blur = "xl",
  animate = true
}: AnimatedOrbsProps) {
  const orbColors = categoryOrbSets[category];
  const visibleOrbs = orbPositions.slice(0, count);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {visibleOrbs.map((position, index) => (
        <div
          key={index}
          className={cn(
            "absolute rounded-full",
            orbSizeClasses[size],
            blurClasses[blur],
            position.top,
            position.left,
            animate && "animate-pulse-slow",
            animate && position.delay,
            orbColors[index % orbColors.length]
          )}
          style={{
            transform: "translate(-50%, -50%)"
          }}
        />
      ))}
    </div>
  );
}
