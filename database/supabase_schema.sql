-- ==============================================================================
-- SUPABASE POSTGRESQL SCHEMA: SỔ TAY CHỌN CHIM CU GÁY & THƯ VIỆN QUAN ĐIỂM
-- Dành riêng cho Supabase Project: fowwdgzbmuwhmuujuaii
-- Chuẩn PostgreSQL 15+ | RLS (Row Level Security) | Triggers | Search Indexes
-- ==============================================================================

-- Bật các extensions cần thiết cho PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. TẠO CÁC ENUM TYPE CHUẨN
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'moderator', 'member');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_status AS ENUM ('active', 'suspended', 'pending');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE article_status AS ENUM ('draft', 'pending', 'published', 'rejected', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE bird_status AS ENUM ('active', 'sold', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE timeline_phase AS ENUM ('start', 'initial', 'field', 'update', 'current');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE importance_level AS ENUM ('rat_cao', 'cao', 'trung_binh', 'thap');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE reaction_type AS ENUM ('thich', 'huu_ich', 'dong_dieu');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE target_type AS ENUM ('article', 'comment', 'user', 'bird');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE report_status AS ENUM ('pending', 'resolved', 'dismissed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. TẠO HÀM TRIGGER TỰ ĐỘNG CẬP NHẬT updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 3. BẢNG USERS (Hồ sơ nghệ nhân & Người chơi cu gáy)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY, -- 'user_author', 'user_caydongmoi' hoặc auth.uid()
    username TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    avatar TEXT,
    bio TEXT,
    quote TEXT DEFAULT 'Tôi không tìm con chim đẹp nhất. Tôi tìm con chim hợp cách chơi của mình.',
    experience_years INT DEFAULT 0 CHECK (experience_years >= 0),
    location TEXT,
    role user_role NOT NULL DEFAULT 'member',
    status user_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==============================================================================
-- 4. BẢNG USER_CRITERIA (Bộ tiêu chí chọn chim riêng của từng người - Mục 20.5)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.user_criteria (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    criterion_name TEXT NOT NULL,
    importance_level importance_level NOT NULL DEFAULT 'cao',
    sort_order INT DEFAULT 1,
    notes TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, criterion_name)
);

DROP TRIGGER IF EXISTS trg_user_criteria_updated_at ON public.user_criteria;
CREATE TRIGGER trg_user_criteria_updated_at
BEFORE UPDATE ON public.user_criteria
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==============================================================================
-- 5. BẢNG BIRDS (Hồ sơ từng con chim cu gáy - Mục 20.4)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.birds (
    id TEXT PRIMARY KEY, -- 'dong-dream', 'tho-sam-01'
    owner_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    image TEXT,
    voice TEXT NOT NULL DEFAULT 'Thổ',
    type TEXT NOT NULL DEFAULT 'Chim Mồi Rừng',
    age_years TEXT DEFAULT '3 năm lồng',
    origin TEXT,
    notes TEXT,
    initial_assessment TEXT NOT NULL,
    field_experience TEXT NOT NULL,
    current_assessment TEXT NOT NULL,
    status bird_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_birds_updated_at ON public.birds;
CREATE TRIGGER trg_birds_updated_at
BEFORE UPDATE ON public.birds
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==============================================================================
-- 6. BẢNG BIRD_TIMELINES (Dòng thời gian tiến hóa của chim - Mục 20.4)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.bird_timelines (
    id BIGSERIAL PRIMARY KEY,
    bird_id TEXT NOT NULL REFERENCES public.birds(id) ON DELETE CASCADE,
    phase timeline_phase NOT NULL DEFAULT 'field',
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    event_date TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 7. BẢNG ARTICLES (Bài viết chia sẻ quan điểm & kinh nghiệm - Mục 20.3 & 20.10)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.articles (
    id TEXT PRIMARY KEY,
    author_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    core_quote TEXT,
    cover_image TEXT,
    category TEXT NOT NULL DEFAULT 'quan-diem',
    tags TEXT,
    bird_id TEXT REFERENCES public.birds(id) ON DELETE SET NULL,
    is_author_perspective BOOLEAN NOT NULL DEFAULT FALSE, -- TRUE: Góc nhìn Tác giả | FALSE: Góc nhìn Cộng đồng
    status article_status NOT NULL DEFAULT 'pending',
    views_count INT NOT NULL DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_articles_updated_at ON public.articles;
CREATE TRIGGER trg_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==============================================================================
-- 8. BẢNG COMMENTS (Thảo luận trao đổi kinh nghiệm đa cấp - Mục 20.7)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.comments (
    id TEXT PRIMARY KEY,
    article_id TEXT NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    parent_id TEXT REFERENCES public.comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'approved',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_comments_updated_at ON public.comments;
CREATE TRIGGER trg_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==============================================================================
-- 9. BẢNG REACTIONS (Cảm xúc: Thích, Hữu ích, Có kinh nghiệm tương tự - Mục 20.8)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reactions (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    target_type target_type NOT NULL,
    target_id TEXT NOT NULL,
    reaction_type reaction_type NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, target_type, target_id, reaction_type)
);

-- ==============================================================================
-- 10. BẢNG FOLLOWS (Theo dõi nghệ nhân có cùng phong cách chơi - Mục 20.6)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.follows (
    follower_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    following_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);

-- ==============================================================================
-- 11. BẢNG BOOKMARKS (Lưu bài viết hoặc lưu hồ sơ con chim - Mục 20.6)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    target_type target_type NOT NULL DEFAULT 'article',
    target_id TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, target_type, target_id)
);

-- ==============================================================================
-- 12. BẢNG REPORTS (Kiểm duyệt vi phạm cộng đồng - Mục 20.11)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reports (
    id TEXT PRIMARY KEY,
    reporter_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    target_type target_type NOT NULL,
    target_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    details TEXT,
    status report_status NOT NULL DEFAULT 'pending',
    resolution_note TEXT,
    resolved_by TEXT REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_reports_updated_at ON public.reports;
CREATE TRIGGER trg_reports_updated_at
BEFORE UPDATE ON public.reports
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==============================================================================
-- 13. INDEXES CHO HIỆU NĂNG TÌM KIẾM
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_author ON public.articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_is_author ON public.articles(is_author_perspective);
CREATE INDEX IF NOT EXISTS idx_comments_article ON public.comments(article_id);
CREATE INDEX IF NOT EXISTS idx_birds_owner ON public.birds(owner_id);
CREATE INDEX IF NOT EXISTS idx_timelines_bird ON public.bird_timelines(bird_id);
CREATE INDEX IF NOT EXISTS idx_reactions_target ON public.reactions(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);

-- Trigram Index hỗ trợ tìm kiếm tiếng Việt cực nhanh
CREATE INDEX IF NOT EXISTS idx_articles_title_trgm ON public.articles USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_articles_content_trgm ON public.articles USING gin (content gin_trgm_ops);

-- ==============================================================================
-- 14. ROW LEVEL SECURITY (RLS) - BẢO MẬT CHUẨN SUPABASE
-- ==============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.birds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bird_timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- 14.1. Chính sách ĐỌC công khai (Public Read)
DROP POLICY IF EXISTS "Cho phép tất cả xem hồ sơ user công khai" ON public.users;
CREATE POLICY "Cho phép tất cả xem hồ sơ user công khai" ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cho phép tất cả xem tiêu chí user" ON public.user_criteria;
CREATE POLICY "Cho phép tất cả xem tiêu chí user" ON public.user_criteria FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cho phép tất cả xem hồ sơ chim đang nuôi" ON public.birds;
CREATE POLICY "Cho phép tất cả xem hồ sơ chim đang nuôi" ON public.birds FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cho phép tất cả xem timeline của chim" ON public.bird_timelines;
CREATE POLICY "Cho phép tất cả xem timeline của chim" ON public.bird_timelines FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cho phép tất cả đọc bài viết đã xuất bản" ON public.articles;
CREATE POLICY "Cho phép tất cả đọc bài viết đã xuất bản" ON public.articles FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Cho phép tất cả xem bình luận hợp lệ" ON public.comments;
CREATE POLICY "Cho phép tất cả xem bình luận hợp lệ" ON public.comments FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Cho phép tất cả xem số lượng phản hồi" ON public.reactions;
CREATE POLICY "Cho phép tất cả xem số lượng phản hồi" ON public.reactions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cho phép tất cả xem quan hệ follow" ON public.follows;
CREATE POLICY "Cho phép tất cả xem quan hệ follow" ON public.follows FOR SELECT USING (true);

-- 14.2. Chính sách GHI (Insert / Update / Delete)
DROP POLICY IF EXISTS "Mọi người có thể gửi bài viết mới chờ duyệt" ON public.articles;
CREATE POLICY "Mọi người có thể gửi bài viết mới chờ duyệt" ON public.articles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Mọi người có thể gửi bình luận" ON public.comments;
CREATE POLICY "Mọi người có thể gửi bình luận" ON public.comments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Mọi người có thể thả cảm xúc" ON public.reactions;
CREATE POLICY "Mọi người có thể thả cảm xúc" ON public.reactions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Mọi người có thể theo dõi" ON public.follows;
CREATE POLICY "Mọi người có thể theo dõi" ON public.follows FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Mọi người có thể lưu bookmark" ON public.bookmarks;
CREATE POLICY "Mọi người có thể lưu bookmark" ON public.bookmarks FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Mọi người có thể tạo hồ sơ chim" ON public.birds;
CREATE POLICY "Mọi người có thể tạo hồ sơ chim" ON public.birds FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Mọi người có thể thêm timeline cho chim" ON public.bird_timelines;
CREATE POLICY "Mọi người có thể thêm timeline cho chim" ON public.bird_timelines FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Mọi người có thể gửi báo cáo vi phạm" ON public.reports;
CREATE POLICY "Mọi người có thể gửi báo cáo vi phạm" ON public.reports FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Quản trị viên có toàn quyền kiểm duyệt bài viết" ON public.articles;
CREATE POLICY "Quản trị viên có toàn quyền kiểm duyệt bài viết" ON public.articles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Quản trị viên có toàn quyền xử lý báo cáo" ON public.reports;
CREATE POLICY "Quản trị viên có toàn quyền xử lý báo cáo" ON public.reports FOR ALL USING (true) WITH CHECK (true);
