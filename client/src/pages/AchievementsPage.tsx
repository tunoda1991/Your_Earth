import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/glass/GlassCard";
import { 
  Award, Trophy, Star, Target, TrendingUp, Lock, CheckCircle,
  Zap, TreePine, Users, Heart, Globe, Flame, Crown, Shield,
  ArrowLeft, Share2
} from "lucide-react";

interface AchievementsPageProps {
  onNavigate: (page: string) => void;
  user?: any;
}

export function AchievementsPage({ onNavigate, user }: AchievementsPageProps) {
  const achievements = {
    unlocked: [
      {
        id: 1,
        name: "Climate Champion",
        description: "Active for 30+ consecutive days",
        icon: Trophy,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50 dark:bg-yellow-950",
        rarity: "Epic",
        unlockedDate: "May 15, 2024",
        points: 100,
        progress: 100
      },
      {
        id: 2,
        name: "Tree Planter",
        description: "Plant 50 trees",
        icon: TreePine,
        color: "text-green-600",
        bgColor: "bg-green-50 dark:bg-green-950",
        rarity: "Rare",
        unlockedDate: "Apr 28, 2024",
        points: 75,
        progress: 100
      },
      {
        id: 3,
        name: "Knowledge Seeker",
        description: "Complete 5 climate courses",
        icon: Star,
        color: "text-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-950",
        rarity: "Rare",
        unlockedDate: "Apr 10, 2024",
        points: 75,
        progress: 100
      },
      {
        id: 4,
        name: "Community Builder",
        description: "Help 50+ community members",
        icon: Users,
        color: "text-purple-600",
        bgColor: "bg-purple-50 dark:bg-purple-950",
        rarity: "Rare",
        unlockedDate: "Mar 22, 2024",
        points: 75,
        progress: 100
      },
      {
        id: 5,
        name: "Action Taker",
        description: "Complete 10 climate actions",
        icon: Target,
        color: "text-orange-600",
        bgColor: "bg-orange-50 dark:bg-orange-950",
        rarity: "Common",
        unlockedDate: "Mar 5, 2024",
        points: 50,
        progress: 100
      },
      {
        id: 6,
        name: "First Steps",
        description: "Join your first campaign",
        icon: CheckCircle,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50 dark:bg-emerald-950",
        rarity: "Common",
        unlockedDate: "Feb 12, 2024",
        points: 25,
        progress: 100
      }
    ],
    inProgress: [
      {
        id: 7,
        name: "Energy Champion",
        description: "Save 1000 kWh of energy",
        icon: Zap,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50 dark:bg-yellow-950",
        rarity: "Epic",
        points: 100,
        progress: 89,
        current: 890,
        goal: 1000
      },
      {
        id: 8,
        name: "Global Connector",
        description: "Connect with 100+ members",
        icon: Globe,
        color: "text-cyan-600",
        bgColor: "bg-cyan-50 dark:bg-cyan-950",
        rarity: "Rare",
        points: 75,
        progress: 75,
        current: 75,
        goal: 100
      },
      {
        id: 9,
        name: "Consistent Contributor",
        description: "Make 50 contributions",
        icon: Heart,
        color: "text-red-600",
        bgColor: "bg-red-50 dark:bg-red-950",
        rarity: "Rare",
        points: 75,
        progress: 46,
        current: 23,
        goal: 50
      }
    ],
    locked: [
      {
        id: 10,
        name: "Climate Hero",
        description: "Active for 365 consecutive days",
        icon: Crown,
        color: "text-purple-600",
        bgColor: "bg-purple-50 dark:bg-purple-950",
        rarity: "Legendary",
        points: 250,
        requirement: "Active for 365 days"
      },
      {
        id: 11,
        name: "Forest Guardian",
        description: "Plant 500 trees",
        icon: Shield,
        color: "text-green-600",
        bgColor: "bg-green-50 dark:bg-green-950",
        rarity: "Epic",
        points: 150,
        requirement: "Plant 500 trees"
      },
      {
        id: 12,
        name: "On Fire",
        description: "Complete 10 actions in a single day",
        icon: Flame,
        color: "text-orange-600",
        bgColor: "bg-orange-50 dark:bg-orange-950",
        rarity: "Rare",
        points: 100,
        requirement: "10 actions in one day"
      }
    ]
  };

  const stats = {
    totalPoints: achievements.unlocked.reduce((sum, a) => sum + a.points, 0),
    totalUnlocked: achievements.unlocked.length,
    totalAchievements: achievements.unlocked.length + achievements.inProgress.length + achievements.locked.length,
    rank: "Climate Advocate",
    nextRank: "Climate Leader",
    rankProgress: 68
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "text-purple-600 bg-purple-100 dark:bg-purple-950";
      case "Epic": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-950";
      case "Rare": return "text-blue-600 bg-blue-100 dark:bg-blue-950";
      case "Common": return "text-gray-600 bg-gray-100 dark:bg-gray-950";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-950";
    }
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
              <h1 className="text-3xl lg:text-4xl mb-2">Your Achievements</h1>
              <p className="text-lg text-muted-foreground">
                Celebrate your climate action milestones and progress
              </p>
            </div>
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
              <Share2 className="h-4 w-4 mr-2" />
              Share Achievements
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold">{stats.totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-3 text-green-600" />
                <div className="text-2xl font-bold">{stats.totalUnlocked}</div>
                <div className="text-sm text-muted-foreground">Unlocked</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <div className="text-2xl font-bold">{achievements.inProgress.length}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-3 text-yellow-600" />
                <div className="text-2xl font-bold">
                  {Math.round((stats.totalUnlocked / stats.totalAchievements) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Rank Progress */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold">Current Rank: {stats.rank}</div>
                    <div className="text-sm text-muted-foreground">
                      Next: {stats.nextRank}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{stats.totalPoints} / 500 XP</div>
                  <div className="text-sm text-muted-foreground">{stats.rankProgress}% to next rank</div>
                </div>
              </div>
              <Progress value={stats.rankProgress} className="h-3" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Achievements List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="unlocked" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="unlocked">
                Unlocked ({achievements.unlocked.length})
              </TabsTrigger>
              <TabsTrigger value="in-progress">
                In Progress ({achievements.inProgress.length})
              </TabsTrigger>
              <TabsTrigger value="locked">
                Locked ({achievements.locked.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="unlocked" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.unlocked.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <Card key={achievement.id} className="relative overflow-hidden">
                      <div className="absolute top-0 right-0">
                        <CheckCircle className="h-8 w-8 text-green-600 m-4" />
                      </div>
                      <CardHeader>
                        <div className={`w-16 h-16 rounded-full ${achievement.bgColor} flex items-center justify-center mb-4`}>
                          <IconComponent className={`h-8 w-8 ${achievement.color}`} />
                        </div>
                        <CardTitle>{achievement.name}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className={getRarityColor(achievement.rarity)}>
                            {achievement.rarity}
                          </Badge>
                          <Badge variant="outline">+{achievement.points} XP</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Unlocked: {achievement.unlockedDate}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="in-progress" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.inProgress.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <Card key={achievement.id} className="relative overflow-hidden">
                      <CardHeader>
                        <div className={`w-16 h-16 rounded-full ${achievement.bgColor} flex items-center justify-center mb-4`}>
                          <IconComponent className={`h-8 w-8 ${achievement.color}`} />
                        </div>
                        <CardTitle>{achievement.name}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold">
                              {achievement.current} / {achievement.goal}
                            </span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {achievement.progress}% complete
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={getRarityColor(achievement.rarity)}>
                            {achievement.rarity}
                          </Badge>
                          <Badge variant="outline">+{achievement.points} XP</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="locked" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.locked.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <Card key={achievement.id} className="relative overflow-hidden opacity-60">
                      <div className="absolute top-0 right-0">
                        <Lock className="h-6 w-6 text-muted-foreground m-4" />
                      </div>
                      <CardHeader>
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                          <IconComponent className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <CardTitle>{achievement.name}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="p-3 bg-muted rounded-lg text-sm">
                          <div className="font-medium mb-1">Requirement:</div>
                          <div className="text-muted-foreground">{achievement.requirement}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={getRarityColor(achievement.rarity)}>
                            {achievement.rarity}
                          </Badge>
                          <Badge variant="outline">+{achievement.points} XP</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Achievement Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Tips for Earning More Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Stay Consistent</h4>
                  <p className="text-sm text-muted-foreground">
                    Log in daily and complete at least one action to build streaks and unlock consistency achievements.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Join Campaigns</h4>
                  <p className="text-sm text-muted-foreground">
                    Participate in multiple campaigns to unlock community and impact-based achievements.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Complete Courses</h4>
                  <p className="text-sm text-muted-foreground">
                    Take advantage of our learning modules to earn knowledge-based achievements.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Engage with Community</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect with other members, share content, and help others to unlock social achievements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}