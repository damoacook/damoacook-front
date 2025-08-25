import React, { useEffect, useRef } from "react";

function loadNaverScript() {
  if (window.naver?.maps) return Promise.resolve();
  if (window.__naverMapScriptPromise) return window.__naverMapScriptPromise;

  const key = import.meta.env.VITE_NAVER_MAP_KEY; // 도메인 제한 필수!
  const script = document.createElement("script");
  script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${key}`;
  script.async = true;

  window.__naverMapScriptPromise = new Promise((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = reject;
  });

  document.head.appendChild(script);
  return window.__naverMapScriptPromise;
}

/** 순수 지도만 렌더(스크롤/클릭 로딩은 상위에서 제어) */
export default function NaverMap({
  lat = 35.88699108738317,
  lng = 128.63887592530463,
  zoom = 16,
  height = 360,
  markerTitle = "다모아요리학원 (2층)",
}) {
  const boxRef = useRef(null);

  useEffect(() => {
    let map, marker, infowindow;
    loadNaverScript().then(() => {
      const naver = window.naver;
      const location = new naver.maps.LatLng(lat, lng);

      map = new naver.maps.Map(boxRef.current, {
        center: location,
        zoom,
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT,
        },
      });

      marker = new naver.maps.Marker({ map, position: location });
      infowindow = new naver.maps.InfoWindow({
        content: `
          <div style="padding:10px;max-width:220px;">
            <h4 style="margin-bottom:4px;">${markerTitle}</h4>
            <p style="font-size:12px;color:#555;">클릭하면 창이 닫혀요</p>
          </div>
        `,
        maxWidth: 240,
        borderWidth: 1,
      });

      naver.maps.Event.addListener(marker, "click", () => {
        if (infowindow.getMap()) infowindow.close();
        else infowindow.open(map, marker);
      });

      // 최초 한 번 열기
      infowindow.open(map, marker);
    });

    return () => {
      // 네이버맵은 언마운트 시 자동 GC 대상이라 별 처리 없어도 OK
    };
  }, [lat, lng, zoom, markerTitle]);

  return <div ref={boxRef} style={{ width: "100%", height }} />;
}
