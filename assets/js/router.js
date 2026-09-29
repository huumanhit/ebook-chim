/**
 * Client-Side Router cho Sổ Tay Cu Gáy (HTML5 History API)
 * Hỗ trợ URL phẳng sạch KHÔNG có dấu # (Clean URLs):
 * - /
 * - /quan-diem, /cach-nhin-chim, /tien-va-hau, /thuc-chien, /nhung-lan-chon-sai, /nhat-ky, /gioi-thieu, /so-tay-ebook
 * - /bai-viet/:slug (Chi tiết bài viết)
 * - /cong-dong (Thư viện quan điểm cộng đồng)
 * - /u/:username (Hồ sơ người chơi chim)
 * - /viet-bai (Tạo bài viết chia sẻ quan điểm)
 * - /them-chim (Tạo hồ sơ cá thể chim mới)
 * - /chim/:id (Hồ sơ cá thể chim & dòng thời gian thực chiến)
 * - /quan-tri (Bảng kiểm duyệt nội dung & thành viên)
 * Tự động xóa dấu # nếu người dùng truy cập link cũ có #
 */

class Router {
  constructor(routes) {
    this.routes = routes;
    this.appRoot = document.getElementById("app-root");
    this.init();
  }

  init() {
    // 1. Lắng nghe sự kiện quay lại / tới của trình duyệt (Back/Forward)
    window.addEventListener("popstate", () => this.handleRoute());
    window.addEventListener("hashchange", () => this.handleRoute());

    // 2. Chặn các cú nhấp chuột vào link nội bộ để điều hướng mượt mà không tải lại trang
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Bỏ qua liên kết ngoài, mailto, tel, hoặc javascript:
      if (
        href.startsWith("http://") || 
        href.startsWith("https://") || 
        href.startsWith("mailto:") || 
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        link.getAttribute("target") === "_blank"
      ) {
        return;
      }

      // Chuẩn hóa đường dẫn: xóa bỏ dấu # nếu có
      let cleanPath = href;
      if (cleanPath.startsWith("#/")) {
        cleanPath = cleanPath.slice(1); // #/quan-diem -> /quan-diem
      } else if (cleanPath.startsWith("#")) {
        cleanPath = "/" + cleanPath.slice(1);
      }

      if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;

      e.preventDefault();
      this.navigate(cleanPath);
    });

    // 3. Khởi chạy route đầu tiên
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", () => this.handleRoute());
    } else {
      this.handleRoute();
    }
  }

  navigate(path) {
    if (window.location.pathname !== path || window.location.hash) {
      window.history.pushState(null, "", path);
    }
    this.handleRoute();
  }

  getRouteParts() {
    // Nếu URL có dấu hash (#/nhung-lan-chon-sai), tự động xóa sạch hash và thay bằng URL phẳng
    if (window.location.hash) {
      let hashRoute = window.location.hash.slice(1);
      if (hashRoute.startsWith("/")) hashRoute = hashRoute.slice(1);
      const cleanPath = "/" + hashRoute;
      window.history.replaceState(null, "", cleanPath);
      return hashRoute.split("/").filter(Boolean);
    }

    // Đọc đường dẫn từ window.location.pathname
    let path = window.location.pathname || "/";

    // Loại bỏ index.html nếu có
    if (path.endsWith("index.html")) {
      path = path.replace(/index\.html$/, "");
    }
    // Hỗ trợ subfolder khi chạy cục bộ XAMPP (vd: /cu-gay-guide/)
    if (path.startsWith("/cu-gay-guide")) {
      path = path.replace(/^\/cu-gay-guide/, "");
    }

    if (path.startsWith("/")) path = path.slice(1);
    if (path.endsWith("/")) path = path.slice(0, -1);

    return path.split("/").filter(Boolean);
  }

  handleRoute() {
    const parts = this.getRouteParts();
    const currentRouteKey = parts[0] || "home";

    // Cập nhật active class trên menu
    document.querySelectorAll(".nav-link").forEach(link => {
      const linkHref = (link.getAttribute("href") || "").replace(/^#\/?/, "").replace(/^\//, "");
      const linkKey = linkHref.split("/")[0] || "home";
      if (linkKey === currentRouteKey || (linkKey === "" && currentRouteKey === "home")) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Cập nhật active class trên mobile quick nav pills
    document.querySelectorAll(".quick-nav-pill").forEach(link => {
      const linkHref = (link.getAttribute("href") || "").replace(/^#\/?/, "").replace(/^\//, "");
      const linkKey = linkHref.split("/")[0] || "home";
      if (linkKey === currentRouteKey || (linkKey === "" && currentRouteKey === "home")) {
        link.classList.add("active");
        try {
          link.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        } catch (e) {}
      } else {
        link.classList.remove("active");
      }
    });

    // Cập nhật widget thông tin người dùng ở header
    if (typeof updateHeaderUserWidget === "function") {
      updateHeaderUserWidget();
    }

    // Đóng mobile menu nếu đang mở
    const nav = document.getElementById("site-nav");
    if (nav) nav.classList.remove("open");

    // Route: Bài viết chi tiết /bai-viet/:slug
    if (parts[0] === "bai-viet" && parts[1]) {
      if (typeof renderArticleDetailView === "function") {
        this.appRoot.innerHTML = renderArticleDetailView(parts[1]);
        if (typeof initArticleDetailEvents === "function") {
          initArticleDetailEvents(parts[1]);
        }
      }
      window.scrollTo(0, 0);
      return;
    }

    // Route: Hồ sơ người chơi /u/:username
    if (parts[0] === "u" && parts[1]) {
      if (typeof renderUserProfileView === "function") {
        this.appRoot.innerHTML = renderUserProfileView(parts[1]);
        if (typeof initUserProfileEvents === "function") {
          initUserProfileEvents(parts[1]);
        }
      }
      window.scrollTo(0, 0);
      return;
    }

    // Route: Hồ sơ cá thể chim /chim/:id
    if (parts[0] === "chim" && parts[1]) {
      if (typeof renderBirdDetailView === "function") {
        this.appRoot.innerHTML = renderBirdDetailView(parts[1]);
        if (typeof initBirdDetailEvents === "function") {
          initBirdDetailEvents(parts[1]);
        }
      }
      window.scrollTo(0, 0);
      return;
    }

    // Các routes chính khác
    if (this.routes[currentRouteKey]) {
      this.appRoot.innerHTML = this.routes[currentRouteKey]();
      window.scrollTo(0, 0);
      this.afterRender(currentRouteKey);
    } else {
      // Nếu không khớp, quay về trang chủ
      this.navigate("/");
    }
  }

  afterRender(routeKey) {
    if (routeKey === "home" || routeKey === "tien-va-hau") {
      if (typeof initTimelineInteractivity === "function") initTimelineInteractivity();
    } else if (routeKey === "cach-nhin-chim") {
      if (typeof initCriteriaFilters === "function") initCriteriaFilters();
    } else if (routeKey === "cong-dong") {
      if (typeof initCommunityFeedEvents === "function") initCommunityFeedEvents();
    } else if (routeKey === "viet-bai") {
      if (typeof initCreateArticleEvents === "function") initCreateArticleEvents();
    } else if (routeKey === "them-chim") {
      if (typeof initCreateBirdEvents === "function") initCreateBirdEvents();
    } else if (routeKey === "quan-tri") {
      if (typeof initAdminModerationEvents === "function") initAdminModerationEvents();
    }
  }
}

window.Router = Router;
