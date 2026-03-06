import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Users, MapPin, Zap, ArrowRight, Sparkles, Globe, Video, MapPinned, CheckCircle2, Loader2, Plus, Clock } from "lucide-react";
import { GradientBackground } from "@/components/glass/GradientBackground";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";

interface EventsPageProps {
  onNavigate?: (page: string) => void;
  user?: any;
}

const eventTypes = [
  { emoji: "🍻", title: "Happy Hours", description: "Casual networking over drinks" },
  { emoji: "🎓", title: "Workshops", description: "Learn new climate action skills" },
  { emoji: "📢", title: "Protest Marches", description: "Make your voice heard" },
  { emoji: "💼", title: "Symposiums", description: "Expert discussions and panels" },
  { emoji: "🌱", title: "Volunteer Days", description: "Hands-on environmental work" },
  { emoji: "💻", title: "Virtual Summits", description: "Connect globally from home" },
  { emoji: "🎪", title: "Festivals", description: "Celebrate climate solutions" },
  { emoji: "🔬", title: "Science Talks", description: "Latest climate research" },
];

export function EventsPage({ onNavigate, user }: EventsPageProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ upcoming: 0, participants: 0, cities: 0, thisMonth: 0 });

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (user?.id) loadRegisteredEvents();
  }, [user?.id]);

  async function loadEvents() {
    setIsLoading(true);
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("date", now)
        .order("date", { ascending: true });

      if (error) throw error;
      const eventsData = data || [];
      setEvents(eventsData);

      // Compute stats
      const monthStart = new Date();
      monthStart.setDate(1);
      const thisMonth = eventsData.filter((e: any) => new Date(e.date) >= monthStart).length;
      const totalParticipants = eventsData.reduce((sum: number, e: any) => sum + (e.attendee_count || 0), 0);
      const cities = new Set(eventsData.filter((e: any) => e.location).map((e: any) => e.location.split(",")[0])).size;

      setStats({
        upcoming: eventsData.length,
        participants: totalParticipants,
        cities,
        thisMonth,
      });
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadRegisteredEvents() {
    try {
      const { data } = await supabase
        .from("event_attendees")
        .select("event_id")
        .eq("user_id", user.id);
      setRegisteredIds(new Set(data?.map((d: any) => d.event_id) || []));
    } catch (error) {
      console.error("Failed to load registered events:", error);
    }
  }

  async function handleRegisterLeave(eventId: string, eventTitle: string) {
    if (!user?.id) {
      toast.error("Please log in to register for events");
      onNavigate?.("login");
      return;
    }

    setLoadingIds((prev) => new Set(prev).add(eventId));
    const isRegistered = registeredIds.has(eventId);

    try {
      if (isRegistered) {
        await supabase.from("event_attendees")
          .delete()
          .eq("event_id", eventId)
          .eq("user_id", user.id);
        setRegisteredIds((prev) => { const n = new Set(prev); n.delete(eventId); return n; });
        setEvents((prev) => prev.map((e) => e.id === eventId ? { ...e, attendee_count: Math.max(0, e.attendee_count - 1) } : e));
        toast.success(`Unregistered from ${eventTitle}`);
      } else {
        await supabase.from("event_attendees")
          .insert({ event_id: eventId, user_id: user.id });
        setRegisteredIds((prev) => new Set(prev).add(eventId));
        setEvents((prev) => prev.map((e) => e.id === eventId ? { ...e, attendee_count: (e.attendee_count || 0) + 1 } : e));
        // Log activity
        await supabase.from("user_activity").insert({
          user_id: user.id,
          type: "join_event",
          description: `Registered for ${eventTitle}`,
          reference_id: eventId,
        });
        toast.success(`Registered for ${eventTitle}!`);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingIds((prev) => { const n = new Set(prev); n.delete(eventId); return n; });
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  const filtered = events.filter((e) =>
    e.title?.toLowerCase().includes(search.toLowerCase()) ||
    e.location?.toLowerCase().includes(search.toLowerCase()) ||
    e.type?.toLowerCase().includes(search.toLowerCase())
  );

  const heroStats = [
    { title: "Upcoming Events", value: isLoading ? "..." : stats.upcoming.toString(), change: "Total upcoming", icon: Calendar },
    { title: "Total Participants", value: isLoading ? "..." : stats.participants.toLocaleString(), change: "Across all events", icon: Users },
    { title: "Cities Hosting", value: isLoading ? "..." : stats.cities.toString(), change: "Active locations", icon: MapPin },
    { title: "Events This Month", value: isLoading ? "..." : stats.thisMonth.toString(), change: "This month", icon: Zap },
  ];

  return (
    <div className="pt-8">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-3xl p-12 shadow-2xl">
              <div className="text-center">
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2 mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  Community Events
                </Badge>

                <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
                  Connect Through{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Events
                  </span>
                </h1>

                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                  Join climate action events in your area. From happy hours to symposiums — find your community and take action together.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {heroStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                          <Icon className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-400 mb-1">{stat.title}</div>
                        <div className="text-xs text-slate-500">{stat.change}</div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 px-8 py-6 text-lg"
                    onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Browse Events
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="backdrop-blur-lg bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                    onClick={() => onNavigate?.("action-create")}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Event
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-md">
            <Input
              placeholder="Search events by title, location, or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold mb-2">No upcoming events</h3>
              <p className="text-muted-foreground mb-6">
                {search ? `No events found for "${search}"` : "Be the first to create a climate event!"}
              </p>
              <Button onClick={() => onNavigate?.("action-create")}>
                <Plus className="h-4 w-4 mr-2" />
                Create an Event
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event) => {
                const isRegistered = registeredIds.has(event.id);
                const isLoadingThis = loadingIds.has(event.id);

                return (
                  <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                        {isRegistered && (
                          <Badge className="text-xs bg-green-500/20 text-green-600 border-green-500/30 shrink-0">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Registered
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col pb-6 space-y-3">
                      {event.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                      )}

                      <div className="space-y-1.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                        {event.is_virtual && (
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 shrink-0" />
                            <span>Virtual Event</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 shrink-0" />
                          <span>{event.attendee_count || 0} registered{event.max_attendees ? ` / ${event.max_attendees} max` : ""}</span>
                        </div>
                      </div>

                      {event.type && (
                        <Badge variant="secondary" className="w-fit text-xs capitalize">
                          {event.type.replace("_", " ")}
                        </Badge>
                      )}

                      <div className="flex-1" />

                      <Button
                        className="w-full"
                        variant={isRegistered ? "outline" : "default"}
                        onClick={() => handleRegisterLeave(event.id, event.title)}
                        disabled={isLoadingThis || (event.max_attendees && event.attendee_count >= event.max_attendees && !isRegistered)}
                      >
                        {isLoadingThis ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : isRegistered ? (
                          "Cancel Registration"
                        ) : event.max_attendees && event.attendee_count >= event.max_attendees ? (
                          "Event Full"
                        ) : (
                          <>Register <ArrowRight className="h-4 w-4 ml-2" /></>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Zap className="h-4 w-4 mr-2" />
              8 Event Types
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Types of <span className="text-primary">Events</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {eventTypes.map((type, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">{type.emoji}</div>
                <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Globe, color: "blue", title: "Global & Local", desc: "Find events in your city or join virtual gatherings from anywhere in the world." },
                { icon: Users, color: "emerald", title: "Build Community", desc: "Connect with like-minded people and build lasting relationships." },
                { icon: Video, color: "purple", title: "Hybrid Options", desc: "Many events offer both in-person and virtual attendance options." },
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className={`w-16 h-16 bg-${f.color}-500/10 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-8 w-8 text-${f.color}-500`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-muted-foreground text-sm">{f.desc}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <ComprehensiveFooter onNavigate={onNavigate} />
    </div>
  );
}