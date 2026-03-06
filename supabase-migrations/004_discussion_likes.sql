CREATE TABLE IF NOT EXISTS discussion_likes (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(discussion_id, user_id)
);

ALTER TABLE discussions ADD COLUMN IF NOT EXISTS likes_count INT DEFAULT 0;
ALTER TABLE discussions ADD COLUMN IF NOT EXISTS reposts_count INT DEFAULT 0;
ALTER TABLE discussions ADD COLUMN IF NOT EXISTS views_count INT DEFAULT 0;
ALTER TABLE discussions ADD COLUMN IF NOT EXISTS comments_count INT DEFAULT 0;

CREATE OR REPLACE FUNCTION increment_likes(discussion_id UUID)
RETURNS void LANGUAGE sql AS $$
  UPDATE discussions SET likes_count = likes_count + 1 WHERE id = discussion_id;
$$;

CREATE OR REPLACE FUNCTION decrement_likes(discussion_id UUID)
RETURNS void LANGUAGE sql AS $$
  UPDATE discussions SET likes_count = GREATEST(0, likes_count - 1) WHERE id = discussion_id;
$$;

ALTER TABLE discussion_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own likes" ON discussion_likes
  FOR ALL USING (auth.uid() = user_id);
