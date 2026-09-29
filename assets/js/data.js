/**
 * cu-gay-guide: CSDL Dữ Liệu Sổ Tay & Bài Viết
 * Tinh thần: "Không dạy bạn chọn chim. Chỉ cho bạn cách tôi nhìn một con chim."
 * Mở rộng: Section 20 - Thư viện quan điểm cộng đồng người chơi cu gáy
 */

const SEED_DATA = {
  info: {
    title: "Sổ Tay Chọn Chim Cu Gáy",
    subtitle: "Không dạy bạn chọn chim. Chỉ cho bạn cách tôi nhìn một con chim.",
    author: "Một Người Mê Cu Gáy Rừng",
    bio: "Tôi chơi cu gáy vì thích cái thú ngồi nghe một con chim vào nước, nhìn nó chuyển bài và chờ xem nó còn giữ được bao nhiêu sau một khoảng thời gian giằng co dưới tán rừng.",
    disclaimer: "Đây là cuốn sổ tay ghi lại quan sát và trải nghiệm cá nhân của tôi qua nhiều năm dãi nắng dầm mưa cùng lồng bẫy. Không có tiêu chuẩn nào là chân lý tuyệt đối. Chim đẹp chưa chắc đánh hay, chim bình thường chưa chắc không có giá trị. Cuối cùng, thực chiến dưới tàn cây mới là câu trả lời."
  },

  // Hệ thống người dùng (Users)
  users: [
    {
      id: "user_author",
      username: "tacgia",
      displayName: "Người Mê Cu Gáy Rừng",
      role: "admin", // Admin có quyền duyệt bài, ẩn bài, xóa báo cáo
      avatar: "./assets/images/hero-dove.jpg",
      bio: "Tôi chơi cu gáy vì thích cái thú ngồi nghe một con chim vào nước, nhìn nó chuyển bài và chờ xem nó còn giữ được bao nhiêu sau một khoảng thời gian giằng co dưới tán rừng.",
      quote: "Không dạy bạn chọn chim. Chỉ cho bạn cách tôi nhìn một con chim.",
      experienceYears: 12,
      location: "Đồng Nai & Bình Phước",
      createdAt: "15/01/2024",
      criteria: {
        giong: "Cao",
        tien: "Cao",
        hau: "Rất cao",
        boMa: "Trung bình",
        chan: "Thấp",
        thanThai: "Rất cao",
        doBen: "Rất cao"
      }
    },
    {
      id: "user_caydongmoi",
      username: "caydongmoi",
      displayName: "Cây Đồng Mồi",
      role: "user",
      avatar: "./assets/images/cage-garden.jpg",
      bio: "Chuyên mồi cây đánh cội vùng cao su Tân Uyên. Nghiêng về tiếng đồng pha thổ rền, thích sự đầm tính và nhẫn nại.",
      quote: "Tôi không tìm con chim đẹp nhất. Tôi tìm con chim hợp cách chơi của mình.",
      experienceYears: 8,
      location: "Tân Uyên, Bình Dương",
      createdAt: "10/04/2024",
      criteria: {
        giong: "Cao",
        tien: "Cao",
        hau: "Rất cao",
        boMa: "Trung bình",
        chan: "Thấp",
        thanThai: "Cao",
        doBen: "Rất cao"
      }
    },
    {
      id: "user_bacba",
      username: "bacbadatdo",
      displayName: "Bác Ba Đất Đỏ",
      role: "user",
      avatar: "./assets/images/field-journal.jpg",
      bio: "Cựu trần rừng cao su Long Thành. Thích chim đầm tính, nhử rước ngọt ngào, xem nhẹ vảy chân tướng mã.",
      quote: "Một tiếng gáy rước đúng thời điểm hơn vạn tiếng gù đè nông nổi.",
      experienceYears: 16,
      location: "Long Thành, Đồng Nai",
      createdAt: "20/02/2024",
      criteria: {
        giong: "Rất cao",
        tien: "Trung bình",
        hau: "Rất cao",
        boMa: "Thấp",
        chan: "Thấp",
        thanThai: "Rất cao",
        doBen: "Rất cao"
      }
    }
  ],

  // 16 Tiêu chí "Cách Nhìn Chim" chuẩn cấu trúc 5 phần
  criteria: [
    {
      id: "dang",
      name: "Dáng (Hình tướng)",
      category: "Ngoại hình & Khí chất",
      shortSummary: "Tôi chuộng dáng bắp chuối, ức nở, đứng gù lưng cong hơn là dáng đứng ngửa nghêu.",
      icon: "fa-feather",
      lookAt: "Tôi quan sát độ thon gọn từ ức chim vuốt xuống phao câu khi chim đứng yên trên cầu, và độ cong của sống lưng khi chim chuẩn bị vào gù.",
      prioritize: "Tôi ưu tiên con chim có dáng bắp chuối hoặc dáng giọt nước: ngực nở rộng, eo thon gọn ghẽ, hai đùi khép sát thân. Dáng này thường giữ thăng bằng tốt trên cành cây lắc lư khi gió lùa.",
      notImportant: "Tôi không quá quan trọng chim phải to xác cồng kềnh. Nhiều con bổi to con nhìn oai vệ như gà chọi trong lồng nhưng ra rừng lại chậm chạp, xoay trở vụng về trước những pha sà cành của bổi dữ.",
      fieldExperience: "Thực chiến cho tôi thấy: những con chim dáng vừa phải, thân săn chắc như quả cà tím thuôn dài mới là những con bám cội dai dẳng nhất. Nó không tốn sức giữ thăng bằng nên vào gù rất bền nhịp.",
      note: "Quan điểm cá nhân: Một con chim dáng chuẩn sách vở mà thiếu độ lanh lẹ trong mắt thì chỉ thích hợp ngắm cảnh trong phòng khách."
    },
    {
      id: "dau",
      name: "Đầu (Đầu trọc, đầu rùa)",
      category: "Ngoại hình & Khí chất",
      shortSummary: "Đầu búp sen hoặc đầu vuông trán dô, gáy thắt lại tạo cảm giác lì lợm.",
      icon: "fa-circle-notch",
      lookAt: "Tôi nhìn độ phẳng của chóp đầu và cách xương sọ nối liền với phần cổ gáy.",
      prioritize: "Tôi thích đầu chim có góc cạnh nhẹ (đầu rùa hoặc búp chuối thuôn), trán hơi vát, gáy thắt lại. Nhìn con chim có vẻ lanh lợi và có độ 'chắc đòn'.",
      notImportant: "Tôi không câu nệ đầu chim phải tròn ủng hay nhẵn thín không tì vết. Nhiều con đầu hơi gồ ghề nhưng ra cội ứng biến cực kỳ khôn ngoan.",
      fieldExperience: "Thực tế qua nhiều chuyến gác kèo: đầu nhỏ vừa vặn với cổ giúp chim xoay trở 360 độ cực nhanh khi đối phương lượn vòng thăm dò. Con nào đầu quá to thường phản xạ ngước nhìn chậm hơn một nhịp.",
      note: "Quan điểm cá nhân: Tướng đầu chỉ phản ánh phần nào tính cảnh giác, bản lĩnh thật sự nằm ở độ lì khi bị chim trời ép sát."
    },
    {
      id: "mo",
      name: "Mỏ (Mỏ đinh, mỏ sẻ)",
      category: "Ngoại hình & Khí chất",
      shortSummary: "Mỏ ngắn, gốc mỏ khép khít, lỗ mũi hẹp và khô ráo.",
      icon: "fa-compress-alt",
      lookAt: "Độ dài của mỏ từ mép đến chóp mỏ, độ dầy của gốc mỏ và cách hai mép mỏ ngậm chặt lại khi nghỉ.",
      prioritize: "Tôi ưu tiên mỏ ngắn, thẳng như gốc đinh hoặc mỏ hạt thóc, gốc mỏ sâu vào mặt. Những con này khi ra giọng tiếng gáy thường chắc, tiếng 'cục cù' nghe giòn giã không bị loãng hơi.",
      notImportant: "Tôi không quá bận tâm đến màu sắc của mỏ (đen mun hay xám chì). Màu mỏ đôi khi thay đổi theo thổ nhưỡng và thức ăn bổi ăn ngoài rừng.",
      fieldExperience: "Nhiều con mỏ dài quặp kiểu mỏ diều hâu nhìn dữ dằn nhưng thực chiến gáy lại rỗng tiếng, nhanh hụt hơi khi đối phương gù đè dồn dập.",
      note: "Quan điểm cá nhân: Mỏ ngắn giúp hơi nén tốt hơn, tiếng gù phát ra có độ ép lực sâu vào màng nhĩ người nghe."
    },
    {
      id: "mat",
      name: "Mắt & Mí Mắt",
      category: "Ngoại hình & Khí chất",
      shortSummary: "Đồng tử nhỏ như hạt kê, mí mỏng khép sâu, tia mắt ánh lửa không đảo lơ đãng.",
      icon: "fa-eye",
      lookAt: "Tôi nhìn tròng đen (đồng tử) khi con chim đứng ngoài nắng: đồng tử có co thắt nhạy bén hay không, và viền mí mắt có sát vào chân lông không.",
      prioritize: "Tôi chuộng tròng đen nhỏ như đầu kim hoặc hạt kê, xung quanh có viền vàng cam hoặc đỏ quạch. Ánh mắt phải có sự tập trung cao độ, nhìn thẳng vào mục tiêu chứ không đảo loạn xạ hoảng loạn.",
      notImportant: "Tôi không phân biệt quá khắt khe mắt trắng hay mắt vàng. Cả hai loại đều có những con mồi sát thủ nếu lòng ngươi co giãn tốt.",
      fieldExperience: "Con chim có mí mắt dày, lộ mỡ trắng thường rất nhát người và dễ bị 'ngợp' khi nắng gắt dội xuống cành bẫy. Con mắt khô, mí mỏng mới chịu được cái nắng chang chang lúc chính ngọ.",
      note: "Quan điểm cá nhân: Ánh mắt chính là tấm gương phản chiếu thần kinh của con chim. Mắt yếu thì chim không thể làm mồi cây."
    },
    {
      id: "cuom",
      name: "Cườm (Bàn cườm & Hạt cườm)",
      category: "Ngoại hình & Khí chất",
      shortSummary: "Hạt cườm khô ráo, đóng vuông vức, nền cườm đen sẫm cườm hoa cà hạt đỗ.",
      icon: "fa-braille",
      lookAt: "Tôi quan sát bàn cườm đóng cao hay thấp ở cổ, độ khít của các hạt trắng và độ đen tuyền của lớp lông nền bên dưới.",
      prioritize: "Tôi thích cườm hạt đỗ hoặc hạt vừng, đóng rải đều, nền đen tuyền như than củi, hạt trắng bóng khô ráo. Cườm đóng gọn trên cổ, không xòe bờm xờm như yếm dãi.",
      notImportant: "Tôi không quá quan trọng cườm phải giáp vòng (cườm kín cổ 100%). Nhiều con cườm hở một vệt nhỏ ở ức nhưng ra rừng đánh bài bản xuất sắc, khóa chặt bổi già.",
      fieldExperience: "Một con chim cườm quá dày phủ kín ngực thường nhìn rất đẹp trong lồng, nhưng nhiều lần tôi thấy chim cườm bông xù xì lại dễ bị ướt sũng khi gặp sương sớm, làm giảm độ hăng hái.",
      note: "Quan điểm cá nhân: Đừng vì một bàn cườm hoa cà tuyệt đẹp mà bỏ qua việc con chim đó có biết gáy rước đúng lúc hay không."
    },
    {
      id: "canh",
      name: "Cánh & Quy Cánh",
      category: "Ngoại hình & Khí chất",
      shortSummary: "Quy cánh khép chặt như nắp sò, lông cánh so le đều, chóp cánh vắt chéo nhẹ.",
      icon: "fa-dove",
      lookAt: "Độ ốp của hai bờ quy cánh vào sườn chim, và độ dài của chóp cánh so với chóp đuôi.",
      prioritize: "Tôi ưu tiên cánh xếp khít khao, quy cánh nổi gồ lên như hai mảnh trai ốp vào hông, chóp cánh bắt chéo nhẹ trên lưng hoặc dài ngang chấm phao câu.",
      notImportant: "Tôi không để ý quá nhiều đến hoa văn vảy cánh đậm hay nhạt. Vảy cánh là đặc điểm vùng miền rừng núi đá hay đồng bằng.",
      fieldExperience: "Cánh ốp chặt giúp chim không bị gió bạt làm xô lệch tư thế khi đứng trên ngọn cây cao. Những con cánh lòng thòng thường mau đuối sức khi phải gù đứng nhiều hiệp.",
      note: "Quan điểm cá nhân: Cánh khít là dấu hiệu của một cơ thể có thể lực dẻo dai và gân cốt vững chãi."
    },
    {
      id: "duoi",
      name: "Đuôi (Bản đuôi & Phao câu)",
      category: "Ngoại hình & Khí chất",
      shortSummary: "Đuôi vót búp tre, bản đuôi khép gọn như một chiếc đũa, phao câu to khít.",
      icon: "fa-stream",
      lookAt: "Lúc chim đứng bình thường, đuôi có chụm lại thành một dải gọn gàng hay xòe như chiếc quạt giấy.",
      prioritize: "Tôi thích đuôi vót búp tre: các sợi lông đuôi xếp chồng khít lên nhau, nhìn thẳng từ sau chỉ thấy một đường thon dài. Phao câu chim phải dầy và kín.",
      notImportant: "Tôi không chê những con đuôi hơi cúp nhẹ xuống cầu. Miễn là khi gù đuôi không bị quạt tán loạn làm mất thế chim.",
      fieldExperience: "Đuôi xòe bẹt thường dễ bị cành cây quẹt làm gãy xơ xác sau vài chuyến đi rừng gai góc. Đuôi đũa gọn gàng vừa sạch sẽ vừa giữ phao câu ấm áp trong mùa đông gió bấc.",
      note: "Quan điểm cá nhân: Chiếc đuôi gọn phản ánh sự cẩn trọng và kỷ luật tự nhiên của con bổi."
    },
    {
      id: "chan",
      name: "Chân (Vảy chân, ngón & móng)",
      category: "Ngoại hình & Khí chất",
      shortSummary: "Chân khô, vảy khít, các ngón dài gắp cầu như gọng kìm, móng ngắn sắc.",
      icon: "fa-shoe-prints",
      lookAt: "Cách chim co duỗi chân khi đứng cầu, độ khô của lớp biểu bì da chân và độ mở của các ngón bám.",
      prioritize: "Tôi chọn chân màu đồng thau hoặc đỏ tía khô ráo, vảy đóng khít không bong tróc, các ngón xòe rộng ôm trọn thân cầu. Độ bám phải vững chãi như rễ cây cổ thụ bám đá.",
      notImportant: "Tôi không quá mê tín vào các bài vảy phong thủy cổ truyền (như vảy rồng, liên giáp nội). Có những con chân vảy loạn nhưng móng bám chắc nịch vẫn đánh bắt bổi cực kỳ xuất sắc.",
      fieldExperience: "Chân ướt, mập mạp béo tốt thường là chim nuôi cám công nghiệp, ra cội đứng gió chướng một lúc là mỏi khớp, nhảy lảo đảo làm lật úp lồng bẫy.",
      note: "Quan điểm cá nhân: Bàn chân là điểm tựa duy nhất của chim giữa trời xanh. Điểm tựa yếu thì đừng bàn đến chuyện gù đấu."
    },
    {
      id: "than-thai",
      name: "Thần Thái (Khí phách & Độ điềm đạm)",
      category: "Ngoại hình & Khí chất",
      shortSummary: "Tĩnh như tượng gỗ khi ở nhà, nhưng sáng quắc ánh mắt sát khí khi giáp trận.",
      icon: "fa-fire",
      lookAt: "Nhịp thở của chim khi có người lạ tiến lại gần, và cách chim ngẩng đầu đón nhận các âm thanh bất thường từ môi trường.",
      prioritize: "Tôi tìm kiếm thần thái điềm đạm, lạnh lùng. Con chim không nhảy nhót nhắng nhít nhưng mỗi lần cất tiếng hay xoay đầu đều toát lên vẻ chững chạc, làm chủ tình thế.",
      notImportant: "Tôi không thích những con chim quá lăng xăng, bạ ai cũng gù, bạ cái gì cũng nhảy. Sự hung hăng bồng bột thường nhanh tắt ngấm.",
      fieldExperience: "Con mồi già cội luôn là con chim đứng im lìm nhất ở góc dàn, nhưng khi móc lên cây ngọn rừng già thì không một con bổi nào có thể dọa nạt được nó.",
      note: "Quan điểm cá nhân: Thần thái là thứ không thể rèn luyện bằng cám béo, nó là bản năng sinh tồn ngấm trong xương tủy."
    },
    {
      id: "giong-tho",
      name: "Giọng Thổ (Trầm, rền, đục)",
      category: "Giọng & Nước Gù",
      shortSummary: "Tiếng gáy trầm ấm, âm vang như tiếng chuông đồng vọng từ đáy giếng sâu.",
      icon: "fa-bell",
      lookAt: "Độ phồng của bầu diều và lồng ngực khi chim ngân nga tiếng 'chu... chu... cù'.",
      prioritize: "Tôi mê giọng Thổ đồng hoặc Thổ sấm: tiếng gáy không quá chói tai nhưng có độ rền lan tỏa khắp sườn đồi, tạo cảm giác thôi miên và kích thích sự tò mò của chim rừng.",
      notImportant: "Tôi không chê giọng Thổ có pha một chút âm Kim đanh. Đôi khi một chút kim giúp tiếng gáy xuyên qua màn sương mù dày đặc tốt hơn.",
      fieldExperience: "Giọng Thổ luôn có sức giữ chân bổi rừng lâu nhất. Nghe tiếng Thổ, bổi rừng thường không vội vàng bay đi mà đậu lại cành rào lắng nghe.",
      note: "Quan điểm cá nhân: Nghe một tiếng Thổ rền lúc mờ sáng bên tách trà ấm là cái thú thanh tao nhất của người chơi cu gáy."
    },
    {
      id: "giong-kim",
      name: "Giọng Kim (Trong, đanh, lảnh lót)",
      category: "Giọng & Nước Gù",
      shortSummary: "Tiếng gáy sắc bén, giòn giã như tiếng kim loại chạm nhau giữa không trung.",
      icon: "fa-music",
      lookAt: "Cách chim ngắt nhịp cuối của tiếng cù: có dứt khoát và trong trẻo như giọt nước rơi không.",
      prioritize: "Tôi thích giọng Kim chuông hoặc Kim son: tiếng gáy vang rất xa, có thể kích động những con bổi rừng ở khoảng cách cả cây số bay về tiếp chiến.",
      notImportant: "Tôi không ép giọng Kim phải gáy chậm rãi. Giọng Kim thường đi liền với nhịp thúc mau lẹ, tạo nên không khí trận đấu sôi nổi.",
      fieldExperience: "Mồi giọng Kim đánh ở những cánh rừng thưa, đồi dốc thoáng đãng rất hiệu quả vì âm thanh không bị cản trở bởi tán cây rậm rạp.",
      note: "Quan điểm cá nhân: Kim hay Thổ chỉ là sắc thái âm nhạc, quan trọng là con chim có biết cách dùng giọng của mình để dẫn dắt trận đấu hay không."
    },
    {
      id: "do-day-gu",
      name: "Độ Dày Gù (Chuỗi gù & Dày tiếng)",
      category: "Giọng & Nước Gù",
      shortSummary: "Tiếng gù dày dặn, các tiếng gù nối tiếp nhịp nhàng không bị rời rạc đứt quãng.",
      icon: "fa-layer-group",
      lookAt: "Mật độ của từng chuỗi gù: khoảng cách giữa các tiếng 'gù... gù... gù' có đều đặn như nhịp búa đập không.",
      prioritize: "Tôi chọn độ dày gù có nội lực: mỗi nhịp gù thân chim hơi rùng mình nhẹ, tiếng phát ra tròn vành rõ chữ, không bị nuốt chữ cuối.",
      notImportant: "Tôi không đếm số lượng tiếng gù theo kiểu máy móc (phải 15 hay 20 tiếng một dây). Chất lượng của 5 tiếng gù có lực giá trị hơn 20 tiếng gù phào phào như thở dốc.",
      fieldExperience: "Chim bổi rừng rất nhạy cảm với độ dày gù. Khi nghe một chuỗi gù dày đặc và đanh thép, bổi già sẽ bị kích động lòng tự trọng lãnh địa và lao vào đá ngay.",
      note: "Quan điểm cá nhân: Tiếng gù dày chứng tỏ phổi chim khỏe và bản lĩnh tự tin tuyệt đối trước hiểm nguy."
    },
    {
      id: "tien",
      name: "TIỀN (Vào nước ban đầu)",
      category: "Nước Chơi & Độ Bền",
      shortSummary: "Độ xông xáo, cách chào đón đối thủ, khả năng nắm giữ thế chủ động ngay từ phút đầu.",
      icon: "fa-forward",
      lookAt: "Từ giây phút bổi xuất hiện trong tầm mắt, chim mồi chuyển bài gáy thúc sang gáy rước như thế nào.",
      prioritize: "Tôi thích con chim có Tiền chủ động: nó rước ngọt ngào nhưng dứt khoát, tiếng thúc dồn dập vừa đủ để giữ chân con chim rừng không bỏ bay đi chỗ khác.",
      notImportant: "Tôi không quan trọng chim phải hung hăng nhảy chồm chồm vào mặt đối thủ. Hung hăng quá sớm thường làm lộ sơ hở.",
      fieldExperience: "Một con chim Tiền tốt giúp bạn tiết kiệm được hàng giờ đồng hồ ngồi chờ trong bụi rậm. Nó biết cách 'thôi miên' con bổi ngay từ cành xa bay về cành thế.",
      note: "Quan điểm cá nhân: Tiền là lời mở đầu của câu chuyện, mở đầu có duyên thì đối phương mới chịu ngồi lại lắng nghe."
    },
    {
      id: "hau",
      name: "HẬU (Sức giữ nước & Hậu gù)",
      category: "Nước Chơi & Độ Bền",
      shortSummary: "Sau 30-40 phút giằng co căng thẳng, chim vẫn giữ được bài, không xìu chim, không bỏ cầu.",
      icon: "fa-hourglass-end",
      lookAt: "Phong độ của con chim khi trận đấu kéo dài qua trưa, trời nắng chang chang và đối thủ là một con bổi già lõi đời liên tục đè gù.",
      prioritize: "HẬU là thứ tôi trân trọng nhất. Tôi ưu tiên con chim dù mệt nhưng tiếng gù vẫn chắc, vẫn biết trở nước gáy dặm để xoa dịu rồi lại siết gù khi bổi manh động.",
      notImportant: "Tôi không đòi hỏi con chim lúc nào cũng phải thắng trận. Một con chim thua một trận nhưng Hậu bền bỉ đến giọt mồ hôi cuối cùng vẫn là con chim đáng giữ trong nhà.",
      fieldExperience: "Nhiều con Tiền cực hay, bay nhảy rước gù long trời lở đất trong 10 phút đầu, nhưng sang phút 25 bổi rừng chưa chịu nhảy bẫy là bắt đầu lùi cầu, rỉa lông, ngó lơ. Đó là chim thiếu Hậu.",
      note: "Quan điểm cá nhân: Nuôi chim mồi cốt để chơi bền bỉ nhiều năm; một con chim có Hậu chính là chỗ dựa tinh thần tin cậy nhất của người đi rừng."
    },
    {
      id: "nuoc-choi",
      name: "Nước Chơi (Cách chuyển bài, lắt léo)",
      category: "Nước Chơi & Độ Bền",
      shortSummary: "Biết lúc cương lúc nhu, biết ép khi bổi nản và biết thả lỏng khi bổi hoảng sợ.",
      icon: "fa-chess-knight",
      lookAt: "Sự linh hoạt trong cách chim thay đổi giữa tiếng thúc giục, tiếng kèm 1 kèm 2, và tiếng gù chặn đầu.",
      prioritize: "Tôi chuộng những con chim có nước chơi 'lươn lẹo': lúc bổi hung thì nó hạ giọng gù trầm nhường nhịn, lúc bổi toan quay đầu bay đi thì nó rước ngọt lịm kéo lại.",
      notImportant: "Tôi không đòi hỏi chim phải có đủ mọi ngón nghề như chim trong truyền thuyết. Chỉ cần thuần thục 2-3 ngón đòn ruột là đã đủ xưng vương một cội cây.",
      fieldExperience: "Những con chim chỉ có một bài gù duy nhất từ đầu tới cuối thường rất dễ bị bổi rừng bắt bài. Chim có nước chơi thông minh mới thu phục được những con bổi chúa tinh khôn.",
      note: "Quan điểm cá nhân: Nước chơi thể hiện cái trí của con chim mồi. Chơi chim cũng như đánh cờ thế, không phải cứ mạnh là thắng."
    },
    {
      id: "do-ben",
      name: "Độ Bền (Thể lực & Năm tháng)",
      category: "Nước Chơi & Độ Bền",
      shortSummary: "Đánh hết mùa này qua mùa khác, không bị 'bể mồi' sau những lần bị chim lạ tấn công.",
      icon: "fa-shield-alt",
      lookAt: "Tâm lý hồi phục của con chim sau những chuyến đi mưa ướt sũng hoặc những lần bị chim bổi rừng hung dữ nhảy bám lồng cắn xé.",
      prioritize: "Tôi đề cao độ bền thần kinh: sau khi bị chim rừng đè một trận tơi bời, chỉ cần nghỉ dưỡng vài ngày là lại cất tiếng gáy rền rĩ, không ôm hận sợ hãi.",
      notImportant: "Tôi không cần con chim ngày nào cũng phải đi đánh bẫy. Chim cũng như con người, cần có quãng thời gian thay lông và tĩnh dưỡng phục hồi.",
      fieldExperience: "Một con chim mồi hay phải là con chim chơi được ít nhất 5 đến 7 mùa rừng. Những con bốc hỏa một mùa rồi tắt ngóm chỉ là pháo hoa rực rỡ thoáng qua.",
      note: "Quan điểm cá nhân: Độ bền tạo nên linh hồn của một con mồi cội. Chơi cu gáy là thú vui của sự kiên nhẫn qua từng năm tháng dài."
    }
  ],

  // 6 Giai đoạn Visual Timeline: Tiền & Hậu
  timelineStages: [
    {
      step: 1,
      name: "Vào Nước",
      time: "Phút 0 - 3",
      action: "Phát hiện mục tiêu & Định vị",
      description: "Khi treo lồng lên cành, chim mồi cất tiếng gáy thúc từ tốn để thăm dò không gian. Tiếng gáy vang xa báo hiệu sự hiện diện của kẻ bảo vệ lãnh địa.",
      focus: "Tôi nhìn xem chim có vội vã giãy giụa hay không. Chim tĩnh tâm sẽ đứng vững trên cầu, ngực ưỡn nhẹ, lắng nghe tiếng rừng đáp lại.",
      tag: "TIỀN"
    },
    {
      step: 2,
      name: "Bắt Nhịp",
      time: "Phút 3 - 8",
      action: "Giao tiếp & Đối âm",
      description: "Bổi rừng từ đồi xa bắt đầu gáy trả lời. Chim mồi lập tức điều chỉnh nhịp thúc: tiếng gáy trở nên dồn dập, gắt gao hơn để kéo đối phương vào cự ly gần.",
      focus: "Quan sát độ nhạy và nhịp điệu. Con chim khôn ngoan sẽ gáy ngắt quãng đúng lúc bổi ngừng gáy để tạo sự đối thoại ăn ý.",
      tag: "TIỀN"
    },
    {
      step: 3,
      name: "Rước",
      time: "Phút 8 - 15",
      action: "Dụ bổi vào cành thế",
      description: "Bổi đã bay về ngọn cây nhưng còn dè chừng ngoài xa. Đây là lúc nước 'Rước' phát huy ma lực: tiếng gáy hạ xuống trầm ấm, ngọt ngào, xen kẽ tiếng cúc cù tha thiết.",
      focus: "Nước rước quyết định bổi có chịu sà xuống nhánh bẫy hay bay sang cây khác. Rước vụng về bổi sẽ nghi ngờ và bay mất.",
      tag: "TIỀN"
    },
    {
      step: 4,
      name: "Vào Gù",
      time: "Phút 15 - 25",
      action: "Giáp mặt & Siết gù đè bẹp",
      description: "Bổi nhảy xuống cành ngang sát lồng. Hai con chim đối mặt. Chim mồi xòe cườm, chúc đầu xuống cầu tung ra những tràng gù dồn dập, uy lực.",
      focus: "Độ dày và lực nén của tiếng gù. Chim gù nhịp tim đều đặn, mắt gườm trừng trừng vào đối thủ để đoạt quyền kiểm soát tinh thần.",
      tag: "TIỀN → HẬU"
    },
    {
      step: 5,
      name: "Kéo Dài",
      time: "Phút 25 - 45",
      action: "Thử thách thể lực & Tâm lý",
      description: "Gặp phải bổi già lõi rừng không chịu nhảy bẫy ngay mà đứng gù cù cưa gườm gườm. Thể lực bắt đầu cạn kiệt, cổ họng khô rát, gió thổi lắc lư cành cây.",
      focus: "Đây là lằn ranh phân biệt chim non tay và chim cội. Chim non bắt đầu há mồm thở dốc, mắt lấm lét, nhảy lùi cầu bỏ cuộc.",
      tag: "HẬU"
    },
    {
      step: 6,
      name: "Hậu",
      time: "Phút 45+",
      action: "Độ lỳ lợm & Đòn kết liễu",
      description: "Những gì còn lại khi cuộc chiến bước vào giai đoạn cam go nhất. Chim mồi vẫn đứng vững chãi, tiếng gù tuy không còn quá nhanh nhưng âm lực đượm sâu, ghì chặt đối phương cho đến khi bổi sập bẫy.",
      focus: "Độ lì, khả năng trở nước gáy dặm để xoa dịu rồi lại siết gù. Không xuống chim quá nhanh. Đó chính là HẬU - thứ giá trị nhất trong một đời chơi cu gáy.",
      tag: "HẬU"
    }
  ],

  // Các bài viết góc nhìn / Quan điểm (Tác giả + Cộng đồng)
  articles: [
    {
      id: "gu-nhieu-chua-chac-hay",
      slug: "gu-nhieu-chua-chac-la-chim-hay",
      title: "Gù nhiều chưa chắc là chim hay",
      authorId: "user_author",
      authorName: "Người Mê Cu Gáy Rừng",
      isAuthor: true,
      badge: "Tác giả",
      status: "published",
      category: "Quan điểm",
      readingTime: "5 phút đọc",
      publishedAt: "24/09/2026",
      coverImage: "./assets/images/hero-dove.jpg",
      excerpt: "Nhiều anh em mới chơi thường đếm số lượng tiếng gù để định giá con chim. Nhưng sau nhiều lần trắng tay dưới cành keo, tôi nhận ra gù bừa bãi chỉ là sự nông nổi của con chim thiếu chiều sâu.",
      myPerspective: "Tôi nhìn một con chim gù ở chất lượng của từng tiếng gù, độ dày của âm thanh và cách nó biết dừng đúng lúc để nhử bổi vào thế hiểm, chứ không nhìn vào một chuỗi gù vô hồn kéo dài rồi kiệt sức.",
      fieldVerification: "Thực chiến đã chứng minh: những con chim gù liên thanh 20-30 tiếng khi ở nhà, ra rừng gặp bổi cội chỉ cần đối phương gù chặn đầu 3 tiếng là đã thụt cổ nhảy đáy lồng.",
      content: `
<p>Hồi mới tập tành chơi cu gáy cách đây mười năm, tôi cũng giống như phần đông anh em mới bước chân vào bộ môn này: cứ thấy con nào đứng trong lồng mà gù liên tu bất tận, gù rát mặt, gù đến nỗi người đi ngang qua cũng gù là mắt sáng rực lên. Trong đầu nghĩ ngay: <em>“Đây rồi, con sát thủ đây rồi!”</em></p>

<p>Nhưng cái giá của sự ngây thơ lúc đó là những chuyến đi rừng mướt mồ hôi mà lồng bẫy vẫn trống trơn mang về.</p>

<h3>Số lượng không đồng nghĩa với uy lực</h3>
<p>Một con chim có thể gù một lèo 25 đến 30 tiếng khi nó đang ở trong vùng an toàn của nó — tức là cái hiên nhà quen thuộc, ngày ngày ăn kê ngâm nước sạch, có người ngắm nghía khen ngợi. Đó chỉ là sự sung mãn về mặt sinh học đơn thuần của một con bổi nuôi thuần có cám béo.</p>

<p>Thế nhưng, khi bạn đem nó ra khỏi cái hiên nhà êm ấm ấy, trèo lên một ngọn đồi chè hun hút gió ở Tân Uyên hay một cánh rừng keo bạt ngàn ở Bình Phước, đối diện với một con bổi rừng già đã sống sót qua hàng chục mùa bẫy, mọi chuyện sẽ hoàn toàn khác.</p>

<blockquote>
  "Con chim gù nhiều mà không có nội lực giống như một người cầm thanh kiếm múa may liên tục trong không khí nhưng không có lực chém. Đối phương chỉ cần đứng nhìn cho mỏi tay rồi phản đòn một nhát là ngã gục."
</blockquote>

<h3>Thế nào là một tiếng gù có giá trị?</h3>
<p>Trong cách nhìn chim của tôi qua nhiều năm, tôi để ý đến ba yếu tố sau hơn là số lần gù:</p>
<ul>
  <li><strong>Độ dày và độ nén:</strong> Tiếng gù phát ra từ sâu trong lồng ngực, cổ chim phồng căng, hai mép mỏ ngậm chặt không để hở hơi. Từng tiếng gù vang lên có độ trầm, đầm và rung chuyển nhẹ thanh cầu gỗ.</li>
  <li><strong>Khoảng cách nhịp:</strong> Các nhịp gù cách nhau đều đặn, không bị hấp tấp, không bị hụt hơi ở những tiếng cuối cùng.</li>
  <li><strong>Khả năng nhịn gù (Nước nhử):</strong> Con chim biết khi nào cần gù, khi nào cần im lặng cất tiếng gáy rước nhẹ nhàng. Khi bổi rừng đang hoảng hốt đứng xa ngoài cành ngoài, nếu bạn dập gù liên tục sẽ làm bổi sợ hãi mà bay mất. Chim hay là chim biết ém gù, đợi bổi bước chân vào đúng cành thế đặt bẫy mới tung đòn quyết định.</li>
</ul>

<p>Vì vậy, nếu ai đó khoe với tôi một con chim gù mấy chục tiếng một hơi trong lồng nuôi, tôi chỉ mỉm cười lắng nghe. Tôi chỉ thực sự đánh giá khi thấy nó đối đầu với một con chim bổi rừng lỳ lợm sau ba mươi phút giằng co căng thẳng dưới nắng trưa.</p>
      `,
      tags: ["Tiếng gù", "Thực chiến", "Kinh nghiệm mồi", "Tâm lý chim"],
      linkedBirdId: "chim-tho-sam-01",
      reactions: { thich: 42, huuIch: 65, dongDieu: 38 }
    },
    {
      id: "toi-khong-chon-chim-bang-bo-ma",
      slug: "toi-khong-chon-chim-chi-bang-bo-ma",
      title: "Tôi không chọn chim chỉ bằng bộ mã",
      authorId: "user_author",
      authorName: "Người Mê Cu Gáy Rừng",
      isAuthor: true,
      badge: "Tác giả",
      status: "published",
      category: "Quan điểm",
      readingTime: "6 phút đọc",
      publishedAt: "20/09/2026",
      coverImage: "./assets/images/cage-garden.jpg",
      excerpt: "Một bộ cườm hoa cà giáp hạt, lông cánh xếp như vảy cá chép hay chiếc đuôi vót búp tre lộng lẫy có thể làm say lòng người ngắm. Nhưng tướng đẹp mà dạ hèn thì cũng chỉ để nuôi làm cảnh.",
      myPerspective: "Bộ mã là cái nhìn thấy đầu tiên, nhưng thần kinh và khí chất mới là cái quyết định số phận của một con chim mồi dưới cội cây rậm rạp.",
      fieldVerification: "Con mồi hay nhất đời tôi từng sở hữu lại là con bổi có bộ cườm lưa thưa hở ức, chân có một móng vẹo. Nhưng khi ra cội, nó không bao giờ lùi bước trước bất kỳ đối thủ nào.",
      content: `
<p>Người xưa truyền lại rất nhiều bài thơ, câu vè miêu tả tướng chim cu gáy: từ cườm hoa cà, mỏ đinh, mắt hạt kê cho tới vảy chân rồng... Đọc qua thì thấy con chim cu gáy chẳng khác nào một tuyệt tác hội tụ đầy đủ tinh hoa phong thủy đất trời.</p>

<p>Nhưng sau nhiều năm trả giá bằng tiền bạc, thời gian và cả những nỗi thất vọng trèo cây vẹo cả lưng, tôi rút ra một điều: <strong>tướng mạo chỉ là cái vỏ bên ngoài của một cỗ máy sinh học</strong>.</p>

<h3>Sự ngộ nhận về cái đẹp trong lồng</h3>
<p>Một con chim cu gáy nuôi nhốt lâu ngày trong lồng son, thức ăn đủ đầy thì lông lá ắt sẽ mượt mà, bộ cườm sẽ bóng bẩy, đuôi sẽ khép thẳng tắp. Nhìn vào ai cũng phải trầm trồ khen ngợi là chim quý.</p>

<p>Thế nhưng, cái đẹp đó chưa được tôi luyện qua bão giông. Khi đem một con chim như vậy ra cội, chỉ cần một cơn gió lốc rít qua cành cây làm lá rụng rào rào, hoặc một con cắt đen lượn vòng trên nền trời xanh, con chim mã đẹp ấy có thể lập tức rúc đầu vào góc lồng, rụng lông đuôi và câm bặt suốt nhiều tháng trời.</p>

<blockquote>
  "Tôi thà chọn một con chim nhìn tướng mạo thô kệch, lông có phần xù xì phong trần nhưng có đôi mắt sáng quắc không chớp lóa, còn hơn một chàng hoàng tử lồng son yếu bóng vía."
</blockquote>

<h3>Tôi nhìn vào đâu nếu không nhìn bộ mã?</h3>
<ol>
  <li><strong>Đôi mắt và thần thái:</strong> Đồng tử phải linh hoạt, ánh nhìn có chiều sâu và sự điềm đạm. Khi có tiếng động lạ, mắt nó gườm lại quan sát chứ không hoảng loạn đảo tròn.</li>
  <li><strong>Độ bám cầu:</strong> Các ngón chân gắp chặt thanh gỗ như móng vuốt chim ưng, cơ thể ghì sát xuống tạo trọng tâm vững như kiềng ba chân.</li>
  <li><strong>Phản ứng với âm thanh rừng:</strong> Nghe tiếng chim rừng từ xa vọng lại, nó khẽ rung nhẹ quy cánh đón nhận chứ không nhảy loạn xạ tìm đường trốn.</li>
</ol>

<p>Bộ mã đẹp dĩ nhiên là điều ai cũng thích. Nhưng nếu phải đánh đổi giữa một bên là mã đẹp và một bên là bản lĩnh lỳ lợm thì trong sổ tay của tôi, bản lĩnh luôn đứng ở vị trí số một.</p>
      `,
      tags: ["Bộ mã", "Tướng mạo", "Khí chất", "Sai lầm thường gặp"],
      reactions: { thich: 38, huuIch: 51, dongDieu: 29 }
    },
    {
      id: "hau-gu-moi-la-thu-quan-tam",
      slug: "hau-gu-moi-la-thu-toi-quan-tam-khi-choi-lau-dai",
      title: "Hậu gù mới là thứ tôi quan tâm khi chơi lâu dài",
      authorId: "user_author",
      authorName: "Người Mê Cu Gáy Rừng",
      isAuthor: true,
      badge: "Tác giả",
      status: "published",
      category: "Tiền & Hậu",
      readingTime: "7 phút đọc",
      publishedAt: "15/09/2026",
      coverImage: "./assets/images/field-journal.jpg",
      excerpt: "Nước Tiền cho ta cảm giác hưng phấn ban đầu. Nhưng chính nước Hậu mới là chiếc neo giữ lại danh tiếng của một con mồi cội qua năm tháng nắng mưa.",
      myPerspective: "Một con chim có thể vào trận chậm chạp, không nhảy múa hoa mỹ trong vài phút đầu, nhưng càng đánh càng chắc tiếng, càng về trưa càng gù sâu thì đó mới là con chim vô giá.",
      fieldVerification: "Những trận bắt được bổi chúa khôn cội hầu như không bao giờ kết thúc ở 10 phút đầu. Nó luôn diễn ra ở phút thứ 35 hoặc 45, khi chỉ còn nước Hậu lên tiếng.",
      content: `
<p>Trong giới chơi chim cu gáy, người ta hay bàn tán xôn xao về những con chim có nước Tiền chớp nhoáng: vừa móc lồng lên cây là đè bẹp đối phương, gáy rước như mưa rào, gù dập liên thanh khiến người xem phải ồ lên thán phục.</p>

<p>Nhưng những người từng trải qua hàng trăm trận gác kèo trong rừng sâu đều hiểu một chân lý ngầm: <strong>tiền trảm hậu tấu, tiền dễ kiếm mà hậu khó tìm</strong>.</p>
      `,
      tags: ["Tiền & Hậu", "Nước Hậu", "Độ bền", "Kinh nghiệm mồi"],
      reactions: { thich: 55, huuIch: 72, dongDieu: 45 }
    },
    {
      id: "dong-dream-bai-hoc-tien-nhanh-hau-duoi",
      slug: "dong-dream-va-bai-hoc-con-chim-tien-nhanh-hau-duoi",
      title: "Đồng Dream và bài học về con chim tiền nhanh hậu đuối",
      authorId: "user_caydongmoi",
      authorName: "Cây Đồng Mồi",
      isAuthor: false,
      badge: "Cộng đồng",
      status: "published",
      category: "Tiền / Hậu",
      readingTime: "5 phút đọc",
      publishedAt: "26/09/2026",
      coverImage: "./assets/images/decoy-dove.jpg",
      excerpt: "Khi mới bẫy về, Đồng Dream gù như máy khâu khiến tôi nghĩ mình bắt được chim mồi cự phách. Nhưng thực chiến 12 trận ở rừng keo Bến Cát cho tôi bài học cay đắng về sự thiếu chiều sâu.",
      myPerspective: "Tôi không tìm con chim đẹp nhất. Tôi tìm con chim hợp cách chơi của mình. Đồng Dream dạy tôi cách ghìm lại sự nôn nóng.",
      fieldVerification: "Sau khi đổi cách dợt kèm chim già, Đồng Dream bớt gù bạt mạng, biết ém sức và bắt được 4 bổi già cội.",
      linkedBirdId: "dong-dream",
      content: `
<p>Tôi nuôi con Đồng Dream này từ đầu năm 2024. Lúc mới bắt từ một người bạn bẫy rừng cao su Bến Cát về, con chim có tướng mạo thanh thoát, mỏ ngắn tũn, cườm hạt đỗ đóng vuông vức. Ở nhà treo lên dây phơi đồ là nó gù liên thanh 20 tiếng không nghỉ.</p>

<p>Lúc đó tôi hào hứng vô cùng, đặt ngay cho nó cái tên kiêu hãnh: <strong>Đồng Dream</strong> — giấc mơ của người chơi chim giọng đồng.</p>

<h3>Cú tát thực tế ở phút thứ 18</h3>
<p>Trận dợt thứ ba ở rừng keo ven suối Tân Uyên, tôi gặp một con bổi già cội trọc đầu. Vừa móc lồng lên, Đồng Dream phát huy ngay nước Tiền bão táp: gáy rước 3 tiếng là bổi rừng sà xuống cành ngọn ngay. Đồng Dream xòe cườm siết gù như búa bổ.</p>

<p>Nhưng con bổi già không nao núng. Nó chỉ đứng ngoài cành ngó, thỉnh thoảng nhả một tiếng 'cù... gù' trầm đục đáp trả. Đến phút thứ 18, tiếng gù của Đồng Dream bắt đầu loãng ra, nhịp thở dốc thấy rõ, hai cánh xệ xuống. Đến phút 22, nó bắt đầu lùi cầu và quay lưng lại với đối thủ.</p>

<blockquote>
  "Tôi chết lặng dưới gốc cây. Con chim hoàng tử trong lồng của tôi đã bị một con bổi già rừng đánh bại hoàn toàn mà đối phương chưa cần chạm vào mép bẫy."
</blockquote>

<h3>Bài học rèn nhẫn</h3>
<p>Sau trận đó, tôi nhận ra sai lầm của mình: tôi đã quá nuông chiều nước Tiền của nó mà quên mất việc trui rèn bản lĩnh chịu đựng. Tôi dừng dợt độc lập, đem nó về treo gần con mồi già Thổ Sấm để nó học cách nhịn gù, học cách chỉ ra đòn khi đối phương đã bước vào thế hiểm.</p>

<p>Hôm nay chia sẻ lại câu chuyện này lên thư viện, tôi chỉ muốn nhắn nhủ cùng anh em: đừng bao giờ say men chiến thắng trong 10 phút đầu của một con chim trẻ.</p>
      `,
      tags: ["Đồng Dream", "Tiền & Hậu", "Kinh nghiệm thực chiến", "Rèn chim"],
      reactions: { thich: 36, huuIch: 49, dongDieu: 27 }
    },
    {
      id: "vi-sao-toi-khong-tin-vay-rong-chan-chi",
      slug: "vi-sao-toi-khong-tin-vao-vay-rong-hay-chan-chi",
      title: "Vì sao tôi không tin vào vảy rồng hay chân chì khi chọn mồi",
      authorId: "user_bacba",
      authorName: "Bác Ba Đất Đỏ",
      isAuthor: false,
      badge: "Cộng đồng",
      status: "published",
      category: "Cách nhìn chim",
      readingTime: "6 phút đọc",
      publishedAt: "22/09/2026",
      coverImage: "./assets/images/field-journal.jpg",
      excerpt: "Người ta thổi phồng vảy rồng, liên giáp nội, chân chì như bùa hộ mệnh. 16 năm lăn lộn rừng Long Thành dạy tôi: móng bám cầu và khớp gối linh hoạt mới là cái giữ con chim không ngã khi gió chướng.",
      myPerspective: "Xem chân chim cốt ở độ khô ráo, các khớp ngón khép chặt và độ bám cầu như gọng kìm, chứ không phải đi đếm từng vảy xếp theo sách tướng số.",
      fieldVerification: "Con mồi bắt hơn 30 bổi của tôi có chân vảy loạn, không theo bất kỳ thế vảy quý nào trong sách cổ.",
      content: `
<p>Tôi chơi chim ở vùng đất đỏ Long Thành này từ những năm 2010. Đã từng chứng kiến không biết bao nhiêu cuộc ngã giá bạc triệu chỉ vì một cái vảy đóng chéo gọi là 'liên giáp', hay hai hàng vảy xếp chồng gọi là 'vảy rồng chúa'.</p>

<p>Nhưng anh em thử ngẫm lại xem: con chim cu gáy đứng trên cành cây đung đưa trước gió giật cấp 5 cấp 6, cái giúp nó trụ vững là cơ bắp ở đùi, khớp gối dẻo dai và các ngón chân gắp chặt thanh gỗ — chứ đâu phải là hình dáng của lớp sừng biểu bì chết trên da?</p>

<h3>Chân khô quan trọng hơn chân quý</h3>
<p>Tiêu chí xem chân của tôi rất giản dị:</p>
<ul>
  <li>Chân khô ráo, màu đỏ thau hoặc xám chì bám bụi sương rừng.</li>
  <li>Các ngón xòe đều, không bị cong quặp dị tật làm đau ngón khi gù cúi đầu.</li>
  <li>Móng sắc vừa phải, ngón thới sau dài đủ để khóa chặt cành thế.</li>
</ul>

<p>Con bổi hay nhất giàn của tôi hiện nay chân có hai hàng vảy đóng lộn xộn, thậm chí ngón ngoài bên trái còn bị gãy một móng do hồi xưa dính lưới cước. Vậy mà nó dầm mưa ba mùa chưa từng bỏ trận nào. Hãy tin vào đôi mắt và bản lĩnh của con chim hơn là những bài ca tướng số truyền khẩu vô căn cứ.</p>
      `,
      tags: ["Vảy chân", "Kinh nghiệm cổ truyền", "Cách nhìn chim", "Góc nhìn lão làng"],
      reactions: { thich: 48, huuIch: 61, dongDieu: 39 }
    },
    {
      id: "kinh-nghiem-chon-boi-chuyen-mua-gio-chuong",
      slug: "kinh-nghiem-chon-boi-chuyen-mua-gio-chuong",
      title: "Kinh nghiệm chọn bổi chuyền vào mùa gió chướng cuối năm",
      authorId: "user_bacba",
      authorName: "Bác Ba Đất Đỏ",
      isAuthor: false,
      badge: "Cộng đồng",
      status: "pending", // Đang chờ admin duyệt
      category: "Kinh nghiệm thực chiến",
      readingTime: "4 phút đọc",
      publishedAt: "28/09/2026",
      coverImage: "./assets/images/hero-dove.jpg",
      excerpt: "Gió chướng về mang theo cái lạnh và những đàn bổi chuyền lông tơ bắt đầu tách bầy. Đây là kinh nghiệm nhận biết con chim có gan dạ hay chỉ là bổi non lạc bầy.",
      myPerspective: "Đừng chọn bổi chuyền quá béo tốt. Chọn con nào ngực săn, mắt nhíu lại khi gặp gió ngược.",
      fieldVerification: "Bài viết chia sẻ kinh nghiệm mùa bẫy cuối năm, đang chờ ban quản trị kiểm duyệt nội dung trước khi đưa vào thư viện.",
      content: `
<p>Mùa gió chướng thổi về cũng là lúc chim cu gáy chuyền mùa đầu tiên bắt đầu tách mẹ tìm vùng lãnh thổ riêng. Bổi chuyền thường rất háo hức, tiếng gáy còn đục và ngọng nghịu nhưng nếu chọn đúng con có căn cốt thì rèn thành mồi rất mau.</p>
<p>Tôi khuyên anh em nên chú ý đến dáng đứng đón gió: con chim dám xòe đuôi ghì sát cầu đón luồng gió bấc mà cất tiếng thúc chính là con chim có lửa ngầm từ trong tủy.</p>
      `,
      tags: ["Bổi chuyền", "Mùa gió chướng", "Kinh nghiệm chọn chim"],
      reactions: { thich: 0, huuIch: 0, dongDieu: 0 }
    }
  ],

  // 5 Bài học từ "Những Lần Chọn Sai" (Chân thật & Cá nhân)
  mistakes: [
    {
      id: "mistake-1",
      title: "Mê mẩn bộ cườm hoa cà xòe rộng nhưng bỏ qua đôi mắt lơ đãng",
      year: "2021",
      birdCode: "Bổi Đắk Lắk #01",
      cost: "Mất 1.5 triệu & 14 tháng chăm sóc vô vọng",
      story: "Lần đó tôi bị hớp hồn bởi một bàn cườm hoa cà trắng tinh khôi đóng dày đặc từ yếm lên tận cổ họng con chim. Người bán quảng cáo là cườm rồng. Tôi mang về nâng như nâng trứng. Nhưng con chim có đôi mắt to tròn lồi ra ngoài và con ngươi hầu như không co thắt khi gặp nắng. Kết quả: ra rừng nó sợ cả tiếng chim cu xanh bay ngang qua, suốt ngày chúi đầu vào góc đáy lồng.",
      takeaway: "Tướng cườm chỉ để làm cảnh nếu hệ thần kinh của chim yếu. Ánh mắt là linh hồn, cườm chỉ là chiếc áo."
    },
    {
      id: "mistake-2",
      title: "Xuống tiền vội vàng vì nghe tiếng gù thu âm qua điện thoại",
      year: "2022",
      birdCode: "Bổi Khe Sanh #04",
      cost: "Mất 2.2 triệu mua niềm tin ảo",
      story: "Người bán gửi cho tôi một đoạn ghi âm tiếng gù thổ rền vang như sấm sét trong hang đá. Nghe phê quá không kìm lòng được, tôi chuyển khoản cọc ngay trong đêm. Khi nhận chim về, thả vào lồng mới vỡ lẽ: tiếng gù thu trong góc phòng kín có tiếng vọng tường gạch nên âm trầm bị khuếch đại lên gấp ba lần. Đưa ra sân vườn trống trải, tiếng gù thực tế vừa mỏng vừa rỗng tuếch, nghe xẹp lép như tiếng đập chiếu.",
      takeaway: "Không bao giờ thẩm định giọng gáy qua video hay file ghi âm điện thoại. Giọng chim phải nghe trực tiếp giữa không gian thoáng đãng."
    },
    {
      id: "mistake-3",
      title: "Chê con bổi chân cụt một móng, người khác nuôi thành mồi chúa",
      year: "2023",
      birdCode: "Bổi Tân Phú #09",
      cost: "Bỏ lỡ một con chim báu vật vì tính duy mỹ máy móc",
      story: "Một ông anh bẫy được con bổi giọng thổ đồng rất đanh, ngỏ ý để lại cho tôi giá rẻ vì nó bị dính bẫy gãy mất một móng ngón thới. Tôi lúc đó còn nặng tư tưởng duy mỹ, nghĩ chim thiếu ngón đứng cầu không đẹp nên lắc đầu từ chối. Một người bạn khác lấy về nuôi, chỉ sau 8 tháng con chim thuần cội lạ thường. Nó đi rừng đánh đâu dẹp đó, trở thành con mồi lừng danh khu vực Suối Mơ với hơn 40 bổi già quy phục.",
      takeaway: "Đừng để những khiếm khuyết nhỏ về mặt thẩm mỹ che lấp đi viên ngọc thô của nội lực và sự quả cảm."
    },
    {
      id: "mistake-4",
      title: "Từng tin tuyệt đối vào câu 'Đầu rùa, mỏ sẻ, cườm khô'",
      year: "2024",
      birdCode: "Tổng kết kinh nghiệm",
      cost: "Thời gian đi tìm những tiêu chuẩn sách vở không tồn tại",
      story: "Hồi trước tôi đóng khung mọi tiêu chuẩn vào những câu ca dao cổ. Hễ con nào thiếu một tiêu chí là tôi loại ngay từ vòng gửi xe. Sau này gặp những người thợ bẫy già vùng cao Tây Bắc, họ chỉ bật cười chỉ vào những con mồi của họ: con thì đầu vuông, con thì mỏ hơi dài, con cườm lại đóng lệch... nhưng đều là những cỗ máy sát bổi cự phách. Sách vở chỉ là gợi ý, không phải khuôn đúc.",
      takeaway: "Không có tiêu chí nào đúng tuyệt đối trong thế giới tự nhiên. Sự hòa hợp giữa thể chất và tính khí quan trọng hơn từng chi tiết đơn lẻ."
    },
    {
      id: "mistake-5",
      title: "Ép chim ra cội quá sớm khi lửa rừng chưa ngấm vào tủy",
      year: "2025",
      birdCode: "Bổi Rừng Dầu #03",
      cost: "Làm hư một con chim đầy triển vọng vì sự nóng vội",
      story: "Nuôi được con bổi tố chất cực tốt, mới vào lồng 4 tháng đã gù đấu với chim nhà. Nôn nóng muốn thử tài nghệ, tôi xách đi đánh bẫy ở kèo rừng đầu tiên. Gặp ngay một con bổi chúa hung dữ lao xuống đá tới tấp vào lồng bẫy. Con chim của tôi còn non lửa, bị sốc tâm lý suýt đứt hơi. Sau trận đó, nó bị 'rót' (bể cội), mất cả năm trời chăm sóc lại mới dám gáy lại tiếng đầu tiên.",
      takeaway: "Chơi cu gáy là nghệ thuật của sự chờ đợi. Đốt cháy giai đoạn là cách nhanh nhất để biến một con chim tiềm năng thành con chim phế."
    }
  ],

  // Hồ sơ đàn chim (Bird Profiles & Timelines)
  birds: [
    {
      id: "chim-tho-sam-01",
      ownerId: "user_author",
      name: "Thổ Sấm Trảng Bom",
      type: "Chim mồi cây (Thổ Sấm rền)",
      voice: "Thổ sấm rền đục, gù kèm 2",
      age: "5 năm lồng",
      origin: "Rừng cao su Trảng Bom, Đồng Nai",
      status: "Mồi cội chiến lực chính",
      image: "./assets/images/hero-dove.jpg",
      initialAssessment: "Bổi già rừng bắt tại Trảng Bom. Dáng bắp chuối thon, cườm hạt đỗ đóng cao, đầu hơi vuông, mắt lửa viền cam đậm. Lúc mới về nhát người, nhảy lồng xước cả trán nhưng ánh mắt không có vẻ phục tùng.",
      fieldExperience: "Trải qua 2 năm dãi gió dầm sương. Đã đánh hơn 30 trận, thu phục 18 bổi rừng. Khả năng rước ngọt ngào, đặc biệt nước Hậu gù lỳ đòn trên 40 phút không xuống nước.",
      currentAssessment: "Một con chim xứng đáng làm bạn tri kỷ. Giọng thổ sấm nghe lúc 5 giờ sáng nhâm nhi ly trà mộc mang lại cảm giác bình yên đến lạ lùng.",
      timeline: [
        {
          time: "03/2024",
          stage: "Ngày bắt đầu / Mới bẫy về",
          note: "Được một người bạn bẫy tại cánh rừng cao su Trảng Bom nhượng lại. Chim nặng trĩu tay, ức chắc nịch, lông quy cánh ốp chặt. Đưa vào lồng trần trùm áo lồng tối 1 tuần."
        },
        {
          time: "05/2024",
          stage: "Đánh giá ban đầu",
          note: "Vào cám hạt ổn định, bắt đầu cất tiếng gáy trộm lúc trời mờ sáng. Giọng thổ trầm đục, tiếng 'cục cù' rền như tiếng cối xay đá."
        },
        {
          time: "08/2024",
          stage: "Dợt thử dàn chim nhà",
          note: "Dợt thử tại dàn chim nhà. Không vội vàng gù nhưng khi chim khác gù dồn thì nó gườm mắt ghì cầu, nhả từng tiếng kèm 2 đanh thép."
        },
        {
          time: "12/2024",
          stage: "Thực chiến cội tràm",
          note: "Treo tại rừng tràm ngập mặn. Gặp bổi rừng dợt gần 1 tiếng. Không bỡ ngỡ, rước nhịp nhàng và bắt thành công con bổi đầu tiên trong đời mồi."
        },
        {
          time: "06/2025",
          stage: "Cập nhật bài bản",
          note: "Bước vào độ chín muồi. Nước Hậu trở nên lắt léo lạ kỳ: biết gáy dặm giọng trầm để xoa dịu khi bổi rừng cảnh giác, rồi siết gù đè gãy cành khi bổi vừa bước vào bẫy."
        },
        {
          time: "09/2026",
          stage: "Đánh giá hiện tại",
          note: "Đã trở thành linh hồn của giàn chim. Điềm đạm, trầm tĩnh, ở nhà đứng im như khúc gỗ nhưng hễ treo lên ngọn cây là mắt sáng rực như chiến binh."
        }
      ]
    },
    {
      id: "dong-dream",
      ownerId: "user_caydongmoi",
      name: "Đồng Dream",
      type: "Mồi cây lỡ (Đồng pha thổ)",
      voice: "Đồng giòn, gù kèm 2",
      age: "3 năm lồng",
      origin: "Rừng cao su Bến Cát, Bình Dương",
      status: "Mồi lỡ đang rèn tính nhẫn",
      image: "./assets/images/decoy-dove.jpg",
      initialAssessment: "Dáng thanh thoát, mỏ ngắn tũn, cườm hạt đỗ đóng vuông vức. Ở nhà treo lên dây phơi là gù liên thanh 20 tiếng, nước Tiền cực kỳ xông xáo.",
      fieldExperience: "Thực chiến 12 trận ở cội Bến Cát và Tân Uyên. Tiền bốc lửa trong 15 phút đầu, nhưng từng bị bổi già ép đuối nước ở phút 22. Hiện đã qua huấn luyện kèm chim già.",
      currentAssessment: "Đã biết ém gù, bớt nóng vội, biết chờ bổi bước vào cành thế mới ra đòn. Bắt thành công 4 bổi già.",
      timeline: [
        {
          time: "02/2024",
          stage: "Ngày bắt đầu",
          note: "Bẫy được tại bìa rừng cao su Bến Cát. Chim bổi lỡ háu gù, đưa vào lồng nuôi 2 tuần là cất tiếng rước."
        },
        {
          time: "05/2024",
          stage: "Đánh giá ban đầu",
          note: "Nước Tiền cực kỳ xông xáo, chuỗi gù 15-20 tiếng liên tục trong sân nhà. Rất tự tin."
        },
        {
          time: "09/2024",
          stage: "Thực chiến cội Bến Cát",
          note: "Gặp bổi chúa rừng già. Đấu sau 18 phút thì đuối nước, bị bổi rừng đè nhảy đáy lồng. Bài học đắt giá."
        },
        {
          time: "01/2025",
          stage: "Cập nhật bài bản",
          note: "Dừng đi cội 3 tháng, nuôi kèm mồi già để học cách 'nhịn gù' và lắng nghe. Bắt đầu đầm tính hơn."
        },
        {
          time: "09/2026",
          stage: "Đánh giá hiện tại",
          note: "Trở thành con mồi phụ trợ đáng tin cậy. Không còn sốc nổi, bắt thành công 4 bổi già cội."
        }
      ]
    },
    {
      id: "chim-dong-son-02",
      ownerId: "user_author",
      name: "Bổi Lỡ Núi Chứa Chan",
      type: "Chim bổi lỡ đang thử lửa",
      voice: "Đồng son giòn giã",
      age: "1 năm lồng",
      origin: "Núi Chứa Chan, Đồng Nai",
      status: "Đang theo dõi tiến trình Hậu",
      image: "./assets/images/cage-garden.jpg",
      initialAssessment: "Dáng thanh mảnh, chân quản ngắn màu đồng thau, mỏ ngắn tũn. Giọng đồng son giòn giã nghe vui tai. Nước Tiền rất hăng hái, gặp chim là đòi nhảy đấu.",
      fieldExperience: "Đã dợt rừng 4 lần. Nước Tiền rước bổi cực kỳ nhanh nhẹn, nhưng sau phút thứ 20 bắt đầu có dấu hiệu nhảy cầu đổi thế, cần thêm thời gian để trui rèn sự kiên nhẫn.",
      currentAssessment: "Chưa thể kết luận là mồi hay hay dở. Cần tiếp tục theo dõi qua mùa mưa năm nay trước khi quyết định giữ lại đi đường dài.",
      timeline: [
        {
          time: "11/2025",
          stage: "Bắt về từ chân núi",
          note: "Mua lại của một tiệm chim nhỏ ven quốc lộ 1A. Nhìn bề ngoài lông đuôi gãy vụn nhưng ánh mắt đồng tử co thắt rất nhạy."
        },
        {
          time: "01/2026",
          stage: "Sau 2 tháng thuần dưỡng",
          note: "Thay xong bộ lông mới, vảy cánh vàng óng. Tiếng gáy son vang xa lảnh lót như chuông chùa."
        },
        {
          time: "04/2026",
          stage: "Dợt cội lần 1",
          note: "Rước bổi rất nhanh, trong vòng 5 phút bổi rừng đã sà vào cây. Nhưng bổi không nhảy bẫy ngay mà đứng gù cù cưa thì nó bắt đầu lúng túng."
        },
        {
          time: "Hiện tại (2026)",
          stage: "Đang rèn luyện tính nhẫn",
          note: "Đang cho dợt kèm với chim mồi già để học cách 'nhịn gù' và giữ sức. Ghi chép tiếp tục..."
        }
      ]
    }
  ],

  // Bình luận trao đổi kinh nghiệm (Threaded Discussion)
  comments: [
    {
      id: "cm_01",
      articleId: "gu-nhieu-chua-chac-hay",
      userId: "user_caydongmoi",
      authorName: "Cây Đồng Mồi",
      authorAvatar: "./assets/images/cage-garden.jpg",
      parentId: null,
      content: "Tôi cũng từng gặp trường hợp tương tự với con Đồng Dream nhà tôi. Con này tiền rất nhanh, lúc mới về gù rát mặt nhưng sang phút 20 bổi rừng đè là hậu xuống khá sớm. Đọc bài của bác thấm thía vô cùng.",
      createdAt: "25/09/2026 08:30",
      reactions: { thich: 8, huuIch: 14, dongDieu: 12 }
    },
    {
      id: "cm_02",
      articleId: "gu-nhieu-chua-chac-hay",
      userId: "user_author",
      authorName: "Người Mê Cu Gáy Rừng",
      authorAvatar: "./assets/images/hero-dove.jpg",
      parentId: "cm_01", // Reply to cm_01
      content: "Chào bạn Cây Đồng Mồi, đúng như vậy đấy bạn. Những con háu gù lúc đầu thường rất dễ làm người chơi lầm tưởng. Muốn giữ chim lâu dài chỉ có cách cho dợt kèm mồi già để nó ghìm bớt cái nết háu đá lại.",
      createdAt: "25/09/2026 10:15",
      reactions: { thich: 11, huuIch: 18, dongDieu: 9 }
    },
    {
      id: "cm_03",
      articleId: "vi-sao-toi-khong-tin-vay-rong-chan-chi",
      userId: "user_bacba",
      authorName: "Bác Ba Đất Đỏ",
      authorAvatar: "./assets/images/field-journal.jpg",
      parentId: null,
      content: "Anh em cứ ra cội mùa mưa ngập bùn đất mới thấy, chim chân mập vảy đẹp trượt cầu ngã nháo nhào. Cứ chân khô, ngón dài gắp cầu như kìm sắt mới là số một.",
      createdAt: "23/09/2026 14:20",
      reactions: { thich: 15, huuIch: 22, dongDieu: 19 }
    }
  ],

  // Quan hệ Follow
  follows: [
    { followerId: "user_caydongmoi", followingId: "user_author", createdAt: "15/04/2024" },
    { followerId: "user_bacba", followingId: "user_author", createdAt: "22/02/2024" },
    { followerId: "user_author", followingId: "user_caydongmoi", createdAt: "18/04/2024" }
  ],

  // Lưu bài / Bookmark
  bookmarks: [
    { userId: "user_caydongmoi", targetType: "article", targetId: "gu-nhieu-chua-chac-hay", createdAt: "25/09/2026" },
    { userId: "user_caydongmoi", targetType: "bird", targetId: "chim-tho-sam-01", createdAt: "20/09/2026" },
    { userId: "user_author", targetType: "article", targetId: "dong-dream-bai-hoc-tien-nhanh-hau-duoi", createdAt: "27/09/2026" }
  ],

  // Báo cáo vi phạm (Moderation Reports)
  reports: [
    {
      id: "rep_01",
      reporterId: "user_bacba",
      reporterName: "Bác Ba Đất Đỏ",
      targetType: "article",
      targetId: "kinh-nghiem-chon-boi-chuyen-mua-gio-chuong",
      reason: "Cần kiểm duyệt chất lượng kỹ thuật ngữ",
      status: "pending", // pending | resolved | rejected
      createdAt: "28/09/2026 09:00"
    }
  ],

  // Các bài viết thực chiến / Ghi chép dã ngoại
  fieldLogs: [
    {
      id: "tran-danh-tan-uyen-3-tieng",
      title: "Trận giằng co 3 tiếng dưới tán keo Tân Uyên: Khi chim mồi gặp bổi già khôn cội",
      location: "Rừng keo ven suối, Tân Uyên, Bình Dương",
      date: "Tháng 05/2025",
      summary: "Một bài học đắt giá về sự nhẫn nại. Con bổi già có tiếng gù cà lăm đã lượn vòng quanh cành bẫy 4 lần mà không chịu đáp, thử thách lòng kiên trì của cả người lẫn chim mồi.",
      takeaway: "Ở cành cây cao, kẻ nào nóng ruột trước kẻ đó là người thua cuộc."
    },
    {
      id: "con-chim-200k-cho-que",
      title: "Con bổi thổ đồng mua 200k ở chợ quê hóa mồi đắc lực",
      location: "Chợ huyện Thống Nhất, Đồng Nai",
      date: "Tháng 02/2024",
      summary: "Câu chuyện về con chim đứng co ro trong lồng sắt rỉ sét giữa góc chợ, bị chê là lông xơ xác chân chì. Nhờ sự kiên nhẫn nuôi dưỡng và đọc đúng ánh mắt hoang dã, nó đã trở thành một trong những con chim có nước Hậu lì lợm nhất.",
      takeaway: "Giá trị của một con chim không nằm ở số tiền bạn bỏ ra mua nó, mà nằm ở thời gian và sự thấu hiểu bạn dành cho nó."
    }
  ]
};

// =========================================================================
// STORAGE ENGINE: CUGAY_DB (Local Storage Synchronized Data Engine)
// =========================================================================
const DB_STORAGE_KEY = "cugay_guide_db_v2";
const CURRENT_USER_KEY = "cugay_current_user_id";

class CuGayDatabase {
  constructor() {
    this.data = this.loadData();
    this.currentUserId = localStorage.getItem(CURRENT_USER_KEY) || null;
  }

  loadData() {
    try {
      const stored = localStorage.getItem(DB_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Đảm bảo các mảng cần thiết luôn tồn tại
        if (parsed && parsed.articles && parsed.users) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc CSDL từ LocalStorage, khởi tạo lại từ Seed:", e);
    }
    // Nếu chưa có hoặc lỗi, nạp SEED
    this.saveData(SEED_DATA);
    return JSON.parse(JSON.stringify(SEED_DATA));
  }

  saveData(dataToSave) {
    try {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(dataToSave || this.data));
    } catch (e) {
      console.error("Không thể ghi dữ liệu vào LocalStorage:", e);
    }
  }

  resetToSeed() {
    this.data = JSON.parse(JSON.stringify(SEED_DATA));
    this.saveData(this.data);
    this.currentUserId = null;
    localStorage.removeItem(CURRENT_USER_KEY);
    return this.data;
  }

  // --- Auth & Users ---
  isLoggedIn() {
    return !!this.currentUserId && !!this.getUserById(this.currentUserId);
  }

  getCurrentUser() {
    if (!this.currentUserId) return null;
    return this.data.users.find(u => u.id === this.currentUserId) || null;
  }

  logout() {
    this.currentUserId = null;
    localStorage.removeItem(CURRENT_USER_KEY);
    return true;
  }

  setCurrentUser(userId) {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      this.currentUserId = user.id;
      localStorage.setItem(CURRENT_USER_KEY, user.id);
      return user;
    }
    return null;
  }

  getAllUsers() {
    return this.data.users;
  }

  getUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  getUserByUsername(username) {
    if (!username) return null;
    return this.data.users.find(u => u.username.toLowerCase() === username.toLowerCase());
  }

  login(username, password) {
    const user = this.getUserByUsername(username);
    if (!user) {
      return { success: false, message: "Không tìm thấy người chơi với tên này." };
    }
    if (user.isBanned) {
      return { success: false, message: "Tài khoản này hiện đang bị khóa tạm thời." };
    }
    this.setCurrentUser(user.id);
    return { success: true, user };
  }

  register(userData) {
    const existing = this.getUserByUsername(userData.username);
    if (existing) {
      return { success: false, message: "Tên người chơi này đã có người đăng ký. Vui lòng chọn tên khác." };
    }
    const newUser = {
      id: "user_" + Date.now(),
      username: userData.username.trim().toLowerCase(),
      displayName: userData.displayName.trim() || userData.username.trim(),
      role: "user",
      avatar: userData.avatar || "./assets/images/hero-dove.jpg",
      bio: userData.bio || "Người yêu thích nghệ thuật cu gáy mộc mạc.",
      quote: userData.quote || "Tôi không tìm con chim đẹp nhất. Tôi tìm con chim hợp cách chơi của mình.",
      experienceYears: parseInt(userData.experienceYears, 10) || 1,
      location: userData.location || "Việt Nam",
      createdAt: new Date().toLocaleDateString("vi-VN"),
      criteria: {
        giong: "Cao",
        tien: "Cao",
        hau: "Rất cao",
        boMa: "Trung bình",
        chan: "Thấp",
        thanThai: "Cao",
        doBen: "Rất cao"
      }
    };
    this.data.users.push(newUser);
    this.saveData();
    this.setCurrentUser(newUser.id);
    return { success: true, user: newUser };
  }

  updateProfile(userId, updates) {
    const user = this.getUserById(userId);
    if (!user) return false;
    Object.assign(user, updates);
    this.saveData();
    return user;
  }

  updateUserCriteria(userId, criteria) {
    const user = this.getUserById(userId);
    if (!user) return false;
    user.criteria = criteria;
    this.saveData();
    return true;
  }

  toggleBanUser(userId) {
    const user = this.getUserById(userId);
    if (!user || user.role === "admin") return false;
    user.isBanned = !user.isBanned;
    this.saveData();
    return user.isBanned;
  }

  // --- Articles ---
  getArticles(filter = "all", currentUserId = null) {
    let list = this.data.articles || [];
    // Nếu là admin hoặc chính tác giả bài viết thì thấy cả pending/hidden
    const currentUser = this.getCurrentUser();
    const isAdmin = currentUser && currentUser.role === "admin";

    return list.filter(art => {
      // Quyền xem: Published thì ai cũng thấy; Pending/Hidden chỉ admin hoặc tác giả bài đó thấy
      const canView = art.status === "published" || isAdmin || (currentUser && currentUser.id === art.authorId);
      if (!canView) return false;

      if (filter === "all") return true;
      if (filter === "author") return art.isAuthor || art.authorId === "user_author";
      if (filter === "community") return !art.isAuthor && art.authorId !== "user_author";
      if (filter === "thuc-chien") return art.category.toLowerCase().includes("thực chiến");
      if (filter === "tien-hau") return art.category.toLowerCase().includes("tiền");
      if (filter === "quan-diem") return art.category.toLowerCase().includes("quan điểm");
      if (filter === "pending") return art.status === "pending";
      return true;
    });
  }

  getArticleBySlug(slug) {
    return this.data.articles.find(a => a.slug === slug);
  }

  getArticleById(id) {
    return this.data.articles.find(a => a.id === id);
  }

  createArticle(articleData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;
    const isAuthor = currentUser.role === "admin" || currentUser.id === "user_author";
    
    // Tạo slug từ tiêu đề
    const baseSlug = articleData.title
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newArt = {
      id: "art_" + Date.now(),
      slug: slug,
      title: articleData.title.trim(),
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      isAuthor: isAuthor,
      badge: isAuthor ? "Tác giả" : "Cộng đồng",
      status: isAuthor ? "published" : "pending", // User bình thường cần duyệt ban đầu
      category: articleData.category || "Quan điểm",
      readingTime: "5 phút đọc",
      publishedAt: new Date().toLocaleDateString("vi-VN"),
      coverImage: articleData.coverImage || "./assets/images/field-journal.jpg",
      excerpt: articleData.excerpt || articleData.content.slice(0, 160) + "...",
      myPerspective: articleData.myPerspective || "Chia sẻ góc nhìn cá nhân qua thực chiến cội rừng.",
      fieldVerification: articleData.fieldVerification || "Quan điểm cá nhân đúc kết sau nhiều chuyến đi rừng.",
      content: articleData.content,
      tags: articleData.tags || ["Quan điểm", "Cu gáy"],
      linkedBirdId: articleData.linkedBirdId || null,
      videoUrl: articleData.videoUrl || null,
      reactions: { thich: 0, huuIch: 0, dongDieu: 0 }
    };

    this.data.articles.unshift(newArt);
    this.saveData();
    return newArt;
  }

  approveArticle(articleId) {
    const art = this.getArticleById(articleId);
    if (!art) return false;
    art.status = "published";
    art.publishedAt = new Date().toLocaleDateString("vi-VN");
    this.saveData();
    return true;
  }

  setArticleStatus(articleId, status) {
    const art = this.getArticleById(articleId);
    if (!art) return false;
    art.status = status; // published | pending | hidden
    this.saveData();
    return true;
  }

  deleteArticle(articleId) {
    const idx = this.data.articles.findIndex(a => a.id === articleId);
    if (idx === -1) return false;
    this.data.articles.splice(idx, 1);
    this.saveData();
    return true;
  }

  // --- Birds (Hồ sơ chim & Quá trình thực chiến) ---
  getBirds(ownerId = null) {
    if (!ownerId) return this.data.birds;
    return this.data.birds.filter(b => b.ownerId === ownerId);
  }

  getBirdById(id) {
    return this.data.birds.find(b => b.id === id);
  }

  createBird(birdData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;
    const newBird = {
      id: "bird_" + Date.now(),
      ownerId: currentUser.id,
      name: birdData.name.trim(),
      type: birdData.type || "Chim mồi cây",
      voice: birdData.voice || "Thổ đồng",
      age: birdData.age || "1 năm lồng",
      origin: birdData.origin || "Rừng Đông Nam Bộ",
      status: birdData.status || "Đang theo dõi",
      image: birdData.image || "./assets/images/hero-dove.jpg",
      initialAssessment: birdData.initialAssessment || "",
      fieldExperience: birdData.fieldExperience || "",
      currentAssessment: birdData.currentAssessment || "",
      timeline: [
        {
          time: new Date().toLocaleDateString("vi-VN"),
          stage: "Ngày bắt đầu / Tạo hồ sơ",
          note: birdData.initialAssessment || "Khởi tạo hồ sơ theo dõi cá thể chim này trong sổ tay."
        }
      ]
    };

    if (birdData.firstStageNote) {
      newBird.timeline.push({
        time: new Date().toLocaleDateString("vi-VN"),
        stage: "Đánh giá ban đầu",
        note: birdData.firstStageNote
      });
    }

    this.data.birds.unshift(newBird);
    this.saveData();
    return newBird;
  }

  addBirdTimeline(birdId, stageEntry) {
    const bird = this.getBirdById(birdId);
    if (!bird) return false;
    bird.timeline.push({
      time: stageEntry.time || new Date().toLocaleDateString("vi-VN"),
      stage: stageEntry.stage || "Cập nhật thực chiến",
      note: stageEntry.note
    });
    this.saveData();
    return true;
  }

  // --- Comments & Discussion ---
  getComments(articleId) {
    return (this.data.comments || []).filter(c => c.articleId === articleId);
  }

  addComment(articleId, content, parentId = null) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;
    const newComment = {
      id: "cm_" + Date.now(),
      articleId: articleId,
      userId: currentUser.id,
      authorName: currentUser.displayName,
      authorAvatar: currentUser.avatar,
      parentId: parentId || null,
      content: content.trim(),
      createdAt: new Date().toLocaleDateString("vi-VN") + " " + new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      reactions: { thich: 0, huuIch: 0, dongDieu: 0 }
    };

    this.data.comments.push(newComment);
    this.saveData();
    return newComment;
  }

  deleteComment(commentId) {
    const idx = this.data.comments.findIndex(c => c.id === commentId);
    if (idx === -1) return false;
    this.data.comments.splice(idx, 1);
    // Xóa cả các reply con nếu có
    this.data.comments = this.data.comments.filter(c => c.parentId !== commentId);
    this.saveData();
    return true;
  }

  // --- Reactions (👍 Thích, 💡 Hữu ích, 🤝 Có kinh nghiệm tương tự) ---
  toggleReaction(targetType, targetId, reactionType) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { requireAuth: true };
    const userReactKey = `cugay_react_${currentUser.id}_${targetType}_${targetId}`;
    const prevReact = localStorage.getItem(userReactKey);

    let targetObj = null;
    if (targetType === "article") {
      targetObj = this.getArticleById(targetId);
    } else if (targetType === "comment") {
      targetObj = (this.data.comments || []).find(c => c.id === targetId);
    }

    if (!targetObj) return null;
    if (!targetObj.reactions) {
      targetObj.reactions = { thich: 0, huuIch: 0, dongDieu: 0 };
    }

    if (prevReact === reactionType) {
      // Bỏ reaction
      targetObj.reactions[reactionType] = Math.max(0, (targetObj.reactions[reactionType] || 1) - 1);
      localStorage.removeItem(userReactKey);
    } else {
      // Nếu đã từng chọn cái khác, trừ cái cũ
      if (prevReact && targetObj.reactions[prevReact]) {
        targetObj.reactions[prevReact] = Math.max(0, targetObj.reactions[prevReact] - 1);
      }
      targetObj.reactions[reactionType] = (targetObj.reactions[reactionType] || 0) + 1;
      localStorage.setItem(userReactKey, reactionType);
    }

    this.saveData();
    return {
      reactions: targetObj.reactions,
      userCurrent: localStorage.getItem(userReactKey)
    };
  }

  getUserReaction(targetType, targetId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;
    return localStorage.getItem(`cugay_react_${currentUser.id}_${targetType}_${targetId}`);
  }

  // --- Follow ---
  isFollowing(followingUserId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;
    return (this.data.follows || []).some(
      f => f.followerId === currentUser.id && f.followingId === followingUserId
    );
  }

  toggleFollow(followingUserId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { requireAuth: true };
    if (currentUser.id === followingUserId) return false;

    if (!this.data.follows) this.data.follows = [];
    const idx = this.data.follows.findIndex(
      f => f.followerId === currentUser.id && f.followingId === followingUserId
    );

    if (idx !== -1) {
      this.data.follows.splice(idx, 1);
      this.saveData();
      return false; // un-followed
    } else {
      this.data.follows.push({
        followerId: currentUser.id,
        followingId: followingUserId,
        createdAt: new Date().toLocaleDateString("vi-VN")
      });
      this.saveData();
      return true; // followed
    }
  }

  getFollowersCount(userId) {
    return (this.data.follows || []).filter(f => f.followingId === userId).length;
  }

  getFollowingCount(userId) {
    return (this.data.follows || []).filter(f => f.followerId === userId).length;
  }

  getFollowingList(userId) {
    const followingIds = (this.data.follows || [])
      .filter(f => f.followerId === userId)
      .map(f => f.followingId);
    return this.data.users.filter(u => followingIds.includes(u.id));
  }

  // --- Bookmark ---
  isBookmarked(targetType, targetId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;
    return (this.data.bookmarks || []).some(
      b => b.userId === currentUser.id && b.targetType === targetType && b.targetId === targetId
    );
  }

  toggleBookmark(targetType, targetId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { requireAuth: true };
    if (!this.data.bookmarks) this.data.bookmarks = [];

    const idx = this.data.bookmarks.findIndex(
      b => b.userId === currentUser.id && b.targetType === targetType && b.targetId === targetId
    );

    if (idx !== -1) {
      this.data.bookmarks.splice(idx, 1);
      this.saveData();
      return false;
    } else {
      this.data.bookmarks.push({
        userId: currentUser.id,
        targetType: targetType,
        targetId: targetId,
        createdAt: new Date().toLocaleDateString("vi-VN")
      });
      this.saveData();
      return true;
    }
  }

  getUserBookmarks(userId) {
    const userBm = (this.data.bookmarks || []).filter(b => b.userId === userId);
    const articles = [];
    const birds = [];

    userBm.forEach(bm => {
      if (bm.targetType === "article") {
        const art = this.getArticleById(bm.targetId);
        if (art) articles.push(art);
      } else if (bm.targetType === "bird") {
        const bird = this.getBirdById(bm.targetId);
        if (bird) birds.push(bird);
      }
    });

    return { articles, birds };
  }

  // --- Reports (Moderation) ---
  createReport(targetType, targetId, reason) {
    const currentUser = this.getCurrentUser();
    if (!this.data.reports) this.data.reports = [];

    const report = {
      id: "rep_" + Date.now(),
      reporterId: currentUser.id,
      reporterName: currentUser.displayName,
      targetType: targetType,
      targetId: targetId,
      reason: reason.trim(),
      status: "pending",
      createdAt: new Date().toLocaleDateString("vi-VN") + " " + new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    };

    this.data.reports.push(report);
    this.saveData();
    return report;
  }

  getReports() {
    return this.data.reports || [];
  }

  resolveReport(reportId, action = "resolved") {
    const rep = (this.data.reports || []).find(r => r.id === reportId);
    if (!rep) return false;
    rep.status = action;
    this.saveData();
    return true;
  }
}

// Global Singleton Database Instance
const CUGAY_DB = new CuGayDatabase();
const SITE_DATA = CUGAY_DB.data;

if (typeof window !== "undefined") {
  window.CUGAY_DB = CUGAY_DB;
  window.SITE_DATA = SITE_DATA;
}
