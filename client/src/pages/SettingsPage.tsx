import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { motion } from "framer-motion";
import { Trash2, Save, Lock, Camera, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/utils/supabase/client";

interface SettingsPageProps {
  user?: any;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

interface ProfileForm {
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  website: string;
}

interface NotificationSettings {
  communityUpdates: boolean;
  learningReminders: boolean;
  actionAlerts: boolean;
  climateDataAlerts: boolean;
  messages: boolean;
}

interface PrivacySettings {
  profileVisibility: string;
  showActivityStatus: boolean;
  showEmail: boolean;
  showLocation: boolean;
}

interface PreferenceSettings {
  temperatureUnit: string;
  language: string;
  defaultRegion: string;
}

export function SettingsPage({ user, onNavigate, onLogout }: SettingsPageProps) {
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.user_metadata?.avatar_url || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileForm, setProfileForm] = useState<ProfileForm>({
    firstName: user?.user_metadata?.name?.split(" ")[0] || "",
    lastName: user?.user_metadata?.name?.split(" ").slice(1).join(" ") || "",
    bio: "",
    location: "",
    website: "",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    communityUpdates: true,
    learningReminders: true,
    actionAlerts: true,
    climateDataAlerts: false,
    messages: true,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "public",
    showActivityStatus: true,
    showEmail: false,
    showLocation: true,
  });

  const [preferences, setPreferences] = useState<PreferenceSettings>({
    temperatureUnit: "celsius",
    language: "en",
    defaultRegion: "global",
  });

  useEffect(() => {
    if (!user?.id) return;
    loadSettings();
  }, [user?.id]);

  async function loadSettings() {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        const nameParts = (profile.username || "").split(" ");
        setProfileForm({
          firstName: nameParts[0] || user?.user_metadata?.name?.split(" ")[0] || "",
          lastName: nameParts.slice(1).join(" ") || user?.user_metadata?.name?.split(" ").slice(1).join(" ") || "",
          bio: profile.bio || "",
          location: profile.location || "",
          website: profile.website || "",
        });
        if (profile.avatar_url) setAvatarUrl(profile.avatar_url);
      }

      const { data: settings } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (settings) {
        setNotifications({
          communityUpdates: settings.community_updates ?? true,
          learningReminders: settings.learning_reminders ?? true,
          actionAlerts: settings.action_alerts ?? true,
          climateDataAlerts: false,
          messages: settings.push_notifications ?? true,
        });
        setPrivacy({
          profileVisibility: settings.profile_visibility || "public",
          showActivityStatus: settings.show_activity_status ?? true,
          showEmail: settings.show_email ?? false,
          showLocation: settings.show_location ?? true,
        });
        setPreferences({
          temperatureUnit: settings.temperature_unit || "celsius",
          language: settings.language || "en",
          defaultRegion: settings.default_region || "global",
        });
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `avatars/${user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("post-images")
        .getPublicUrl(filePath);

      await supabase.from("profiles").upsert({
        id: user.id,
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      });

      setAvatarUrl(publicUrl);
      toast.success("Profile photo updated!");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload photo");
    } finally {
      setIsUploadingAvatar(false);
    }
  }

  async function handleSaveProfile() {
    if (!user?.id) return;
    setIsSavingProfile(true);
    try {
      const fullName = `${profileForm.firstName} ${profileForm.lastName}`.trim();
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        username: fullName,
        bio: profileForm.bio,
        location: profileForm.location,
        website: profileForm.website,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success("Profile saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save profile");
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handleSaveNotifications() {
    if (!user?.id) return;
    setIsSavingSettings(true);
    try {
      const { error } = await supabase.from("user_settings").upsert({
        user_id: user.id,
        community_updates: notifications.communityUpdates,
        learning_reminders: notifications.learningReminders,
        action_alerts: notifications.actionAlerts,
        push_notifications: notifications.messages,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success("Notification settings saved!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save settings");
    } finally {
      setIsSavingSettings(false);
    }
  }

  async function handleSavePrivacy() {
    if (!user?.id) return;
    setIsSavingSettings(true);
    try {
      const { error } = await supabase.from("user_settings").upsert({
        user_id: user.id,
        profile_visibility: privacy.profileVisibility,
        show_activity_status: privacy.showActivityStatus,
        show_email: privacy.showEmail,
        show_location: privacy.showLocation,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success("Privacy settings saved!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save settings");
    } finally {
      setIsSavingSettings(false);
    }
  }

  async function handleSavePreferences() {
    if (!user?.id) return;
    setIsSavingSettings(true);
    try {
      const { error } = await supabase.from("user_settings").upsert({
        user_id: user.id,
        temperature_unit: preferences.temperatureUnit,
        language: preferences.language,
        default_region: preferences.defaultRegion,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success("Preferences saved!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save preferences");
    } finally {
      setIsSavingSettings(false);
    }
  }

  async function handleChangePassword() {
    if (!user?.email) return;
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email);
      if (error) throw error;
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    }
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Are you absolutely sure? This will permanently delete your account. This cannot be undone."
    );
    if (!confirmed) return;
    toast.error("Account deletion requires contacting support at support@yourearth.com");
  }

  const initials =
    `${profileForm.firstName?.[0] || ""}${profileForm.lastName?.[0] || ""}` ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  return (
    <GradientBackground>
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
            <p className="text-slate-300">Manage your account settings and preferences</p>
          </motion.div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white/5 border border-white/10">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            {/* ── Profile ── */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription className="text-slate-400">
                    Update your personal information and profile photo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar upload */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xl font-bold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      {isUploadingAvatar && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                          <Loader2 className="h-5 w-5 animate-spin text-white" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingAvatar}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-xs text-slate-400">JPG, PNG or GIF. Max size 2MB.</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">First Name</Label>
                      <Input
                        placeholder="John"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm((p) => ({ ...p, firstName: e.target.value }))}
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Last Name</Label>
                      <Input
                        placeholder="Doe"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm((p) => ({ ...p, lastName: e.target.value }))}
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Email</Label>
                    <Input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="bg-white/5 border-white/10 text-slate-400"
                    />
                    <p className="text-xs text-slate-500">Email cannot be changed here.</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Bio</Label>
                    <Input
                      placeholder="Climate activist and renewable energy advocate..."
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm((p) => ({ ...p, bio: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Location</Label>
                    <Input
                      placeholder="San Francisco, CA"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm((p) => ({ ...p, location: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Website</Label>
                    <Input
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm((p) => ({ ...p, website: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSavingProfile}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    {isSavingProfile
                      ? <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      : <Save className="h-4 w-4 mr-2" />
                    }
                    Save Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── Notifications ── */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription className="text-slate-400">
                    Choose what updates you receive via email
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: "communityUpdates", label: "Community Updates", desc: "New posts in your communities" },
                    { key: "learningReminders", label: "Learning Progress", desc: "Course and learning milestones" },
                    { key: "actionAlerts", label: "Action Campaigns", desc: "New climate action opportunities" },
                    { key: "climateDataAlerts", label: "Climate Data Alerts", desc: "Important climate data and news" },
                    { key: "messages", label: "Messages", desc: "Direct messages from other members" },
                  ].map((item, i, arr) => (
                    <div key={item.key}>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-white">{item.label}</Label>
                          <p className="text-sm text-slate-400">{item.desc}</p>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof NotificationSettings]}
                          onCheckedChange={(val) =>
                            setNotifications((n) => ({ ...n, [item.key]: val }))
                          }
                        />
                      </div>
                      {i < arr.length - 1 && <Separator className="mt-4 bg-white/10" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Button
                onClick={handleSaveNotifications}
                disabled={isSavingSettings}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              >
                {isSavingSettings
                  ? <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  : <Save className="h-4 w-4 mr-2" />
                }
                Save Notification Settings
              </Button>
            </TabsContent>

            {/* ── Privacy ── */}
            <TabsContent value="privacy" className="space-y-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Profile Visibility</CardTitle>
                  <CardDescription className="text-slate-400">
                    Control who can see your profile and activity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Profile Visibility</Label>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(val) => setPrivacy((p) => ({ ...p, profileVisibility: val }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public — Anyone can see</SelectItem>
                        <SelectItem value="members">Members Only</SelectItem>
                        <SelectItem value="private">Private — Only you</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="bg-white/10" />

                  {[
                    { key: "showActivityStatus", label: "Show Activity Status", desc: "Let others see when you're online" },
                    { key: "showEmail", label: "Show Email", desc: "Display your email on your profile" },
                    { key: "showLocation", label: "Show Location", desc: "Display your location on your profile" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white">{item.label}</Label>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                      <Switch
                        checked={privacy[item.key as keyof PrivacySettings] as boolean}
                        onCheckedChange={(val) => setPrivacy((p) => ({ ...p, [item.key]: val }))}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Button
                onClick={handleSavePrivacy}
                disabled={isSavingSettings}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              >
                {isSavingSettings
                  ? <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  : <Save className="h-4 w-4 mr-2" />
                }
                Save Privacy Settings
              </Button>
            </TabsContent>

            {/* ── Preferences ── */}
            <TabsContent value="preferences" className="space-y-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription className="text-slate-400">Customize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Temperature Units</Label>
                    <Select
                      value={preferences.temperatureUnit}
                      onValueChange={(val) => setPreferences((p) => ({ ...p, temperatureUnit: val }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="celsius">Celsius (°C)</SelectItem>
                        <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Language</Label>
                    <Select
                      value={preferences.language}
                      onValueChange={(val) => setPreferences((p) => ({ ...p, language: val }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Default Region</Label>
                    <Select
                      value={preferences.defaultRegion}
                      onValueChange={(val) => setPreferences((p) => ({ ...p, defaultRegion: val }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="global">Global</SelectItem>
                        <SelectItem value="north-america">North America</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="asia">Asia</SelectItem>
                        <SelectItem value="africa">Africa</SelectItem>
                        <SelectItem value="oceania">Oceania</SelectItem>
                        <SelectItem value="south-america">South America</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              <Button
                onClick={handleSavePreferences}
                disabled={isSavingSettings}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              >
                {isSavingSettings
                  ? <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  : <Save className="h-4 w-4 mr-2" />
                }
                Save Preferences
              </Button>
            </TabsContent>

            {/* ── Account ── */}
            <TabsContent value="account" className="space-y-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription className="text-slate-400">
                    Manage your password and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/5 border-white/10 text-white hover:bg-white/10"
                    onClick={handleChangePassword}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Send Password Reset Email
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/5 border-white/10 text-white hover:bg-white/10"
                    onClick={() => onNavigate?.("profile")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Public Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-red-500/10 border-red-500/30 text-white">
                <CardHeader>
                  <CardTitle className="text-red-400">Danger Zone</CardTitle>
                  <CardDescription className="text-slate-400">
                    Irreversible actions for your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-400 border-red-500/30 hover:bg-red-500/10 bg-transparent"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                  <p className="text-xs text-slate-500 mt-2">
                    Once you delete your account, all your data will be permanently removed.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <ComprehensiveFooter onNavigate={onNavigate} />
    </GradientBackground>
  );
}