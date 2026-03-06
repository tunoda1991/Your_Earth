import { supabase } from './supabase/client';

export interface UserProfile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
}

export async function followUser(followerId: string, followingId: string): Promise<void> {
  const { error } = await supabase
    .from('follows')
    .insert({ follower_id: followerId, following_id: followingId });

  if (error) throw error;
}

export async function unfollowUser(followerId: string, followingId: string): Promise<void> {
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', followerId)
    .eq('following_id', followingId);

  if (error) throw error;
}

export async function isFollowing(followerId: string, followingId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('follows')
    .select('follower_id')
    .eq('follower_id', followerId)
    .eq('following_id', followingId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

export async function getFollowersCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', userId);

  if (error) throw error;
  return count || 0;
}

export async function getFollowingCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', userId);

  if (error) throw error;
  return count || 0;
}

export async function getFollowersList(userId: string): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('follows')
    .select('follower_id')
    .eq('following_id', userId);

  if (error) throw error;
  if (!data || data.length === 0) return [];

  const ids = data.map(f => f.follower_id);
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, bio')
    .in('id', ids);

  if (profilesError) throw profilesError;
  return profiles || [];
}

export async function getFollowingList(userId: string): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', userId);

  if (error) throw error;
  if (!data || data.length === 0) return [];

  const ids = data.map(f => f.following_id);
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, bio')
    .in('id', ids);

  if (profilesError) throw profilesError;
  return profiles || [];
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, bio')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}
