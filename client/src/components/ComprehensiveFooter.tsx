import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  ArrowRight,
  Leaf,
  Globe2
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FooterLink {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Platform",
    links: [
      { label: "About Us", href: "about" },
      { label: "Contact Us", href: "contact" },
      { label: "Help Center", href: "help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "privacy" },
      { label: "Terms of Service", href: "terms" },
    ],
  },
];

const SOCIAL_LINKS = [
  { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "#1DA1F2" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com", color: "#E4405F" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "#0A66C2" },
];

// ============================================================================
// NEWSLETTER SIGNUP (Embedded Version)
// ============================================================================

interface NewsletterSignupEmbeddedProps {
  onSuccess?: (email: string) => void;
}

function NewsletterSignupEmbedded({ onSuccess }: NewsletterSignupEmbeddedProps) {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
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
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);
    onSuccess?.(email);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setEmail("");
      setIsValid(null);
    }, 3000);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
          <Mail className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">You're subscribed! 🎉</h3>
        <p className="text-sm text-gray-400">
          Check your inbox for a confirmation email
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">
        Stay Updated on Climate Action
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Get weekly insights, campaign updates, and climate news delivered to your inbox
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-24 h-12 ${
              isValid === false ? 'border-red-500' : isValid === true ? 'border-green-500' : ''
            }`}
          />
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="absolute right-1 top-1 h-10 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {isSubmitting ? (
              "Subscribing..."
            ) : (
              <>
                Subscribe
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>

        {isValid === false && email.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-400"
          >
            Please enter a valid email address
          </motion.p>
        )}

        <p className="text-xs text-gray-500">
          By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}

// ============================================================================
// COMPREHENSIVE FOOTER
// ============================================================================

interface ComprehensiveFooterProps {
  onNavigate?: (page: string) => void;
}

export function ComprehensiveFooter({ onNavigate }: ComprehensiveFooterProps) {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleLinkClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate?.(href.replace('/', ''));
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Signup Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <NewsletterSignupEmbedded />
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-gray-800">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link.href, link.external)}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                      {link.badge && (
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-green-500/20 text-green-400 border-green-500/30"
                        >
                          {link.badge}
                        </Badge>
                      )}
                      {link.external && (
                        <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          ↗
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Social Links Column */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredSocial(social.name)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                  style={{
                    backgroundColor: hoveredSocial === social.name ? `${social.color}20` : undefined,
                    borderColor: hoveredSocial === social.name ? `${social.color}40` : undefined,
                  }}
                >
                  <social.icon 
                    className="h-5 w-5" 
                    style={{ color: hoveredSocial === social.name ? social.color : 'currentColor' }}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo matching header exactly */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleLinkClick('home')}
              >
                <div className="relative">
                  <Globe2 className="h-6 w-6 text-green-400" />
                  <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md" />
                </div>
                <span className="font-semibold text-white">Your Earth</span>
              </div>
              <div className="text-sm text-gray-500 text-center md:text-left">
                <p>
                  © {new Date().getFullYear()} Your Earth. All rights reserved.
                </p>
                <p className="mt-1">
                  Made with 💚 for the planet by climate champions worldwide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <button 
                onClick={() => handleLinkClick('/status')}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                All Systems Operational
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-500">🌍</span>
                <button className="text-gray-400 hover:text-white transition-colors">
                  English (US)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// DEMO
// ============================================================================

export function ComprehensiveFooterDemo() {
  const handleNavigate = (page: string) => {
    console.log('Navigate to:', page);
    alert(`Navigating to: ${page}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Content */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Comprehensive Footer Demo</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Scroll down to see the full-featured footer with newsletter signup, 
            social links, and organized link sections.
          </p>
          <div className="h-96 flex items-center justify-center border rounded-lg bg-muted/20">
            <p className="text-muted-foreground">Main Page Content</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <ComprehensiveFooter onNavigate={handleNavigate} />
    </div>
  );
}