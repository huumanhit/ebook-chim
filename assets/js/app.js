/**
 * Ứng Dụng Sổ Tay Chọn Chim Cu Gáy (app.js)
 * Tinh thần: "Không dạy bạn chọn chim. Chỉ cho bạn cách tôi nhìn một con chim."
 * Mở rộng: Section 20 - Thư viện quan điểm cộng đồng & Hồ sơ người chơi chim
 */

// ==========================================================
// 1. ROUTE DEFINITIONS
// ==========================================================
const routes = {
  // 1.1 TRANG CHỦ
  home: () => {
    document.title = `${SITE_DATA.info.title} - ${SITE_DATA.info.subtitle}`;
    const allPublishedArticles = CUGAY_DB.getArticles("all");
    return `
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-grid">
            <div class="hero-content">
              <span class="hero-eyebrow"><i class="fas fa-feather-alt"></i> Sổ Tay Ghi Chép & Thư Viện Quan Điểm</span>
              <h1 class="hero-title">CÁCH TÔI CHỌN MỘT CON CU GÁY</h1>
              <div class="hero-subtitle">
                "Không dạy bạn chọn chim.<br>
                Chỉ cho bạn cách tôi nhìn một con chim."
              </div>
              <div class="hero-ctas">
                <a href="#/cong-dong" class="btn-primary">
                  <i class="fas fa-users"></i> Thư viện cộng đồng
                </a>
                <a href="#/quan-diem" class="btn-secondary">
                  <i class="fas fa-compass"></i> Góc nhìn tác giả
                </a>
              </div>
              <div class="intro-quote-bar">
                <p>"Chọn một con cu gáy không phải lúc nào cũng bắt đầu từ một bộ mã đẹp. Có những thứ nhìn thấy được, có những thứ phải nghe, phải chơi và phải trải qua thời gian mới hiểu."</p>
              </div>
            </div>
            <div class="hero-visual">
              <div class="hero-image-frame">
                <img src="./assets/images/hero-dove.jpg" alt="Chim Cu Gáy Cườm">
                <div class="hero-image-badge">
                  <span><i class="fas fa-map-marker-alt"></i> Cội rừng tràm Trảng Bom</span>
                  <span>Mồi cội Thổ Sấm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Triết lý & Nguyên tắc cốt tử -->
      <section class="philosophy-section">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Gốc Rễ Cuộc Chơi</span>
            <h2 class="section-title">Năm Điều Tôi Luôn Tự Nhắc Mình</h2>
            <p class="section-desc">Trước khi mở lồng bẫy hoặc xuống tiền mua một con chim, tôi luôn đem 5 điều này ra tự vấn.</p>
          </div>
          <div class="philosophy-grid">
            <div class="philosophy-card">
              <div class="card-num">01</div>
              <h3>Quan điểm cá nhân</h3>
              <p>Mỗi người chơi có một đôi tai thẩm âm và một thú chơi riêng. Không có khuôn mẫu áp đặt cho tất cả.</p>
            </div>
            <div class="philosophy-card">
              <div class="card-num">02</div>
              <h3>Không có chân lý tuyệt đối</h3>
              <p>Mọi câu ca dao, sách vở chỉ là kinh nghiệm đúc kết. Thiên nhiên luôn ẩn chứa những trường hợp ngoại lệ bất ngờ.</p>
            </div>
            <div class="philosophy-card">
              <div class="card-num">03</div>
              <h3>Chim đẹp chưa chắc đánh hay</h3>
              <p>Tướng mạo lộng lẫy chỉ là chiếc áo choàng. Thần kinh và độ lỳ lợm trước hiểm nguy mới làm nên chiến binh.</p>
            </div>
            <div class="philosophy-card">
              <div class="card-num">04</div>
              <h3>Chim bình thường chưa hẳn vô giá trị</h3>
              <p>Một con bổi cườm hở, lông xơ xác nếu có nước Hậu bền bỉ và ánh mắt sắc lẹm vẫn là viên ngọc thô đáng quý.</p>
            </div>
            <div class="philosophy-card">
              <div class="card-num">05</div>
              <h3>Thực chiến là thước đo duy nhất</h3>
              <p>Khoảng cách giữa cái lồng ở hiên nhà và tàn cây rừng già là thước đo công tâm nhất cho tài năng của chim mồi.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- TIỀN & HẬU Interactive Timeline Teaser -->
      <section class="timeline-section">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Trọng Tâm Đánh Giá</span>
            <h2 class="section-title">Tiền & Hậu: Dòng Thời Gian Trận Đấu</h2>
            <p class="section-desc">Một trận đấu cu gáy không đơn giản là gáy qua gáy lại, mà là một ván cờ tâm lý qua từng giai đoạn thời gian.</p>
          </div>
          <div class="battle-timeline-card">
            <div class="timeline-nav" id="timeline-nav-container">
              ${SITE_DATA.timelineStages.map((stage, idx) => `
                <button class="timeline-step-btn ${idx === 0 ? 'active' : ''}" onclick="selectTimelineStep(${stage.step})">
                  <span class="step-number">Bước ${stage.step}</span>
                  <span class="step-name">${stage.name}</span>
                  <span class="step-tag">${stage.tag}</span>
                </button>
              `).join("")}
            </div>
            <div id="timeline-detail-display" class="timeline-detail-box">
              <!-- Dynamic by JS -->
            </div>
          </div>
        </div>
      </section>

      <!-- 16 Tiêu Chí: Cách Nhìn Chim Teaser -->
      <section class="criteria-section">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Nhận Diện Thực Tế</span>
            <h2 class="section-title">16 Tiêu Chí Tôi Quan Sát Ở Một Con Chim</h2>
            <p class="section-desc">Không nói chuyện hay dở tuyệt đối. Chỉ nói tôi nhìn gì, ưu tiên gì, bỏ qua gì và thực chiến đã dạy tôi điều gì.</p>
          </div>
          <div class="criteria-grid">
            ${SITE_DATA.criteria.slice(0, 8).map(c => `
              <div class="criterion-card" onclick="openCriteriaModal('${c.id}')">
                <div>
                  <div class="criterion-header">
                    <span class="criterion-cat">${c.category}</span>
                    <div class="criterion-icon"><i class="fas ${c.icon}"></i></div>
                  </div>
                  <h3 class="criterion-name">${c.name}</h3>
                  <p class="criterion-summary">${c.shortSummary}</p>
                </div>
                <div class="criterion-footer-link">
                  <span>Mở góc nhìn chi tiết</span> <i class="fas fa-arrow-right"></i>
                </div>
              </div>
            `).join("")}
          </div>
          <div style="text-align: center; margin-top: 2.5rem;">
            <a href="#/cach-nhin-chim" class="btn-secondary">
              <i class="fas fa-th-large"></i> Xem toàn bộ 16 tiêu chí chi tiết
            </a>
          </div>
        </div>
      </section>

      <!-- Thư Viện Quan Điểm Mới Nhất -->
      <section class="articles-section">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Thư Viện Quan Điểm Mới</span>
            <h2 class="section-title">Góc Nhìn Từ Tác Giả & Cộng Đồng</h2>
            <p class="section-desc">Nơi lưu giữ những trải nghiệm mộc mạc và những góc nhìn đa chiều về cách thẩm định chim.</p>
          </div>
          <div class="articles-grid">
            ${allPublishedArticles.slice(0, 3).map(a => renderArticleCard(a)).join("")}
          </div>
          <div style="text-align: center; margin-top: 2.5rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="#/cong-dong" class="btn-primary">
              <i class="fas fa-users"></i> Khám phá Thư viện Cộng đồng
            </a>
            <a href="#/viet-bai" class="btn-secondary">
              <i class="fas fa-pen-nib"></i> Đăng bài chia sẻ góc nhìn của bạn
            </a>
          </div>
        </div>
      </section>

      <!-- Những Lần Chọn Sai Teaser -->
      <section class="mistakes-section">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Học Phí Đi Rừng</span>
            <h2 class="section-title">Những Lần Xuống Tiền & Đánh Giá Sai</h2>
            <p class="section-desc">Tôi không chỉ kể về những con chim hay. Đây là những vết sẹo và học phí đắt giá trong hành trình chơi chim của tôi.</p>
          </div>
          <div style="max-width: 840px; margin: 0 auto;">
            ${SITE_DATA.mistakes.slice(0, 2).map(m => renderMistakeCard(m)).join("")}
            <div style="text-align: center; margin-top: 2rem;">
              <a href="#/nhung-lan-chon-sai" class="btn-secondary">
                <i class="fas fa-history"></i> Xem đủ 5 câu chuyện chọn sai & bài học
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Banner Cộng Đồng Văn Hóa -->
      <section style="background: var(--wood-main); color: #FAF6ED; padding: 4rem 0; text-align: center;">
        <div class="reading-container">
          <span style="display: inline-block; font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.8; margin-bottom: 0.5rem;">
            Văn Hóa Thưởng Thức
          </span>
          <h2 style="color: #FAF6ED; font-size: 2.2rem; margin-bottom: 1rem;">Mỗi Người Một Cách Nhìn Riêng</h2>
          <p style="font-size: 1.05rem; opacity: 0.9; margin-bottom: 2rem;">
            Không có con chim nào hoàn hảo tuyệt đối cho mọi người. Hãy tạo hồ sơ lưu lại quá trình thực chiến của chú chim bạn yêu quý và chia sẻ tiêu chí của riêng mình.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="#/them-chim" class="btn-primary" style="background: #FAF6ED; color: var(--wood-dark); border-color: #FAF6ED;">
              <i class="fas fa-feather"></i> Tạo hồ sơ chim của bạn
            </a>
            <a href="#/cong-dong" class="btn-secondary" style="background: transparent; color: #FAF6ED; border-color: rgba(250, 246, 237, 0.4);">
              <i class="fas fa-book-open"></i> Xem thư viện người chơi
            </a>
          </div>
        </div>
      </section>
    `;
  },

  // 1.2 CHUYÊN MỤC QUAN ĐIỂM (Tác Giả)
  "quan-diem": () => {
    document.title = `Góc Nhìn Của Tôi | ${SITE_DATA.info.title}`;
    const authorArticles = CUGAY_DB.getArticles("author");
    return `
      <section class="articles-section" style="padding-top: 3.5rem;">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Góc Nhìn Của Tôi</span>
            <h2 class="section-title">Sổ Tay Quan Điểm Cá Nhân</h2>
            <p class="section-desc">Tập hợp những bài viết đúc kết từ nhiều năm dầm mưa dãi nắng của tôi. Nhấn mạnh: đây là quan điểm riêng, không phải chân lý tuyệt đối.</p>
          </div>
          <div class="articles-grid">
            ${authorArticles.map(a => renderArticleCard(a)).join("")}
          </div>
          <div style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-subtle);">
            <p style="font-style: italic; color: var(--text-muted); margin-bottom: 1rem;">Bạn có góc nhìn khác? Hãy chia sẻ vào thư viện cộng đồng.</p>
            <a href="#/viet-bai" class="btn-primary"><i class="fas fa-pen-nib"></i> Viết bài chia sẻ góc nhìn của bạn</a>
          </div>
        </div>
      </section>
    `;
  },

  // 1.3 16 TIÊU CHÍ NHÌN CHIM
  "cach-nhin-chim": () => {
    document.title = `16 Tiêu Chí Cách Nhìn Chim | ${SITE_DATA.info.title}`;
    return `
      <section class="criteria-section" style="padding-top: 3.5rem;">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Hệ Thống Thẩm Định</span>
            <h2 class="section-title">16 Tiêu Chí Tôi Quan Sát Ở Một Con Chim</h2>
            <p class="section-desc">Cấu trúc chuẩn 5 phần: Tôi nhìn gì • Ưu tiên • Bỏ qua • Thực chiến • Quan điểm cá nhân.</p>
          </div>

          <!-- Category Filter Bar -->
          <div class="criteria-filter-bar">
            <button class="filter-btn active" onclick="filterCriteria('all', this)">Tất cả (16)</button>
            <button class="filter-btn" onclick="filterCriteria('Ngoại hình & Khí chất', this)">Ngoại hình & Khí chất</button>
            <button class="filter-btn" onclick="filterCriteria('Giọng & Nước Gù', this)">Giọng & Nước Gù</button>
            <button class="filter-btn" onclick="filterCriteria('Nước Chơi & Độ Bền', this)">Nước Chơi & Độ Bền</button>
          </div>

          <div class="criteria-grid" id="criteria-full-grid">
            ${SITE_DATA.criteria.map(c => `
              <div class="criterion-card" data-cat="${c.category}" onclick="openCriteriaModal('${c.id}')">
                <div>
                  <div class="criterion-header">
                    <span class="criterion-cat">${c.category}</span>
                    <div class="criterion-icon"><i class="fas ${c.icon}"></i></div>
                  </div>
                  <h3 class="criterion-name">${c.name}</h3>
                  <p class="criterion-summary">${c.shortSummary}</p>
                </div>
                <div class="criterion-footer-link">
                  <span>Mở góc nhìn chi tiết</span> <i class="fas fa-arrow-right"></i>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  },

  // 1.4 TIỀN VÀ HẬU
  "tien-va-hau": () => {
    document.title = `Nghệ Thuật Tiền & Hậu | ${SITE_DATA.info.title}`;
    return `
      <section class="timeline-section" style="padding-top: 3.5rem;">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Cốt Lõi Thẩm Định</span>
            <h2 class="section-title">Tiền & Hậu: Hai Cực Của Một Con Chim Mồi</h2>
            <p class="section-desc">Tiền cho sự hưng phấn, nhưng Hậu mới là thứ quyết định giá trị bền lâu của một đời chim mồi.</p>
          </div>

          <div class="battle-timeline-card">
            <div class="timeline-nav" id="timeline-nav-container">
              ${SITE_DATA.timelineStages.map((stage, idx) => `
                <button class="timeline-step-btn ${idx === 0 ? 'active' : ''}" onclick="selectTimelineStep(${stage.step})">
                  <span class="step-number">Bước ${stage.step}</span>
                  <span class="step-name">${stage.name}</span>
                  <span class="step-tag">${stage.tag}</span>
                </button>
              `).join("")}
            </div>
            <div id="timeline-detail-display" class="timeline-detail-box"></div>
          </div>

          <!-- So sánh sâu sắc Tiền vs Hậu -->
          <div class="tien-hau-compare-grid" style="margin-top: 4rem;">
            <div class="compare-card">
              <div class="compare-head" style="background: rgba(184, 80, 66, 0.1); color: var(--terracotta);">
                <i class="fas fa-bolt"></i> Nước TIỀN (Khởi Đầu Trận)
              </div>
              <div class="compare-body">
                <h4>Ý nghĩa & Điểm mạnh:</h4>
                <p>Nước Tiền thể hiện sự xông xáo, háo chiến và khả năng định hướng lãnh địa nhanh chóng. Chim Tiền tốt giúp bắt bổi nhanh trong 10-15 phút đầu.</p>
                <h4>Cạm bẫy người chơi hay mắc:</h4>
                <p>Quá say sưa vào những tiếng gù rát mặt ban đầu mà không để ý con chim có bị hụt hơi ở những hiệp sau hay không. Chim chỉ có Tiền mà không có Hậu giống như pháo hoa rực rỡ nhưng chóng tắt.</p>
              </div>
            </div>

            <div class="compare-card">
              <div class="compare-head" style="background: rgba(139, 107, 73, 0.15); color: var(--wood-dark);">
                <i class="fas fa-mountain"></i> Nước HẬU (Giữ Nước Đường Dài)
              </div>
              <div class="compare-body">
                <h4>Ý nghĩa & Điểm mạnh:</h4>
                <p>Nước Hậu là linh hồn của con chim mồi cội. Sau 30-45 phút giằng co căng thẳng dưới nắng trưa, chim vẫn giữ được nhịp, biết gáy dặm để xoa dịu rồi lại siết gù kết liễu.</p>
                <h4>Khó khăn khi tìm kiếm:</h4>
                <p>Hậu không thể kiểm tra trong vài phút nuôi lồng ở nhà. Chỉ có những trận đối đầu sinh tử với bổi già ngoài rừng mới trui rèn và chứng thực được nước Hậu.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  // 1.5 THỰC CHIẾN
  "thuc-chien": () => {
    document.title = `Nhật Ký Thực Chiến | ${SITE_DATA.info.title}`;
    return `
      <section class="articles-section" style="padding-top: 3.5rem;">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Thước Đo Duy Nhất</span>
            <h2 class="section-title">Nhật Ký Những Kèo Gác Rừng</h2>
            <p class="section-desc">Khoảng cách giữa cái lồng son hiên nhà và cành cây rừng già là thước đo công tâm nhất cho tài năng của chim mồi.</p>
          </div>
          <div style="max-width: 860px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem;">
            ${SITE_DATA.fieldLogs.map(log => `
              <div class="field-log-card">
                <div class="field-log-header">
                  <span class="field-log-tag"><i class="fas fa-tree"></i> Thực Địa</span>
                  <span class="field-log-date"><i class="far fa-calendar-alt"></i> ${log.date} &nbsp;•&nbsp; <i class="fas fa-map-marker-alt"></i> ${log.location}</span>
                </div>
                <h3 class="field-log-title">${log.title}</h3>
                <p class="field-log-summary">${log.summary}</p>
                <div class="field-log-takeaway">
                  <i class="fas fa-quote-left"></i>
                  <span>${log.takeaway}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  },

  // 1.6 NHỮNG LẦN CHỌN SAI
  "nhung-lan-chon-sai": () => {
    document.title = `Những Lần Chọn Sai | ${SITE_DATA.info.title}`;
    return `
      <section class="mistakes-section" style="padding-top: 3.5rem;">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Học Phí Đi Rừng</span>
            <h2 class="section-title">Năm Lần Xuống Tiền & Đánh Giá Sai Lầm</h2>
            <p class="section-desc">Không giấu giếm thất bại. Đây là những lần tôi phải trả giá bằng tiền bạc, thời gian và sự ngây thơ.</p>
          </div>
          <div style="max-width: 840px; margin: 0 auto;">
            ${SITE_DATA.mistakes.map(m => renderMistakeCard(m)).join("")}
          </div>
        </div>
      </section>
    `;
  },

  // 1.7 TIẾN TRÌNH CÁ THỂ CHIM (Nhật ký tác giả)
  "nhat-ky": () => {
    document.title = `Tiến Trình Cá Thể Chim | ${SITE_DATA.info.title}`;
    const authorBirds = CUGAY_DB.getBirds("user_author");
    return `
      <section class="journal-section" style="padding-top: 3.5rem;">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Theo Dõi Dài Lâu</span>
            <h2 class="section-title">Hồ Sơ & Sự Phát Triển Của Từng Cá Thể</h2>
            <p class="section-desc">Đánh giá một con chim là một hành trình qua thời gian, không bao giờ là một khoảnh khắc cố định.</p>
          </div>
          <div class="bird-profile-list">
            ${authorBirds.map(bird => renderBirdCardSummary(bird)).join("")}
          </div>
          <div style="text-align: center; margin-top: 3rem;">
            <a href="#/them-chim" class="btn-primary"><i class="fas fa-plus"></i> Tạo hồ sơ cho chú chim của bạn</a>
          </div>
        </div>
      </section>
    `;
  },

  // 1.8 GIỚI THIỆU
  "gioi-thieu": () => {
    document.title = `Về Người Ghi Chép | ${SITE_DATA.info.title}`;
    return `
      <section class="author-page-section" style="padding-top: 3.5rem;">
        <div class="reading-container">
          <div class="section-head" style="text-align: left; margin-bottom: 2rem;">
            <span class="section-tag">Người Đứng Sau Cuốn Sổ Tay</span>
            <h2 class="section-title">Tôi Là Ai Và Vì Sao Tôi Viết Trang Này?</h2>
          </div>
          <div class="author-dossier-card">
            <div class="author-avatar-frame">
              <img src="./assets/images/hero-dove.jpg" alt="Tác giả">
            </div>
            <div>
              <h3 style="margin-bottom: 0.35rem; color: var(--wood-main); font-size: 1.6rem;">Người Mê Cu Gáy Rừng</h3>
              <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
                <i class="fas fa-map-marker-alt"></i> Vùng Đông Nam Bộ (Đồng Nai - Bình Phước - Bình Dương) &nbsp;•&nbsp; 
                <i class="fas fa-history"></i> Hơn 12 năm dãi nắng dầm sương
              </p>
              <div style="font-family: var(--font-serif); font-size: 1.15rem; font-style: italic; color: var(--text-heading); border-left: 3px solid var(--brass); padding-left: 1rem; margin-bottom: 1.5rem;">
                "Tôi không tìm kiếm con chim hoàn hảo của thiên hạ. Tôi tìm con chim hiểu tôi và hợp với cách tôi chơi."
              </div>
            </div>
          </div>
          <div class="article-body-content" style="margin-top: 2rem;">
            <p>Tôi lập ra trang web này không phải để bán chim, cũng không phải để dạy dỗ ai cách chọn chim. Ở đời, không có ai đủ tư cách làm thầy trong bộ môn cu gáy, bởi thiên nhiên luôn có cách làm chúng ta ngỡ ngàng.</p>
            <p>Nay trang web được mở rộng thành một <strong>Thư viện quan điểm của người chơi</strong>, nơi bất kỳ ai cũng có thể ghi lại hồ sơ chú chim của mình và chia sẻ góc nhìn chân thật sau những chuyến đi rừng.</p>
          </div>
        </div>
      </section>
    `;
  },

  // 1.9 EBOOK BẢN IN
  "so-tay-ebook": () => {
    document.title = `Sổ Tay Toàn Tập (Bản Đọc & In) | ${SITE_DATA.info.title}`;
    return `
      <section class="ebook-viewer">
        <div class="reading-container">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <a href="#/" class="article-back-link"><i class="fas fa-arrow-left"></i> Quay lại trang chủ</a>
            <button class="btn-primary" onclick="window.print()">
              <i class="fas fa-print"></i> In sổ tay / Lưu PDF
            </button>
          </div>
          <div class="ebook-paper">
            <span class="ebook-watermark">BẢN THẢO THỰC CHIẾN • 2026</span>
            <div style="text-align: center; border-bottom: 2px solid var(--wood-border); padding-bottom: 2.5rem; margin-bottom: 3rem;">
              <h1 style="font-size: 2.8rem; margin-bottom: 0.5rem; color: var(--text-heading);">SỔ TAY CHỌN CHIM CU GÁY</h1>
              <p style="font-family: var(--font-serif); font-size: 1.3rem; font-style: italic; color: var(--wood-main); margin-bottom: 1.5rem;">
                "Không dạy bạn chọn chim. Chỉ cho bạn cách tôi nhìn một con chim."
              </p>
              <div style="font-size: 0.85rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 2px;">
                Đúc kết kinh nghiệm & Thẩm định thực chiến
              </div>
            </div>
            <h2>MỤC LỤC SỔ TAY</h2>
            <ol style="margin: 1.5rem 0 3rem; padding-left: 1.5rem; line-height: 2;">
              <li><strong>Phần I:</strong> Triết lý & Năm điều tự vấn trước cuộc chơi</li>
              <li><strong>Phần II:</strong> Tiền & Hậu - Hai cực của một con chim mồi</li>
              <li><strong>Phần III:</strong> 16 Tiêu chí thẩm định từng bộ phận</li>
              <li><strong>Phần IV:</strong> Năm lần xuống tiền & Đánh giá sai lầm</li>
              <li><strong>Phần V:</strong> Thư viện quan điểm & Hồ sơ thực chiến cộng đồng</li>
            </ol>
            <hr style="border: none; border-top: 1px dashed var(--wood-border); margin: 3rem 0;">
            <h2>PHẦN I: NĂM ĐIỀU TỰ VẤN</h2>
            <p>1. Quan điểm cá nhân: Tôi nhìn con chim theo gu chơi của tôi, không áp đặt cho bất kỳ ai.</p>
            <p>2. Không có chân lý tuyệt đối: Mọi tiêu chí sách vở đều có trường hợp ngoại lệ trong thiên nhiên hoang dã.</p>
            <p>3. Chim đẹp chưa chắc đánh hay: Tướng mạo chỉ là cái vỏ; thần kinh và độ lỳ lợm mới làm nên chim cội.</p>
            <p>4. Chim bình thường vẫn có giá trị: Đừng chê con bổi lông xơ xác hay cườm hở ngực trước khi thấy nó vào gù.</p>
            <p>5. Thực chiến là thước đo duy nhất: Mọi sự thẩm định phải trả lời dưới tàn cây rừng già.</p>
          </div>
        </div>
      </section>
    `;
  },

  // 1.10 THƯ VIỆN CỘNG ĐỒNG (Community Feed - Section 20.9)
  "cong-dong": () => {
    document.title = `Thư Viện Quan Điểm Cộng Đồng | ${SITE_DATA.info.title}`;
    return renderCommunityFeedView("all");
  },

  // 1.11 VIẾT BÀI MỚI (Section 20.3)
  "viet-bai": () => {
    document.title = `Viết Bài Chia Sẻ Quan Điểm | ${SITE_DATA.info.title}`;
    return renderCreateArticleView();
  },

  // 1.12 TẠO HỒ SƠ CHIM (Section 20.4)
  "them-chim": () => {
    document.title = `Tạo Hồ Sơ Cá Thể Chim | ${SITE_DATA.info.title}`;
    return renderCreateBirdView();
  },

  // 1.13 QUẢN TRỊ KIỂM DUYỆT (Section 20.11)
  "quan-tri": () => {
    document.title = `Kiểm Duyệt Sổ Tay & Thành Viên | ${SITE_DATA.info.title}`;
    return renderAdminModerationView();
  }
};

// ==========================================================
// 2. COMMUNITY FEED VIEW RENDERER (Section 20.9 & 20.12)
// ==========================================================
let currentCommunityFilter = "all";

function renderCommunityFeedView(filter = "all") {
  currentCommunityFilter = filter;
  const articles = CUGAY_DB.getArticles(filter);
  const birds = CUGAY_DB.getBirds();
  const currentUser = CUGAY_DB.getCurrentUser();

  return `
    <div class="community-page">
      <div class="container">

        <!-- Community Principles Banner (Section 20.12) -->
        <div class="community-principles-banner">
          <div class="principles-badge"><i class="fas fa-balance-scale"></i> Nguyên Tắc Cộng Đồng</div>
          <h2 class="principles-title">"Mỗi người có một cách nhìn chim khác nhau"</h2>
          <p class="principles-text">
            Website không cố tìm ra một tiêu chuẩn duy nhất để chọn cu gáy. 
            Hãy chia sẻ điều bạn đã thấy, điều bạn đã chơi và điều bạn đã trải qua. 
            Phân biệt rõ giữa <strong>kinh nghiệm cá nhân</strong> và <strong>khẳng định tuyệt đối</strong>.
          </p>
          <div class="principles-notice">
            <i class="fas fa-info-circle"></i> Ưu tiên trao đổi chân thành, không xếp hạng điểm số, không phân định thắng thua.
          </div>
        </div>

        <!-- Action Bar: Write article / Add bird -->
        <div class="community-action-bar">
          <div class="feed-headline">
            <h3><i class="fas fa-book-reader"></i> Thư Viện Quan Điểm</h3>
            <span>Đang hiển thị ${articles.length} bài viết chia sẻ thực tế</span>
          </div>
          <div class="feed-btn-group">
            <a href="#/viet-bai" class="btn-primary">
              <i class="fas fa-pen-nib"></i> Viết bài chia sẻ
            </a>
            <a href="#/them-chim" class="btn-secondary">
              <i class="fas fa-feather"></i> Tạo hồ sơ chim
            </a>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="feed-filter-bar">
          <button class="filter-pill ${filter === 'all' ? 'active' : ''}" onclick="applyCommunityFilter('all')">
            <i class="fas fa-globe"></i> Tất cả
          </button>
          <button class="filter-pill ${filter === 'author' ? 'active' : ''}" onclick="applyCommunityFilter('author')">
            <i class="fas fa-feather-alt"></i> Góc nhìn tác giả
          </button>
          <button class="filter-pill ${filter === 'community' ? 'active' : ''}" onclick="applyCommunityFilter('community')">
            <i class="fas fa-users"></i> Góc nhìn cộng đồng
          </button>
          <button class="filter-pill ${filter === 'thuc-chien' ? 'active' : ''}" onclick="applyCommunityFilter('thuc-chien')">
            <i class="fas fa-tree"></i> Thực chiến
          </button>
          <button class="filter-pill ${filter === 'tien-hau' ? 'active' : ''}" onclick="applyCommunityFilter('tien-hau')">
            <i class="fas fa-hourglass-half"></i> Tiền & Hậu
          </button>
          <button class="filter-pill ${filter === 'birds' ? 'active' : ''}" onclick="applyCommunityFilter('birds')">
            <i class="fas fa-dove"></i> Hồ sơ đàn chim (${birds.length})
          </button>
        </div>

        <!-- Content Grid or Bird Grid -->
        ${filter === 'birds' ? `
          <div class="bird-profile-list" style="margin-top: 2rem;">
            ${birds.map(b => renderBirdCardSummary(b)).join("")}
          </div>
        ` : `
          <div class="articles-grid" style="margin-top: 2rem;">
            ${articles.length === 0 ? `
              <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                <i class="fas fa-feather" style="font-size: 2.5rem; opacity: 0.3; margin-bottom: 1rem; display: block;"></i>
                Chưa có bài viết nào trong danh mục này. Hãy là người đầu tiên chia sẻ!
              </div>
            ` : articles.map(a => renderCommunityArticleCard(a)).join("")}
          </div>
        `}

      </div>
    </div>
  `;
}

function applyCommunityFilter(filterKey) {
  const container = document.getElementById("app-root");
  if (container) {
    container.innerHTML = renderCommunityFeedView(filterKey);
    window.scrollTo(0, 300);
  }
}

function initCommunityFeedEvents() {
  // Feed events
}

// ==========================================================
// 3. ARTICLE CARD RENDERERS (Distinguish Author vs Community)
// ==========================================================
function renderCommunityArticleCard(article) {
  const author = CUGAY_DB.getUserById(article.authorId) || { displayName: article.authorName, username: "tacgia", avatar: "./assets/images/hero-dove.jpg" };
  const isBookmarked = CUGAY_DB.isBookmarked("article", article.id);
  const comments = CUGAY_DB.getComments(article.id);
  const reactions = article.reactions || { thich: 0, huuIch: 0, dongDieu: 0 };
  const userReact = CUGAY_DB.getUserReaction("article", article.id);

  // Badge: Tác giả vs Cộng đồng (Section 20.10)
  const badgeHtml = article.isAuthor 
    ? `<span class="badge-author"><i class="fas fa-feather-alt"></i> Tác giả</span>`
    : `<span class="badge-community"><i class="fas fa-users"></i> Cộng đồng</span>`;

  const pendingNotice = article.status === "pending" 
    ? `<span class="badge-pending"><i class="fas fa-clock"></i> Chờ duyệt</span>`
    : "";

  return `
    <article class="article-card community-feed-card">
      <div class="card-img-wrapper">
        <img src="${article.coverImage}" alt="${article.title}" loading="lazy">
        <span class="card-cat-badge">${article.category}</span>
        <span class="card-reading-time"><i class="far fa-clock"></i> ${article.readingTime}</span>
      </div>

      <div class="card-body">
        <!-- Author info bar -->
        <div class="feed-card-author-bar">
          <a href="#/u/${author.username}" class="author-avatar-link" title="Xem hồ sơ ${author.displayName}">
            <img src="${author.avatar || './assets/images/hero-dove.jpg'}" alt="${author.displayName}">
            <span>${author.displayName}</span>
          </a>
          <div style="display: flex; gap: 0.35rem; align-items: center;">
            ${badgeHtml}
            ${pendingNotice}
          </div>
        </div>

        <span class="card-date"><i class="far fa-calendar-alt"></i> ${article.publishedAt}</span>

        <h3 class="card-title">
          <a href="#/bai-viet/${article.slug}">${article.title}</a>
        </h3>

        <!-- Core perspective quote -->
        ${article.myPerspective ? `
          <div class="card-perspective-quote">
            <i class="fas fa-quote-left"></i>
            <span>${article.myPerspective}</span>
          </div>
        ` : ''}

        <p class="card-excerpt">${article.excerpt}</p>

        <!-- Linked Bird chip if present -->
        ${article.linkedBirdId ? renderLinkedBirdBadge(article.linkedBirdId) : ''}

        <div class="card-tags">
          ${article.tags.map(t => `<span class="tag-badge">#${t}</span>`).join("")}
        </div>

        <!-- Reaction & Action Bar (Section 20.8) -->
        <div class="feed-card-actions">
          <div class="reaction-pill-group">
            <button class="feed-reaction-btn ${userReact === 'thich' ? 'active' : ''}" 
                    onclick="handleQuickReaction('article', '${article.id}', 'thich')" title="Thích">
              👍 <span class="react-count">${reactions.thich || 0}</span>
            </button>
            <button class="feed-reaction-btn ${userReact === 'huuIch' ? 'active' : ''}" 
                    onclick="handleQuickReaction('article', '${article.id}', 'huuIch')" title="Hữu ích">
              💡 <span class="react-count">${reactions.huuIch || 0}</span>
            </button>
            <button class="feed-reaction-btn ${userReact === 'dongDieu' ? 'active' : ''}" 
                    onclick="handleQuickReaction('article', '${article.id}', 'dongDieu')" title="Có kinh nghiệm tương tự">
              🤝 <span class="react-count">${reactions.dongDieu || 0}</span>
            </button>
          </div>

          <div class="card-meta-actions">
            <a href="#/bai-viet/${article.slug}#discussion" class="comment-count-btn" title="Thảo luận thực chiến">
              <i class="far fa-comment-dots"></i> ${comments.length}
            </a>
            <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                    onclick="handleToggleBookmark('article', '${article.id}')" title="Lưu bài viết">
              <i class="${isBookmarked ? 'fas' : 'far'} fa-bookmark"></i>
            </button>
          </div>
        </div>

        <a href="#/bai-viet/${article.slug}" class="card-read-more">
          <span>Xem chi tiết bài viết</span> <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </article>
  `;
}

function renderArticleCard(article) {
  return renderCommunityArticleCard(article);
}

function renderLinkedBirdBadge(birdId) {
  const bird = CUGAY_DB.getBirdById(birdId);
  if (!bird) return "";
  return `
    <div class="linked-bird-chip" onclick="location.hash='#/chim/${bird.id}'">
      <i class="fas fa-feather-alt"></i> Hồ sơ chim gắn kèm: <strong>${bird.name}</strong> (${bird.voice || bird.type})
    </div>
  `;
}

function renderMistakeCard(mistake) {
  return `
    <div class="mistake-card">
      <div class="mistake-top-row">
        <div class="mistake-meta">Năm ${mistake.year} &nbsp;|&nbsp; Cá thể: ${mistake.birdCode}</div>
        <span class="mistake-stamp">Bài Học Thực Chiến</span>
      </div>
      <h3 class="mistake-title">${mistake.title}</h3>
      <span class="mistake-cost"><i class="fas fa-exclamation-triangle"></i> Giá phải trả: ${mistake.cost}</span>
      <p class="mistake-story">${mistake.story}</p>
      <div class="mistake-takeaway">
        <i class="fas fa-lightbulb" style="color: var(--brass); margin-right: 0.35rem;"></i>
        <strong>Đúc kết lại:</strong> ${mistake.takeaway}
      </div>
    </div>
  `;
}

function renderBirdCardSummary(bird) {
  const owner = CUGAY_DB.getUserById(bird.ownerId) || { displayName: "Người chơi", username: "tacgia" };
  const isBookmarked = CUGAY_DB.isBookmarked("bird", bird.id);
  const latestStage = bird.timeline && bird.timeline.length ? bird.timeline[bird.timeline.length - 1] : null;

  return `
    <div class="bird-profile-card">
      <div class="bird-card-head">
        <div class="bird-avatar-frame">
          <img src="${bird.image || './assets/images/hero-dove.jpg'}" alt="${bird.name}">
        </div>
        <div class="bird-header-meta">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
            <h3 class="bird-name">
              <a href="#/chim/${bird.id}">${bird.name}</a>
            </h3>
            <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                    onclick="handleToggleBookmark('bird', '${bird.id}')" title="Lưu hồ sơ chim">
              <i class="${isBookmarked ? 'fas' : 'far'} fa-bookmark"></i>
            </button>
          </div>
          <div class="bird-type-tag"><i class="fas fa-feather"></i> ${bird.type} &nbsp;•&nbsp; ${bird.voice || 'Thổ đồng'}</div>
          <div class="bird-owner-line">
            Người sở hữu: <a href="#/u/${owner.username}"><strong>${owner.displayName}</strong></a> 
            ${bird.age ? `• Tuổi lồng: ${bird.age}` : ''}
          </div>
        </div>
      </div>

      <div class="bird-card-body">
        <div class="bird-status-line">
          <span class="status-badge"><i class="fas fa-shield-alt"></i> ${bird.status || 'Đang theo dõi'}</span>
          <span style="font-size: 0.85rem; color: var(--text-light);"><i class="fas fa-history"></i> ${bird.timeline ? bird.timeline.length : 0} mốc thời gian</span>
        </div>

        <p class="bird-initial-note">
          <strong>Quan điểm ban đầu:</strong> ${bird.initialAssessment || 'Chưa ghi chú'}
        </p>

        ${latestStage ? `
          <div class="bird-latest-timeline-snapshot">
            <span class="snapshot-label"><i class="fas fa-clock"></i> Cập nhật gần nhất (${latestStage.time} - ${latestStage.stage}):</span>
            <p>${latestStage.note}</p>
          </div>
        ` : ''}

        <div class="bird-card-footer">
          <a href="#/chim/${bird.id}" class="btn-secondary" style="font-size: 0.85rem; padding: 0.45rem 0.9rem;">
            <i class="fas fa-stream"></i> Xem dòng thời gian đầy đủ (${bird.timeline ? bird.timeline.length : 0} bước)
          </a>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================
// 4. USER PROFILE DOSSIER VIEW (Section 20.2 & 20.5 & 20.6)
// ==========================================================
let currentProfileTab = "articles";

function renderUserProfileView(username) {
  const user = CUGAY_DB.getUserByUsername(username);
  if (!user) {
    return `
      <div class="reading-container" style="padding: 6rem 1rem; text-align: center;">
        <h2>Không tìm thấy hồ sơ người chơi</h2>
        <p style="color: var(--text-muted); margin: 1rem 0 2rem;">Tài khoản này có thể đã đổi tên hoặc chưa đăng ký trên sổ tay.</p>
        <a href="#/cong-dong" class="btn-primary">Quay lại Thư viện cộng đồng</a>
      </div>
    `;
  }

  document.title = `${user.displayName} (@${user.username}) | Hồ Sơ Người Chơi Cu Gáy`;
  const currentUser = CUGAY_DB.getCurrentUser();
  const isMe = currentUser && currentUser.id === user.id;
  const isFollowing = currentUser ? CUGAY_DB.isFollowing(user.id) : false;
  const followersCount = CUGAY_DB.getFollowersCount(user.id);
  const followingCount = CUGAY_DB.getFollowingCount(user.id);

  // User articles and birds
  const userArticles = CUGAY_DB.getArticles("all").filter(a => a.authorId === user.id);
  const userBirds = CUGAY_DB.getBirds(user.id);
  const bookmarks = CUGAY_DB.getUserBookmarks(user.id);
  const followingUsers = CUGAY_DB.getFollowingList(user.id);

  return `
    <div class="profile-page">
      <div class="container">
        <!-- Keeper Dossier Header (Section 20.2) -->
        <div class="keeper-dossier-card">
          <div class="keeper-dossier-grid">
            <div class="keeper-avatar-wrap">
              <img src="${user.avatar || './assets/images/hero-dove.jpg'}" alt="${user.displayName}">
              ${user.role === 'admin' 
                ? `<span class="keeper-role-badge"><i class="fas fa-feather-alt"></i> Tác giả / Admin</span>`
                : `<span class="keeper-role-badge user"><i class="fas fa-user-check"></i> Người chơi</span>`
              }
            </div>

            <div class="keeper-info-wrap">
              <div class="keeper-headline-line">
                <div>
                  <h1 class="keeper-name">${user.displayName}</h1>
                  <span class="keeper-username">@${user.username}</span>
                </div>
                <div class="keeper-actions-top">
                  ${isMe ? `
                    <button class="btn-secondary" onclick="openProfileEditModal()" style="font-size: 0.88rem; padding: 0.5rem 1rem;">
                      <i class="fas fa-edit"></i> Chỉnh sửa hồ sơ
                    </button>
                  ` : `
                    <button class="btn-primary follow-toggle-btn ${isFollowing ? 'following' : ''}" 
                            onclick="handleProfileFollowToggle('${user.id}')" style="font-size: 0.88rem; padding: 0.5rem 1.25rem;">
                      <i class="fas ${isFollowing ? 'fa-check' : 'fa-plus'}"></i> ${isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
                    </button>
                    <button class="btn-secondary" onclick="openReportModal('user', '${user.id}', 'Người chơi: ${user.displayName}')" title="Báo cáo tài khoản">
                      <i class="fas fa-flag"></i>
                    </button>
                  `}
                </div>
              </div>

              <!-- Signature Quote -->
              <blockquote class="keeper-signature-quote">
                <i class="fas fa-quote-left"></i>
                <span>"${user.quote || 'Tôi không tìm con chim đẹp nhất. Tôi tìm con chim hợp cách chơi của mình.'}"</span>
              </blockquote>

              <p class="keeper-bio">${user.bio || 'Chưa cập nhật phần giới thiệu cá nhân.'}</p>

              <!-- Meta specs -->
              <div class="keeper-meta-strip">
                <span><i class="far fa-calendar-alt"></i> Tham gia: ${user.createdAt || '2024'}</span>
                ${user.experienceYears ? `<span><i class="fas fa-history"></i> Kinh nghiệm: <strong>${user.experienceYears} năm</strong></span>` : ''}
                ${user.location ? `<span><i class="fas fa-map-marker-alt"></i> Vùng cội: <strong>${user.location}</strong></span>` : ''}
                <span><i class="fas fa-users"></i> <strong>${followersCount}</strong> người theo dõi</span>
                <span><i class="fas fa-user-friends"></i> Đang theo dõi <strong>${followingCount}</strong></span>
              </div>
            </div>
          </div>
        </div>

        <!-- 4 Profile Dossier Tabs -->
        <div class="profile-tabs-nav">
          <button class="profile-tab-btn ${currentProfileTab === 'articles' ? 'active' : ''}" onclick="switchProfileTab('articles')">
            <i class="fas fa-book-open"></i> Bài viết & Quan điểm (${userArticles.length})
          </button>
          <button class="profile-tab-btn ${currentProfileTab === 'birds' ? 'active' : ''}" onclick="switchProfileTab('birds')">
            <i class="fas fa-feather"></i> Đàn chim thực chiến (${userBirds.length})
          </button>
          <button class="profile-tab-btn ${currentProfileTab === 'criteria' ? 'active' : ''}" onclick="switchProfileTab('criteria')">
            <i class="fas fa-sliders-h"></i> Tiêu chí của tôi
          </button>
          <button class="profile-tab-btn ${currentProfileTab === 'saved' ? 'active' : ''}" onclick="switchProfileTab('saved')">
            <i class="fas fa-bookmark"></i> Đã lưu & Theo dõi
          </button>
        </div>

        <!-- Tab 1: Articles Content -->
        <div class="profile-tab-content ${currentProfileTab === 'articles' ? 'active' : ''}" id="tab-articles">
          ${userArticles.length === 0 ? `
            <div class="empty-tab-state">
              <i class="fas fa-pen-nib"></i>
              <p>Người chơi này chưa đăng bài viết nào.</p>
              ${isMe ? `<a href="#/viet-bai" class="btn-primary" style="margin-top: 1rem;"><i class="fas fa-plus"></i> Viết bài đầu tiên</a>` : ''}
            </div>
          ` : `
            <div class="articles-grid">
              ${userArticles.map(a => renderCommunityArticleCard(a)).join("")}
            </div>
          `}
        </div>

        <!-- Tab 2: Birds Content -->
        <div class="profile-tab-content ${currentProfileTab === 'birds' ? 'active' : ''}" id="tab-birds">
          ${userBirds.length === 0 ? `
            <div class="empty-tab-state">
              <i class="fas fa-dove"></i>
              <p>Chưa có cá thể chim nào được tạo hồ sơ.</p>
              ${isMe ? `<a href="#/them-chim" class="btn-primary" style="margin-top: 1rem;"><i class="fas fa-plus"></i> Thêm hồ sơ chim của bạn</a>` : ''}
            </div>
          ` : `
            <div class="bird-profile-list">
              ${userBirds.map(b => renderBirdCardSummary(b)).join("")}
            </div>
          `}
        </div>

        <!-- Tab 3: Personal Criteria Matrix (Section 20.5) -->
        <div class="profile-tab-content ${currentProfileTab === 'criteria' ? 'active' : ''}" id="tab-criteria">
          <div class="personal-criteria-card">
            <div class="criteria-card-head">
              <h3><i class="fas fa-sliders-h"></i> Bảng Tiêu Chí Nhìn Chim Của ${user.displayName}</h3>
              <p>
                Không dùng hệ thống điểm để xác định chim nào "hay nhất".<br>
                Mục đích chỉ là giúp người đọc hiểu: <strong>"Người này nhìn chim theo cách nào?"</strong>
              </p>
            </div>

            <div class="criteria-table-wrap">
              <table class="criteria-importance-table">
                <thead>
                  <tr>
                    <th>Tiêu chí thẩm định</th>
                    <th>Mức độ quan tâm</th>
                    <th>Ghi chú góc nhìn</th>
                  </tr>
                </thead>
                <tbody>
                  ${renderCriteriaRow("Giọng (Kim, Thổ, Chuông...)", user.criteria?.giong || "Cao", "Thẩm âm, độ rền vang và cảm xúc khi nghe")}
                  ${renderCriteriaRow("Tiền (Vào nước ban đầu)", user.criteria?.tien || "Cao", "Khả năng thúc rước, kéo bổi vào cành thế")}
                  ${renderCriteriaRow("Hậu (Giữ nước & Lỳ đòn)", user.criteria?.hau || "Rất cao", "Độ dai dẳng sau 35-45 phút, không xìu chim")}
                  ${renderCriteriaRow("Bộ mã (Cườm, lông, đuôi)", user.criteria?.boMa || "Trung bình", "Hình thức bên ngoài; đẹp nhưng không tuyệt đối")}
                  ${renderCriteriaRow("Chân (Vảy, móng, độ bám)", user.criteria?.chan || "Thấp", "Độ khô ráo và bám cầu, không duy tâm vảy")}
                  ${renderCriteriaRow("Thần thái (Khí phách, điềm đạm)", user.criteria?.thanThai || "Rất cao", "Ánh mắt, độ tĩnh tâm, bản lĩnh trước hiểm nguy")}
                  ${renderCriteriaRow("Độ bền (Thể lực & Năm tháng)", user.criteria?.doBen || "Rất cao", "Chơi qua nhiều mùa rừng, không bị bể mồi")}
                </tbody>
              </table>
            </div>

            ${isMe ? `
              <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-parchment); border-radius: var(--radius-sm); border: 1px dashed var(--border-subtle);">
                <h4 style="margin-bottom: 0.5rem; color: var(--wood-main);"><i class="fas fa-sliders-h"></i> Tùy chỉnh mức độ quan tâm của bạn:</h4>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">Bạn có thể thay đổi mức độ quan trọng cho các tiêu chí để phản ánh đúng gu chơi hiện tại của mình.</p>
                <form id="edit-criteria-form" onsubmit="handleSavePersonalCriteria(event)">
                  <div class="criteria-edit-grid">
                    ${renderCriteriaSelect("giong", "Giọng", user.criteria?.giong || "Cao")}
                    ${renderCriteriaSelect("tien", "Tiền", user.criteria?.tien || "Cao")}
                    ${renderCriteriaSelect("hau", "Hậu", user.criteria?.hau || "Rất cao")}
                    ${renderCriteriaSelect("boMa", "Bộ mã", user.criteria?.boMa || "Trung bình")}
                    ${renderCriteriaSelect("chan", "Chân & Móng", user.criteria?.chan || "Thấp")}
                    ${renderCriteriaSelect("thanThai", "Thần thái", user.criteria?.thanThai || "Rất cao")}
                    ${renderCriteriaSelect("doBen", "Độ bền", user.criteria?.doBen || "Rất cao")}
                  </div>
                  <button type="submit" class="btn-primary" style="margin-top: 1rem;">
                    <i class="fas fa-save"></i> Cập nhật bộ tiêu chí của tôi
                  </button>
                </form>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Tab 4: Saved & Following (Section 20.6) -->
        <div class="profile-tab-content ${currentProfileTab === 'saved' ? 'active' : ''}" id="tab-saved">
          <div class="saved-items-grid">
            <div>
              <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: var(--wood-main);">
                <i class="fas fa-user-friends"></i> Đang theo dõi (${followingUsers.length})
              </h3>
              ${followingUsers.length === 0 ? `
                <p style="color: var(--text-muted); font-size: 0.92rem; font-style: italic;">Chưa theo dõi người chơi nào.</p>
              ` : `
                <div class="following-user-chips">
                  ${followingUsers.map(u => `
                    <a href="#/u/${u.username}" class="following-chip">
                      <img src="${u.avatar || './assets/images/hero-dove.jpg'}" alt="${u.displayName}">
                      <div>
                        <strong>${u.displayName}</strong>
                        <span>@${u.username}</span>
                      </div>
                    </a>
                  `).join("")}
                </div>
              `}
            </div>

            <div>
              <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: var(--wood-main);">
                <i class="fas fa-bookmark"></i> Bài viết đã lưu (${bookmarks.articles.length})
              </h3>
              ${bookmarks.articles.length === 0 ? `
                <p style="color: var(--text-muted); font-size: 0.92rem; font-style: italic;">Chưa lưu bài viết nào.</p>
              ` : `
                <div class="saved-articles-mini-list">
                  ${bookmarks.articles.map(a => `
                    <div class="saved-mini-item">
                      <a href="#/bai-viet/${a.slug}">${a.title}</a>
                      <span>${a.category} • ${a.publishedAt}</span>
                    </div>
                  `).join("")}
                </div>
              `}

              <h3 style="font-size: 1.25rem; margin: 2rem 0 1rem; color: var(--wood-main);">
                <i class="fas fa-feather-alt"></i> Hồ sơ chim đã lưu (${bookmarks.birds.length})
              </h3>
              ${bookmarks.birds.length === 0 ? `
                <p style="color: var(--text-muted); font-size: 0.92rem; font-style: italic;">Chưa lưu hồ sơ chim nào.</p>
              ` : `
                <div class="saved-articles-mini-list">
                  ${bookmarks.birds.map(b => `
                    <div class="saved-mini-item">
                      <a href="#/chim/${b.id}">${b.name}</a>
                      <span>${b.type} • ${b.voice || 'Thổ đồng'}</span>
                    </div>
                  `).join("")}
                </div>
              `}
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

function renderCriteriaRow(name, level, desc) {
  const levelClasses = {
    "Rất cao": "level-very-high",
    "Cao": "level-high",
    "Trung bình": "level-medium",
    "Thấp": "level-low"
  };
  const cls = levelClasses[level] || "level-medium";
  return `
    <tr>
      <td><strong>${name}</strong></td>
      <td><span class="criteria-pill ${cls}">${level}</span></td>
      <td style="color: var(--text-muted); font-size: 0.88rem;">${desc}</td>
    </tr>
  `;
}

function renderCriteriaSelect(nameKey, label, currentVal) {
  const options = ["Rất cao", "Cao", "Trung bình", "Thấp"];
  return `
    <div class="criteria-select-item">
      <label>${label}</label>
      <select name="${nameKey}" class="custom-select">
        ${options.map(opt => `<option value="${opt}" ${opt === currentVal ? 'selected' : ''}>${opt}</option>`).join("")}
      </select>
    </div>
  `;
}

function switchProfileTab(tabKey) {
  currentProfileTab = tabKey;
  document.querySelectorAll(".profile-tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".profile-tab-content").forEach(content => content.classList.remove("active"));

  const targetTab = document.getElementById(`tab-${tabKey}`);
  if (targetTab) targetTab.classList.add("active");

  const clickedBtn = Array.from(document.querySelectorAll(".profile-tab-btn")).find(b => b.getAttribute("onclick")?.includes(tabKey));
  if (clickedBtn) clickedBtn.classList.add("active");
}

function handleProfileFollowToggle(targetUserId) {
  const isNowFollowing = CUGAY_DB.toggleFollow(targetUserId);
  showToast(isNowFollowing ? "Đã theo dõi người chơi này" : "Đã hủy theo dõi");
  // Re-render
  const user = CUGAY_DB.getUserById(targetUserId);
  if (user) {
    document.getElementById("app-root").innerHTML = renderUserProfileView(user.username);
  }
}

function handleSavePersonalCriteria(e) {
  e.preventDefault();
  const form = e.target;
  const currentUser = CUGAY_DB.getCurrentUser();
  const newCriteria = {
    giong: form.giong.value,
    tien: form.tien.value,
    hau: form.hau.value,
    boMa: form.boMa.value,
    chan: form.chan.value,
    thanThai: form.thanThai.value,
    doBen: form.doBen.value
  };

  CUGAY_DB.updateUserCriteria(currentUser.id, newCriteria);
  showToast("Đã lưu bộ tiêu chí quan tâm của bạn!");
  document.getElementById("app-root").innerHTML = renderUserProfileView(currentUser.username);
}

function initUserProfileEvents() {
  // ready
}

// ==========================================================
// 5. BIRD DOSSIER & TIMELINE VIEW (Section 20.4)
// ==========================================================
function renderBirdDetailView(birdId) {
  const bird = CUGAY_DB.getBirdById(birdId);
  if (!bird) {
    return `
      <div class="reading-container" style="padding: 6rem 1rem; text-align: center;">
        <h2>Không tìm thấy hồ sơ cá thể chim</h2>
        <p style="color: var(--text-muted); margin: 1rem 0 2rem;">Hồ sơ này có thể đã bị xóa hoặc dời đi.</p>
        <a href="#/cong-dong" class="btn-primary">Quay lại Thư viện cộng đồng</a>
      </div>
    `;
  }

  document.title = `${bird.name} | Hồ Sơ Cá Thể Chim Thực Chiến`;
  const owner = CUGAY_DB.getUserById(bird.ownerId) || { displayName: "Người chơi", username: "tacgia" };
  const currentUser = CUGAY_DB.getCurrentUser();
  const isOwner = currentUser && currentUser.id === bird.ownerId;
  const isBookmarked = CUGAY_DB.isBookmarked("bird", bird.id);

  return `
    <div class="bird-detail-page">
      <div class="container">
        <a href="#/cong-dong" class="article-back-link"><i class="fas fa-arrow-left"></i> Trở về Thư viện quan điểm</a>

        <!-- Bird Dossier Banner -->
        <div class="bird-dossier-header-card">
          <div class="bird-dossier-top-grid">
            <div class="bird-dossier-image">
              <img src="${bird.image || './assets/images/hero-dove.jpg'}" alt="${bird.name}">
            </div>
            <div class="bird-dossier-main-info">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
                <div>
                  <span class="bird-tag-eyebrow"><i class="fas fa-shield-alt"></i> Hồ Sơ Thực Chiến Cá Thể</span>
                  <h1 class="bird-dossier-name">${bird.name}</h1>
                  <div class="bird-dossier-submeta">
                    <span><i class="fas fa-music"></i> Giọng: <strong>${bird.voice || 'Thổ đồng rền'}</strong></span>
                    <span><i class="fas fa-tag"></i> Loại: <strong>${bird.type}</strong></span>
                    ${bird.age ? `<span><i class="fas fa-hourglass-start"></i> Tuổi lồng: <strong>${bird.age}</strong></span>` : ''}
                    ${bird.origin ? `<span><i class="fas fa-map-marked-alt"></i> Xuất xứ: <strong>${bird.origin}</strong></span>` : ''}
                  </div>
                </div>
                <div>
                  <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                          onclick="handleToggleBookmark('bird', '${bird.id}')" title="Lưu hồ sơ chim này">
                    <i class="${isBookmarked ? 'fas' : 'far'} fa-bookmark"></i> Lưu hồ sơ chim
                  </button>
                </div>
              </div>

              <!-- Owner Line -->
              <div class="bird-dossier-owner-bar">
                <a href="#/u/${owner.username}" class="author-avatar-link">
                  <img src="${owner.avatar || './assets/images/hero-dove.jpg'}" alt="${owner.displayName}">
                  <span>Chủ sở hữu: <strong>${owner.displayName}</strong> (@${owner.username})</span>
                </a>
                <span class="bird-current-status-chip">${bird.status || 'Mồi cội chiến đấu'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3-Phase Assessment Overview (Initial -> Field -> Current) -->
        <div class="bird-evolution-tri-grid">
          <div class="tri-card initial">
            <span class="tri-tag"><i class="fas fa-hourglass-start"></i> 1. Quan Điểm Ban Đầu</span>
            <p>${bird.initialAssessment || 'Chưa ghi chú nhận định ban đầu khi mới bẫy hoặc nhận chim về.'}</p>
          </div>
          <div class="tri-card field">
            <span class="tri-tag"><i class="fas fa-tree"></i> 2. Thực Chiến Rừng Già</span>
            <p>${bird.fieldExperience || 'Chưa ghi chú các trận đánh thử lửa ngoài cội rậm.'}</p>
          </div>
          <div class="tri-card current">
            <span class="tri-tag"><i class="fas fa-check-circle"></i> 3. Đánh Giá Hiện Tại</span>
            <p>${bird.currentAssessment || 'Đang tiếp tục theo dõi qua từng mùa thay lông.'}</p>
          </div>
        </div>

        <!-- Dynamic Multi-stage Evolution Timeline (Section 20.4) -->
        <div class="bird-timeline-section">
          <div class="timeline-header-bar">
            <div>
              <h3><i class="fas fa-stream"></i> Dòng Thời Gian Thực Chiến Qua Năm Tháng</h3>
              <p>Ngày bắt đầu → Đánh giá ban đầu → Thực chiến → Cập nhật → Đánh giá hiện tại</p>
            </div>
          </div>

          <div class="bird-journey-timeline">
            ${(bird.timeline || []).map((step, idx) => `
              <div class="journey-item">
                <div class="journey-badge-col">
                  <div class="journey-badge">${idx + 1}</div>
                  <div class="journey-line"></div>
                </div>
                <div class="journey-card">
                  <div class="journey-meta-line">
                    <span class="journey-stage-tag">${step.stage}</span>
                    <span class="journey-time"><i class="far fa-calendar-alt"></i> ${step.time}</span>
                  </div>
                  <p class="journey-note">${step.note}</p>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Add Timeline Entry Form (Owner only) -->
          ${isOwner ? `
            <div class="add-timeline-entry-box">
              <h4><i class="fas fa-plus-circle"></i> Thêm Cột Mốc Mới Vào Quá Trình Nuôi Dưỡng</h4>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">
                Ghi chép lại một chuyến đi rừng, một lần bổi già ép hoặc sự thay đổi trong nước gáy của chú chim.
              </p>
              <form onsubmit="handleAddTimelineMilestone(event, '${bird.id}')">
                <div class="form-row-2">
                  <div class="form-group">
                    <label>Thời gian / Giai đoạn</label>
                    <input type="text" id="new-stage-time" placeholder="Ví dụ: Tháng 09/2026 hoặc Trận cội thứ 15" required>
                  </div>
                  <div class="form-group">
                    <label>Tên cột mốc</label>
                    <input type="text" id="new-stage-name" placeholder="Ví dụ: Cập nhật sau mùa mưa, Thử lửa cội mới..." required>
                  </div>
                </div>
                <div class="form-group">
                  <label>Ghi chú quan sát & bài học</label>
                  <textarea id="new-stage-note" rows="3" placeholder="Chi tiết sự biến chuyển trong tiếng gáy, phản xạ hoặc bài bản của chim..." required></textarea>
                </div>
                <button type="submit" class="btn-primary" style="align-self: flex-start;">
                  <i class="fas fa-save"></i> Lưu cột mốc vào timeline
                </button>
              </form>
            </div>
          ` : ''}
        </div>

      </div>
    </div>
  `;
}

function handleAddTimelineMilestone(e, birdId) {
  e.preventDefault();
  const time = document.getElementById("new-stage-time")?.value.trim();
  const stage = document.getElementById("new-stage-name")?.value.trim();
  const note = document.getElementById("new-stage-note")?.value.trim();

  if (!stage || !note) return;

  CUGAY_DB.addBirdTimeline(birdId, { time, stage, note });
  showToast("Đã bổ sung cột mốc mới vào dòng thời gian của chim!");
  document.getElementById("app-root").innerHTML = renderBirdDetailView(birdId);
}

function initBirdDetailEvents() {
  // ready
}

// ==========================================================
// 6. CREATE ARTICLE VIEW (Section 20.3 & 20.10 & 20.11)
// ==========================================================
function renderCreateArticleView() {
  const currentUser = CUGAY_DB.getCurrentUser();
  const userBirds = CUGAY_DB.getBirds(currentUser.id);
  const isAdmin = currentUser.role === "admin";

  return `
    <div class="create-content-page">
      <div class="reading-container">
        <a href="#/cong-dong" class="article-back-link"><i class="fas fa-arrow-left"></i> Trở về Thư viện quan điểm</a>

        <div class="form-header-card">
          <span class="hero-eyebrow"><i class="fas fa-pen-nib"></i> Thư Viện Quan Điểm Mộc Mạc</span>
          <h1 style="font-size: 2.2rem; margin: 0.5rem 0 1rem; color: var(--text-heading);">Viết Bài Chia Sẻ Góc Nhìn</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
            Hãy chia sẻ kinh nghiệm thật từ cành bẫy và đôi tai thẩm âm của bạn. 
            Mọi bài viết xuất phát từ tình yêu mộc mạc với chim cu gáy đều có giá trị quý báu.
          </p>

          <div class="moderation-info-box">
            <i class="fas fa-shield-alt" style="color: var(--wood-main); font-size: 1.25rem;"></i>
            <div>
              <strong>Cơ chế duyệt bài (Section 20.11):</strong>
              <p style="margin: 0.25rem 0 0; font-size: 0.88rem; color: var(--text-muted);">
                ${isAdmin 
                  ? 'Bạn đang đăng bài với tư cách <strong>Tác giả / Quản trị viên</strong> (bài viết sẽ được xuất bản ngay lập tức kèm huy hiệu Tác giả).'
                  : 'Để giữ vững tinh thần mộc mạc và tôn trọng, bài viết của người chơi sau khi gửi sẽ có trạng thái <strong>Chờ duyệt (Pending)</strong>. Ban quản trị sẽ duyệt nhanh chóng để đưa vào Thư viện cộng đồng.'
                }
              </p>
            </div>
          </div>
        </div>

        <form id="create-article-form" onsubmit="handleCreateArticleSubmit(event)" class="rustic-form">
          <div class="form-group">
            <label>Tiêu đề bài viết <span class="required">*</span></label>
            <input type="text" name="title" placeholder="Ví dụ: Vì sao tôi không chuộng tiếng gù liên thanh ở chim trẻ..." required>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label>Chuyên mục chia sẻ <span class="required">*</span></label>
              <select name="category" class="custom-select" required>
                <option value="Quan điểm">Quan điểm cá nhân</option>
                <option value="Cách nhìn chim">Cách nhìn chim</option>
                <option value="Đánh giá một con chim">Đánh giá một con chim</option>
                <option value="Kinh nghiệm thực chiến">Kinh nghiệm thực chiến</option>
                <option value="Tiền / Hậu">Tiền & Hậu</option>
                <option value="Giọng & Nước chơi">Giọng & Nước chơi</option>
                <option value="Thần thái">Thần thái chim</option>
                <option value="Những lần chọn sai">Những lần chọn sai & Trả giá</option>
                <option value="Câu chuyện về một con chim">Câu chuyện về một con chim cụ thể</option>
              </select>
            </div>

            <div class="form-group">
              <label>Gắn kèm hồ sơ cá thể chim (Tùy chọn)</label>
              <select name="linkedBirdId" class="custom-select">
                <option value="">-- Không gắn kèm chú chim nào --</option>
                ${userBirds.map(b => `<option value="${b.id}">${b.name} (${b.type})</option>`).join("")}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Ảnh bìa bài viết</label>
            <div class="cover-image-picker">
              <label class="cover-preset-option">
                <input type="radio" name="coverImage" value="./assets/images/hero-dove.jpg" checked>
                <img src="./assets/images/hero-dove.jpg" alt="Preset 1">
                <span>Cu gáy cội rừng</span>
              </label>
              <label class="cover-preset-option">
                <input type="radio" name="coverImage" value="./assets/images/cage-garden.jpg">
                <img src="./assets/images/cage-garden.jpg" alt="Preset 2">
                <span>Lồng tre sân vườn</span>
              </label>
              <label class="cover-preset-option">
                <input type="radio" name="coverImage" value="./assets/images/field-journal.jpg">
                <img src="./assets/images/field-journal.jpg" alt="Preset 3">
                <span>Nhật ký dã ngoại</span>
              </label>
              <label class="cover-preset-option">
                <input type="radio" name="coverImage" value="./assets/images/decoy-dove.jpg">
                <img src="./assets/images/decoy-dove.jpg" alt="Preset 4">
                <span>Chim mồi thực chiến</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Góc nhìn cốt lõi của bạn (Quote ngắn) <span class="required">*</span></label>
            <input type="text" name="myPerspective" placeholder="Ví dụ: Tôi chuộng con chim điềm đạm nhịn gù hơn con chim háu đá..." required>
          </div>

          <div class="form-group">
            <label>Nội dung bài viết chi tiết <span class="required">*</span></label>
            <textarea name="content" rows="10" placeholder="Viết câu chuyện, phân tích tình huống thực chiến, cách chuyển bài của chim..." required></textarea>
            <span class="field-hint">Hỗ trợ các đoạn văn tự nhiên. Có thể chèn tiêu đề phụ bằng cách xuống dòng.</span>
          </div>

          <div class="form-group">
            <label>Thước đo sau thực chiến</label>
            <textarea name="fieldVerification" rows="3" placeholder="Thực tế sau các trận đi rừng đã chứng minh điều này như thế nào?"></textarea>
          </div>

          <div class="form-group">
            <label>Thẻ phân loại (Tags, cách nhau bằng dấu phẩy)</label>
            <input type="text" name="tags" placeholder="Ví dụ: Tiền & Hậu, Giọng thổ, Rèn bổi, Cội keo">
          </div>

          <div class="form-actions-bar">
            <button type="submit" class="btn-primary" style="padding: 0.75rem 2rem; font-size: 1.05rem;">
              <i class="fas fa-paper-plane"></i> Gửi bài viết chia sẻ
            </button>
            <a href="#/cong-dong" class="btn-secondary" style="padding: 0.75rem 1.5rem;">Hủy bỏ</a>
          </div>
        </form>
      </div>
    </div>
  `;
}

function handleCreateArticleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const rawTags = form.tags.value.split(",").map(t => t.trim()).filter(Boolean);

  const articleData = {
    title: form.title.value.trim(),
    category: form.category.value,
    coverImage: form.coverImage.value,
    myPerspective: form.myPerspective.value.trim(),
    content: `<p>${form.content.value.trim().replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>')}</p>`,
    fieldVerification: form.fieldVerification.value.trim() || "Thực chiến là thước đo công tâm nhất.",
    linkedBirdId: form.linkedBirdId.value || null,
    tags: rawTags.length ? rawTags : ["Quan điểm", "Cộng đồng"]
  };

  const newArt = CUGAY_DB.createArticle(articleData);
  const currentUser = CUGAY_DB.getCurrentUser();

  if (newArt.status === "published") {
    showToast("Bài viết đã xuất bản thành công!");
    window.location.hash = `#/bai-viet/${newArt.slug}`;
  } else {
    showToast("Bài viết đã được gửi tới Ban quản trị (Chờ duyệt)!");
    window.location.hash = `#/u/${currentUser.username}`;
  }
}

function initCreateArticleEvents() {
  // ready
}

// ==========================================================
// 7. CREATE BIRD VIEW (Section 20.4)
// ==========================================================
function renderCreateBirdView() {
  return `
    <div class="create-content-page">
      <div class="reading-container">
        <a href="#/cong-dong" class="article-back-link"><i class="fas fa-arrow-left"></i> Trở về Thư viện quan điểm</a>

        <div class="form-header-card">
          <span class="hero-eyebrow"><i class="fas fa-feather"></i> Quá Trình Theo Dài Lâu</span>
          <h1 style="font-size: 2.2rem; margin: 0.5rem 0 1rem; color: var(--text-heading);">Tạo Hồ Sơ Cá Thể Chim Mới</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
            Việc đánh giá một con chim cu gáy không bao giờ là kết luận tại một thời điểm. 
            Tạo hồ sơ giúp bạn theo dõi sự tiến triển từ ngày đầu mới bẫy đến những mùa rừng dạn dày sương gió.
          </p>
        </div>

        <form id="create-bird-form" onsubmit="handleCreateBirdSubmit(event)" class="rustic-form">
          <div class="form-row-2">
            <div class="form-group">
              <label>Tên định danh chú chim <span class="required">*</span></label>
              <input type="text" name="name" placeholder="Ví dụ: Đồng Dream, Thổ Sấm, Bổi Lỡ Suối Mơ..." required>
            </div>
            <div class="form-group">
              <label>Chất âm / Giọng <span class="required">*</span></label>
              <input type="text" name="voice" placeholder="Ví dụ: Thổ rền, Đồng pha thổ, Kim son kèm 2..." required>
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label>Phân loại chiến lực <span class="required">*</span></label>
              <select name="type" class="custom-select" required>
                <option value="Chim mồi cây">Chim mồi cây (Đánh cội ngọn)</option>
                <option value="Chim mồi đất">Chim mồi đất (Đánh bẫy úp)</option>
                <option value="Mồi lỡ đang thử lửa">Mồi lỡ đang thử lửa</option>
                <option value="Bổi thuần dưỡng">Bổi thuần dưỡng</option>
                <option value="Chim nghe gáy sân vườn">Chim nghe gáy sân vườn</option>
              </select>
            </div>
            <div class="form-group">
              <label>Thời gian nuôi / Tuổi lồng</label>
              <input type="text" name="age" placeholder="Ví dụ: 2 năm lồng, 6 tháng lỡ, bổi bẫy 1 tháng...">
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label>Nguồn gốc / Xuất xứ</label>
              <input type="text" name="origin" placeholder="Ví dụ: Rừng cao su Bến Cát, Núi Chứa Chan...">
            </div>
            <div class="form-group">
              <label>Trạng thái hiện tại</label>
              <input type="text" name="status" placeholder="Ví dụ: Mồi chiến lực chính, Đang rèn tính nhẫn...">
            </div>
          </div>

          <div class="form-group">
            <label>Ảnh đại diện chú chim</label>
            <div class="cover-image-picker">
              <label class="cover-preset-option">
                <input type="radio" name="image" value="./assets/images/hero-dove.jpg" checked>
                <img src="./assets/images/hero-dove.jpg" alt="Preset 1">
                <span>Ảnh đại diện 1</span>
              </label>
              <label class="cover-preset-option">
                <input type="radio" name="image" value="./assets/images/decoy-dove.jpg">
                <img src="./assets/images/decoy-dove.jpg" alt="Preset 2">
                <span>Ảnh đại diện 2</span>
              </label>
              <label class="cover-preset-option">
                <input type="radio" name="image" value="./assets/images/cage-garden.jpg">
                <img src="./assets/images/cage-garden.jpg" alt="Preset 3">
                <span>Ảnh đại diện 3</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Quan điểm ban đầu (Khi mới bẫy hoặc nhận về) <span class="required">*</span></label>
            <textarea name="initialAssessment" rows="3" placeholder="Nhận xét về tướng đầu, mắt, cườm, thái độ ngày đầu vào lồng..." required></textarea>
          </div>

          <div class="form-group">
            <label>Quá trình thực chiến & Kèo dợt cội</label>
            <textarea name="fieldExperience" rows="3" placeholder="Những trận đánh đã qua, phản xạ khi gặp bổi già, ưu khuyết điểm..."></textarea>
          </div>

          <div class="form-group">
            <label>Đánh giá hiện tại</label>
            <textarea name="currentAssessment" rows="3" placeholder="Hiện tại bạn định vị chú chim này thế nào trong giàn chim?"></textarea>
          </div>

          <div class="form-group">
            <label>Ghi chú cho mốc thời gian đầu tiên</label>
            <input type="text" name="firstStageNote" placeholder="Ví dụ: Ngày đưa vào lồng trùm áo lồng tĩnh tâm...">
          </div>

          <div class="form-actions-bar">
            <button type="submit" class="btn-primary" style="padding: 0.75rem 2rem; font-size: 1.05rem;">
              <i class="fas fa-save"></i> Tạo hồ sơ & Bắt đầu timeline
            </button>
            <a href="#/cong-dong" class="btn-secondary" style="padding: 0.75rem 1.5rem;">Hủy bỏ</a>
          </div>
        </form>
      </div>
    </div>
  `;
}

function handleCreateBirdSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const birdData = {
    name: form.name.value.trim(),
    voice: form.voice.value.trim(),
    type: form.type.value,
    age: form.age.value.trim(),
    origin: form.origin.value.trim(),
    status: form.status.value.trim() || "Đang theo dõi",
    image: form.image.value,
    initialAssessment: form.initialAssessment.value.trim(),
    fieldExperience: form.fieldExperience.value.trim(),
    currentAssessment: form.currentAssessment.value.trim(),
    firstStageNote: form.firstStageNote.value.trim()
  };

  const newBird = CUGAY_DB.createBird(birdData);
  showToast("Đã khởi tạo hồ sơ chú chim thành công!");
  window.location.hash = `#/chim/${newBird.id}`;
}

function initCreateBirdEvents() {
  // ready
}

// ==========================================================
// 8. ADMIN MODERATION PANEL VIEW (Section 20.11)
// ==========================================================
let currentAdminTab = "pending";

function renderAdminModerationView() {
  const currentUser = CUGAY_DB.getCurrentUser();
  const isAdmin = currentUser && currentUser.role === "admin";

  if (!isAdmin) {
    return `
      <div class="reading-container" style="padding: 6rem 1rem; text-align: center;">
        <i class="fas fa-user-lock" style="font-size: 3rem; color: var(--terracotta); margin-bottom: 1.5rem;"></i>
        <h2>Khu Vực Kiểm Duyệt Của Ban Quản Trị</h2>
        <p style="color: var(--text-muted); margin: 1rem 0 2rem;">
          Bạn đang đăng nhập với tài khoản người chơi thông thường (<strong>${currentUser.displayName}</strong>). 
          Chức năng kiểm duyệt bài viết và báo cáo chỉ dành cho Admin (Tác giả).
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem;">
          <button class="btn-primary" onclick="switchDemoUser('user_author'); location.hash='#/quan-tri';">
            <i class="fas fa-feather-alt"></i> Chuyển sang tài khoản Tác giả (Admin)
          </button>
          <a href="#/cong-dong" class="btn-secondary">Quay lại Cộng đồng</a>
        </div>
      </div>
    `;
  }

  const allArticles = CUGAY_DB.getArticles("all");
  const pendingArticles = CUGAY_DB.data.articles.filter(a => a.status === "pending");
  const publishedArticles = CUGAY_DB.data.articles.filter(a => a.status === "published");
  const reports = CUGAY_DB.getReports();
  const users = CUGAY_DB.getAllUsers();

  return `
    <div class="admin-panel-page">
      <div class="container">
        <div class="admin-head-bar">
          <div>
            <span class="hero-eyebrow"><i class="fas fa-shield-alt"></i> Kiểm Duyệt & Chuẩn Mực</span>
            <h1 style="font-size: 2.2rem; color: var(--text-heading); margin: 0.35rem 0;">Bảng Điều Hành Kiểm Duyệt</h1>
            <p style="color: var(--text-muted); font-size: 0.92rem;">
              Giữ gìn không gian chia sẻ mộc mạc, ngăn chặn mua bán chèo kéo, bài xích hiếu thắng.
            </p>
          </div>
          <div class="admin-stats-pills">
            <span class="stat-pill"><i class="fas fa-clock"></i> <strong>${pendingArticles.length}</strong> chờ duyệt</span>
            <span class="stat-pill"><i class="fas fa-flag"></i> <strong>${reports.filter(r => r.status === 'pending').length}</strong> báo cáo</span>
          </div>
        </div>

        <!-- Admin Nav Tabs -->
        <div class="admin-tabs-nav">
          <button class="admin-tab-btn ${currentAdminTab === 'pending' ? 'active' : ''}" onclick="switchAdminTab('pending')">
            <i class="fas fa-hourglass-half"></i> Chờ duyệt (${pendingArticles.length})
          </button>
          <button class="admin-tab-btn ${currentAdminTab === 'published' ? 'active' : ''}" onclick="switchAdminTab('published')">
            <i class="fas fa-check-double"></i> Đã xuất bản (${publishedArticles.length})
          </button>
          <button class="admin-tab-btn ${currentAdminTab === 'reports' ? 'active' : ''}" onclick="switchAdminTab('reports')">
            <i class="fas fa-flag"></i> Báo cáo người chơi (${reports.length})
          </button>
          <button class="admin-tab-btn ${currentAdminTab === 'users' ? 'active' : ''}" onclick="switchAdminTab('users')">
            <i class="fas fa-users-cog"></i> Quản lý thành viên (${users.length})
          </button>
        </div>

        <!-- Tab 1: Pending Articles -->
        <div class="admin-tab-content ${currentAdminTab === 'pending' ? 'active' : ''}" id="admin-tab-pending">
          ${pendingArticles.length === 0 ? `
            <div class="empty-tab-state">
              <i class="fas fa-check-circle" style="color: var(--sage);"></i>
              <p>Hiện tại không có bài viết nào đang chờ duyệt.</p>
            </div>
          ` : `
            <div class="admin-table-wrap">
              <table class="admin-data-table">
                <thead>
                  <tr>
                    <th>Bài viết</th>
                    <th>Người gửi</th>
                    <th>Chuyên mục</th>
                    <th>Ngày gửi</th>
                    <th style="text-align: right;">Hành động duyệt</th>
                  </tr>
                </thead>
                <tbody>
                  ${pendingArticles.map(art => `
                    <tr>
                      <td>
                        <strong>${art.title}</strong>
                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
                          ${art.myPerspective || art.excerpt}
                        </div>
                      </td>
                      <td>
                        <strong>${art.authorName}</strong>
                      </td>
                      <td><span class="tag-badge">${art.category}</span></td>
                      <td>${art.publishedAt}</td>
                      <td style="text-align: right;">
                        <button class="btn-action-approve" onclick="handleAdminApproveArticle('${art.id}')" title="Duyệt xuất bản">
                          <i class="fas fa-check"></i> Duyệt
                        </button>
                        <button class="btn-action-reject" onclick="handleAdminDeleteArticle('${art.id}')" title="Từ chối & Xóa">
                          <i class="fas fa-times"></i> Xóa
                        </button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- Tab 2: Published Articles -->
        <div class="admin-tab-content ${currentAdminTab === 'published' ? 'active' : ''}" id="admin-tab-published">
          <div class="admin-table-wrap">
            <table class="admin-data-table">
              <thead>
                <tr>
                  <th>Tiêu đề bài viết</th>
                  <th>Tác giả</th>
                  <th>Huy hiệu</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                ${publishedArticles.map(art => `
                  <tr>
                    <td>
                      <a href="#/bai-viet/${art.slug}" style="font-weight: 600; color: var(--text-heading);">${art.title}</a>
                      <div style="font-size: 0.82rem; color: var(--text-light);">${art.category} • ${art.publishedAt}</div>
                    </td>
                    <td>${art.authorName}</td>
                    <td>
                      ${art.isAuthor ? `<span class="badge-author">Tác giả</span>` : `<span class="badge-community">Cộng đồng</span>`}
                    </td>
                    <td>
                      <button class="btn-action-reject" onclick="handleAdminToggleArticleStatus('${art.id}', 'hidden')" title="Ẩn bài viết khỏi thư viện">
                        <i class="fas fa-eye-slash"></i> Ẩn
                      </button>
                      <button class="btn-action-reject" onclick="handleAdminDeleteArticle('${art.id}')" title="Xóa vĩnh viễn">
                        <i class="fas fa-trash"></i> Xóa
                      </button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tab 3: Reports -->
        <div class="admin-tab-content ${currentAdminTab === 'reports' ? 'active' : ''}" id="admin-tab-reports">
          ${reports.length === 0 ? `
            <div class="empty-tab-state">
              <i class="fas fa-smile"></i>
              <p>Chưa có báo cáo vi phạm nào.</p>
            </div>
          ` : `
            <div class="admin-table-wrap">
              <table class="admin-data-table">
                <thead>
                  <tr>
                    <th>Người báo cáo</th>
                    <th>Đối tượng</th>
                    <th>Lý do</th>
                    <th>Thời gian</th>
                    <th>Trạng thái</th>
                    <th>Xử lý</th>
                  </tr>
                </thead>
                <tbody>
                  ${reports.map(rep => `
                    <tr>
                      <td><strong>${rep.reporterName || 'Người chơi'}</strong></td>
                      <td><span class="tag-badge">${rep.targetType}</span></td>
                      <td style="color: var(--terracotta);"><strong>${rep.reason}</strong></td>
                      <td style="font-size: 0.85rem;">${rep.createdAt}</td>
                      <td>
                        <span class="criteria-pill ${rep.status === 'pending' ? 'level-very-high' : 'level-low'}">
                          ${rep.status === 'pending' ? 'Chưa xử lý' : 'Đã giải quyết'}
                        </span>
                      </td>
                      <td>
                        ${rep.status === 'pending' ? `
                          <button class="btn-action-approve" onclick="handleAdminResolveReport('${rep.id}', 'resolved')">
                            <i class="fas fa-check"></i> Đánh dấu xong
                          </button>
                        ` : '<span style="color: var(--text-light); font-size: 0.85rem;">Đã đóng</span>'}
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- Tab 4: Members -->
        <div class="admin-tab-content ${currentAdminTab === 'users' ? 'active' : ''}" id="admin-tab-users">
          <div class="admin-table-wrap">
            <table class="admin-data-table">
              <thead>
                <tr>
                  <th>Người chơi</th>
                  <th>Khu vực</th>
                  <th>Kinh nghiệm</th>
                  <th>Vai trò</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                ${users.map(u => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <img src="${u.avatar || './assets/images/hero-dove.jpg'}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;">
                        <div>
                          <a href="#/u/${u.username}" style="font-weight: 600; color: var(--wood-main);">${u.displayName}</a>
                          <div style="font-size: 0.8rem; color: var(--text-muted);">@${u.username}</div>
                        </div>
                      </div>
                    </td>
                    <td>${u.location || 'Việt Nam'}</td>
                    <td>${u.experienceYears ? `${u.experienceYears} năm` : 'Mới chơi'}</td>
                    <td>
                      ${u.role === 'admin' ? '<span class="badge-author">Admin</span>' : '<span class="badge-community">Thành viên</span>'}
                    </td>
                    <td>
                      ${u.role !== 'admin' ? `
                        <button class="btn-secondary" onclick="handleAdminToggleBanUser('${u.id}')" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
                          ${u.isBanned ? '<i class="fas fa-unlock"></i> Mở khóa' : '<i class="fas fa-ban"></i> Khóa nick'}
                        </button>
                      ` : '<span style="color: var(--text-light); font-size: 0.85rem;">Chủ trang</span>'}
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  `;
}

function switchAdminTab(tabKey) {
  currentAdminTab = tabKey;
  document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.remove("active"));

  const target = document.getElementById(`admin-tab-${tabKey}`);
  if (target) target.classList.add("active");

  const btn = Array.from(document.querySelectorAll(".admin-tab-btn")).find(b => b.getAttribute("onclick")?.includes(tabKey));
  if (btn) btn.classList.add("active");
}

function handleAdminApproveArticle(artId) {
  CUGAY_DB.approveArticle(artId);
  showToast("Đã duyệt xuất bản bài viết lên Thư viện cộng đồng!");
  document.getElementById("app-root").innerHTML = renderAdminModerationView();
}

function handleAdminToggleArticleStatus(artId, status) {
  CUGAY_DB.setArticleStatus(artId, status);
  showToast("Đã cập nhật trạng thái bài viết.");
  document.getElementById("app-root").innerHTML = renderAdminModerationView();
}

function handleAdminDeleteArticle(artId) {
  if (confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
    CUGAY_DB.deleteArticle(artId);
    showToast("Đã xóa bài viết.");
    document.getElementById("app-root").innerHTML = renderAdminModerationView();
  }
}

function handleAdminResolveReport(repId, action) {
  CUGAY_DB.resolveReport(repId, action);
  showToast("Đã xử lý xong báo cáo.");
  document.getElementById("app-root").innerHTML = renderAdminModerationView();
}

function handleAdminToggleBanUser(userId) {
  const isBanned = CUGAY_DB.toggleBanUser(userId);
  showToast(isBanned ? "Đã khóa tài khoản này." : "Đã mở khóa tài khoản.");
  document.getElementById("app-root").innerHTML = renderAdminModerationView();
}

function initAdminModerationEvents() {
  // ready
}

// ==========================================================
// 9. ARTICLE DETAIL VIEW (Enhanced with Author vs Community, Discussions, Reactions)
// ==========================================================
function renderArticleDetailView(slug) {
  const article = CUGAY_DB.getArticleBySlug(slug);
  if (!article) {
    return `
      <div class="reading-container" style="padding: 6rem 1rem; text-align: center;">
        <h2>Không tìm thấy bài viết</h2>
        <p style="color: var(--text-muted); margin: 1rem 0 2rem;">Bài viết bạn tìm kiếm có thể đã được dời hoặc đổi tên trong cuốn sổ tay.</p>
        <a href="#/cong-dong" class="btn-primary">Quay lại Thư viện cộng đồng</a>
      </div>
    `;
  }

  document.title = `${article.title} | ${SITE_DATA.info.title}`;
  const author = CUGAY_DB.getUserById(article.authorId) || { displayName: article.authorName, username: "tacgia", avatar: "./assets/images/hero-dove.jpg" };
  const isBookmarked = CUGAY_DB.isBookmarked("article", article.id);
  const userReact = CUGAY_DB.getUserReaction("article", article.id);
  const reactions = article.reactions || { thich: 0, huuIch: 0, dongDieu: 0 };
  const comments = CUGAY_DB.getComments(article.id);

  // Badge Tác giả vs Cộng đồng (Section 20.10)
  const badgeHtml = article.isAuthor 
    ? `<span class="badge-author"><i class="fas fa-feather-alt"></i> Tác giả / Góc nhìn của tôi</span>`
    : `<span class="badge-community"><i class="fas fa-users"></i> Cộng đồng</span>`;

  return `
    <article class="article-detail-page">
      <div class="reading-container">
        <header class="article-header">
          <a href="#/cong-dong" class="article-back-link">
            <i class="fas fa-arrow-left"></i> Trở về thư viện quan điểm
          </a>

          <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem;">
            ${badgeHtml}
            ${article.status === 'pending' ? '<span class="badge-pending">Chờ kiểm duyệt</span>' : ''}
          </div>

          <h1 class="article-main-title">${article.title}</h1>

          <!-- Author Info Line -->
          <div class="article-author-detail-bar">
            <a href="#/u/${author.username}" class="author-avatar-link">
              <img src="${author.avatar || './assets/images/hero-dove.jpg'}" alt="${author.displayName}">
              <div>
                <strong>${author.displayName}</strong>
                <span>@${author.username}</span>
              </div>
            </a>
            <div class="article-meta-line" style="margin: 0;">
              <span><i class="far fa-calendar-alt"></i> ${article.publishedAt}</span>
              <span><i class="far fa-clock"></i> ${article.readingTime}</span>
              <span><i class="fas fa-folder"></i> ${article.category}</span>
            </div>
          </div>
        </header>

        <div class="article-cover-frame">
          <img src="${article.coverImage}" alt="${article.title}">
        </div>

        <!-- Perspective Box -->
        <div class="perspective-box">
          <span class="box-label"><i class="fas fa-bookmark"></i> Quan điểm cốt lõi</span>
          <p>"${article.myPerspective}"</p>
        </div>

        <!-- Linked Bird Highlight if present -->
        ${article.linkedBirdId ? `
          <div class="article-linked-bird-box" onclick="location.hash='#/chim/${article.linkedBirdId}'">
            <i class="fas fa-feather-alt" style="font-size: 1.5rem; color: var(--wood-main);"></i>
            <div>
              <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--text-light);">Cá thể chim liên quan</span>
              <h4 style="margin: 0.2rem 0 0; color: var(--text-heading);">Bấm để xem hồ sơ và tiến trình thực chiến của chú chim này</h4>
            </div>
            <i class="fas fa-chevron-right" style="margin-left: auto; color: var(--text-light);"></i>
          </div>
        ` : ''}

        <div class="article-body-content">
          ${article.content}
        </div>

        <div class="field-verify-box">
          <span class="box-label"><i class="fas fa-tree"></i> Thước đo sau thực chiến</span>
          <p>${article.fieldVerification}</p>
        </div>

        <!-- Article Disclaimer Banner (Section 20.12) -->
        <div class="article-disclaimer-banner">
          <p>“Bạn có thể không đồng ý với quan điểm này. Và đó cũng là điều bình thường.”</p>
          <span>Mỗi người chơi có một đôi tai thẩm âm, một cội cây và một con mắt nhìn nhận riêng biệt.</span>
        </div>

        <!-- Interactive Reactions & Bookmark Toolbar (Section 20.8) -->
        <div class="article-actions-bar">
          <div class="keeper-reaction-toolbar">
            <span style="font-size: 0.88rem; font-weight: 600; color: var(--text-muted); margin-right: 0.25rem;">Phản hồi:</span>
            <button class="reaction-pill ${userReact === 'thich' ? 'active' : ''}" 
                    onclick="handleArticleReaction('article', '${article.id}', 'thich')">
              👍 Thích <span class="react-num">(${reactions.thich || 0})</span>
            </button>
            <button class="reaction-pill ${userReact === 'huuIch' ? 'active' : ''}" 
                    onclick="handleArticleReaction('article', '${article.id}', 'huuIch')">
              💡 Hữu ích <span class="react-num">(${reactions.huuIch || 0})</span>
            </button>
            <button class="reaction-pill ${userReact === 'dongDieu' ? 'active' : ''}" 
                    onclick="handleArticleReaction('article', '${article.id}', 'dongDieu')">
              🤝 Có kinh nghiệm tương tự <span class="react-num">(${reactions.dongDieu || 0})</span>
            </button>
          </div>

          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                    onclick="handleToggleBookmark('article', '${article.id}')" title="Lưu bài viết">
              <i class="${isBookmarked ? 'fas' : 'far'} fa-bookmark"></i> ${isBookmarked ? 'Đã lưu' : 'Lưu bài'}
            </button>
            <button class="share-btn" onclick="openReportModal('article', '${article.id}', '${article.title}')" title="Báo cáo bài viết">
              <i class="fas fa-flag"></i> Báo cáo
            </button>
            <button class="share-btn" onclick="copyCurrentLink()">
              <i class="fas fa-link"></i> Sao chép liên kết
            </button>
          </div>
        </div>

        <!-- Tags -->
        <div class="card-tags" style="margin: 1.5rem 0;">
          ${article.tags.map(t => `<span class="tag-badge">#${t}</span>`).join("")}
        </div>

        <!-- Discussion & Threaded Comments (Section 20.7) -->
        <div class="discussion-section" id="discussion">
          <div class="discussion-header">
            <h3><i class="fas fa-comments"></i> Trao Đổi & Kinh Nghiệm Thực Chiến (${comments.length})</h3>
            <p class="discussion-subtext">
              Phần bình luận ưu tiên <strong>trao đổi kinh nghiệm mộc mạc</strong>, không biến thành tranh cãi thắng/thua.
            </p>
          </div>

          <!-- New Comment Form -->
          <form id="comment-form" onsubmit="handlePostComment(event, '${article.id}')" class="comment-input-form">
            <textarea id="comment-content" rows="3" placeholder="Chia sẻ góc nhìn hoặc trường hợp thực tế tương tự của bạn..." required></textarea>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
              <span style="font-size: 0.82rem; color: var(--text-light);">Bình luận với tư cách: <strong>${CUGAY_DB.getCurrentUser().displayName}</strong></span>
              <button type="submit" class="btn-primary" style="padding: 0.45rem 1.25rem; font-size: 0.9rem;">
                <i class="fas fa-paper-plane"></i> Gửi bình luận
              </button>
            </div>
          </form>

          <!-- Threaded Comments List -->
          <div class="comments-thread-list" id="comments-list-${article.id}">
            ${renderThreadedComments(comments, article.id)}
          </div>
        </div>

      </div>
    </article>
  `;
}

function renderThreadedComments(comments, articleId) {
  if (!comments || comments.length === 0) {
    return `
      <div style="padding: 2.5rem 1rem; text-align: center; color: var(--text-light); font-style: italic;">
        Chưa có bình luận nào. Hãy là người đầu tiên trao đổi góc nhìn thực chiến!
      </div>
    `;
  }

  // Root comments (parentId === null)
  const rootComments = comments.filter(c => !c.parentId);

  return rootComments.map(c => {
    const replies = comments.filter(r => r.parentId === c.id);
    return `
      <div class="comment-thread-item" id="comment-${c.id}">
        <div class="comment-bubble">
          <div class="comment-head">
            <div class="comment-author-info">
              <img src="${c.authorAvatar || './assets/images/hero-dove.jpg'}" alt="${c.authorName}">
              <div>
                <strong>${c.authorName}</strong>
                <span class="comment-time">${c.createdAt}</span>
              </div>
            </div>
            <div class="comment-actions-head">
              <button onclick="openReplyForm('${c.id}')" class="reply-toggle-btn" title="Trả lời">
                <i class="fas fa-reply"></i> Trả lời
              </button>
              <button onclick="openReportModal('comment', '${c.id}', 'Bình luận của ${c.authorName}')" class="report-comment-btn" title="Báo cáo">
                <i class="fas fa-flag"></i>
              </button>
            </div>
          </div>

          <p class="comment-text">${c.content}</p>

          <!-- Comment Reaction Pills -->
          <div class="comment-footer-reactions">
            <button class="comment-react-btn" onclick="handleCommentReaction('${c.id}', 'thich')">
              👍 ${c.reactions?.thich || 0}
            </button>
            <button class="comment-react-btn" onclick="handleCommentReaction('${c.id}', 'huuIch')">
              💡 ${c.reactions?.huuIch || 0}
            </button>
            <button class="comment-react-btn" onclick="handleCommentReaction('${c.id}', 'dongDieu')">
              🤝 ${c.reactions?.dongDieu || 0}
            </button>
          </div>
        </div>

        <!-- Inline Reply Input Box (Hidden by default) -->
        <div class="inline-reply-box" id="reply-box-${c.id}" style="display: none;">
          <form onsubmit="handlePostReply(event, '${articleId}', '${c.id}')">
            <textarea placeholder="Viết phản hồi trao đổi cùng ${c.authorName}..." rows="2" required></textarea>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.5rem;">
              <button type="button" class="btn-secondary" onclick="closeReplyForm('${c.id}')" style="font-size: 0.8rem; padding: 0.3rem 0.75rem;">Hủy</button>
              <button type="submit" class="btn-primary" style="font-size: 0.8rem; padding: 0.3rem 0.9rem;">Gửi phản hồi</button>
            </div>
          </form>
        </div>

        <!-- Child Replies -->
        ${replies.length > 0 ? `
          <div class="comment-replies-list">
            ${replies.map(reply => `
              <div class="comment-bubble reply-bubble" id="comment-${reply.id}">
                <div class="comment-head">
                  <div class="comment-author-info">
                    <img src="${reply.authorAvatar || './assets/images/hero-dove.jpg'}" alt="${reply.authorName}">
                    <div>
                      <strong>${reply.authorName}</strong>
                      <span class="comment-time">${reply.createdAt}</span>
                    </div>
                  </div>
                  <button onclick="openReportModal('comment', '${reply.id}', 'Bình luận con của ${reply.authorName}')" class="report-comment-btn" title="Báo cáo">
                    <i class="fas fa-flag"></i>
                  </button>
                </div>
                <p class="comment-text">${reply.content}</p>
                <div class="comment-footer-reactions">
                  <button class="comment-react-btn" onclick="handleCommentReaction('${reply.id}', 'thich')">
                    👍 ${reply.reactions?.thich || 0}
                  </button>
                  <button class="comment-react-btn" onclick="handleCommentReaction('${reply.id}', 'huuIch')">
                    💡 ${reply.reactions?.huuIch || 0}
                  </button>
                  <button class="comment-react-btn" onclick="handleCommentReaction('${reply.id}', 'dongDieu')">
                    🤝 ${reply.reactions?.dongDieu || 0}
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        ` : ''}
      </div>
    `;
  }).join("");
}

function openReplyForm(commentId) {
  const box = document.getElementById(`reply-box-${commentId}`);
  if (box) {
    box.style.display = box.style.display === "none" ? "block" : "none";
    if (box.style.display === "block") {
      box.querySelector("textarea")?.focus();
    }
  }
}

function closeReplyForm(commentId) {
  const box = document.getElementById(`reply-box-${commentId}`);
  if (box) box.style.display = "none";
}

function handlePostComment(e, articleId) {
  e.preventDefault();
  const input = document.getElementById("comment-content");
  if (!input || !input.value.trim()) return;

  CUGAY_DB.addComment(articleId, input.value.trim(), null);
  input.value = "";
  showToast("Cảm ơn bạn đã đóng góp góc nhìn thực chiến!");
  refreshCommentsList(articleId);
}

function handlePostReply(e, articleId, parentId) {
  e.preventDefault();
  const textarea = e.target.querySelector("textarea");
  if (!textarea || !textarea.value.trim()) return;

  CUGAY_DB.addComment(articleId, textarea.value.trim(), parentId);
  closeReplyForm(parentId);
  showToast("Đã gửi phản hồi trao đổi!");
  refreshCommentsList(articleId);
}

function refreshCommentsList(articleId) {
  const container = document.getElementById(`comments-list-${articleId}`);
  if (container) {
    const comments = CUGAY_DB.getComments(articleId);
    container.innerHTML = renderThreadedComments(comments, articleId);
  }
}

function handleCommentReaction(commentId, reactionType) {
  CUGAY_DB.toggleReaction("comment", commentId, reactionType);
  showToast("Đã ghi nhận phản hồi bình luận.");
  // Find current article from URL
  const hash = window.location.hash;
  const parts = hash.slice(1).split("/").filter(Boolean);
  if (parts[0] === "bai-viet" && parts[1]) {
    const art = CUGAY_DB.getArticleBySlug(parts[1]);
    if (art) refreshCommentsList(art.id);
  }
}

function handleArticleReaction(targetType, targetId, reactionType) {
  const result = CUGAY_DB.toggleReaction(targetType, targetId, reactionType);
  if (result) {
    showToast(result.userCurrent ? "Đã gửi phản ứng của bạn." : "Đã bỏ phản ứng.");
    // Re-render current article detail
    const hash = window.location.hash;
    const parts = hash.slice(1).split("/").filter(Boolean);
    if (parts[0] === "bai-viet" && parts[1]) {
      document.getElementById("app-root").innerHTML = renderArticleDetailView(parts[1]);
    }
  }
}

function handleQuickReaction(targetType, targetId, reactionType) {
  CUGAY_DB.toggleReaction(targetType, targetId, reactionType);
  showToast("Đã ghi nhận phản hồi của bạn.");
  // Re-render feed
  if (window.location.hash.includes("cong-dong") || window.location.hash === "#/" || !window.location.hash) {
    const container = document.getElementById("app-root");
    if (container) {
      if (window.location.hash.includes("cong-dong")) {
        container.innerHTML = renderCommunityFeedView(currentCommunityFilter);
      } else {
        container.innerHTML = routes.home();
      }
    }
  }
}

function handleToggleBookmark(type, targetId) {
  const isBookmarked = CUGAY_DB.toggleBookmark(type, targetId);
  showToast(isBookmarked ? "Đã lưu vào danh sách của bạn!" : "Đã bỏ lưu.");
  // Re-render active view if needed
  updateHeaderUserWidget();
}

function initArticleDetailEvents(slug) {
  // ready
}

// ==========================================================
// 10. AUTH MODAL & DEMO USER SWITCHER (Section 20.1)
// ==========================================================
let currentAuthTab = "demo";

function updateHeaderUserWidget() {
  const container = document.getElementById("header-user-widget");
  const mobileContainer = document.getElementById("mobile-user-actions");
  if (!container) return;

  const currentUser = CUGAY_DB.getCurrentUser();

  const widgetHtml = `
    <div class="user-dropdown-wrapper">
      <button class="user-profile-badge-btn" onclick="toggleUserDropdown()" title="Tài khoản người chơi: ${currentUser.displayName}">
        <img src="${currentUser.avatar || './assets/images/hero-dove.jpg'}" alt="${currentUser.displayName}">
        <span class="user-display-name">${currentUser.displayName}</span>
        <i class="fas fa-chevron-down" style="font-size: 0.75rem; opacity: 0.7;"></i>
      </button>

      <div class="user-dropdown-menu" id="user-dropdown-menu">
        <div class="dropdown-header">
          <strong>${currentUser.displayName}</strong>
          <span>@${currentUser.username} • ${currentUser.role === 'admin' ? 'Tác giả' : 'Người chơi'}</span>
        </div>
        <div class="dropdown-divider"></div>
        <a href="#/u/${currentUser.username}" class="dropdown-item" onclick="toggleUserDropdown()">
          <i class="fas fa-id-card"></i> Hồ sơ của tôi
        </a>
        <a href="#/viet-bai" class="dropdown-item" onclick="toggleUserDropdown()">
          <i class="fas fa-pen-nib"></i> Viết bài chia sẻ
        </a>
        <a href="#/them-chim" class="dropdown-item" onclick="toggleUserDropdown()">
          <i class="fas fa-feather"></i> Tạo hồ sơ chim
        </a>
        ${currentUser.role === 'admin' ? `
          <a href="#/quan-tri" class="dropdown-item" onclick="toggleUserDropdown()" style="color: var(--terracotta);">
            <i class="fas fa-shield-alt"></i> Quản trị kiểm duyệt
          </a>
        ` : ''}
        <div class="dropdown-divider"></div>
        <button class="dropdown-item" onclick="openAuthModal('demo'); toggleUserDropdown();">
          <i class="fas fa-random"></i> Đổi tài khoản mẫu (Demo)
        </button>
        <button class="dropdown-item" onclick="openAuthModal('register'); toggleUserDropdown();">
          <i class="fas fa-user-plus"></i> Đăng ký tài khoản mới
        </button>
      </div>
    </div>
  `;

  container.innerHTML = widgetHtml;

  if (mobileContainer) {
    mobileContainer.innerHTML = `
      <div style="display: flex; gap: 0.5rem; flex-direction: column;">
        <a href="#/u/${currentUser.username}" class="btn-primary" style="font-size: 0.88rem; justify-content: center;">
          <i class="fas fa-id-card"></i> Hồ sơ người chơi (${currentUser.displayName})
        </a>
        <button class="btn-secondary" onclick="openAuthModal('demo')" style="font-size: 0.88rem; justify-content: center;">
          <i class="fas fa-random"></i> Đổi tài khoản thử nghiệm
        </button>
      </div>
    `;
  }
}

function toggleUserDropdown() {
  const menu = document.getElementById("user-dropdown-menu");
  if (menu) menu.classList.toggle("open");
}

// Close user dropdown if click outside
window.addEventListener("click", (e) => {
  if (!e.target.closest(".user-dropdown-wrapper")) {
    const menu = document.getElementById("user-dropdown-menu");
    if (menu) menu.classList.remove("open");
  }
});

function openAuthModal(tab = "demo") {
  currentAuthTab = tab;
  const modal = document.getElementById("auth-modal");
  const content = document.getElementById("auth-modal-content");
  if (!modal || !content) return;

  renderAuthModalContent();
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function renderAuthModalContent() {
  const content = document.getElementById("auth-modal-content");
  if (!content) return;

  const users = CUGAY_DB.getAllUsers();
  const current = CUGAY_DB.getCurrentUser();

  content.innerHTML = `
    <div class="auth-modal-inner">
      <div class="auth-tabs">
        <button class="auth-tab-btn ${currentAuthTab === 'demo' ? 'active' : ''}" onclick="switchAuthTab('demo')">
          <i class="fas fa-random"></i> Chọn tài khoản mẫu (Demo)
        </button>
        <button class="auth-tab-btn ${currentAuthTab === 'register' ? 'active' : ''}" onclick="switchAuthTab('register')">
          <i class="fas fa-user-plus"></i> Đăng ký tài khoản
        </button>
        <button class="auth-tab-btn ${currentAuthTab === 'login' ? 'active' : ''}" onclick="switchAuthTab('login')">
          <i class="fas fa-sign-in-alt"></i> Đăng nhập
        </button>
      </div>

      <!-- Tab Demo Switcher -->
      <div class="auth-pane ${currentAuthTab === 'demo' ? 'active' : ''}" id="auth-pane-demo">
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.25rem;">
          Chuyển đổi nhanh giữa các tài khoản mẫu để trải nghiệm website dưới góc nhìn của Tác giả, Cây Đồng Mồi hoặc Bác Ba Đất Đỏ:
        </p>
        <div class="demo-user-picker-grid">
          ${users.map(u => `
            <div class="demo-user-card ${u.id === current.id ? 'active-current' : ''}" onclick="switchDemoUser('${u.id}')">
              <img src="${u.avatar || './assets/images/hero-dove.jpg'}" alt="${u.displayName}">
              <div class="demo-user-info">
                <strong>${u.displayName} ${u.id === current.id ? '<span class="current-tag">(Đang dùng)</span>' : ''}</strong>
                <span>@${u.username} • ${u.role === 'admin' ? 'Tác giả' : `${u.experienceYears} năm KN`}</span>
                <p class="demo-user-quote">"${u.quote || u.bio}"</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Tab Register -->
      <div class="auth-pane ${currentAuthTab === 'register' ? 'active' : ''}" id="auth-pane-register">
        <form onsubmit="handleRegisterSubmit(event)" class="rustic-form">
          <div class="form-row-2">
            <div class="form-group">
              <label>Tên hiển thị (Biệt danh chơi chim) <span class="required">*</span></label>
              <input type="text" name="displayName" placeholder="Ví dụ: Ba Gác Rừng, Đồng Bến Cát..." required>
            </div>
            <div class="form-group">
              <label>Tên người dùng (Username) <span class="required">*</span></label>
              <input type="text" name="username" placeholder="Ví dụ: bagacdung, dongbencat..." required>
            </div>
          </div>
          <div class="form-row-2">
            <div class="form-group">
              <label>Số năm chơi cu gáy (Tùy chọn)</label>
              <input type="number" name="experienceYears" placeholder="Ví dụ: 5" min="0" max="60">
            </div>
            <div class="form-group">
              <label>Khu vực chơi chim / Tỉnh thành</label>
              <input type="text" name="location" placeholder="Ví dụ: Trảng Bom, Đồng Nai...">
            </div>
          </div>
          <div class="form-group">
            <label>Câu châm ngôn / Quan điểm nhìn chim của bạn</label>
            <input type="text" name="quote" placeholder="Ví dụ: Tôi không tìm con chim đẹp nhất. Tôi tìm con chim hợp cách chơi.">
          </div>
          <div class="form-group">
            <label>Giới thiệu ngắn về bản thân</label>
            <textarea name="bio" rows="2" placeholder="Ví dụ: Đam mê tiếng cu gáy sớm mai, thích dợt cội cuối tuần..."></textarea>
          </div>
          <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 0.75rem;">
            <i class="fas fa-check"></i> Hoàn tất đăng ký & Đăng nhập ngay
          </button>
        </form>
      </div>

      <!-- Tab Login -->
      <div class="auth-pane ${currentAuthTab === 'login' ? 'active' : ''}" id="auth-pane-login">
        <form onsubmit="handleLoginSubmit(event)" class="rustic-form">
          <div class="form-group">
            <label>Tên người chơi (Username)</label>
            <input type="text" name="username" placeholder="Nhập username (ví dụ: tacgia, caydongmoi, bacbadatdo)" required>
          </div>
          <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 0.75rem;">
            <i class="fas fa-sign-in-alt"></i> Đăng nhập vào sổ tay
          </button>
        </form>
      </div>
    </div>
  `;
}

function switchAuthTab(tabKey) {
  currentAuthTab = tabKey;
  renderAuthModalContent();
}

function switchDemoUser(userId) {
  const user = CUGAY_DB.setCurrentUser(userId);
  if (user) {
    showToast(`Đã chuyển sang vai: ${user.displayName}`);
    updateHeaderUserWidget();
    closeAuthModal();
    // Refresh page
    window.location.hash = `#/u/${user.username}`;
  }
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const res = CUGAY_DB.register({
    username: form.username.value,
    displayName: form.displayName.value,
    experienceYears: form.experienceYears.value,
    location: form.location.value,
    quote: form.quote.value,
    bio: form.bio.value,
    avatar: "./assets/images/hero-dove.jpg"
  });

  if (res.success) {
    showToast(`Chào mừng ${res.user.displayName} gia nhập Thư viện Cu Gáy!`);
    updateHeaderUserWidget();
    closeAuthModal();
    window.location.hash = `#/u/${res.user.username}`;
  } else {
    alert(res.message);
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const res = CUGAY_DB.login(form.username.value, "");
  if (res.success) {
    showToast(`Đăng nhập thành công: ${res.user.displayName}`);
    updateHeaderUserWidget();
    closeAuthModal();
    window.location.hash = `#/u/${res.user.username}`;
  } else {
    alert(res.message);
  }
}

// ==========================================================
// 11. PROFILE EDIT MODAL
// ==========================================================
function openProfileEditModal() {
  const modal = document.getElementById("profile-edit-modal");
  const content = document.getElementById("profile-edit-content");
  if (!modal || !content) return;

  const user = CUGAY_DB.getCurrentUser();

  content.innerHTML = `
    <div class="profile-edit-modal-inner">
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--wood-main);">
        <i class="fas fa-user-edit"></i> Cập Nhật Hồ Sơ Người Chơi
      </h3>
      <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        Hồ sơ mang phong cách sổ tay của người chơi chim, không thu thập thông tin cá nhân không cần thiết.
      </p>

      <form onsubmit="handleSaveProfileSubmit(event)" class="rustic-form">
        <div class="form-row-2">
          <div class="form-group">
            <label>Tên hiển thị (Biệt danh)</label>
            <input type="text" name="displayName" value="${user.displayName}" required>
          </div>
          <div class="form-group">
            <label>Khu vực / Tỉnh thành</label>
            <input type="text" name="location" value="${user.location || ''}">
          </div>
        </div>

        <div class="form-group">
          <label>Số năm chơi chim cu gáy</label>
          <input type="number" name="experienceYears" value="${user.experienceYears || 1}" min="0" max="60">
        </div>

        <div class="form-group">
          <label>Câu nói tâm đắc / Quan điểm nhìn chim</label>
          <input type="text" name="quote" value="${user.quote || ''}">
        </div>

        <div class="form-group">
          <label>Giới thiệu ngắn về bản thân</label>
          <textarea name="bio" rows="3">${user.bio || ''}</textarea>
        </div>

        <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 0.75rem;">
          <i class="fas fa-save"></i> Lưu cập nhật hồ sơ
        </button>
      </form>
    </div>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProfileEditModal() {
  const modal = document.getElementById("profile-edit-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function handleSaveProfileSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const currentUser = CUGAY_DB.getCurrentUser();

  CUGAY_DB.updateProfile(currentUser.id, {
    displayName: form.displayName.value.trim(),
    location: form.location.value.trim(),
    experienceYears: parseInt(form.experienceYears.value, 10) || 1,
    quote: form.quote.value.trim(),
    bio: form.bio.value.trim()
  });

  showToast("Đã lưu thông tin hồ sơ của bạn!");
  closeProfileEditModal();
  updateHeaderUserWidget();
  document.getElementById("app-root").innerHTML = renderUserProfileView(currentUser.username);
}

// ==========================================================
// 12. REPORT MODAL (Moderation - Section 20.11)
// ==========================================================
let currentReportTarget = { type: "", id: "", title: "" };

function openReportModal(targetType, targetId, title) {
  currentReportTarget = { type: targetType, id: targetId, title };
  const modal = document.getElementById("report-modal");
  const content = document.getElementById("report-modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="report-modal-inner">
      <h3 style="color: var(--terracotta); margin-bottom: 0.5rem;">
        <i class="fas fa-flag"></i> Báo Cáo Nội Dung Vi Phạm
      </h3>
      <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.25rem;">
        Báo cáo nội dung: <strong>${title}</strong>
      </p>

      <form onsubmit="handleSubmitReportForm(event)" class="rustic-form">
        <div class="form-group">
          <label>Lý do báo cáo vi phạm <span class="required">*</span></label>
          <select id="report-reason" class="custom-select" required>
            <option value="Tranh cãi hơn thua, xúc phạm người chơi">Tranh cãi hơn thua, xúc phạm người chơi khác</option>
            <option value="Quảng cáo mua bán, chèo kéo thương mại">Quảng cáo mua bán, chèo kéo thương mại</option>
            <option value="Khẳng định giáo điều, áp đặt quan điểm">Khẳng định giáo điều, áp đặt quan điểm sai lệch</option>
            <option value="Thông tin sai sự thật hoặc nội dung rác">Thông tin sai sự thật hoặc nội dung rác</option>
            <option value="Lý do khác">Lý do khác</option>
          </select>
        </div>

        <div class="form-group">
          <label>Chi tiết thêm (Tùy chọn)</label>
          <textarea id="report-extra" rows="3" placeholder="Mô tả cụ thể để ban quản trị dễ xử lý..."></textarea>
        </div>

        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
          <button type="button" class="btn-secondary" onclick="closeReportModal()">Hủy bỏ</button>
          <button type="submit" class="btn-primary" style="background: var(--terracotta); border-color: var(--terracotta);">
            <i class="fas fa-paper-plane"></i> Gửi báo cáo
          </button>
        </div>
      </form>
    </div>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeReportModal() {
  const modal = document.getElementById("report-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function handleSubmitReportForm(e) {
  e.preventDefault();
  const reason = document.getElementById("report-reason")?.value;
  const extra = document.getElementById("report-extra")?.value;
  const fullReason = extra ? `${reason} (${extra})` : reason;

  CUGAY_DB.createReport(currentReportTarget.type, currentReportTarget.id, fullReason);
  closeReportModal();
  showToast("Cảm ơn bạn! Ban quản trị sẽ sớm xem xét báo cáo này.");
}

// ==========================================================
// 13. 16 TIÊU CHÍ MODAL SYSTEM
// ==========================================================
function openCriteriaModal(criteriaId) {
  const c = SITE_DATA.criteria.find(item => item.id === criteriaId);
  if (!c) return;

  const content = document.getElementById("criteria-modal-content");
  const overlay = document.getElementById("criteria-modal-overlay");
  if (!content || !overlay) return;

  content.innerHTML = `
    <div class="criteria-detail-modal">
      <div class="modal-badge-row">
        <span class="criterion-cat">${c.category}</span>
        <span class="modal-stamp">TIÊU CHÍ #${c.id.toUpperCase()}</span>
      </div>

      <h2 class="modal-criterion-title">
        <i class="fas ${c.icon}" style="color: var(--brass); margin-right: 0.5rem;"></i>
        ${c.name}
      </h2>

      <div class="modal-sections">
        <div class="modal-sec-box">
          <div class="modal-sec-title"><i class="fas fa-eye"></i> 1. Tôi nhìn vào đâu?</div>
          <p>${c.lookAt}</p>
        </div>

        <div class="modal-sec-box">
          <div class="modal-sec-title"><i class="fas fa-check-circle"></i> 2. Tôi ưu tiên điều gì?</div>
          <p>${c.prioritize}</p>
        </div>

        <div class="modal-sec-box">
          <div class="modal-sec-title"><i class="fas fa-times-circle"></i> 3. Tôi không quá quan trọng điều gì?</div>
          <p>${c.notImportant}</p>
        </div>

        <div class="modal-sec-box highlight">
          <div class="modal-sec-title"><i class="fas fa-tree"></i> 4. Thực chiến cho tôi thấy điều gì?</div>
          <p>${c.fieldExperience}</p>
        </div>

        <div class="modal-sec-box note">
          <div class="modal-sec-title"><i class="fas fa-feather-alt"></i> 5. Ghi chú cá nhân</div>
          <p>${c.note}</p>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCriteriaModal() {
  const modalOverlay = document.getElementById("criteria-modal-overlay");
  if (modalOverlay) {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function filterCriteria(category, btnElement) {
  document.querySelectorAll(".criteria-filter-bar .filter-btn").forEach(b => b.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");

  const cards = document.querySelectorAll("#criteria-full-grid .criterion-card");
  cards.forEach(card => {
    if (category === "all" || card.getAttribute("data-cat") === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

function initCriteriaFilters() {
  // ready
}

// ==========================================================
// 14. INTERACTIVE TIMELINE (Tiền & Hậu)
// ==========================================================
let currentTimelineStep = 1;

function selectTimelineStep(stepNumber) {
  currentTimelineStep = stepNumber;
  const stage = SITE_DATA.timelineStages.find(s => s.step === stepNumber);
  if (!stage) return;

  document.querySelectorAll(".timeline-step-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  const activeBtn = document.querySelectorAll(".timeline-step-btn")[stepNumber - 1];
  if (activeBtn) activeBtn.classList.add("active");

  const display = document.getElementById("timeline-detail-display");
  if (!display) return;

  display.innerHTML = `
    <div class="stage-display-inner">
      <div class="stage-badge-time">
        <span class="stage-step-tag">Giai đoạn ${stage.step}/6 &nbsp;•&nbsp; ${stage.tag}</span>
        <span class="stage-time-tag"><i class="far fa-clock"></i> ${stage.time}</span>
      </div>
      <h3 class="stage-name-title">${stage.name}: ${stage.action}</h3>
      <p class="stage-desc-text">${stage.description}</p>
      <div class="stage-focus-box">
        <span class="focus-label"><i class="fas fa-search-plus"></i> Tôi quan sát điều gì ở phút này:</span>
        <p>${stage.focus}</p>
      </div>
      <div class="stage-nav-controls">
        <button class="stage-prev-btn" onclick="selectTimelineStep(${stepNumber > 1 ? stepNumber - 1 : 6})">
          <i class="fas fa-chevron-left"></i> Bước trước
        </button>
        <span class="stage-counter">${stepNumber} / 6</span>
        <button class="stage-next-btn" onclick="selectTimelineStep(${stepNumber < 6 ? stepNumber + 1 : 1})">
          Bước tiếp theo <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `;
}

function initTimelineInteractivity() {
  selectTimelineStep(1);
}

// ==========================================================
// 15. SEARCH MODAL SYSTEM
// ==========================================================
function openSearchModal() {
  const searchModal = document.getElementById("search-modal");
  const searchInput = document.getElementById("search-input");
  if (searchModal) {
    searchModal.classList.add("open");
    document.body.style.overflow = "hidden";
    if (searchInput) {
      searchInput.value = "";
      searchInput.focus();
      renderSearchResults("");
    }
  }
}

function closeSearchModal() {
  const searchModal = document.getElementById("search-modal");
  if (searchModal) {
    searchModal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function handleSearchInput(e) {
  const query = e.target.value.trim().toLowerCase();
  renderSearchResults(query);
}

function renderSearchResults(query) {
  const container = document.getElementById("search-results-list");
  if (!container) return;

  if (!query) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: var(--text-light); font-size: 0.9rem;">
        <i class="fas fa-search" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block; opacity: 0.5;"></i>
        Nhập từ khóa để tra cứu bài viết, tiêu chí (mắt, cườm, giọng thổ, tiền hậu...), người chơi, đàn chim...
      </div>
    `;
    return;
  }

  const allArticles = CUGAY_DB.getArticles("all");
  const matchedArticles = allArticles.filter(a => 
    a.title.toLowerCase().includes(query) || 
    a.excerpt.toLowerCase().includes(query) ||
    a.tags.some(t => t.toLowerCase().includes(query))
  );

  const matchedCriteria = SITE_DATA.criteria.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.shortSummary.toLowerCase().includes(query) ||
    c.prioritize.toLowerCase().includes(query)
  );

  const matchedBirds = CUGAY_DB.getBirds().filter(b =>
    b.name.toLowerCase().includes(query) ||
    b.voice.toLowerCase().includes(query) ||
    b.type.toLowerCase().includes(query)
  );

  const matchedUsers = CUGAY_DB.getAllUsers().filter(u =>
    u.displayName.toLowerCase().includes(query) ||
    u.username.toLowerCase().includes(query)
  );

  let html = "";

  if (!matchedArticles.length && !matchedCriteria.length && !matchedBirds.length && !matchedUsers.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-light);">
        Không tìm thấy nội dung phù hợp với "<strong>${query}</strong>".
      </div>
    `;
    return;
  }

  matchedArticles.forEach(a => {
    html += `
      <a href="#/bai-viet/${a.slug}" class="search-item" onclick="closeSearchModal()">
        <span class="search-item-cat">Bài viết • ${a.badge} • ${a.category}</span>
        <div class="search-item-title">${a.title}</div>
        <div class="search-item-snippet">${a.excerpt}</div>
      </a>
    `;
  });

  matchedBirds.forEach(b => {
    html += `
      <a href="#/chim/${b.id}" class="search-item" onclick="closeSearchModal()">
        <span class="search-item-cat">Hồ sơ chim • ${b.type}</span>
        <div class="search-item-title">${b.name} (${b.voice})</div>
        <div class="search-item-snippet">${b.initialAssessment || ''}</div>
      </a>
    `;
  });

  matchedUsers.forEach(u => {
    html += `
      <a href="#/u/${u.username}" class="search-item" onclick="closeSearchModal()">
        <span class="search-item-cat">Người chơi chim</span>
        <div class="search-item-title">${u.displayName} (@${u.username})</div>
        <div class="search-item-snippet">${u.bio || ''}</div>
      </a>
    `;
  });

  matchedCriteria.forEach(c => {
    html += `
      <a href="#/cach-nhin-chim" class="search-item" onclick="closeSearchModal(); setTimeout(() => openCriteriaModal('${c.id}'), 300);">
        <span class="search-item-cat">16 Tiêu chí • ${c.category}</span>
        <div class="search-item-title">${c.name}</div>
        <div class="search-item-snippet">${c.shortSummary}</div>
      </a>
    `;
  });

  container.innerHTML = html;
}

window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openSearchModal();
  } else if (e.key === "Escape") {
    closeSearchModal();
    closeCriteriaModal();
    closeAuthModal();
    closeProfileEditModal();
    closeReportModal();
  }
});

// ==========================================================
// 16. THEME SWITCHER & AUDIO AMBIANCE
// ==========================================================
const THEMES = ["parchment", "dark", "garden"];
let currentThemeIndex = 0;

function switchTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
  const theme = THEMES[currentThemeIndex];
  applyTheme(theme);
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    showToast("Đã đổi sang chế độ Đêm Khuya / Gỗ Mun");
  } else if (theme === "garden") {
    document.documentElement.setAttribute("data-theme", "garden");
    showToast("Đã đổi sang chế độ Sân Vườn Ban Mai");
  } else {
    document.documentElement.removeAttribute("data-theme");
    showToast("Đã đổi sang chế độ Giấy Dó Mộc Mạc");
  }
  localStorage.setItem("cugay_theme", theme);
}

function toggleAudio() {
  const btn = document.getElementById("audio-toggle-btn");
  if (!window.doveAmbiance) return;

  const isPlaying = window.doveAmbiance.toggle();
  if (isPlaying) {
    btn?.classList.add("playing");
    btn?.setAttribute("title", "Tắt âm thanh buổi sớm");
    showToast("Đang phát âm thanh sân vườn và tiếng cu gáy gù...");
  } else {
    btn?.classList.remove("playing");
    btn?.setAttribute("title", "Bật âm thanh buổi sớm");
    showToast("Đã tắt âm thanh buổi sớm.");
  }
}

// ==========================================================
// 17. TOAST & UTILITIES
// ==========================================================
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById("toast-msg");
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function copyCurrentLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast("Đã sao chép liên kết vào bộ nhớ tạm!");
  }).catch(() => {
    showToast("Không thể sao chép liên kết.");
  });
}

function toggleMobileMenu() {
  const nav = document.getElementById("site-nav");
  if (nav) nav.classList.toggle("open");
}

// ==========================================================
// 17.5. SUPABASE CLOUD DATABASE MODAL
// ==========================================================
function openSupabaseModal() {
  const modal = document.getElementById("supabase-modal");
  if (!modal) return;
  renderSupabaseModal();
  modal.classList.add("active");
}

function closeSupabaseModal() {
  const modal = document.getElementById("supabase-modal");
  if (modal) modal.classList.remove("active");
}

function renderSupabaseModal(extraStatusHtml = "") {
  const container = document.getElementById("supabase-modal-content");
  if (!container) return;

  const isConfigured = isSupabaseConfigured();
  const currentKey = SUPABASE_CONFIG.anonKey || "";
  const maskedKey = currentKey ? currentKey.substring(0, 12) + "..." + currentKey.substring(currentKey.length - 6) : "";

  container.innerHTML = `
    <div style="padding: 1rem 0.5rem;">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
        <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(62, 207, 142, 0.15); display: flex; align-items: center; justify-content: center; color: #3ecf8e; font-size: 1.4rem;">
          <i class="fas fa-bolt"></i>
        </div>
        <div>
          <h3 style="font-family: var(--font-heading); font-size: 1.25rem; margin: 0; color: var(--text-dark);">
            Kết Nối Supabase PostgreSQL
          </h3>
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Dự án: <code style="background: var(--bg-card-alt); padding: 0.15rem 0.35rem; border-radius: 4px; color: var(--accent);">fowwdgzbmuwhmuujuaii</code> (AWS Singapore)
          </div>
        </div>
      </div>

      <div style="background: var(--bg-card-alt); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1rem; margin-bottom: 1.25rem; font-size: 0.88rem; line-height: 1.6;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="font-weight: 600;">Trạng thái kết nối:</span>
          ${isConfigured ? 
            `<span style="color: #4ade80; background: rgba(74, 222, 128, 0.15); padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-check-circle"></i> Đã cấu hình Key</span>` : 
            `<span style="color: #facc15; background: rgba(250, 204, 21, 0.15); padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-info-circle"></i> Chế độ Offline Local</span>`
          }
        </div>
        <p style="margin: 0; color: var(--text-muted); font-size: 0.84rem;">
          Tất cả 10 bảng quan hệ (<code>users</code>, <code>articles</code>, <code>birds</code>, <code>comments</code>, <code>timelines</code>...) đã được thiết kế sẵn sàng cho Supabase.
        </p>
      </div>

      ${extraStatusHtml ? `<div style="margin-bottom: 1.25rem;">${extraStatusHtml}</div>` : ""}

      <!-- Cấu hình Anon Key -->
      <form onsubmit="handleSaveSupabaseAnonKey(event)" style="margin-bottom: 1.5rem;">
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label style="display: block; font-size: 0.84rem; font-weight: 600; margin-bottom: 0.35rem; color: var(--text-dark);">
            Supabase Anon Public Key (Lấy từ Project Settings -> API):
          </label>
          <div style="display: flex; gap: 0.5rem;">
            <input type="text" id="supabase-anon-input" class="form-control" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." value="${currentKey}" style="flex: 1; font-size: 0.85rem; font-family: monospace;">
            <button type="submit" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem; white-space: nowrap;">
              <i class="fas fa-save"></i> Lưu Key
            </button>
          </div>
        </div>
      </form>

      <!-- Các thao tác Cloud -->
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
        <button class="btn-secondary" onclick="handleTestSupabaseClick()" style="font-size: 0.84rem; padding: 0.5rem 0.9rem;">
          <i class="fas fa-plug"></i> Kiểm tra kết nối
        </button>
        <button class="btn-secondary" onclick="handleSyncLocalToSupabaseClick()" style="font-size: 0.84rem; padding: 0.5rem 0.9rem;">
          <i class="fas fa-cloud-upload-alt"></i> Đẩy dữ liệu lên Cloud (Sync Up)
        </button>
        <button class="btn-secondary" onclick="handleSyncSupabaseToLocalClick()" style="font-size: 0.84rem; padding: 0.5rem 0.9rem;">
          <i class="fas fa-cloud-download-alt"></i> Kéo dữ liệu về máy (Sync Down)
        </button>
      </div>

      <!-- Quick links to Supabase Dashboard -->
      <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; font-size: 0.84rem;">
        <span style="color: var(--text-muted);"><i class="fas fa-external-link-alt"></i> Tiện ích Supabase:</span>
        <div style="display: flex; gap: 0.75rem;">
          <a href="https://supabase.com/dashboard/project/fowwdgzbmuwhmuujuaii/sql/new" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: none; font-weight: 500;">
            <i class="fas fa-terminal"></i> Mở SQL Editor
          </a>
          <a href="https://supabase.com/dashboard/project/fowwdgzbmuwhmuujuaii/editor" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: none; font-weight: 500;">
            <i class="fas fa-table"></i> Mở Table Editor
          </a>
        </div>
      </div>
    </div>
  `;
}

async function handleSaveSupabaseAnonKey(e) {
  e.preventDefault();
  const input = document.getElementById("supabase-anon-input");
  if (!input) return;
  const key = input.value.trim();
  const res = await setSupabaseAnonKey(key);
  if (res.success) {
    showToast("Đã lưu Anon Key và kết nối Supabase thành công!");
    renderSupabaseModal(`<div style="padding: 0.75rem; border-radius: 8px; background: rgba(74, 222, 128, 0.15); border: 1px solid rgba(74, 222, 128, 0.3); color: #4ade80; font-size: 0.85rem;"><i class="fas fa-check-circle"></i> ${res.message}</div>`);
  } else {
    showToast(key ? "Lỗi kết nối Supabase. Vui lòng kiểm tra lại key." : "Đã xóa key kết nối.");
    renderSupabaseModal(`<div style="padding: 0.75rem; border-radius: 8px; background: rgba(248, 113, 113, 0.15); border: 1px solid rgba(248, 113, 113, 0.3); color: #f87171; font-size: 0.85rem;"><i class="fas fa-exclamation-triangle"></i> ${res.message}</div>`);
  }
}

async function handleTestSupabaseClick() {
  renderSupabaseModal(`<div style="padding: 0.75rem; border-radius: 8px; background: var(--bg-card-alt); color: var(--text-muted); font-size: 0.85rem;"><i class="fas fa-spinner fa-spin"></i> Đang kiểm tra kết nối...</div>`);
  const res = await testSupabaseConnection();
  if (res.success) {
    renderSupabaseModal(`<div style="padding: 0.75rem; border-radius: 8px; background: rgba(74, 222, 128, 0.15); border: 1px solid rgba(74, 222, 128, 0.3); color: #4ade80; font-size: 0.85rem;"><i class="fas fa-check-circle"></i> ${res.message}</div>`);
  } else {
    renderSupabaseModal(`<div style="padding: 0.75rem; border-radius: 8px; background: rgba(248, 113, 113, 0.15); border: 1px solid rgba(248, 113, 113, 0.3); color: #f87171; font-size: 0.85rem;"><i class="fas fa-times-circle"></i> ${res.message}</div>`);
  }
}

async function handleSyncLocalToSupabaseClick() {
  if (!isSupabaseConfigured()) {
    showToast("Vui lòng nhập Supabase Anon Key trước khi đồng bộ.");
    return;
  }
  renderSupabaseModal(`<div style="padding: 0.75rem; border-radius: 8px; background: var(--bg-card-alt); color: var(--text-muted); font-size: 0.85rem;"><i class="fas fa-spinner fa-spin"></i> Đang đồng bộ dữ liệu lên Supabase Cloud...</div>`);
  try {
    const res = await syncLocalToSupabase();
    showToast("Đồng bộ lên Supabase Cloud thành công!");
    renderSupabaseModal(`<div style="padding: 0.75rem; border-radius: 8px; background: rgba(74, 222, 128, 0.15); border: 1px solid rgba(74, 222, 128, 0.3); color: #4ade80; font-size: 0.85rem;">
      <i class="fas fa-check-circle"></i> Đã đồng bộ lên Supabase: ${res.users} nghệ nhân, ${res.birds} hồ sơ chim, ${res.articles} bài viết.
    </div>`);
  } catch (err) {
    renderSupabaseModal(`<div style="padding: 0.75rem; border-radius: 8px; background: rgba(248, 113, 113, 0.15); border: 1px solid rgba(248, 113, 113, 0.3); color: #f87171; font-size: 0.85rem;"><i class="fas fa-times-circle"></i> Lỗi đồng bộ: ${err.message}</div>`);
  }
}

async function handleSyncSupabaseToLocalClick() {
  if (!isSupabaseConfigured()) {
    showToast("Vui lòng nhập Supabase Anon Key trước.");
    return;
  }
  renderSupabaseModal(`<div style="padding: 0.75rem; border-radius: 8px; background: var(--bg-card-alt); color: var(--text-muted); font-size: 0.85rem;"><i class="fas fa-spinner fa-spin"></i> Đang tải dữ liệu từ Supabase Cloud...</div>`);
  try {
    const res = await syncSupabaseToLocal();
    showToast(`Đã kéo ${res.articlesCount} bài viết từ Supabase!`);
    renderSupabaseModal(`<div style="padding: 0.75rem; border-radius: 8px; background: rgba(74, 222, 128, 0.15); border: 1px solid rgba(74, 222, 128, 0.3); color: #4ade80; font-size: 0.85rem;"><i class="fas fa-check-circle"></i> Đã nạp thành công ${res.articlesCount} bài viết từ Supabase PostgreSQL!</div>`);
    // Reload active view
    if (window.appRouter) window.appRouter.resolve();
  } catch (err) {
    renderSupabaseModal(`<div style="padding: 0.75rem; border-radius: 8px; background: rgba(248, 113, 113, 0.15); border: 1px solid rgba(248, 113, 113, 0.3); color: #f87171; font-size: 0.85rem;"><i class="fas fa-times-circle"></i> Lỗi tải dữ liệu: ${err.message}</div>`);
  }
}

// ==========================================================
// 17.6. DESKTOP VIEW MODE TOGGLE (Xem giao diện máy tính trên điện thoại)
// ==========================================================
function toggleDesktopMode() {
  const isDesktop = document.documentElement.classList.toggle("force-desktop");
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  const btn = document.getElementById("desktop-mode-btn");

  if (isDesktop) {
    if (viewportMeta) viewportMeta.setAttribute("content", "width=1100, initial-scale=0.35, user-scalable=yes");
    if (btn) btn.classList.add("active");
    localStorage.setItem("cugay_desktop_mode", "true");
    showToast("Đã bật chế độ xem máy tính (có thể phóng to / thu nhỏ tùy ý)");
  } else {
    if (viewportMeta) viewportMeta.setAttribute("content", "width=device-width, initial-scale=1.0");
    if (btn) btn.classList.remove("active");
    localStorage.removeItem("cugay_desktop_mode");
    showToast("Đã quay về giao diện di động gọn gàng");
  }
}

// ==========================================================
// 18. INITIALIZE APP
// ==========================================================
window.addEventListener("DOMContentLoaded", () => {
  // Khởi tạo router
  window.appRouter = new Router(routes);

  // Cập nhật thông tin widget người dùng ở header
  updateHeaderUserWidget();

  // Áp dụng theme lưu trước đó nếu có
  const savedTheme = localStorage.getItem("cugay_theme");
  if (savedTheme) {
    currentThemeIndex = THEMES.indexOf(savedTheme);
    if (currentThemeIndex === -1) currentThemeIndex = 0;
    applyTheme(savedTheme);
  }

  // Khôi phục desktop mode nếu đã lưu
  if (localStorage.getItem("cugay_desktop_mode") === "true") {
    document.documentElement.classList.add("force-desktop");
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) viewportMeta.setAttribute("content", "width=1100, initial-scale=0.35, user-scalable=yes");
    const btn = document.getElementById("desktop-mode-btn");
    if (btn) btn.classList.add("active");
  }
});
