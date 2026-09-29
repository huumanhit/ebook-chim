-- ==============================================================================
-- SUPABASE POSTGRESQL SEED DATA: DỮ LIỆU THỰC CHIẾN MẪU
-- Dành cho Supabase Project: fowwdgzbmuwhmuujuaii
-- Chạy tệp này trong Supabase Dashboard -> SQL Editor sau khi đã chạy supabase_schema.sql
-- ==============================================================================

-- 1. USERS
INSERT INTO public.users (id, username, display_name, avatar, bio, quote, experience_years, location, role, status, created_at)
VALUES 
('user_author', 'tacgia', 'Người Mê Cu Gáy Rừng', 'assets/images/user_author.png', 'Tác giả sổ tay kinh nghiệm chọn chim cu gáy. Đi nhiều rừng, nuôi nhiều lồng, nhận ra nết chơi và hậu vận mới là thứ giữ chân người chơi.', 'Không dạy bạn chọn chim. Chỉ cho bạn cách tôi nhìn một con chim.', 12, 'Lâm Đồng & Bình Phước', 'admin', 'active', '2024-01-10 08:00:00+07'),
('user_caydongmoi', 'caydongmoi', 'Cây Đồng Mồi', 'assets/images/user_caydongmoi.png', 'Người chuyên chơi chim đồng, mê tiếng gáy thổ rền và nước thúc dồn dập. Thích những con chim chịu sương gió, bền bỉ qua từng mùa rẫy.', 'Tôi không tìm con chim đẹp nhất. Tôi tìm con chim hợp cách chơi của mình.', 8, 'Đồng Nai', 'member', 'active', '2024-02-15 09:30:00+07'),
('user_bacba', 'bacbadatdo', 'Bác Ba Đất Đỏ', 'assets/images/user_bacba.png', 'Đã kinh qua hàng trăm con bổi đất đỏ bazan. Đúc kết kinh nghiệm qua những lần chọn sai cay đắng.', 'Chim hay tại rừng chưa chắc về lồng chịu nổi tính người.', 16, 'Bình Phước', 'member', 'active', '2024-01-20 14:15:00+07')
ON CONFLICT (id) DO UPDATE SET display_name = EXCLUDED.display_name;

-- 2. USER CRITERIA (Mục 20.5: Tiêu chí riêng của từng người)
INSERT INTO public.user_criteria (user_id, criterion_name, importance_level, sort_order, notes)
VALUES
('user_caydongmoi', 'Hậu', 'rat_cao', 1, 'Hậu là căn bản, không có hậu thì tiền nhanh mấy cũng bỏ'),
('user_caydongmoi', 'Độ bền', 'rat_cao', 2, 'Gặp chim bổi dữ vẫn giữ được nhịp đệm'),
('user_caydongmoi', 'Giọng', 'cao', 3, 'Thích thổ rền hoặc kim pha đồng ấm'),
('user_caydongmoi', 'Tiền', 'cao', 4, 'Bắt cội dứt khoát nhưng không vội vã bốc đồng'),
('user_caydongmoi', 'Thần thái', 'cao', 5, 'Mắt sâu, quy đóng khít'),
('user_caydongmoi', 'Bộ mã', 'trung_binh', 6, 'Gọn gàng vừa tay cầm'),
('user_caydongmoi', 'Chân', 'thap', 7, 'Khô ráo sạch sẽ là đủ, không quá câu nệ màu'),

('user_bacba', 'Thần thái', 'rat_cao', 1, 'Thần khí vững vàng, chim rừng ép không loạn'),
('user_bacba', 'Độ bền', 'rat_cao', 2, 'Đánh rẫy suốt ngày nắng gắt vẫn giữ nước gù'),
('user_bacba', 'Hậu', 'cao', 3, 'Gù dồn, siết nết khi bổi nhập tàn'),
('user_bacba', 'Giọng', 'trung_binh', 4, 'Giọng vừa nghe, chủ yếu nết đè chim rừng'),
('user_bacba', 'Tiền', 'trung_binh', 5, 'Ra cội từ tốn'),
('user_bacba', 'Bộ mã', 'thap', 6, 'Không chuộng lông dài diêm dúa'),
('user_bacba', 'Chân', 'thap', 7, 'Đứng vững cầu là được')
ON CONFLICT (user_id, criterion_name) DO NOTHING;

-- 3. BIRDS (Mục 20.4: Hồ sơ con chim)
INSERT INTO public.birds (id, owner_id, name, image, voice, type, age_years, origin, notes, initial_assessment, field_experience, current_assessment, status, created_at)
VALUES
('dong-dream', 'user_caydongmoi', 'Đồng Dream', 'assets/images/bird_cu_gay.png', 'Thổ Rền', 'Chim Mồi Rừng', '4 năm lồng', 'Rừng Mã Đà, Đồng Nai', 'Thân bắp chuối, mắt lửa hạt sen, cườm hạt nhỏ đóng đều tận ức. Bản tính lì lợm.', 'Lúc mới bẫy về nhìn khá mộc mạc, bộ lông xơ xác do va lưới. Giọng thổ pha trầm, gáy thưa, tiền nhịp chậm nhưng dứt khoát.', 'Đưa vào rừng Mã Đà sau 14 tháng thuần. Trận đầu gặp bổi dữ ép 2 tiếng không lùi. Phát hiện nết gù siết hậu cực kỳ quái chiêu.', 'Một con mồi ruột đáng tin cậy. Điểm mạnh nhất không phải ở vẻ ngoài bóng bẩy mà ở độ bền khi đụng phải bổi già rừng.', 'active', '2024-03-01 10:00:00+07'),
('tho-sam-01', 'user_author', 'Thổ Sấm Đồi Chè', 'assets/images/cu_gay_hero.png', 'Thổ Sấm', 'Chim Cội & Mồi Cây', '6 năm lồng', 'Bảo Lộc, Lâm Đồng', 'Cườm cám li ti, mí mắt dày, ức nở nang. Tiếng gáy như sấm rền buổi sớm.', 'Tướng tá bình thường nhưng ánh mắt có thần khí đặc biệt. Tiếng gáy thổ sấm nặng tai, rền vang cả thung lũng.', 'Thực chiến 23 trận cội và rừng đồi. Có khả năng ghìm những con bổi bốc đồng, buộc đối thủ phải nhập tàn.', 'Con chim mẫu mực về sự đằm tính. Minh chứng rõ nhất cho việc không cần bộ mã phô trương để có nước chơi bền bỉ.', 'active', '2024-01-15 08:00:00+07'),
('dong-son-02', 'user_bacba', 'Đồng Son Đất Đỏ', 'assets/images/bird_cu_gay.png', 'Kim Pha Đồng', 'Mồi Đất Chiến', '5 năm lồng', 'Bù Đăng, Bình Phước', 'Chân khô mốc, mỏ đinh, cườm thắt vòng cổ cao. Chuyên đánh bổi đất khó tính.', 'Ban đầu nghi ngờ vì chân có vảy hơi sần, tiếng kim hơi gắt. Tưởng chừng bỏ cuộc sau 3 tháng đầu.', 'Ra đất đỏ bazan nắng gắt, chim đối thủ gáy chói tai nhưng con này gù sát phạt, đè bẹp nhịp gáy đối phương.', 'Bài học sống về việc đừng bao giờ vội phán xét một con chim chỉ qua vài nốt giọng đầu tiên trong chuồng mộc.', 'active', '2024-02-20 11:00:00+07')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- 4. BIRD TIMELINES (Mục 20.4: Cột mốc dòng thời gian)
INSERT INTO public.bird_timelines (bird_id, phase, title, content, event_date, created_at)
VALUES
('dong-dream', 'start', 'Ngày tiếp nhận từ rừng Mã Đà', 'Chim bổi bẫy lưới về, lông đuôi gãy vụn, mắt nhát người. Thả vào chuồng rộng cho ăn kê đỏ và thóc sạch.', 'Tháng 03/2021', '2024-03-01 10:05:00+07'),
('dong-dream', 'initial', 'Đánh giá sơ khởi sau 6 tháng thuần', 'Lông vũ mượt trở lại, bắt đầu cất tiếng thổ rền trong lồng mộc. Gáy thưa nhịp, chưa chịu gù người.', 'Tháng 09/2021', '2024-03-01 10:10:00+07'),
('dong-dream', 'field', 'Trận thử lửa đầu tiên tại bìa rừng', 'Treo nhánh cây điều bìa rừng, gặp bổi chúa rừng Mã Đà về rào cội. Đồng Dream không nao núng, gù đè 40 phút.', 'Tháng 05/2022', '2024-03-01 10:15:00+07'),
('dong-dream', 'update', 'Cập nhật sau 2 năm thực chiến', 'Bắt được 18 con bổi rừng già. Nết chơi ngày càng trầm tĩnh, không bao giờ nhử mồi bừa bãi khi chưa định vị được đối thủ.', 'Tháng 11/2023', '2024-03-01 10:20:00+07'),
('dong-dream', 'current', 'Đánh giá hiện tại - Chim mồi ruột', 'Đã đạt độ chín muồi hoàn hảo về tâm lý. Là con mồi tin cậy số một trong mọi chuyến đi xa.', 'Tháng 06/2024', '2024-03-01 10:25:00+07'),

('tho-sam-01', 'start', 'Bắt gặp tại nương chè Bảo Lộc', 'Con bổi chuyền đậu trên cành bơ cổ thụ, tiếng gáy thổ sấm làm rung động cả khoảng đồi sớm mai.', 'Tháng 01/2019', '2024-01-15 08:05:00+07'),
('tho-sam-01', 'field', 'Vào trận rừng Lâm Đồng', 'Đối đầu bổi dữ 3 mùa, Thổ Sấm dùng nước gù hậu níu chân chim bổi cho đến khi sa lồng bẫy.', 'Tháng 08/2020', '2024-01-15 08:10:00+07'),
('tho-sam-01', 'current', 'Đỉnh cao phong độ 6 năm lồng', 'Trở thành bạn đồng hành trung thành của tác giả, đại diện tiêu biểu cho trường phái lấy hậu đè tiền.', 'Hiện tại', '2024-01-15 08:15:00+07');

-- 5. ARTICLES (Mục 20.3 & 20.10: Bài viết phân biệt Tác giả vs Cộng đồng)
INSERT INTO public.articles (id, author_id, title, slug, excerpt, content, core_quote, cover_image, category, tags, bird_id, is_author_perspective, status, views_count, published_at, created_at)
VALUES
('art_author_1', 'user_author', 'Tại sao tôi coi Hậu quan trọng hơn Tiền', 'tai-sao-toi-coi-hau-quan-trong-hon-tien', 'Người mới chơi thường bị lóa mắt bởi nước tiền nhanh thoăn thoắt, nhưng sau 10 năm tôi nhận ra: Không có hậu, tiền chỉ như pháo hoa mau tàn.', '<p>Khi mới bắt đầu bước chân vào thú chơi cu gáy, hầu như ai trong chúng ta cũng dễ bị hớp hồn bởi những con chim có nước tiền thật bốc. Vừa treo lồng lên là gáy lia lịa, thúc dồn dập, đảo chuồng như múa. Nhưng đi rừng nhiều, đụng những con bổi già từng trải, ta mới thấu hiểu sự thật nghiệt ngã...</p><blockquote>"Tiền là cách con chim chào hỏi. Hậu mới là lý do con chim ở lại và giành chiến thắng."</blockquote><p>Một con chim tiền nhanh mà hậu rỗng thì chỉ đánh được bổi non. Khi gặp bổi cội dữ ép rào cội suốt nửa buổi, con chim tiền bốc rất mau đuối sức, nín bặt hoặc tuột lửa quay mặt bỏ đấu. Ngược lại, con chim hậu sâu có thể nhịp tiền rất thưa, nhưng khi đối thủ sáp tàn, từng nhịp gù kèm siết nết như rút hết sinh khí của con chim rừng.</p>', 'Tiền là cách con chim chào hỏi. Hậu mới là lý do con chim ở lại và chiến thắng.', 'assets/images/bird_cu_gay.png', 'tien-va-hau', 'tiền và hậu, kinh nghiệm thực chiến, hậu rền', 'tho-sam-01', TRUE, 'published', 1420, '2024-01-15 09:00:00+07', '2024-01-15 09:00:00+07'),

('art_author_2', 'user_author', '16 Tiêu Chí Nhìn Chim: Những điều mắt thấy và thực tế kiểm chứng', '16-tieu-chi-nhin-chim-thuc-te', 'Bộ mã, chân mốc, quy đóng, mỏ đinh... Tất cả chỉ là chỉ dẫn định hướng. Đừng bao giờ biến các tiêu chí hình thái thành thước đo tuyệt đối.', '<p>Trong các hội quán và sách vở truyền miệng, người ta lưu truyền hàng chục bài vè về cách xem tướng chim cu gáy: "Đầu lân, mình bắp chuối, cánh vỏ trai, chân chỉ khâu...". Tôi từng bỏ cả chục triệu để mua những con chim đúng chuẩn từng centimet hình thức, để rồi nhận lại bài học nhớ đời khi chim treo rừng không chịu nổi một trận gió bấc.</p><p>Hình tướng tốt chỉ cho thấy con chim có thể chất khỏe khoắn. Nhưng thần khí, nết gan lỳ và sự bền bỉ của giọng gáy chỉ có thể kiểm chứng qua từng mùa mưa nắng nơi chiến trường rừng sâu.</p>', 'Đừng chọn chim như chọn một bức tranh. Hãy chọn như tìm một người đồng hành qua dông bão.', 'assets/images/cu_gay_canh.png', 'quan-diem', 'tiêu chí chọn chim, hình tướng, thực chiến', NULL, TRUE, 'published', 2150, '2024-01-22 14:00:00+07', '2024-01-22 14:00:00+07'),

('art_caydongmoi_1', 'user_caydongmoi', 'Đồng Dream: Quá trình từ con bổi xơ xác đến mồi ruột Mã Đà', 'dong-dream-qua-trinh-tu-boi-xo-xac-den-moi-ruot', 'Chia sẻ nhật ký 3 năm gầy dựng con chim mồi thổ rền. Có những lúc tưởng như phải thả phóng sinh vì nết chậm chạp.', '<p>Năm 2021, tôi nhận lại con bổi này từ một người em đi lưới ở bìa rừng Mã Đà. Lông xơ xác, đuôi cụt ngủn, mắt lấm lét. Rất nhiều anh em cùng hội khuyên tôi nên thả vì tướng tá không có gì nổi trội, lại thuộc dạng chim "lầm lì xôi thịt".</p><p>Nhưng tôi thích cái ánh mắt của nó khi đối diện với người: không hoảng loạn đâm lồng đến toé máu, mà đứng ép sát góc nhìn trừng trừng. Tôi kiên nhẫn nuôi mộc suốt 14 tháng trời. Và phần thưởng ở mùa rừng thứ hai thật ngoài sức tưởng tượng...</p>', 'Tôi không tìm con chim đẹp nhất. Tôi tìm con chim hợp cách chơi của mình.', 'assets/images/bamboo_cage_garden.png', 'thuc-chien', 'nhật ký chim mồi, Mã Đà, kinh nghiệm nuôi bổi', 'dong-dream', FALSE, 'published', 890, '2024-03-05 16:30:00+07', '2024-03-05 16:30:00+07'),

('art_bacba_1', 'user_bacba', 'Những lần chọn sai cay đắng trên đất đỏ bazan', 'nhung-lan-chon-sai-cay-dang-tren-dat-do-bazan', 'Kinh nghiệm 16 năm chơi cu gáy không phải được xây nên từ những con chim đoạt giải, mà từ hàng chục lần trả giá bằng học phí đắt đỏ.', '<p>Ai trong đời chơi chim mà dám vỗ ngực nói mình chưa bao giờ nhìn lầm? Tôi nhớ mãi năm 2012, mê mẩn một con chim đất giọng sấm gáy như chuông đồng, bộ mã tròn trĩnh như bắp bi chuối. Tôi đổi cả một chiếc xe máy Dream chiến để rước về. Kết quả ra rừng gặp con bổi cụt đuôi nó gù cho 3 hơi là nhảy lồng, tróc hết cả da đầu.</p><p>Học phí của thú chơi này đắt lắm. Nhưng nếu không dám nhìn thẳng vào những lần chọn sai, người chơi sẽ mãi mãi mắc kẹt trong ảo tưởng của sự hoàn hảo hình thức.</p>', 'Học phí của thú chơi này đắt lắm. Người dám nhìn vào cái sai mới mong gặp được tri kỷ.', 'assets/images/field_notes_journal.png', 'sai-lam', 'bài học chọn sai, kinh nghiệm chơi chim, đất đỏ bazan', 'dong-son-02', FALSE, 'published', 1230, '2024-02-28 11:20:00+07', '2024-02-28 11:20:00+07'),

('art_pending_demo', 'user_caydongmoi', 'Góc nhìn về tiếng gáy Kim Pha Đồng trong thời tiết sương lạnh', 'goc-nhin-ve-tieng-gay-kim-pha-dong', 'Nhiều người chê tiếng kim chói tai buốt óc, nhưng khi đi săn vào cữ sương mù sáng sớm, tiếng kim pha đồng lại là vũ khí xuyên thấu tuyệt vời.', '<p>Bài viết chia sẻ quan sát thực tế khi đánh rừng đồi vào mùa đông sương muối. Tiếng gáy trầm ấm dễ bị sương nuốt chửng, trong khi dải âm kim pha đồng lại có khả năng thức tỉnh cả vạt rừng...</p>', 'Mỗi chất giọng đều có một hoàn cảnh để tỏa sáng.', 'assets/images/cu_gay_canh.png', 'quan-diem', 'tiếng gáy, kim pha đồng, thời tiết', NULL, FALSE, 'pending', 0, NULL, '2024-06-20 09:15:00+07')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- 6. COMMENTS (Mục 20.7: Thảo luận trao đổi)
INSERT INTO public.comments (id, article_id, user_id, parent_id, content, status, created_at)
VALUES
('cmt_001', 'art_author_1', 'user_caydongmoi', NULL, 'Rất đồng cảm với quan điểm của tác giả. Con mồi Đồng Dream của tôi lúc đầu tiền chậm như rùa bò, ai cũng chê. Nhưng ra rừng thì bổi cội dữ đến mấy cũng phải hạ tàn vì hậu siết đều đặn.', 'approved', '2024-01-16 10:15:00+07'),
('cmt_002', 'art_author_1', 'user_bacba', NULL, 'Tôi cũng từng gặp trường hợp tương tự. Con chim tiền rất nhanh nhưng hậu xuống khá sớm. Gặp bổi tơ thì bắt ngon, nhưng đụng bổi già rừng 3 mùa trở lên là hụt hơi ngay.', 'approved', '2024-01-16 15:40:00+07'),
('cmt_003', 'art_author_1', 'user_author', 'cmt_002', 'Đúng như bác Ba nói. Bổi già rừng nó quái lắm, nó chỉ nghe nhịp hậu để đo độ bền của chim mồi. Hậu rỗng là nó rào quanh cội chứ dứt khoát không chịu nhập tàn.', 'approved', '2024-01-16 16:05:00+07'),
('cmt_004', 'art_caydongmoi_1', 'user_bacba', NULL, 'Con Đồng Dream này nhìn ánh mắt lì lợm lắm chú. Mấy con mắt hạt sen mí dày này càng già lồng càng đằm tính.', 'approved', '2024-03-06 08:20:00+07'),
('cmt_005', 'art_caydongmoi_1', 'user_author', NULL, 'Rất thích cách bác kiên nhẫn nuôi mộc 14 tháng. Đa số người chơi trẻ hiện nay thiếu kiên nhẫn, nuôi 3 tháng không gáy là nản lòng sang nhượng ngay.', 'approved', '2024-03-06 09:30:00+07')
ON CONFLICT (id) DO NOTHING;

-- 7. REACTIONS (Mục 20.8)
INSERT INTO public.reactions (user_id, target_type, target_id, reaction_type, created_at)
VALUES
('user_caydongmoi', 'article', 'art_author_1', 'dong_dieu', '2024-01-16 10:00:00+07'),
('user_caydongmoi', 'article', 'art_author_1', 'huu_ich', '2024-01-16 10:01:00+07'),
('user_bacba', 'article', 'art_author_1', 'thich', '2024-01-16 15:30:00+07'),
('user_bacba', 'article', 'art_author_1', 'dong_dieu', '2024-01-16 15:31:00+07'),
('user_author', 'article', 'art_caydongmoi_1', 'huu_ich', '2024-03-06 09:00:00+07'),
('user_author', 'article', 'art_bacba_1', 'dong_dieu', '2024-03-01 10:00:00+07'),
('user_caydongmoi', 'article', 'art_bacba_1', 'thich', '2024-03-01 11:00:00+07')
ON CONFLICT DO NOTHING;

-- 8. FOLLOWS (Mục 20.6)
INSERT INTO public.follows (follower_id, following_id, created_at)
VALUES
('user_caydongmoi', 'user_author', '2024-02-16 08:00:00+07'),
('user_bacba', 'user_author', '2024-02-18 14:00:00+07'),
('user_author', 'user_caydongmoi', '2024-03-06 09:05:00+07'),
('user_caydongmoi', 'user_bacba', '2024-03-02 12:00:00+07')
ON CONFLICT DO NOTHING;

-- 9. BOOKMARKS (Mục 20.6)
INSERT INTO public.bookmarks (user_id, target_type, target_id, created_at)
VALUES
('user_author', 'bird', 'dong-dream', '2024-03-06 09:10:00+07'),
('user_caydongmoi', 'article', 'art_author_1', '2024-01-16 10:05:00+07'),
('user_caydongmoi', 'bird', 'tho-sam-01', '2024-01-16 10:06:00+07'),
('user_bacba', 'article', 'art_author_2', '2024-01-23 15:00:00+07')
ON CONFLICT DO NOTHING;

-- 10. REPORTS (Mục 20.11)
INSERT INTO public.reports (id, reporter_id, target_type, target_id, reason, details, status, resolution_note, resolved_by, created_at)
VALUES
('rep_001', 'user_caydongmoi', 'comment', 'cmt_002', 'Ngôn từ chưa phù hợp', 'Ví dụ demo báo cáo kiểm duyệt thử nghiệm', 'dismissed', 'Bình luận trao đổi kinh nghiệm bình thường, không vi phạm', 'user_author', '2024-01-17 08:00:00+07')
ON CONFLICT (id) DO NOTHING;
