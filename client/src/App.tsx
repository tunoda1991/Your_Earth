import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentSession, getProfile } from "./utils/api";
import { Navigation } from "./components/Navigation";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ScrollToTop } from "./components/ScrollToTop";
import { KeyboardShortcuts } from "./components/KeyboardShortcuts";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { ExitIntentModal } from "./components/ExitIntentModal";
import { HomePage } from "./pages/HomePage";
import { LearnPage } from "./pages/LearnPage";
import { CorporateClimateImpactPage } from "./pages/CorporateClimateImpactPage";
import { OrganizationDataBankPage } from "./pages/OrganizationDataBankPage";
import { ClimateEducationPage } from "./pages/ClimateEducationPage";
import { CarbonCalculatorPage } from "./pages/CarbonCalculatorPage";
import { ClimateTracePage } from "./pages/ClimateTracePage";
import { DashboardPage } from "./pages/DashboardPage";
import { SettingsPage } from "./pages/SettingsPage";
import { CommunityPage } from "./pages/CommunityPage";
import { CreateCommunityPage } from "./pages/CreateCommunityPage";
import { EnergyLandingPage } from "./pages/EnergyLandingPage";
import { FoodLandingPage } from "./pages/FoodLandingPage";
import { MobilityLandingPage } from "./pages/MobilityLandingPage";
import { IndustryLandingPage } from "./pages/IndustryLandingPage";
import { TechnologyLandingPage } from "./pages/TechnologyLandingPage";
import { PolicyLandingPage } from "./pages/PolicyLandingPage";
import { NatureLandingPage } from "./pages/NatureLandingPage";
import { ActionPage } from "./pages/ActionPage";
import { CampaignsActionsPage } from "./pages/CampaignsActionsPage";
import { CreateActionPage } from "./pages/CreateActionPage";
import { EventsPage } from "./pages/EventsPage";
import { CampaignDetailPage } from "./pages/CampaignDetailPage";
import { ImpactReportPage } from "./pages/ImpactReportPage";
import { AchievementsPage } from "./pages/AchievementsPage";
import { QuickActionPage } from "./pages/QuickActionPage";
import { JobsPage } from "./pages/JobsPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { HelpCenterPage } from "./pages/HelpCenterPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsOfServicePage } from "./pages/TermsOfServicePage";
import { ClimateDataDashboardPage } from './pages/ClimateDataDashboardPage';
import { TopicPage } from './pages/TopicPage';
import { InfraMapPage } from './pages/InfraMapPage';
import { DisasterMapPage } from './pages/DisasterMapPage';
import { CommunityFeedPage } from './pages/CommunityFeedPage';
import { ElectricityMapPage } from './pages/ElectricityMapPage';
import { EmissionsMapPage } from './pages/EmissionsMapPage';
import { UserNetworkPage } from './pages/UserNetworkPage';
import { ConnectPage } from './pages/ConnectPage';
import { ConnectSectorPage } from './pages/ConnectSectorPage';
import { ConnectArticlePage } from './pages/ConnectArticlePage';
import { ProtectedRoute } from './components/ProtectedRoute';
import type { AppUser, TopicData } from './types/app';

function getPageFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get('page');
  if (pageParam) return pageParam;
  return localStorage.getItem('lastPage') || 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromUrl);
  const [user, setUser] = useState<AppUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);
  const [selectedConnectSector, setSelectedConnectSector] = useState<string | null>(null);
  const [selectedConnectArticle, setSelectedConnectArticle] = useState<string | null>(null);

  const updatePageTitle = (page: string) => {
    const titles: Record<string, string> = {
      'home': 'Your Earth - Climate Action Platform',
      'learn': 'Learn - Your Earth',
      'community': 'Community - Your Earth',
      'action': 'Take Action - Your Earth',
      'login': 'Sign In - Your Earth',
      'signup': 'Sign Up - Your Earth',
      'profile': 'Profile - Your Earth',
      'dashboard': 'Dashboard - Your Earth',
      'settings': 'Settings - Your Earth',
      'learn-infra-map': 'Infrastructure Map - Your Earth',
      'learn-disaster-map': 'Disaster Map - Your Earth',
      'community-feed': 'Community Feed - Your Earth',
      'learn-electricity-map': 'Live Electricity Map - Your Earth',
      'learn-emissions-map': 'Emissions Map - Your Earth',
      'learn-user-network': 'User Network - Your Earth',
      'connect': 'Connect - Climate News - Your Earth',
      'connect-sector': 'Sector News - Your Earth',
      'connect-article': 'Article - Your Earth',
    };
    document.title = titles[page] || 'Your Earth';
  };

  // Sync URL with page (back/forward)
  useEffect(() => {
    const onPopState = () => setCurrentPage(getPageFromUrl());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    updatePageTitle(currentPage);
  }, [currentPage]);

  const checkAuthStatus = async () => {
    try {
      const session = await getCurrentSession();
      
      if (session) {
        const { profile } = await getProfile();
        
        const userData = {
          id: session.user.id,
          email: session.user.email,
          name: profile.name,
          location: profile.location || "",
          bio: profile.bio || "",
          organization: profile.organization || "",
          interests: profile.interests || [],
          verified: profile.verified || false,
          communities: profile.communities || [],
          connections: profile.connections || [],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.id}`,
        };
        
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    updatePageTitle(page);
    window.scrollTo(0, 0);
    localStorage.setItem('lastPage', page);
    const url = page === 'home'
      ? window.location.pathname
      : `${window.location.pathname}?page=${page}`;
    window.history.pushState({}, '', url);
  };

  const handleTopicClick = (topicData: TopicData) => {
    setSelectedTopic(topicData);
    handleNavigate('topic');
  };

  const handleConnectSectorClick = (slug: string) => {
    setSelectedConnectSector(slug);
    handleNavigate('connect-sector');
  };

  const handleConnectArticleClick = (id: string) => {
    setSelectedConnectArticle(id);
    handleNavigate('connect-article');
  };

  const handleAuthSuccess = (userData: AppUser) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    const { signOut } = await import('./utils/api');
    await signOut();
    setUser(null);
    localStorage.setItem('lastPage', 'home');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'learn':
        return <LearnPage onNavigate={handleNavigate} user={user} />;
      case 'learn-databank':
        return <OrganizationDataBankPage onNavigate={handleNavigate} />;
      case 'learn-corporate':
        return <CorporateClimateImpactPage onNavigate={handleNavigate} />;
      case 'learn-education':
        return <ClimateEducationPage onNavigate={handleNavigate} />;
      case 'learn-calculator':
        return <CarbonCalculatorPage onNavigate={handleNavigate} />;
      case 'learn-trace':
        return <ClimateTracePage onNavigate={handleNavigate} />;
      case 'community':
        return <CommunityPage onNavigate={handleNavigate} />;
      case 'community-energy':
        return <EnergyLandingPage onNavigate={handleNavigate} user={user} onTopicClick={handleTopicClick} />;
      case 'community-food':
        return <FoodLandingPage onNavigate={handleNavigate} user={user} onTopicClick={handleTopicClick} />;
      case 'community-mobility':
        return <MobilityLandingPage onNavigate={handleNavigate} user={user} onTopicClick={handleTopicClick} />;
      case 'community-industry':
        return <IndustryLandingPage onNavigate={handleNavigate} user={user} onTopicClick={handleTopicClick} />;
      case 'community-technology':
        return <TechnologyLandingPage onNavigate={handleNavigate} user={user} onTopicClick={handleTopicClick} />;
      case 'community-policy':
        return <PolicyLandingPage onNavigate={handleNavigate} user={user} onTopicClick={handleTopicClick} />;
      case 'community-nature':
        return <NatureLandingPage onNavigate={handleNavigate} user={user} onTopicClick={handleTopicClick} />;
      case 'community-create':
        return <ProtectedRoute user={user} onNavigate={handleNavigate}><CreateCommunityPage onNavigate={handleNavigate} user={user} /></ProtectedRoute>;
      case 'action':
        return <ActionPage onNavigate={handleNavigate} user={user} />;
      case 'action-create':
        return <ProtectedRoute user={user} onNavigate={handleNavigate}><CreateActionPage onNavigate={handleNavigate} user={user} /></ProtectedRoute>;
      case 'campaigns-actions':
        return <CampaignsActionsPage onNavigate={handleNavigate} user={user} />;
      case 'events':
        return <EventsPage onNavigate={handleNavigate} user={user} />;
      case 'campaign-detail':
        return <CampaignDetailPage onNavigate={handleNavigate} user={user} />;
      case 'impact-report':
        return <ProtectedRoute user={user} onNavigate={handleNavigate}><ImpactReportPage onNavigate={handleNavigate} user={user} /></ProtectedRoute>;
      case 'achievements':
        return <ProtectedRoute user={user} onNavigate={handleNavigate}><AchievementsPage onNavigate={handleNavigate} user={user} /></ProtectedRoute>;
      case 'quick-action':
        return <QuickActionPage onNavigate={handleNavigate} user={user} />;
      case 'jobs':
        return <JobsPage onNavigate={handleNavigate} user={user} />;
      case 'marketplace':
        return <MarketplacePage onNavigate={handleNavigate} user={user} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onAuthSuccess={handleAuthSuccess} />;
      case 'signup':
        return <SignUpPage onNavigate={handleNavigate} onAuthSuccess={handleAuthSuccess} />;
      case 'profile':
        return <ProtectedRoute user={user} onNavigate={handleNavigate}><ProfilePage user={user} onNavigate={handleNavigate} onLogout={handleLogout} /></ProtectedRoute>;
      case 'dashboard':
        return <ProtectedRoute user={user} onNavigate={handleNavigate}><DashboardPage user={user} onNavigate={handleNavigate} /></ProtectedRoute>;
      case 'settings':
        return <ProtectedRoute user={user} onNavigate={handleNavigate}><SettingsPage user={user} onNavigate={handleNavigate} /></ProtectedRoute>;
      case 'learn-infra-map':
        return <InfraMapPage onNavigate={handleNavigate} />;
      case 'learn-disaster-map':
        return <DisasterMapPage onNavigate={handleNavigate} />;
      case 'community-feed':
        return <CommunityFeedPage onNavigate={handleNavigate} user={user} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'help':
        return <HelpCenterPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPolicyPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsOfServicePage onNavigate={handleNavigate} />;
      case 'climate-data-dashboard':
        return <ClimateDataDashboardPage onNavigate={handleNavigate} user={user} />;
      case 'topic':
        return <TopicPage onNavigate={handleNavigate} user={user} topicData={selectedTopic} />;
      case 'learn-electricity-map':
        return <ElectricityMapPage onNavigate={handleNavigate} />;
      case 'learn-emissions-map':
        return <EmissionsMapPage onNavigate={handleNavigate} />;
      case 'learn-user-network':
        return <UserNetworkPage onNavigate={handleNavigate} />;
      case 'connect':
        return <ConnectPage onNavigate={handleNavigate} user={user} onSectorClick={handleConnectSectorClick} onArticleClick={handleConnectArticleClick} />;
      case 'connect-sector':
        return <ConnectSectorPage sectorSlug={selectedConnectSector || undefined} onNavigate={handleNavigate} onArticleClick={handleConnectArticleClick} user={user} />;
      case 'connect-article':
        return <ConnectArticlePage articleId={selectedConnectArticle || undefined} onNavigate={handleNavigate} onArticleClick={handleConnectArticleClick} user={user} />;
      default:
        return <HomePage onNavigate={handleNavigate} user={user} />;
    }
  };
  
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Your Earth...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Toaster />
        <ScrollToTop />
        <KeyboardShortcuts onNavigate={handleNavigate} user={user} />
        
        {/* New Modern Navigation */}
        <Navigation 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          user={user}
          onLogout={handleLogout}
        />
        
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        {/* Floating Action Button */}
        <FloatingActionButton onActionSelect={(actionId) => handleNavigate('action')} />
        
        {/* Exit Intent Modal */}
        <ExitIntentModal 
          onAcceptChallenge={(email) => {
            console.log('Challenge accepted with email:', email);
            // You can integrate with backend here
          }}
          onDismiss={() => console.log('Exit intent modal dismissed')}
        />
      </div>
    </ErrorBoundary>
  );
}