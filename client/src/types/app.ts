/** App user from auth + profile (API or Supabase). */
export interface AppUser {
  id: string;
  email?: string;
  name?: string;
  location?: string;
  bio?: string;
  organization?: string;
  interests?: string[];
  verified?: boolean;
  communities?: string[];
  connections?: string[];
  avatar?: string;
}

/** Topic/category data passed to TopicPage (e.g. from community landing). */
export interface TopicData {
  title?: string;
  description?: string;
  slug?: string;
  icon?: string;
  [key: string]: unknown;
}
