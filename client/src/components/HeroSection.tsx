import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/glass/GlassCard";

interface HeroSectionProps {
  onNavigate?: (page: string) => void;
  user?: any;
}

export function HeroSection({ onNavigate, user }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                Join 50,000+ Climate Champions
              </Badge>
              <h1 className="text-4xl lg:text-6xl tracking-tight">
                Connect. <span className="text-primary">Learn.</span> Act.
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                The world's leading platform for climate action. Connect with like-minded individuals, 
                access cutting-edge climate data, and turn knowledge into meaningful action.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <>
                  <Button size="lg" className="text-lg px-8" onClick={() => onNavigate && onNavigate('dashboard')}>
                    Go to Dashboard
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8" onClick={() => onNavigate && onNavigate('action')}>
                    Take Action
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" className="text-lg px-8" onClick={() => onNavigate && onNavigate('signup')}>
                    Join the Movement
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8" onClick={() => onNavigate && onNavigate('learn')}>
                    Explore Platform
                  </Button>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              <Card className="p-4">
                <CardContent className="p-0 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">50K+</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">200+</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">1000+</div>
                  <div className="text-sm text-muted-foreground">Actions</div>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">95%</div>
                  <div className="text-sm text-muted-foreground">Impact</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwZWFydGglMjBlbnZpcm9ubWVudHxlbnwxfHx8fDE3NTg2MjA2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Earth from space showing climate systems"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-background border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Climate Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}