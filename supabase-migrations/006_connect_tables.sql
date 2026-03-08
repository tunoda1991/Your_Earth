-- Connect module: sectors and articles tables for AI-curated climate news

CREATE TABLE IF NOT EXISTS public.sectors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sectors are publicly readable" ON public.sectors FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  sector TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_name TEXT,
  source_type TEXT NOT NULL DEFAULT 'news',
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sentiment TEXT DEFAULT 'neutral',
  trending BOOLEAN DEFAULT false,
  region TEXT DEFAULT 'Global',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Articles are publicly readable" ON public.articles FOR SELECT USING (true);

CREATE INDEX idx_articles_sector ON public.articles (sector);
CREATE INDEX idx_articles_published_at ON public.articles (published_at DESC);
CREATE INDEX idx_articles_trending ON public.articles (trending) WHERE trending = true;

INSERT INTO public.sectors (name, slug, description, icon, color) VALUES
  ('Energy', 'energy', 'Renewable energy transitions, fossil fuel phase-outs, grid innovation, and clean energy policy worldwide.', 'Zap', 'yellow'),
  ('Mobility', 'mobility', 'Electric vehicles, sustainable transport, aviation decarbonization, and urban mobility solutions.', 'Car', 'blue'),
  ('Food', 'food', 'Sustainable agriculture, food systems transformation, alternative proteins, and supply chain emissions.', 'Leaf', 'green'),
  ('Industry', 'industry', 'Heavy industry decarbonization, green steel, cement alternatives, and circular economy initiatives.', 'Factory', 'red'),
  ('Technology', 'technology', 'Climate tech innovation, carbon capture, AI for sustainability, and green computing.', 'Cpu', 'purple'),
  ('Policy', 'policy', 'Climate legislation, carbon pricing, international agreements, and regulatory frameworks.', 'Scale', 'orange'),
  ('Nature', 'nature', 'Biodiversity, ecosystem restoration, ocean conservation, and nature-based climate solutions.', 'TreePine', 'teal');
