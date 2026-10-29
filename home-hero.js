// ===== 첫 화면 수놓는 영상 =====
// 소리 없이 반복 재생하고, 화면에 보일 때만 움직여요.
// '움직임 줄이기'나 '데이터 절약'을 켠 휴대폰에서는 처음부터 멈춘 사진(포스터)만 보여요.
// 오른쪽 아래 단추로 언제든 멈추거나 다시 틀 수 있어요.

(() => {
  const video = document.querySelector(".hero video");
  const btn = document.querySelector(".hero .vid-btn");
  if (!video || !btn) return;

  const quiet = matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData;
  let wanted = !quiet;   // 보는 사람이 틀어 두기를 원하는지
  let visible = false;

  function label() {
    const d = HOME[document.documentElement.lang] || HOME.ko;
    btn.dataset.state = video.paused ? "play" : "pause";
    btn.setAttribute("aria-label", d[video.paused ? "vidPlay" : "vidPause"]);
  }
  function sync() {
    if (wanted && visible) video.play().catch(() => {});
    else video.pause();
  }

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.25 }).observe(video);
  btn.addEventListener("click", () => { wanted = video.paused; if (wanted) video.play().catch(() => {}); else video.pause(); });
  video.addEventListener("play", label);
  video.addEventListener("pause", label);
  document.addEventListener("langchange", label);
  btn.hidden = false;
  // 처음부터 화면 안에 있으면 관찰 결과를 기다리지 않고 바로 틀기
  const r = video.getBoundingClientRect();
  visible = r.top < innerHeight && r.bottom > 0;
  sync();
  label();
})();
