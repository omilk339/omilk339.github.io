// ===== 블로그 최신 글 =====
// posts.json은 GitHub Actions가 1시간마다 네이버 블로그 RSS에서 새로 만들어요.
// 불러오지 못하면 HTML에 적어 둔 기존 목록이 그대로 보여요.

// 블로그 카테고리 → 첫 화면 묶음
const POST_GROUPS = {
  farm: ["시골집과 텃밭"],
  city: ["도시의 일상"],
  trip: ["도시에서 다녀온 짧은 여행", "파크골프장 투어"],
  emb: ["자수작업 일기", "자수 특강 안내"]
};
const NEW_DAYS = 3;   // 며칠 안에 올린 글을 '새 글'로 표시할지

let posts = null;
let group = "all";

const inGroup = (p, g) => g === "all" || POST_GROUPS[g].includes(p.category);
const homeT = key => HOME[document.documentElement.lang]?.[key] ?? HOME.ko[key];

function postItem(p) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = p.url;
  a.target = "_blank";
  a.rel = "noopener";
  a.textContent = p.title;
  if ((Date.now() - new Date(p.date)) / 864e5 < NEW_DAYS) {
    const b = document.createElement("span");
    b.className = "new";
    b.textContent = homeT("newBadge");
    a.append(" ", b);
  }
  const time = document.createElement("time");
  time.dateTime = p.date;
  time.textContent = p.date.replaceAll("-", ".");
  li.append(a, time);
  return li;
}

function renderPostList(ul, list) {
  ul.replaceChildren(...list.map(postItem));
}

function renderPosts() {
  if (!posts) return;
  // 글쓰기: 카테고리 버튼 + 최신 5개
  const chips = document.getElementById("postChips");
  chips.replaceChildren();
  ["all", ...Object.keys(POST_GROUPS)].filter(g => posts.some(p => inGroup(p, g))).forEach(g => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = homeT("cat_" + g);
    b.setAttribute("aria-pressed", g === group);
    b.onclick = () => { group = g; renderPosts(); };
    chips.append(b);
  });
  chips.hidden = false;
  renderPostList(document.getElementById("postList"), posts.filter(p => inGroup(p, group)).slice(0, 5));
  document.getElementById("postMore").hidden = false;

  // 농사·자수 칸: 그 카테고리 최신 3개
  [["farmPosts", "farm"], ["embPosts", "emb"]].forEach(([id, g]) => {
    const box = document.getElementById(id), list = posts.filter(p => inGroup(p, g)).slice(0, 3);
    box.hidden = !list.length;
    renderPostList(box.querySelector("ul"), list);
  });
}

fetch("/posts.json", { cache: "no-cache" })
  .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
  .then(d => { posts = d.posts; renderPosts(); })
  .catch(() => {});   // 못 불러오면 기존 목록 그대로

document.addEventListener("langchange", renderPosts);
