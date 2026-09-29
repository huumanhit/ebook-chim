/**
 * Client-Side Router cho Cu-Gay-Guide
 * Hỗ trợ Hash routing:
 * - #/, #/quan-diem, #/cach-nhin-chim, #/tien-va-hau, #/thuc-chien, #/nhung-lan-chon-sai, #/nhat-ky, #/gioi-thieu, #/so-tay-ebook
 * - #/bai-viet/:slug (Chi tiết bài viết)
 * - #/cong-dong (Thư viện quan điểm cộng đồng)
 * - #/u/:username (Hồ sơ người chơi chim)
 * - #/viet-bai (Tạo bài viết chia sẻ quan điểm)
 * - #/them-chim (Tạo hồ sơ cá thể chim mới)
 * - #/chim/:id (Hồ sơ cá thể chim & dòng thời gian thực chiến)
 * - #/quan-tri (Bảng kiểm duyệt nội dung & thành viên)
 */

class Router {
  constructor(routes) {
    this.routes = routes;
    this.appRoot = document.getElementById("app-root");
    this.init();
  }

  init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", () => this.handleRoute());
    } else {
      this.handleRoute();
    }
  }

  handleRoute() {
    let hash = window.location.hash.slice(1) || "/";
    if (hash.startsWith("/")) hash = hash.slice(1);
    const parts = hash.split("/").filter(Boolean);

    // Cập nhật active class trên menu
    document.querySelectorAll(".nav-link").forEach(link => {
      const linkHash = link.getAttribute("href")?.replace("#/", "").replace("#", "") || "";
      const currentMain = parts[0] || "";
      if (linkHash === currentMain || (linkHash === "" && currentMain === "")) {
        link.classList.add("active");
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

    // Route: Bài viết chi tiết #/bai-viet/:slug
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

    // Route: Hồ sơ người chơi #/u/:username
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

    // Route: Hồ sơ cá thể chim #/chim/:id
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

    // Các routes khác
    const routeKey = parts[0] || "home";
    if (this.routes[routeKey]) {
      this.appRoot.innerHTML = this.routes[routeKey]();
      window.scrollTo(0, 0);
      this.afterRender(routeKey);
    } else {
      // 404 về Home
      window.location.hash = "#/";
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
