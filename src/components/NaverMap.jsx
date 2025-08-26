import React, { useEffect, useRef } from "react";
import { loadNaverScript } from "../lib/naverMapLoader";

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
          infowindow.getMap() ? infowindow.close() : infowindow.open(map, marker);
        });

        infowindow.open(map, marker);
      })
      .catch((err) => {
        console.error("[NAVER MAPS] 스크립트 로드 실패:", err);
      });

    return () => {
      // 네이버맵은 언마운트 시 GC 대상 — 별도 정리 필요 없음
    };
  }, [lat, lng, zoom, markerTitle]);

  return <div ref={boxRef} style={{ width: "100%", height }} />;
}