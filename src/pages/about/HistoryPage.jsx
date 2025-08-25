// src/sections/DamoaTimelineSection.jsx
import React from "react";
import { motion } from "framer-motion";

const YEAR_IMAGES = {
  2025: "/images/timeline/2025.jpg",
  2024: "/images/timeline/2024.jpg",
  2023: "/images/timeline/2023.jpg",
  2022: "/images/timeline/2022.jpg",
  2021: "/images/timeline/2021.jpg",
};

const TIMELINE = [
  {
    year: 2025,
    items: [
      "중소벤처기업부 표창장",
      "소상공인진흥공단 소상공인 업종특화교육 진행",
      "상반기 제 77회 조리기능장 2명 합격",
      "조리산업기사 5명 합격",
    ],
  },
  {
    year: 2024,
    items: [
      "한국조리기능장협회 최우수기능장상",
      "소상공인진흥공단 업종특화교육 ‘요리고수의 업장비법전수’ 진행",
      "제 75~76회 조리기능장 4명 합격",
      "조리산업기사 4명 합격",
    ],
  },
  {
    year: 2023,
    items: [
      "대한민국 향토식문화대전 대상 중소벤처기업부 장관상",
      "고용노동부 훈련기관 승인",
      "상서고등학교 산학협력 MOU",
      "대경대학교 산학협력 MOU",
      "제74회 하반기 조리기능장 합격자 배출",
      "제73회 상반기 조리기능장 합격자 배출",
    ],
  },
  {
    year: 2022,
    items: [
      "대한민국국제요리&제과경연대회 특별전시부문 대상 농림축산식품부 장관상",
      "대한민국국제요리&제과경연대회 라이브부문 금상",
      "수성대학교 가족회사 MOU",
      "제 72회 하반기 조리기능장 합격자 2명 배출(원패스 포함)",
    ],
  },
  {
    year: 2021,
    items: ["대한민국국제요리대회 환경부 장관상", "다모아요리학원 개원"],
  },
].sort((a, b) => b.year - a.year);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function DamoaTimelineSection() {
  return (
    <section className="relative">
      {/* 히어로 */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img
          src="/images/timeline/tl1.jpg"
          alt="기관 연혁 배경"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/70" />
        <div className="relative z-10 h-full flex items-end justify-center pb-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
              기관 연혁
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              조리기능장 전문 교육기관 · 연도별 주요 성과
            </p>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <ol className="space-y-16">
          {TIMELINE.map((block, idx) => {
            const isLeft = idx % 2 === 0;
            const img = YEAR_IMAGES[block.year];

            return (
              <li key={block.year} className="relative">
                {/* 중앙 세로선(해당 li 범위만) */}
                <div className="pointer-events-none absolute left-1/2 top-10 hidden h-[85%] w-px -translate-x-1/2 bg-orange-200/70 lg:block" />

                {/* 📱모바일 연도 배지: 상단에 먼저 배치 (겹침 방지) */}
                <div className="lg:hidden mb-4">
                  <span className="inline-block rounded-full bg-white px-3 py-1 text-lg font-bold text-gray-900 ring-1 ring-orange-200">
                    {block.year}
                  </span>
                </div>

                {/* 💻데스크톱 연도 배지: 중앙선 위, 충분한 여백 확보 */}
                <div className="hidden lg:flex justify-center relative mt-2 mb-8">
                  <span className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-[28px] font-extrabold tracking-tight text-gray-900 ring-2 ring-orange-200 shadow-sm">
                    {block.year}
                  </span>
                </div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  className="relative grid gap-6 lg:grid-cols-2 lg:gap-6 items-start"
                >
                  {isLeft ? (
                    <>
                      {/* 이미지 칼럼 (왼쪽) */}
                      <div className="relative self-start">
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-gray-200 bg-gray-100">
                          {img ? (
                            <img
                              src={img}
                              alt={`${block.year} 대표 이미지`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              {block.year} 이미지 (권장 1600×900)
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 텍스트 칼럼 (오른쪽) */}
                      <div className="relative self-start">
                        <div className="rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm p-6">
                          <ul className="space-y-2">
                            {block.items.map((txt, i) => (
                              <li key={i} className="flex gap-3 text-gray-800">
                                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500/80" />
                                <span className="leading-7">{txt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* 중앙선 연결 점 — 텍스트 칼럼의 왼쪽에 */}
                        <div
                          className="pointer-events-none absolute top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-orange-500 shadow ring-2 ring-white lg:block"
                          style={{ left: "-22px" }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 텍스트 칼럼 (왼쪽) */}
                      <div className="relative self-start">
                        <div className="rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm p-6">
                          <ul className="space-y-2">
                            {block.items.map((txt, i) => (
                              <li key={i} className="flex gap-3 text-gray-800">
                                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500/80" />
                                <span className="leading-7">{txt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* 중앙선 연결 점 — 텍스트 칼럼의 오른쪽에 */}
                        <div
                          className="pointer-events-none absolute top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-orange-500 shadow ring-2 ring-white lg:block"
                          style={{ right: "-22px" }}
                        />
                      </div>

                      {/* 이미지 칼럼 (오른쪽) */}
                      <div className="relative self-start">
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-gray-200 bg-gray-100">
                          {img ? (
                            <img
                              src={img}
                              alt={`${block.year} 대표 이미지`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              {block.year} 이미지 (권장 1600×900)
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </li>
            );
          })}
        </ol>

        <p className="mt-12 text-center text-xs text-gray-500">
          ※ 각 연도는 대표 사진 1장만 사용합니다. 이미지는 관리자에서 교체 가능합니다.
        </p>
      </div>
    </section>
  );
}
