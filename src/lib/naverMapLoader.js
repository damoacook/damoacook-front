export function loadNaverScript() {
  if (window.naver?.maps) return Promise.resolve();
  if (window.__naverMapScriptPromise) return window.__naverMapScriptPromise;

  const cid = import.meta.env.VITE_NAVER_MAP_CLIENT_ID; // ✅ 이름 통일
  if (!cid) {
    console.error('VITE_NAVER_MAP_CLIENT_ID 가 비어 있습니다.');
    return Promise.reject(new Error('Missing NAVER MAP client id'));
  }

  const script = document.createElement("script");
  script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${cid}`; // ✅ ncpClientId
  script.async = true;

  window.__naverMapScriptPromise = new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
  });

  document.head.appendChild(script);
  return window.__naverMapScriptPromise;
}