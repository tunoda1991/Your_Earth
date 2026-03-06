import { Progress } from "@/components/ui/progress";

interface DecisionLineTrackerProps {
  goal: number;
  current: number;
  label: string;
  deadline: string;
  unit?: string;
}

export function DecisionLineTracker({ goal, current, label, deadline, unit = "comments" }: DecisionLineTrackerProps) {
  const percentage = Math.round((current / goal) * 100);
  
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">
          Goal {goal} {unit} by {deadline}
        </span>
        <span className="font-mono font-semibold text-primary">
          {current}/{goal} ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
