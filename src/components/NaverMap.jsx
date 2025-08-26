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
        if (infowindow.getMap()) infowindow.close();
        else infowindow.open(map, marker);
      });

      infowindow.open(map, marker);
    });
  }, [lat, lng, zoom, markerTitle]);

  return <div ref={boxRef} style={{ width: "100%", height }} />;
}