import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-73b87161`;

// Get auth token from localStorage
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// Save auth token to localStorage
export function setAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
}

// Remove auth token from localStorage
export function clearAuthToken() {
  localStorage.removeItem('auth_token');
}

// Generic API call helper
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

  // Use user token if available, otherwise use publicAnonKey
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    // Always provide publicAnonKey as fallback for public endpoints
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Don't log 401 errors for unauthenticated users - this is expected
      if (response.status !== 401) {
        console.error(`API Error [${response.status}] ${endpoint}:`, data);
      }
      throw new Error(data.error || `API request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    // Don't log 401 errors for unauthenticated users - this is expected
    if (!(error instanceof Error) || !error.message.includes('Unauthorized')) {
      console.error(`API request failed for ${endpoint}:`, error);
    }
    throw error;
  }
}

// ===== AUTH API =====

export async function signUp(email: string, password: string, name: string, interests: string[] = []) {
  const data = await apiCall('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name, interests }),
  });
  return data;
}

export async function signIn(email: string, password: string) {
  const { supabase } = await import('./supabase/client');
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  if (data.session) {
    setAuthToken(data.session.access_token);
  }
  
  return data;
}

export async function signOut() {
  const { supabase } = await import('./supabase/client');
  await supabase.auth.signOut();
  clearAuthToken();
}

export async function getCurrentSession() {
  const { supabase } = await import('./supabase/client');
  const { data } = await supabase.auth.getSession();
  
  if (data.session) {
    setAuthToken(data.session.access_token);
  }
  
  return data.session;
}

export async function getProfile() {
  return await apiCall('/auth/profile');
}

export async function updateProfile(updates: any) {
  return await apiCall('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function getUserProfile(userId: string) {
  return await apiCall(`/users/${userId}`);
}

// ===== COMMUNITY API =====

export async function getCommunities(category?: string, search?: string) {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  
  const query = params.toString();
  return await apiCall(`/communities${query ? '?' + query : ''}`);
}

export async function getCommunity(id: string) {
  return await apiCall(`/communities/${id}`);
}

export async function createCommunity(data: {
  name: string;
  description: string;
  category: string;
  isPublic?: boolean;
}) {
  return await apiCall('/communities', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function joinCommunity(communityId: string) {
  return await apiCall(`/communities/${communityId}/join`, {
    method: 'POST',
  });
}

// ===== DISCUSSION API =====

export async function getDiscussions(communityId?: string, category?: string) {
  const params = new URLSearchParams();
  if (communityId) params.append('communityId', communityId);
  if (category) params.append('category', category);
  
  const query = params.toString();
  return await apiCall(`/discussions${query ? '?' + query : ''}`);
}

export async function createDiscussion(data: {
  title: string;
  content: string;
  category?: string;
  communityId?: string;
}) {
  return await apiCall('/discussions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ===== CONNECTION API =====

export async function sendConnectionRequest(targetUserId: string, message?: string) {
  return await apiCall('/connections/request', {
    method: 'POST',
    body: JSON.stringify({ targetUserId, message }),
  });
}

export async function getConnections() {
  return await apiCall('/connections');
}

// ===== MESSAGE API =====

export async function sendMessage(recipientId: string, content: string, subject?: string) {
  return await apiCall('/messages', {
    method: 'POST',
    body: JSON.stringify({ recipientId, content, subject }),
  });
}

export async function getMessages() {
  return await apiCall('/messages');
}

// ===== NOTIFICATION API =====

export async function getNotifications() {
  return await apiCall('/notifications');
}

export async function markNotificationRead(notificationId: string) {
  return await apiCall(`/notifications/${notificationId}/read`, {
    method: 'PUT',
  });
}

// ===== SEARCH API =====

export async function searchUsers(query?: string, interest?: string) {
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (interest) params.append('interest', interest);
  
  const queryString = params.toString();
  return await apiCall(`/search/users${queryString ? '?' + queryString : ''}`);
}

// ===== EVENT API =====

export async function getEvents(filters?: {
  type?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}) {
  const params = new URLSearchParams();
  if (filters?.type) params.append('type', filters.type);
  if (filters?.location) params.append('location', filters.location);
  if (filters?.startDate) params.append('startDate', filters.startDate);
  if (filters?.endDate) params.append('endDate', filters.endDate);
  if (filters?.search) params.append('search', filters.search);
  
  const query = params.toString();
  return await apiCall(`/events${query ? '?' + query : ''}`);
}

export async function getEvent(id: string) {
  return await apiCall(`/events/${id}`);
}

export async function createEvent(data: {
  title: string;
  description: string;
  type: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  date: string;
  endDate?: string;
  time?: string;
  endTime?: string;
  maxAttendees?: number;
  image?: string;
  tags?: string[];
  isVirtual?: boolean;
  virtualLink?: string;
}) {
  return await apiCall('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function joinEvent(eventId: string) {
  return await apiCall(`/events/${eventId}/join`, {
    method: 'POST',
  });
}

export async function leaveEvent(eventId: string) {
  return await apiCall(`/events/${eventId}/leave`, {
    method: 'POST',
  });
}

export async function getEventAttendees(eventId: string) {
  return await apiCall(`/events/${eventId}/attendees`);
}