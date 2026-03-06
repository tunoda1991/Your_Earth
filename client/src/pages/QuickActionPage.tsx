import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { GlassCard } from "@/components/glass/GlassCard";
import { 
  ArrowLeft, CheckCircle, Clock, Target, TrendingUp, 
  Lightbulb, ExternalLink, Share2, Award
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface QuickActionPageProps {
  actionId?: string;
  onNavigate: (page: string) => void;
  user?: any;
}

export function QuickActionPage({ actionId = "renewable-energy", onNavigate, user }: QuickActionPageProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock action data - in real app this would be fetched based on actionId
  const actions: Record<string, any> = {
    "renewable-energy": {
      title: "Switch to Renewable Energy",
      description: "Find and switch to clean energy providers in your area",
      icon: "⚡",
      time: "15 min",
      impact: "High",
      difficulty: "Easy",
      category: "Energy",
      points: 50,
      estimatedImpact: "500 kg CO₂/year saved",
      longDescription: "Switching to renewable energy is one of the most impactful actions you can take for climate. By choosing a clean energy provider, you directly reduce carbon emissions from your electricity consumption and support the growth of renewable energy infrastructure.",
      steps: [
        {
          id: 1,
          title: "Research renewable energy providers in your area",
          description: "Use our tool or search online for providers offering 100% renewable energy plans.",
          resources: [
            { name: "Green Energy Provider Directory", url: "#" },
            { name: "How to Choose a Provider Guide", url: "#" }
          ]
        },
        {
          id: 2,
          title: "Compare pricing and contract terms",
          description: "Look at monthly costs, contract length, and any sign-up bonuses or incentives.",
          resources: [
            { name: "Price Comparison Calculator", url: "#" }
          ]
        },
        {
          id: 3,
          title: "Check reviews and certifications",
          description: "Verify the provider's renewable energy certificates and read customer reviews.",
          resources: [
            { name: "Certification Verification Tool", url: "#" }
          ]
        },
        {
          id: 4,
          title: "Sign up with your chosen provider",
          description: "Complete the enrollment process online or by phone. Most switches take 1-2 billing cycles.",
          resources: []
        },
        {
          id: 5,
          title: "Track your impact",
          description: "Monitor your energy usage and carbon savings through your provider's portal.",
          resources: []
        }
      ],
      benefits: [
        "Reduce your carbon footprint by up to 50%",
        "Support renewable energy infrastructure",
        "Often comparable or cheaper than fossil fuel energy",
        "No change to your electricity service or reliability"
      ],
      tips: [
        "Check if your current provider offers a green energy option first",
        "Look for providers that source from local renewable projects",
        "Consider time-of-use plans to maximize clean energy usage",
        "Share your switch with friends and family to multiply impact"
      ]
    },
    "composting": {
      title: "Start Composting",
      description: "Reduce food waste with home composting",
      icon: "🌱",
      time: "30 min setup",
      impact: "Medium",
      difficulty: "Easy",
      category: "Waste",
      points: 40,
      estimatedImpact: "200 kg waste diverted/year",
      longDescription: "Composting turns your food scraps and yard waste into nutrient-rich soil while keeping organic matter out of landfills where it would produce methane, a potent greenhouse gas. Home composting is easy, saves money on fertilizer, and reduces your waste footprint significantly.",
      steps: [
        {
          id: 1,
          title: "Choose your composting method",
          description: "Select between outdoor bins, tumblers, or indoor vermicomposting based on your space.",
          resources: [
            { name: "Composting Methods Comparison", url: "#" }
          ]
        },
        {
          id: 2,
          title: "Get or build your compost bin",
          description: "Purchase a compost bin or build one using pallets or wire mesh.",
          resources: [
            { name: "DIY Compost Bin Tutorial", url: "#" }
          ]
        },
        {
          id: 3,
          title: "Learn what can be composted",
          description: "Understand the difference between green (nitrogen) and brown (carbon) materials.",
          resources: [
            { name: "Composting Guide", url: "#" }
          ]
        },
        {
          id: 4,
          title: "Start collecting scraps",
          description: "Set up a kitchen container for collecting food scraps throughout the day.",
          resources: []
        },
        {
          id: 5,
          title: "Maintain your compost",
          description: "Turn regularly, maintain moisture, and add materials in the right balance.",
          resources: [
            { name: "Composting Troubleshooting", url: "#" }
          ]
        }
      ],
      benefits: [
        "Divert 30% of household waste from landfills",
        "Create free, nutrient-rich soil for gardens",
        "Reduce methane emissions from landfills",
        "Save money on fertilizer and waste disposal"
      ],
      tips: [
        "Keep a balance of 3 parts brown to 1 part green material",
        "Chop large materials into smaller pieces for faster decomposition",
        "Keep your compost moist but not waterlogged",
        "Turn your compost weekly to speed up the process"
      ]
    }
  };

  const action = actions[actionId] || actions["renewable-energy"];

  const toggleStep = (stepId: number) => {
    if (!user) {
      onNavigate('login');
      return;
    }

    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
      
      // Check if all steps are completed
      if (completedSteps.length + 1 === action.steps.length) {
        setIsCompleted(true);
        toast.success(`Action completed! You earned ${action.points} XP`);
      }
    }
  };

  const handleShare = () => {
    toast.success("Action link copied to clipboard!");
  };

  const progress = (completedSteps.length / action.steps.length) * 100;

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Action Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{action.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{action.category}</Badge>
                      <Badge variant="outline">{action.difficulty}</Badge>
                      {isCompleted && <Badge className="bg-green-500">Completed</Badge>}
                    </div>
                    <h1 className="text-3xl">{action.title}</h1>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {action.longDescription}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{action.time}</div>
                    <div className="text-xs text-muted-foreground">Time needed</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Target className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{action.impact}</div>
                    <div className="text-xs text-muted-foreground">Impact level</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Award className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">+{action.points} XP</div>
                    <div className="text-xs text-muted-foreground">Reward points</div>
                  </div>
                </div>

                {/* Progress */}
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Your Progress</span>
                        <span className="text-sm text-muted-foreground">
                          {completedSteps.length} / {action.steps.length} steps
                        </span>
                      </div>
                      <Progress value={progress} className="h-3" />
                    </div>
                    {!user && (
                      <div className="text-sm text-muted-foreground text-center">
                        <Button size="sm" onClick={() => onNavigate('login')}>
                          Sign in to track your progress
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Step-by-Step Guide</CardTitle>
                  <CardDescription>Follow these steps to complete this action</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {action.steps.map((step: any) => {
                    const isStepCompleted = completedSteps.includes(step.id);
                    return (
                      <div 
                        key={step.id} 
                        className={`p-4 border rounded-lg transition-all ${
                          isStepCompleted ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' : 'bg-background'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex items-center justify-center mt-1">
                            {user && (
                              <Checkbox
                                checked={isStepCompleted}
                                onCheckedChange={() => toggleStep(step.id)}
                                className="h-5 w-5"
                              />
                            )}
                            {!user && (
                              <div className="w-5 h-5 rounded border-2 border-muted" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className={`font-semibold ${isStepCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                Step {step.id}: {step.title}
                              </h4>
                              {isStepCompleted && (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {step.description}
                            </p>
                            {step.resources.length > 0 && (
                              <div className="space-y-2">
                                <div className="text-xs font-medium text-muted-foreground">Resources:</div>
                                {step.resources.map((resource: any, index: number) => (
                                  <Button 
                                    key={index}
                                    variant="link" 
                                    size="sm" 
                                    className="h-auto p-0 text-xs"
                                  >
                                    {resource.name}
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5" />
                    <span>Pro Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {action.tips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Impact Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Expected Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {action.estimatedImpact}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      Annual impact
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    By completing this action, you'll make a measurable difference in your carbon footprint.
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {action.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Share This Action</CardTitle>
                  <CardDescription>Inspire others to take climate action</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share on Social Media
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleShare}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </CardContent>
              </Card>

              {/* Related Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Related Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto py-3"
                    onClick={() => onNavigate('action')}
                  >
                    <div className="text-left">
                      <div className="font-medium text-sm">Install Smart Thermostat</div>
                      <div className="text-xs text-muted-foreground">Save even more energy</div>
                    </div>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto py-3"
                    onClick={() => onNavigate('action')}
                  >
                    <div className="text-left">
                      <div className="font-medium text-sm">Switch to LED Bulbs</div>
                      <div className="text-xs text-muted-foreground">Reduce electricity use</div>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}