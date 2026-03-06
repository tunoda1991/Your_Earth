import { supabase } from './supabase/client';

export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  link_url: string | null;
  created_at: string;
  user_email?: string;
}

export async function fetchAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchFollowingPosts(userId: string): Promise<Post[]> {
  const { data: follows, error: followsError } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', userId);

  if (followsError) throw followsError;

  const followingIds = (follows || []).map(f => f.following_id);

  if (followingIds.length === 0) return [];

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .in('user_id', followingIds)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createPost(post: {
  user_id: string;
  content: string;
  image_url?: string | null;
  link_url?: string | null;
}): Promise<Post> {
  const { data, error } = await supabase
    .from('posts')
    .insert({
      user_id: post.user_id,
      content: post.content,
      image_url: post.image_url || null,
      link_url: post.link_url || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function uploadPostImage(file: File, userId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from('post-images')
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from('post-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function getFollowing(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', userId);

  if (error) throw error;
  return (data || []).map(f => f.following_id);
}
