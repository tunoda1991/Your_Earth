import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe2, Mail, Lock, Eye, EyeOff, ArrowRight, Users, Sparkles, Shield } from "lucide-react";
import { signIn, getProfile } from "@/components/../utils/api";
import { toast } from "sonner";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { motion } from "framer-motion";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onAuthSuccess: (user: any) => void;
}

export function LoginPage({ onNavigate, onAuthSuccess }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    try {
      // Sign in with Supabase
      const authData = await signIn(formData.email, formData.password);
      
      // Get user profile
      const { profile } = await getProfile();
      
      const userData = {
        id: authData.user.id,
        email: authData.user.email,
        name: profile.name,
        location: profile.location || "",
        bio: profile.bio || "",
        organization: profile.organization || "",
        interests: profile.interests || [],
        verified: profile.verified || false,
        communities: profile.communities || [],
        connections: profile.connections || [],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authData.user.id}`,
      };

      toast.success(`Welcome back, ${profile.name}!`);
      onAuthSuccess(userData);
      onNavigate('home');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const quickLoginUsers = [
    { name: "Demo Scientist", email: "scientist@demo.com", role: "Climate Researcher" },
    { name: "Demo Activist", email: "activist@demo.com", role: "Community Organizer" },
    { name: "Demo Student", email: "student@demo.com", role: "Climate Student" }
  ];

  const handleQuickLogin = (user: any) => {
    const mockUser = {
      id: Date.now(),
      name: user.name,
      email: user.email,
      location: "Demo Location",
      expertise: user.role,
      avatar: "https://images.unsplash.com/photo-1657152042392-c1f39e52e7c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTg2OTY4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      joinDate: "2023-01-15",
      status: "online",
      bio: `${user.role} passionate about climate action and environmental sustainability.`,
      contributions: Math.floor(Math.random() * 200) + 50,
      communities: ["Climate Scientists Network", "Environmental Advocates"],
      badges: ["Climate Champion", "Community Builder"]
    };

    onAuthSuccess(mockUser);
    onNavigate('home');
  };

  return (
    <GradientBackground category="default" orbCount={3}>
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="relative">
                  <Globe2 className="h-8 w-8 text-green-400" />
                  <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md" />
                </div>
                <span className="text-2xl font-black text-white">
                  Your <span className="text-green-400">Earth</span>
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-3 text-white">Welcome Back</h1>
              <p className="text-slate-300 text-lg">
                Continue your climate action journey
              </p>
            </motion.div>

            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Sign In</CardTitle>
                  <CardDescription className="text-slate-400">
                    Access your climate community dashboard
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-login">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          data-testid="input-email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          required
                          data-testid="input-password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-slate-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                        />
                        <Label htmlFor="remember" className="text-sm text-slate-300">
                          Remember me
                        </Label>
                      </div>
                      
                      <Button variant="link" className="p-0 text-sm text-primary hover:text-primary/80">
                        Forgot password?
                      </Button>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-white border-0" 
                      size="lg"
                      disabled={isLoading}
                      data-testid="button-login-submit"
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>

                  <Separator className="my-6 bg-white/10" />

                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm font-medium mb-3 text-white">Quick Demo Access</p>
                      <div className="space-y-2">
                        {quickLoginUsers.map((user, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start bg-white/5 border-white/10 text-white hover:bg-white/10"
                            onClick={() => handleQuickLogin(user)}
                          >
                            <div className="flex items-center space-x-2 w-full">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                                {user.name.charAt(0)}
                              </div>
                              <div className="flex-1 text-left">
                                <div className="text-sm font-medium">{user.name}</div>
                                <div className="text-xs text-slate-400">{user.role}</div>
                              </div>
                              <ArrowRight className="h-3 w-3 text-slate-400" />
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="text-center">
                      <p className="text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Button 
                          variant="link" 
                          className="p-0 text-primary hover:text-primary/80"
                          onClick={() => onNavigate('signup')}
                        >
                          Create one now
                        </Button>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <div className="text-center mb-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                  <Shield className="h-3 w-3 mr-2" />
                  Trusted by Climate Champions Worldwide
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-xs text-slate-400">Active Users</div>
                </div>
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Globe2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-white">127</div>
                  <div className="text-xs text-slate-400">Countries</div>
                </div>
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs text-slate-400">Global Impact</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}