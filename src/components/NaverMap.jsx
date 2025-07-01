import React, { useEffect } from 'react';

const NaverMap = () => {
  useEffect(() => {
    const script = document.createElement('script');
    const key = import.meta.env.VITE_NAVER_MAP_KEY;

    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${key}`;
    script.async = true;
    script.onload = () => {
      const HOME_PATH = '.'; // 이미지 경로 기준 (public 폴더 기준)

      const location = new naver.maps.LatLng(35.88699108738317, 128.63887592530463 ); // 아양로 239

      const map = new naver.maps.Map('map', {
        center: location,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT,
        },
      });

      const marker = new naver.maps.Marker({
        map: map,
        position: location,
      });

      const contentString = `
        <div style="padding:10px; max-width:200px;">
          <h4 style="margin-bottom:5px;">다모아 요리학원 <strong>2층</strong></h4>
          </p>
        </div>
      `;

      const infowindow = new naver.maps.InfoWindow({
        content: contentString,
        maxWidth: 240,
        borderWidth: 1,
      });

      // 마커 클릭 시 정보창 열기
      naver.maps.Event.addListener(marker, 'click', () => {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);
        }
      });

      // 최초에 자동으로 열기
      infowindow.open(map, marker);
    };

    document.head.appendChild(script);
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default NaverMap;
