/* ============================================
   CONTACT SUBMISSIONS
   ============================================ */

CREATE TABLE contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  conversation jsonb,
  automation_value int8
);

/* ============================================
   BLOG STRUCTURE
   ============================================ */

CREATE TABLE blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  published boolean DEFAULT false NOT NULL,
  published_at timestamptz
);

-- Auto-update the updated_at timestamp on post edits
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at 
BEFORE UPDATE ON blog_posts 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();