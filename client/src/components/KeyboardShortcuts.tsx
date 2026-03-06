import { useEffect } from 'react';
import { toast } from 'sonner';

interface KeyboardShortcutsProps {
  onNavigate: (page: string) => void;
  user?: any;
}

export function KeyboardShortcuts({ onNavigate, user }: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Cmd/Ctrl + K for quick navigation
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toast.info('Quick Navigation', {
          description: 'Use header menu to navigate',
        });
        return;
      }

      // Navigation shortcuts (only with Alt key to avoid conflicts)
      if (e.altKey) {
        switch (e.key) {
          case 'h':
            e.preventDefault();
            onNavigate('home');
            toast.success('Navigated to Home');
            break;
          case 'l':
            e.preventDefault();
            onNavigate('learn');
            toast.success('Navigated to Learn');
            break;
          case 'c':
            e.preventDefault();
            onNavigate('community');
            toast.success('Navigated to Community');
            break;
          case 'a':
            e.preventDefault();
            onNavigate('action');
            toast.success('Navigated to Action Hub');
            break;
          case 'd':
            e.preventDefault();
            if (user) {
              onNavigate('dashboard');
              toast.success('Navigated to Dashboard');
            } else {
              toast.error('Please sign in to view dashboard');
            }
            break;
          case 'p':
            e.preventDefault();
            if (user) {
              onNavigate('profile');
              toast.success('Navigated to Profile');
            } else {
              toast.error('Please sign in to view profile');
            }
            break;
        }
      }

      // Show shortcuts help with ?
      if (e.shiftKey && e.key === '?') {
        e.preventDefault();
        toast.info('Keyboard Shortcuts', {
          description: 'Alt+H: Home • Alt+L: Learn • Alt+C: Community • Alt+A: Action • Alt+D: Dashboard • Alt+P: Profile',
          duration: 5000,
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onNavigate, user]);

  return null;
}
