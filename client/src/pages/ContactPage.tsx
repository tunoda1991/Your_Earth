import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send,
  MessageSquare,
  HelpCircle,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { toast } from "sonner";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@yourearth.org",
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Climate Street, San Francisco, CA 94102",
      description: "Monday - Friday, 9am - 5pm PST"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Available during business hours"
    }
  ];

  const categories = [
    { value: "general", label: "General Inquiry", icon: MessageSquare },
    { value: "support", label: "Technical Support", icon: HelpCircle },
    { value: "partnership", label: "Partnership Opportunity", icon: Briefcase },
    { value: "report", label: "Report an Issue", icon: AlertCircle }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    toast.success("Message sent successfully! We'll get back to you soon.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: ""
    });
  };

  return (
    <GradientBackground category="default" orbCount={3}>
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Get in Touch
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Contact Us
            </h1>
            <p className="text-xl text-slate-300">
              Have a question, suggestion, or partnership opportunity? 
              We'd love to hear from you.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                  <p className="text-primary mb-2">{info.content}</p>
                  <p className="text-sm text-slate-400">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Send Us a Message</CardTitle>
                  <CardDescription className="text-slate-400">
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-white">Category</Label>
                      <Select onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10">
                          {categories.map((cat) => (
                            <SelectItem 
                              key={cat.value} 
                              value={cat.value}
                              className="text-white focus:bg-white/10 focus:text-white"
                            >
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Quick Help</CardTitle>
                  <CardDescription className="text-slate-400">
                    Looking for something specific?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/10 hover:bg-white/10"
                    onClick={() => onNavigate('help')}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Visit Help Center
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/10 hover:bg-white/10"
                    onClick={() => onNavigate('community')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Join Community Forum
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Response Time
                  </h3>
                  <p className="text-sm text-slate-300 mb-4">
                    We typically respond to all inquiries within 24-48 hours during business days.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-green-400">Currently online</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </GradientBackground>
  );
}