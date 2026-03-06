import { Button } from "./button";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonVariantProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

// Primary Action Button - Main CTAs
export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonVariantProps>(
  ({ icon: Icon, iconPosition = "left", children, className = "", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={`
          bg-gradient-to-r from-green-600 to-emerald-600 
          hover:from-green-700 hover:to-emerald-700
          text-white font-semibold
          shadow-lg hover:shadow-xl
          transition-all duration-300
          border-0
          ${className}
        `}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className="h-4 w-4 mr-2" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="h-4 w-4 ml-2" />}
      </Button>
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";

// Secondary Button - Alternative actions
export const SecondaryButton = forwardRef<HTMLButtonElement, ButtonVariantProps>(
  ({ icon: Icon, iconPosition = "left", children, className = "", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        className={`
          bg-white/5 hover:bg-white/10
          border-white/20 hover:border-white/30
          text-white
          backdrop-blur-sm
          transition-all duration-300
          ${className}
        `}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className="h-4 w-4 mr-2" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="h-4 w-4 ml-2" />}
      </Button>
    );
  }
);
SecondaryButton.displayName = "SecondaryButton";

// Ghost Button - Subtle actions
export const GhostButton = forwardRef<HTMLButtonElement, ButtonVariantProps>(
  ({ icon: Icon, iconPosition = "left", children, className = "", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        className={`
          text-white/70 hover:text-white
          hover:bg-white/5
          transition-all duration-200
          ${className}
        `}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className="h-4 w-4 mr-2" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="h-4 w-4 ml-2" />}
      </Button>
    );
  }
);
GhostButton.displayName = "GhostButton";

// Destructive Button - Delete/remove actions
export const DestructiveButton = forwardRef<HTMLButtonElement, ButtonVariantProps>(
  ({ icon: Icon, iconPosition = "left", children, className = "", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={`
          bg-gradient-to-r from-red-600 to-red-700
          hover:from-red-700 hover:to-red-800
          text-white
          shadow-lg hover:shadow-xl
          transition-all duration-300
          border-0
          ${className}
        `}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className="h-4 w-4 mr-2" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="h-4 w-4 ml-2" />}
      </Button>
    );
  }
);
DestructiveButton.displayName = "DestructiveButton";

// Category Button - For category-specific actions
export const CategoryButton = forwardRef<
  HTMLButtonElement,
  ButtonVariantProps & { category: "energy" | "food" | "mobility" | "industry" | "technology" | "policy" | "nature" }
>(({ category, icon: Icon, iconPosition = "left", children, className = "", ...props }, ref) => {
  const categoryStyles = {
    energy: "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
    food: "from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
    mobility: "from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
    industry: "from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700",
    technology: "from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    policy: "from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600",
    nature: "from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600",
  };

  return (
    <Button
      ref={ref}
      className={`
        bg-gradient-to-r ${categoryStyles[category]}
        text-white font-semibold
        shadow-lg hover:shadow-xl
        transition-all duration-300
        border-0
        ${className}
      `}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className="h-4 w-4 mr-2" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="h-4 w-4 ml-2" />}
    </Button>
  );
});
CategoryButton.displayName = "CategoryButton";

// Link Button - Looks like button, acts like link
export const LinkButton = forwardRef<HTMLButtonElement, ButtonVariantProps>(
  ({ icon: Icon, iconPosition = "left", children, className = "", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="link"
        className={`
          text-green-400 hover:text-green-300
          underline-offset-4
          transition-colors duration-200
          ${className}
        `}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className="h-4 w-4 mr-2" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="h-4 w-4 ml-2" />}
      </Button>
    );
  }
);
LinkButton.displayName = "LinkButton";

// Icon Button - Circular icon-only button
export const IconButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonVariantProps, "children"> & { icon: LucideIcon; label: string }
>(({ icon: Icon, label, className = "", ...props }, ref) => {
  return (
    <Button
      ref={ref}
      size="icon"
      variant="ghost"
      className={`
        h-10 w-10 rounded-full
        bg-white/5 hover:bg-white/10
        text-white/70 hover:text-white
        transition-all duration-200
        ${className}
      `}
      aria-label={label}
      {...props}
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
});
IconButton.displayName = "IconButton";
