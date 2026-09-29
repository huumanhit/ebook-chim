# Hướng Dẫn Kích Hoạt Database Supabase (PostgreSQL)
## Dự Án: `fowwdgzbmuwhmuujuaii` (AWS Singapore - ap-southeast-1)

---

## 1. Thông Tin Kết Nối Đã Cấu Hình

Thông tin kết nối đã được lưu trữ trong tệp [`.env`](file:///d:/xampp/htdocs/cu-gay-guide/.env):

```env
# Pooler (IPv4 Transaction Mode - Dùng cho ứng dụng chạy runtime)
DATABASE_URL="postgresql://postgres.fowwdgzbmuwhmuujuaii:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Session Mode (Dùng cho Migration, DDL, Schema update)
DIRECT_URL="postgresql://postgres.fowwdgzbmuwhmuujuaii:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# Project URL:
https://fowwdgzbmuwhmuujuaii.supabase.co
```

---

## 2. Cách Khởi Tạo Toàn Bộ Bảng & Dữ Liệu Trong 1 Phút (Khuyên Dùng)

Bạn không cần cài đặt phần mềm nào trên máy, chỉ cần mở trực tiếp trình duyệt vào **Supabase Dashboard**:

### Bước 1: Mở SQL Editor trên Supabase
👉 **[Nhấn vào đây để mở SQL Editor của dự án](https://supabase.com/dashboard/project/fowwdgzbmuwhmuujuaii/sql/new)**

### Bước 2: Chạy Tệp Schema (Tạo 10 Bảng + RLS + Triggers)
1. Mở file [`database/supabase_schema.sql`](file:///d:/xampp/htdocs/cu-gay-guide/database/supabase_schema.sql) trong VS Code.
2. Copy toàn bộ nội dung ($\text{Ctrl} + \text{A} \rightarrow \text{Ctrl} + \text{C}$).
3. Dán vào khung SQL Editor trên Supabase và nhấn nút **Run** (hoặc phím tắt $\text{Ctrl} + \text{Enter}$).
4. Supabase sẽ thông báo: `Success. No rows returned`.

> [!NOTE]
> File này đã cấu hình đầy đủ:
> - **10 Bảng quan hệ**: `users`, `user_criteria`, `birds`, `bird_timelines`, `articles`, `comments`, `reactions`, `follows`, `bookmarks`, `reports`.
> - **ENUMs**: `user_role`, `article_status`, `timeline_phase`, `reaction_type`...
> - **Row Level Security (RLS)**: Bảo mật theo chuẩn Supabase.
> - **Full-text search**: Extension `pg_trgm` tối ưu tìm kiếm bài viết bằng tiếng Việt.

### Bước 3: Chạy Tệp Seed Data (Nạp Dữ Liệu Mẫu Thực Chiến)
1. Mở file [`database/supabase_seed.sql`](file:///d:/xampp/htdocs/cu-gay-guide/database/supabase_seed.sql).
2. Copy toàn bộ nội dung $\rightarrow$ Dán vào SQL Editor $\rightarrow$ Nhấn **Run**.
3. Toàn bộ tài khoản nghệ nhân (Người Mê Cu Gáy Rừng, Cây Đồng Mồi, Bác Ba Đất Đỏ), hồ sơ chim (Đồng Dream, Thổ Sấm 01), bài viết, bình luận và phản hồi sẽ được nạp hoàn chỉnh.

### Bước 4: Kiểm Tra Trong Table Editor
👉 **[Mở Table Editor trên Supabase](https://supabase.com/dashboard/project/fowwdgzbmuwhmuujuaii/editor)**
Bạn sẽ thấy đầy đủ 10 bảng với dữ liệu thực tế sẵn sàng hoạt động!

---

## 3. Kết Nối Trực Tiếp Từ Trình Duyệt Qua Supabase JS Client

Trang web đã được tích hợp sẵn SDK `@supabase/supabase-js` và file adapter [`assets/js/supabase-client.js`](file:///d:/xampp/htdocs/cu-gay-guide/assets/js/supabase-client.js).

Để kích hoạt chế độ đồng bộ trực tiếp với Supabase:
1. Vào **[Project Settings -> API](https://supabase.com/dashboard/project/fowwdgzbmuwhmuujuaii/settings/api)** trên Supabase.
2. Copy chuỗi **`anon` `public` key**.
3. Mở DevTools Console ($\text{F12}$) trên website `http://localhost:8080/` và chạy lệnh:
   ```javascript
   setSupabaseAnonKey("chuoi_anon_key_cua_ban");
   ```
4. Kiểm tra kết nối ngay:
   ```javascript
   testSupabaseConnection().then(console.log);
   ```
5. Đẩy toàn bộ dữ liệu hiện tại lên Supabase Cloud:
   ```javascript
   syncLocalToSupabase().then(console.log);
   ```

---

## 4. Chạy Migration Từ Dòng Lệnh (Dành cho Developer)

Nếu bạn có sẵn công cụ `psql` trên máy tính hoặc terminal:

```bash
# Thay thế [YOUR-PASSWORD] bằng mật khẩu Database của bạn
psql "postgresql://postgres.fowwdgzbmuwhmuujuaii:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres" -f database/supabase_schema.sql

psql "postgresql://postgres.fowwdgzbmuwhmuujuaii:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres" -f database/supabase_seed.sql
```

Hoặc sử dụng với **Prisma / Drizzle ORM**:
Copy `DATABASE_URL` và `DIRECT_URL` từ file `.env` vào dự án ORM của bạn.
