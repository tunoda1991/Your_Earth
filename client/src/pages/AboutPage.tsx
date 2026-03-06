import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Globe2, 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Award,
  TrendingUp,
  Building2,
  Leaf
} from "lucide-react";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const stats = [
    { label: "Active Members", value: "50K+", icon: Users, color: "text-blue-500" },
    { label: "Countries", value: "127", icon: Globe2, color: "text-green-500" },
    { label: "Campaigns", value: "1,234", icon: Target, color: "text-purple-500" },
    { label: "CO2 Reduced", value: "2.4M tons", icon: Leaf, color: "text-emerald-500" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe in the power of collective action and put our community at the center of everything we do."
    },
    {
      icon: Zap,
      title: "Action Oriented",
      description: "We don't just talk about change—we make it happen through tangible, measurable climate action."
    },
    {
      icon: Award,
      title: "Science-Based",
      description: "All our initiatives are grounded in peer-reviewed climate science and expert knowledge."
    },
    {
      icon: TrendingUp,
      title: "Transparent Impact",
      description: "We track and share every metric, ensuring accountability and demonstrating real-world results."
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      bio: "Climate scientist with 15+ years researching atmospheric CO2 patterns",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
    },
    {
      name: "Marcus Johnson",
      role: "Head of Community",
      bio: "Former community organizer who led grassroots climate movements across 20 cities",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
    },
    {
      name: "Priya Patel",
      role: "Chief Technology Officer",
      bio: "Tech innovator specializing in data visualization and climate modeling",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
    },
    {
      name: "Alex Rivera",
      role: "Director of Partnerships",
      bio: "Sustainability expert connecting corporations with climate solutions",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
    },
  ];

  return (
    <GradientBackground category="default" orbCount={3}>
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              About Your Earth
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Empowering Climate Action Through Community
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              We're building the world's largest community of climate champions, 
              connecting people with the knowledge, tools, and collective power to 
              create meaningful environmental change.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="bg-slate-900/50 backdrop-blur-xl border-white/10 text-center">
                <CardContent className="pt-6">
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
              <CardContent className="p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Your Earth exists to democratize climate action by providing a platform where 
                    anyone—regardless of background or expertise—can learn about climate science, 
                    connect with like-minded individuals, and participate in campaigns that drive 
                    real environmental impact. We believe that when people have access to accurate 
                    information and supportive communities, they become unstoppable forces for change.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-white">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="bg-slate-900/50 backdrop-blur-xl border-white/10 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                    <Users className="h-20 w-20 text-white/40" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-primary mb-3">{member.role}</p>
                    <p className="text-sm text-slate-400">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10 backdrop-blur-xl border-white/10">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of climate champions taking action every day. 
                  Together, we can build a sustainable future for our planet.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => onNavigate('signup')}
                    className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600"
                  >
                    Join Our Community
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => onNavigate('contact')}
                    className="border-white/20 hover:bg-white/10"
                  >
                    Get in Touch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      
      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </GradientBackground>
  );
}