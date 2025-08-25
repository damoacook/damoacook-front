import React from "react";
import { Link } from "react-router-dom";

const DEFAULT_FACILITIES = [
  {
    id: "main-lab",
    title: "1강의실",
    image: "/images/facilities/lab1_01.jpg",
    points: ["최신 설비", "개인 작업대", "충분한 동선"],
  },
  {
    id: "sub-lab",
    title: "2강의실",
    image: "/images/facilities/lab2_02.jpg",
    points: ["최신 설비", "개인 작업대", "충분한 동선"],
  },
  {
    id: "lounge-desk",
    title: "휴게실/안내데스크",
    image: "/images/facilities/lounge_02.jpg",
    points: ["휴식공간, 게시판", "수강생들을 위한 편의시설", "개인물품 보관"],
  },
  {
    id: "admin-office",
    title: "상담실/행정실",
    image: "/images/facilities/lounge_05.jpg",
    points: ["독립적인 상담공간", "1:1 상담"],
  },
];

export default function FacilityShowcaseHome({ facilities = DEFAULT_FACILITIES }) {
  const [active, setActive] = React.useState(0);
  const cur = facilities[active] ?? facilities[0];

  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 md:py-18">
        {/* 헤더 */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
              시설 소개
            </div>
            <h2 className="mt-2 text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
              한눈에 보는 다모아 시설
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              실습에 최적화된 공간 · 최신 설비 · 안전한 동선 설계
            </p>
          </div>
          <Link
            to="/about/facilities"
            className="hidden md:inline-flex text-sm text-gray-600 hover:text-gray-900"
          >
            전체 보기 →
          </Link>
        </div>

        {/* 메인 프리뷰 + 정보 카드 */}
        <div className="grid gap-6 md:grid-cols-5">
          {/* 메인 이미지 */}
          <div className="md:col-span-3">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-200">
              <div className="aspect-video w-full bg-gray-100">
                <img
                  src={cur.image}
                  alt={cur.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute left-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow">
                {cur.title}
              </div>
            </div>
          </div>

          {/* 정보 카드 */}
          <div className="md:col-span-2">
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">{cur.title}</h3>
              <ul className="mt-3 space-y-2">
                {cur.points?.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-800">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900/80" />
                    <span className="text-sm leading-7">{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/about/facilities"
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                시설 자세히 보기
              </Link>
            </div>
          </div>
        </div>

        {/* 썸네일 영역 — 모바일/데스크톱 레이아웃을 분리해 “겹침” 방지 */}
        <div className="mt-6">
          {/* 모바일: 가로 스크롤 스트립 */}
          <div className="md:hidden overflow-x-auto">
            <div className="flex gap-3 snap-x snap-mandatory">
              {facilities.map((f, i) => (
                <button
                  key={`m-${f.id}-${i}`} // ← 프리픽스+인덱스 추가(방어)
                  onClick={() => setActive(i)}
                  className={`snap-start relative flex-none w-[56%] max-w-[280px] overflow-hidden rounded-xl bg-white shadow-sm ${
                    i === active
                      ? "ring-2 ring-gray-900"
                      : "ring-1 ring-gray-200 hover:ring-gray-300"
                  }`}
                  aria-label={`${f.title} 썸네일`}
                >
                  <div className="aspect-[16/10] bg-gray-100">
                    <img
                      src={f.image}
                      alt={f.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute left-2 bottom-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-gray-800 shadow">
                    {f.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 데스크톱: 균등 그리드 */}
          <div className="hidden md:grid grid-cols-4 gap-4">
            {facilities.map((f, i) => (
              <button
                key={`d-${f.id}-${i}`} // ← 프리픽스+인덱스 추가(방어)
                onClick={() => setActive(i)}
                className={`relative overflow-hidden rounded-xl bg-white shadow-sm ${
                  i === active
                    ? "ring-2 ring-gray-900"
                    : "ring-1 ring-gray-200 hover:ring-gray-300"
                }`}
              >
                <div className="aspect-[16/10] bg-gray-100">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute left-2 bottom-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-gray-800 shadow">
                  {f.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 더보기 링크 (모바일 전용) */}
        <div className="mt-4 md:hidden">
          <Link
            to="/about/facilities"
            className="inline-flex text-sm text-gray-600 hover:text-gray-900"
          >
            전체 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
