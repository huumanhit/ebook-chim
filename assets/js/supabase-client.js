/**
 * SUPABASE CLIENT ADAPTER: CU-GAY-GUIDE
 * Kết nối dự án Supabase: https://fowwdgzbmuwhmuujuaii.supabase.co
 * Hỗ trợ đồng bộ 2 chiều giữa LocalStorage và Supabase PostgreSQL Cloud
 */

const SUPABASE_CONFIG = {
  url: "https://fowwdgzbmuwhmuujuaii.supabase.co",
  anonKey: localStorage.getItem("cugay_supabase_anon_key") || "",
  projectId: "fowwdgzbmuwhmuujuaii"
};

let _supabaseClient = null;

function getSupabaseClient() {
  if (_supabaseClient) return _supabaseClient;
  if (typeof supabase !== "undefined" && SUPABASE_CONFIG.anonKey) {
    try {
      _supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      return _supabaseClient;
    } catch (e) {
      console.warn("Lỗi khởi tạo Supabase Client:", e);
    }
  }
  return null;
}

// Kiểm tra trạng thái cấu hình
function isSupabaseConfigured() {
  return Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
}

// Lưu anonKey vào LocalStorage
function setSupabaseAnonKey(key) {
  const cleanKey = (key || "").trim();
  SUPABASE_CONFIG.anonKey = cleanKey;
  if (cleanKey) {
    localStorage.setItem("cugay_supabase_anon_key", cleanKey);
    _supabaseClient = null;
    return testSupabaseConnection();
  } else {
    localStorage.removeItem("cugay_supabase_anon_key");
    _supabaseClient = null;
    return Promise.resolve({ success: false, message: "Đã hủy kích hoạt kết nối Supabase" });
  }
}

// Kiểm tra kết nối tới Supabase
async function testSupabaseConnection() {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, message: "Chưa cấu hình Supabase Anon Key" };
  }
  try {
    const { data, error } = await client.from("users").select("id, display_name").limit(1);
    if (error) throw error;
    return { success: true, message: "Kết nối Supabase thành công!", count: data.length };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối Supabase: " + (err.message || err) };
  }
}

// Đồng bộ đẩy dữ liệu từ LocalStorage lên Supabase (Seed/Sync Up)
async function syncLocalToSupabase() {
  const client = getSupabaseClient();
  if (!client) throw new Error("Chưa kết nối Supabase");

  const results = { users: 0, birds: 0, articles: 0, comments: 0 };

  // 1. Users
  const localUsers = CUGAY_DB.getUsers();
  for (const u of localUsers) {
    const { error } = await client.from("users").upsert({
      id: u.id,
      username: u.username,
      display_name: u.displayName,
      avatar: u.avatar,
      bio: u.bio,
      quote: u.quote || "",
      experience_years: u.experienceYears || 0,
      location: u.location || "",
      role: u.role || "member",
      status: "active"
    });
    if (!error) results.users++;
  }

  // 2. Birds
  const localBirds = CUGAY_DB.getBirds();
  for (const b of localBirds) {
    const { error } = await client.from("birds").upsert({
      id: b.id,
      owner_id: b.ownerId,
      name: b.name,
      image: b.image,
      voice: b.voice,
      type: b.type,
      age_years: b.ageYears || "3 năm lồng",
      origin: b.origin || "",
      notes: b.notes || "",
      initial_assessment: b.initialAssessment || "",
      field_experience: b.fieldExperience || "",
      current_assessment: b.currentAssessment || "",
      status: "active"
    });
    if (!error) results.birds++;

    // Timelines
    if (b.timeline && b.timeline.length) {
      for (const t of b.timeline) {
        await client.from("bird_timelines").upsert({
          bird_id: b.id,
          phase: t.phase || "field",
          title: t.title,
          content: t.content,
          event_date: t.date || ""
        });
      }
    }
  }

  // 3. Articles
  const localArticles = CUGAY_DB.getArticles();
  for (const a of localArticles) {
    const { error } = await client.from("articles").upsert({
      id: a.id,
      author_id: a.authorId,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      content: a.content,
      core_quote: a.coreQuote || "",
      cover_image: a.coverImage || "",
      category: a.category || "quan-diem",
      tags: a.tags || "",
      bird_id: a.birdId || null,
      is_author_perspective: Boolean(a.isAuthorPerspective),
      status: a.status || "published",
      views_count: a.views || 0,
      published_at: a.publishedAt ? new Date(a.publishedAt).toISOString() : new Date().toISOString()
    });
    if (!error) results.articles++;
  }

  return results;
}

// Đồng bộ kéo dữ liệu từ Supabase về LocalStorage (Sync Down)
async function syncSupabaseToLocal() {
  const client = getSupabaseClient();
  if (!client) throw new Error("Chưa kết nối Supabase");

  // Tải Articles từ Supabase
  const { data: dbArticles, error: artErr } = await client
    .from("articles")
    .select("*, users!author_id(display_name, username, avatar)")
    .order("created_at", { ascending: false });

  if (artErr) throw artErr;

  if (dbArticles && dbArticles.length) {
    const mappedArticles = dbArticles.map(a => ({
      id: a.id,
      authorId: a.author_id,
      authorName: a.users ? a.users.display_name : "Người Chơi",
      authorRole: a.is_author_perspective ? "admin" : "user",
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      content: a.content,
      coreQuote: a.core_quote,
      coverImage: a.cover_image,
      category: a.category,
      tags: a.tags ? a.tags.split(",").map(t => t.trim()) : [],
      birdId: a.bird_id,
      isAuthorPerspective: Boolean(a.is_author_perspective),
      status: a.status,
      views: a.views_count || 0,
      createdAt: a.created_at,
      publishedAt: a.published_at
    }));

    // Cập nhật lại kho bài viết local
    const currentDb = CUGAY_DB.getRaw();
    currentDb.articles = mappedArticles;
    CUGAY_DB.save(currentDb);
  }

  return { articlesCount: dbArticles ? dbArticles.length : 0 };
}
