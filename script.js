/* ==========================================================================
   Yanggu Tour Website JavaScript Interactivity
   ========================================================================== */

// 1. Language Dictionaries (KO / EN)
const translations = {
  ko: {
    // Header
    logo_text: "양구올구양",
    nav_attractions: "양구 9경",
    nav_map: "관광지도",
    nav_gomchwi: "양구 곰취",
    nav_booking: "투어예약",
    nav_festivals: "지역축제",
    nav_faq: "여행정보",
    nav_cta: "시티투어 예약",
    
    // Hero
    hero_title: "대한민국 국토정중앙,<br><span class=\"highlight\">청정 자연의 숨결</span>을 만나다",
    hero_subtitle: "한반도의 중심 양구에서 펼쳐지는 평화와 힐링의 대서사시. 아름다운 DMZ와 청량한 숲으로의 초대.",
    search_placeholder: "어디로 떠나고 싶으신가요? (예: 두타연, 한반도섬)",
    search_btn: "검색",
    quick_tags: "추천 태그:",
    stat_9views: "양구 대표 9경",
    stat_center_num: "정중앙",
    stat_center: "국토 정중앙 좌표",
    stat_forest: "청정 산림 면적",
    scroll_down: "아래로 스크롤",
    
    // Attractions Section Headers
    badge_views: "Yanggu 9 Views",
    views_title: "양구 대표 9경",
    views_desc: "천혜의 자연과 유구한 역사, 그리고 예술의 향기가 흐르는 양구의 대표 명소를 만나보세요.",
    filter_all: "전체보기",
    filter_nature: "힐링 자연",
    filter_art: "역사 & 예술",
    filter_dmz: "평화 & 안보",
    
    // 9 Scenic Views Card Details & Badges
    badge_1경: "제1경", badge_2경: "제2경", badge_3경: "제3경", badge_4경: "제4경", badge_5경: "제5경",
    badge_6경: "제6경", badge_7경: "제7경", badge_8경: "제8경", badge_9경: "제9경",
    
    view1_title: "양구수목원", view1_desc: "대암산 기슭의 자연을 간직한 사계절 생태 학습관과 희귀 야생화들의 안식처.",
    view2_title: "한반도섬", view2_desc: "파로호 호수 위에 놓인 한반도 모양의 아름다운 인공섬과 나무 데크 산책로.",
    view3_title: "두타연", view3_desc: "50여 년간 민간인 출입이 통제되어 태고의 원시림을 고스란히 간직한 비경지대.",
    view4_title: "박수근미술관", view4_desc: "한국 근현대 대표 화가 박수근 화백의 생가 터에 지어진 돌빛 예술 미술관.",
    view5_title: "양구백자박물관", view5_desc: "조선 백자의 명맥을 잇는 백자 토의 고장 양구에서 전통과 백자 도예를 감상.",
    view6_title: "국토정중앙 펀치볼", view6_desc: "화채 그릇 모양의 독특한 해안 분지로, 한국전쟁 격전지의 역사와 둘레길 체험.",
    view7_title: "양구 봉화산", view7_desc: "해발 874m 산봉우리에서 마주하는 소양호 풍경과 멋진 운해, 일출 등정 명소.",
    view8_title: "상무룡출렁다리", view8_desc: "파로호 물결 위를 시원하게 가로지르며 걷는 길이 340m의 아찔한 보행 현수교.",
    view9_title: "광치계곡", view9_desc: "대암산 줄기를 타고 내리는 시원한 폭포수와 자연휴양림 숲속 힐링 치유길.",
    
    tag_botanical: "생태/식물원", tag_lake: "수상 산책", tag_dmz: "DMZ 생태관광",
    tag_art: "문화/예술", tag_porcelain: "전통 도자기", tag_basin: "분지/전망대",
    tag_peak: "하이킹/일출", tag_bridge: "출렁다리", tag_valley: "계곡/휴양림",
    more_info: "자세히 보기",
    
    // Map Section
    badge_map: "Smart Guide",
    map_title: "양구 인터랙티브 관광지도",
    map_desc: "지도 위 주요 명소 핀을 클릭하시면 양구군 구석구석에 숨겨진 보물 같은 관광 명소 정보를 확인할 수 있습니다.",
    map_reg_bangsan: "방산면 (Bangsan)",
    map_reg_yup: "양구읍 (Yanggu-eup)",
    map_reg_haean: "해안면 (Haean/Punchbowl)",
    map_reg_gukto: "국토정중앙면 (Gukto)",
    
    pin_arboretum: "양구수목원",
    pin_koreaisland: "한반도섬",
    pin_dutayeon: "두타연 (DMZ)",
    pin_artmuseum: "박수근미술관",
    pin_punchbowl: "펀치볼 (해안면)",
    
    map_card_prompt: "관광지 정보를 선택하세요",
    map_card_sub: "지도의 마커를 클릭하면 상세 코스 정보, 소요 시간, 교통편 등을 즉시 조회할 수 있습니다.",
    info_hours: "운영시간:",
    info_price: "이용요금:",
    info_note: "유의사항:",
    info_btn_book: "연계 투어 예약",
    info_btn_more: "상세 소개 보기",
    
    // Booking Form
    badge_res: "Reservation",
    res_title: "관광 상품 통합 예약",
    res_desc: "민통선 출입이 필요한 안보관광 및 문화 해설사와 함께하는 명품 시티투어 예약을 한곳에서 해결하세요.",
    tab_dmz: "DMZ 안보관광 예약",
    tab_city: "양구 시티투어 예약",
    label_dmz_dest: "관광지 선택",
    opt_dutayeon: "두타연 비경 탐방 코스",
    opt_eulji: "을지전망대 & 제4땅굴 안보 코스",
    opt_total_dmz: "DMZ 평화통일 올인원 패키지",
    help_dmz_dest: "※ 안보관광지는 군부대 협의에 따라 출입 사전 승인이 필수적입니다.",
    label_city_course: "시티투어 테마 코스",
    opt_city_art: "청춘문화 예술 코스 (박수근미술관, 백자박물관)",
    opt_city_eco: "생태 힐링 가득 코스 (양구수목원, 한반도섬, 광치계곡)",
    opt_city_center: "국토정중앙 별빛 코스 (천문대, 파로호 꽃섬)",
    help_city_course: "※ 시티투어는 문화관광해설사가 탑승하여 친절한 해설을 곁들입니다.",
    label_date: "방문 날짜 선택",
    label_visitors: "예약 인원 (명)",
    label_name: "대표 예약자 성명",
    ph_name: "홍길동",
    label_phone: "연락처",
    ph_phone: "010-1234-5678",
    label_email: "이메일 주소",
    ph_email: "example@email.com",
    label_guide_lang: "외국어 해설 서비스 필요 여부",
    opt_lang_none: "필요 없음 (한국어 기본)",
    opt_lang_en: "English Guide Service",
    opt_lang_zh: "中文 (Chinese) 导游",
    opt_lang_ja: "日本語 (Japanese) ガイド",
    check_security: "[필수] 군사구역 및 DMZ 접경지역 출입 보안서약 및 주의사항 동의",
    security_box_text: "안보관광지는 군부대의 통제를 받는 구역으로 신분증(주민등록증, 여권 등) 미지참 시 입장이 전면 불가능하며, 군사시설물 촬영은 철저히 통제됩니다.",
    btn_submit_res: "예약 신청하기",
    
    // Booking Ticket
    ticket_prompt: "모바일 예약 티켓 발권",
    ticket_desc: "왼쪽 폼에 예약 정보를 입력하고 신청하시면, 이곳에 즉시 스캔 및 소지가 가능한 모바일 탑승권(Pass)이 발급됩니다.",
    t_label_course: "투어 코스",
    t_label_type: "티켓 종류",
    t_label_date: "예약 일자",
    t_label_qty: "인원수",
    t_label_holder: "대표 탑승자",
    t_label_lang: "외국어 해설",
    t_status_pending: "예약 완료 - 군사구역 출입 보안 심사 대기",
    ticket_warning: "※ 반드시 출발 30분 전까지 지정된 등록처에 신분증을 제출해 주시기 바랍니다.",
    btn_print: "티켓 다운로드 / 인쇄",
    
    // Festivals
    badge_festivals: "Festivals",
    festivals_title: "양구 대표 축제",
    festivals_desc: "일 년 내내 볼거리와 즐길 거리가 가득한 청정 양구의 명품 축제를 소개합니다.",
    fest1_date: "매년 5월 개최",
    fest1_title: "양구 곰취축제",
    fest1_desc: "대암산 자락에서 자라나 향이 짙은 양구 대표 산나물 곰취를 직접 수확하고 맛보는 봄철 최고의 축제.",
    fest2_date: "매년 8월 개최",
    fest2_title: "양구 배꼽축제 (Baekkob Festival)",
    fest2_desc: "국토 정중앙 양구의 배꼽(센터) 상징성을 활용하여 한여름 밤의 음악, 댄스, 수상 레저와 불꽃놀이가 어우러지는 활기찬 연차 축제.",
    fest3_date: "매년 10월/11월 개최",
    fest3_title: "양구 DMZ 펀치볼 시래기 축제",
    fest3_desc: "서늘한 고지대 펀치볼 덕장에서 건조하여 비타민이 풍부하고 부드러운 웰빙 푸드 시래기를 주제로 한 가을 수확 축제.",
    
    // FAQs
    badge_faq: "Travel Tips",
    faq_title: "양구 여행 자주 묻는 질문",
    faq_desc: "양구 여행 계획을 세우면서 가장 궁금해하시는 질문과 주요 교통 정보를 정리해 드립니다.",
    q1: "서울에서 양구군까지 대중교통으로 어떻게 가나요?",
    a1: "1. ITX-청춘 열차 또는 경춘선 전철을 탑승하고 춘천역에서 하차하신 뒤, 춘천역시외버스터미널이나 동서울터미널에서 양구행 직행버스를 타시면 약 1시간 내로 도착 가능합니다.<br>2. 동서울종합터미널에서 양구시외버스터미널행 무정차 직행버스(하루 수차례 운행, 약 2시간 소요)를 이용하시는 것이 가장 편리합니다.",
    q2: "두타연이나 을지전망대를 가려면 꼭 예약을 사전에 해야 하나요?",
    a2: "네, 두타연 및 을지전망대 등 DMZ 민간인통제선(민통선) 내 지역은 군부대의 철저한 보안 통제를 받는 구역입니다. 당일 현장 신청도 상황에 따라 가능하지만, 대기 시간이 길어질 수 있고 군 작전 시 입장이 제한될 수 있으므로 본 사이트나 양구군 안보예약 시스템을 통해 최소 2~3일 전에 사전 예약하시는 것을 강력히 권장합니다. 동행인 전원의 신분증(여권) 소지도 필수입니다.",
    q3: "외국인 관광객을 위한 다국어 해설사 지원이 되나요?",
    a3: "네, 양구군에서는 외국인 단체 및 개별 관광객들의 편의를 위해 영어, 중국어, 일본어 해설 서비스를 무상으로 제공하고 있습니다. 시티투어 신청 시 원하시는 언어를 체크해 주시거나, 관광 개시일 최소 일주일 전에 양구군 문화관광과(033-480-2251)로 예약 전화를 주시면 전담 해설사를 매칭해 드립니다.",
    q4: "국토정중앙천문대의 캠핑장 이용 방법은 어떻게 되나요?",
    a4: "국토정중앙천문대 바로 옆 야영장(캠핑장)은 텐트를 설치할 수 있는 데크 구역을 보유하고 있으며, 인터넷 예약을 통해 사전 등록해야 사용 가능합니다. 깨끗한 식수대, 온수 샤워실, 그리고 밤바람을 맞으며 은하수를 감상할 수 있는 독보적인 천문 관측 인프라가 매력적입니다.",
    util_title: "여행 준비 도우미",
    util_desc: "오프라인에서도 편리하게 참고할 수 있는 양구군 공식 여행 지도를 받아보세요.",
    btn_map_ko: "관광 안내 지도 (국문)",
    btn_map_en: "Tourism Map Guide (ENG)",
    btn_call: "관광 안내 전화 연결",
    help_phone_label: "외국인 종합 안내 콜센터:",
    help_phone_val: "국번 없이 1330 (24시간 지원, 영/중/일)",
    
    // Modal
    modal_traffic_info: "찾아오시는 길 & 이용안내",
    modal_address: "주소:",
    modal_traffic: "교통편:",
    modal_phone: "문의처:",
    modal_book_now: "이 명소가 포함된 투어 예약하기",
    
    // Footer
    footer_slogan: "대한민국 국토정중앙 양구, 자연과 평화가 흐르는 청정 힐링 여행지.",
    f_links_title: "유관기관 링크",
    f_link_gun: "양구군청",
    f_link_cf: "양구문화재단",
    f_link_gw: "강원관광",
    f_contact_title: "관광안내 및 지원",
    f_c_tel: "대표안내:",
    f_c_address: "주소:",
    f_c_hours: "평일:",
    footer_disclaimer: "본 웹페이지는 외국인 및 외부 관광객 유치를 위한 홍보 시뮬레이션 플랫폼입니다.",
    
    // Specialty Section (Gomchwi)
    badge_specialty: "양구 특산물",
    gomchwi_section_title: "산나물의 제왕, 양구 명품 곰취",
    gomchwi_harvest_badge: "제철 수확: 4월 ~ 5월",
    gomchwi_timeline_title: "곰취 생태 캘린더 (Seasonal Calendar)",
    gomchwi_time1_m: "4월 초 (April)",
    gomchwi_time1_d: "첫 싹과 수확 시작",
    gomchwi_time2_m: "5월 초 (May)",
    gomchwi_time2_d: "양구 곰취 축제 & 최고 풍미",
    gomchwi_time3_m: "6월~8월 (Summer)",
    gomchwi_time3_d: "장아찌 가공 및 저장 공급",
    gomchwi_tab_story: "곰취 이야기",
    gomchwi_tab_benefits: "영양 및 효능",
    gomchwi_tab_recipes: "대표 레시피",
    gomchwi_story_h: "대암산 맑은 바람이 키워낸 신비의 산나물",
    gomchwi_story_p1: "곰이 겨울잠에서 깬 직후 몸속 독소를 제거하고 원기를 보충하기 위해 가장 먼저 찾아 먹는다고 해서 '곰취'라는 이름이 유래되었습니다. 양구 곰취는 해발 1,000m가 넘는 대암산 자락의 청정 고산지대에서 재배되어 그 향이 다른 지역보다 월등히 깊습니다.",
    gomchwi_story_p2: "일교차가 심하고 서늘한 양구 해안면(펀치볼) 일대의 토양에서 자란 곰취는 잎이 매우 연하고 부드러우며 특유의 쌉싸래한 첫맛과 목 넘김 끝에 감도는 달콤함이 특징입니다.",
    gomchwi_benefits_h: "몸속 활력을 깨우는 웰빙 천연 약초",
    gomchwi_benefit1_title: "비타민 A & C (항산화, 피로 개선)",
    gomchwi_benefit2_title: "베타카로틴 (항암, 노화 방지)",
    gomchwi_benefit3_title: "칼륨 & 식이섬유 (혈압조절, 체내 해독)",
    gomchwi_benefits_note: "※ 양구 곰취는 단백질, 칼슘 등도 다량 함유되어 있어 봄철 춘곤증 예방과 환절기 면역 증진에 아주 훌륭한 산채입니다.",
    gomchwi_recipes_h: "전통과 현대를 아우르는 향긋한 미식",
    recipe1_title: "곰취 쌈밥",
    recipe1_desc: "살짝 데친 연한 곰취 잎에 양념 쌈장과 밥을 올려 싸 먹는 대표적인 웰빙 미식",
    recipe2_title: "곰취 장아찌",
    recipe2_desc: "간장 양념에 절여 사계절 내내 특유의 은은한 향을 고기 요리와 함께 즐기는 일품 반찬",
    recipe3_title: "곰취 브레드 / 만두",
    recipe3_desc: "말린 곰취 분말을 반죽에 넣어 구운 곰취 소금빵, 찐빵, 만두 등 이색 디저트",
    quiz_title: "<i class=\"fa-solid fa-utensils\"></i> 나에게 딱 맞는 곰취 미식 매칭",
    quiz_desc: "평소 좋아하는 식습관이나 선호도를 선택해 보세요. 최고의 양구 곰취 요리를 추천해 드립니다!",
    quiz_opt_meat: "고기매니아 스타일",
    quiz_opt_healthy: "청정 건강식 스타일",
    quiz_opt_sweet: "디저트/분식 스타일",
    quiz_result_badge: "추천 메뉴 (RECOMMENDED MENU)",
    quiz_pairing_label: "추천 곁들임:",

    // Public Transit (Bus schedule)
    nav_bus: "버스시간표",
    badge_bus: "교통 정보",
    bus_title: "대중교통 버스 운행 시간표",
    bus_desc: "서울, 춘천 등 주요 도시에서 양구군까지 오는 시외버스와 양구 관내 주요 관광지로 가는 농어촌 버스 시간표입니다.",
    bus_tab_intercity: "도시 간 시외버스",
    bus_tab_local: "관광지 농어촌버스",
    bus_btn_seoul: "동서울 ↔ 양구",
    bus_btn_chuncheon: "춘천 ↔ 양구",
    bus_dir_seoul_to: "동서울 → 양구 (상행)",
    bus_dir_to_seoul: "양구 → 동서울 (하행)",
    bus_fare_adult: "성인 요금: 17,000원",
    bus_duration_seoul: "소요 시간: 약 2시간 (무정차)",
    th_no: "순번",
    th_dept: "출발 시간",
    th_type: "구분",
    td_direct: "무정차 직행",
    td_last: "막차 (직행)",
    bus_dir_chun_to: "춘천 → 양구 (상행)",
    bus_dir_to_chun: "양구 → 춘천 (하행)",
    bus_fare_chun: "성인 요금: 7,400원",
    bus_duration_chun: "소요 시간: 약 1시간",
    td_local_inter: "직행 완행",
    bus_route_dutayeon: "양구 터미널 ↔ 동면 (두타연 방면)",
    bus_fare_local: "기본 요금: 1,400원 (교통카드 가능)",
    bus_note_dutayeon: "※ 동면 종점 하차 후 두타연 입구까지 도보 이동 필요",
    th_dept_terminal: "터미널 출발",
    th_dept_back: "종점 회차",
    bus_route_haean: "양구 터미널 ↔ 해안면 (펀치볼 방면)",
    bus_note_haean: "※ 통일관, 을지전망대 매표소 인근 하차",

    // Contact Form
    nav_contact: "문의하기",
    badge_contact: "Contact Us",
    contact_title: "관광안내 문의하기",
    contact_desc: "양구 관광에 대해 궁금한 점이 있으시면 문의를 보내주세요. 기재하신 이메일로 답변해 드립니다.",
    label_c_name: "성함",
    label_c_email: "답변받을 이메일 주소",
    label_c_subject: "문의 제목",
    label_c_message: "문의 내용",
    btn_send_email: "문의 메일 보내기"
  },
  en: {
    // Header
    logo_text: "Yanggu Olgu-yang",
    nav_attractions: "9 Views",
    nav_map: "Interactive Map",
    nav_gomchwi: "Yanggu Gomchwi",
    nav_booking: "Book Tour",
    nav_festivals: "Festivals",
    nav_faq: "Guide Info",
    nav_cta: "Book City Tour",
    
    // Hero
    hero_title: "The Center of Korea,<br><span class=\"highlight\">Breathe Pristine Nature</span>",
    hero_subtitle: "An epic saga of peace and healing unfolding at the heart of the Korean Peninsula. Welcome to Yanggu's beautiful DMZ and lush forests.",
    search_placeholder: "Where do you want to go? (e.g. Dutayeon, Punchbowl)",
    search_btn: "Search",
    quick_tags: "Quick Tags:",
    stat_9views: "Scenic Views",
    stat_center_num: "Center",
    stat_center: "Geographical Center of Korea",
    stat_forest: "Pristine Forest Area",
    scroll_down: "Scroll Down",
    
    // Attractions Section Headers
    badge_views: "Yanggu 9 Views",
    views_title: "9 Scenic Views of Yanggu",
    views_desc: "Explore Yanggu's premier landmarks where clean nature, deep history, and artistic scent flow gracefully.",
    filter_all: "View All",
    filter_nature: "Healing Nature",
    filter_art: "History & Art",
    filter_dmz: "Peace & DMZ",
    
    // 9 Scenic Views Card Details & Badges
    badge_1경: "1st View", badge_2경: "2nd View", badge_3경: "3rd View", badge_4경: "4th View", badge_5경: "5th View",
    badge_6경: "6th View", badge_7경: "7th View", badge_8경: "8th View", badge_9경: "9th View",
    
    view1_title: "Yanggu Eco-Arboretum", view1_desc: "A year-round ecological haven at the foot of Mt. Daeamsan containing rare wild alpine flowers.",
    view2_title: "Hanbando Island", view2_desc: "A stunning artificial island shaped like the Korean Peninsula situated in the clean waters of Paroho Lake.",
    view3_title: "Dutayeon Pond", view3_desc: "A pristine valley ecosystem untouched for 50 years inside the DMZ civilian control line.",
    view4_title: "Park Soo-keun Museum", view4_desc: "An aesthetic stone-walled museum built on the birthplace of Korea's legendary artist Park Soo-keun.",
    view5_title: "Porcelain Museum", view5_desc: "Discover white porcelain history and hands-on pottery workshops in the birthplace of Joseon porcelain clay.",
    view6_title: "Punchbowl Basin", view6_desc: "A unique punchbowl-shaped valley. Hike along the DMZ perimeter trails and witness historic battlefields.",
    view7_title: "Bonghwasan Mountain", view7_desc: "At 874m, it offers breathtaking views of Lake Soyangho and is a famous peak for sunrise hikes and mist seas.",
    view8_title: "Sangmuryong Suspension Bridge", view8_desc: "A thrilling 340m-long pedestrian bridge crossing over the scenic ripples of Paroho Lake.",
    view9_title: "Gwangchi Valley", view9_desc: "Cool refreshing water streams originating from Mt. Daeamsan, featuring forest therapy trails.",
    
    tag_botanical: "Eco/Botanical", tag_lake: "Water Walk", tag_dmz: "DMZ Nature",
    tag_art: "Culture & Art", tag_porcelain: "Traditional Pottery", tag_basin: "Basin/Observatory",
    tag_peak: "Hiking/Sunrise", tag_bridge: "Suspension Bridge", tag_valley: "Valley/Resort",
    more_info: "View Details",
    
    // Map Section
    badge_map: "Smart Guide",
    map_title: "Interactive Tourist Map",
    map_desc: "Click on the highlight pins on the map to explore details, routes, and travel tips for each destination in Yanggu.",
    map_reg_bangsan: "Bangsan-myeon (Crafts)",
    map_reg_yup: "Yanggu-eup (Downtown)",
    map_reg_haean: "Haean-myeon (Punchbowl/DMZ)",
    map_reg_gukto: "Guktojeongjungang-myeon (Center)",
    
    pin_arboretum: "Arboretum",
    pin_koreaisland: "Korean Peninsula Island",
    pin_dutayeon: "Dutayeon (DMZ)",
    pin_artmuseum: "Park Soo-keun Museum",
    pin_punchbowl: "Punchbowl (Haean)",
    
    map_card_prompt: "Select a tourist destination",
    map_card_sub: "Click on map markers to view course details, estimated travel times, and public transport options.",
    info_hours: "Opening Hours:",
    info_price: "Admission:",
    info_note: "Notice:",
    info_btn_book: "Book Tour Package",
    info_btn_more: "Explore Details",
    
    // Booking Form
    badge_res: "Reservation",
    res_title: "Integrated Tour Reservation",
    res_desc: "Register online for the DMZ Security Tour (Civilian Control Line entrance approval) or the curated Yanggu City Tour guided by professionals.",
    tab_dmz: "DMZ Border Security Tour",
    tab_city: "Yanggu City Tour",
    label_dmz_dest: "Choose Destination",
    opt_dutayeon: "Dutayeon Eco Forest Course",
    opt_eulji: "Eulji Observatory & 4th Tunnel Tour",
    opt_total_dmz: "DMZ Peace & Unity All-in-One Package",
    help_dmz_dest: "* Entrance to security zones requires military pre-approval.",
    label_city_course: "City Tour Theme Course",
    opt_city_art: "Youth & Art Course (Museums & Crafts)",
    opt_city_eco: "Healing Nature Course (Arboretum, Hanbando Island, Gwangchi)",
    opt_city_center: "Korea Center Starry Night Course (Observatory, Paroho Lake)",
    help_city_course: "* City tours include premium commentary by professional guides onboard.",
    label_date: "Select Date",
    label_visitors: "Number of Visitors",
    label_name: "Lead Visitor Name",
    ph_name: "John Doe",
    label_phone: "Contact Number",
    ph_phone: "+82-10-1234-5678",
    label_email: "Email Address",
    ph_email: "visitor@email.com",
    label_guide_lang: "Foreign Language Interpreter Service",
    opt_lang_none: "Not Needed (Korean Default)",
    opt_lang_en: "English Guide Service",
    opt_lang_zh: "中文 (Chinese) Interpreter",
    opt_lang_ja: "日本語 (Japanese) 通訳",
    check_security: "[Required] Agree to DMZ Border Area Entrance & Security Codes",
    security_box_text: "The DMZ zone is controlled by the South Korean Military. You MUST bring physical identification (Passport/ARC) on the tour day. Photography of military facilities is strictly prohibited.",
    btn_submit_res: "Submit Reservation Request",
    
    // Booking Ticket
    ticket_prompt: "Mobile Pass Issuance",
    ticket_desc: "Fill out the reservation details on the left. Your digital boarding pass will instantly generate here.",
    t_label_course: "TOUR COURSE",
    t_label_type: "PASS TYPE",
    t_label_date: "TOUR DATE",
    t_label_qty: "PASSENGERS",
    t_label_holder: "LEAD TRAVELER",
    t_label_lang: "INTERPRETER",
    t_status_pending: "APPROVED - PENDING MILITARY SECURITY CLEARANCE",
    ticket_warning: "* Note: You must present physical ID at the registration desk 30 minutes prior to departure.",
    btn_print: "Download / Print Ticket",
    
    // Festivals
    badge_festivals: "Festivals",
    festivals_title: "Traditional & Local Festivals",
    festivals_desc: "Meet Yanggu's signature seasonal festivals full of fun, gourmet food, and clean nature experiences.",
    fest1_date: "Held every May",
    fest1_title: "Yanggu Gomchwi Festival",
    fest1_desc: "Celebrate spring harvest by pickling and tasting Mt. Daeamsan's wild bear-parsley (Gomchwi), famous for its fragrant aroma.",
    fest2_date: "Held every August",
    fest2_title: "Yanggu Baekkob (Belly Button) Festival",
    fest2_desc: "Capitalizing on the 'belly button' center of Korea, this summer festival features live music, outdoor stages, water slides, and fireworks.",
    fest3_date: "Held every Oct/Nov",
    fest3_title: "Punchbowl Siraegi Festival",
    fest3_desc: "Enjoy culinary events dedicated to Siraegi (dried radish greens) dried slowly in the clean high-altitude winds of the Punchbowl Basin.",
    
    // FAQs
    badge_faq: "Travel Tips",
    faq_title: "Yanggu Travel FAQ",
    faq_desc: "Here are the most frequently asked questions and key public transportation details for planning your trip.",
    q1: "How do I travel from Seoul to Yanggu via public transportation?",
    a1: "1. Take the ITX-Cheongchun train or Gyeongchun Subway Line to Chuncheon Station. Go to the bus terminal next to the station and hop on a direct bus to Yanggu (approx. 45 mins).<br>2. Board an express direct bus from Dongseoul Bus Terminal (Gangbyeon Station) directly to Yanggu Intercity Terminal (takes approx. 2 hours).",
    q2: "Do I have to book in advance to visit Dutayeon or Eulji Observatory?",
    a2: "Yes. Since these attractions sit within the Military Civilian Control Line near the DMZ, military clearances are mandatory. Online booking 2 to 3 days in advance is highly recommended. Make sure to bring passports for all group members on the day of the tour.",
    q3: "Are foreign language guides available for international tourists?",
    a3: "Yes. Yanggu offers free English, Japanese, and Chinese tour guide services. Specify your preferred language on the booking form, or request a guide by contacting the Culture & Tourism Department (033-480-2251) at least one week in advance.",
    q4: "How do I book the campsite at the Guktojeongjungang Observatory?",
    a4: "The campsite adjacent to the astronomical observatory can be booked online. It provides clean cooking facilities, hot showers, and is one of the best spots in Korea to view the Milky Way.",
    util_title: "Travel Kit Assistance",
    util_desc: "Download official travel maps to guide your exploration off-the-grid.",
    btn_map_ko: "Tourist Map Guide (KOR)",
    btn_map_en: "Tourist Map Guide (ENG)",
    btn_call: "Call Tourist Info",
    help_phone_label: "Tourist Information Helpline:",
    help_phone_val: "Dial 1330 (24/7 support in English, Chinese, Japanese)",
    
    // Modal
    modal_traffic_info: "Routes & Visitor Guide",
    modal_address: "Address:",
    modal_traffic: "Transportation:",
    modal_phone: "Contact Phone:",
    modal_book_now: "Book Tour with this Destination",
    
    // Footer
    footer_slogan: "Yanggu: The geographical center of Korea. A sanctuary of peace and pristine nature.",
    f_links_title: "Quick Links",
    f_link_gun: "Yanggu County Hall",
    f_link_cf: "Yanggu Culture Foundation",
    f_link_gw: "Gangwon Province Tourism",
    f_contact_title: "Information & Support",
    f_c_tel: "Tourism Dept:",
    f_c_address: "Address:",
    f_c_hours: "Office Hours:",
    footer_disclaimer: "This webpage is a simulated tourism platform built for promotional and demonstration purposes.",
    
    // Specialty Section (Gomchwi)
    badge_specialty: "Yanggu Specialty",
    gomchwi_section_title: "King of Wild Herbs: Premium Yanggu Gomchwi",
    gomchwi_harvest_badge: "Harvest Season: April - May",
    gomchwi_timeline_title: "Gomchwi Seasonal Calendar",
    gomchwi_time1_m: "Early April",
    gomchwi_time1_d: "Sprouting & Harvest Begins",
    gomchwi_time2_m: "Early May",
    gomchwi_time2_d: "Gomchwi Festival & Peak Flavor",
    gomchwi_time3_m: "June - August",
    gomchwi_time3_d: "Pickling Process & Dried Storage",
    gomchwi_tab_story: "The Story",
    gomchwi_tab_benefits: "Health Benefits",
    gomchwi_tab_recipes: "Top Recipes",
    gomchwi_story_h: "Mysterious Herb Raised by Mt. Daeamsan's Pure Wind",
    gomchwi_story_p1: "Gomchwi (bear-parsley) gets its name because bears waking from hibernation eat it first to detoxify and regain energy. Yanggu Gomchwi is grown at the clean foothills of Mt. Daeamsan (above 1,000m altitude), offering a far deeper fragrance than other regions.",
    gomchwi_story_p2: "Cultivated in the cool, temperature-fluctuating soils of Haean-myeon (Punchbowl), its leaves are extremely tender and thin. It features a uniquely pleasant bitter initial taste and a lingering sweet finish.",
    gomchwi_benefits_h: "A Wellness Natural Herb to Awake Body Energy",
    gomchwi_benefit1_title: "Vitamins A & C (Antioxidant, Fatigue Relief)",
    gomchwi_benefit2_title: "Beta-Carotene (Anticancer, Anti-aging)",
    gomchwi_benefit3_title: "Potassium & Fiber (Blood Pressure, Detox)",
    gomchwi_benefits_note: "※ Yanggu Gomchwi also contains plenty of protein and calcium, making it excellent for preventing spring drowsiness and boosting seasonal immunity.",
    gomchwi_recipes_h: "Fragrant Gourmet Bridging Tradition & Trend",
    recipe1_title: "Gomchwi Rice Wrap (Ssam-bap)",
    recipe1_desc: "A signature health food made by wrapping rice and seasoned soybean paste in lightly blanched tender Gomchwi leaves.",
    recipe2_title: "Pickled Gomchwi (Jangajji)",
    recipe2_desc: "A premium side dish pickled in soy sauce syrup, enjoyed year-round for its deep herbal scent that pairs perfectly with BBQ meats.",
    recipe3_title: "Gomchwi Bakery / Dumplings",
    recipe3_desc: "Trendy local treats like Gomchwi salt bread, steamed buns, and dumplings baked with dried bear-parsley powder.",
    quiz_title: "<i class=\"fa-solid fa-utensils\"></i> Find My Gomchwi Gourmet Match",
    quiz_desc: "Choose your preferred dining style below, and we will recommend the perfect Yanggu Gomchwi dish for you!",
    quiz_opt_meat: "Meat Enthusiast",
    quiz_opt_healthy: "Pure Healthy Eater",
    quiz_opt_sweet: "Dessert & Snack Lover",
    quiz_result_badge: "RECOMMENDED MENU",
    quiz_pairing_label: "Best Pairing:",

    // Public Transit (Bus schedule)
    nav_bus: "Bus Timetable",
    badge_bus: "Transit Info",
    bus_title: "Public Bus Timetable",
    bus_desc: "Timetable for intercity buses from major cities to Yanggu, and local rural buses connecting to major attractions.",
    bus_tab_intercity: "Intercity Bus",
    bus_tab_local: "Local Attraction Bus",
    bus_btn_seoul: "East Seoul ↔ Yanggu",
    bus_btn_chuncheon: "Chuncheon ↔ Yanggu",
    bus_dir_seoul_to: "East Seoul → Yanggu",
    bus_dir_to_seoul: "Yanggu → East Seoul",
    bus_fare_adult: "Adult Fare: 17,000 KRW",
    bus_duration_seoul: "Travel Time: ~2 hours (Express)",
    th_no: "No.",
    th_dept: "Departure",
    th_type: "Type",
    td_direct: "Express Direct",
    td_last: "Last Bus (Express)",
    bus_dir_chun_to: "Chuncheon → Yanggu",
    bus_dir_to_chun: "Yanggu → Chuncheon",
    bus_fare_chun: "Adult Fare: 7,400 KRW",
    bus_duration_chun: "Travel Time: ~1 hour",
    td_local_inter: "Local Intercity",
    bus_route_dutayeon: "Yanggu Terminal ↔ Dong-myeon (for Dutayeon)",
    bus_fare_local: "Base Fare: 1,400 KRW (T-Money accepted)",
    bus_note_dutayeon: "※ Drop off at Dong-myeon terminal, then walk to Dutayeon entrance.",
    th_dept_terminal: "From Terminal",
    th_dept_back: "Return Depart",
    bus_route_haean: "Yanggu Terminal ↔ Haean-myeon (for Punchbowl)",
    bus_note_haean: "※ Drops off near Unification Hall & Eulji Observatory box office.",

    // Contact Form
    nav_contact: "Contact Us",
    badge_contact: "Contact Us",
    contact_title: "Inquire About Yanggu Tour",
    contact_desc: "If you have any questions about touring Yanggu, please send an inquiry. We will respond to your email.",
    label_c_name: "Full Name",
    label_c_email: "Your Email Address",
    label_c_subject: "Subject",
    label_c_message: "Message",
    btn_send_email: "Send Inquiry Email"
  }
};

// Current Active Language
let currentLang = 'ko';

// 2. Database of 9 Scenic Views (Yanggu 9경)
const attractionsData = [
  {
    id: 1,
    rank: "제 1 경 / 1st View",
    title: { ko: "양구수목원", en: "Yanggu Eco-Arboretum" },
    tag: { ko: "생태/식물원", en: "Eco/Botanical" },
    category: "nature",
    image: "assets/festival.png",
    fallbackImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
    desc: {
      ko: "대암산 기슭의 자연을 간직한 사계절 생태 학습관과 희귀 야생화들의 안식처.",
      en: "A year-round ecological haven at the foot of Mt. Daeamsan containing rare wild alpine flowers."
    },
    longDesc: {
      ko: "양구수목원은 대암산 해발 450m 자락에 위치하고 있어, 때 묻지 않은 청정 자연림을 호흡할 수 있는 휴식처입니다. 생태식물원, DMZ 야생동물생태관, DMZ 야생화분원 등으로 구성되어 있으며, 초롱꽃, 개느삼 등 멸종위기 희귀식물의 보전지로서도 가치가 큽니다. 사계절 내내 온실 전시관이 열려 어린이 생태 교육과 자연 탐방 힐링 코스로 손색이 없습니다.",
      en: "Located 450m above sea level on Mt. Daeamsan, Yanggu Eco-Arboretum is a serene sanctuary where you can breathe the clean air of pristine forests. It consists of the Eco-Botanical Garden, DMZ Wild Animal Ecology Center, and DMZ Wildflower Center. It plays a critical role in preserving endangered plants indigenous to the Korean DMZ border, offering children and nature hikers a premium educational tour."
    },
    address: { ko: "강원특별자치도 양구군 동면 숨골로 810번길 130", en: "130, Sumgol-ro 810beon-gil, Dong-myeon, Yanggu-gun, Gangwon" },
    traffic: { ko: "양구시외버스터미널에서 농어촌 버스(숨골 방면) 탑승 후 도보 이동", en: "Take rural bus (towards Sumgol) at Yanggu Terminal, then walk to the entrance." },
    phone: "033-480-2520",
    hours: { ko: "09:00 ~ 18:00 (매주 월요일, 신정, 설날/추석 당일 휴관)", en: "09:00 ~ 18:00 (Closed Mondays, New Year, Lunar New Year & Chuseok)" },
    price: { ko: "성인 6,000원 (지역상품권 3,000원 환급)", en: "Adults 6,000 KRW (Get 3,000 KRW back in Yanggu Gift Voucher)" },
    notice: { ko: "수목원 산책로 이용 시 편안한 운동화 착용 권장.", en: "Comfortable hiking/sports shoes recommended for forest boardwalks." }
  },
  {
    id: 2,
    rank: "제 2 경 / 2nd View",
    title: { ko: "한반도섬", en: "Hanbando Island" },
    tag: { ko: "수상 산책", en: "Water Walk" },
    category: "nature",
    image: "assets/hero_bg.png",
    fallbackImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    desc: {
      ko: "파로호 호수 위에 놓인 한반도 모양의 아름다운 인공섬과 나무 데크 산책로.",
      en: "A stunning artificial island shaped like the Korean Peninsula situated in the clean waters of Paroho Lake."
    },
    longDesc: {
      ko: "한반도섬은 파로호 상류의 국내 최대 규모 습지(약 27만㎡) 내에 조성된 한반도 모양의 인공섬입니다. 섬 내부에는 제주도, 백두산, 독도, 한라산 등의 지형적 특징을 재미있게 형상화해 놓았으며, 섬들 사이를 잇는 길고 시원한 목재 데크로가 호수를 가로질러 조성되어 데이트 및 유모차 동반 가족 산책로로 대단히 유명합니다. 가을에는 눈부신 억새길이 장관을 이룹니다.",
      en: "Hanbando Island is a large artificial island shaped like the Korean Peninsula, built in the upper reaches of Paroho Lake. Within the island, you can find miniature models of iconic landmarks like Hallasan Mountain, Dokdo Island, and Baekdusan Mountain. Scenic wooden footbridges connect the islands, creating a pleasant lakeside promenade popular among families, couples, and joggers. In autumn, silver grass gardens decorate the pathways."
    },
    address: { ko: "강원특별자치도 양구군 양구읍 한반도섬길 76", en: "76, Hanbandoseom-gil, Yanggu-eup, Yanggu-gun, Gangwon" },
    traffic: { ko: "양구시외버스터미널에서 택시로 약 7분 소요 (자전거 대여 후 진입 가능)", en: "About 7 minutes by taxi from Yanggu Terminal, or accessible via rented bicycle trails." },
    phone: "033-480-2251",
    hours: { ko: "연중무휴, 상시 개방 (야간 조명 점등)", en: "Open 24/7 all year (LED illuminations at night)" },
    price: { ko: "무료 (수상 레저 스포츠 기구 별도 요금)", en: "Free (Lakeside water leisure rentals charged separately)" },
    notice: { ko: "호수 바람이 차므로 봄/가을 저녁에는 가벼운 외투 지참 권장.", en: "Lakeside winds can be chilly in spring/autumn evenings; light jacket recommended." }
  },
  {
    id: 3,
    rank: "제 3 경 / 3rd View",
    title: { ko: "두타연", en: "Dutayeon Pond" },
    tag: { ko: "DMZ 생태관광", en: "DMZ Nature" },
    category: "dmz-peace",
    image: "assets/dutayeon.png",
    fallbackImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    desc: {
      ko: "50여 년간 민간인 출입이 통제되어 태고의 원시림을 고스란히 간직한 비경지대.",
      en: "A pristine valley ecosystem untouched for 50 years inside the DMZ civilian control line."
    },
    longDesc: {
      ko: "두타연은 민간인출입통제선(민통선) 북방에 위치하고 있어 오랜 시간 천혜의 자연 상태가 고스란히 보존된 신비한 계곡입니다. 10m 높이의 바위 폭포가 쏟아져 내려 차갑고 맑은 깊은 소(沼)를 이룹니다. 천연기념물 열목어의 최대 서식지이기도 합니다. 조각공원, 출렁다리, 생태 탐방로가 이어져 있으며 평화와 전쟁의 아픈 역사를 동시에 품고 있어 교육적 의미가 큽니다.",
      en: "Dutayeon is located north of the Civilian Control Line, representing a mysterious valley whose ecosystem remained pristine due to restricted civilian access since the Korean War. A crystal-clear 10-meter waterfall crashes down into a deep pond, which is a certified habitat for the endangered Lenok (freshwater trout). The site features art sculpture parks, suspension bridges, and DMZ trails reflecting both war memories and natural peace."
    },
    address: { ko: "강원특별자치도 양구군 방산면 두타연로 277", en: "277, Dutayeon-ro, Bangsan-myeon, Yanggu-gun, Gangwon" },
    traffic: { ko: "승용차 또는 시티투어 셔틀버스를 통해 비득고개 등록소 방문 후 군부대 초소 확인 후 진입", en: "Rent a car or use the City Tour bus to visit the Bideuk Ridge checkpoint for military passport check." },
    phone: "033-480-2251 (양구군 안보관광팀)",
    hours: { ko: "09:00 ~ 17:00 (최종 입장 15:00 / 매주 월요일, 명절 당일 휴무)", en: "09:00 ~ 17:00 (Last entry 15:00. Closed Mondays, national holidays)" },
    price: { ko: "성인 6,000원 (현장 지불 및 사전 예약 신청 필수)", en: "Adults 6,000 KRW (Pre-booking & ID checking mandatory)" },
    notice: { ko: "군사통제구역이므로 여권 또는 주민등록증 등 신분증 필참. 사진촬영 통제 준수.", en: "Civilian Control Area. You MUST bring physical ID/passport. Photography of military outposts strictly banned." }
  },
  {
    id: 4,
    rank: "제 4 경 / 4th View",
    title: { ko: "박수근미술관", en: "Park Soo-keun Museum" },
    tag: { ko: "문화/예술", en: "Culture & Art" },
    category: "art-history",
    image: "assets/park_sookeun.png",
    fallbackImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    desc: {
      ko: "한국 근현대 대표 화가 박수근 화백의 생가 터에 지어진 돌빛 예술 미술관.",
      en: "An aesthetic stone-walled museum built on the birthplace of Korea's legendary artist Park Soo-keun."
    },
    longDesc: {
      ko: "가장 한국적이면서도 서민적인 화풍으로 많은 사랑을 받는 서양화가 박수근 화백의 혼을 담은 예술 공간입니다. 생가 터에 들어선 이 미술관은 자연 경관과 조화를 이루는 소박하고 거친 화강암 석벽 구조로 유명하여, 건물 자체도 훌륭한 건축 예술품입니다. 화백의 유작 드로잉과 일기장, 소장 도서뿐 아니라 여러 실력 있는 국내 작가들의 초대전이 매달 개최됩니다.",
      en: "Dedicated to the legendary painter Park Soo-keun, celebrated for his warm, texture-rich oil paintings depicting plain Korean citizens in the mid-20th century. The museum itself is a masterpiece of modern architecture, featuring rough granite stone walls that organically melt into the surrounding green valleys. The collection includes his original sketches, personal diaries, and holds rotating exhibitions of contemporary local artists."
    },
    address: { ko: "강원특별자치도 양구군 양구읍 박수근미술관길 265", en: "265, Parksugeunmisulgwan-gil, Yanggu-eup, Yanggu-gun, Gangwon" },
    traffic: { ko: "양구 터미널에서 택시로 약 5분 소요, 혹은 양구읍내 자전거도로 이용 가능", en: "About 5 minutes by taxi from Yanggu Terminal, or bike paths from downtown Yanggu." },
    phone: "033-480-2655",
    hours: { ko: "09:00 ~ 18:00 (매주 월요일 휴관)", en: "09:00 ~ 18:00 (Closed Mondays)" },
    price: { ko: "성인 6,000원 (양구사랑상품권 3,000원 환급)", en: "Adults 6,000 KRW (Get 3,000 KRW back in Yanggu Gift Voucher)" },
    notice: { ko: "미술관 뒤편 오솔길을 따라 화백의 동상과 조각공원이 위치하니 꼭 산책해보세요.", en: "Don't miss the walking path behind the museum leading to the artist's statue and forest sculpture park." }
  },
  {
    id: 5,
    rank: "제 5 경 / 5th View",
    title: { ko: "양구백자박물관", en: "Porcelain Museum" },
    tag: { ko: "전통 도자기", en: "Traditional Pottery" },
    category: "art-history",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
    desc: {
      ko: "조선 백자의 명맥을 잇는 백자 토의 고장 양구에서 전통과 백자 도예를 감상.",
      en: "Discover white porcelain history and hands-on pottery workshops in the birthplace of Joseon porcelain clay."
    },
    longDesc: {
      ko: "양구군은 고려 시대부터 질 좋은 백자 점토(백토)가 생산되어 조선 왕실 도자기를 굽던 번천관청 백토의 주요 공급원이었습니다. 양구백자박물관은 이러한 깊은 백자 문화를 계승하고 널리 알리기 위해 세워진 곳으로, 조선시대 도요지에서 발굴된 백자 파편부터 현대 명장들의 세련된 백자 예술품까지 관람할 수 있습니다. 개인 및 단체 도자기 빚기 체험관도 운영하고 있습니다.",
      en: "Yanggu has been renowned since the Goryeo Dynasty for high-quality white clay (Baekto), serving as the primary raw clay provider for the Joseon Royal Court kilns. The museum preserves this legacy by exhibiting ancient porcelain shards, restoration furnaces, and contemporary ceramic crafts. Visitors can enroll in hands-on clay throwing and baking workshops."
    },
    address: { ko: "강원특별자치도 양구군 방산면 평화로 5182", en: "5182, Pyeonghwa-ro, Bangsan-myeon, Yanggu-gun, Gangwon" },
    traffic: { ko: "양구 터미널에서 방산행 시내버스 탑승 후 박물관 앞 정류장 하차", en: "Take intercity bus heading to Bangsan at Yanggu Terminal, get off in front of the museum." },
    phone: "033-480-2664",
    hours: { ko: "09:00 ~ 18:00 (매주 월요일 휴관)", en: "09:00 ~ 18:00 (Closed Mondays)" },
    price: { ko: "성인 6,000원 (지역상품권 3,000원 환급)", en: "Adults 6,000 KRW (Get 3,000 KRW back in Yanggu Gift Voucher)" },
    notice: { ko: "물레를 돌려 만드는 도예 체험은 미리 예약을 해두시는 것이 좋습니다.", en: "Pottery throwing sessions require reservation in advance." }
  },
  {
    id: 6,
    rank: "제 6 경 / 6th View",
    title: { ko: "국토정중앙 펀치볼", en: "Punchbowl Basin" },
    tag: { ko: "분지/전망대", en: "Basin/Observatory" },
    category: "dmz-peace",
    image: "assets/punchbowl.png",
    fallbackImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    desc: {
      ko: "화채 그릇 모양의 독특한 해안 분지로, 한국전쟁 격전지의 역사와 둘레길 체험.",
      en: "A unique punchbowl-shaped valley. Hike along the DMZ perimeter trails and witness historic battlefields."
    },
    longDesc: {
      ko: "펀치볼(해안분지)은 해발 400~500m 고지대에 우뚝 솟아 있는 독특한 원형 분지 지형으로, 6.25 전쟁 당시 미군 종군기자가 그 모양이 펀치볼(화채 그릇)을 닮았다 하여 붙인 명칭입니다. 분지 주변을 에워싼 능선에는 을지전망대, 제4땅굴, 통일관 등 역사적인 안보 시설물들이 늘어서 있습니다. 분지 전체를 휘감는 'DMZ 자생 식물원'과 둘레길 코스가 마련되어 있어 등산객들에게 인기가 높습니다.",
      en: "The Punchbowl (Haean Basin) is a geologically unique round crater-like valley surrounded by high mountains. Named by a US war correspondent during the Korean War due to its resemblance to a giant fruit punch bowl. The surrounding mountain ridges contain defense outposts including the Eulji Observatory and the 4th North Korean Tunnel. The pristine trails around the valley offer magnificent mountain trekking opportunities."
    },
    address: { ko: "강원특별자치도 양구군 해안면 해안서로 35-1 (통일관 일대)", en: "35-1, Haeanseo-ro, Haean-myeon, Yanggu-gun, Gangwon" },
    traffic: { ko: "양구 터미널에서 해안행 시외버스를 이용하거나 차량 렌트 후 삼거리 검문소 통과", en: "Take intercity bus to Haean from Yanggu Terminal, or drive via military checkpoint." },
    phone: "033-480-2675 (해안면 통일관)",
    hours: { ko: "09:00 ~ 17:00 (전망대 최종 예약 및 심사는 15:30 마감)", en: "09:00 ~ 17:00 (Observation registration closes at 15:30)" },
    price: { ko: "무료 (전시관 및 터널 입장료 별도)", en: "Free entry to basin (Eulji Observatory & 4th Tunnel require tickets)" },
    notice: { ko: "고지대이므로 기온 변화가 급격하고 겨울철 폭설 시 차량 통행이 통제될 수 있습니다.", en: "As a high altitude valley, weather changes quickly; winter snows may close pass roads." }
  },
  {
    id: 7,
    rank: "제 7 경 / 7th View",
    title: { ko: "양구 봉화산", en: "Bonghwasan Mountain" },
    tag: { ko: "하이킹/일출", en: "Hiking/Sunrise" },
    category: "nature",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    desc: {
      ko: "해발 874m 산봉우리에서 마주하는 소양호 풍경과 멋진 운해, 일출 등정 명소.",
      en: "At 874m, it offers breathtaking views of Lake Soyangho and is a famous peak for sunrise hikes and mist seas."
    },
    longDesc: {
      ko: "봉화산은 해발 874m의 높지 않으면서도 수려한 산세를 자랑하는 양구의 진산입니다. 산 정상에 올라서면 양구 읍내가 한눈에 보이고 남동쪽으로는 광활한 소양호 물길과 인근 산봉우리들이 파도치듯 늘어선 경관이 일품입니다. 특히 이른 아침 운해 사이로 비쳐 드는 붉은 일출은 백만 불짜리 풍경으로 통하여 전국의 사진작가들이 해마다 모여듭니다.",
      en: "Standing at 874m tall, Mt. Bonghwasan is the focal guardian peak of Yanggu. Hikers reaching the summit are rewarded with an unobstructed view of the Yanggu town basin, and to the southeast, the winding blue fingers of Lake Soyangho. Early morning treks reveal a magnificent, fiery sunrise reflecting over floating blankets of white clouds, attracting professional landscape photographers year-round."
    },
    address: { ko: "강원특별자치도 양구군 국토정중앙면 구암리 일대", en: "Guam-ri, Guktojeongjungang-myeon, Yanggu-gun, Gangwon" },
    traffic: { ko: "양구 터미널에서 택시로 들머리(석현사 혹은 국토정중앙천문대) 이동 후 등반", en: "Take taxi to the trailhead (Seokhyunsa Temple or Astronomical Observatory) and start hike." },
    phone: "033-480-2251",
    hours: { ko: "일출 전 등반 가능 (안전 렌턴 지참 필)", en: "Accessible at all times (Flashlight mandatory for night/dawn hiking)" },
    price: { ko: "무료", en: "Free" },
    notice: { ko: "겨울철 빙판길 안전 장비(아이젠) 미소지 시 등산 자제.", en: "Crampons/microspikes highly recommended for icy winter mountain pathways." }
  },
  {
    id: 8,
    rank: "제 8 경 / 8th View",
    title: { ko: "상무룡출렁다리", en: "Sangmuryong Bridge" },
    tag: { ko: "출렁다리", en: "Suspension Bridge" },
    category: "nature",
    image: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=800&q=80",
    desc: {
      ko: "파로호 물결 위를 시원하게 가로지르며 걷는 길이 340m의 아찔한 보행 현수교.",
      en: "A thrilling 340m-long pedestrian bridge crossing over the scenic ripples of Paroho Lake."
    },
    longDesc: {
      ko: "파로호 상류의 상무룡리와 월명리를 연결하는 보행 전용 교량으로, 2022년에 개통된 양구의 따끈따끈한 랜드마크입니다. 총 연장 340m의 국내 최고 수준의 출렁다리로, 발밑으로 유유히 흐르는 에메랄드빛 파로호 강물이 그대로 들여다보여 스릴이 넘칩니다. 다리를 건너며 사방으로 넓게 펼쳐지는 울창한 호반림과 기암괴석 산자락은 가슴 속까지 뻥 뚫리는 해방감을 선사합니다.",
      en: "A newly opened landmark in 2022, this pedestrian suspension bridge connects Sangmuryong-ri and Wolmyeong-ri across the upper flows of Paroho Lake. Stretching 340 meters long, it offers a thrilling walk directly over the deep emerald green waters. The 360-degree panoramic view of dense lakeside forests and rugged cliff ridges provides an refreshing feeling of relaxation."
    },
    address: { ko: "강원특별자치도 양구군 양구읍 상무룡리 산19-1", en: "San 19-1, Sangmuryong-ri, Yanggu-eup, Yanggu-gun, Gangwon" },
    traffic: { ko: "양구읍에서 평화로를 따라 북상 후 상무룡리 진입로 차량 이용 진입", en: "Drive north along Pyeonghwa-ro from downtown Yanggu and follow the signs to Sangmuryong entrance." },
    phone: "033-480-2251",
    hours: { ko: "09:00 ~ 18:00 (강풍, 강우, 결빙 시 안전상의 이유로 통행이 차단됩니다)", en: "09:00 ~ 18:00 (May be closed during heavy rain, high winds, or icy conditions)" },
    price: { ko: "무료", en: "Free" },
    notice: { ko: "다리 위에서 뛰거나 난간을 심하게 흔들지 않도록 주의바랍니다.", en: "Please refrain from running or shaking the handrails on the bridge for safety." }
  },
  {
    id: 9,
    rank: "제 9 경 / 9th View",
    title: { ko: "광치계곡", en: "Gwangchi Valley" },
    tag: { ko: "계곡/휴양림", en: "Valley/Resort" },
    category: "nature",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80",
    desc: {
      ko: "대암산 줄기를 타고 내리는 시원한 폭포수와 자연휴양림 숲속 힐링 치유길.",
      en: "Cool refreshing water streams originating from Mt. Daeamsan, featuring forest therapy trails."
    },
    longDesc: {
      ko: "대암산 줄기 웅장한 골짜기를 따라 형성된 광치계곡은 한여름에도 한기가 느껴질 만큼 수온이 낮고 계곡 그늘이 짙은 피서 명지입니다. 맑은 계곡수가 기암괴석을 가르고 시원하게 쏟아져 내립니다. 바로 옆에는 양구군이 운영하는 '광치자연휴양림'이 있어 통나무집 펜션, 캠핑 야영장, 대암산 생태 등산로인 옹녀폭포 코스로 가볍게 숲길 트레킹을 떠나기 최적의 거점입니다.",
      en: "Formed along the deep ravines of Mt. Daeamsan, Gwangchi Valley boasts icy cold, clean mountain streams shaded by ancient maple and oak trees. Waterfalls cascade over giant grey boulders. Adjacent sits the municipal Gwangchi National Recreation Forest, equipped with wooden cabins, camp platforms, and trails leading to the legendary Ongnyeo Waterfall."
    },
    address: { ko: "강원특별자치도 양구군 국토정중앙면 광치령로 1794번길", en: "Gwangchiryeong-ro 1794beon-gil, Guktojeongjungang-myeon, Yanggu-gun, Gangwon" },
    traffic: { ko: "동서울 또는 양구 터미널에서 인제 방면 국도 버스 이용 후 광치령 입구 하차", en: "Take intercity bus heading to Inje from East Seoul or Yanggu, drop off at Gwangchiryeong Valley entrance." },
    phone: "033-480-2527 (자연휴양림 관리소)",
    hours: { ko: "휴양림 입장: 09:00 ~ 18:00 (숙박 이용객은 연중 24시간)", en: "Recreation Forest check-in: 09:00 ~ 18:00 (24 hours for lodging guests)" },
    price: { ko: "입장료 무료 (자연휴양림 숙박 및 야영 데크 요금 별도)", en: "Free entry (Cabin rentals and camping platforms charged separately)" },
    notice: { ko: "산불 조심 기간(봄/가을 일부)에는 계곡 일부 등산로가 통제됩니다.", en: "Some hiking trails are closed during fire warning seasons in spring/autumn." }
  }
];

// 3. Document Load Initializations
document.addEventListener('DOMContentLoaded', () => {
  // Initialize dynamic translation language
  const savedLang = localStorage.getItem('ygtour_lang') || 'ko';
  setLanguage(savedLang);

  // Initialize booking date constraints (today as minimum)
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Active Map Node hover animations and default selection
  const pins = document.querySelectorAll('.map-pin');
  pins.forEach(pin => {
    pin.addEventListener('mouseenter', () => {
      pin.querySelector('.pin-tooltip').style.visibility = 'visible';
      pin.querySelector('.pin-tooltip').style.opacity = '1';
    });
    pin.addEventListener('mouseleave', () => {
      pin.querySelector('.pin-tooltip').style.visibility = 'hidden';
      pin.querySelector('.pin-tooltip').style.opacity = '0';
    });
  });

  // Setup Attraction cards filter logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      filterAttractions(filterValue);
    });
  });

  // Search trigger buttons
  const searchInput = document.getElementById('attraction-search');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }

  // FAQ Accordion click handlers
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Mobile menu button togglers
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileOverlay = document.getElementById('mobile-overlay');
  
  if (menuToggle && mobileOverlay) {
    menuToggle.addEventListener('click', () => {
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop scroll
    });
  }
  
  if (menuClose && mobileOverlay) {
    menuClose.addEventListener('click', () => {
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = 'auto'; // Resume scroll
    });
  }

  // Carousel slider arrow keys
  const prevArrow = document.getElementById('slider-prev');
  const nextArrow = document.getElementById('slider-next');
  if (prevArrow && nextArrow) {
    prevArrow.addEventListener('click', () => scrollSlider(-1));
    nextArrow.addEventListener('click', () => scrollSlider(1));
  }
});

// Toggle Mobile Menu Open/Close
function toggleMobileMenu() {
  const mobileOverlay = document.getElementById('mobile-overlay');
  if (mobileOverlay) {
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// 4. Translation System Engine
function setLanguage(lang) {
  currentLang = lang;
  
  // HTML lang attribute
  document.documentElement.lang = lang;
  
  // Run replacement engine
  document.querySelectorAll('[data-translate-key]').forEach(el => {
    const key = el.getAttribute('data-translate-key');
    if (translations[lang] && translations[lang][key] !== undefined) {
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        el.setAttribute('placeholder', translations[lang][key]);
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });

  // Toggle active styling on language buttons
  document.querySelectorAll('.language-selector .lang-btn, .mobile-lang-selector .lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Desktop highlight
  const deskBtn = document.getElementById(`lang-${lang}`);
  if (deskBtn) deskBtn.classList.add('active');
  
  // Mobile highlight
  const mobBtn = document.getElementById(`mobile-lang-${lang}`);
  if (mobBtn) mobBtn.classList.add('active');

  // Sync placeholders & values in dynamic panels
  updateActiveDetailLanguage();
  updateGomchwiQuizResultDisplay();
  
  localStorage.setItem('ygtour_lang', lang);
}

// Refresh dynamic texts in modals and panels after language switches
function updateActiveDetailLanguage() {
  const mapContentPanel = document.getElementById('map-real-content');
  if (mapContentPanel && !mapContentPanel.classList.contains('hidden')) {
    const activeIdStr = mapContentPanel.getAttribute('data-active-id');
    if (activeIdStr) {
      selectMapPin(parseInt(activeIdStr));
    }
  }

  // Refresh Detail Modal if active
  const modal = document.getElementById('detail-modal');
  if (modal && modal.classList.contains('active')) {
    const activeModalIdStr = modal.getAttribute('data-active-id');
    if (activeModalIdStr) {
      openDetailModal(parseInt(activeModalIdStr));
    }
  }
}

// 5. Grid Filter System
function filterAttractions(category) {
  const cards = document.querySelectorAll('.attraction-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
    }
  });
}

// 6. Search Bar System
function fillSearch(tagText) {
  const searchInput = document.getElementById('attraction-search');
  if (searchInput) {
    searchInput.value = tagText;
    performSearch();
  }
}

function performSearch() {
  const searchVal = document.getElementById('attraction-search').value.trim().toLowerCase();
  if (!searchVal) {
    filterAttractions('all');
    // Reset filters active
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    return;
  }

  // Filter attraction list by text match
  const cards = document.querySelectorAll('.attraction-card');
  let matchCount = 0;
  
  cards.forEach(card => {
    const id = parseInt(card.getAttribute('data-id'));
    const item = attractionsData.find(a => a.id === id);
    if (item) {
      const matchTitleKo = item.title.ko.toLowerCase().includes(searchVal);
      const matchTitleEn = item.title.en.toLowerCase().includes(searchVal);
      const matchDescKo = item.desc.ko.toLowerCase().includes(searchVal);
      const matchDescEn = item.desc.en.toLowerCase().includes(searchVal);
      const matchTagKo = item.tag.ko.toLowerCase().includes(searchVal);
      const matchTagEn = item.tag.en.toLowerCase().includes(searchVal);

      if (matchTitleKo || matchTitleEn || matchDescKo || matchDescEn || matchTagKo || matchTagEn) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        matchCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    }
  });

  // Scroll to search outcomes
  document.getElementById('attractions').scrollIntoView({ behavior: 'smooth' });
}

// 7. Scenic Views Grid Carousel Slider (Prev/Next scrolls grid container)
function scrollSlider(direction) {
  const container = document.getElementById('attractions-container');
  if (container) {
    // Width of one card + gap (calculated based on layout widths)
    const cardWidth = container.querySelector('.attraction-card').offsetWidth;
    const scrollAmount = (cardWidth + 30) * direction; // 30 is grid-gap
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
}

// 8. Map Pin Interactions (Vector map triggers side panel details)
function selectMapPin(id) {
  const item = attractionsData.find(a => a.id === id);
  if (!item) return;

  const placeholder = document.getElementById('map-placeholder');
  const realContent = document.getElementById('map-real-content');
  
  if (placeholder) placeholder.classList.add('hidden');
  if (realContent) {
    realContent.classList.remove('hidden');
    // Set attribute to remember active selection for lang toggles
    realContent.setAttribute('data-active-id', id);
  }

  // Populate data fields
  const imgElement = document.getElementById('info-panel-img');
  imgElement.src = item.image;
  imgElement.onerror = () => { imgElement.src = item.fallbackImage; };
  
  document.getElementById('info-panel-category').innerText = item.category.toUpperCase();
  document.getElementById('info-panel-title').innerText = item.title[currentLang];
  document.getElementById('info-panel-desc').innerText = item.desc[currentLang];
  document.getElementById('info-panel-hours').innerText = item.hours[currentLang];
  document.getElementById('info-panel-price').innerText = item.price[currentLang];
  document.getElementById('info-panel-notice').innerText = item.notice[currentLang];

  // Configure modal button linkage
  const detailsBtn = document.getElementById('detail-modal-launcher');
  if (detailsBtn) {
    detailsBtn.onclick = () => openDetailModal(id);
  }
}

// 9. Detailed Attraction Modal Handlers
function openDetailModal(id) {
  const item = attractionsData.find(a => a.id === id);
  if (!item) return;

  const modal = document.getElementById('detail-modal');
  if (!modal) return;

  modal.setAttribute('data-active-id', id);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop background scroll

  // Set modal details
  const modalImg = document.getElementById('modal-img');
  modalImg.src = item.image;
  modalImg.onerror = () => { modalImg.src = item.fallbackImage; };

  document.getElementById('modal-category').innerText = item.category.toUpperCase();
  document.getElementById('modal-title').innerText = item.title[currentLang];
  document.getElementById('modal-rank-badge').innerText = currentLang === 'ko' ? `제 ${item.id} 경` : `${item.rank.split('/')[1]}`;
  document.getElementById('modal-tag-badge').innerText = item.tag[currentLang];
  document.getElementById('modal-long-desc').innerText = item.longDesc[currentLang];
  document.getElementById('modal-address').innerText = item.address[currentLang];
  document.getElementById('modal-traffic').innerText = item.traffic[currentLang];
  document.getElementById('modal-phone').innerText = item.phone;
}

function closeDetailModal() {
  const modal = document.getElementById('detail-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.removeAttribute('data-active-id');
    document.body.style.overflow = 'auto'; // Restore scroll
  }
}

// Close Modal when clicking outside the box
window.addEventListener('click', (e) => {
  const modal = document.getElementById('detail-modal');
  if (e.target === modal) {
    closeDetailModal();
  }
});

// 10. Tour Booking Simulation Logic
function switchBookingTab(type) {
  const dbBtn = document.getElementById('tab-dmz-btn');
  const ctBtn = document.getElementById('tab-city-btn');
  const dmzGroup = document.getElementById('dmz-destination-group');
  const cityGroup = document.getElementById('city-course-group');
  const securityGroup = document.getElementById('security-checkbox-group');
  const bookingTypeField = document.getElementById('booking-type');

  if (type === 'dmz') {
    dbBtn.classList.add('active');
    ctBtn.classList.remove('active');
    dmzGroup.classList.remove('hidden');
    cityGroup.classList.add('hidden');
    securityGroup.classList.remove('hidden');
    bookingTypeField.value = 'dmz';
    
    // Add required attributes
    document.getElementById('dmz-destination').setAttribute('required', 'true');
    document.getElementById('city-course').removeAttribute('required');
    document.getElementById('security-agree').setAttribute('required', 'true');
  } else {
    ctBtn.classList.add('active');
    dbBtn.classList.remove('active');
    cityGroup.classList.remove('hidden');
    dmzGroup.classList.add('hidden');
    securityGroup.classList.add('hidden');
    bookingTypeField.value = 'city';
    
    // Adjust requirements
    document.getElementById('city-course').setAttribute('required', 'true');
    document.getElementById('dmz-destination').removeAttribute('required');
    document.getElementById('security-agree').removeAttribute('required');
  }
}

function handleBookingSubmit(event) {
  event.preventDefault();

  const type = document.getElementById('booking-type').value;
  const dateVal = document.getElementById('booking-date').value;
  const visitorsVal = document.getElementById('booking-visitors').value;
  const nameVal = document.getElementById('visitor-name').value.trim();
  const phoneVal = document.getElementById('visitor-phone').value.trim();
  const emailVal = document.getElementById('visitor-email').value.trim();
  const guideLangVal = document.getElementById('guide-lang').value;
  const securityAgree = document.getElementById('security-agree').checked;

  // Validate date is entered and is not in the past
  if (!dateVal) {
    alert(currentLang === 'ko' ? "날짜를 입력해주세요." : "Please select a tour date.");
    return;
  }

  // Generate Booking Reference YG-[YYYYMMDD]-[RANDOM]
  const todayDateString = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const randCode = Math.floor(1000 + Math.random() * 9000);
  const bookingCode = `YG-${todayDateString}-${randCode}`;

  // Establish ticket strings
  let selectedCourse = '';
  let ticketType = '';

  if (type === 'dmz') {
    if (!securityAgree) {
      alert(currentLang === 'ko' ? "군사구역 보안서약서에 동의하셔야만 예약이 진행됩니다." : "You must agree to the DMZ security codes to proceed.");
      return;
    }
    const dmzDest = document.getElementById('dmz-destination').value;
    selectedCourse = dmzDest;
    ticketType = currentLang === 'ko' ? "DMZ 안보관광 (DMZ Pass)" : "DMZ SECURITY TOUR";
  } else {
    const cityDest = document.getElementById('city-course').value;
    if (cityDest === '청춘문화') {
      selectedCourse = currentLang === 'ko' ? "청춘문화 예술 코스" : "Youth Culture Art Course";
    } else if (cityDest === '생태힐링') {
      selectedCourse = currentLang === 'ko' ? "생태 힐링 가득 코스" : "Healing Ecology Course";
    } else {
      selectedCourse = currentLang === 'ko' ? "국토정중앙 별빛 코스" : "Korea Center Starry Night";
    }
    ticketType = currentLang === 'ko' ? "명품 시티투어 (City Pass)" : "YANGGU CITY TOUR";
  }

  // Translate Interpreter options
  let selectedInterpreter = '';
  switch (guideLangVal) {
    case 'en': selectedInterpreter = 'ENGLISH'; break;
    case 'zh': selectedInterpreter = 'CHINESE'; break;
    case 'ja': selectedInterpreter = 'JAPANESE'; break;
    default: selectedInterpreter = currentLang === 'ko' ? '기본 (한국어)' : 'NONE (KOREAN)';
  }

  // Populate Boarding Ticket Elements
  document.getElementById('ticket-pass-title').innerText = type === 'dmz' ? "DMZ BORDER TOUR PASS" : "YANGGU CITY TOUR PASS";
  document.getElementById('ticket-course').innerText = selectedCourse;
  document.getElementById('ticket-type').innerText = ticketType;
  document.getElementById('ticket-date').innerText = dateVal.replace(/-/g, '.');
  document.getElementById('ticket-qty').innerText = currentLang === 'ko' ? `${visitorsVal} 명 (Persons)` : `${visitorsVal} Persons`;
  document.getElementById('ticket-holder').innerText = nameVal.toUpperCase();
  document.getElementById('ticket-lang').innerText = selectedInterpreter;
  document.getElementById('ticket-num').innerText = bookingCode;

  // Ticket Status Message Sync
  const statusBadge = document.getElementById('ticket-status');
  if (type === 'dmz') {
    statusBadge.innerText = currentLang === 'ko' ? "승인 완료 - 군사 검문 보안심사 대기" : "APPROVED - PENDING BORDER FORCE REVIEW";
    statusBadge.style.backgroundColor = '#fef2f2';
    statusBadge.style.color = '#ef4444';
    statusBadge.style.borderColor = 'rgba(239, 68, 68, 0.2)';
  } else {
    statusBadge.innerText = currentLang === 'ko' ? "발권 완료 - 탑승 대기" : "CONFIRMED - READY TO BOARD";
    statusBadge.style.backgroundColor = '#ecfdf5';
    statusBadge.style.color = '#10b981';
    statusBadge.style.borderColor = 'rgba(16, 185, 129, 0.2)';
  }

  // Render transition: hide instruction, display ticket
  const ticketPlaceholder = document.getElementById('ticket-placeholder');
  const realTicket = document.getElementById('real-ticket');
  
  if (ticketPlaceholder) ticketPlaceholder.classList.add('hidden');
  if (realTicket) realTicket.classList.remove('hidden');

  // Trigger alert notify
  const confirmMsg = currentLang === 'ko' 
    ? `예약이 완료되었습니다!\n예약 코드: ${bookingCode}\n우측에서 탑승 티켓(Pass)을 확인하세요.` 
    : `Reservation successful!\nPass ID: ${bookingCode}\nCheck your boarding ticket on the right panel.`;
  alert(confirmMsg);
}

// Print ticket handler
function printTicket() {
  const name = document.getElementById('ticket-holder').innerText;
  const num = document.getElementById('ticket-num').innerText;
  const course = document.getElementById('ticket-course').innerText;
  const date = document.getElementById('ticket-date').innerText;

  const printMsg = currentLang === 'ko'
    ? `--------------------------------------\n    양구 문화관광 모바일 탑승권\n--------------------------------------\n예약코드: ${num}\n탑승자명: ${name}\n관광코스: ${course}\n출발일자: ${date}\n--------------------------------------\n이 화면이나 인쇄된 종이 티켓을 현장 등록처에 제출하세요.`
    : `--------------------------------------\n   YANGGU TOURISM BOARDING PASS\n--------------------------------------\nPass ID: ${num}\nPassenger: ${name}\nCourse: ${course}\nTour Date: ${date}\n--------------------------------------\nPresent this voucher/printout at the departure desk.`;
  
  alert(printMsg);
}

// ==========================================================================
// Gomchwi Interactive Showcase Section (Tabs & Gourmet Quiz)
// ==========================================================================

let currentGomchwiPreference = null;

const gomchwiQuizData = {
  meat: {
    title: {
      ko: "곰취 삼겹살 쌈 & 곰취 장아찌",
      en: "Gomchwi Pork Belly Ssam & Pickles"
    },
    desc: {
      ko: "쌉싸래한 곰취 잎이 노릇하게 구워진 삼겹살의 느끼한 맛을 깔끔하게 잡아주고 특유의 솔향을 한입 가득 퍼지게 합니다. 새콤달콤한 곰취 장아찌를 고기에 싸 먹는 것도 최고의 별미입니다.",
      en: "The bitter-sweet herbal leaves perfectly balance the grease of grilled pork belly, exploding with fresh pine aromas. Wrapping the grilled meat in pickled Gomchwi is a legendary culinary pairing."
    },
    pairing: {
      ko: "시원한 양구 곰취 생막걸리",
      en: "Chilled Yanggu Gomchwi Rice Wine (Makgeolli)"
    }
  },
  healthy: {
    title: {
      ko: "곰취 강된장 쌈밥 & 곰취 나물밥",
      en: "Gomchwi Soybean Paste Ssam-bap & Seasoned Rice"
    },
    desc: {
      ko: "살짝 데친 부드러운 곰취 잎에 짭조름하고 구수한 강된장과 보리밥을 곁들인 쌈밥, 그리고 참기름에 고소하게 볶아 갓 지은 나물밥은 맛과 영양이 풍부한 웰빙 건강식입니다.",
      en: "A healthy classic wrapping barley rice and savory, thick soybean paste inside blanched soft Gomchwi leaves. The seasoned rice mixed with toasted sesame oil is a nutrient-rich, clean-eating delicacy."
    },
    pairing: {
      ko: "구수한 대암산 둥굴레차",
      en: "Warm Mt. Daeamsan Solomon's Seal Tea"
    }
  },
  sweet: {
    title: {
      ko: "양구 곰취 소금빵 & 곰취 찐빵",
      en: "Yanggu Gomchwi Salt Bread & Steamed Buns"
    },
    desc: {
      ko: "말린 양구 곰취 분말을 반죽에 믹스하여 구워낸 이색 소금빵과 단팥 소가 들어간 초록빛 찐빵입니다. 은은한 향과 고소한 버터의 맛이 어우러져 젊은 세대와 빵 매니아들에게 큰 인기를 끌고 있습니다.",
      en: "A trendy local bakery item blending dried Gomchwi powder directly into salt bread dough, and green-colored steamed buns stuffed with sweet red bean paste. The subtle herbal aroma matches beautifully with buttery pastries."
    },
    pairing: {
      ko: "아이스 곰취 라떼 또는 아메리카노",
      en: "Iced Gomchwi Latte or Cold Brew Coffee"
    }
  }
};

function switchGomchwiTab(tabName) {
  // Toggle active styling on buttons
  document.querySelectorAll('.spec-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`spec-tab-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Toggle visible content pane
  document.querySelectorAll('.spec-tab-content').forEach(pane => {
    pane.classList.add('hidden');
  });
  const activePane = document.getElementById(`spec-content-${tabName}`);
  if (activePane) activePane.classList.remove('hidden');
}

function recommendGomchwiFood(preference) {
  currentGomchwiPreference = preference;
  
  // Highlight active button
  document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`quiz-opt-${preference}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  const resultCard = document.getElementById('gomchwi-quiz-result');
  if (resultCard) {
    resultCard.classList.remove('hidden');
    resultCard.style.opacity = '0';
    resultCard.style.transform = 'translateY(10px)';
    
    // Quick fade in animation trigger
    setTimeout(() => {
      resultCard.style.transition = 'all 0.4s ease';
      resultCard.style.opacity = '1';
      resultCard.style.transform = 'translateY(0)';
    }, 50);
  }

  updateGomchwiQuizResultDisplay();
}

function updateGomchwiQuizResultDisplay() {
  if (!currentGomchwiPreference) return;
  
  const data = gomchwiQuizData[currentGomchwiPreference];
  if (!data) return;

  const titleEl = document.getElementById('quiz-result-title');
  const descEl = document.getElementById('quiz-result-desc');
  const pairingEl = document.getElementById('quiz-result-pairing');

  if (titleEl) titleEl.innerText = data.title[currentLang];
  if (descEl) descEl.innerText = data.desc[currentLang];
  if (pairingEl) pairingEl.innerText = data.pairing[currentLang];
}

// ==========================================================================
// Bus Timetable Interactive Section (Tabs & Route Filter)
// ==========================================================================

function switchBusTab(tabName) {
  // Toggle tab button active styles
  document.querySelectorAll('.bus-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`bus-tab-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Toggle tab contents
  document.querySelectorAll('#bus-schedule .bus-tab-content').forEach(pane => {
    pane.classList.add('hidden');
  });
  const activePane = document.getElementById(`bus-content-${tabName}`);
  if (activePane) activePane.classList.remove('hidden');
}

function filterIntercity(city) {
  // Toggle filter buttons active styles
  document.querySelectorAll('.bus-filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`btn-bus-${city}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Toggle grids
  const seoulGrid = document.getElementById('bus-seoul-grid');
  const chuncheonGrid = document.getElementById('bus-chuncheon-grid');
  
  if (city === 'seoul') {
    if (seoulGrid) seoulGrid.classList.remove('hidden');
    if (chuncheonGrid) chuncheonGrid.classList.add('hidden');
  } else {
    if (seoulGrid) seoulGrid.classList.add('hidden');
    if (chuncheonGrid) chuncheonGrid.classList.remove('hidden');
  }
}

// ==========================================================================
// EmailJS Contact Form Integration
// ==========================================================================

function sendContactEmail(event) {
  event.preventDefault();

  const nameVal = document.getElementById('contact-name').value.trim();
  const emailVal = document.getElementById('contact-email').value.trim();
  const subjectVal = document.getElementById('contact-subject').value.trim();
  const messageVal = document.getElementById('contact-message').value.trim();

  // Validate values
  if (!nameVal || !emailVal || !subjectVal || !messageVal) {
    alert(currentLang === 'ko' ? "모든 필수 필드를 입력해주세요." : "Please fill in all required fields.");
    return;
  }

  // Spinner toggles
  const submitBtn = document.getElementById('contact-submit-btn');
  const btnText = document.getElementById('submit-btn-text');
  const btnSpinner = document.getElementById('submit-btn-spinner');

  if (submitBtn) submitBtn.disabled = true;
  if (btnText) btnText.classList.add('hidden');
  if (btnSpinner) btnSpinner.classList.remove('hidden');

  // Prepare parameters matching EmailJS template keys
  const templateParams = {
    title: subjectVal,
    name: nameVal,
    email: emailVal,
    time: new Date().toLocaleString(currentLang === 'ko' ? 'ko-KR' : 'en-US'),
    message: messageVal
  };

  // Send via EmailJS
  emailjs.send('service_7xb8mcs', 'template_uy8lh3g', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       alert(currentLang === 'ko' 
         ? "성공적으로 문의 이메일을 보냈습니다. 기재하신 메일로 빠른 시일 내에 연락해 드리겠습니다." 
         : "Your inquiry has been sent successfully. We will reply to your email as soon as possible.");
       
       // Reset form
       document.getElementById('contact-form').reset();
    }, function(error) {
       console.log('FAILED...', error);
       alert(currentLang === 'ko' 
         ? "이메일 전송에 실패하였습니다. 다시 시도해 주세요. 에러: " + JSON.stringify(error)
         : "Failed to send email. Please try again. Error: " + JSON.stringify(error));
    })
    .finally(function() {
       // Restore spinner toggles
       if (submitBtn) submitBtn.disabled = false;
       if (btnText) btnText.classList.remove('hidden');
       if (btnSpinner) btnSpinner.classList.add('hidden');
    });
}
