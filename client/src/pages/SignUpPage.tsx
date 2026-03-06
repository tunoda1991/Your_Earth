import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe2, Mail, Lock, User, MapPin, Briefcase, Eye, EyeOff, ArrowRight, Users, Sparkles, Shield, GraduationCap, Calendar, UserCircle } from "lucide-react";
import { signUp, signIn, getProfile } from "@/components/../utils/api";
import { toast } from "sonner";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { motion } from "framer-motion";
import { COUNTRIES } from "@/components/../utils/countries";

interface SignUpPageProps {
  onNavigate: (page: string) => void;
  onAuthSuccess: (user: any) => void;
}

export function SignUpPage({ onNavigate, onAuthSuccess }: SignUpPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
    gender: "",
    school: "",
    birthday: "",
    expertise: "",
    interests: [] as string[],
    termsAccepted: false
  });

  const expertiseAreas = [
    "Climate Science",
    "Renewable Energy", 
    "Environmental Policy",
    "Sustainable Agriculture",
    "Green Technology",
    "Ocean Conservation",
    "Forest Conservation",
    "Urban Planning",
    "Climate Education",
    "Environmental Law",
    "Clean Transportation",
    "Carbon Management"
  ];

  const interestCategories = [
    { id: 'energy', name: 'Energy', color: 'bg-yellow-600 hover:bg-yellow-700' },
    { id: 'food', name: 'Food', color: 'bg-green-600 hover:bg-green-700' },
    { id: 'mobility', name: 'Mobility', color: 'bg-blue-600 hover:bg-blue-700' },
    { id: 'industry', name: 'Industry', color: 'bg-gray-600 hover:bg-gray-700' },
    { id: 'technology', name: 'Technology', color: 'bg-purple-600 hover:bg-purple-700' },
    { id: 'policy', name: 'Policy', color: 'bg-red-600 hover:bg-red-700' },
    { id: 'nature', name: 'Nature', color: 'bg-emerald-600 hover:bg-emerald-700' }
  ];

  const genderOptions = [
    "Male",
    "Female",
    "Other"
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleLinkedInSignUp = () => {
    toast.info("LinkedIn sign-up will be available soon!");
    // TODO: Implement LinkedIn OAuth
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      const interests = formData.interests.length > 0 ? formData.interests : 
                       (formData.expertise ? [formData.expertise.toLowerCase().replace(/\s+/g, '-')] : []);
      
      // Create account
      await signUp(formData.email, formData.password, fullName, interests);
      
      // Automatically sign in
      const authData = await signIn(formData.email, formData.password);
      
      // Get profile
      const { profile } = await getProfile();
      
      const location = formData.city && formData.country 
        ? `${formData.city}, ${COUNTRIES.find(c => c.code === formData.country)?.name || formData.country}`
        : "";
      
      const userData = {
        id: authData.user.id,
        email: authData.user.email,
        name: profile.name,
        location: location,
        bio: "",
        organization: formData.school || "",
        interests: profile.interests || [],
        verified: false,
        communities: [],
        connections: [],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authData.user.id}`,
      };

      toast.success(`Welcome to Your Earth, ${formData.firstName}!`);
      onAuthSuccess(userData);
      onNavigate('home');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
              <h1 className="text-4xl font-bold mb-3 text-white">Join the Movement</h1>
              <p className="text-slate-300 text-lg">
                Connect with climate champions worldwide and amplify your impact
              </p>
            </motion.div>

            {/* Sign Up Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Create Your Account</CardTitle>
                  <CardDescription className="text-slate-400">
                    Start your journey toward climate action today
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-signup">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white">First Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="firstName"
                            placeholder="Alex"
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                            data-testid="input-first-name"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Chen"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="alex@example.com"
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          data-testid="input-email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
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

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">Confirm Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-white">Country</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400 z-10" />
                        <Select onValueChange={(value) => handleInputChange("country", value)}>
                          <SelectTrigger className="pl-10 bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-white/10 max-h-[300px]">
                            {COUNTRIES.map((country) => (
                              <SelectItem key={country.code} value={country.code} className="text-white focus:bg-white/10 focus:text-white">
                                <span className="flex items-center gap-2">
                                  <span>{country.flag}</span>
                                  <span>{country.name}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-white">City</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="city"
                          placeholder="City"
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-white">Gender</Label>
                      <div className="relative">
                        <UserCircle className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Select onValueChange={(value) => handleInputChange("gender", value)}>
                          <SelectTrigger className="pl-10 bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-white/10">
                            {genderOptions.map((gender) => (
                              <SelectItem key={gender} value={gender.toLowerCase().replace(/\s+/g, '-')} className="text-white focus:bg-white/10 focus:text-white">
                                {gender}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="school" className="text-white">School/University</Label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="school"
                          placeholder="School/University"
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                          value={formData.school}
                          onChange={(e) => handleInputChange("school", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthday" className="text-white">Birthday</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="birthday"
                          type="date"
                          lang="en"
                          placeholder="YYYY/MM/DD"
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70"
                          value={formData.birthday}
                          onChange={(e) => handleInputChange("birthday", e.target.value)}
                        />
                      </div>
                      <p className="text-xs text-slate-400">Format: YYYY/MM/DD</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expertise" className="text-white">Area of Expertise</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-slate-400 z-10" />
                        <Select onValueChange={(value) => handleInputChange("expertise", value)}>
                          <SelectTrigger className="pl-10 bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select your expertise area" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-white/10">
                            {expertiseAreas.map((area) => (
                              <SelectItem key={area} value={area.toLowerCase().replace(/\s+/g, '-')} className="text-white focus:bg-white/10 focus:text-white">
                                {area}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Interests (Select multiple)</Label>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-md">
                        <div className="flex flex-wrap gap-2">
                          {interestCategories.map((category) => (
                            <Badge
                              key={category.id}
                              onClick={() => toggleInterest(category.id)}
                              className={`cursor-pointer transition-all text-white ${
                                formData.interests.includes(category.id)
                                  ? category.color
                                  : 'bg-white/10 hover:bg-white/20'
                              }`}
                            >
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                        {formData.interests.length > 0 && (
                          <p className="text-xs text-slate-400 mt-2">
                            {formData.interests.length} selected
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                        className="mt-1"
                      />
                      <Label htmlFor="terms" className="text-sm text-slate-300 leading-relaxed">
                        I agree to the{" "}
                        <span 
                          className="text-primary underline cursor-pointer hover:text-primary/80"
                          onClick={() => onNavigate('terms')}
                        >
                          Terms of Service
                        </span>
                        {" "}and{" "}
                        <span 
                          className="text-primary underline cursor-pointer hover:text-primary/80"
                          onClick={() => onNavigate('privacy')}
                        >
                          Privacy Policy
                        </span>
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-white border-0" 
                      size="lg"
                      disabled={isLoading}
                      data-testid="button-signup-submit"
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="bg-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-slate-900/50 px-2 text-slate-400">Or continue with</span>
                    </div>
                  </div>

                  <Button 
                    type="button"
                    variant="outline"
                    className="w-full border-white/20 hover:bg-white/10"
                    size="lg"
                    onClick={handleLinkedInSignUp}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Sign up with LinkedIn
                  </Button>

                  <Separator className="my-6 bg-white/10" />

                  <div className="text-center">
                    <p className="text-sm text-slate-400">
                      Already have an account?{" "}
                      <Button 
                        variant="link" 
                        className="p-0 text-primary hover:text-primary/80"
                        onClick={() => onNavigate('login')}
                      >
                        Sign in here
                      </Button>
                    </p>
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
                  <Users className="h-3 w-3 mr-2" />
                  Join 50,000+ Climate Champions
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4">
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
                  <div className="text-2xl font-bold text-white">1,234</div>
                  <div className="text-xs text-slate-400">Active Projects</div>
                </div>
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-white">89%</div>
                  <div className="text-xs text-slate-400">Daily Engagement</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}