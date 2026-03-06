/**
 * Updates the document title based on current page
 */
export function updatePageTitle(page: string): void {
  const titles: Record<string, string> = {
    'home': 'Your Earth - Climate Action Platform',
    'learn': 'Learn - Your Earth',
    'learn-education': 'Climate Education - Your Earth',
    'learn-corporate': 'Corporate Climate Impact - Your Earth',
    'learn-calculator': 'Carbon Calculator - Your Earth',
    'learn-databank': 'Organization Data Bank - Your Earth',
    'climate-data-dashboard': 'Climate Data Dashboard - Your Earth',
    'community': 'Community - Your Earth',
    'community-network': 'Community Network - Your Earth',
    'community-energy': 'Energy Community - Your Earth',
    'community-food': 'Food Community - Your Earth',
    'community-mobility': 'Mobility Community - Your Earth',
    'community-industry': 'Industry Community - Your Earth',
    'community-technology': 'Technology Community - Your Earth',
    'community-policy': 'Policy Community - Your Earth',
    'community-nature': 'Nature Community - Your Earth',
    'action': 'Action Hub - Your Earth',
    'campaigns-actions': 'Campaigns & Actions - Your Earth',
    'events': 'Events & Gatherings - Your Earth',
    'jobs': 'Climate Jobs - Your Earth',
    'marketplace': 'Green Marketplace - Your Earth',
    'all-campaigns': 'All Campaigns - Your Earth',
    'campaign-detail': 'Campaign Details - Your Earth',
    'impact-report': 'Impact Report - Your Earth',
    'achievements': 'Achievements - Your Earth',
    'quick-action': 'Quick Action - Your Earth',
    'profile': 'Profile - Your Earth',
    'dashboard': 'Dashboard - Your Earth',
    'settings': 'Settings - Your Earth',
    'login': 'Sign In - Your Earth',
    'signup': 'Sign Up - Your Earth',
  };

  document.title = titles[page] || 'Your Earth - Climate Action Platform';
}