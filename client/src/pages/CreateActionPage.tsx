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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/glass/GlassCard";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  Upload,
  X,
  DollarSign,
  Target as TargetIcon,
  Users,
  TrendingUp,
  CheckCircle2,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  Mail,
  Copy,
  QrCode,
  Plus,
  Trash2,
  Image as ImageIcon,
  Link as LinkIcon,
  Globe,
  FileSignature,
  AlertCircle,
  Eye,
  Zap,
  UtensilsCrossed,
  Car,
  Factory,
  Laptop,
  Scale,
  TreePine
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CreateActionPageProps {
  onNavigate: (page: string) => void;
  user?: any;
}

const eventTypes = [
  { value: "protest", label: "Protest/March", icon: Users },
  { value: "workshop", label: "Workshop/Training", icon: Laptop },
  { value: "cleanup", label: "Cleanup", icon: TreePine },
  { value: "planting", label: "Tree Planting", icon: TreePine },
  { value: "meeting", label: "Community Meeting", icon: Users },
  { value: "conference", label: "Conference", icon: Globe },
  { value: "webinar", label: "Webinar", icon: Video },
  { value: "screening", label: "Film Screening", icon: Video },
  { value: "other", label: "Other", icon: Zap }
];

const campaignTypes = [
  { value: "petition", label: "Petition", icon: FileSignature },
  { value: "fundraiser", label: "Fundraiser", icon: DollarSign },
  { value: "letter", label: "Letter Writing", icon: Mail },
  { value: "boycott", label: "Boycott", icon: AlertCircle },
  { value: "awareness", label: "Awareness Campaign", icon: TrendingUp },
  { value: "pledge", label: "Pledge Drive", icon: CheckCircle2 }
];

const categoryOptions = [
  { value: "energy", label: "Energy", icon: Zap, color: "text-yellow-500 bg-yellow-500/10" },
  { value: "food", label: "Food", icon: UtensilsCrossed, color: "text-orange-500 bg-orange-500/10" },
  { value: "mobility", label: "Mobility", icon: Car, color: "text-blue-500 bg-blue-500/10" },
  { value: "industry", label: "Industry", icon: Factory, color: "text-gray-500 bg-gray-500/10" },
  { value: "technology", label: "Technology", icon: Laptop, color: "text-purple-500 bg-purple-500/10" },
  { value: "policy", label: "Policy", icon: Scale, color: "text-red-500 bg-red-500/10" },
  { value: "nature", label: "Nature", icon: TreePine, color: "text-green-500 bg-green-500/10" }
];

const actionTypes = [
  "Sign Petition",
  "Donate",
  "Send Letter",
  "Share on Social",
  "Take Pledge",
  "Contact Official",
  "Boycott Product"
];

export function CreateActionPage({ onNavigate, user }: CreateActionPageProps) {
  // Require login
  useEffect(() => {
    if (!user) {
      onNavigate('login');
    }
  }, [user, onNavigate]);

  if (!user) {
    return null;
  }

  const [activeTab, setActiveTab] = useState<"event" | "campaign">("event");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Event form data
  const [eventData, setEventData] = useState({
    name: "",
    type: "",
    date: "",
    time: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    duration: "",
    locationType: "in-person",
    address: "",
    meetingLink: "",
    platform: "",
    description: "",
    coverImage: null as File | null,
    coverImagePreview: "",
    organizer: user?.name || "You",
    coOrganizers: [] as string[],
    category: "",
    expectedAttendees: "",
    registrationType: "open",
    maxAttendees: "",
    impactGoals: {
      education: false,
      community: false,
      environmental: false,
      advocacy: false,
      fundraising: false
    },
    targetImpact: "",
    tags: [] as string[]
  });

  // Campaign form data
  const [campaignData, setCampaignData] = useState({
    name: "",
    type: "",
    goal: "",
    deadline: "",
    noDeadline: false,
    description: "",
    whyMatters: "",
    coverImage: null as File | null,
    coverImagePreview: "",
    videoUrl: "",
    target: "",
    category: "",
    tags: [] as string[],
    impactMetrics: {
      co2Reduced: "",
      treesSaved: "",
      peopleAffected: "",
      areaProtected: "",
      customMetric: "",
      customValue: ""
    },
    callToAction: {
      primaryAction: "",
      buttonText: "",
      externalLink: ""
    },
    milestones: [] as Array<{ percentage: number; text: string }>,
    planUpdates: false
  });

  const [tagInput, setTagInput] = useState("");

  const updateEventData = (field: string, value: any) => {
    setEventData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateCampaignData = (field: string, value: any) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEvent: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isEvent) {
          setEventData(prev => ({
            ...prev,
            coverImage: file,
            coverImagePreview: e.target?.result as string
          }));
        } else {
          setCampaignData(prev => ({
            ...prev,
            coverImage: file,
            coverImagePreview: e.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = (isEvent: boolean) => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag) {
      if (isEvent && !eventData.tags.includes(trimmedTag) && eventData.tags.length < 8) {
        updateEventData("tags", [...eventData.tags, trimmedTag]);
        setTagInput("");
      } else if (!isEvent && !campaignData.tags.includes(trimmedTag) && campaignData.tags.length < 8) {
        updateCampaignData("tags", [...campaignData.tags, trimmedTag]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tag: string, isEvent: boolean) => {
    if (isEvent) {
      updateEventData("tags", eventData.tags.filter(t => t !== tag));
    } else {
      updateCampaignData("tags", campaignData.tags.filter(t => t !== tag));
    }
  };

  const addMilestone = () => {
    if (campaignData.milestones.length < 5) {
      updateCampaignData("milestones", [
        ...campaignData.milestones,
        { percentage: 0, text: "" }
      ]);
    }
  };

  const updateMilestone = (index: number, field: "percentage" | "text", value: any) => {
    const newMilestones = [...campaignData.milestones];
    newMilestones[index][field] = value;
    updateCampaignData("milestones", newMilestones);
  };

  const removeMilestone = (index: number) => {
    updateCampaignData(
      "milestones",
      campaignData.milestones.filter((_, i) => i !== index)
    );
  };

  const validateEvent = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!eventData.name.trim()) newErrors.name = "Event name is required";
    if (eventData.name.length > 100) newErrors.name = "Name must be 100 characters or less";
    if (!eventData.type) newErrors.type = "Please select an event type";
    if (!eventData.date) newErrors.date = "Date is required";
    if (!eventData.time) newErrors.time = "Time is required";
    if (eventData.locationType === "in-person" && !eventData.address.trim()) {
      newErrors.address = "Address is required for in-person events";
    }
    if (eventData.locationType === "virtual" && !eventData.meetingLink.trim()) {
      newErrors.meetingLink = "Meeting link is required for virtual events";
    }
    if (!eventData.description.trim()) newErrors.description = "Description is required";
    if (eventData.description.length > 2000) newErrors.description = "Description must be 2000 characters or less";
    if (!eventData.category) newErrors.category = "Please select a category";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error(`Please fix ${Object.keys(newErrors).length} error(s)`);
      return false;
    }
    return true;
  };

  const validateCampaign = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!campaignData.name.trim()) newErrors.name = "Campaign name is required";
    if (campaignData.name.length > 100) newErrors.name = "Name must be 100 characters or less";
    if (!campaignData.type) newErrors.type = "Please select a campaign type";
    if (!campaignData.goal.trim()) newErrors.goal = "Goal is required";
    if (!campaignData.description.trim()) newErrors.description = "Description is required";
    if (campaignData.description.length > 3000) newErrors.description = "Description must be 3000 characters or less";
    if (!campaignData.whyMatters.trim()) newErrors.whyMatters = "Please explain why this matters";
    if (campaignData.whyMatters.length > 1000) newErrors.whyMatters = "Must be 1000 characters or less";
    if (!campaignData.category) newErrors.category = "Please select a category";
    if (!campaignData.callToAction.primaryAction) newErrors.primaryAction = "Please select a call to action";
    if (!campaignData.callToAction.buttonText.trim()) newErrors.buttonText = "Button text is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error(`Please fix ${Object.keys(newErrors).length} error(s)`);
      return false;
    }
    return true;
  };

  const handlePublish = async () => {
    const isValid = activeTab === "event" ? validateEvent() : validateCampaign();
    if (!isValid) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowPreview(false);
    setShowSuccess(true);
    toast.success(`${activeTab === "event" ? "Event" : "Campaign"} published successfully! 🎉`);
  };

  const copyShareLink = () => {
    const name = activeTab === "event" ? eventData.name : campaignData.name;
    const link = `yourearth.com/${activeTab}/${name.toLowerCase().replace(/\s+/g, "-")}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  if (showSuccess) {
    const isEvent = activeTab === "event";
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="relative overflow-hidden border-green-500/20 bg-slate-900/80 backdrop-blur-xl">
            {/* Celebration animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(isEvent ? 50 : 60)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full ${
                    isEvent
                      ? "bg-gradient-to-br from-blue-400 to-blue-600"
                      : "bg-gradient-to-br from-orange-400 to-red-500"
                  }`}
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
                className={`mx-auto w-24 h-24 ${
                  isEvent ? "bg-blue-500/20" : "bg-orange-500/20"
                } rounded-full flex items-center justify-center mb-6`}
              >
                {isEvent ? (
                  <CalendarIcon className="h-12 w-12 text-blue-500" />
                ) : (
                  <TargetIcon className="h-12 w-12 text-orange-500" />
                )}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-center text-white mb-4"
              >
                {isEvent ? "Event Published! 📅" : "Campaign Live! 🎯"}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center text-slate-300 mb-8"
              >
                Start spreading the word!
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
                    value={`yourearth.com/${activeTab}/${
                      (isEvent ? eventData.name : campaignData.name).toLowerCase().replace(/\s+/g, "-")
                    }`}
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
                className="flex justify-center gap-3 mb-6"
              >
                <Button size="icon" variant="outline" className="bg-blue-500/10 border-blue-500/30">
                  <Twitter className="h-4 w-4 text-blue-400" />
                </Button>
                <Button size="icon" variant="outline" className="bg-blue-600/10 border-blue-600/30">
                  <Facebook className="h-4 w-4 text-blue-500" />
                </Button>
                <Button size="icon" variant="outline" className="bg-blue-700/10 border-blue-700/30">
                  <Linkedin className="h-4 w-4 text-blue-600" />
                </Button>
                <Button size="icon" variant="outline" className="bg-green-500/10 border-green-500/30">
                  <MessageCircle className="h-4 w-4 text-green-400" />
                </Button>
                <Button size="icon" variant="outline" className="bg-red-500/10 border-red-500/30">
                  <Mail className="h-4 w-4 text-red-400" />
                </Button>
              </motion.div>

              {isEvent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="text-center mb-6"
                >
                  <Button variant="outline" size="sm">
                    <QrCode className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                </motion.div>
              )}

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  size="lg"
                  className={`flex-1 ${
                    isEvent
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  }`}
                  onClick={() => onNavigate(isEvent ? "events" : "all-campaigns")}
                >
                  View {isEvent ? "Event" : "Campaign"}
                </Button>
                <Button size="lg" variant="outline" className="flex-1" onClick={() => setShowSuccess(false)}>
                  Create Another
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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-3">Create a Climate Action</h1>
          <p className="text-slate-400 text-lg">Launch an event or campaign to drive climate impact</p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "event" | "campaign")} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-slate-800/50">
            <TabsTrigger value="event" className="data-[state=active]:bg-blue-500">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Event
            </TabsTrigger>
            <TabsTrigger value="campaign" className="data-[state=active]:bg-orange-500">
              <TargetIcon className="h-4 w-4 mr-2" />
              Campaign
            </TabsTrigger>
          </TabsList>

          {/* Event Form */}
          <TabsContent value="event" className="space-y-6">
            <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Event Details</CardTitle>
                <CardDescription>Create a new climate action event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Event Name */}
                <div className="space-y-2">
                  <Label htmlFor="event-name" className="text-white">
                    Event Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="event-name"
                    placeholder="e.g., Community Solar Workshop"
                    value={eventData.name}
                    onChange={(e) => updateEventData("name", e.target.value)}
                    maxLength={100}
                    className={`bg-slate-800/50 border-slate-700 text-white ${errors.name ? "border-red-500" : ""}`}
                  />
                  <div className="flex justify-between items-center">
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                    <p className={`text-sm ml-auto ${eventData.name.length > 90 ? "text-red-500" : "text-slate-500"}`}>
                      {eventData.name.length}/100
                    </p>
                  </div>
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                  <Label htmlFor="event-type" className="text-white">
                    Event Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={eventData.type} onValueChange={(value) => updateEventData("type", value)}>
                    <SelectTrigger className={`bg-slate-800/50 border-slate-700 text-white ${errors.type ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {eventTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <SelectItem key={type.value} value={type.value} className="text-white">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date" className="text-white">
                      Date <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="event-date"
                        type="date"
                        value={eventData.date}
                        onChange={(e) => updateEventData("date", e.target.value)}
                        className={`bg-slate-800/50 border-slate-700 text-white pl-10 ${errors.date ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-time" className="text-white">
                      Time <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="event-time"
                        type="time"
                        value={eventData.time}
                        onChange={(e) => updateEventData("time", e.target.value)}
                        className={`bg-slate-800/50 border-slate-700 text-white pl-10 ${errors.time ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-white">Duration</Label>
                  <Select value={eventData.duration} onValueChange={(value) => updateEventData("duration", value)}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="1" className="text-white">1 hour</SelectItem>
                      <SelectItem value="2" className="text-white">2 hours</SelectItem>
                      <SelectItem value="3" className="text-white">3 hours</SelectItem>
                      <SelectItem value="4" className="text-white">Half-day (4 hrs)</SelectItem>
                      <SelectItem value="8" className="text-white">Full-day (8 hrs)</SelectItem>
                      <SelectItem value="multi" className="text-white">Multi-day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Type */}
                <div className="space-y-3">
                  <Label className="text-white">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={eventData.locationType}
                    onValueChange={(value) => updateEventData("locationType", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                      <RadioGroupItem value="in-person" id="in-person" />
                      <Label htmlFor="in-person" className="text-white cursor-pointer flex items-center gap-2 flex-1">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        In-Person
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                      <RadioGroupItem value="virtual" id="virtual" />
                      <Label htmlFor="virtual" className="text-white cursor-pointer flex items-center gap-2 flex-1">
                        <Video className="h-4 w-4 text-purple-500" />
                        Virtual
                      </Label>
                    </div>
                  </RadioGroup>

                  {eventData.locationType === "in-person" ? (
                    <div className="space-y-2 mt-3">
                      <Label htmlFor="address" className="text-white">Address</Label>
                      <Input
                        id="address"
                        placeholder="Enter event address"
                        value={eventData.address}
                        onChange={(e) => updateEventData("address", e.target.value)}
                        className={`bg-slate-800/50 border-slate-700 text-white ${errors.address ? "border-red-500" : ""}`}
                      />
                      {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                    </div>
                  ) : (
                    <div className="space-y-3 mt-3">
                      <div className="space-y-2">
                        <Label htmlFor="meeting-link" className="text-white">Meeting Link</Label>
                        <Input
                          id="meeting-link"
                          type="url"
                          placeholder="https://zoom.us/j/..."
                          value={eventData.meetingLink}
                          onChange={(e) => updateEventData("meetingLink", e.target.value)}
                          className={`bg-slate-800/50 border-slate-700 text-white ${errors.meetingLink ? "border-red-500" : ""}`}
                        />
                        {errors.meetingLink && <p className="text-sm text-red-500">{errors.meetingLink}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="platform" className="text-white">Platform</Label>
                        <Select value={eventData.platform} onValueChange={(value) => updateEventData("platform", value)}>
                          <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="zoom" className="text-white">Zoom</SelectItem>
                            <SelectItem value="meet" className="text-white">Google Meet</SelectItem>
                            <SelectItem value="teams" className="text-white">Microsoft Teams</SelectItem>
                            <SelectItem value="other" className="text-white">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="event-description" className="text-white">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="event-description"
                    placeholder="Describe your event, what attendees will learn or do..."
                    value={eventData.description}
                    onChange={(e) => updateEventData("description", e.target.value)}
                    rows={6}
                    maxLength={2000}
                    className={`bg-slate-800/50 border-slate-700 text-white resize-none ${errors.description ? "border-red-500" : ""}`}
                  />
                  <div className="flex justify-between items-center">
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    <p className={`text-sm ml-auto ${eventData.description.length > 1800 ? "text-red-500" : "text-slate-500"}`}>
                      {eventData.description.length}/2000
                    </p>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label className="text-white">Cover Image</Label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      eventData.coverImagePreview
                        ? "border-blue-500 bg-blue-500/5"
                        : "border-slate-700 bg-slate-800/30 hover:border-slate-600"
                    }`}
                  >
                    {eventData.coverImagePreview ? (
                      <div className="relative">
                        <img src={eventData.coverImagePreview} alt="Cover preview" className="max-h-48 mx-auto rounded-lg" />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => setEventData(prev => ({ ...prev, coverImage: null, coverImagePreview: "" }))}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="h-12 w-12 mx-auto text-slate-500 mb-4" />
                        <p className="text-slate-400 mb-2">Drag & drop or click to upload</p>
                        <p className="text-sm text-slate-500">Recommended size: 1200×400px (Max 5MB)</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, true)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="event-category" className="text-white">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={eventData.category} onValueChange={(value) => updateEventData("category", value)}>
                    <SelectTrigger className={`bg-slate-800/50 border-slate-700 text-white ${errors.category ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {categoryOptions.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <SelectItem key={cat.value} value={cat.value} className="text-white">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {cat.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                </div>

                {/* Expected Attendees */}
                <div className="space-y-2">
                  <Label htmlFor="expected-attendees" className="text-white">Expected Attendees</Label>
                  <Input
                    id="expected-attendees"
                    type="number"
                    min="1"
                    max="10000"
                    placeholder="e.g., 50"
                    value={eventData.expectedAttendees}
                    onChange={(e) => updateEventData("expectedAttendees", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>

                {/* Registration Type */}
                <div className="space-y-3">
                  <Label className="text-white">
                    Registration Type <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={eventData.registrationType}
                    onValueChange={(value) => updateEventData("registrationType", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                      <RadioGroupItem value="open" id="open" />
                      <Label htmlFor="open" className="text-white cursor-pointer flex-1">
                        Open to all - no registration needed
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                      <RadioGroupItem value="rsvp" id="rsvp" />
                      <Label htmlFor="rsvp" className="text-white cursor-pointer flex-1">
                        RSVP required - limited spots
                      </Label>
                    </div>
                    {eventData.registrationType === "rsvp" && (
                      <div className="ml-7 space-y-2">
                        <Label htmlFor="max-attendees" className="text-white">Maximum Attendees</Label>
                        <Input
                          id="max-attendees"
                          type="number"
                          min="1"
                          placeholder="e.g., 100"
                          value={eventData.maxAttendees}
                          onChange={(e) => updateEventData("maxAttendees", e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white"
                        />
                      </div>
                    )}
                    <div className="flex items-center space-x-3 bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                      <RadioGroupItem value="approval" id="approval" />
                      <Label htmlFor="approval" className="text-white cursor-pointer flex-1">
                        Approval required - organizer reviews each registration
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Impact Goals */}
                <details className="bg-slate-800/30 rounded-lg border border-slate-700">
                  <summary className="cursor-pointer p-4 text-white font-medium">
                    Impact Goals (optional)
                  </summary>
                  <div className="p-4 pt-0 space-y-4">
                    <p className="text-sm text-slate-400 mb-3">What will this event achieve?</p>
                    {[
                      { key: "education", label: "Education/Awareness" },
                      { key: "community", label: "Community Building" },
                      { key: "environmental", label: "Direct Environmental Impact" },
                      { key: "advocacy", label: "Policy Advocacy" },
                      { key: "fundraising", label: "Fundraising" }
                    ].map((goal) => (
                      <div key={goal.key} className="flex items-center space-x-3">
                        <Checkbox
                          id={goal.key}
                          checked={eventData.impactGoals[goal.key as keyof typeof eventData.impactGoals]}
                          onCheckedChange={(checked) =>
                            updateEventData("impactGoals", {
                              ...eventData.impactGoals,
                              [goal.key]: checked
                            })
                          }
                        />
                        <Label htmlFor={goal.key} className="text-white cursor-pointer">
                          {goal.label}
                        </Label>
                      </div>
                    ))}
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="target-impact" className="text-white">Target Impact</Label>
                      <Input
                        id="target-impact"
                        placeholder='e.g., "Plant 100 trees" or "Educate 50 people"'
                        value={eventData.targetImpact}
                        onChange={(e) => updateEventData("targetImpact", e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                </details>

                {/* Tags */}
                <div className="space-y-2">
                  <Label className="text-white">Tags</Label>
                  {eventData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {eventData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 pr-1">
                          {tag}
                          <button onClick={() => removeTag(tag, true)} className="ml-2 hover:bg-blue-500/30 rounded-full p-0.5">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  {eventData.tags.length < 8 && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag(true);
                          }
                        }}
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                      <Button type="button" variant="outline" onClick={() => addTag(true)} disabled={!tagInput.trim()}>
                        Add
                      </Button>
                    </div>
                  )}
                </div>

                {/* Preview & Publish buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      if (validateEvent()) setShowPreview(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Event
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    onClick={handlePublish}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Publish Event
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaign Form */}
          <TabsContent value="campaign" className="space-y-6">
            <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Campaign Details</CardTitle>
                <CardDescription>Launch a new climate campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Campaign Name */}
                <div className="space-y-2">
                  <Label htmlFor="campaign-name" className="text-white">
                    Campaign Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="campaign-name"
                    placeholder="e.g., Ban Single-Use Plastics in Our City"
                    value={campaignData.name}
                    onChange={(e) => updateCampaignData("name", e.target.value)}
                    maxLength={100}
                    className={`bg-slate-800/50 border-slate-700 text-white ${errors.name ? "border-red-500" : ""}`}
                  />
                  <div className="flex justify-between items-center">
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    <p className={`text-sm ml-auto ${campaignData.name.length > 90 ? "text-red-500" : "text-slate-500"}`}>
                      {campaignData.name.length}/100
                    </p>
                  </div>
                </div>

                {/* Campaign Type */}
                <div className="space-y-2">
                  <Label htmlFor="campaign-type" className="text-white">
                    Campaign Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={campaignData.type} onValueChange={(value) => updateCampaignData("type", value)}>
                    <SelectTrigger className={`bg-slate-800/50 border-slate-700 text-white ${errors.type ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {campaignTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <SelectItem key={type.value} value={type.value} className="text-white">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                </div>

                {/* Goal (conditional based on type) */}
                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-white">
                    {campaignData.type === "fundraiser"
                      ? "Dollar Target"
                      : campaignData.type === "petition"
                      ? "Signature Target"
                      : campaignData.type === "pledge"
                      ? "Participant Target"
                      : "Goal"}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    {campaignData.type === "fundraiser" && (
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    )}
                    <Input
                      id="goal"
                      type={campaignData.type === "fundraiser" ? "number" : "text"}
                      placeholder={
                        campaignData.type === "fundraiser"
                          ? "10000"
                          : campaignData.type === "petition"
                          ? "1000"
                          : campaignData.type === "pledge"
                          ? "500"
                          : "Enter your campaign goal"
                      }
                      value={campaignData.goal}
                      onChange={(e) => updateCampaignData("goal", e.target.value)}
                      className={`bg-slate-800/50 border-slate-700 text-white ${
                        campaignData.type === "fundraiser" ? "pl-10" : ""
                      } ${errors.goal ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.goal && <p className="text-sm text-red-500">{errors.goal}</p>}
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-white">Deadline</Label>
                  <div className="space-y-3">
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="deadline"
                        type="date"
                        value={campaignData.deadline}
                        onChange={(e) => updateCampaignData("deadline", e.target.value)}
                        disabled={campaignData.noDeadline}
                        className="bg-slate-800/50 border-slate-700 text-white pl-10"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="no-deadline"
                        checked={campaignData.noDeadline}
                        onCheckedChange={(checked) => updateCampaignData("noDeadline", checked)}
                      />
                      <Label htmlFor="no-deadline" className="text-white cursor-pointer">
                        No deadline
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="campaign-description" className="text-white">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="campaign-description"
                    placeholder="Provide detailed information about your campaign..."
                    value={campaignData.description}
                    onChange={(e) => updateCampaignData("description", e.target.value)}
                    rows={8}
                    maxLength={3000}
                    className={`bg-slate-800/50 border-slate-700 text-white resize-none ${errors.description ? "border-red-500" : ""}`}
                  />
                  <div className="flex justify-between items-center">
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    <p className={`text-sm ml-auto ${campaignData.description.length > 2700 ? "text-red-500" : "text-slate-500"}`}>
                      {campaignData.description.length}/3000
                    </p>
                  </div>
                </div>

                {/* Why It Matters */}
                <div className="space-y-2">
                  <Label htmlFor="why-matters" className="text-white">
                    Why It Matters <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="why-matters"
                    placeholder="What problem does this campaign address? Why is action needed now?"
                    value={campaignData.whyMatters}
                    onChange={(e) => updateCampaignData("whyMatters", e.target.value)}
                    rows={6}
                    maxLength={1000}
                    className={`bg-slate-800/50 border-slate-700 text-white resize-none ${errors.whyMatters ? "border-red-500" : ""}`}
                  />
                  <div className="flex justify-between items-center">
                    {errors.whyMatters && <p className="text-sm text-red-500">{errors.whyMatters}</p>}
                    <p className={`text-sm ml-auto ${campaignData.whyMatters.length > 900 ? "text-red-500" : "text-slate-500"}`}>
                      {campaignData.whyMatters.length}/1000
                    </p>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label className="text-white">Cover Image</Label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      campaignData.coverImagePreview
                        ? "border-orange-500 bg-orange-500/5"
                        : "border-slate-700 bg-slate-800/30 hover:border-slate-600"
                    }`}
                  >
                    {campaignData.coverImagePreview ? (
                      <div className="relative">
                        <img src={campaignData.coverImagePreview} alt="Cover preview" className="max-h-48 mx-auto rounded-lg" />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => setCampaignData(prev => ({ ...prev, coverImage: null, coverImagePreview: "" }))}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="h-12 w-12 mx-auto text-slate-500 mb-4" />
                        <p className="text-slate-400 mb-2">Drag & drop or click to upload</p>
                        <p className="text-sm text-slate-500">Recommended size: 1200×400px (Max 5MB)</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, false)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Video URL */}
                <div className="space-y-2">
                  <Label htmlFor="video-url" className="text-white">
                    Video <span className="text-slate-500">(optional)</span>
                  </Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      id="video-url"
                      type="url"
                      placeholder="YouTube or Vimeo URL"
                      value={campaignData.videoUrl}
                      onChange={(e) => updateCampaignData("videoUrl", e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white pl-10"
                    />
                  </div>
                </div>

                {/* Target */}
                <div className="space-y-2">
                  <Label htmlFor="target" className="text-white">Target</Label>
                  <Input
                    id="target"
                    placeholder='e.g., "U.S. Congress", "Coca-Cola Corporation", "City Council"'
                    value={campaignData.target}
                    onChange={(e) => updateCampaignData("target", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                  <p className="text-sm text-slate-400">Who is this campaign directed at?</p>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="campaign-category" className="text-white">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={campaignData.category} onValueChange={(value) => updateCampaignData("category", value)}>
                    <SelectTrigger className={`bg-slate-800/50 border-slate-700 text-white ${errors.category ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {categoryOptions.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <SelectItem key={cat.value} value={cat.value} className="text-white">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {cat.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label className="text-white">Tags</Label>
                  {campaignData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {campaignData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30 pr-1">
                          {tag}
                          <button onClick={() => removeTag(tag, false)} className="ml-2 hover:bg-orange-500/30 rounded-full p-0.5">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  {campaignData.tags.length < 8 && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag(false);
                          }
                        }}
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                      <Button type="button" variant="outline" onClick={() => addTag(false)} disabled={!tagInput.trim()}>
                        Add
                      </Button>
                    </div>
                  )}
                </div>

                {/* Call to Action */}
                <Card className="bg-slate-800/30 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Call to Action</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-action" className="text-white">
                        Primary Action <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={campaignData.callToAction.primaryAction}
                        onValueChange={(value) =>
                          updateCampaignData("callToAction", {
                            ...campaignData.callToAction,
                            primaryAction: value,
                            buttonText: value ? value : ""
                          })
                        }
                      >
                        <SelectTrigger className={`bg-slate-800/50 border-slate-700 text-white ${errors.primaryAction ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Select action type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {actionTypes.map((action) => (
                            <SelectItem key={action} value={action} className="text-white">
                              {action}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.primaryAction && <p className="text-sm text-red-500">{errors.primaryAction}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="button-text" className="text-white">
                        Action Button Text <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="button-text"
                        maxLength={30}
                        placeholder="e.g., Sign Now, Donate Today"
                        value={campaignData.callToAction.buttonText}
                        onChange={(e) =>
                          updateCampaignData("callToAction", {
                            ...campaignData.callToAction,
                            buttonText: e.target.value
                          })
                        }
                        className={`bg-slate-800/50 border-slate-700 text-white ${errors.buttonText ? "border-red-500" : ""}`}
                      />
                      <p className="text-sm text-slate-500">{campaignData.callToAction.buttonText.length}/30</p>
                      {errors.buttonText && <p className="text-sm text-red-500">{errors.buttonText}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="external-link" className="text-white">
                        External Link <span className="text-slate-500">(if action happens off-platform)</span>
                      </Label>
                      <Input
                        id="external-link"
                        type="url"
                        placeholder="https://..."
                        value={campaignData.callToAction.externalLink}
                        onChange={(e) =>
                          updateCampaignData("callToAction", {
                            ...campaignData.callToAction,
                            externalLink: e.target.value
                          })
                        }
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Milestones */}
                <details className="bg-slate-800/30 rounded-lg border border-slate-700">
                  <summary className="cursor-pointer p-4 text-white font-medium">
                    Milestones (optional)
                  </summary>
                  <div className="p-4 pt-0 space-y-4">
                    {campaignData.milestones.map((milestone, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            placeholder="25"
                            value={milestone.percentage}
                            onChange={(e) => updateMilestone(index, "percentage", parseInt(e.target.value) || 0)}
                            className="bg-slate-800/50 border-slate-700 text-white"
                          />
                          <Input
                            placeholder='e.g., "Quarter of the way!"'
                            value={milestone.text}
                            onChange={(e) => updateMilestone(index, "text", e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white"
                          />
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeMilestone(index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {campaignData.milestones.length < 5 && (
                      <Button variant="outline" onClick={addMilestone} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Milestone
                      </Button>
                    )}
                  </div>
                </details>

                {/* Plan Updates */}
                <div className="flex items-center justify-between bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                  <Label htmlFor="plan-updates" className="text-white cursor-pointer">
                    Plan to post regular updates?
                  </Label>
                  <Checkbox
                    id="plan-updates"
                    checked={campaignData.planUpdates}
                    onCheckedChange={(checked) => updateCampaignData("planUpdates", checked)}
                  />
                </div>

                {/* Preview & Publish buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      if (validateCampaign()) setShowPreview(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Campaign
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                    onClick={handlePublish}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Publish Campaign
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
      
      {/* Comprehensive Footer */}
      <ComprehensiveFooter onNavigate={onNavigate} />
    </>
  );
}
