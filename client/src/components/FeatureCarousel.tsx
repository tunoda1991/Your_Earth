import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { 
  LucideIcon, 
  Leaf, 
  Droplet, 
  Wind, 
  Sun, 
  Recycle, 
  TreePine,
  ShoppingBag,
  Home,
  Plane,
  Utensils,
  Zap,
  Bike
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSlide {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  gradientOverlay: string;
  badgeText: string;
}

export function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(12); // Start in the middle set
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  
  const slides: CarouselSlide[] = [
    {
      icon: Leaf,
      title: "Carbon Footprint Tracking",
      description: "Monitor and reduce your personal carbon footprint with our intelligent tracking tools and personalized recommendations.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      gradientOverlay: "linear-gradient(to top, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.7))",
      badgeText: "Track Impact",
    },
    {
      icon: Droplet,
      title: "Water Conservation",
      description: "Learn effective water-saving strategies and track your water usage to protect this precious resource.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      gradientOverlay: "linear-gradient(to top, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.7))",
      badgeText: "Save Water",
    },
    {
      icon: Wind,
      title: "Clean Energy Solutions",
      description: "Discover renewable energy options for your home and community, from solar panels to wind power.",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
      gradientOverlay: "linear-gradient(to top, rgba(139, 92, 246, 0.9), rgba(124, 58, 237, 0.7))",
      badgeText: "Go Green",
    },
    {
      icon: Sun,
      title: "Sustainable Living",
      description: "Adopt eco-friendly lifestyle habits with our practical guides covering everything from food to fashion.",
      image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",
      gradientOverlay: "linear-gradient(to top, rgba(245, 158, 11, 0.9), rgba(217, 119, 6, 0.7))",
      badgeText: "Live Green",
    },
    {
      icon: Recycle,
      title: "Circular Economy",
      description: "Join the zero-waste movement with tips on recycling, upcycling, and reducing consumption.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
      gradientOverlay: "linear-gradient(to top, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.7))",
      badgeText: "Zero Waste",
    },
    {
      icon: TreePine,
      title: "Reforestation Projects",
      description: "Participate in tree-planting initiatives and track the impact of global reforestation efforts.",
      image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&q=80",
      gradientOverlay: "linear-gradient(to top, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.7))",
      badgeText: "Plant Trees",
    },
    {
      icon: ShoppingBag,
      title: "Sustainable Shopping",
      description: "Make informed choices with our guide to sustainable products and ethical brands.",
      image: "https://images.unsplash.com/photo-1758487424832-a53ae6cdefdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHNob3BwaW5nJTIwZWNvJTIwZnJpZW5kbHklMjBiYWdzfGVufDF8fHx8MTc2OTgyNDAzNHww&ixlib=rb-4.1.0&q=80&w=1080",
      gradientOverlay: "linear-gradient(to top, rgba(236, 72, 153, 0.9), rgba(219, 39, 119, 0.7))",
      badgeText: "Shop Green",
    },
    {
      icon: Home,
      title: "Energy-Efficient Home",
      description: "Transform your home with renewable energy and smart technology solutions.",
      image: "https://images.unsplash.com/photo-1761494666841-dec7dc336e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBlZmZpY2llbnQlMjBob21lJTIwc29sYXIlMjBwYW5lbHN8ZW58MXx8fHwxNzY5ODI0MDM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      gradientOverlay: "linear-gradient(to top, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.7))",
      badgeText: "Smart Home",
    },
    {
      icon: Plane,
      title: "Sustainable Travel",
      description: "Explore the world responsibly with eco-friendly travel tips and carbon offset options.",
      image: "https://images.unsplash.com/photo-1765555509849-f07b3e6cc217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHRyYXZlbCUyMGFkdmVudHVyZSUyMG5hdHVyZXxlbnwxfHx8fDE3Njk4MjQwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      gradientOverlay: "linear-gradient(to top, rgba(6, 182, 212, 0.9), rgba(8, 145, 178, 0.7))",
      badgeText: "Travel Green",
    },
    {
      icon: Utensils,
      title: "Sustainable Food Choices",
      description: "Reduce your food carbon footprint with plant-based eating and local sourcing.",
      image: "https://images.unsplash.com/photo-1614582682702-a85fb3949c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZvb2QlMjBvcmdhbmljJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3Njk4MjQwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      gradientOverlay: "linear-gradient(to top, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.7))",
      badgeText: "Eat Local",
    },
    {
      icon: Zap,
      title: "Energy Smart Living",
      description: "Cut energy costs and emissions with intelligent consumption monitoring and efficiency tips.",
      image: "https://images.unsplash.com/photo-1738512509101-ce10c202a9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBsaWdodCUyMGJ1bGIlMjBlbmVyZ3klMjBlZmZpY2llbnR8ZW58MXx8fHwxNzY5ODI0MDM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      gradientOverlay: "linear-gradient(to top, rgba(234, 179, 8, 0.9), rgba(202, 138, 4, 0.7))",
      badgeText: "Save Energy",
    },
    {
      icon: Bike,
      title: "Active Transportation",
      description: "Choose cycling, walking, or public transit for a healthier you and a healthier planet.",
      image: "https://images.unsplash.com/photo-1763041821558-71301407ded8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwY29tbXV0ZSUyMHVyYmFuJTIwY3ljbGluZ3xlbnwxfHx8fDE3Njk4MjQwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      gradientOverlay: "linear-gradient(to top, rgba(99, 102, 241, 0.9), rgba(79, 70, 229, 0.7))",
      badgeText: "Ride Green",
    },
  ];

  // Create infinite loop by duplicating slides
  const infiniteSlides = [...slides, ...slides, ...slides];

  const handlePrevious = () => {
    setShouldAnimate(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setShouldAnimate(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDotClick = (index: number) => {
    setShouldAnimate(true);
    setCurrentIndex(slides.length + (index * 2)); // Jump to middle set + offset
  };

  // Handle infinite loop reset
  useEffect(() => {
    if (shouldAnimate) return;

    // Instantly reset position without transition when at boundaries
    if (currentIndex >= slides.length * 2) {
      setCurrentIndex(currentIndex - slides.length);
    } else if (currentIndex < slides.length) {
      setCurrentIndex(currentIndex + slides.length);
    }
  }, [shouldAnimate, currentIndex, slides.length]);

  // Track when transition ends
  useEffect(() => {
    if (!shouldAnimate) return;
    
    const timer = setTimeout(() => {
      setShouldAnimate(false);
    }, 350); // Match this to animation duration

    return () => clearTimeout(timer);
  }, [currentIndex, shouldAnimate]);

  // Auto-advance carousel
  useEffect(() => {
    if (isDragging) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isDragging]);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Take Climate Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our features designed to help you make a positive impact
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative" ref={containerRef}>
          {/* Desktop: Sliding carousel showing all cards */}
          <div className="hidden lg:block relative overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / 3)}%` }}
              transition={shouldAnimate ? { type: "spring", stiffness: 300, damping: 30 } : { duration: 0 }}
            >
              {infiniteSlides.map((slide, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / 3}% - 16px)` }}
                >
                  <CarouselCard slide={slide} />
                </div>
              ))}
            </motion.div>

            {/* Navigation Arrows for Desktop */}
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>
          </div>
          
          {/* Mobile/Tablet: Horizontal Scrolling Carousel */}
          <div className="lg:hidden relative overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={shouldAnimate ? { type: "spring", stiffness: 300, damping: 30 } : { duration: 0 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, { offset, velocity }) => {
                setIsDragging(false);
                const swipeThreshold = 50;
                
                if (offset.x > swipeThreshold) {
                  handlePrevious();
                } else if (offset.x < -swipeThreshold) {
                  handleNext();
                }
              }}
            >
              {infiniteSlides.map((slide, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                  style={{ width: "90%" }}
                >
                  <CarouselCard slide={slide} />
                </div>
              ))}
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2, 3, 4, 5].map((dotIndex) => {
              // Calculate which dot should be active based on current position
              const normalizedIndex = currentIndex % slides.length;
              const activeDot = Math.floor(normalizedIndex / 2);
              
              return (
                <button
                  key={dotIndex}
                  onClick={() => handleDotClick(dotIndex)}
                  className={`transition-all duration-300 rounded-full ${
                    activeDot === dotIndex
                      ? "w-8 h-3 bg-green-600"
                      : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide group ${dotIndex + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselCard({ slide }: { slide: CarouselSlide }) {
  const IconComponent = slide.icon;
  
  return (
    <motion.div
      className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Full-bleed Image Background */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: slide.gradientOverlay }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8">
        {/* Icon Badge */}
        <motion.div
          className="self-start"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Badge className="bg-white/30 backdrop-blur-md text-white border-white/40 text-sm px-4 py-2 shadow-lg">
            <IconComponent className="h-4 w-4 mr-2" />
            {slide.badgeText}
          </Badge>
        </motion.div>

        {/* Bottom Content */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-4">
            {slide.title}
          </h3>
          
          <p className="text-white/95 text-base leading-relaxed mb-6">
            {slide.description}
          </p>
          
          <Button
            className="bg-white text-gray-900 hover:bg-white/90 transition-all duration-300 group-hover:translate-x-2 shadow-lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </motion.div>
  );
}