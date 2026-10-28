// ===== 첫 화면 여러 나라 말 =====
// 도안 만들기 페이지와 같은 언어 목록, 같은 저장 이름("lang")을 써서 고른 언어가 두 페이지에 함께 적용돼요.

const LANGS = { ko: "한국어", en: "English", ja: "日本語", zh: "中文", ru: "Русский", fr: "Français", vi: "Tiếng Việt" };

const HOME = {
  ko: {
    nowLbl: "지금 {m}", st_plant: "{crop} 심는 때", st_grow: "{crop} 자라는 중", st_harvest: "{crop} 거두는 때", st_rest: "밭이 쉬는 달",
    leg_plant: "심기", leg_grow: "자라는 중", leg_harvest: "거두기", calHint: "작물 이름을 누르면 블로그 글을 찾아봐요",
    mailShow: "메일 주소 보기", mailCopy: "복사", mailCopied: "복사했어요 ✓",
    instaTitle: "인스타그램 고정 작품", instaMore: "@stitch_trip에서 더 보기 →", insta1: "꽃과 자동차, 프렌치노트 자수", insta2: "한련잎 입체 자수", insta3: "미니어처 화분 자수",
    cat_main: "시골·자수",
    farmPosts: "텃밭 일기", embPosts: "자수 일기", more: "블로그에서 더 보기 →", newBadge: "새 글",
    cat_all: "전체", cat_farm: "시골집과 텃밭", cat_city: "도시의 일상", cat_trip: "여행", cat_emb: "자수",
    langLbl: "언어",
    nav_about: "소개", nav_farm: "농사", nav_emb: "자수", nav_maker: "도안 만들기", nav_write: "글", nav_contact: "연락",
    h1: "<span class=\"num\">4</span>일은 도시에서,<br><span class=\"num\">3</span>일은 시골에서.",
    lede: "농사를 짓고, 수를 놓고, 글을 씁니다. 손으로 천천히 기르고 만드는 것들을 이곳에 모아 둡니다.",
    aboutP: "평일 나흘은 도시에서 일하고, 주말 사흘은 시골집에서 밭을 돌봅니다. 도시에서는 생각을 모으고, 시골에서는 그 생각을 손으로 옮깁니다.",
    weekAria: "한 주의 생활: 월요일부터 목요일은 도시, 금요일부터 일요일은 시골",
    days: ["월", "화", "수", "목", "금", "토", "일"],
    legend: "회색은 도시, 쪽빛은 시골에서 보내는 날입니다.",
    h_farm: "농사", h_emb: "자수", h_write: "글쓰기", h_contact: "연락",
    farmP: "주말마다 내려가는 시골집 텃밭에서 제철 작물을 기릅니다. 사흘만 머무는 농부라서 손이 덜 가는 작물을 골라 심습니다.",
    crop1: "감자", crop1m: "3월 심기 · 6월 캐기",
    crop2: "고추", crop2m: "5월 심기 · 8월 따기",
    crop3: "김장 배추", crop3m: "8월 심기 · 11월 거두기",
    embP: "시골집 마당에 피는 풀꽃을 실로 옮깁니다. 홈질과 사슬수, 프렌치노트처럼 기본 땀을 즐겨 씁니다.",
    work1: "마당의 쑥부쟁이", work1m: "사슬수 · 새틴수",
    work2: "손수건 모서리 이니셜", work2m: "백스티치",
    work3: "사시사철 풀꽃 샘플러", work3m: "프렌치노트",
    makerT: "📷 내 사진으로 도안 만들기",
    makerD: "사진을 찍으면 십자수·프랑스 자수 도안으로 바꾸고, 어울리는 기법을 추천해 드려요.",
    writeP: "도시와 시골을 오가며 보고 만든 것들에 대해 씁니다. 모든 글은 {blog}에서 읽을 수 있습니다.",
    blog: "네이버 블로그",
    post1: "금요일 저녁, 시골로 가는 길", post2: "한 땀씩 느려지는 연습", post3: "처음 캔 감자 한 바구니", post4: "사흘의 시골, 나흘의 도시",
    contactP: "작업이나 글에 대해 이야기하고 싶다면 편하게 메일 주세요."
  },
  en: {
    nowLbl: "Now in {m}:", st_plant: "planting {crop}", st_grow: "{crop} growing", st_harvest: "harvesting {crop}", st_rest: "the garden is resting",
    leg_plant: "Plant", leg_grow: "Growing", leg_harvest: "Harvest", calHint: "Tap a crop to find blog posts about it",
    mailShow: "Show email address", mailCopy: "Copy", mailCopied: "Copied ✓",
    instaTitle: "Pinned on Instagram", instaMore: "More on @stitch_trip →", insta1: "Flowers & car, French knots", insta2: "3D nasturtium leaves", insta3: "Miniature potted plants",
    cat_main: "Country & stitching",
    farmPosts: "From the garden", embPosts: "Embroidery diary", more: "More on the blog →", newBadge: "New",
    cat_all: "All", cat_farm: "Country & garden", cat_city: "City life", cat_trip: "Trips", cat_emb: "Embroidery",
    langLbl: "Language",
    nav_about: "About", nav_farm: "Farming", nav_emb: "Embroidery", nav_maker: "Pattern maker", nav_write: "Writing", nav_contact: "Contact",
    h1: "<span class=\"num\">4</span> days in the city,<br><span class=\"num\">3</span> days in the country.",
    lede: "I farm, I embroider, I write. This is where I keep the things I grow and make slowly, by hand.",
    aboutP: "Four weekdays I work in the city; three weekend days I tend the fields at my country house. In the city I gather ideas, and in the country I turn them into things with my hands.",
    weekAria: "My week: Monday to Thursday in the city, Friday to Sunday in the country",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    legend: "Gray days are in the city, indigo days in the country.",
    h_farm: "Farming", h_emb: "Embroidery", h_write: "Writing", h_contact: "Contact",
    farmP: "I grow seasonal crops in the kitchen garden at the country house I visit every weekend. As a three-day farmer, I choose crops that need little care.",
    crop1: "Potatoes", crop1m: "Plant in March · dig in June",
    crop2: "Chili peppers", crop2m: "Plant in May · pick in August",
    crop3: "Kimchi cabbage", crop3m: "Plant in August · harvest in November",
    embP: "I stitch the wildflowers that bloom in the country-house yard. I love basic stitches like running stitch, chain stitch and French knots.",
    work1: "Aster in the yard", work1m: "Chain stitch · satin stitch",
    work2: "Handkerchief corner initial", work2m: "Backstitch",
    work3: "Four-season wildflower sampler", work3m: "French knots",
    makerT: "📷 Turn your photo into a pattern",
    makerD: "Take a photo and get a cross-stitch or embroidery pattern, with stitch suggestions that suit it.",
    writeP: "I write about what I see and make while moving between the city and the country. All posts are on my {blog} (in Korean).",
    blog: "Naver blog",
    post1: "Friday evening, on the road to the country", post2: "Practicing slowing down, one stitch at a time", post3: "A basket of my first potatoes", post4: "Three days in the country, four in the city",
    contactP: "If you'd like to talk about my work or writing, feel free to email me."
  },
  ja: {
    nowLbl: "いま{m}", st_plant: "{crop}の植えどき", st_grow: "{crop}が育っています", st_harvest: "{crop}の収穫どき", st_rest: "畑はお休みの月",
    leg_plant: "植える", leg_grow: "育つ", leg_harvest: "収穫", calHint: "作物名をタップするとブログの記事を探せます",
    mailShow: "メールアドレスを表示", mailCopy: "コピー", mailCopied: "コピーしました ✓",
    instaTitle: "インスタグラムのピン留め作品", instaMore: "@stitch_tripでもっと見る →", insta1: "花と車、フレンチノット刺繍", insta2: "ナスタチウムの葉の立体刺繍", insta3: "ミニチュア鉢植え刺繍",
    cat_main: "田舎と刺繍",
    farmPosts: "畑の日記", embPosts: "刺繍の日記", more: "ブログでもっと見る →", newBadge: "新着",
    cat_all: "すべて", cat_farm: "田舎の家と畑", cat_city: "都会の日常", cat_trip: "旅", cat_emb: "刺繍",
    langLbl: "言語",
    nav_about: "紹介", nav_farm: "畑", nav_emb: "刺繍", nav_maker: "図案づくり", nav_write: "文章", nav_contact: "連絡",
    h1: "<span class=\"num\">4</span>日は都会で、<br><span class=\"num\">3</span>日は田舎で。",
    lede: "畑を耕し、刺繍をし、文章を書きます。手でゆっくり育て、作ったものをここに集めています。",
    aboutP: "平日の4日は都会で働き、週末の3日は田舎の家で畑の世話をします。都会では考えを集め、田舎ではその考えを手で形にします。",
    weekAria: "一週間の暮らし：月曜から木曜は都会、金曜から日曜は田舎",
    days: ["月", "火", "水", "木", "金", "土", "日"],
    legend: "灰色は都会、藍色は田舎で過ごす日です。",
    h_farm: "畑", h_emb: "刺繍", h_write: "文章", h_contact: "連絡",
    farmP: "週末ごとに通う田舎の家の家庭菜園で、旬の野菜を育てています。3日だけの農家なので、手間のかからない作物を選んで植えています。",
    crop1: "じゃがいも", crop1m: "3月に植えて · 6月に掘る",
    crop2: "唐辛子", crop2m: "5月に植えて · 8月に摘む",
    crop3: "キムチ用白菜", crop3m: "8月に植えて · 11月に収穫",
    embP: "田舎の家の庭に咲く野の花を糸で写します。ランニングステッチやチェーンステッチ、フレンチノットのような基本のステッチが好きです。",
    work1: "庭のヨメナ", work1m: "チェーンステッチ · サテンステッチ",
    work2: "ハンカチの隅のイニシャル", work2m: "バックステッチ",
    work3: "四季の野の花サンプラー", work3m: "フレンチノット",
    makerT: "📷 自分の写真で図案をつくる",
    makerD: "写真を撮るとクロスステッチやフランス刺繍の図案に変換し、合うステッチをおすすめします。",
    writeP: "都会と田舎を行き来しながら、見たもの、作ったものについて書いています。すべての記事は{blog}で読めます（韓国語）。",
    blog: "NAVERブログ",
    post1: "金曜の夜、田舎へ向かう道", post2: "ひと針ずつゆっくりになる練習", post3: "はじめて掘ったじゃがいもひとかご", post4: "3日の田舎、4日の都会",
    contactP: "作品や文章についてお話ししたい方は、お気軽にメールをください。"
  },
  zh: {
    nowLbl: "现在{m}", st_plant: "种{crop}的时候", st_grow: "{crop}正在生长", st_harvest: "收{crop}的时候", st_rest: "菜园休息的月份",
    leg_plant: "种植", leg_grow: "生长中", leg_harvest: "收获", calHint: "点作物名称可查找相关博客文章",
    mailShow: "显示邮箱地址", mailCopy: "复制", mailCopied: "已复制 ✓",
    instaTitle: "Instagram置顶作品", instaMore: "去@stitch_trip看更多 →", insta1: "花与汽车，法式结粒绣", insta2: "旱金莲叶立体刺绣", insta3: "迷你盆栽刺绣",
    cat_main: "乡下与刺绣",
    farmPosts: "菜园日记", embPosts: "刺绣日记", more: "去博客看更多 →", newBadge: "新",
    cat_all: "全部", cat_farm: "乡下与菜园", cat_city: "城市日常", cat_trip: "旅行", cat_emb: "刺绣",
    langLbl: "语言",
    nav_about: "介绍", nav_farm: "种田", nav_emb: "刺绣", nav_maker: "做图样", nav_write: "文章", nav_contact: "联系",
    h1: "<span class=\"num\">4</span>天在城市，<br><span class=\"num\">3</span>天在乡下。",
    lede: "种田、刺绣、写作。把亲手慢慢种出来、做出来的东西收集在这里。",
    aboutP: "工作日的四天在城市上班，周末的三天在乡下的家照料田地。在城市里积攒想法，在乡下用双手把想法变成现实。",
    weekAria: "一周的生活：周一到周四在城市，周五到周日在乡下",
    days: ["一", "二", "三", "四", "五", "六", "日"],
    legend: "灰色是在城市的日子，靛蓝色是在乡下的日子。",
    h_farm: "种田", h_emb: "刺绣", h_write: "文章", h_contact: "联系",
    farmP: "在每个周末回去的乡下家里的菜园种植应季作物。因为是只待三天的农夫，所以挑选不太费工夫的作物来种。",
    crop1: "土豆", crop1m: "3月种 · 6月挖",
    crop2: "辣椒", crop2m: "5月种 · 8月摘",
    crop3: "腌泡菜用白菜", crop3m: "8月种 · 11月收",
    embP: "把乡下院子里开的野花绣到布上。喜欢平针绣、锁链绣、法式结粒绣这样的基本针法。",
    work1: "院子里的野菊", work1m: "锁链绣 · 缎面绣",
    work2: "手帕角上的字母", work2m: "回针绣",
    work3: "四季野花样本", work3m: "法式结粒绣",
    makerT: "📷 用自己的照片做图样",
    makerD: "拍张照片，就能变成十字绣或法式刺绣图样，还会推荐合适的针法。",
    writeP: "写下往返于城市和乡下时看到、做出的东西。所有文章都可以在{blog}上阅读（韩语）。",
    blog: "Naver博客",
    post1: "周五傍晚，去乡下的路上", post2: "一针一针慢下来的练习", post3: "第一次挖的一篮土豆", post4: "三天的乡下，四天的城市",
    contactP: "如果想聊聊作品或文章，欢迎随时发邮件给我。"
  },
  ru: {
    nowLbl: "Сейчас {m} —", st_plant: "сажаем: {crop}", st_grow: "растёт: {crop}", st_harvest: "собираем: {crop}", st_rest: "огород отдыхает",
    leg_plant: "Посадка", leg_grow: "Растёт", leg_harvest: "Сбор", calHint: "Нажмите на культуру, чтобы найти записи в блоге",
    mailShow: "Показать адрес почты", mailCopy: "Копировать", mailCopied: "Скопировано ✓",
    instaTitle: "Закреплено в Instagram", instaMore: "Больше в @stitch_trip →", insta1: "Цветы и машина, французские узелки", insta2: "Объёмные листья настурции", insta3: "Миниатюрные растения в горшках",
    cat_main: "Деревня и вышивка",
    farmPosts: "Дневник огорода", embPosts: "Дневник вышивки", more: "Больше в блоге →", newBadge: "Новое",
    cat_all: "Все", cat_farm: "Деревня и огород", cat_city: "Городская жизнь", cat_trip: "Поездки", cat_emb: "Вышивка",
    langLbl: "Язык",
    nav_about: "О себе", nav_farm: "Огород", nav_emb: "Вышивка", nav_maker: "Схема из фото", nav_write: "Тексты", nav_contact: "Контакты",
    h1: "<span class=\"num\">4</span> дня в городе,<br><span class=\"num\">3</span> дня в деревне.",
    lede: "Выращиваю, вышиваю, пишу. Здесь я собираю то, что неспешно выращиваю и делаю своими руками.",
    aboutP: "Четыре будних дня я работаю в городе, а три выходных ухаживаю за огородом в деревенском доме. В городе собираю мысли, а в деревне воплощаю их руками.",
    weekAria: "Моя неделя: с понедельника по четверг в городе, с пятницы по воскресенье в деревне",
    days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    legend: "Серые дни — в городе, синие — в деревне.",
    h_farm: "Огород", h_emb: "Вышивка", h_write: "Тексты", h_contact: "Контакты",
    farmP: "Выращиваю сезонные овощи на огороде деревенского дома, куда езжу каждые выходные. Я фермер на три дня, поэтому сажаю то, что не требует много ухода.",
    crop1: "Картофель", crop1m: "Посадка в марте · копка в июне",
    crop2: "Острый перец", crop2m: "Посадка в мае · сбор в августе",
    crop3: "Пекинская капуста для кимчи", crop3m: "Посадка в августе · уборка в ноябре",
    embP: "Переношу на ткань полевые цветы, что растут во дворе деревенского дома. Люблю простые швы: «вперёд иголку», тамбурный и французские узелки.",
    work1: "Астра во дворе", work1m: "Тамбурный шов · гладь",
    work2: "Инициал в уголке платка", work2m: "Шов «назад иголку»",
    work3: "Сэмплер полевых цветов на все сезоны", work3m: "Французские узелки",
    makerT: "📷 Схема из вашей фотографии",
    makerD: "Сфотографируйте — и получите схему для вышивки крестом или гладью с подсказками подходящих швов.",
    writeP: "Пишу о том, что вижу и делаю, переезжая между городом и деревней. Все записи — в моём {blog} (на корейском).",
    blog: "блоге Naver",
    post1: "Пятничный вечер, дорога в деревню", post2: "Учусь замедляться — стежок за стежком", post3: "Корзинка первой картошки", post4: "Три дня в деревне, четыре в городе",
    contactP: "Если хотите поговорить о работах или текстах, смело пишите мне на почту."
  },
  fr: {
    nowLbl: "En {m} :", st_plant: "on plante : {crop}", st_grow: "{crop} pousse", st_harvest: "on récolte : {crop}", st_rest: "le potager se repose",
    leg_plant: "Plantation", leg_grow: "Croissance", leg_harvest: "Récolte", calHint: "Touchez une culture pour trouver les articles du blog",
    mailShow: "Afficher l'adresse e-mail", mailCopy: "Copier", mailCopied: "Copié ✓",
    instaTitle: "Épinglé sur Instagram", instaMore: "Plus sur @stitch_trip →", insta1: "Fleurs et voiture, points de nœud", insta2: "Feuilles de capucine en relief", insta3: "Plantes miniatures en pot",
    cat_main: "Campagne & broderie",
    farmPosts: "Journal du potager", embPosts: "Journal de broderie", more: "Plus sur le blog →", newBadge: "Nouveau",
    cat_all: "Tout", cat_farm: "Campagne & potager", cat_city: "Vie en ville", cat_trip: "Escapades", cat_emb: "Broderie",
    langLbl: "Langue",
    nav_about: "À propos", nav_farm: "Potager", nav_emb: "Broderie", nav_maker: "Créer un motif", nav_write: "Écrits", nav_contact: "Contact",
    h1: "<span class=\"num\">4</span> jours en ville,<br><span class=\"num\">3</span> jours à la campagne.",
    lede: "Je cultive, je brode, j'écris. Je rassemble ici ce que je fais pousser et fabrique lentement, à la main.",
    aboutP: "Quatre jours par semaine, je travaille en ville ; les trois jours du week-end, je m'occupe du potager de ma maison de campagne. En ville je rassemble des idées, à la campagne je leur donne forme avec mes mains.",
    weekAria: "Ma semaine : du lundi au jeudi en ville, du vendredi au dimanche à la campagne",
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    legend: "Les jours gris sont en ville, les jours indigo à la campagne.",
    h_farm: "Potager", h_emb: "Broderie", h_write: "Écrits", h_contact: "Contact",
    farmP: "Je cultive des légumes de saison dans le potager de la maison de campagne où je vais chaque week-end. Jardinier trois jours par semaine, je choisis des cultures peu exigeantes.",
    crop1: "Pommes de terre", crop1m: "Plantation en mars · récolte en juin",
    crop2: "Piments", crop2m: "Plantation en mai · cueillette en août",
    crop3: "Chou chinois pour le kimchi", crop3m: "Plantation en août · récolte en novembre",
    embP: "Je brode les fleurs sauvages qui poussent dans la cour de la maison de campagne. J'aime les points de base : point avant, point de chaînette, points de nœud.",
    work1: "Aster de la cour", work1m: "Point de chaînette · point de satin",
    work2: "Initiale au coin d'un mouchoir", work2m: "Point arrière",
    work3: "Abécédaire des fleurs des quatre saisons", work3m: "Points de nœud",
    makerT: "📷 Créer un motif à partir de votre photo",
    makerD: "Prenez une photo : elle devient une grille de point de croix ou un patron de broderie, avec des points conseillés.",
    writeP: "J'écris sur ce que je vois et fabrique entre la ville et la campagne. Tous les articles sont sur mon {blog} (en coréen).",
    blog: "blog Naver",
    post1: "Vendredi soir, sur la route de la campagne", post2: "Apprendre à ralentir, point par point", post3: "Un panier de mes premières pommes de terre", post4: "Trois jours à la campagne, quatre en ville",
    contactP: "Pour parler de mes travaux ou de mes écrits, n'hésitez pas à m'écrire."
  },
  vi: {
    nowLbl: "Bây giờ là {m}:", st_plant: "trồng {crop}", st_grow: "{crop} đang lớn", st_harvest: "thu hoạch {crop}", st_rest: "vườn đang nghỉ",
    leg_plant: "Trồng", leg_grow: "Đang lớn", leg_harvest: "Thu hoạch", calHint: "Chạm vào tên cây để tìm bài viết trên blog",
    mailShow: "Hiện địa chỉ email", mailCopy: "Sao chép", mailCopied: "Đã sao chép ✓",
    instaTitle: "Ghim trên Instagram", instaMore: "Xem thêm trên @stitch_trip →", insta1: "Hoa và xe hơi, mũi nút Pháp", insta2: "Lá sen cạn thêu nổi", insta3: "Chậu cây thêu thu nhỏ",
    cat_main: "Quê & thêu",
    farmPosts: "Nhật ký vườn", embPosts: "Nhật ký thêu", more: "Xem thêm trên blog →", newBadge: "Mới",
    cat_all: "Tất cả", cat_farm: "Nhà quê & vườn", cat_city: "Đời sống phố", cat_trip: "Du lịch", cat_emb: "Thêu",
    langLbl: "Ngôn ngữ",
    nav_about: "Giới thiệu", nav_farm: "Làm vườn", nav_emb: "Thêu", nav_maker: "Tạo mẫu thêu", nav_write: "Bài viết", nav_contact: "Liên hệ",
    h1: "<span class=\"num\">4</span> ngày ở thành phố,<br><span class=\"num\">3</span> ngày ở quê.",
    lede: "Tôi làm vườn, thêu thùa và viết lách. Nơi đây lưu lại những thứ tôi chậm rãi trồng và làm bằng đôi tay.",
    aboutP: "Bốn ngày trong tuần tôi làm việc ở thành phố, ba ngày cuối tuần tôi chăm vườn ở ngôi nhà quê. Ở thành phố tôi gom góp ý tưởng, về quê tôi biến chúng thành hiện thực bằng đôi tay.",
    weekAria: "Một tuần của tôi: thứ Hai đến thứ Năm ở thành phố, thứ Sáu đến Chủ nhật ở quê",
    days: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    legend: "Ngày màu xám ở thành phố, ngày màu chàm ở quê.",
    h_farm: "Làm vườn", h_emb: "Thêu", h_write: "Bài viết", h_contact: "Liên hệ",
    farmP: "Tôi trồng rau theo mùa trong mảnh vườn ở ngôi nhà quê mà cuối tuần nào tôi cũng về. Là nông dân chỉ ba ngày nên tôi chọn những loại cây ít phải chăm.",
    crop1: "Khoai tây", crop1m: "Trồng tháng 3 · đào tháng 6",
    crop2: "Ớt", crop2m: "Trồng tháng 5 · hái tháng 8",
    crop3: "Cải thảo muối kim chi", crop3m: "Trồng tháng 8 · thu hoạch tháng 11",
    embP: "Tôi thêu lại những bông hoa dại nở trong sân nhà quê. Tôi thích các mũi thêu cơ bản như mũi chạy, mũi xích và mũi nút Pháp.",
    work1: "Hoa cúc dại trong sân", work1m: "Mũi xích · mũi sa-tanh",
    work2: "Chữ cái ở góc khăn tay", work2m: "Mũi đột",
    work3: "Bảng mẫu hoa dại bốn mùa", work3m: "Mũi nút Pháp",
    makerT: "📷 Tạo mẫu thêu từ ảnh của bạn",
    makerD: "Chụp một tấm ảnh để có mẫu thêu chữ thập hoặc thêu tay, kèm gợi ý mũi thêu phù hợp.",
    writeP: "Tôi viết về những gì mình thấy và làm khi đi lại giữa thành phố và nông thôn. Tất cả bài viết đều có trên {blog} (bằng tiếng Hàn).",
    blog: "blog Naver",
    post1: "Tối thứ Sáu, trên đường về quê", post2: "Tập chậm lại, từng mũi kim một", post3: "Giỏ khoai tây đầu tiên", post4: "Ba ngày ở quê, bốn ngày ở phố",
    contactP: "Nếu muốn trò chuyện về tác phẩm hay bài viết, cứ thoải mái gửi email cho tôi nhé."
  }
};

function pickLang() {
  const q = new URLSearchParams(location.search).get("lang");
  if (q && LANGS[q]) {
    try { localStorage.setItem("lang", q); } catch (e) {}   // 링크로 고른 언어를 다음 페이지에서도
    return q;
  }
  try { const s = localStorage.getItem("lang"); if (s && LANGS[s]) return s; } catch (e) {}
  for (const l of navigator.languages || [navigator.language || ""]) {
    const code = String(l).toLowerCase().slice(0, 2);
    if (LANGS[code]) return code;
  }
  return "en";
}

function applyHome(lang) {
  const d = HOME[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach(el => { if (d[el.dataset.t] != null) el.textContent = d[el.dataset.t]; });
  document.querySelectorAll("[data-t-alt]").forEach(el => { el.alt = d[el.dataset.tAlt]; });
  document.querySelectorAll("[data-t-html]").forEach(el => { if (d[el.dataset.tHtml] != null) el.innerHTML = d[el.dataset.tHtml]; });
  document.querySelectorAll(".week .day").forEach((el, i) => { el.lastChild.textContent = d.days[i]; });
  document.querySelector(".week").setAttribute("aria-label", d.weekAria);
  // 블로그 링크는 그대로 두고 앞뒤 문장만 바꾸기
  const p = document.getElementById("writeP"), link = p.querySelector("a");
  const [before, after] = d.writeP.split("{blog}");
  link.textContent = d.blog;
  p.replaceChildren(before, link, after);
  document.getElementById("langSelect").value = lang;
  document.dispatchEvent(new Event("langchange"));
}

// ===== 메일 주소 =====
// 주소를 페이지에 그대로 적어 두면 스팸 수집 프로그램이 가져가서, 버튼을 누를 때만 조립해요
(function () {
  const addr = ["moc.liamg", "933klimo"].map(s => [...s].reverse().join("")).reverse().join("@");
  const link = document.getElementById("mailLink"), copy = document.getElementById("mailCopy");
  document.getElementById("mailReveal").addEventListener("click", e => {
    link.href = "mailto:" + addr;
    link.textContent = addr;
    e.target.hidden = true;
    document.getElementById("mailBox").hidden = false;
  });
  copy.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(addr); } catch (err) { return; }
    copy.textContent = HOME[document.documentElement.lang].mailCopied;
    setTimeout(() => { copy.textContent = HOME[document.documentElement.lang].mailCopy; }, 2000);
  });
})();

(function () {
  const sel = document.getElementById("langSelect");
  Object.entries(LANGS).forEach(([code, label]) => sel.add(new Option(label, code)));
  sel.addEventListener("change", () => {
    try { localStorage.setItem("lang", sel.value); } catch (e) {}
    applyHome(sel.value);
  });
  applyHome(pickLang());
})();
