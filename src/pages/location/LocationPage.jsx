import React from 'react';
import NaverMap from '../../components/NaverMap';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FaMapMarkerAlt, FaPhoneAlt, FaSubway, FaBus } from 'react-icons/fa';

export default function LocationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <Breadcrumbs items={[{ label: '홈', to: '/' }, { label: '위치안내' }]} />

      <h1 className="text-3xl font-bold text-gray-900">위치안내</h1>

      <NaverMap />

      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 text-gray-800">
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-orange-500 mt-1" />
          <p className="text-lg">
            <strong className="block font-semibold text-gray-900">주소</strong>
            대구광역시 동구 아양로 239 (신암동 1545), 2층
          </p>
        </div>

        <div className="flex items-start gap-3">
          <FaPhoneAlt className="text-orange-500 mt-1" />
          <p className="text-lg">
            <strong className="block font-semibold text-gray-900">전화</strong>
            053-944-3355
          </p>
        </div>

        <div className="flex items-start gap-3">
          <FaSubway className="text-orange-500 mt-1" />
          <p className="text-lg">
            <strong className="block font-semibold text-gray-900">지하철</strong>
            아양교역 1번 출구 도보 5분
          </p>
        </div>

        <div className="flex items-start gap-3">
          <FaBus className="text-orange-500 mt-1" />
          <p className="text-lg">
            <strong className="block font-semibold text-gray-900">버스</strong>
            아양교역 / 효신타운 하차 후 도보 5분
          </p>
        </div>
      </div>
    </div>
  );
}
