import { motion } from "framer-motion";

interface SkeletonLoaderProps {
  variant?: "card" | "text" | "circle" | "rect" | "stat" | "list";
  count?: number;
  className?: string;
}

export function SkeletonLoader({ variant = "card", count = 1, className = "" }: SkeletonLoaderProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const variants = {
    card: (
      <div className={`rounded-xl border border-white/10 bg-white/5 p-6 space-y-4 ${className}`}>
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-white/10 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-white/10 rounded animate-pulse w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-white/10 rounded animate-pulse w-full" />
          <div className="h-3 bg-white/10 rounded animate-pulse w-5/6" />
          <div className="h-3 bg-white/10 rounded animate-pulse w-4/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 bg-white/10 rounded animate-pulse w-20" />
          <div className="h-8 bg-white/10 rounded animate-pulse w-20" />
        </div>
      </div>
    ),
    
    text: (
      <div className={`space-y-2 ${className}`}>
        <div className="h-4 bg-white/10 rounded animate-pulse w-full" />
        <div className="h-4 bg-white/10 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-white/10 rounded animate-pulse w-4/6" />
      </div>
    ),
    
    circle: (
      <div className={`h-12 w-12 rounded-full bg-white/10 animate-pulse ${className}`} />
    ),
    
    rect: (
      <div className={`h-32 bg-white/10 rounded-lg animate-pulse ${className}`} />
    ),
    
    stat: (
      <div className={`rounded-xl border border-white/10 bg-white/5 p-6 space-y-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-lg bg-white/10 animate-pulse" />
          <div className="h-6 bg-white/10 rounded animate-pulse w-16" />
        </div>
        <div className="space-y-2">
          <div className="h-8 bg-white/10 rounded animate-pulse w-24" />
          <div className="h-3 bg-white/10 rounded animate-pulse w-32" />
        </div>
      </div>
    ),
    
    list: (
      <div className={`space-y-4 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-white/5">
            <div className="h-10 w-10 rounded-full bg-white/10 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded animate-pulse w-2/3" />
              <div className="h-3 bg-white/10 rounded animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {skeletons.map((i) => (
        <div key={i} className={count > 1 ? "mb-4" : ""}>
          {variants[variant]}
        </div>
      ))}
    </motion.div>
  );
}

// Specific skeleton components for common use cases
export function CardSkeleton({ count = 1 }: { count?: number }) {
  return <SkeletonLoader variant="card" count={count} />;
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }, (_, i) => (
        <div 
          key={i} 
          className="h-4 bg-white/10 rounded animate-pulse" 
          style={{ width: `${100 - i * 10}%` }}
        />
      ))}
    </div>
  );
}

export function StatCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonLoader key={i} variant="stat" />
      ))}
    </div>
  );
}

export function ListSkeleton() {
  return <SkeletonLoader variant="list" />;
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 bg-white/10 rounded animate-pulse" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4">
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="h-4 bg-white/10 rounded animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  );
}
