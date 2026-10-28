// ===== 사진 → 자수 도안 + 기법 추천 =====
// 모든 처리는 브라우저 안에서만 합니다. 사진은 어디에도 전송·저장되지 않습니다.

const $ = id => document.getElementById(id);

// ===== DMC 실 색상표 (화면용 근사값) =====
const DMC = [
  ["B5200", "눈 흰색", "#FFFFFF"], ["Blanc", "흰색", "#FCFBF8"], ["3865", "겨울 흰색", "#F9F7F1"],
  ["Ecru", "에크루", "#F0EADA"], ["739", "아주 연한 황갈", "#F8E4C8"], ["738", "연한 황갈", "#ECCC9E"],
  ["437", "밝은 황갈", "#E4BB8E"], ["436", "황갈", "#CB9051"], ["435", "아주 연한 갈색", "#B87748"],
  ["434", "연한 갈색", "#985E33"], ["433", "갈색", "#7A451F"], ["801", "진한 커피", "#653919"],
  ["898", "아주 진한 커피", "#492A13"], ["938", "가장 진한 커피", "#361F0E"], ["3371", "검은 갈색", "#1E1108"],
  ["842", "아주 연한 베이지갈", "#D1BAA1"], ["841", "연한 베이지갈", "#B69B7E"], ["840", "베이지갈", "#9A7C5C"],
  ["977", "연한 황금갈", "#DC9C56"], ["976", "황금갈", "#C28142"], ["975", "진한 황금갈", "#914F12"],
  ["3770", "아주 연한 살구", "#FFEEE3"], ["948", "아주 연한 복숭아", "#FEE7DA"], ["754", "연한 복숭아", "#F7CBBF"],
  ["353", "복숭아", "#FED7CC"], ["352", "연한 산호", "#FD9C97"], ["350", "산호", "#E04848"],
  ["3341", "살구", "#FCAB98"], ["3340", "진한 살구", "#FF836F"], ["722", "연한 주황", "#F7976F"],
  ["721", "주황", "#F27842"], ["970", "호박색", "#F78B13"], ["740", "귤색", "#FF8313"],
  ["741", "진한 귤색", "#FFA32B"], ["742", "연한 귤색", "#FFBF57"], ["946", "진한 주황", "#EB6307"],
  ["900", "다홍 주황", "#D15807"], ["445", "연한 레몬", "#FFFB8B"], ["307", "레몬", "#FDED54"],
  ["973", "선명한 노랑", "#FFE300"], ["444", "진한 레몬", "#FFD600"], ["744", "연노랑", "#FFE793"],
  ["743", "노랑", "#FED376"], ["725", "황금 노랑", "#FFC840"], ["761", "연한 연어", "#FFC9C9"],
  ["760", "연어", "#F5ADAD"], ["3328", "진한 연어", "#E36D6D"], ["3706", "멜론", "#FFADBC"],
  ["3705", "진한 멜론", "#FF7992"], ["666", "선명한 빨강", "#E31D42"], ["321", "빨강", "#C72B3B"],
  ["498", "진한 빨강", "#A7132B"], ["816", "가넷", "#970B23"], ["814", "진한 가넷", "#7B001B"],
  ["963", "아주 연한 분홍", "#FFD7D7"], ["3326", "연한 장미", "#FBADB4"], ["899", "장미", "#F27688"],
  ["335", "진한 장미", "#EE546E"], ["604", "연한 크랜베리", "#FFB0BE"], ["602", "크랜베리", "#E2487F"],
  ["3608", "연한 자두", "#EA9CC4"], ["718", "자두", "#9C2462"], ["3689", "연한 모브", "#FBBFC2"],
  ["3687", "모브", "#C96B70"], ["3350", "진한 먼지장미", "#BC4364"], ["554", "연한 보라", "#DBB3CB"],
  ["553", "보라", "#A3638B"], ["550", "아주 진한 보라", "#5C184E"], ["211", "연한 라벤더", "#E3CBE3"],
  ["210", "라벤더", "#C39FC3"], ["208", "진한 라벤더", "#835B8B"], ["340", "청보라", "#ADA7C7"],
  ["333", "진한 청보라", "#5C5478"], ["775", "아주 연한 하늘", "#D9EBF1"], ["3755", "하늘", "#93B4CE"],
  ["800", "연한 델프트 파랑", "#C0CCDE"], ["799", "델프트 파랑", "#748EB6"], ["798", "진한 델프트 파랑", "#466A8E"],
  ["826", "파랑", "#6B9EBF"], ["312", "진한 하늘", "#35668B"], ["797", "로열 블루", "#13477D"],
  ["820", "아주 진한 로열 블루", "#0E365C"], ["336", "남색", "#253B73"], ["939", "아주 진한 남색", "#1B2853"],
  ["964", "연한 청록", "#A9E2D8"], ["959", "청록", "#59C7B4"], ["597", "터키석", "#5BA3B3"],
  ["3812", "진한 청록", "#2F8C84"], ["955", "연한 연두", "#A2D6AD"], ["954", "연두빛 초록", "#88BA91"],
  ["913", "나일 초록", "#6DAB77"], ["911", "에메랄드", "#189065"], ["909", "진한 에메랄드", "#156F49"],
  ["907", "연한 앵무 초록", "#C7E666"], ["704", "밝은 연두", "#9ECF34"], ["906", "앵무 초록", "#7FB335"],
  ["702", "켈리 초록", "#47A72F"], ["700", "선명한 초록", "#07731B"], ["699", "초록", "#056517"],
  ["904", "진한 앵무 초록", "#557822"], ["3348", "연한 황록", "#CCD9B1"], ["3347", "황록", "#71935C"],
  ["470", "아보카도", "#94AB4F"], ["3345", "진한 수렵 초록", "#1B5915"], ["986", "진한 숲 초록", "#405230"],
  ["762", "아주 연한 회색", "#ECECEC"], ["415", "진주 회색", "#D3D3D6"], ["318", "연한 회색", "#ABABAB"],
  ["414", "회색", "#8C8C8C"], ["317", "백랍 회색", "#6C6C6C"], ["413", "진한 회색", "#565656"],
  ["3799", "아주 진한 회색", "#424242"], ["648", "연한 비버 회색", "#BCB4AC"], ["646", "비버 회색", "#877D73"],
  ["310", "검정", "#000000"]
].map(([code, name, hex]) => {
  const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  return { code, name, hex, rgb, lab: toLab(...rgb) };
});

// 도안 기호 (U+FE0E: 이모지가 아닌 글자 모양으로)
const SYMBOLS = ["●", "▲", "■", "◆", "✚", "♥︎", "★︎", "✖︎", "○", "△", "□", "◇", "☆", "♡", "▼", "◐"];

// ===== 색 계산 =====
function toLab(r, g, b) {
  const f = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const R = f(r), G = f(g), B = f(b);
  const h = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  const x = h((R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047);
  const y = h(R * 0.2126 + G * 0.7152 + B * 0.0722);
  const z = h((R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}
const dE = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
const isWhitish = d => d.lab[0] > 90 && Math.hypot(d.lab[1], d.lab[2]) < 10;

function nearestDmc(L, a, b) {
  let best = 0, bd = Infinity;
  DMC.forEach((d, i) => {
    const v = (d.lab[0] - L) ** 2 + (d.lab[1] - a) ** 2 + (d.lab[2] - b) ** 2;
    if (v < bd) { bd = v; best = i; }
  });
  return best;
}

// ===== 사진 읽기 =====
let src = null;       // 원본을 줄여 둔 캔버스
let mode = "cross";
let lastRes = null;

function setSource(drawable, w, h) {
  const scale = Math.min(1, 900 / Math.max(w, h));
  src = document.createElement("canvas");
  src.width = Math.round(w * scale);
  src.height = Math.round(h * scale);
  const ctx = src.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, src.width, src.height);
  ctx.drawImage(drawable, 0, 0, src.width, src.height);
  srcId++;
  resetTaps();
  $("sourceImg").src = src.toDataURL("image/jpeg", 0.85);
  $("sourceBox").hidden = false;
  $("settings").hidden = false;
  render();
}

function loadFile(file) {
  if (!file || !file.type.startsWith("image/")) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => { setSource(img, img.naturalWidth, img.naturalHeight); URL.revokeObjectURL(url); };
  img.onerror = () => { alert(t("badImage")); URL.revokeObjectURL(url); };
  img.src = url;
}

// 사진 없이 해볼 수 있는 예시 그림 (튤립 화분)
function sampleImage() {
  const c = document.createElement("canvas");
  c.width = c.height = 600;
  const x = c.getContext("2d");
  const sky = x.createLinearGradient(0, 0, 0, 600);
  sky.addColorStop(0, "#cfe6f5"); sky.addColorStop(1, "#fbf7ef");
  x.fillStyle = sky; x.fillRect(0, 0, 600, 600);
  x.fillStyle = "#f6c945"; x.beginPath(); x.arc(480, 110, 55, 0, 7); x.fill();
  x.strokeStyle = "#4f8a34"; x.lineWidth = 14;
  x.beginPath(); x.moveTo(300, 470); x.quadraticCurveTo(290, 330, 300, 230); x.stroke();
  x.fillStyle = "#6fae45";
  x.beginPath(); x.ellipse(235, 370, 70, 24, -0.7, 0, 7); x.fill();
  x.beginPath(); x.ellipse(365, 400, 70, 24, 0.7, 0, 7); x.fill();
  x.fillStyle = "#d63a4a";
  x.beginPath(); x.moveTo(230, 160); x.lineTo(265, 120); x.lineTo(300, 165); x.lineTo(335, 120);
  x.lineTo(370, 160); x.quadraticCurveTo(375, 260, 300, 265); x.quadraticCurveTo(225, 260, 230, 160); x.fill();
  x.fillStyle = "#f08a93";
  x.beginPath(); x.ellipse(275, 200, 14, 34, 0.2, 0, 7); x.fill();
  x.fillStyle = "#b5703f"; x.beginPath();
  x.moveTo(200, 460); x.lineTo(400, 460); x.lineTo(375, 580); x.lineTo(225, 580); x.fill();
  x.fillStyle = "#8b5a32"; x.fillRect(190, 450, 220, 30);
  x.fillStyle = "#3b3127";
  [[60, 520], [90, 545], [120, 515], [510, 530], [540, 505]].forEach(([a, b]) => { x.beginPath(); x.arc(a, b, 6, 0, 7); x.fill(); });
  setSource(c, 600, 600);
}

// 원하는 크기로 줄여서 Lab 색 배열로
function pixels(w, h, blur) {
  let cur = src, cw = src.width, ch = src.height;
  while (cw / 2 >= w * 2) {   // 반씩 줄여야 색이 고르게 섞여요
    const c = document.createElement("canvas");
    c.width = Math.round(cw / 2); c.height = Math.round(ch / 2);
    c.getContext("2d").drawImage(cur, 0, 0, c.width, c.height);
    cur = c; cw = c.width; ch = c.height;
  }
  const out = document.createElement("canvas");
  out.width = w; out.height = h;
  const ctx = out.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
  ctx.imageSmoothingQuality = "high";
  if (blur) ctx.filter = `blur(${blur}px)`;
  ctx.drawImage(cur, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  const lab = new Float32Array(w * h * 3);
  for (let i = 0; i < w * h; i++) lab.set(toLab(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]), i * 3);
  return lab;
}

// ===== 색 줄이기 (k-평균) → 가까운 DMC 실로 =====
function buildPalette(lab, n, k) {
  const step = Math.max(1, Math.floor(n / 5000));
  const idx = [];
  for (let i = 0; i < n; i += step) idx.push(i);
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const at = p => [lab[p * 3], lab[p * 3 + 1], lab[p * 3 + 2]];
  const d2 = (p, c) => (lab[p * 3] - c[0]) ** 2 + (lab[p * 3 + 1] - c[1]) ** 2 + (lab[p * 3 + 2] - c[2]) ** 2;

  // k-means++ 로 시작점 고르기
  const centers = [at(idx[Math.floor(rand() * idx.length)])];
  const near = new Float64Array(idx.length).fill(Infinity);
  while (centers.length < k) {
    const c = centers[centers.length - 1];
    let sum = 0;
    idx.forEach((p, j) => { near[j] = Math.min(near[j], d2(p, c)); sum += near[j]; });
    if (sum === 0) break;
    let r = rand() * sum, j = 0;
    for (; j < idx.length - 1; j++) { r -= near[j]; if (r <= 0) break; }
    centers.push(at(idx[j]));
  }
  for (let iter = 0; iter < 12; iter++) {
    const acc = centers.map(() => [0, 0, 0, 0]);
    idx.forEach(p => {
      let best = 0, bd = Infinity;
      centers.forEach((c, ci) => { const v = d2(p, c); if (v < bd) { bd = v; best = ci; } });
      const a = acc[best];
      a[0] += lab[p * 3]; a[1] += lab[p * 3 + 1]; a[2] += lab[p * 3 + 2]; a[3]++;
    });
    acc.forEach((a, ci) => { if (a[3]) centers[ci] = [a[0] / a[3], a[1] / a[3], a[2] / a[3]]; });
  }
  return [...new Set(centers.map(c => nearestDmc(...c)))];
}

function assign(lab, n, pal) {
  const labels = new Int16Array(n);
  for (let p = 0; p < n; p++) {
    let best = 0, bd = Infinity;
    pal.forEach((d, i) => {
      const L = DMC[d].lab;
      const v = (L[0] - lab[p * 3]) ** 2 + (L[1] - lab[p * 3 + 1]) ** 2 + (L[2] - lab[p * 3 + 2]) ** 2;
      if (v < bd) { bd = v; best = i; }
    });
    labels[p] = best;
  }
  return labels;
}

// 쓰인 색만 남기고 많이 쓴 순서로 정렬
function compact(labels, pal) {
  const counts = pal.map(() => 0);
  labels.forEach(l => { if (l >= 0) counts[l]++; });
  const order = pal.map((_, i) => i).filter(i => counts[i] > 0).sort((a, b) => counts[b] - counts[a]);
  const remap = new Int16Array(pal.length).fill(-1);
  order.forEach((old, i) => { remap[old] = i; });
  for (let p = 0; p < labels.length; p++) if (labels[p] >= 0) labels[p] = remap[labels[p]];
  return order.map((old, i) => ({ d: DMC[pal[old]], count: counts[old], sym: SYMBOLS[i % SYMBOLS.length], num: i + 1 }));
}

// 이웃 8칸 중 같은 색이 하나도 없는 땀은 주변 색으로
function cleanIsolated(labels, W, H) {
  const copy = labels.slice();
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const v = copy[y * W + x];
    const votes = new Map();
    let same = false;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const u = copy[ny * W + nx];
      if (u === v) same = true;
      votes.set(u, (votes.get(u) || 0) + 1);
    }
    if (!same && votes.size) labels[y * W + x] = [...votes].sort((a, b) => b[1] - a[1])[0][0];
  }
}

// 3x3 안에서 가장 많은 색으로 (자글자글한 부분 정리)
function modeFilter(labels, W, H, k) {
  const copy = labels.slice();
  const cnt = new Int16Array(k);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    cnt.fill(0);
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = Math.min(W - 1, Math.max(0, x + dx)), ny = Math.min(H - 1, Math.max(0, y + dy));
      cnt[copy[ny * W + nx]]++;
    }
    let best = copy[y * W + x];
    for (let i = 0; i < k; i++) if (cnt[i] > cnt[best]) best = i;
    labels[y * W + x] = best;
  }
}

// 같은 색끼리 이어진 덩어리 찾기
function components(labels, W, H) {
  const comp = new Int32Array(W * H).fill(-1);
  const list = [];
  const stack = [];
  for (let s = 0; s < W * H; s++) {
    if (comp[s] >= 0) continue;
    const id = list.length, l = labels[s];
    const c = { label: l, area: 0, sx: 0, sy: 0 };
    comp[s] = id; stack.push(s);
    while (stack.length) {
      const p = stack.pop(), x = p % W, y = (p - x) / W;
      c.area++; c.sx += x; c.sy += y;
      if (x > 0 && comp[p - 1] < 0 && labels[p - 1] === l) { comp[p - 1] = id; stack.push(p - 1); }
      if (x < W - 1 && comp[p + 1] < 0 && labels[p + 1] === l) { comp[p + 1] = id; stack.push(p + 1); }
      if (y > 0 && comp[p - W] < 0 && labels[p - W] === l) { comp[p - W] = id; stack.push(p - W); }
      if (y < H - 1 && comp[p + W] < 0 && labels[p + W] === l) { comp[p + W] = id; stack.push(p + W); }
    }
    list.push(c);
  }
  return { comp, list };
}

// 너무 작은 덩어리는 옆 덩어리에 합치기
function mergeSmall(labels, W, H, minArea) {
  const { comp, list } = components(labels, W, H);
  const votes = list.map(c => c.area < minArea ? new Map() : null);
  for (let p = 0; p < W * H; p++) {
    const v = votes[comp[p]];
    if (!v) continue;
    const x = p % W;
    [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, p - W, p + W].forEach(q => {
      if (q < 0 || q >= W * H || comp[q] === comp[p]) return;
      v.set(labels[q], (v.get(labels[q]) || 0) + 1);
    });
  }
  const target = votes.map(v => v && v.size ? [...v].sort((a, b) => b[1] - a[1])[0][0] : -1);
  for (let p = 0; p < W * H; p++) if (target[comp[p]] >= 0) labels[p] = target[comp[p]];
}

// ===== 십자수 도안 만들기 =====
function makeCross(k) {
  const W = +$("width").value;
  const H = Math.max(1, Math.round(W * src.height / src.width));
  const lab = pixels(W, H, 0);
  const pal = buildPalette(lab, W * H, k);
  const labels = assign(lab, W * H, pal);
  if ($("skipWhite").checked) {
    const empty = pal.map(d => isWhitish(DMC[d]));
    for (let p = 0; p < labels.length; p++) if (empty[labels[p]]) labels[p] = -1;
  }
  if ($("cleanup").checked) cleanIsolated(labels, W, H);
  return { W, H, labels, pal: compact(labels, pal) };
}

// ===== 프랑스 자수 밑그림 만들기 =====
function makeFrench(k) {
  const W = Math.min(480, src.width);
  const H = Math.max(1, Math.round(W * src.height / src.width));
  const lab = pixels(W, H, 1);
  const pal = buildPalette(lab, W * H, k);
  const labels = assign(lab, W * H, pal);
  modeFilter(labels, W, H, pal.length);
  modeFilter(labels, W, H, pal.length);
  const minArea = [500, 260, 140, 70, 35][+$("detail").value - 1] * (W * H) / (480 * 480);
  mergeSmall(labels, W, H, minArea);
  mergeSmall(labels, W, H, minArea);
  const res = { W, H, labels, pal: compact(labels, pal), minArea };
  res.comps = components(labels, W, H);
  return res;
}

// ===== AI 배경 지우기 (MediaPipe 매직 터치) =====
// 모델 파일만 내려받고, 사진은 이 기기 안에서 처리합니다.
const MP = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";
const MP_MODEL = "https://storage.googleapis.com/mediapipe-models/interactive_segmenter/magic_touch/float32/1/magic_touch.tflite";
let segmenter = null, segLoading = null;
let taps = [{ x: 0.5, y: 0.5 }];     // 주인공으로 고른 자리들 (0~1). 처음엔 가운데
let autoTap = true;                  // 아직 사용자가 누르지 않음
let mask = null;                     // { data: Uint8Array(src 크기), w, h } 1 = 주인공
const maskCache = new Map();         // 누른 자리마다 오려낸 결과

async function getSegmenter() {
  if (segmenter) return segmenter;
  if (!segLoading) {
    segLoading = (async () => {
      const vision = await import(`${MP}/vision_bundle.mjs`);
      const files = await vision.FilesetResolver.forVisionTasks(`${MP}/wasm`);
      return vision.InteractiveSegmenter.createFromOptions(files, {
        baseOptions: { modelAssetPath: MP_MODEL, delegate: "CPU" },
        outputConfidenceMasks: true,
        outputCategoryMask: false
      });
    })();
  }
  try { segmenter = await segLoading; } catch (e) { segLoading = null; throw e; }
  return segmenter;
}

// 누른 자리 하나에 대해 그 물체를 오려내기
async function segmentAt(pt) {
  const key = `${srcId}:${pt.x}:${pt.y}`;
  if (maskCache.has(key)) return maskCache.get(key);
  const seg = await getSegmenter();
  const r = seg.segment(src, { keypoint: pt });
  const w = src.width, h = src.height;
  const kp = Math.min(h - 1, Math.floor(pt.y * h)) * w + Math.min(w - 1, Math.floor(pt.x * w));
  // 누른 곳의 값이 가장 큰 마스크가 주인공
  let best = null, bv = -1;
  (r.confidenceMasks || []).forEach(m => {
    const a = m.getAsFloat32Array();
    if (a[kp] > bv) { bv = a[kp]; best = a.slice(); }
  });
  r.close();
  if (!best) throw new Error("no mask");
  const data = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) data[i] = best[i] > 0.5 ? 1 : 0;
  // 누른 곳과 이어진 덩어리만 남기고, 안쪽 구멍은 메우기
  const { comp, list } = components(data, w, h);
  let keep = comp[kp];
  if (data[kp] !== 1) {
    let area = 0;
    list.forEach((c, i) => { if (c.label === 1 && c.area > area) { area = c.area; keep = i; } });
  }
  const touches = new Set();
  for (let x = 0; x < w; x++) { touches.add(comp[x]); touches.add(comp[(h - 1) * w + x]); }
  for (let y = 0; y < h; y++) { touches.add(comp[y * w]); touches.add(comp[y * w + w - 1]); }
  for (let i = 0; i < w * h; i++) {
    const c = comp[i];
    data[i] = c === keep || (list[c].label === 0 && !touches.has(c)) ? 1 : 0;
  }
  maskCache.set(key, data);
  return data;
}

// 누른 자리들을 모두 합친 주인공
async function computeMask() {
  const w = src.width, h = src.height, data = new Uint8Array(w * h);
  for (const pt of taps) {
    const m = await segmentAt(pt);
    for (let i = 0; i < w * h; i++) data[i] |= m[i];
  }
  return { data, w, h };
}

// ===== 선 도안 만들기 =====
function makeLine() {
  const d = +$("detail").value;
  const W = Math.min(600, src.width);
  const H = Math.max(1, Math.round(W * src.height / src.width));
  const n = W * H;
  const lab = pixels(W, H, 1.2);
  const fg = new Uint8Array(n).fill(1);
  if (mask) for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    fg[y * W + x] = mask.data[Math.floor(y * mask.h / H) * mask.w + Math.floor(x * mask.w / W)];
  }
  // 주인공 부분의 색만 모아서 몇 가지 색으로 나누기
  let nfg = 0;
  for (let p = 0; p < n; p++) nfg += fg[p];
  if (nfg < 50) { fg.fill(1); nfg = n; }
  const fgLab = new Float32Array(nfg * 3);
  for (let p = 0, j = 0; p < n; p++) if (fg[p]) { fgLab.set(lab.subarray(p * 3, p * 3 + 3), j * 3); j++; }
  const k = [3, 4, 5, 6, 8][d - 1];
  const pal = buildPalette(fgLab, nfg, k);
  const labels = assign(lab, n, pal);
  const bg = pal.length;                 // 배경은 마지막 번호
  for (let p = 0; p < n; p++) if (!fg[p]) labels[p] = bg;
  modeFilter(labels, W, H, bg + 1);
  modeFilter(labels, W, H, bg + 1);
  const minArea = [700, 360, 180, 90, 45][d - 1] * n / (480 * 480);
  mergeSmall(labels, W, H, minArea);
  mergeSmall(labels, W, H, minArea);

  // 색이 바뀌는 곳 = 안쪽 선, 배경과 닿는 곳 = 바깥 윤곽선
  const inner = new Uint8Array(n), outer = new Uint8Array(n);
  let area = 0, nIn = 0, nOut = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const p = y * W + x, l = labels[p];
    if (l !== bg) area++;
    [x < W - 1 ? p + 1 : -1, y < H - 1 ? p + W : -1].forEach(q => {
      if (q < 0 || labels[q] === l) return;
      if (l === bg || labels[q] === bg) outer[l === bg ? q : p] = 1;
      else inner[p] = 1;
    });
    // 사진 가장자리에 걸친 주인공도 테두리 긋기
    if (l !== bg && mask && (x === 0 || y === 0 || x === W - 1 || y === H - 1)) outer[p] = 1;
  }
  inner.forEach(v => { nIn += v; });
  outer.forEach((v, p) => { if (v) { inner[p] = 0; nOut++; } });
  const line = DMC.find(t => t.code === $("lineColor").value);
  return {
    W, H, labels, bg, inner, outer, area, nIn, nOut,
    pal: [{ d: line, count: nIn + nOut, sym: "〰", num: "〰" }]
  };
}

// ===== 그리기 =====
const textColor = d => d.lab[0] > 55 ? "#222" : "#fff";

// 잘라낸 주인공 미리보기 (체크무늬 = 지워진 배경)
function drawCutout(canvas, res) {
  const { W, H, labels, bg } = res;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  for (let y = 0; y < H; y += 12) for (let x = 0; x < W; x += 12) {
    ctx.fillStyle = (x + y) / 12 % 2 ? "#e9e4da" : "#f8f5ef";
    ctx.fillRect(x, y, 12, 12);
  }
  const tmp = document.createElement("canvas");
  tmp.width = W; tmp.height = H;
  const t = tmp.getContext("2d");
  t.drawImage(src, 0, 0, W, H);
  const img = t.getImageData(0, 0, W, H);
  for (let p = 0; p < W * H; p++) if (labels[p] === bg) img.data[p * 4 + 3] = 0;
  t.putImageData(img, 0, 0);
  ctx.drawImage(tmp, 0, 0);
}

// 선 픽셀마다 작은 원을 찍어 매끈한 선으로 (바깥 윤곽선은 조금 더 굵게)
function drawLine(canvas, res, thick) {
  const S = 3, { W, H } = res;
  // 선이 있는 곳만 잘라내기 (주인공이 종이에 꽉 차게)
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let p = 0; p < W * H; p++) {
    if (!res.inner[p] && !res.outer[p]) continue;
    const x = p % W, y = (p - x) / W;
    if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
  if (x1 < 0) { x0 = 0; y0 = 0; x1 = W - 1; y1 = H - 1; }
  const pad = 6;
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad);
  x1 = Math.min(W - 1, x1 + pad); y1 = Math.min(H - 1, y1 + pad);
  res.cropW = x1 - x0 + 1;
  canvas.width = res.cropW * S; canvas.height = (y1 - y0 + 1) * S;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = res.pal[0].d.hex;
  const r = 0.6 + thick * 0.55;
  [[res.inner, r], [res.outer, r + 1]].forEach(([edges, rad]) => {
    ctx.beginPath();
    edges.forEach((v, p) => {
      if (!v) return;
      const x = (p % W - x0) * S + S / 2, y = (Math.floor(p / W) - y0) * S + S / 2;
      ctx.moveTo(x + rad, y);
      ctx.arc(x, y, rad, 0, Math.PI * 2);
    });
    ctx.fill();
  });
}

function drawPreview(canvas, res) {
  const c = 8, { W, H } = res;
  canvas.width = W * c; canvas.height = H * c;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fbf7ef"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  for (let x = 0; x < W; x++) for (let y = 0; y < H; y++) ctx.fillRect(x * c + c / 2 - 0.5, y * c + c / 2 - 0.5, 1, 1);
  ctx.lineCap = "round"; ctx.lineWidth = c * 0.28;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const l = res.labels[y * W + x];
    if (l < 0) continue;
    ctx.strokeStyle = res.pal[l].d.hex;
    const a = c * 0.15, b = c * 0.85;
    ctx.beginPath();
    ctx.moveTo(x * c + a, y * c + a); ctx.lineTo(x * c + b, y * c + b);
    ctx.moveTo(x * c + b, y * c + a); ctx.lineTo(x * c + a, y * c + b);
    ctx.stroke();
  }
}

function drawCross(canvas, res) {
  const cell = 16, m = 30, { W, H } = res;
  canvas.width = W * cell + m * 2; canvas.height = H * cell + m * 2;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.font = `bold ${cell * 0.68}px "Segoe UI Symbol", "Apple Symbols", sans-serif`;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const l = res.labels[y * W + x];
    if (l < 0) continue;
    const p = res.pal[l];
    ctx.fillStyle = p.d.hex;
    ctx.fillRect(m + x * cell, m + y * cell, cell, cell);
    ctx.fillStyle = textColor(p.d);
    ctx.fillText(p.sym, m + x * cell + cell / 2, m + y * cell + cell / 2 + 1);
  }
  const line = (x1, y1, x2, y2, major) => {
    ctx.strokeStyle = major ? "#444" : "#c8c8c8";
    ctx.lineWidth = major ? 1.6 : 0.6;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  };
  for (let x = 0; x <= W; x++) line(m + x * cell, m, m + x * cell, m + H * cell, x % 10 === 0 || x === W);
  for (let y = 0; y <= H; y++) line(m, m + y * cell, m + W * cell, m + y * cell, y % 10 === 0 || y === H);
  ctx.fillStyle = "#6b6f78"; ctx.font = "11px sans-serif";
  for (let x = 10; x <= W; x += 10) ctx.fillText(x, m + x * cell, m - 12);
  for (let y = 10; y <= H; y += 10) ctx.fillText(y, m - 14, m + y * cell);
  // 가운데 표시 (여기서부터 수놓기 시작하면 천 가운데에 와요)
  ctx.fillStyle = "#b04a3a";
  const cx = m + W * cell / 2, cy = m + H * cell / 2;
  ctx.beginPath(); ctx.moveTo(cx - 6, m - 6); ctx.lineTo(cx + 6, m - 6); ctx.lineTo(cx, m); ctx.fill();
  ctx.beginPath(); ctx.moveTo(m - 6, cy - 6); ctx.lineTo(m - 6, cy + 6); ctx.lineTo(m, cy); ctx.fill();
}

function drawFrench(canvas, res, tint) {
  const S = 2, { W, H, labels } = res;
  canvas.width = W * S; canvas.height = H * S;
  const ctx = canvas.getContext("2d");
  const img = ctx.createImageData(W * S, H * S);
  const fill = res.pal.map(p => tint ? p.d.rgb.map(v => Math.round(v * 0.4 + 255 * 0.6)) : [255, 255, 255]);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const p = y * W + x, l = labels[p];
    const edge = (x < W - 1 && labels[p + 1] !== l) || (y < H - 1 && labels[p + W] !== l);
    const col = edge ? [74, 64, 56] : fill[l];
    for (let dy = 0; dy < S; dy++) for (let dx = 0; dx < S; dx++) {
      const o = ((y * S + dy) * W * S + x * S + dx) * 4;
      img.data[o] = col[0]; img.data[o + 1] = col[1]; img.data[o + 2] = col[2]; img.data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  // 덩어리마다 실 번호 적기 (가운데에 가장 가까운 칸에)
  const { comp, list } = res.comps;
  const best = list.map(c => ({ cx: c.sx / c.area, cy: c.sy / c.area, d: Infinity, x: 0, y: 0 }));
  for (let p = 0; p < W * H; p++) {
    const b = best[comp[p]], x = p % W, y = (p - x) / W;
    const d = (x - b.cx) ** 2 + (y - b.cy) ** 2;
    if (d < b.d) { b.d = d; b.x = x; b.y = y; }
  }
  ctx.font = "bold 12px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.lineWidth = 3; ctx.strokeStyle = "#fff"; ctx.fillStyle = "#24262b";
  const placed = [];
  list.map((c, i) => [c, best[i]]).filter(([c]) => c.area >= res.minArea * 1.2)
    .sort((a, b) => b[0].area - a[0].area)
    .forEach(([c, b]) => {
      const px = b.x * S, py = b.y * S;
      if (placed.some(([qx, qy]) => Math.hypot(px - qx, py - qy) < 20)) return;
      placed.push([px, py]);
      const t = String(res.pal[c.label].num);
      ctx.strokeText(t, px, py); ctx.fillText(t, px, py);
    });
}

// ===== 실 목록 =====
// 고른 수틀에 맞춘 도안 크기로 수놓을 때의 선 길이
const designCm = () => HOOP_DESIGN[+$("hoop").value];
const lineCm = res => {
  const c = $("chartCanvas"), longSide = Math.max(c.width, c.height) / 3;   // 선 도안은 3배로 그려요
  return Math.round((res.nIn + res.nOut) * designCm() / longSide);
};

// DMC 색 이름은 한국어로만 있어서, 다른 언어에서는 번호만 보여요
const dmcName = d => lang === "ko" ? d.name : "";
const lineColorName = d => t("col" + d.code) || dmcName(d);
const num = n => n.toLocaleString(lang);

function countText(res, p) {
  if (mode === "cross") return t("cntStitches", { n: num(p.count) });
  if (mode === "line") return t("cntLine", { n: lineCm(res) });
  return t("cntArea", { n: Math.max(1, Math.round(p.count * 100 / (res.W * res.H))) });
}

function renderLegend(res) {
  const box = $("legend");
  box.innerHTML = "";
  res.pal.forEach(p => {
    const row = document.createElement("div");
    row.className = "thread";
    row.innerHTML = `<span class="sw"></span><b></b><span class="nm"></span><small></small>`;
    const sw = row.querySelector(".sw");
    sw.style.background = p.d.hex;
    sw.style.color = textColor(p.d);
    sw.textContent = mode === "cross" ? p.sym : p.num;
    row.querySelector("b").textContent = `DMC ${p.d.code}`;
    row.querySelector(".nm").textContent = mode === "line" ? lineColorName(p.d) : dmcName(p.d);
    row.querySelector("small").textContent = countText(res, p);
    box.appendChild(row);
  });
}

// ===== 그림 특징 분석 (기법 추천에 사용) =====
function analyze(k, res) {
  const W = Math.min(80, src.width), H = Math.max(1, Math.round(W * src.height / src.width)), n = W * H;
  const lab = pixels(W, H, 0);
  const pal = buildPalette(lab, n, k);
  const labels = assign(lab, n, pal);
  const labs = pal.map(d => DMC[d].lab);
  let boundary = 0, diff = 0, soft = 0, white = 0;
  for (let p = 0; p < n; p++) {
    const x = p % W, l = labels[p];
    if (isWhitish(DMC[pal[l]])) white++;
    let edge = false;
    [x < W - 1 ? p + 1 : -1, p + W < n ? p + W : -1].forEach(q => {
      if (q < 0 || labels[q] === l) return;
      edge = true; diff++;
      if (dE(labs[l], labs[labels[q]]) < 20) soft++;
    });
    if (edge) boundary++;
  }
  const { list } = components(labels, W, H);
  const dots = list.filter(c => c.area <= 3).length;
  const big = list.filter(c => c.area >= n * 0.04).reduce((s, c) => s + c.area, 0);
  const darkest = res.pal.reduce((a, b) => (b.d.lab[0] < a.d.lab[0] ? b : a), res.pal[0]);
  return {
    nColors: res.pal.length,
    edgeRatio: boundary / n,              // 색이 바뀌는 경계가 얼마나 많은지
    gradient: diff ? soft / diff : 0,     // 비슷한 색끼리 맞닿은 비율 (그러데이션)
    dotsPer1000: dots * 1000 / n,         // 작은 점 개수
    bigShare: big / n,                    // 넓은 면이 차지하는 비율
    whiteShare: white / n,
    darkest
  };
}

// ===== 기법 정보 =====
const S = "stroke='currentColor' stroke-width='3' stroke-linecap='round' fill='none'";
const TECH = {
  cross: {
    level: 1,
    svg: `<path ${S} d='M8 12l20 20M28 12L8 32M34 12l20 20M54 12L34 32M60 12l20 20M80 12L60 32'/>`
  },
  half: {
    level: 1,
    svg: `<path ${S} d='M8 32L28 12M34 32L54 12M60 32L80 12'/>`
  },
  back: {
    level: 1,
    svg: `<path ${S} d='M6 30l16-10M24 19l18-4M44 15l18 4M64 20l16 10'/>`
  },
  knot: {
    level: 2,
    svg: `<g fill='currentColor'><circle cx='20' cy='22' r='6'/><circle cx='44' cy='16' r='6'/><circle cx='66' cy='26' r='6'/></g>`
  },
  satin: {
    level: 2,
    svg: `<path ${S} stroke-width='2.4' d='M24 30l8-18M30 32l9-21M36 33l9-22M42 33l9-22M48 33l9-21M54 32l8-18'/>`
  },
  longshort: {
    level: 3,
    svg: `<path ${S} stroke-width='2.4' d='M14 6v16M22 6v10M30 6v16M38 6v10M46 6v16M54 6v10M62 6v16M70 6v10'/><path ${S} stroke-width='2.4' opacity='.55' d='M14 20v16M22 14v20M30 20v16M38 14v20M46 20v16M54 14v20M62 20v16M70 14v20'/>`
  },
  stem: {
    level: 1,
    svg: `<path ${S} d='M6 30l18-8M16 28l18-9M26 25l18-9M36 22l18-7M46 19l18-6M56 17l20-5'/>`
  },
  running: {
    level: 1,
    svg: `<path ${S} d='M6 22h12M26 22h12M46 22h12M66 22h14'/>`
  },
  chain: {
    level: 2,
    svg: `<g ${S} stroke-width='2.6'><ellipse cx='16' cy='22' rx='9' ry='6'/><ellipse cx='34' cy='22' rx='9' ry='6'/><ellipse cx='52' cy='22' rx='9' ry='6'/><ellipse cx='70' cy='22' rx='9' ry='6'/></g>`
  }
};

// 선 도안용 특징
function lineFeatures(res) {
  const total = res.nIn + res.nOut;
  return {
    outlineShare: total ? res.nOut / total : 1,           // 선 중 바깥 윤곽이 차지하는 비율
    density: res.area ? total / res.area : 0,             // 주인공 넓이에 비해 선이 얼마나 빽빽한지
    strands: +$("thick").value <= 2 ? 1 : +$("thick").value === 3 ? 2 : 3
  };
}

function recommendLine(res) {
  const f = lineFeatures(res), pct = v => Math.round(v * 100);
  const thread = t("threadStrands", { code: res.pal[0].d.code, s: f.strands });
  const c = [
    { key: "back", score: 50 + f.density * 700, why: t(f.density > 0.06 ? "wBackLineMany" : "wBackLineFew", { thread }) },
    { key: "stem", score: 40 + f.outlineShare * 60, why: t("wStemLine", { p: pct(f.outlineShare) }) },
    { key: "chain", score: f.density < 0.04 ? 65 : 20, why: t("wChainLine") },
    { key: "running", score: 30 + (1 - f.outlineShare) * 50, why: t("wRunningLine", { p: pct(1 - f.outlineShare) }) }
  ];
  return c.sort((a, b) => b.score - a.score).slice(0, 3);
}

// ===== 규칙으로 기법 고르기 =====
function recommend(f) {
  const pct = v => Math.round(v * 100);
  const name = dmcName(f.darkest.d);
  const dark = `DMC ${f.darkest.d.code}${name ? ` (${name})` : ""}`;
  const c = [];
  if (mode === "cross") {
    c.push({ key: "cross", score: 999, why: t("wCross", { n: f.nColors }) });
    c.push({ key: "back", score: 20 + f.edgeRatio * 220, why: f.edgeRatio > 0.25 ? t("wBackMany", { p: pct(f.edgeRatio), dark }) : t("wBackFew", { dark }) });
    c.push({ key: "half", score: f.gradient * 160 + (f.nColors >= 10 ? 15 : 0), why: f.gradient > 0.3 ? t("wHalfMany", { p: pct(f.gradient) }) : t("wHalfFew") });
    c.push({ key: "knot", score: f.dotsPer1000 * 6, why: t(f.dotsPer1000 > 5 ? "wKnotMany" : "wKnotSome") });
  } else {
    c.push({ key: "satin", score: 40 + (1 - f.bigShare) * 50, why: t(f.bigShare < 0.5 ? "wSatinMany" : "wSatinFew") });
    c.push({ key: "longshort", score: f.bigShare * 70 + f.gradient * 110, why: t(f.gradient > 0.3 ? "wLongshortGrad" : "wLongshort", { p: pct(f.bigShare) }) });
    c.push({ key: "stem", score: 35 + (f.edgeRatio < 0.25 ? 30 : 0), why: t(f.edgeRatio < 0.25 ? "wStemSimple" : "wStemMany") });
    c.push({ key: "back", score: 30 + f.edgeRatio * 150, why: t(f.edgeRatio > 0.25 ? "wBackFrMany" : "wBackFrSome", { p: pct(f.edgeRatio), dark }) });
    c.push({ key: "chain", score: f.nColors <= 5 ? 55 : 20, why: t("wChainFr", { n: f.nColors }) });
    c.push({ key: "knot", score: f.dotsPer1000 * 6, why: t("wKnotFr") });
  }
  return c.sort((a, b) => b.score - a.score).slice(0, 3);
}

function renderRecs(list) {
  const box = $("recs");
  box.innerHTML = "";
  list.forEach((r, i) => {
    const tech = { ...TECH[r.key], ...t("tech_" + r.key) };
    const el = document.createElement("article");
    el.className = "rec";
    el.innerHTML = `
      <div class="rec-head">
        <svg viewBox="0 0 88 44" aria-hidden="true">${tech.svg}</svg>
        <div>
          <span class="rank">${i === 0 ? t("rankTop") : t("rankMore")}</span>
          <h4>${tech.name}</h4>
          <span class="level">${t("levelWord")} ${"●".repeat(tech.level)}${"○".repeat(3 - tech.level)} · ${tech.use}</span>
        </div>
      </div>
      <p class="why"></p>
      <ol>${tech.steps.map(s => `<li>${s}</li>`).join("")}</ol>`;
    el.querySelector(".why").textContent = r.why;
    box.appendChild(el);
  });
}

// ===== 요약 =====
function renderLineSummary(res) {
  const f = lineFeatures(res), cm = lineCm(res);
  const skeins = Math.max(1, Math.ceil(cm * 2 * f.strands / 6 / 800));   // 6가닥 8m 한 타래 기준, 실은 선 길이의 약 2배
  const level = t(f.density < 0.05 ? "lvEasy" : f.density < 0.09 ? "lvMid" : "lvHard");
  const chips = [
    t(mask ? "chipBgCut" : "chipBgKept"),
    t("chipLineLen", { h: $("hoop").value, d: designCm(), n: cm }),
    t("chipLineThread", { name: lineColorName(res.pal[0].d), s: f.strands, k: skeins }),
    t("chipLevel", { l: level })
  ];
  $("summary").innerHTML = chips.map(c => `<span class="chip">${c}</span>`).join("");
  $("previewCaption").textContent = t(mask ? "capCut" : "capNoCut");
  $("chartCaption").textContent = t("capLine");
}

function renderSummary(res, f) {
  const chips = [t("chipColors", { n: f.nColors })];
  const lv = score => t(score <= 9 ? "lvEasy" : score <= 16 ? "lvMid" : "lvHard");
  let level;
  if (mode === "cross") {
    const stitches = res.pal.reduce((s, p) => s + p.count, 0);
    const cm = v => (v / 14 * 2.54).toFixed(1);
    const hours = Math.max(1, Math.round(stitches / 120));
    const score = f.nColors + stitches / 800;
    level = lv(score);
    chips.push(t("chipStitches", { n: num(stitches) }), t("chipSize", { w: cm(res.W), h: cm(res.H) }), t("chipTime", { n: hours }));
  } else {
    const regions = res.comps.list.length;
    const score = f.nColors + regions / 15;
    level = lv(score);
    chips.push(t("chipRegions", { n: regions }), t("chipFrThread"));
  }
  chips.push(t("chipLevel", { l: level }));
  $("summary").innerHTML = chips.map(c => `<span class="chip">${c}</span>`).join("");
  $("previewCaption").textContent = t("capPreview");
  $("chartCaption").textContent = t(mode === "cross" ? "capCross" : "capFrench");
}

// ===== 저장하기 =====
const title = () => t({ cross: "titleCross", french: "titleFrench", line: "titleLine" }[mode]);

// 도안 + 실 목록을 한 장의 이미지로
function buildExport() {
  const chart = $("chartCanvas"), res = lastRes;
  const pad = 24, rowH = 28, head = 64;
  const W = Math.max(chart.width, 560) + pad * 2;
  const cols = W >= 820 ? 2 : 1, colW = (W - pad * 2) / cols;
  const rows = Math.ceil(res.pal.length / cols);
  const out = document.createElement("canvas");
  out.width = W; out.height = head + chart.height + 56 + rows * rowH + pad;
  const ctx = out.getContext("2d");
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, out.width, out.height);
  ctx.fillStyle = "#24262b"; ctx.textBaseline = "middle";
  ctx.font = "bold 20px sans-serif";
  const sub = { cross: t("subCross", { w: res.W, h: res.H, n: res.pal.length }), french: t("subFrench", { n: res.pal.length }), line: t("subLine") };
  ctx.fillText(title(), pad, 26);
  ctx.font = "13px sans-serif"; ctx.fillStyle = "#6b6f78";
  ctx.fillText(`${sub[mode]} · ${t("brand")}`, pad, 48);
  ctx.drawImage(chart, pad, head);
  let y = head + chart.height + 28;
  ctx.fillStyle = "#24262b"; ctx.font = "bold 15px sans-serif";
  ctx.fillText(t("threadsTitle"), pad, y);
  y += 24;
  res.pal.forEach((p, i) => {
    const x = pad + (i % cols) * colW, yy = y + Math.floor(i / cols) * rowH;
    ctx.fillStyle = p.d.hex; ctx.fillRect(x, yy, 20, 20);
    ctx.strokeStyle = "#ccc"; ctx.strokeRect(x + 0.5, yy + 0.5, 19, 19);
    ctx.fillStyle = textColor(p.d); ctx.textAlign = "center"; ctx.font = "bold 12px sans-serif";
    ctx.fillText(mode === "cross" ? p.sym : p.num, x + 10, yy + 11);
    ctx.textAlign = "left"; ctx.fillStyle = "#24262b"; ctx.font = "13px sans-serif";
    const nm = mode === "line" ? lineColorName(p.d) : dmcName(p.d);
    ctx.fillText(`DMC ${p.d.code}  ${nm ? nm + "  ·  " : "·  "}${countText(res, p)}`, x + 28, yy + 11);
  });
  return out;
}

function exportPNG() {
  const out = buildExport();
  // 아이폰은 버튼을 누른 직후에만 공유창을 열 수 있어서, 기다리지 않고 바로 만들어요
  const bin = atob(out.toDataURL("image/png").split(",")[1]);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const name = t({ cross: "fileCross", french: "fileFrench", line: "fileLine" }[mode]);
  const file = new File([bytes], name, { type: "image/png" });
  const phone = matchMedia("(pointer: coarse)").matches;

  // 휴대폰: 공유창에서 '이미지 저장'을 고르면 사진 앱(갤러리)에 들어가요
  if (phone && navigator.canShare && navigator.canShare({ files: [file] })) {
    navigator.share({ files: [file], title: name }).catch(e => { if (e.name !== "AbortError") showSaveSheet(file); });
  } else if (phone) {
    showSaveSheet(file);
  } else {
    downloadFile(file);
  }
}

// ===== 실제 크기로 인쇄하기 =====
// 수틀 안쪽에 여유를 두고 도안 긴 쪽 길이(cm)를 정해요
const HOOP_DESIGN = { 10: 7, 12: 9, 15: 11, 18: 13, 20: 15 };
const PRINT_WIDTH = 19.4;   // A4(21cm)에서 여백 8mm씩 뺀 폭

function printPattern() {
  const area = $("printArea"), res = lastRes;
  area.innerHTML = "";
  const h1 = document.createElement("h1");
  h1.textContent = title();
  const meta = document.createElement("p");
  meta.className = "meta";
  const img = new Image();
  area.append(h1, meta);

  if (mode === "cross") {
    // 십자수는 칸을 세며 보는 도안이라 종이 폭에 맞춰요
    const cm = v => (v / 14 * 2.54).toFixed(1);
    meta.textContent = `${t("printCrossMeta", { w: res.W, h: res.H, cw: cm(res.W), ch: cm(res.H) })} · ${t("brand")}`;
    img.className = "full";
    img.src = buildExport().toDataURL("image/png");
    area.append(img);
  } else {
    // 프랑스 자수·선 도안은 천에 그대로 따라 그리도록 실제 크기로
    const hoop = +$("hoop").value, size = HOOP_DESIGN[hoop];
    const chart = $("chartCanvas"), aspect = chart.width / chart.height;
    const w = aspect >= 1 ? size : size * aspect, h = w / aspect;
    meta.textContent = `${t("printMeta", { hoop, w: w.toFixed(1), h: h.toFixed(1) })} · ${t("brand")}`;
    const stage = document.createElement("div");
    stage.className = "stage";
    const side = Math.min(hoop, PRINT_WIDTH);
    stage.style.width = stage.style.height = side + "cm";
    if (hoop <= PRINT_WIDTH) {
      const ring = document.createElement("span");
      ring.className = "hoop-ring";
      stage.append(ring);
    }
    img.style.width = w + "cm";
    img.style.height = h + "cm";
    img.src = chart.toDataURL("image/png");
    stage.append(img);
    // 인쇄 배율 확인용 5cm 자
    const scale = document.createElement("div");
    scale.className = "scale";
    scale.innerHTML = `<i style="width:5cm"></i><span></span>`;
    scale.querySelector("span").textContent = t("ruler");
    const list = document.createElement("ul");
    res.pal.forEach(p => {
      const li = document.createElement("li");
      const nm = mode === "line" ? lineColorName(p.d) : dmcName(p.d);
      li.textContent = `${mode === "french" ? t("numPrefix", { n: p.num }) : ""}DMC ${p.d.code} ${nm ? nm + " " : ""}· ${countText(res, p)}`;
      list.append(li);
    });
    area.append(stage, scale, list);
  }
  const go = () => window.print();
  (img.decode ? img.decode() : Promise.resolve()).then(go, go);
}

function downloadFile(file) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// 공유창을 못 여는 휴대폰: 이미지를 크게 띄워 길게 눌러 저장하게
function showSaveSheet(file) {
  const url = URL.createObjectURL(file);
  const box = document.createElement("div");
  box.className = "save-sheet";
  box.innerHTML = `<div class="box">
      <p>${t("sheetMsg")}</p>
      <img alt="">
      <div class="row"><button type="button" class="btn" data-act="file">${t("sheetFile")}</button>
      <button type="button" class="btn main" data-act="close">${t("sheetClose")}</button></div>
    </div>`;
  box.querySelector("img").src = url;
  box.onclick = e => {
    const act = e.target.dataset.act;
    if (act === "file") downloadFile(file);
    if (act === "close" || e.target === box) { box.remove(); URL.revokeObjectURL(url); }
  };
  document.body.appendChild(box);
}

// ===== 화면 갱신 =====
let renderId = 0, srcId = 0, maskKey = "";

function setStatus(text) {
  $("status").textContent = text;
  $("status").hidden = !text;
}

async function renderLine(id) {
  const want = $("bgRemove").checked ? `${srcId}:${JSON.stringify(taps)}` : "";
  if (want !== maskKey || !want) {
    mask = null;
    maskKey = "";
    setStatus("");
    if (want) {
      setStatus(t(segmenter ? "aiCutting" : "aiPrep"));
      await new Promise(r => setTimeout(r, 30));   // 안내 문구가 먼저 보이도록
      try {
        const m = await computeMask();
        if (id !== renderId) return false;
        mask = m; maskKey = want;
        setStatus("");
      } catch (e) {
        if (id !== renderId) return false;
        console.warn(e);
        setStatus(t("aiFail"));
      }
    }
  }
  const res = makeLine();
  lastRes = res;
  drawCutout($("previewCanvas"), res);
  drawLine($("chartCanvas"), res, +$("thick").value);
  renderLegend(res);
  renderLineSummary(res);
  renderRecs(recommendLine(res));
  return true;
}

async function render() {
  if (!src) return;
  const id = ++renderId;
  if (mode === "line") {
    if (!(await renderLine(id))) return;
    $("result").hidden = false;
    $("recommend").hidden = false;
    return;
  }
  setStatus("");
  const k = +$("colors").value;
  const res = mode === "cross" ? makeCross(k) : makeFrench(k);
  lastRes = res;
  if (mode === "cross") {
    drawPreview($("previewCanvas"), res);
    drawCross($("chartCanvas"), res);
  } else {
    drawFrench($("chartCanvas"), res, $("tint").checked);
  }
  renderLegend(res);
  const f = analyze(k, res);
  renderSummary(res, f);
  renderRecs(recommend(f));
  $("result").hidden = false;
  $("recommend").hidden = false;
}

let timer = null;
function rerender() {
  clearTimeout(timer);
  timer = setTimeout(render, 150);
}

function setMode(m) {
  mode = m;
  document.querySelectorAll("#modes button").forEach(b => b.classList.toggle("on", b.dataset.mode === m));
  document.querySelectorAll("[data-modes]").forEach(el => { el.hidden = !el.dataset.modes.split(" ").includes(m); });
  $("dots").hidden = m !== "line";
  $("printBtn").textContent = t(m === "cross" ? "printCross" : "printReal");
  render();
}

// 사진을 누르면 그 자리를 주인공으로
function drawDots() {
  $("dots").innerHTML = "";
  taps.forEach(t => {
    const d = document.createElement("span");
    d.className = "dot";
    d.style.left = t.x * 100 + "%";
    d.style.top = t.y * 100 + "%";
    $("dots").appendChild(d);
  });
}
function resetTaps() {
  taps = [{ x: 0.5, y: 0.5 }];
  autoTap = true;
  drawDots();
}
$("sourceImg").addEventListener("click", e => {
  const r = e.target.getBoundingClientRect();
  const pt = {
    x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
    y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
  };
  // 첫 번째로 누르면 가운데 자동 선택을 바꾸고, 그다음부터는 더하기
  taps = autoTap ? [pt] : [...taps, pt];
  autoTap = false;
  drawDots();
  if (mode === "line") render();
});

// ===== 시작 =====
$("camInput").addEventListener("change", e => { loadFile(e.target.files[0]); e.target.value = ""; });
$("fileInput").addEventListener("change", e => { loadFile(e.target.files[0]); e.target.value = ""; });
$("sampleBtn").onclick = sampleImage;
$("resetTaps").onclick = () => { resetTaps(); if (mode === "line") render(); };
document.querySelectorAll("#modes button").forEach(b => { b.onclick = () => setMode(b.dataset.mode); });
["colors", "width", "detail", "thick"].forEach(id => {
  $(id).addEventListener("input", () => { sliderLabel(id); rerender(); });
});
["skipWhite", "cleanup", "tint", "bgRemove", "lineColor", "hoop"].forEach(id => $(id).addEventListener("change", rerender));
$("downloadBtn").onclick = exportPNG;
$("printBtn").onclick = printPattern;
$("year").textContent = new Date().getFullYear();

// ===== 언어 바꾸기 =====
function sliderLabel(id) {
  const el = document.querySelector(`[data-for="${id}"]`);
  el.innerHTML = t(el.dataset.i18nN, { n: `<b>${$(id).value}</b>` });
}

function applyLang() {
  document.documentElement.lang = lang;
  document.title = t("docTitle");
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  ["colors", "width", "detail", "thick"].forEach(sliderLabel);
  document.querySelectorAll("option[data-col]").forEach(o => { o.textContent = `${t("col" + o.dataset.col)} (DMC ${o.dataset.col})`; });
  document.querySelectorAll("option[data-hoop]").forEach(o => { o.textContent = t("hoopOpt", { h: o.dataset.hoop, d: HOOP_DESIGN[o.dataset.hoop] }); });
  $("printBtn").textContent = t(mode === "cross" ? "printCross" : "printReal");
  $("langSelect").value = lang;
}

Object.entries(LANGS).forEach(([code, label]) => $("langSelect").add(new Option(label, code)));
$("langSelect").addEventListener("change", e => {
  lang = e.target.value;
  try { localStorage.setItem("lang", lang); } catch (err) {}
  applyLang();
  if (src) render();
});
applyLang();
