import { motion } from "framer-motion";
import { Button } from "./button";
import { LucideIcon, Inbox, Search, Users, FileText, AlertCircle, Database, Image, Calendar, MessageSquare } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "search" | "error" | "info";
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  secondaryAction,
  variant = "default",
  className = "",
}: EmptyStateProps) {
  const variantStyles = {
    default: {
      iconColor: "text-white/40",
      iconBg: "bg-white/5",
    },
    search: {
      iconColor: "text-blue-400/60",
      iconBg: "bg-blue-500/10",
    },
    error: {
      iconColor: "text-red-400/60",
      iconBg: "bg-red-500/10",
    },
    info: {
      iconColor: "text-cyan-400/60",
      iconBg: "bg-cyan-500/10",
    },
  };

  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className={`mb-6 rounded-2xl ${styles.iconBg} p-6`}
      >
        <Icon className={`h-12 w-12 ${styles.iconColor}`} />
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-white mb-3"
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white/70 max-w-md mb-8 leading-relaxed"
      >
        {description}
      </motion.p>

      {/* Actions */}
      {(action || secondaryAction) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          {action && (
            <Button
              onClick={action.onClick}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
              className="bg-white/5 hover:bg-white/10 text-white border-white/20"
            >
              {secondaryAction.label}
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// Preset empty states for common scenarios

export function NoResultsFound({ onReset }: { onReset?: () => void }) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description="We couldn't find anything matching your search. Try adjusting your filters or search terms."
      variant="search"
      action={onReset ? { label: "Clear filters", onClick: onReset } : undefined}
    />
  );
}

export function NoDataAvailable({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={Database}
      title="No data available"
      description="There's no data to display yet. Start by creating your first entry."
      action={onCreate ? { label: "Get started", onClick: onCreate } : undefined}
    />
  );
}

export function NoCommunities({ onExplore, onCreate }: { onExplore?: () => void; onCreate?: () => void }) {
  return (
    <EmptyState
      icon={Users}
      title="No communities yet"
      description="You haven't joined any communities. Explore communities to connect with like-minded climate advocates."
      action={onExplore ? { label: "Explore communities", onClick: onExplore } : undefined}
      secondaryAction={onCreate ? { label: "Create community", onClick: onCreate } : undefined}
    />
  );
}

export function NoPosts({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={FileText}
      title="No posts yet"
      description="This community doesn't have any posts yet. Be the first to start the conversation!"
      action={onCreate ? { label: "Create post", onClick: onCreate } : undefined}
    />
  );
}

export function NoEvents({ onExplore, onCreate }: { onExplore?: () => void; onCreate?: () => void }) {
  return (
    <EmptyState
      icon={Calendar}
      title="No events found"
      description="There are no upcoming events in your area. Check back later or create your own!"
      action={onCreate ? { label: "Create event", onClick: onCreate } : undefined}
      secondaryAction={onExplore ? { label: "Explore all events", onClick: onExplore } : undefined}
    />
  );
}

export function NoComments() {
  return (
    <EmptyState
      icon={MessageSquare}
      title="No comments yet"
      description="Be the first to share your thoughts on this topic."
      variant="info"
    />
  );
}

export function NoImages() {
  return (
    <EmptyState
      icon={Image}
      title="No images"
      description="No images have been uploaded yet."
    />
  );
}

export function ErrorState({ onRetry, message }: { onRetry?: () => void; message?: string }) {
  return (
    <EmptyState
      icon={AlertCircle}
      title="Something went wrong"
      description={message || "We encountered an error loading this content. Please try again."}
      variant="error"
      action={onRetry ? { label: "Try again", onClick: onRetry } : undefined}
    />
  );
}
