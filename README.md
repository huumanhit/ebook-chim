# Sổ Tay Chọn Chim Cu Gáy - Thư Viện Quan Điểm & Thực Chiến

> **"Không dạy bạn chọn chim. Chỉ cho bạn cách tôi nhìn một con chim."**

Nền tảng website cá nhân kết hợp thư viện chia sẻ quan điểm của người chơi cu gáy thực chiến. Nơi lưu giữ góc nhìn mộc mạc, kinh nghiệm qua các mùa rừng, và hành trình tiến hóa của từng con chim mồi.

---

## 🌿 Điểm Đặc Trưng Của Dự Án

1. **Không phải diễn đàn hỗn tạp, không có bảng xếp hạng hơn thua**:
   - Không có điểm số "chim hay nhất", không có bảng xếp hạng "người chơi giỏi nhất".
   - Mỗi người chơi tự thiết lập **Bộ tiêu chí riêng của tôi** (Giọng, Tiền, Hậu, Thần thái, Bộ mã, Chân, Độ bền).
2. **Hồ sơ con chim có dòng thời gian (Bird Evolution Timeline)**:
   - Một con chim không được đánh giá bằng một bức ảnh nhất thời, mà qua hành trình:
     $$\text{Ngày bắt đầu} \longrightarrow \text{Đánh giá ban đầu} \longrightarrow \text{Thực chiến bìa rừng} \longrightarrow \text{Cập nhật nết gù} \longrightarrow \text{Đánh giá hiện tại}$$
3. **Phân định minh bạch góc nhìn**:
   - Badge **"Góc nhìn của tôi" (Tác giả sáng lập)** vs **"Góc nhìn cộng đồng"**.
4. **Phản hồi đồng điệu văn minh**:
   - Cảm xúc tinh gọn: 👍 *Thích*, 💡 *Hữu ích*, 🤝 *Có kinh nghiệm tương tự*.
5. **Âm thanh thiên nhiên & Ambient**:
   - Chế độ phát âm thanh tiếng chim gù buổi sớm và không gian sân vườn rợp bóng cây.
6. **Hỗ trợ 3 giao diện thị giác**:
   - Giấy Dó Mộc Mạc / Gỗ Mun Đất Đỏ / Sân Vườn Xanh Mát.

---

## 🛠️ Công Nghệ & Kiến Trúc (Section 20.14)

- **Frontend**: Vanilla HTML5, CSS3 Tokens/Variables, JavaScript (ES6+), Hash Routing SPA.
- **Database Cloud**: PostgreSQL 15+ trên **Supabase** (`fowwdgzbmuwhmuujuaii`).
  - 10 Bảng quan hệ: `users`, `user_criteria`, `birds`, `bird_timelines`, `articles`, `comments`, `reactions`, `follows`, `bookmarks`, `reports`.
  - Hỗ trợ Row Level Security (RLS), Triggers tự động cập nhật, GIN Trigram Search tiếng Việt.
- **Client SDK**: `@supabase/supabase-js` tích hợp đồng bộ 2 chiều (Local $\leftrightarrow$ Cloud).
- **Hosting Ready**: Vercel / GitHub Pages / XAMPP Apache.

---

## 🚀 Hướng Dẫn Chạy Cục Bộ (Local Development)

```bash
# Sử dụng PHP server tích hợp
php -S localhost:8080

# Hoặc dùng bất kỳ static server nào (Node / Python / Live Server)
python -m http.server 8080
```
Truy cập: `http://localhost:8080/#/`

---

## 🗄️ Cấu Trúc Thư Mục

```text
├── assets/
│   ├── css/            # style.css, variables.css
│   ├── images/         # Ảnh thực tế chim mồi, sân vườn, sổ tay
│   └── js/
│       ├── app.js      # Logic SPA, Render views, Modals
│       ├── data.js     # Data engine & Seed fallback
│       ├── router.js   # Hash-based SPA Router
│       ├── supabase-client.js # Supabase Cloud adapter
│       └── audio-ambiance.js  # Hệ thống âm thanh thiên nhiên
├── database/
│   ├── supabase_schema.sql  # DDL PostgreSQL Supabase
│   ├── supabase_seed.sql    # Dữ liệu mẫu thực chiến
│   ├── migrate_supabase.py  # Script migration tự động
│   ├── schema.sql           # Schema MySQL (XAMPP dự phòng)
│   ├── seed.sql             # Seed data MySQL
│   ├── DATABASE_DESIGN.md   # Tài liệu thiết kế ERD & Data Dictionary
│   └── SUPABASE_SETUP.md    # Hướng dẫn chi tiết kết nối Supabase
├── index.html          # Khung ứng dụng chính
├── vercel.json         # Cấu hình triển khai Vercel
├── .env.example        # Mẫu biến môi trường
└── README.md
```

---

## 📜 Giấy Phép & Bản Quyền

© 2026 Sổ Tay Chọn Chim Cu Gáy. Phát triển vì đam mê gìn giữ thú chơi dân gian thanh tao và góc nhìn thực chiến mộc mạc.
