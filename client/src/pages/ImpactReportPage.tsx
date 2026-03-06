import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { GlassCard } from "@/components/glass/GlassCard";
import { 
  TrendingUp, TrendingDown, Globe, Zap, Heart, Users, Target, 
  Calendar, Award, Download, Share2, Leaf, Droplets, TreePine, 
  ArrowLeft, BarChart3, MapPin
} from "lucide-react";

interface ImpactReportPageProps {
  onNavigate: (page: string) => void;
  user?: any;
}

export function ImpactReportPage({ onNavigate, user }: ImpactReportPageProps) {
  const impactData = {
    totalCarbonSaved: 2340,
    treesPlanted: 47,
    energySaved: 890,
    peopleReached: 234,
    actionsCompleted: 23,
    campaignsJoined: 8,
    hoursVolunteered: 56,
    donationsTotal: 1250,
  };

  const monthlyProgress = [
    { month: "Jan", carbon: 150, actions: 2 },
    { month: "Feb", carbon: 180, actions: 3 },
    { month: "Mar", carbon: 220, actions: 4 },
    { month: "Apr", carbon: 280, actions: 3 },
    { month: "May", carbon: 310, actions: 5 },
    { month: "Jun", carbon: 360, actions: 4 },
  ];

  const categoryImpact = [
    { category: "Energy", value: 35, color: "bg-yellow-500", icon: Zap },
    { category: "Nature", value: 28, color: "bg-green-500", icon: TreePine },
    { category: "Transportation", value: 20, color: "bg-blue-500", icon: Globe },
    { category: "Water", value: 12, color: "bg-cyan-500", icon: Droplets },
    { category: "Other", value: 5, color: "bg-gray-500", icon: Target },
  ];

  const topAchievements = [
    { name: "Climate Champion", description: "Active for 30+ days", icon: "🏆", date: "May 2024" },
    { name: "Tree Planter", description: "Planted 47 trees", icon: "🌳", date: "Apr 2024" },
    { name: "Energy Saver", description: "Saved 890 kWh", icon: "⚡", date: "Mar 2024" },
    { name: "Community Builder", description: "Mobilized 234 people", icon: "🤝", date: "Feb 2024" },
  ];

  const recentActions = [
    { 
      action: "Joined Solar Schools Campaign",
      impact: "Est. 150 kg CO₂ saved",
      date: "2 days ago",
      category: "Energy"
    },
    { 
      action: "Planted 5 trees in local park",
      impact: "12.5 kg CO₂/year offset",
      date: "5 days ago",
      category: "Nature"
    },
    { 
      action: "Switched to renewable energy provider",
      impact: "500 kg CO₂/year saved",
      date: "1 week ago",
      category: "Energy"
    },
    { 
      action: "Completed carbon footprint assessment",
      impact: "Baseline established",
      date: "2 weeks ago",
      category: "Assessment"
    },
  ];

  const handleDownloadReport = () => {
    toast.success("Your impact report is being prepared for download");
  };

  const handleShareReport = () => {
    toast.success("Your impact report has been shared!");
  };

  return (
    <div className="pt-8">
      {/* Header */}
      <section className="py-8 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => onNavigate('action')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Action Hub
          </Button>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl mb-2">Your Climate Impact Report</h1>
              <p className="text-lg text-muted-foreground">
                Track your contribution to climate action and environmental sustainability
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline" onClick={handleShareReport}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbon Saved</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{impactData.totalCarbonSaved} kg</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  +23% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Trees Planted</CardTitle>
                <TreePine className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{impactData.treesPlanted}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  +5 this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energy Saved</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{impactData.energySaved} kWh</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  +18% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">People Reached</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{impactData.peopleReached}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  +45 this month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Reports */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Progress */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Monthly Progress</CardTitle>
                    <CardDescription>Your carbon savings over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyProgress.map((month, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{month.month}</span>
                            <div className="flex items-center space-x-4">
                              <span className="text-muted-foreground">{month.actions} actions</span>
                              <span className="font-semibold">{month.carbon} kg CO₂</span>
                            </div>
                          </div>
                          <Progress 
                            value={(month.carbon / 360) * 100} 
                            className="h-2" 
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Impact by Category */}
                <Card>
                  <CardHeader>
                    <CardTitle>Impact by Category</CardTitle>
                    <CardDescription>Distribution of your actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {categoryImpact.map((cat, index) => {
                      const IconComponent = cat.icon;
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <IconComponent className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{cat.category}</span>
                            </div>
                            <span className="text-sm font-semibold">{cat.value}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${cat.color}`}
                              style={{ width: `${cat.value}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Target className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <div className="text-2xl font-bold">{impactData.actionsCompleted}</div>
                    <div className="text-sm text-muted-foreground">Actions Completed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <div className="text-2xl font-bold">{impactData.campaignsJoined}</div>
                    <div className="text-sm text-muted-foreground">Campaigns Joined</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <div className="text-2xl font-bold">{impactData.hoursVolunteered}</div>
                    <div className="text-sm text-muted-foreground">Hours Volunteered</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Heart className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <div className="text-2xl font-bold">${impactData.donationsTotal}</div>
                    <div className="text-sm text-muted-foreground">Donations Total</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your latest climate actions and their impact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActions.map((activity, index) => (
                    <div 
                      key={index}
                      className="flex items-start justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{activity.action}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {activity.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.impact}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topAchievements.map((achievement, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {achievement.description}
                          </p>
                          <Badge variant="outline">{achievement.date}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compare Your Impact</CardTitle>
                  <CardDescription>See how your actions compare to the community average</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Carbon Saved</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-muted-foreground">Avg: 1,200 kg</span>
                          <span className="text-sm font-semibold">You: {impactData.totalCarbonSaved} kg</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Progress value={50} className="h-2" />
                        <Progress value={(impactData.totalCarbonSaved / 2400) * 100} className="h-2" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Actions Completed</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-muted-foreground">Avg: 15</span>
                          <span className="text-sm font-semibold">You: {impactData.actionsCompleted}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Progress value={50} className="h-2" />
                        <Progress value={(impactData.actionsCompleted / 30) * 100} className="h-2" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Campaigns Joined</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-muted-foreground">Avg: 5</span>
                          <span className="text-sm font-semibold">You: {impactData.campaignsJoined}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Progress value={50} className="h-2" />
                        <Progress value={(impactData.campaignsJoined / 16) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                      <TrendingUp className="h-5 w-5" />
                      <span className="font-semibold">Above Average!</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      You're making a bigger impact than most users in the community. Keep up the great work!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}