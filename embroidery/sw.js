// ===== 사진 수틀: 인터넷 없이도 열리게 =====
// 페이지 파일은 "새 것 먼저, 안 되면 저장해 둔 것"으로 가져와서
// 홈페이지를 고치면 앱도 바로 새 버전이 됩니다.
// 글꼴과 AI 모델처럼 잘 안 바뀌는 큰 파일은 한 번 받아 두고 계속 씁니다.

const CACHE = "sajin-sutle-v1";
const PAGE = "/embroidery/pattern.html";

// 설치할 때 도안 페이지와, 그 페이지가 부르는 파일(버전 번호 포함)을 미리 저장
self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const res = await fetch(PAGE, { cache: "no-cache" });
    const html = await res.clone().text();
    await cache.put(PAGE, res);
    const files = [...html.matchAll(/(?:src|href)="([^"#:]+\.(?:js|css|png|svg|webmanifest)[^"]*)"/g)]
      .map(m => new URL(m[1], self.location.origin + PAGE).href);
    await Promise.all(files.map(f => cache.add(f).catch(() => {})));
    await self.skipWaiting();
  })());
});

// 예전 저장본 정리
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

// 한 번 받으면 계속 쓰는 바깥 파일: 글꼴, AI 프로그램, AI 모델
const LONG_LIVED = ["fonts.googleapis.com", "fonts.gstatic.com", "cdn.jsdelivr.net", "storage.googleapis.com"];

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (LONG_LIVED.includes(url.hostname)) {
    e.respondWith(cacheFirst(req));
  } else if (url.origin === self.location.origin && url.pathname.startsWith("/embroidery/")) {
    e.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  // 글꼴 목록(CSS)은 내용을 들여다볼 수 없는 형태(opaque)로 오지만, 그래도 저장해 둘 수 있어요
  if (res.ok || res.type === "opaque") (await caches.open(CACHE)).put(req, res.clone());
  return res;
}

async function networkFirst(req) {
  try {
    const res = await fetch(req);
    if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
    return res;
  } catch (err) {
    // 앱으로 열 때 붙는 ?app=1 같은 꼬리는 빼고 찾아보기
    const hit = await caches.match(req) || await caches.match(req, { ignoreSearch: req.mode === "navigate" });
    if (hit) return hit;
    if (req.mode === "navigate") return caches.match(PAGE);
    throw err;
  }
}
