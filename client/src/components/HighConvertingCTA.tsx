import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Star, CheckCircle, Users, Award, Globe, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Environmental Scientist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    initials: "SM",
    quote: "This platform transformed how I engage with climate action. The community is incredible!",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Sustainability Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    initials: "DC",
    quote: "Finally, a place that combines education, action, and real impact tracking. Highly recommend!",
    rating: 5
  },
  {
    name: "Maya Patel",
    role: "Climate Activist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    initials: "MP",
    quote: "Joined 3 months ago and already connected with amazing people making real change.",
    rating: 5
  }
];

const organizationLogos = [
  { name: "United Nations", opacity: "opacity-70" },
  { name: "WWF", opacity: "opacity-60" },
  { name: "Greenpeace", opacity: "opacity-70" },
  { name: "Climate Reality", opacity: "opacity-60" },
  { name: "350.org", opacity: "opacity-70" }
];

const trustIndicators = [
  { icon: Users, text: "50,000+ Active Members", color: "text-blue-400" },
  { icon: Award, text: "Featured by UN Climate Change", color: "text-yellow-400" },
  { icon: Globe, text: "Active in 89 Countries", color: "text-green-400" },
  { icon: CheckCircle, text: "2.3M kg CO₂ Saved Together", color: "text-emerald-400" }
];

interface HighConvertingCTAProps {
  onStartFree?: () => void;
  onSeeHowItWorks?: () => void;
}

export function HighConvertingCTA({ onStartFree, onSeeHowItWorks }: HighConvertingCTAProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Content */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Join the Movement
            </Badge>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Join 50,000+ Climate Champions
            </h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Connect with a global community taking real climate action. Learn, act, and track your impact—all in one place. 
              <span className="font-semibold"> Start your journey today, it's completely free.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                onClick={onStartFree}
                className="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-6 h-auto font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onSeeHowItWorks}
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto font-semibold backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </div>

            {/* Quick Trust Line */}
            <p className="text-white/80 text-sm">
              ✓ No credit card required  •  ✓ Free forever  •  ✓ Join in 60 seconds
            </p>
          </motion.div>

          {/* Trust Indicators Grid */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 text-center"
                >
                  <Icon className={`h-8 w-8 ${indicator.color} mx-auto mb-2`} />
                  <p className="text-white text-sm font-medium">{indicator.text}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-center text-white/90 text-lg font-semibold mb-6">
              Loved by climate champions worldwide
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-white/90 text-sm mb-4 italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white/30">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-white/20 text-white">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium text-sm">{testimonial.name}</p>
                      <p className="text-white/70 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Organization Logos / Partners */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-white/70 text-sm mb-6 uppercase tracking-wider">
              Trusted by leading climate organizations
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {organizationLogos.map((org, index) => (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 ${org.opacity} hover:opacity-100 transition-opacity`}
                >
                  <p className="text-white font-semibold text-sm">{org.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final Rating Display */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="h-6 w-px bg-white/30" />
              <p className="text-white font-semibold">
                4.9/5 from 12,847 reviews
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
