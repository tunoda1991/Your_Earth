import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

// Standard animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Stagger item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// Wrapper components with animations
interface AnimatedProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = "", delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInUp({ children, className = "", delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className = "", delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInLeft({ children, className = "", delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInRight({ children, className = "", delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger wrapper
export function StaggerContainer({ children, className = "" }: Omit<AnimatedProps, "delay">) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: Omit<AnimatedProps, "delay">) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

// Scroll-triggered animation
export function ScrollReveal({ children, className = "" }: Omit<AnimatedProps, "delay">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hover lift effect
export function HoverLift({ children, className = "", onClick }: AnimatedProps & { onClick?: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Hover scale effect
export function HoverScale({ children, className = "", onClick, scale = 1.05 }: AnimatedProps & { onClick?: () => void; scale?: number }) {
  return (
    <motion.div
      whileHover={{ scale, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Page transition wrapper
export function PageTransition({ children, className = "" }: Omit<AnimatedProps, "delay">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Gentle float animation
export function FloatAnimation({ children, className = "" }: Omit<AnimatedProps, "delay">) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Pulse animation for attention
export function PulseAnimation({ children, className = "" }: Omit<AnimatedProps, "delay">) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
