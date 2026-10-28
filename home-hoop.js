// ===== 첫 화면 수틀: 한 땀씩 수놓아지는 그림 =====
// 사이트 색(붉은 실 t, 쪽빛 i, 회색 m)만 써요. 색은 CSS 변수라서 다크 모드에서도 맞춰져요.
// 움직임 줄이기를 켠 기기에서는 완성된 그림만 보여요.

const HOOP_PATTERNS = [
  [ // 튤립 화분
    "....tt..tt....",
    "...ttt..ttt...",
    "...tttttttt...",
    "...ttttttttt..",
    "....tttttt....",
    ".....tttt.....",
    ".......i......",
    "..ii...i..ii..",
    ".iiii..i.iiii.",
    "..iiiiiiiiii..",
    ".......i......",
    "...mmmmmmmm...",
    "....mmmmmm....",
    ".....mmmm....."
  ],
  [ // 새싹
    "..............",
    "..............",
    "..ii......ii..",
    ".iiiii..iiiii.",
    "..iiiiiiiiii..",
    "....iiiiii....",
    "......ii......",
    "......i.......",
    "......i.......",
    "..mmmmmmmmmm..",
    ".mmmmmmmmmmmm.",
    ".mmmmmmmmmmmm.",
    "..............",
    ".............."
  ],
  [ // 하트
    "..............",
    "..tt.....tt...",
    ".tttt...tttt..",
    "tttttt.tttttt.",
    "tttttttttttt..",
    "ttttttttttttt.",
    ".ttttttttttt..",
    "..ttttttttt...",
    "...ttttttt....",
    "....ttttt.....",
    ".....ttt......",
    "......t.......",
    "..............",
    ".............."
  ]
];

(function () {
  const svg = document.getElementById("hoopStitch");
  if (!svg) return;
  const ns = "http://www.w3.org/2000/svg";
  const N = 14;

  function draw(pattern, count) {
    svg.replaceChildren();
    let k = 0;
    pattern.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch === "." || k++ >= count) return;
      const p = document.createElementNS(ns, "path");
      p.setAttribute("class", "st-" + ch);
      p.setAttribute("d", `M${x + 0.18} ${y + 0.18}L${x + 0.82} ${y + 0.82}M${x + 0.82} ${y + 0.18}L${x + 0.18} ${y + 0.82}`);
      svg.append(p);
    }));
  }
  svg.setAttribute("viewBox", `0 0 ${N} ${N}`);

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    draw(HOOP_PATTERNS[0], Infinity);
    return;
  }

  let idx = 0;
  (function play() {
    const pattern = HOOP_PATTERNS[idx % HOOP_PATTERNS.length];
    const total = pattern.join("").replace(/\./g, "").length;
    let n = 0;
    const timer = setInterval(() => {
      n += 2;
      draw(pattern, n);
      if (n >= total) {
        clearInterval(timer);
        idx++;
        setTimeout(play, 2800);
      }
    }, 45);
  })();
})();
