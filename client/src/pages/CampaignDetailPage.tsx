import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { GlassCard } from "@/components/glass/GlassCard";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { 
  MapPin, Calendar, Users, Target, Clock, ArrowLeft, Share2, 
  CheckCircle, TrendingUp, MessageCircle, Heart, Globe, Award 
} from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { toast } from "sonner";
import { useState } from "react";

interface CampaignDetailPageProps {
  campaignId?: number;
  onNavigate: (page: string) => void;
  user?: any;
}

export function CampaignDetailPage({ campaignId = 1, onNavigate, user }: CampaignDetailPageProps) {
  const [isJoined, setIsJoined] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock campaign data - in real app this would be fetched based on campaignId
  const campaign = {
    id: campaignId,
    title: "Solar Schools Initiative",
    description: "Help install solar panels in 100 schools across underserved communities",
    longDescription: "The Solar Schools Initiative is a comprehensive program aimed at bringing clean, renewable energy to educational institutions in underserved communities. By installing solar panels on school rooftops, we not only reduce carbon emissions but also provide these schools with significant savings on their energy bills, which can then be reinvested in educational programs. Additionally, these installations serve as living laboratories where students can learn about renewable energy, sustainability, and climate action firsthand.",
    image: "https://images.unsplash.com/photo-1638068110878-c412de93e0a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzb2xhciUyMHdpbmR8ZW58MXx8fHwxNzU4NjIwNjY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    goal: 100,
    current: 67,
    deadline: "Dec 2024",
    participants: 2340,
    category: "Education",
    impact: "500,000 students impacted",
    difficulty: "Medium",
    timeCommitment: "2-4 hours/week",
    location: "Nationwide, USA",
    organizer: {
      name: "Clean Energy Coalition",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=CEC",
      verified: true,
      members: 12400
    },
    milestones: [
      { name: "Research Phase", completed: true, date: "Jan 2024" },
      { name: "Pilot Program (10 schools)", completed: true, date: "Mar 2024" },
      { name: "Expansion (50 schools)", completed: true, date: "Jun 2024" },
      { name: "Full Rollout (100 schools)", completed: false, date: "Dec 2024" }
    ],
    activities: [
      {
        user: "Sarah Johnson",
        action: "donated $500",
        time: "2 hours ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
      },
      {
        user: "Michael Chen",
        action: "joined the campaign",
        time: "5 hours ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
      },
      {
        user: "Emma Rodriguez",
        action: "shared the campaign",
        time: "1 day ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
      }
    ],
    updates: [
      {
        title: "Milestone Reached: 67 Schools Completed!",
        content: "We're thrilled to announce that we've successfully installed solar panels in 67 schools, surpassing our initial projections. The response from students and faculty has been overwhelmingly positive.",
        date: "3 days ago",
        likes: 234
      },
      {
        title: "New Partnership Announcement",
        content: "We're excited to partner with SolarTech Inc. to provide advanced monitoring systems for all participating schools.",
        date: "1 week ago",
        likes: 156
      }
    ]
  };

  const handleJoinCampaign = () => {
    if (!user) {
      onNavigate('login');
      return;
    }
    setIsJoined(true);
    toast.success("Successfully joined campaign!");
  };

  const handleShare = () => {
    toast.success("Campaign link copied to clipboard!");
  };

  const handleFollow = () => {
    if (!user) {
      onNavigate('login');
      return;
    }
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? "Unfollowed campaign" : "Following campaign");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12">
        {/* Header */}
        <section className="py-4">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              className="mb-4 text-white hover:bg-white/10" 
              onClick={() => onNavigate('action')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Action Hub
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Hero Image */}
                <div className="aspect-video rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Campaign Header */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{campaign.category}</Badge>
                    <Badge variant="outline">{campaign.difficulty}</Badge>
                    {isJoined && <Badge className="bg-green-500">Joined</Badge>}
                  </div>
                  <h1 className="text-3xl lg:text-4xl mb-4 text-white">{campaign.title}</h1>
                  <p className="text-lg text-slate-300 mb-6">
                    {campaign.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{campaign.current}</div>
                      <div className="text-sm text-slate-300">of {campaign.goal} schools</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{campaign.participants.toLocaleString()}</div>
                      <div className="text-sm text-slate-300">participants</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">67%</div>
                      <div className="text-sm text-slate-300">progress</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">Dec 2024</div>
                      <div className="text-sm text-slate-300">deadline</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      size="lg" 
                      onClick={handleJoinCampaign}
                      disabled={isJoined}
                    >
                      {isJoined ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Joined Campaign
                        </>
                      ) : (
                        <>Join Campaign</>
                      )}
                    </Button>
                    <Button size="lg" variant="outline" onClick={handleShare} className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700/50">
                      <Share2 className="h-5 w-5 mr-2" />
                      Share
                    </Button>
                    <Button size="lg" variant="outline" onClick={handleFollow} className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700/50">
                      <Heart className={`h-5 w-5 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Tabs */}
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                    <TabsTrigger value="updates">Updates</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="space-y-6 mt-6">
                    <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-white">About This Campaign</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-300 leading-relaxed">
                          {campaign.longDescription}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                          <div className="flex items-center space-x-3">
                            <MapPin className="h-5 w-5 text-green-400" />
                            <div>
                              <div className="font-medium text-white">Location</div>
                              <div className="text-sm text-slate-400">{campaign.location}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Clock className="h-5 w-5 text-green-400" />
                            <div>
                              <div className="font-medium text-white">Time Commitment</div>
                              <div className="text-sm text-slate-400">{campaign.timeCommitment}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Target className="h-5 w-5 text-green-400" />
                            <div>
                              <div className="font-medium text-white">Expected Impact</div>
                              <div className="text-sm text-slate-400">{campaign.impact}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-green-400" />
                            <div>
                              <div className="font-medium text-white">Deadline</div>
                              <div className="text-sm text-slate-400">{campaign.deadline}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="milestones" className="space-y-4 mt-6">
                    {campaign.milestones.map((milestone, index) => (
                      <Card key={index} className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              milestone.completed ? 'bg-green-500' : 'bg-muted'
                            }`}>
                              {milestone.completed ? (
                                <CheckCircle className="h-6 w-6 text-white" />
                              ) : (
                                <span className="text-lg font-bold text-muted-foreground">{index + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-white">{milestone.name}</h3>
                                <span className="text-sm text-slate-400">{milestone.date}</span>
                              </div>
                              <Badge variant={milestone.completed ? "secondary" : "outline"} className="mt-2">
                                {milestone.completed ? "Completed" : "In Progress"}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="updates" className="space-y-4 mt-6">
                    {campaign.updates.map((update, index) => (
                      <Card key={index} className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg text-white">{update.title}</CardTitle>
                            <span className="text-sm text-muted-foreground">{update.date}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{update.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <button className="flex items-center space-x-1 hover:text-primary">
                              <Heart className="h-4 w-4" />
                              <span>{update.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-primary">
                              <MessageCircle className="h-4 w-4" />
                              <span>Comment</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-primary">
                              <Share2 className="h-4 w-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-4 mt-6">
                    {campaign.activities.map((activity, index) => (
                      <Card key={index} className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={activity.avatar} />
                              <AvatarFallback>{activity.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm text-slate-300">
                                <span className="font-semibold text-white">{activity.user}</span>
                                {' '}{activity.action}
                              </p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Progress Card */}
                <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Campaign Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-slate-300">
                        <span>Schools Completed</span>
                        <span className="font-semibold text-white">{campaign.current}/{campaign.goal}</span>
                      </div>
                      <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-800/50">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500 rounded-full"
                          style={{ width: `${(campaign.current / campaign.goal) * 100}%` }}
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Participants</span>
                        <span className="font-semibold text-white">{campaign.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Days Remaining</span>
                        <span className="font-semibold text-white">45</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Completion Rate</span>
                        <span className="font-semibold text-green-400">67%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Organizer Card */}
                <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Organized By</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={campaign.organizer.avatar} />
                        <AvatarFallback>CEC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white">{campaign.organizer.name}</span>
                          {campaign.organizer.verified && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {campaign.organizer.members.toLocaleString()} members
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Visit Organization
                    </Button>
                  </CardContent>
                </Card>

                {/* Impact Stats */}
                <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      <span>Impact So Far</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Students Impacted</span>
                      <span className="font-semibold text-white">335,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">CO₂ Prevented</span>
                      <span className="font-semibold text-white">1,540 tons</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Money Saved</span>
                      <span className="font-semibold text-white">$281,400</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Share Card */}
                <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Spread the Word</CardTitle>
                    <CardDescription>Help us reach more people</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share on Social Media
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleShare}>
                      <Globe className="h-4 w-4 mr-2" />
                      Copy Campaign Link
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <ComprehensiveFooter />
      </div>
    </>
  );
}