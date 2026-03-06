import { motion } from "framer-motion";
import { LucideIcon, BookOpen, Users, Zap, Globe, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface FeatureGridCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
  gradient: string;
  delay: number;
  onAction?: () => void;
}

function FeatureGridCard({
  icon: Icon,
  title,
  description,
  stat,
  gradient,
  delay,
  onAction,
}: FeatureGridCardProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Extract number from stat for animation (e.g., "200+" -> 200)
  const targetNumber = parseInt(stat.match(/\d+/)?.[0] || "0");
  
  useEffect(() => {
    if (!isVisible || targetNumber === 0) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [isVisible, targetNumber]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      onViewportEnter={() => setIsVisible(true)}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <div 
        className="relative h-full rounded-2xl p-8 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        style={{ background: gradient }}
      >
        {/* Background Pattern/Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          {/* Icon Badge */}
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 shadow-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="h-8 w-8 text-white" />
          </motion.div>
          
          {/* Stat Counter */}
          <motion.div 
            className="mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            <Badge className="bg-white/30 backdrop-blur-sm text-white border-white/40 text-lg px-4 py-1 font-bold">
              {count > 0 ? `${count}${stat.replace(/\d+/g, '')}` : stat}
            </Badge>
          </motion.div>
          
          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-3">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-white/90 text-sm leading-relaxed mb-6 line-clamp-3">
            {description}
          </p>
          
          {/* Action Button */}
          <Button
            onClick={onAction}
            variant="secondary"
            className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-gray-900 transition-all duration-300 group-hover:translate-x-1"
          >
            Explore
          </Button>
        </div>
        
        {/* Decorative Corner Element */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      </div>
    </motion.div>
  );
}

export function FeatureGrid() {
  const features = [
    {
      icon: BookOpen,
      title: "Learning Modules",
      description: "Comprehensive climate education courses covering science, policy, and action strategies for all knowledge levels.",
      stat: "200+ courses",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with environmental activists, researchers, and changemakers from around the world.",
      stat: "50K+ members",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      icon: Globe,
      title: "Climate Data",
      description: "Access real-time climate data, visualizations, and insights from trusted scientific sources.",
      stat: "1M+ data points",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      icon: Zap,
      title: "Take Action",
      description: "Discover local events, petitions, and volunteer opportunities to make a real impact.",
      stat: "500+ actions",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      icon: TrendingUp,
      title: "Green Jobs",
      description: "Find meaningful career opportunities in sustainability, renewable energy, and conservation.",
      stat: "1000+ jobs",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Earn recognized certificates and credentials for completing climate courses and programs.",
      stat: "150+ certificates",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Platform Capabilities
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to learn, connect, and take action on climate change
          </p>
        </motion.div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureGridCard
              key={feature.title}
              {...feature}
              delay={index * 0.1}
              onAction={() => console.log(`Explore ${feature.title}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
