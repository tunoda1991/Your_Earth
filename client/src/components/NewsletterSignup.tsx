import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Lock,
  TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// ============================================================================
// TYPES
// ============================================================================

interface NewsletterSignupProps {
  variant?: 'default' | 'gradient' | 'minimal' | 'inline';
  onSuccess?: (email: string) => void;
  showBenefits?: boolean;
  darkMode?: boolean;
}

// ============================================================================
// NEWSLETTER BENEFITS
// ============================================================================

const NEWSLETTER_BENEFITS = [
  { icon: TrendingUp, text: "Weekly climate insights & trends" },
  { icon: Sparkles, text: "Exclusive campaign early access" },
  { icon: Mail, text: "Impact reports & success stories" },
];

// ============================================================================
// NEWSLETTER SIGNUP COMPONENT
// ============================================================================

export function NewsletterSignup({ 
  variant = 'default',
  onSuccess,
  showBenefits = true,
  darkMode = false 
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setError(null);
    
    if (value.length > 0) {
      setIsValid(validateEmail(value));
    } else {
      setIsValid(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setIsValid(false);
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate potential error (uncomment to test)
      // if (Math.random() > 0.8) {
      //   throw new Error("This email is already subscribed");
      // }

      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccess?.(email);

      // Reset after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setEmail("");
        setIsValid(null);
      }, 5000);
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const handleUnsubscribe = () => {
    alert("Redirecting to unsubscribe page...");
  };

  // Base text colors based on dark mode
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const textMuted = darkMode ? "text-gray-500" : "text-gray-500";

  // Success State
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 relative"
        >
          <CheckCircle className="h-10 w-10 text-white" />
          
          {/* Animated rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-green-500"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-green-500"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-2xl font-bold mb-2 ${textPrimary}`}
        >
          You're all set! 🎉
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${textSecondary} mb-6`}
        >
          We've sent a confirmation email to <strong>{email}</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Badge variant="secondary" className="text-sm">
            <Sparkles className="h-3 w-3 mr-1" />
            First newsletter arriving soon
          </Badge>
          <Badge variant="outline" className="text-sm">
            <Lock className="h-3 w-3 mr-1" />
            Your data is secure
          </Badge>
        </motion.div>
      </motion.div>
    );
  }

  // Render based on variant
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${textMuted}`} />
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          className={`pl-12 pr-32 h-14 text-base ${
            darkMode ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : ''
          } ${
            isValid === false ? 'border-red-500 focus:ring-red-500' : 
            isValid === true ? 'border-green-500 focus:ring-green-500' : ''
          }`}
        />
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                ⚡
              </motion.span>
              Subscribing...
            </span>
          ) : (
            <>
              Subscribe
              <ArrowRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-lg border border-red-200 dark:border-red-900"
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {isValid === false && !error && email.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-red-500 flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            Please enter a valid email address
          </motion.p>
        )}

        {isValid === true && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-green-500 flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Looks good!
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex items-start gap-2 text-xs">
        <Lock className={`h-3 w-3 shrink-0 mt-0.5 ${textMuted}`} />
        <p className={textMuted}>
          By subscribing, you agree to our{" "}
          <button className="underline hover:no-underline">Privacy Policy</button>. 
          We respect your privacy and will never share your email. 
          You can{" "}
          <button onClick={handleUnsubscribe} className="underline hover:no-underline">
            unsubscribe at any time
          </button>.
        </p>
      </div>
    </form>
  );

  // Variant: Default
  if (variant === 'default') {
    return (
      <Card className={darkMode ? 'bg-gray-900 border-gray-800' : ''}>
        <CardContent className="p-8">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-6">
              <h2 className={`text-3xl font-bold mb-2 ${textPrimary}`}>
                Stay Updated on Climate Action
              </h2>
              <p className={textSecondary}>
                Join 50,000+ climate champions receiving weekly insights, campaign updates, 
                and impact reports
              </p>
            </div>

            {showBenefits && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {NEWSLETTER_BENEFITS.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.text}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`text-center p-3 rounded-lg ${
                        darkMode ? 'bg-white/5' : 'bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 text-green-600 mx-auto mb-2" />
                      <p className={`text-xs ${textSecondary}`}>{benefit.text}</p>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {renderForm()}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Variant: Gradient
  if (variant === 'gradient') {
    return (
      <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              💚 Join the Movement
            </Badge>
            <h2 className="text-4xl font-bold mb-3">
              Stay Updated on Climate Action
            </h2>
            <p className="text-white/90 text-lg">
              Get exclusive climate insights delivered to your inbox every week
            </p>
          </div>

          {showBenefits && (
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {NEWSLETTER_BENEFITS.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.text}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            {renderForm()}
          </div>
        </div>
      </div>
    );
  }

  // Variant: Minimal
  if (variant === 'minimal') {
    return (
      <div className={`max-w-md mx-auto ${darkMode ? '' : 'p-6'}`}>
        <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>
          Stay Updated on Climate Action
        </h3>
        <p className={`text-sm ${textSecondary} mb-4`}>
          Weekly insights and campaign updates
        </p>
        {renderForm()}
      </div>
    );
  }

  // Variant: Inline
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1">
        <h3 className={`font-semibold mb-1 ${textPrimary}`}>
          Stay Updated on Climate Action
        </h3>
        <p className={`text-sm ${textSecondary}`}>
          Weekly insights and campaign updates
        </p>
      </div>
      <div className="w-full sm:w-auto sm:min-w-[300px]">
        {renderForm()}
      </div>
    </div>
  );
}

// ============================================================================
// DEMO
// ============================================================================

export function NewsletterSignupDemo() {
  const handleSuccess = (email: string) => {
    console.log('Newsletter subscription successful:', email);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Newsletter Signup Variants</h1>
          <p className="text-muted-foreground">
            Four different styles with validation and success states
          </p>
        </div>

        {/* Default Variant */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Default Variant</h2>
          <NewsletterSignup 
            variant="default" 
            onSuccess={handleSuccess}
            showBenefits={true}
          />
        </div>

        {/* Gradient Variant */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Gradient Variant</h2>
          <NewsletterSignup 
            variant="gradient" 
            onSuccess={handleSuccess}
            showBenefits={true}
          />
        </div>

        {/* Minimal Variant */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Minimal Variant</h2>
          <div className="border rounded-lg p-8">
            <NewsletterSignup 
              variant="minimal" 
              onSuccess={handleSuccess}
              showBenefits={false}
            />
          </div>
        </div>

        {/* Inline Variant */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Inline Variant</h2>
          <div className="border rounded-lg p-6">
            <NewsletterSignup 
              variant="inline" 
              onSuccess={handleSuccess}
              showBenefits={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
