// src/pages/about/AboutLocationSection.jsx
import React from "react";
import NaverMap from "../../components/NaverMap";
import { MapPin, Phone, Train, Bus } from "lucide-react";

export default function AboutLocationSection() {
  return (
    <section className="space-y-8">
      {/* 지도 */}
      <div className="rounded-2xl overflow-hidden ring-1 ring-gray-200">
        <NaverMap height={420} markerTitle="다모아요리학원 (2층)" />
      </div>

      {/* 안내 카드 */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-gray-900">오시는 길</h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-800">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 text-orange-600" size={18} />
              <span>
                <b className="text-gray-900">주소</b><br />
                대구광역시 동구 아양로 239 (신암동 1545), 2층
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 text-orange-600" size={18} />
              <span>
                <b className="text-gray-900">전화</b><br />
                053-944-3355
              </span>
            </li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href="https://map.naver.com/p/search/%EB%8B%A4%EB%AA%A8%EC%95%84%EC%9A%94%EB%A6%AC%ED%95%99%EC%9B%90"
              target="_blank" rel="noreferrer"
              className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
            >
              네이버지도 길찾기
            </a>
            <a
              href="https://maps.google.com/?q=%EB%8B%A4%EB%AA%A8%EC%95%84%EC%9A%94%EB%A6%AC%ED%95%99%EC%9B%90"
              target="_blank" rel="noreferrer"
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              구글지도 열기
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-gray-900">대중교통 안내</h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-800">
            <li className="flex items-start gap-3">
              <Train className="mt-0.5 text-orange-600" size={18} />
              <span>
                <b className="text-gray-900">지하철</b><br />
                아양교역 1번 출구 도보 5분
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bus className="mt-0.5 text-orange-600" size={18} />
              <span>
                <b className="text-gray-900">버스</b><br />
                아양교역 / 효신타운 하차 후 도보 5분
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 text-orange-600" size={18} />
              <span>
                <b className="text-gray-900">주차</b><br />
                학원 주변 공영/유료주차장 이용 권장
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
