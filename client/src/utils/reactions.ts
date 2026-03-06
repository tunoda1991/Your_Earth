import { supabase } from './supabase/client';

export type ReactionType = 'like' | 'love' | 'fire' | 'eco' | 'wow' | 'sad';

export interface ReactionCounts {
  like: number;
  love: number;
  fire: number;
  eco: number;
  wow: number;
  sad: number;
}

export interface UserReaction {
  reaction_type: ReactionType;
}

export const REACTION_CONFIG: { type: ReactionType; emoji: string; label: string }[] = [
  { type: 'like', emoji: '\uD83D\uDC4D', label: 'Like' },
  { type: 'love', emoji: '\u2764\uFE0F', label: 'Love' },
  { type: 'fire', emoji: '\uD83D\uDD25', label: 'Fire' },
  { type: 'eco', emoji: '\uD83C\uDF31', label: 'Eco' },
  { type: 'wow', emoji: '\uD83D\uDE2E', label: 'Wow' },
  { type: 'sad', emoji: '\uD83D\uDE22', label: 'Sad' },
];

const EMPTY_COUNTS: ReactionCounts = { like: 0, love: 0, fire: 0, eco: 0, wow: 0, sad: 0 };

export async function fetchReactionCounts(postId: string): Promise<ReactionCounts> {
  const { data, error } = await supabase
    .from('reactions')
    .select('reaction_type')
    .eq('post_id', postId);

  if (error) throw error;

  const counts = { ...EMPTY_COUNTS };
  (data || []).forEach((r: { reaction_type: string }) => {
    const key = r.reaction_type as ReactionType;
    if (key in counts) counts[key]++;
  });
  return counts;
}

export async function fetchUserReaction(postId: string, userId: string): Promise<ReactionType | null> {
  const { data, error } = await supabase
    .from('reactions')
    .select('reaction_type')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data ? (data.reaction_type as ReactionType) : null;
}

export async function upsertReaction(postId: string, userId: string, reactionType: ReactionType): Promise<void> {
  const { error } = await supabase
    .from('reactions')
    .upsert(
      { post_id: postId, user_id: userId, reaction_type: reactionType },
      { onConflict: 'post_id,user_id' }
    );

  if (error) throw error;
}

export async function removeReaction(postId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('reactions')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId);

  if (error) throw error;
}

export async function fetchBulkReactionCounts(postIds: string[]): Promise<Record<string, ReactionCounts>> {
  if (postIds.length === 0) return {};

  const { data, error } = await supabase
    .from('reactions')
    .select('post_id, reaction_type')
    .in('post_id', postIds);

  if (error) throw error;

  const result: Record<string, ReactionCounts> = {};
  postIds.forEach(id => { result[id] = { ...EMPTY_COUNTS }; });

  (data || []).forEach((r: { post_id: string; reaction_type: string }) => {
    if (!result[r.post_id]) result[r.post_id] = { ...EMPTY_COUNTS };
    const key = r.reaction_type as ReactionType;
    if (key in result[r.post_id]) result[r.post_id][key]++;
  });

  return result;
}

export async function fetchBulkUserReactions(postIds: string[], userId: string): Promise<Record<string, ReactionType | null>> {
  if (postIds.length === 0) return {};

  const { data, error } = await supabase
    .from('reactions')
    .select('post_id, reaction_type')
    .in('post_id', postIds)
    .eq('user_id', userId);

  if (error) throw error;

  const result: Record<string, ReactionType | null> = {};
  postIds.forEach(id => { result[id] = null; });

  (data || []).forEach((r: { post_id: string; reaction_type: string }) => {
    result[r.post_id] = r.reaction_type as ReactionType;
  });

  return result;
}
