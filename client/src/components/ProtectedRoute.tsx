import { useEffect } from "react";
import { toast } from "sonner";
import type { AppUser } from "@/types/app";

interface ProtectedRouteProps {
  user: AppUser | null;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
}

export function ProtectedRoute({ user, onNavigate, children }: ProtectedRouteProps) {
  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access this page");
      onNavigate("login");
    }
  }, [user, onNavigate]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
