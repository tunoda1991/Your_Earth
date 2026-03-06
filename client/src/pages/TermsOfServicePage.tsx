import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  UserCheck, 
  ShieldAlert, 
  Scale, 
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { GradientBackground } from "@/components/glass/GradientBackground";

interface TermsOfServicePageProps {
  onNavigate: (page: string) => void;
}

export function TermsOfServicePage({ onNavigate }: TermsOfServicePageProps) {
  const lastUpdated = "February 4, 2026";

  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: `By accessing or using Your Earth ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the Service.

These Terms constitute a legally binding agreement between you and Your Earth. We may modify these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.`
    },
    {
      icon: UserCheck,
      title: "User Accounts and Responsibilities",
      content: `To access certain features, you must create an account. You agree to:

• Provide accurate, current, and complete information
• Maintain the security of your password and account
• Notify us immediately of any unauthorized access
• Accept responsibility for all activities under your account
• Not impersonate others or provide false information
• Not share your account with others

You must be at least 13 years old to create an account. Users under 18 require parental consent.`
    },
    {
      icon: CheckCircle,
      title: "Acceptable Use",
      content: `You agree to use the Service only for lawful purposes. You will NOT:

• Violate any laws or regulations
• Infringe on intellectual property rights
• Post false, misleading, or harmful content
• Harass, threaten, or abuse other users
• Distribute malware or conduct cyberattacks
• Spam or engage in commercial solicitation
• Scrape or collect data without permission
• Interfere with the Service's operation

We reserve the right to remove content and suspend accounts that violate these terms.`
    },
    {
      icon: Scale,
      title: "Content and Intellectual Property",
      content: `User-Generated Content:
• You retain ownership of content you create
• You grant us a license to use, display, and distribute your content
• You are responsible for ensuring you have rights to post content
• You represent that your content does not violate third-party rights

Our Content:
• All Service content (text, graphics, logos, software) is our property
• You may not copy, modify, or distribute our content without permission
• Trademarks and brand features are protected
• Unauthorized use may result in legal action`
    },
    {
      icon: ShieldAlert,
      title: "Disclaimers and Limitation of Liability",
      content: `THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.

We do not guarantee:
• Uninterrupted or error-free service
• Accuracy or reliability of content
• Security of your data transmission
• Specific results from using the Service

TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR:
• Indirect, incidental, or consequential damages
• Lost profits or data
• Service interruptions or delays
• User-generated content
• Third-party actions or links

Some jurisdictions do not allow liability limitations, so these may not apply to you.`
    },
    {
      icon: AlertTriangle,
      title: "Termination",
      content: `We may suspend or terminate your account at any time for:

• Violation of these Terms
• Fraudulent or illegal activity
• Abuse of other users or the platform
• Extended period of inactivity
• Any reason at our sole discretion

Upon termination:
• Your access to the Service will cease
• We may delete your account and content
• Provisions regarding liability and disputes survive termination

You may terminate your account at any time through your settings or by contacting us.`
    }
  ];

  return (
    <GradientBackground category="default" orbCount={3}>
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Legal Agreement
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Terms of Service
            </h1>
            <p className="text-lg text-slate-300">
              These terms govern your use of Your Earth and outline the rights and 
              responsibilities of all users.
            </p>
            <p className="text-sm text-slate-400 mt-4">
              Last updated: {lastUpdated}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
              <CardContent className="p-8">
                <p className="text-slate-300 leading-relaxed">
                  Welcome to Your Earth. These Terms of Service ("Terms") govern your access to 
                  and use of our platform, services, and all related features. By creating an 
                  account or using our Services, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms.
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  Please read these Terms carefully before using our Service. If you do not agree 
                  with any part of these Terms, you must not use our Service.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <section.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-white pt-2">{section.title}</h2>
                    </div>
                    <div className="text-slate-300 leading-relaxed whitespace-pre-line pl-16">
                      {section.content}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Governing Law and Disputes</h2>
                <div className="text-slate-300 leading-relaxed space-y-4">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of 
                    the State of California, United States, without regard to its conflict of law 
                    provisions.
                  </p>
                  <p>
                    Any disputes arising from these Terms or your use of the Service shall be 
                    resolved through binding arbitration in San Francisco, California, except where 
                    prohibited by law.
                  </p>
                  <p>
                    You waive any right to participate in class-action lawsuits or class-wide 
                    arbitration against us.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10 backdrop-blur-xl border-white/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Questions About These Terms?
                </h2>
                <p className="text-slate-300 mb-6">
                  If you have questions or concerns about these Terms of Service, 
                  please contact our legal team:
                </p>
                <div className="space-y-2 text-slate-300">
                  <p>Email: <span className="text-primary">legal@yourearth.org</span></p>
                  <p>Address: 123 Climate Street, San Francisco, CA 94102</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </GradientBackground>
  );
}