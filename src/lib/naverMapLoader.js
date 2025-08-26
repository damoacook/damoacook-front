export function loadNaverScript() {
  if (window.naver?.maps) return Promise.resolve();
  if (window.__naverMapScriptPromise) return window.__naverMapScriptPromise;

  // 환경변수: Vercel/로컬 둘 다 빌드 타임에 주입됨
  // (둘 중 아무거나 쓰도록 폴백도 걸어둠)
  const key =
    (import.meta.env.VITE_NAVER_MAP_KEY_ID ||
      import.meta.env.VITE_NAVER_MAP_CLIENT_ID || // 혹시 기존 이름을 쓰고 있다면
      "").trim();

  if (!key) {
    const msg = "[NAVER MAPS] VITE_NAVER_MAP_KEY_ID 가 비어 있습니다.";
    console.error(msg);
    return Promise.reject(new Error(msg));
  }

  // (선택) 서브모듈 ex) geocoder, drawing 등
  const submodules = (import.meta.env.VITE_NAVER_MAP_SUBMODULES || "").trim();

  // 인증 실패 콜백(문서 권장)
  if (!window.navermap_authFailure) {
    window.navermap_authFailure = function () {
      console.error(
        "[NAVER MAPS] 인증 실패: Key ID 또는 웹 서비스 URL(도메인) 화이트리스트를 확인하세요."
      );
    };
  }

  const script = document.createElement("script");
  script.id = "naver-maps-script";
  script.async = true;
  script.src =
    "https://oapi.map.naver.com/openapi/v3/maps.js" +
    `?ncpKeyId=${encodeURIComponent(key)}` + // ✅ 최신 파라미터
    (submodules ? `&submodules=${encodeURIComponent(submodules)}` : "");

  window.__naverMapScriptPromise = new Promise((resolve, reject) => {
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", reject, { once: true });
  });

  document.head.appendChild(script);
  return window.__naverMapScriptPromise;
}