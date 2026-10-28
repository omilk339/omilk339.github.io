// ===== 블로그 최신 글 =====
// posts.json은 GitHub Actions가 1시간마다 네이버 블로그 RSS에서 새로 만들어요.
// 불러오지 못하면 HTML에 적어 둔 기존 목록이 그대로 보여요.
// 같은 글이 두 번 나오지 않게: 텃밭 글은 농사 칸에, 자수 글은 자수 칸에, 나머지는 글쓰기 칸에.

const POST_GROUPS = {
  farm: ["시골집과 텃밭"],
  emb: ["자수작업 일기", "자수 특강 안내"]
};
const SECTION_COUNT = 3;   // 농사·자수 칸에 보여 줄 글 수
const WRITE_COUNT = 3;     // 글쓰기 칸에 보여 줄 글 수
// 글쓰기 칸에서 먼저 보여 줄 카테고리 (사이트 주제에 가까운 순서). 나머지는 최신순
const WRITE_FIRST = ["4도3촌 생활", "도시에서 다녀온 짧은 여행"];

let posts = null;

function postItem(p) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = p.url;
  a.target = "_blank";
  a.rel = "noopener";
  a.textContent = p.title;
  const time = document.createElement("time");
  time.dateTime = p.date;
  time.textContent = p.date.replaceAll("-", ".");
  li.append(a, time);
  return li;
}

function renderPosts() {
  if (!posts) return;
  const shown = new Set();
  [["farmPosts", "farm"], ["embPosts", "emb"]].forEach(([id, g]) => {
    const box = document.getElementById(id);
    const list = posts.filter(p => POST_GROUPS[g].includes(p.category)).slice(0, SECTION_COUNT);
    list.forEach(p => shown.add(p.url));
    box.hidden = !list.length;
    box.querySelector("ul").replaceChildren(...list.map(postItem));
  });
  const rank = p => { const i = WRITE_FIRST.indexOf(p.category); return i < 0 ? WRITE_FIRST.length : i; };
  const rest = posts.filter(p => !shown.has(p.url))
    .map((p, i) => [p, i]).sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).map(([p]) => p)
    .slice(0, WRITE_COUNT);
  document.getElementById("postList").replaceChildren(...rest.map(postItem));
  document.getElementById("postMore").hidden = false;
}

fetch("/posts.json", { cache: "no-cache" })
  .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
  .then(d => { posts = d.posts; renderPosts(); })
  .catch(() => {});   // 못 불러오면 기존 목록 그대로
