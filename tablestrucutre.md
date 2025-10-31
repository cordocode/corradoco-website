/* ============================================
   CONTACT SUBMISSIONS (add to Home.css)
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
   BLOG STRUCUTRE (add to Home.css)
   ============================================ */

CREATE TABLE blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  published boolean DEFAULT false NOT NULL
);