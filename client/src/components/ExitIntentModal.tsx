import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  Target, 
  TrendingUp, 
  Users,
  Sparkles,
  X,
  Mail,
  ArrowRight,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const challengeBenefits = [
  {
    icon: Clock,
    text: "Just 5 minutes to complete",
    color: "text-blue-500"
  },
  {
    icon: Target,
    text: "Make measurable climate impact",
    color: "text-green-500"
  },
  {
    icon: TrendingUp,
    text: "Track your progress and results",
    color: "text-purple-500"
  },
  {
    icon: Users,
    text: "Join 12,000+ challenge participants",
    color: "text-orange-500"
  }
];

// Mock avatar images
const avatarImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
];

interface ExitIntentModalProps {
  onAcceptChallenge?: (email: string) => void;
  onDismiss?: () => void;
}

export function ExitIntentModal({ onAcceptChallenge, onDismiss }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hasShown, setHasShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the page and hasn't been shown yet
      if (e.clientY <= 0 && !hasShown && !isOpen) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    // Add a small delay before activating the listener to avoid immediate triggers
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onDismiss?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    onAcceptChallenge?.(email);

    // Close modal after success
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-2 border-green-500/20 [&>button]:hidden">
        <DialogDescription className="sr-only">
          Take the 5-minute climate action challenge before you leave. Learn simple actions to reduce your carbon footprint.
        </DialogDescription>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Header with Gradient */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white">
                <DialogHeader>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mx-auto mb-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <Sparkles className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <DialogTitle className="text-[30px] text-center text-white mb-2 font-bold">
                    Wait! Before you go... ⏱️
                  </DialogTitle>
                  
                  <p className="text-lg text-center text-white/90">
                    Take the <span className="font-bold">5-Minute Climate Action Challenge</span>
                  </p>
                </DialogHeader>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* What you'll get header */}
                <div className="flex items-center gap-2 mb-4">
                  <Check className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold">What you'll get:</h3>
                </div>

                {/* Benefits Grid - 2x2 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {challengeBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                      >
                        <Icon className={`h-5 w-5 ${benefit.color} flex-shrink-0 mt-0.5`} />
                        <p className="text-sm">{benefit.text}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Green Info Box */}
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    🌱 Your 5-Minute Challenge:
                  </h4>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Learn one simple action you can take today to reduce your carbon footprint. 
                    We'll send you a personalized action plan based on your lifestyle—no commitment required!
                  </p>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold h-12 px-6"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="mr-2"
                            >
                              <Sparkles className="h-4 w-4" />
                            </motion.div>
                            Preparing...
                          </>
                        ) : (
                          <>
                            Accept Challenge
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>

                {/* Social Proof - Overlapping Avatars */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="flex -space-x-2">
                    {avatarImages.map((src, index) => (
                      <motion.img
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        src={src}
                        alt={`Participant ${index + 1}`}
                        className="w-10 h-10 rounded-full border-2 border-background object-cover"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">12,847 people</span> accepted this week
                  </p>
                </div>

                {/* Dismiss Option */}
                <div className="mt-6 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    No thanks, maybe later
                  </Button>
                </div>

                {/* Privacy Note */}
                <p className="mt-4 text-xs text-center text-muted-foreground">
                  🔒 We respect your privacy. No spam, ever.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6 w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-3">Challenge Accepted! 🎉</h3>
              <p className="text-muted-foreground mb-6">
                Check your email for your personalized action plan.
              </p>

              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                Welcome to the movement! 🌍
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
