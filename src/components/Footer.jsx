// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

const BIZ = {
  name: "다모아요리학원",
  ceo: "고평현",
  privacyOfficer: "고평현",
  bizNo: "282-95-01382",
  address: "대구광역시 동구 아양로 239 (신암동 1545), 2층",
  email: "damoacook@naver.com",
  tel: "053-944-3355",
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-orange-50/40 border-t border-orange-100 text-gray-700">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        {/* 상단 영역 */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* 브랜드/소셜 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src="/images/다모아요리학원로고.jpg"
                alt={BIZ.name}
                className="h-8 w-auto rounded-md"
              />
              <span className="text-lg font-extrabold tracking-tight text-gray-900">
                {BIZ.name}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              실무형 조리 교육 전문 학원
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com/damoacook/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm hover:text-orange-700"
              >
                <Instagram className="h-4 w-4" />
                인스타그램
              </a>
              <span className="text-gray-300">·</span>
              <a
                href="https://www.facebook.com/profile.php?id=100075340492919"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm hover:text-orange-700"
              >
                <Facebook className="h-4 w-4" />
                페이스북
              </a>
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-900">연락처</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-[2px] h-4 w-4 text-orange-600" />
                <span>{BIZ.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-600" />
                <a href={`tel:${BIZ.tel}`} className="hover:underline">
                  {BIZ.tel}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-600" />
                <a href={`mailto:${BIZ.email}`} className="hover:underline">
                  {BIZ.email}
                </a>
              </li>
            </ul>
          </div>

          {/* 정책/사업자 고지 */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-900">정책 & 고지</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <Link to="/privacy" className="underline underline-offset-2 hover:text-orange-700">
                개인정보 처리방침
              </Link>
              {/* 필요 시 여기에 /terms, /cookies 추가 */}
            </div>

            <div className="mt-4 space-y-1 text-xs text-gray-500">
              <p>상호: {BIZ.name}</p>
              <p>대표자: {BIZ.ceo} · 개인정보보호책임자: {BIZ.privacyOfficer}</p>
              <p>사업자등록번호: {BIZ.bizNo}</p>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="mt-8 h-px w-full bg-orange-100" />

        {/* 하단 바 */}
        <div className="mt-4 flex flex-col items-center justify-between gap-2 text-xs text-gray-500 md:flex-row">
          <p>ⓒ {year}. {BIZ.name}. All rights reserved.</p>
          <p>콘텐츠 무단 복제·배포 금지</p>
        </div>
      </div>
    </footer>
  );
}
