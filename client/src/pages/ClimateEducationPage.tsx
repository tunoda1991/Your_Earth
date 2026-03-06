import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassHero } from "@/components/glass/GlassHero";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { BookOpen, Clock, Users, Star, TrendingUp, Award, Target, GraduationCap, Video, FileText, Headphones, Play, Sparkles } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const learningStats = [
  {
    title: "Courses Completed",
    value: "15,678",
    change: "+12%",
    icon: BookOpen
  },
  {
    title: "Hours Learned",
    value: "45,892",
    change: "+18%",
    icon: Clock
  },
  {
    title: "Certificates Earned",
    value: "8,234",
    change: "+25%",
    icon: Award
  },
  {
    title: "Skills Developed",
    value: "156",
    change: "+8%",
    icon: Target
  }
];

const featuredExperts = [
  {
    name: "Dr. Elena Rodriguez",
    title: "Climate Physics Professor",
    university: "MIT",
    expertise: "Atmospheric Science",
    courses: 12,
    rating: 4.9,
    students: 25600,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80"
  },
  {
    name: "Prof. David Chen",
    title: "Renewable Energy Engineer",
    university: "Stanford",
    expertise: "Solar Technology",
    courses: 8,
    rating: 4.8,
    students: 18900,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80"
  },
  {
    name: "Dr. Amara Okafor",
    title: "Environmental Policy Expert",
    university: "Oxford",
    expertise: "Climate Policy",
    courses: 15,
    rating: 4.9,
    students: 31200,
    image: "https://images.unsplash.com/photo-1621011072884-4d63ecb557c9?w=800&q=80"
  }
];

const learningFormats = [
  {
    title: "Interactive Courses",
    description: "Hands-on learning with simulations",
    icon: Play,
    count: "150+ courses",
    color: "blue"
  },
  {
    title: "Video Lectures",
    description: "Expert presentations from universities",
    icon: Video,
    count: "500+ videos",
    color: "purple"
  },
  {
    title: "Research Papers",
    description: "Latest climate science research",
    icon: FileText,
    count: "1,000+ papers",
    color: "green"
  },
  {
    title: "Podcasts",
    description: "Conversations with leading voices",
    icon: Headphones,
    count: "200+ episodes",
    color: "orange"
  }
];

interface ClimateEducationPageProps {
  onNavigate?: (page: string) => void;
}

export function ClimateEducationPage({ onNavigate }: ClimateEducationPageProps) {
  return (
    <GradientBackground category="nature" orbCount={3}>
      <div className="pt-8">
        {/* Hero Section */}
        <GlassHero category="nature" size="lg">
          <div className="text-center">
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-2 mb-6">
              <GraduationCap className="h-4 w-4 mr-2" />
              Climate Education Platform
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
              Master Climate{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Science & Action
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Access world-class climate education from leading scientists, researchers, and practitioners. 
              Build the knowledge and skills needed to drive meaningful environmental change.
            </p>

            {/* Learning Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {learningStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400 mb-1">{stat.title}</div>
                    <div className="text-xs text-emerald-400 flex items-center justify-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 px-8 py-6 text-lg"
                onClick={() => onNavigate && onNavigate('signup')}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start Learning Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-lg bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => onNavigate && onNavigate('learn-education')}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Browse All Courses
              </Button>
            </div>
          </div>
        </GlassHero>

        {/* Learning Formats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Multiple Learning Formats</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Choose from various learning formats that suit your learning style and schedule
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {learningFormats.map((format, index) => {
                const IconComponent = format.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Card className="h-full flex flex-col text-center p-6 bg-slate-900/50 backdrop-blur-xl border-white/10 hover:bg-slate-900/70 transition-all">
                      <div className={`w-16 h-16 ${
                        format.color === 'blue' ? 'bg-blue-500/10' :
                        format.color === 'purple' ? 'bg-purple-500/10' :
                        format.color === 'green' ? 'bg-green-500/10' :
                        'bg-orange-500/10'
                      } rounded-lg flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`h-8 w-8 ${
                          format.color === 'blue' ? 'text-blue-400' :
                          format.color === 'purple' ? 'text-purple-400' :
                          format.color === 'green' ? 'text-green-400' :
                          'text-orange-400'
                        }`} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{format.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 flex-grow">{format.description}</p>
                      <Badge variant="secondary" className="bg-white/5 text-slate-300 border-white/10">{format.count}</Badge>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Experts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Learn from Climate Experts</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Our courses are designed and taught by world-renowned climate scientists, 
                researchers, and practitioners from leading institutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredExperts.map((expert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col overflow-hidden bg-slate-900/50 backdrop-blur-xl border-white/10 hover:bg-slate-900/70 transition-all">
                    <div className="h-64 relative overflow-hidden">
                      <ImageWithFallback
                        src={expert.image}
                        alt={expert.name}
                        className="w-full h-full object-cover object-center"
                      />
                      <Badge className="absolute top-4 right-4 bg-green-500/20 text-green-300 border-green-500/30">
                        {expert.expertise}
                      </Badge>
                    </div>
                    
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-lg text-white">{expert.name}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {expert.title} • {expert.university}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 pt-0">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-slate-300">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{expert.rating}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-400">
                          <Users className="h-4 w-4" />
                          <span>{expert.students.toLocaleString()} students</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-400">
                        {expert.courses} courses available
                      </div>
                      
                      <Button className="w-full bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/20">
                        View Courses
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </GradientBackground>
  );
}