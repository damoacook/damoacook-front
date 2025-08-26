export function loadNaverScript() {
  if (window.naver?.maps) return Promise.resolve();
  if (window.__naverMapScriptPromise) return window.__naverMapScriptPromise;

  const key = import.meta.env.VITE_NAVER_MAP_KEY; // ← 이름 통일
  if (!key) {
    console.error("VITE_NAVER_MAP_KEY가 비어 있음");
    return Promise.reject(new Error("Missing NAVER MAP Key"));
  }

  const script = document.createElement("script");
  script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${key}&submodules=geocoder`;
  script.async = true;

  // 인증 실패 디버깅용 훅
  window.navermap_authFailure = function () {
    console.error("[NAVER MAPS] 인증 실패: 키/도메인을 확인하세요.");
  };

  window.__naverMapScriptPromise = new Promise((res, rej) => {
    script.onload = res;
    script.onerror = rej;
  });
  document.head.appendChild(script);
  return window.__naverMapScriptPromise;
}