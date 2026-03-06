import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, UserCheck, Database, AlertCircle } from "lucide-react";
import { GradientBackground } from "@/components/glass/GradientBackground";

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  const lastUpdated = "February 4, 2026";

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: `We collect information you provide directly to us, including:
      
• Account information (name, email, password)
• Profile information (location, bio, interests, expertise)
• User-generated content (posts, comments, campaign participation)
• Communication data (messages, support tickets)
• Usage data (pages visited, features used, time spent)
• Device information (IP address, browser type, operating system)

We use this information to provide, maintain, and improve our services, communicate with you, and personalize your experience.`
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: `Your information is used to:

• Operate and improve Your Earth platform
• Personalize your experience and content recommendations
• Send you updates, newsletters, and campaign notifications
• Connect you with relevant communities and climate champions
• Analyze platform usage to enhance features and functionality
• Protect against fraud, abuse, and security threats
• Comply with legal obligations and enforce our terms

We never sell your personal information to third parties.`
    },
    {
      icon: UserCheck,
      title: "Information Sharing",
      content: `We may share your information in limited circumstances:

• With your consent or at your direction
• With service providers who assist our operations (hosting, analytics, email)
• To comply with legal obligations or respond to lawful requests
• To protect the rights, property, or safety of Your Earth, users, or the public
• In connection with a merger, acquisition, or sale of assets
• Aggregated or de-identified data that cannot identify you

We implement strict data processing agreements with all service providers.`
    },
    {
      icon: Shield,
      title: "Data Security",
      content: `We implement industry-standard security measures to protect your information:

• Encryption of data in transit and at rest
• Regular security audits and vulnerability assessments
• Access controls and authentication requirements
• Secure data centers with redundancy and backup systems
• Employee training on data protection practices
• Incident response procedures for potential breaches

However, no system is completely secure, and we cannot guarantee absolute security.`
    },
    {
      icon: Eye,
      title: "Your Rights and Choices",
      content: `You have rights regarding your personal information:

• Access: Request a copy of your data
• Correction: Update inaccurate or incomplete information
• Deletion: Request deletion of your account and data
• Portability: Receive your data in a machine-readable format
• Opt-out: Unsubscribe from marketing communications
• Object: Object to processing of your data for certain purposes

Contact us at privacy@yourearth.org to exercise these rights.`
    },
    {
      icon: AlertCircle,
      title: "Children's Privacy",
      content: `Your Earth is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn that we have collected information from a child under 13, we will take steps to delete it promptly.

Parents or guardians who believe their child has provided information should contact us immediately.`
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
              Legal Document
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-300">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
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
                  Welcome to Your Earth. We are committed to protecting your privacy and ensuring 
                  transparency about how we handle your personal information. This Privacy Policy 
                  describes our practices concerning the data we collect through your use of our 
                  platform, website, and services (collectively, the "Services").
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  By using our Services, you agree to the collection and use of information in 
                  accordance with this policy. If you do not agree with our policies and practices, 
                  please do not use our Services.
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

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10 backdrop-blur-xl border-white/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Questions About Our Privacy Policy?
                </h2>
                <p className="text-slate-300 mb-6">
                  If you have any questions, concerns, or requests regarding this Privacy Policy 
                  or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-slate-300">
                  <p>Email: <span className="text-primary">privacy@yourearth.org</span></p>
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