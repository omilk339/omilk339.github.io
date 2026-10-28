// ===== 텃밭 달력 =====
// 작물마다 심는 달·거두는 달을 1~12월 막대로 보여 주고, 이번 달을 표시해요.
// 작물 이름을 누르면 블로그에서 그 작물로 검색한 글이 열려요.
// 작물을 바꾸거나 더하려면 아래 CROPS만 고치면 돼요 (이름 번역은 home-i18n.js의 crop1, crop2 …).

const CROPS = [
  { key: "crop1", search: "감자", plant: 3, harvest: 6 },
  { key: "crop2", search: "고추", plant: 5, harvest: 8 },
  { key: "crop3", search: "배추", plant: 8, harvest: 11 }
];
const BLOG_SEARCH = q => `https://blog.naver.com/PostSearchList.naver?blogId=simplehi-&orderType=sim&searchText=${encodeURIComponent(q)}`;

function cropStage(c, m) {
  if (m === c.plant) return "plant";
  if (m === c.harvest) return "harvest";
  return m > c.plant && m < c.harvest ? "grow" : "";
}

function renderGarden() {
  const box = document.getElementById("garden");
  if (!box) return;
  const lang = document.documentElement.lang, d = HOME[lang] || HOME.ko;
  const now = new Date().getMonth() + 1;
  const monthName = new Intl.DateTimeFormat(lang, { month: "long" }).format(new Date(2026, now - 1, 1));

  // 이번 달 한 줄 요약
  const active = CROPS.map(c => [c, cropStage(c, now)]).filter(([, s]) => s);
  const status = active.length
    ? active.map(([c, s]) => d["st_" + s].replace("{crop}", d[c.key])).join(" · ")
    : d.st_rest;

  const head = Array.from({ length: 12 }, (_, i) => `<span class="m${i + 1 === now ? " now" : ""}">${i + 1}</span>`).join("");
  const rows = CROPS.map(c => {
    const cells = Array.from({ length: 12 }, (_, i) => {
      const s = cropStage(c, i + 1);
      return `<span class="cell ${s}${i + 1 === now ? " now" : ""}"${s ? ` title="${d["leg_" + s]}"` : ""}></span>`;
    }).join("");
    return `<a class="crop" href="${BLOG_SEARCH(c.search)}" target="_blank" rel="noopener"></a>${cells}`;
  }).join("");

  box.innerHTML = `
    <p class="now-line"><b></b> <span></span></p>
    <div class="cal" role="img">
      <span></span>${head}
      ${rows}
    </div>
    <p class="legend-row">
      <span><i class="cell plant"></i></span><span><i class="cell grow"></i></span><span><i class="cell harvest"></i></span>
      <small></small>
    </p>`;
  // 글자는 textContent로 (번역 문구에 특수문자가 있어도 안전하게)
  box.querySelector(".now-line b").textContent = d.nowLbl.replace("{m}", monthName);
  box.querySelector(".now-line span").textContent = status;
  box.querySelector(".cal").setAttribute("aria-label", `${d.nowLbl.replace("{m}", monthName)} ${status}`);
  box.querySelectorAll(".crop").forEach((a, i) => { a.textContent = d[CROPS[i].key]; });
  const legend = box.querySelectorAll(".legend-row > span");
  ["plant", "grow", "harvest"].forEach((s, i) => legend[i].append(d["leg_" + s]));
  box.querySelector(".legend-row small").textContent = d.calHint;
}

renderGarden();
document.addEventListener("langchange", renderGarden);
