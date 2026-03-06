import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GlassCard } from "@/components/glass/GlassCard";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  X, 
  MapPin, 
  Users, 
  Globe, 
  Lock, 
  Mail,
  Check,
  Image as ImageIcon,
  Zap,
  UtensilsCrossed,
  Car,
  Factory,
  Laptop,
  Scale,
  TreePine,
  CheckCircle2,
  Twitter,
  Facebook,
  Share2,
  MessageCircle,
  Copy,
  Edit2,
  Eye
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CreateCommunityPageProps {
  onNavigate: (page: string) => void;
  user?: any;
}

const categoryOptions = [
  { value: "energy", label: "Energy", icon: Zap, color: "text-yellow-500 bg-yellow-500/10" },
  { value: "food", label: "Food", icon: UtensilsCrossed, color: "text-orange-500 bg-orange-500/10" },
  { value: "mobility", label: "Mobility", icon: Car, color: "text-blue-500 bg-blue-500/10" },
  { value: "industry", label: "Industry", icon: Factory, color: "text-gray-500 bg-gray-500/10" },
  { value: "technology", label: "Technology", icon: Laptop, color: "text-purple-500 bg-purple-500/10" },
  { value: "policy", label: "Policy", icon: Scale, color: "text-red-500 bg-red-500/10" },
  { value: "nature", label: "Nature", icon: TreePine, color: "text-green-500 bg-green-500/10" }
];

const suggestedTags = [
  "renewable energy", "activism", "education", "policy", "recycling", 
  "carbon neutral", "conservation", "sustainable living", "climate science", 
  "green technology", "zero waste", "biodiversity"
];

const languages = [
  "English", "Spanish", "French", "German", "Chinese", "Japanese", 
  "Portuguese", "Arabic", "Hindi", "Russian"
];

export function CreateCommunityPage({ onNavigate, user }: CreateCommunityPageProps) {
  // Require login
  useEffect(() => {
    if (!user) {
      onNavigate('login');
    }
  }, [user, onNavigate]);

  if (!user) {
    return null;
  }

  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form data
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    coverImage: null as File | null,
    coverImagePreview: "",
    location: "",
    tags: [] as string[],
    privacyLevel: "public",
    postPermission: "all",
    guidelines: "",
    language: "English",
    permissions: {
      allowInvites: true,
      allowEvents: true,
      showMembers: true,
      allowDiscussions: true
    },
    agreedToTerms: false
  });

  const [tagInput, setTagInput] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (hasUnsavedChanges) {
        localStorage.setItem("createCommunityDraft", JSON.stringify(formData));
        toast.success("Draft saved", { duration: 1000 });
      }
    }, 30000);

    return () => clearTimeout(saveTimeout);
  }, [formData, hasUnsavedChanges]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem("createCommunityDraft");
    if (draft) {
      const confirmed = window.confirm("You have an unsaved draft. Would you like to continue from where you left off?");
      if (confirmed) {
        setFormData(JSON.parse(draft));
      }
    }
  }, []);

  // Warn before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, coverImage: "Image must be less than 5MB" }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          coverImage: file,
          coverImagePreview: e.target?.result as string
        }));
        setHasUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !formData.tags.includes(trimmedTag) && formData.tags.length < 8) {
      updateFormData("tags", [...formData.tags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateFormData("tags", formData.tags.filter(tag => tag !== tagToRemove));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Community name is required";
      if (formData.name.length > 60) newErrors.name = "Name must be 60 characters or less";
      if (!formData.category) newErrors.category = "Please select a category";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (formData.description.length > 500) newErrors.description = "Description must be 500 characters or less";
    }

    if (step === 2) {
      if (!formData.privacyLevel) newErrors.privacyLevel = "Please select a privacy level";
      if (!formData.postPermission) newErrors.postPermission = "Please select posting permissions";
      if (formData.guidelines.length > 1000) newErrors.guidelines = "Guidelines must be 1000 characters or less";
      if (!formData.language) newErrors.language = "Please select a language";
    }

    if (step === 3) {
      if (!formData.agreedToTerms) newErrors.agreedToTerms = "You must agree to the terms to continue";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      toast.error(`Please fix ${Object.keys(newErrors).length} error(s) before continuing`);
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setHasUnsavedChanges(false);
    localStorage.removeItem("createCommunityDraft");
    
    // Confetti effect
    toast.success("Community created successfully! 🎉");
  };

  const handleSaveDraft = () => {
    localStorage.setItem("createCommunityDraft", JSON.stringify(formData));
    toast.success("Draft saved successfully");
  };

  const getCategoryIcon = (value: string) => {
    const category = categoryOptions.find(c => c.value === value);
    if (!category) return null;
    const Icon = category.icon;
    return <Icon className="h-4 w-4" />;
  };

  const getCategoryColor = (value: string) => {
    return categoryOptions.find(c => c.value === value)?.color || "";
  };

  const copyShareLink = () => {
    const link = `yourearth.com/community/${formData.name.toLowerCase().replace(/\s+/g, "-")}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="relative overflow-hidden border-green-500/20 bg-slate-900/80 backdrop-blur-xl">
            {/* Confetti background effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"
                  initial={{ 
                    top: "-10%", 
                    left: `${Math.random() * 100}%`,
                    opacity: 1,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{ 
                    top: "110%", 
                    opacity: 0,
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: Math.random() * 2 + 2, 
                    delay: Math.random() * 0.5,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>

            <CardContent className="pt-12 pb-8 relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-center text-white mb-4"
              >
                Community Created! 🎉
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center text-slate-300 mb-8"
              >
                Start inviting members to build your climate community
              </motion.p>

              {/* Share link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-800/50 rounded-lg p-4 mb-6"
              >
                <Label className="text-sm text-slate-400 mb-2 block">Share Link</Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={`yourearth.com/community/${formData.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="bg-slate-900/50 border-slate-700 text-slate-200"
                  />
                  <Button onClick={copyShareLink} size="icon" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              {/* Social share buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center gap-3 mb-8"
              >
                <Button size="icon" variant="outline" className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20">
                  <Twitter className="h-4 w-4 text-blue-400" />
                </Button>
                <Button size="icon" variant="outline" className="bg-blue-600/10 border-blue-600/30 hover:bg-blue-600/20">
                  <Facebook className="h-4 w-4 text-blue-500" />
                </Button>
                <Button size="icon" variant="outline" className="bg-red-500/10 border-red-500/30 hover:bg-red-500/20">
                  <Mail className="h-4 w-4 text-red-400" />
                </Button>
                <Button size="icon" variant="outline" className="bg-green-500/10 border-green-500/30 hover:bg-green-500/20">
                  <MessageCircle className="h-4 w-4 text-green-400" />
                </Button>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button 
                  size="lg" 
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  onClick={() => onNavigate("community")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Invite Members
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => onNavigate("community")}
                >
                  Go to Community
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-3">Create a New Community</h1>
            <p className="text-slate-400 text-lg">Build a space for climate action in your area of interest</p>
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    step === currentStep
                      ? "border-green-500 bg-green-500/20 text-green-500"
                      : step < currentStep
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-slate-700 bg-slate-800/50 text-slate-500"
                  }`}
                >
                  {step < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="font-semibold">{step}</span>
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      step < currentStep ? "bg-green-500" : "bg-slate-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Basic Information</CardTitle>
                    <CardDescription>Tell us about your community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Community Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Community Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="e.g., Solar Energy Advocates NYC"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        maxLength={60}
                        className={`bg-slate-800/50 border-slate-700 text-white ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                      <div className="flex justify-between items-center">
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                        <p
                          className={`text-sm ml-auto ${
                            formData.name.length > 54
                              ? "text-red-500"
                              : formData.name.length > 48
                              ? "text-yellow-500"
                              : "text-slate-500"
                          }`}
                        >
                          {formData.name.length}/60
                        </p>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-white">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                        <SelectTrigger className={`bg-slate-800/50 border-slate-700 text-white ${errors.category ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {categoryOptions.map((cat) => {
                            const Icon = cat.icon;
                            return (
                              <SelectItem key={cat.value} value={cat.value} className="text-white">
                                <div className="flex items-center gap-2">
                                  <div className={`p-1.5 rounded ${cat.color}`}>
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  {cat.label}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500"
                        >
                          {errors.category}
                        </motion.p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-white">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="What is your community about? What will members do together?"
                        value={formData.description}
                        onChange={(e) => updateFormData("description", e.target.value)}
                        rows={5}
                        maxLength={500}
                        className={`bg-slate-800/50 border-slate-700 text-white resize-none ${
                          errors.description ? "border-red-500" : ""
                        }`}
                      />
                      <div className="flex justify-between items-center">
                        {errors.description && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500"
                          >
                            {errors.description}
                          </motion.p>
                        )}
                        <p
                          className={`text-sm ml-auto ${
                            formData.description.length > 475
                              ? "text-red-500"
                              : formData.description.length > 400
                              ? "text-yellow-500"
                              : "text-slate-500"
                          }`}
                        >
                          {formData.description.length}/500
                        </p>
                      </div>
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-2">
                      <Label className="text-white">Cover Image</Label>
                      <div
                        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                          formData.coverImagePreview
                            ? "border-green-500 bg-green-500/5"
                            : "border-slate-700 bg-slate-800/30 hover:border-slate-600"
                        }`}
                      >
                        {formData.coverImagePreview ? (
                          <div className="relative">
                            <img
                              src={formData.coverImagePreview}
                              alt="Cover preview"
                              className="max-h-48 mx-auto rounded-lg"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, coverImage: null, coverImagePreview: "" }));
                              }}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <>
                            <ImageIcon className="h-12 w-12 mx-auto text-slate-500 mb-4" />
                            <p className="text-slate-400 mb-2">
                              Drag & drop or click to upload
                            </p>
                            <p className="text-sm text-slate-500">
                              Recommended size: 1200×400px (Max 5MB)
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </>
                        )}
                      </div>
                      {errors.coverImage && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500"
                        >
                          {errors.coverImage}
                        </motion.p>
                      )}
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-white">
                        Location <span className="text-slate-500">(optional)</span>
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                          id="location"
                          placeholder="e.g., New York, NY"
                          value={formData.location}
                          onChange={(e) => updateFormData("location", e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white pl-10"
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label className="text-white">
                        Tags <span className="text-slate-500">(max 8)</span>
                      </Label>
                      
                      {/* Selected tags */}
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-green-500/20 text-green-400 border-green-500/30 pr-1"
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="ml-2 hover:bg-green-500/30 rounded-full p-0.5"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Tag input */}
                      {formData.tags.length < 8 && (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type a tag and press Enter"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addTag(tagInput);
                              }
                            }}
                            className="bg-slate-800/50 border-slate-700 text-white"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => addTag(tagInput)}
                            disabled={!tagInput.trim()}
                          >
                            Add
                          </Button>
                        </div>
                      )}

                      {/* Suggested tags */}
                      <div className="space-y-2">
                        <p className="text-sm text-slate-400">Suggested tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {suggestedTags
                            .filter(tag => !formData.tags.includes(tag))
                            .slice(0, 8)
                            .map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="cursor-pointer hover:bg-slate-700 border-slate-600 text-slate-300"
                                onClick={() => addTag(tag)}
                              >
                                + {tag}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Next button */}
                    <Button
                      onClick={handleNext}
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      Next: Settings
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Settings</CardTitle>
                    <CardDescription>Configure your community preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Privacy Level */}
                    <div className="space-y-3">
                      <Label className="text-white">
                        Privacy Level <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.privacyLevel}
                        onValueChange={(value) => updateFormData("privacyLevel", value)}
                        className="space-y-3"
                      >
                        <div className="flex items-start space-x-3 bg-slate-800/30 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                          <RadioGroupItem value="public" id="public" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="public" className="text-white cursor-pointer flex items-center gap-2">
                              <Globe className="h-4 w-4 text-green-500" />
                              Public
                            </Label>
                            <p className="text-sm text-slate-400 mt-1">
                              Anyone can join and view content
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 bg-slate-800/30 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                          <RadioGroupItem value="private" id="private" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="private" className="text-white cursor-pointer flex items-center gap-2">
                              <Lock className="h-4 w-4 text-yellow-500" />
                              Private
                            </Label>
                            <p className="text-sm text-slate-400 mt-1">
                              Approval required to join, content visible to members only
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 bg-slate-800/30 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                          <RadioGroupItem value="invite-only" id="invite-only" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="invite-only" className="text-white cursor-pointer flex items-center gap-2">
                              <Mail className="h-4 w-4 text-red-500" />
                              Invite-only
                            </Label>
                            <p className="text-sm text-slate-400 mt-1">
                              Members can only join via invite link
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Post Permission */}
                    <div className="space-y-3">
                      <Label className="text-white">
                        Who can post? <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.postPermission}
                        onValueChange={(value) => updateFormData("postPermission", value)}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 bg-slate-800/30 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                          <RadioGroupItem value="all" id="all-members" />
                          <Label htmlFor="all-members" className="text-white cursor-pointer flex-1">
                            All members
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 bg-slate-800/30 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                          <RadioGroupItem value="moderators" id="moderators-only" />
                          <Label htmlFor="moderators-only" className="text-white cursor-pointer flex-1">
                            Moderators only
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Guidelines */}
                    <div className="space-y-2">
                      <Label htmlFor="guidelines" className="text-white">
                        Community Guidelines <span className="text-slate-500">(optional)</span>
                      </Label>
                      <Textarea
                        id="guidelines"
                        placeholder="Community rules and expected behavior..."
                        value={formData.guidelines}
                        onChange={(e) => updateFormData("guidelines", e.target.value)}
                        rows={8}
                        maxLength={1000}
                        className="bg-slate-800/50 border-slate-700 text-white resize-none"
                      />
                      <p
                        className={`text-sm text-right ${
                          formData.guidelines.length > 950
                            ? "text-red-500"
                            : formData.guidelines.length > 800
                            ? "text-yellow-500"
                            : "text-slate-500"
                        }`}
                      >
                        {formData.guidelines.length}/1000
                      </p>
                    </div>

                    {/* Language */}
                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-white">
                        Language <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.language} onValueChange={(value) => updateFormData("language", value)}>
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {languages.map((lang) => (
                            <SelectItem key={lang} value={lang} className="text-white">
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Permissions */}
                    <div className="space-y-3">
                      <Label className="text-white">Permissions</Label>
                      <div className="space-y-3">
                        {[
                          { key: "allowInvites", label: "Allow members to invite others" },
                          { key: "allowEvents", label: "Enable event creation by members" },
                          { key: "showMembers", label: "Show member list publicly" },
                          { key: "allowDiscussions", label: "Allow members to create discussions" }
                        ].map((perm) => (
                          <div
                            key={perm.key}
                            className="flex items-center space-x-3 bg-slate-800/30 p-4 rounded-lg border border-slate-700"
                          >
                            <Checkbox
                              id={perm.key}
                              checked={formData.permissions[perm.key as keyof typeof formData.permissions]}
                              onCheckedChange={(checked) =>
                                updateFormData("permissions", {
                                  ...formData.permissions,
                                  [perm.key]: checked
                                })
                              }
                            />
                            <Label htmlFor={perm.key} className="text-white cursor-pointer flex-1">
                              {perm.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex gap-3">
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        size="lg"
                        className="flex-1"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      >
                        Next: Review
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Summary */}
                  <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white">Review & Create</CardTitle>
                      <CardDescription>Check your community details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Name */}
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-2xl font-bold text-white">{formData.name || "Untitled Community"}</h3>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setCurrentStep(1)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        </div>
                        {formData.category && (
                          <Badge className={`${getCategoryColor(formData.category)}`}>
                            <span className="mr-1">{getCategoryIcon(formData.category)}</span>
                            {categoryOptions.find(c => c.value === formData.category)?.label}
                          </Badge>
                        )}
                      </div>

                      {/* Cover Image */}
                      {formData.coverImagePreview && (
                        <div>
                          <img
                            src={formData.coverImagePreview}
                            alt="Cover"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {/* Description */}
                      <div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {formData.description || "No description provided"}
                        </p>
                      </div>

                      {/* Location */}
                      {formData.location && (
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <MapPin className="h-4 w-4" />
                          {formData.location}
                        </div>
                      )}

                      {/* Tags */}
                      {formData.tags.length > 0 && (
                        <div>
                          <p className="text-sm text-slate-400 mb-2">Tags:</p>
                          <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-slate-800 text-slate-300">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="h-px bg-slate-700" />

                      {/* Privacy & Settings */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Privacy:</span>
                          <Badge variant="outline" className="capitalize">
                            {formData.privacyLevel.replace("-", " ")}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Posting:</span>
                          <Badge variant="outline" className="capitalize">
                            {formData.postPermission === "all" ? "All members" : "Moderators only"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Language:</span>
                          <Badge variant="outline">{formData.language}</Badge>
                        </div>
                      </div>

                      {/* Guidelines */}
                      {formData.guidelines && (
                        <div>
                          <p className="text-sm text-slate-400 mb-2">Guidelines:</p>
                          <p className="text-sm text-slate-300 line-clamp-3">
                            {formData.guidelines}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Preview */}
                  <div className="space-y-6">
                    <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Eye className="h-5 w-5" />
                          Preview
                        </CardTitle>
                        <CardDescription>How your community will appear</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Community card preview */}
                        <Card className="overflow-hidden border-slate-700 hover:border-slate-600 transition-colors">
                          {formData.coverImagePreview && (
                            <div className="h-32 overflow-hidden">
                              <img
                                src={formData.coverImagePreview}
                                alt="Cover"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-semibold text-white mb-1 line-clamp-1">
                                  {formData.name || "Community Name"}
                                </h4>
                                {formData.category && (
                                  <Badge className={`${getCategoryColor(formData.category)} text-xs`}>
                                    {categoryOptions.find(c => c.value === formData.category)?.label}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                              {formData.description || "No description"}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  1 member
                                </span>
                              </div>
                              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                Join
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </CardContent>
                    </Card>

                    {/* Terms agreement */}
                    <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="terms"
                            checked={formData.agreedToTerms}
                            onCheckedChange={(checked) => updateFormData("agreedToTerms", checked as boolean)}
                            className={errors.agreedToTerms ? "border-red-500" : ""}
                          />
                          <Label htmlFor="terms" className="text-sm text-slate-300 cursor-pointer leading-relaxed">
                            I agree to the Community Guidelines and Terms of Service{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                        </div>
                        {errors.agreedToTerms && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500 mt-2"
                          >
                            {errors.agreedToTerms}
                          </motion.p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleSaveDraft}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    Save as Draft
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.agreedToTerms || isSubmitting}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Create Community
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ComprehensiveFooter />
    </>
  );
}