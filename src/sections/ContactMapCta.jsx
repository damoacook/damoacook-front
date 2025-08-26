// src/sections/ContactMapCta.jsx
import React from "react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import MapWithPreview from "../components/MapWithPreview";

export default function ContactMapCta() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
          {/* 지도 (프리뷰 → 스크롤 진입/클릭 시 네이버 지도 로드) */}
          <div className="overflow-hidden rounded-2xl ring-1 ring-gray-200">
            <MapWithPreview
              lat={35.88699108738317}
              lng={128.63887592530463}
              title="다모아요리학원 (2층)"
              previewSrc="/images/map-placeholder.jpg" // 가벼운 JPG/WEBP 추천
              height={320}
              autoLoadOnView={true} // 뷰포트 들어오면 자동 로드
            />
          </div>

          {/* 연락/방문 안내 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-extrabold text-gray-900">상담·방문 안내</h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-800">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 text-orange-600" size={18} />
                <span>
                  <b className="text-gray-900">053-944-3355</b>{" "}
                  <span className="text-gray-500">(평일 10:00–18:00)</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 text-orange-600" size={18} />
                <span>
                  대구광역시 동구 아양로 239, <b className="text-gray-900">2층</b>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 text-orange-600" size={18} />
                <span>수업시간 외 상담 예약 가능</span>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="tel:053-944-3355"
                className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
              >
                전화하기
              </a>

              {/* 네이버 지도 길찾기 링크 (원하면 구글로 교체 가능) */}
              <a
                href="https://map.naver.com/v5/search/다모아요리학원"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                <Navigation size={16} />
                길찾기(네이버)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
