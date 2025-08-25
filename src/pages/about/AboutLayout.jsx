import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  Building2,
  History,
  Goal,
  Handshake,
  LayoutGrid,
  MapPin,
} from "lucide-react";

const TABS = [
  { slug: "greeting",  label: "인사말",     Icon: Handshake },
  { slug: "history",   label: "연혁",       Icon: History   },
  { slug: "facilities",label: "시설 소개",  Icon: LayoutGrid},
  { slug: "vision",    label: "비전",       Icon: Goal      },
  { slug: "partners",  label: "협력업체",   Icon: Building2 },
  { slug: "location",   label: "위치안내",   Icon: MapPin    },
];

export default function AboutLayout() {
  const { pathname } = useLocation();

  return (
    <section className="relative">
      {/* 공통 히어로 (흰색 그라데이션 오버레이) */}
      <div className="relative overflow-hidden">
        <img
          src="/images/학원소개.jpg"     // ← 자유 교체
          alt="학원 소개"
          className="absolute inset-0 h-56 md:h-72 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/70" />
        <div className="relative z-10 mx-auto max-w-6xl h-56 md:h-72 px-6 flex items-end">
          <div className="pb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
              학원 소개
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              다모아요리학원의 이야기, 연혁과 시설, 파트너까지 한눈에
            </p>
          </div>
        </div>
      </div>

      {/* 스티키 탭 내비 */}
      <div className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-2 sm:px-6">
          <nav className="flex gap-2 overflow-x-auto py-2">
            {TABS.map(({ slug, label, Icon }) => (
              <NavLink
                key={slug}
                to={slug}
                className={({ isActive }) =>
                  [
                    "group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                    isActive
                      ? "bg-orange-50 text-orange-700 ring-1 ring-orange-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  ].join(" ")
                }
              >
                <Icon size={16} className="shrink-0" />
                <span className="whitespace-nowrap">{label}</span>
                {/* 액티브 언더라인 */}
                <span className="pointer-events-none absolute left-4 right-4 -bottom-[9px] h-0.5 rounded-full bg-orange-500 opacity-0 group-[.active]:opacity-100 group-hover:opacity-60" />
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* 페이지 컨텐츠 */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <Outlet key={pathname} />
      </div>
    </section>
  );
}
