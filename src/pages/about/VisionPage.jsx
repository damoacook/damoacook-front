// src/pages/AboutVisionPage.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Goal, Lightbulb, Sparkles, Ribbon, BookOpen, Building2,
  Users, CheckCircle2, Rocket, BriefcaseBusiness, GraduationCap
} from "lucide-react";

const fade = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

// ====================== 콘텐츠 (PPT 요약 반영) ======================
const VISION = "조리 기능 중심의 실무전문 교육을 선도하는 지역 대표 요리학원";

const CORE_VALUES = [
  { label: "성실", icon: CheckCircle2, desc: "기초·기본에 충실한 훈련과 태도" },
  { label: "전문", icon: GraduationCap, desc: "현장 중심의 전문기술 축적" },
  { label: "창의", icon: Lightbulb, desc: "창의성과 문제해결 기반의 실무" },
];

const MISSION = [
  "지역 사회와 산업체에 부응하는 조리 전문 직업인 양성",
  "실습 중심 커리큘럼으로 즉시 투입 가능한 인재 양성",
];

const GOALS = [
  "전문기술인 양성: 조리산업기사·조리기능장 중심",
  "글로벌 조리 인재: 창의성과 실무역량을 갖춘 창업형 인재",
  "실용적 현장 교육: 맞춤형 훈련 체계 확립",
];

const PRINCIPLES = [
  "훈련생 취·창업 지원에 최선",
  "원장-교·강사 협업 및 직무능력 개발 지원",
  "외식조리 실무경력 보유 교·강사진 구성",
  "현장 실무 중심의 안전한 교육환경 조성",
];

const PROGRAMS = [
  { area: "한식조리",    items: ["한식조리기능사(이론+실기)·실무", "한식조리산업기사(실기)", "한식 조리기능장(실기)"], level: "NCS 2·4·6 수준" },
  { area: "양식조리",    items: ["양식조리기능사(실기)"], level: "NCS 2 수준" },
  { area: "중식조리",    items: ["중식 조리기능장(실기)"], level: "NCS 6 수준" },
  { area: "떡제조",      items: ["떡제조기능사(실기)"], level: "NCS 2 수준" },
];

const ROADMAP = [
  {
    label: "초기 (2023)",
    bullets: [
      "신규기관 1년 인증 등급 달성",
      "상담실·휴게실 구축, 행정 인력 확보",
    ],
  },
  {
    label: "중기 (2024)",
    bullets: [
      "훈련기관 운영 전문성 강화, 과정 설명회 참여",
      "자격취득 강화 & 수요기반 과정 개발·홍보",
    ],
  },
  {
    label: "장기 (2025)",
    bullets: [
      "실적보유기관 3년 인증 달성",
      "산학협력 확대·취업처 강화",
      "대구·경북 ‘조리산업기사·조리기능장’ 전문학원 도약",
    ],
  },
];

// 헤더 배경 이미지 1장 (텍스트 뒤에만 사용)
const HERO_IMAGE = "/images/vision/vs1.jpg";

export default function AboutVisionPage() {
  return (
    <div className="relative">
      {/* ====== Hero (배경사진 + 흰색 그라데이션) ====== */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="기관 비전 배경"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/80" />
        <div className="relative z-10 flex h-full items-end justify-center pb-6">
          <div className="text-center px-4">
            <motion.h1
              variants={fade}
              initial="hidden"
              animate="show"
              className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900"
            >
              비전(VISION)
            </motion.h1>
            <motion.p
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-3 max-w-3xl mx-auto text-sm md:text-base text-gray-700"
            >
              {VISION}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ====== 본문 ====== */}
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16 space-y-14">

        {/* 핵심가치 */}
        <section>
          <header className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="size-5 text-orange-600" />
              핵심가치
            </h2>
            <p className="text-sm text-gray-500 mt-1">성실 · 전문 · 창의</p>
          </header>
          <div className="grid sm:grid-cols-3 gap-4">
            {CORE_VALUES.map(({ label, icon: Icon, desc }) => (
              <motion.div
                key={label}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow transition"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-grid size-10 place-items-center rounded-xl bg-orange-50 text-orange-700">
                    <Icon className="size-5" />
                  </span>
                  <div className="text-lg font-semibold">{label}</div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 미션 / 교육목표 */}
        <section className="grid lg:grid-cols-2 gap-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Goal className="size-5 text-orange-600" /> 교육목적(미션)
            </h3>
            <ul className="mt-3 space-y-2">
              {MISSION.map((m, i) => (
                <li key={i} className="flex gap-3 text-gray-800">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-orange-600/80 shrink-0" />
                  <span className="leading-7">{m}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Ribbon className="size-5 text-orange-600" /> 교육목표
            </h3>
            <ul className="mt-3 space-y-2">
              {GOALS.map((g, i) => (
                <li key={i} className="flex gap-3 text-gray-800">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-orange-600/80 shrink-0" />
                  <span className="leading-7">{g}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* 프로그램(전공영역) */}
        <section>
          <header className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="size-5 text-orange-600" />
              교육과정
            </h2>
            <p className="text-sm text-gray-500 mt-1">지역 산업 수요에 부응하는 실무 중심 과정</p>
          </header>
          <div className="grid md:grid-cols-2 gap-4">
            {PROGRAMS.map((p) => (
              <motion.div
                key={p.area}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-gray-900">{p.area}</div>
                  <span className="text-xs rounded-full bg-orange-50 text-orange-700 px-2 py-1 border border-orange-100">
                    {p.level}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-gray-700">
                  {p.items.map((it, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-[7px] h-1 w-1 rounded-full bg-gray-400 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 경영원칙 */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="size-5 text-orange-600" />
            경영원칙
          </h2>
          <ul className="mt-3 grid sm:grid-cols-2 gap-2">
            {PRINCIPLES.map((p, i) => (
              <li key={i} className="flex gap-3 text-gray-800">
                <Users className="mt-0.5 size-4 text-orange-600 shrink-0" />
                <span className="leading-7">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 로드맵 (초기/중기/장기) */}
        <section>
          <header className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Rocket className="size-5 text-orange-600" />
              발전 로드맵
            </h2>
            <p className="text-sm text-gray-500 mt-1">초기 → 중기 → 장기</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-4">
            {ROADMAP.map((step, idx) => (
              <motion.div
                key={step.label}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-orange-600/90 text-white text-sm font-semibold">
                    {idx + 1}
                  </span>
                  <div className="text-base font-semibold">{step.label}</div>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-gray-700">
                  {step.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <BriefcaseBusiness className="mt-[2px] size-4 text-orange-600 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
