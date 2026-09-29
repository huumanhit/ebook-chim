"""
KỊCH BẢN CHẠY MIGRATION TỰ ĐỘNG LÊN SUPABASE POSTGRESQL
Dự án: fowwdgzbmuwhmuujuaii (AWS ap-southeast-1)
Chạy: python database/migrate_supabase.py [PASSWORD]
"""

import sys
import os
import io
import re
import psycopg2

# Đảm bảo in tiếng Việt không bị lỗi font trên Windows console
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

PROJECT_ID = "fowwdgzbmuwhmuujuaii"
HOST = "aws-0-ap-southeast-1.pooler.supabase.com"
PORT = 5432 # Session mode direct for DDL & migrations
DBNAME = "postgres"
USER = f"postgres.{PROJECT_ID}"

def get_password():
    # 1. Từ đối số dòng lệnh
    if len(sys.argv) > 1 and sys.argv[1].strip():
        return sys.argv[1].strip()
    
    # 2. Từ file .env
    env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            content = f.read()
            # Tìm trong DATABASE_URL hoặc DIRECT_URL
            m = re.search(r'postgres\.[^:]+:([^@]+)@', content)
            if m and m.group(1) != "[YOUR-PASSWORD]":
                return m.group(1)
            # Tìm biến DB_PASSWORD hoặc SUPABASE_DB_PASS
            m_pass = re.search(r'(?:DB_PASSWORD|SUPABASE_DB_PASS|PASSWORD)\s*=\s*["\']?([^"\'\r\n]+)', content)
            if m_pass:
                return m_pass.group(1).strip()
    return None

def run_migration():
    password = get_password()
    if not password or password == "[YOUR-PASSWORD]":
        print("\n[!] CHƯA CÓ MẬT KHẨU SUPABASE DATABASE:")
        print("  Do trong chuỗi kết nối bạn gửi có chứa `[YOUR-PASSWORD]` (mật khẩu ẩn của Supabase).")
        print("  Vui lòng chạy lại với mật khẩu:")
        print("    python database/migrate_supabase.py <MAT_KHAU_CUA_BAN>\n")
        sys.exit(1)

    print(f"[*] Đang kết nối tới Supabase PostgreSQL ({HOST}:{PORT})...")
    try:
        import urllib.parse
        encoded_pass = urllib.parse.quote(password, safe='')
        uri = f"postgresql://postgres.{PROJECT_ID}:{encoded_pass}@{HOST}:{PORT}/{DBNAME}"
        conn = psycopg2.connect(uri)
        conn.autocommit = True
        cur = conn.cursor()
        print("[+] Kết nối thành công tới Supabase PostgreSQL Cloud!")

        # 1. Chạy Schema
        schema_path = os.path.join(os.path.dirname(__file__), "supabase_schema.sql")
        print(f"[*] Đang thực thi tệp {schema_path}...")
        with open(schema_path, "r", encoding="utf-8") as f:
            schema_sql = f.read()
        cur.execute(schema_sql)
        print("[+] Đã tạo 10 bảng, ENUMs, RLS policies, và Triggers thành công!")

        # 2. Chạy Seed Data
        seed_path = os.path.join(os.path.dirname(__file__), "supabase_seed.sql")
        print(f"[*] Đang nạp dữ liệu thực chiến mẫu từ {seed_path}...")
        with open(seed_path, "r", encoding="utf-8") as f:
            seed_sql = f.read()
        cur.execute(seed_sql)
        print("[+] Đã nạp dữ liệu thực chiến mẫu thành công!")

        # 3. Kiểm tra số lượng bản ghi
        tables = ['users', 'user_criteria', 'birds', 'bird_timelines', 'articles', 'comments', 'reactions', 'follows', 'bookmarks', 'reports']
        print("\n=== KẾT QUẢ KIỂM TRA TRÊN SUPABASE CLOUD ===")
        for t in tables:
            cur.execute(f"SELECT COUNT(*) FROM public.{t};")
            count = cur.fetchone()[0]
            print(f"  ✓ Bảng public.{t:<16}: {count} bản ghi")

        cur.close()
        conn.close()

        # Cập nhật file .env với password thật
        env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
        if os.path.exists(env_path):
            with open(env_path, "r", encoding="utf-8") as f:
                env_text = f.read()
            env_text = env_text.replace("[YOUR-PASSWORD]", password)
            with open(env_path, "w", encoding="utf-8") as f:
                f.write(env_text)
            print("[+] Đã lưu mật khẩu vào file .env")

        print("\n🎉 TOÀN BỘ DATABASE SUPABASE ĐÃ ĐƯỢC CHẠY VÀ KÍCH HOẠT XONG!")

    except psycopg2.OperationalError as e:
        print(f"\n[-] LỖI XÁC THỰC KẾT NỐI:")
        print(f"  {e}")
        print("  -> Vui lòng kiểm tra lại mật khẩu Database bạn đã đặt khi tạo project trên Supabase.")
        sys.exit(1)
    except Exception as e:
        print(f"\n[-] LỖI THỰC THI SQL: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_migration()
