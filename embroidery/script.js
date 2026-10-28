// ===== 십자수 도안 (16x16, 글자 하나 = 한 땀) =====
const COLORS = {
  r: "#c0504d", p: "#e78fa0", y: "#e9b949", g: "#5b8a3c", l: "#8fbf5a",
  b: "#8b6a4a", o: "#e07b39", w: "#ffffff", k: "#3b3127", u: "#6f9fd8"
};

const PATTERNS = {
  flower: [
    "................",
    "......pp........",
    ".....pyyp..pp...",
    "......pp..pyyp..",
    ".......g...pp...",
    "...rr..g....g...",
    "..ryyr.g...g....",
    "...rr..g..g.....",
    "....g..g.g......",
    ".....g.gg.......",
    "......gg........",
    "....l.g.l.......",
    ".....lgl........",
    "......g.........",
    "......g.........",
    "................"
  ],
  carrot: [
    "................",
    ".......g.g......",
    "......g.g.g.....",
    ".......ggg......",
    "......oooo......",
    "......oooo......",
    ".......ooo......",
    ".......oo.......",
    ".......oo.......",
    ".......oo.......",
    "........o.......",
    "........o.......",
    "................",
    "................",
    "................",
    "................"
  ],
  tomato: [
    "................",
    "................",
    ".......g........",
    ".....ggggg......",
    "....rrrgrrr.....",
    "...rrrrrrrrr....",
    "...rrwrrrrrr....",
    "...rrwrrrrrr....",
    "...rrrrrrrrr....",
    "...rrrrrrrrr....",
    "....rrrrrrr.....",
    ".....rrrrr......",
    "................",
    "................",
    "................",
    "................"
  ],
  bee: [
    "................",
    "................",
    "......uu.uu.....",
    ".....uuuuuuu....",
    "......uu.uu.....",
    "....yykyykyy....",
    "...kyykyykyyk...",
    "...yyykyykyyy...",
    "...kyykyykyyk...",
    "....yykyykyy....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................"
  ],
  sprout: [
    "................",
    "................",
    "................",
    "...ll......ll...",
    "..lllll..lllll..",
    "...llllggllll...",
    ".....lllglll....",
    ".......gg.......",
    ".......g........",
    ".......g........",
    "...bbbbbbbbbb...",
    "..bbbbbbbbbbbb..",
    "..bbbbbbbbbbbb..",
    "................",
    "................",
    "................"
  ],
  heart: [
    "................",
    "................",
    "...rr....rr.....",
    "..rppr..rppr....",
    ".rpppprrpppr....",
    ".rpppppppppr....",
    ".rpppppppppr....",
    "..rpppppppr.....",
    "...rpppppr......",
    "....rpppr.......",
    ".....rpr........",
    "......r.........",
    "................",
    "................",
    "................",
    "................"
  ]
};

// 도안을 십자(X) 모양 땀으로 그리기
function drawStitches(svg, pattern) {
  const ns = "http://www.w3.org/2000/svg";
  svg.innerHTML = "";
  pattern.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (!COLORS[ch]) return;
      const g = document.createElementNS(ns, "g");
      g.setAttribute("stroke", COLORS[ch]);
      g.setAttribute("stroke-width", "0.28");
      g.setAttribute("stroke-linecap", "round");
      [[x + .15, y + .15, x + .85, y + .85], [x + .85, y + .15, x + .15, y + .85]].forEach(c => {
        const line = document.createElementNS(ns, "line");
        line.setAttribute("x1", c[0]); line.setAttribute("y1", c[1]);
        line.setAttribute("x2", c[2]); line.setAttribute("y2", c[3]);
        g.appendChild(line);
      });
      svg.appendChild(g);
    });
  });
}

// 첫 화면: 한 땀씩 수놓아지는 애니메이션
function animateHero() {
  const svg = document.getElementById("heroStitch");
  const keys = Object.keys(PATTERNS);
  let idx = 0;
  function play() {
    const pattern = PATTERNS[keys[idx % keys.length]];
    const blank = pattern.map(r => ".".repeat(r.length));
    const cells = [];
    pattern.forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== ".") cells.push([x, y]); }));
    let i = 0;
    const timer = setInterval(() => {
      for (let n = 0; n < 2 && i < cells.length; n++, i++) {
        const [x, y] = cells[i];
        blank[y] = blank[y].substring(0, x) + pattern[y][x] + blank[y].substring(x + 1);
      }
      drawStitches(svg, blank);
      if (i >= cells.length) {
        clearInterval(timer);
        idx++;
        setTimeout(play, 2500);
      }
    }, 40);
  }
  play();
}

// ===== 자수 갤러리 =====
const WORKS = [
  { title: "들꽃 한 다발", type: "꽃", pattern: "flower", desc: "봄날 밭둑에 핀 들꽃을 옮겨 놓았습니다. 사틴 스티치와 프렌치 노트." },
  { title: "첫 당근", type: "채소", pattern: "carrot", desc: "처음 수확한 못생긴 당근이 너무 귀여워서." },
  { title: "여름 토마토", type: "채소", pattern: "tomato", desc: "빨갛게 익은 방울토마토. 반짝임은 흰 실 두 땀." },
  { title: "꿀벌 손님", type: "생물", pattern: "bee", desc: "호박꽃에 날아온 꿀벌을 십자수로." },
  { title: "새싹", type: "채소", pattern: "sprout", desc: "흙을 뚫고 올라온 떡잎. 모든 시작은 작습니다." },
  { title: "마음", type: "생물", pattern: "heart", desc: "방문해 주신 분들께 드리는 작은 하트." }
];

let currentFilter = "전체";
function renderFilters() {
  const types = ["전체", ...new Set(WORKS.map(w => w.type))];
  const box = document.getElementById("filters");
  box.innerHTML = "";
  types.forEach(t => {
    const b = document.createElement("button");
    b.textContent = t;
    if (t === currentFilter) b.className = "on";
    b.onclick = () => { currentFilter = t; renderFilters(); renderGallery(); };
    box.appendChild(b);
  });
}

function renderGallery() {
  const box = document.getElementById("gallery");
  box.innerHTML = "";
  WORKS.filter(w => currentFilter === "전체" || w.type === currentFilter).forEach(w => {
    const card = document.createElement("div");
    card.className = "work";
    card.innerHTML = `<div class="pic"><svg viewBox="0 0 16 16"></svg></div>
      <div class="info"><b></b><span></span></div>`;
    drawStitches(card.querySelector("svg"), PATTERNS[w.pattern]);
    card.querySelector("b").textContent = w.title;
    card.querySelector("span").textContent = w.type;
    card.onclick = () => openModal(w);
    box.appendChild(card);
  });
}

const modal = document.getElementById("modal");
function openModal(w) {
  drawStitches(document.getElementById("modalSvg"), PATTERNS[w.pattern]);
  document.getElementById("modalTitle").textContent = w.title;
  document.getElementById("modalDesc").textContent = w.desc;
  modal.classList.add("open");
}
document.getElementById("modalClose").onclick = () => modal.classList.remove("open");
modal.onclick = e => { if (e.target === modal) modal.classList.remove("open"); };
document.addEventListener("keydown", e => { if (e.key === "Escape") modal.classList.remove("open"); });

// ===== 계절별 농사 =====
const SEASONS = {
  "봄": { emoji: "🌸", crops: ["감자", "상추", "완두콩", "쑥갓"], todo: ["밭 갈고 퇴비 넣기", "감자 씨 심기 (3월 말)", "상추 모종 옮겨 심기"] },
  "여름": { emoji: "☀️", crops: ["토마토", "오이", "고추", "옥수수"], todo: ["아침 일찍 물 주기", "토마토 곁순 따기", "장마 전 배수로 정리"] },
  "가을": { emoji: "🍂", crops: ["배추", "무", "쪽파", "고구마"], todo: ["김장 배추 심기 (8월 말)", "고구마 캐기", "씨앗 받아 말리기"] },
  "겨울": { emoji: "❄️", crops: ["마늘", "양파"], todo: ["마늘·양파 짚 덮어주기", "내년 밭 계획 세우기", "수틀 앞에서 긴 겨울 보내기"] }
};

function currentSeason() {
  const m = new Date().getMonth() + 1;
  if (m >= 3 && m <= 5) return "봄";
  if (m >= 6 && m <= 8) return "여름";
  if (m >= 9 && m <= 11) return "가을";
  return "겨울";
}

let selectedSeason = currentSeason();
function renderSeason() {
  const tabs = document.getElementById("tabs");
  tabs.innerHTML = "";
  Object.keys(SEASONS).forEach(name => {
    const b = document.createElement("button");
    b.textContent = SEASONS[name].emoji + " " + name + (name === currentSeason() ? " (지금)" : "");
    if (name === selectedSeason) b.className = "on";
    b.onclick = () => { selectedSeason = name; renderSeason(); };
    tabs.appendChild(b);
  });
  const s = SEASONS[selectedSeason];
  document.getElementById("season").innerHTML = `
    <h3>${s.emoji} ${selectedSeason}의 밭</h3>
    <div class="crops">${s.crops.map(c => `<span class="crop">${c}</span>`).join("")}</div>
    <ul>${s.todo.map(t => `<li>${t}</li>`).join("")}</ul>`;
}

// ===== 작은 밭 게임 =====
const STAGES = ["", "🌰", "🌱", "🌿", "🥬"];
const plots = new Array(18).fill(0);
let harvested = 0;
try { harvested = Number(localStorage.getItem("harvested")) || 0; } catch (e) {}

function renderPlots() {
  const box = document.getElementById("plots");
  box.innerHTML = "";
  plots.forEach((stage, i) => {
    const b = document.createElement("button");
    b.className = "plot";
    b.textContent = STAGES[stage];
    b.title = stage === 4 ? "수확하기" : "가꾸기";
    b.onclick = () => {
      if (plots[i] === 4) {
        plots[i] = 0;
        harvested++;
        try { localStorage.setItem("harvested", harvested); } catch (e) {}
      } else {
        plots[i]++;
      }
      renderPlots();
    };
    box.appendChild(b);
  });
  document.getElementById("harvest").textContent = `수확한 작물: ${harvested}개`;
}

// ===== 일지 =====
const DIARY = [
  { date: "2026-10-10", kind: "farm", text: "고구마를 캤다. 생각보다 굵게 들어서 한참 웃었다." },
  { date: "2026-10-03", kind: "stitch", text: "가을 단풍잎 도안을 그렸다. 주황 실이 모자라서 읍내에 다녀와야겠다." },
  { date: "2026-09-21", kind: "farm", text: "김장 배추가 손바닥만큼 자랐다. 벌레 먹은 잎은 손으로 하나씩 떼어줬다." },
  { date: "2026-09-12", kind: "stitch", text: "꿀벌 손님 완성. 날개는 하늘색 실 한 가닥으로." },
  { date: "2026-08-28", kind: "farm", text: "무 씨앗을 뿌렸다. 비 소식이 있어 다행이다." }
];

function renderDiary() {
  const box = document.getElementById("diaryList");
  box.innerHTML = "";
  DIARY.forEach(d => {
    const el = document.createElement("div");
    el.className = "entry" + (d.kind === "stitch" ? " stitch" : "");
    el.innerHTML = `<div class="date">${d.kind === "stitch" ? "🧵 자수" : "🌱 농사"} · ${d.date}</div><div></div>`;
    el.lastChild.textContent = d.text;
    box.appendChild(el);
  });
}

// ===== 방명록 (localStorage) =====
function loadNotes() {
  try { return JSON.parse(localStorage.getItem("guestbook")) || []; } catch (e) { return []; }
}
function saveNotes(list) {
  try { localStorage.setItem("guestbook", JSON.stringify(list)); } catch (e) {}
}
let notes = loadNotes();

function renderNotes() {
  const box = document.getElementById("notes");
  box.innerHTML = "";
  if (notes.length === 0) {
    box.innerHTML = `<p style="color:var(--muted)">아직 남겨진 글이 없어요. 첫 번째 손님이 되어 주세요!</p>`;
    return;
  }
  notes.forEach((n, i) => {
    const el = document.createElement("div");
    el.className = "note";
    el.innerHTML = `<button class="del" title="삭제">✕</button><b></b><small></small><div></div>`;
    el.querySelector("b").textContent = n.name;
    el.querySelector("small").textContent = n.date;
    el.lastChild.textContent = n.msg;
    el.querySelector(".del").onclick = () => {
      notes.splice(i, 1);
      saveNotes(notes);
      renderNotes();
    };
    box.appendChild(el);
  });
}

document.getElementById("guestForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("gName").value.trim();
  const msg = document.getElementById("gMsg").value.trim();
  if (!name || !msg) return;
  notes.unshift({ name, msg, date: new Date().toLocaleDateString("ko-KR") });
  saveNotes(notes);
  e.target.reset();
  renderNotes();
});

// ===== 인사말 =====
function setGreeting() {
  const h = new Date().getHours();
  let msg;
  if (h < 6) msg = "고요한 새벽이에요. 별 아래 밭은 쉬고 있어요.";
  else if (h < 12) msg = "좋은 아침이에요! 지금쯤 밭에 물을 주고 있을 거예요.";
  else if (h < 18) msg = "나른한 오후, 수틀 앞에서 바늘을 들고 있어요.";
  else msg = "해가 졌어요. 오늘 하루의 일지를 쓰는 시간이에요.";
  document.getElementById("greeting").textContent = msg;
}

// ===== 시작 =====
document.getElementById("year").textContent = new Date().getFullYear();
setGreeting();
animateHero();
renderFilters();
renderGallery();
renderSeason();
renderPlots();
renderDiary();
renderNotes();
