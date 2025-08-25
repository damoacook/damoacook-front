// src/pages/AboutPartnersPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

const HERO_IMAGE = "/images/partners/pt1.jpg";
const CATS = ["전체", "교육기관·학교", "공공·유관", "기업·브랜드", "연구소"];

const PARTNERS = [
  { id: 1,  name: "한국조리기능장협회",  category: "공공·유관",     logo: "/images/partners/kfma.png",         tag: "전문자격·교류",
    desc: "조리기능장 역량 교류 및 전문교육 협력." },
  { id: 2,  name: "대경대학교",          category: "교육기관·학교", logo: "/images/partners/대경대로고.png",   tag: "산학협력 MOU",
    desc: "현장실습·교육 프로그램 공동 운영." },
  { id: 3,  name: "수성대학교",          category: "교육기관·학교", logo: "/images/partners/수성대로고.png",   tag: "가족회사 MOU",
    desc: "교육-현장 연계 강화 및 진로연계." },
  { id: 4,  name: "상서고등학교",        category: "교육기관·학교", logo: "/images/partners/상서고로고.jpg",   tag: "교육 교류",
    desc: "조리 분야 진로·체험 교류." },
  { id: 5,  name: "YWCA 대구여성인력개발센터", category: "공공·유관", logo: "/images/partners/ywca로고.jpeg",   tag: "위탁교육",
    desc: "‘한분식 취창업전문가 과정’ 위탁 운영." },
  { id: 6,  name: "소상공인시장진흥공단", category: "공공·유관",    logo: "/images/partners/semas.png",        tag: "업종특화",
    desc: "소상공인 업종특화교육 공동 진행." },
  { id: 7,  name: "호산대학교",          category: "교육기관·학교", logo: "/images/partners/호산대로고.webp",  tag: "교육 협력",
    desc: "교육 프로그램 협력." },
  { id: 8,  name: "대구가톨릭대학교",    category: "교육기관·학교", logo: "/images/partners/대가대로고.jpeg",  tag: "교육 협력",
    desc: "교육 프로그램 협력." },
  { id: 9,  name: "이런연구소",          category: "연구소",        logo: "/images/partners/이런연구소.png",   tag: "컨설팅·리서치",
    desc: "교육·메뉴개발 R&D 협업." },
  { id: 10, name: "온오븐",              category: "기업·브랜드",   logo: "/images/partners/온오븐로고.jpg",   tag: "브랜드 협업",
    desc: "실무 협업 및 재료·장비 지원." },
  { id: 11, name: "토종생오리",          category: "기업·브랜드",   logo: "/images/partners/토종생오리.png",   tag: "브랜드 협업",
    desc: "실무 협업 및 식자재 연계." },
  { id: 12, name: "향토음식진흥원",      category: "공공·유관",     logo: "",                                   tag: "전통음식 진흥",
    desc: "향토음식 보존·활성화 협력." },
  { id: 13, name: "서부요리학원",        category: "교육기관·학교", logo: "",                                   tag: "교육 협력",
    desc: "교육 프로그램·정보 교류." },
  { id: 14, name: "이화선의 청송미담",   category: "기업·브랜드",   logo: "",                                   tag: "브랜드 협업",
    desc: "레스토랑·브랜드 협업." },
];

const fade = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

function LogoBox({ name, src }) {
  const [error, setError] = React.useState(!src);
  return (
    <div className="rounded-xl ring-1 ring-gray-100 grid place-items-center overflow-hidden h-20 sm:h-24 bg-white">
      {!error ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setError(true)}
          className="max-h-14 sm:max-h-16 w-auto object-contain transition-transform group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <span className="px-3 text-center font-semibold text-gray-700 text-base leading-6 line-clamp-2">
            {name}
          </span>
        </div>
      )}
    </div>
  );
}

export default function AboutPartnersPage() {
  const [cat, setCat] = React.useState("전체");
  const [q, setQ] = React.useState("");

  const items = PARTNERS.filter(
    (p) => (cat === "전체" || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative h-56 md:h-72 overflow-hidden">
        <img src={HERO_IMAGE} alt="협력 네트워크" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/75" />
        <div className="relative z-10 flex h-full items-end justify-center pb-6">
          <div className="text-center px-4">
            <motion.h1 variants={fade} initial="hidden" animate="show" className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
              협력 네트워크
            </motion.h1>
            <motion.p variants={fade} initial="hidden" animate="show" className="mt-2 text-sm md:text-base text-gray-600">
              산학·공공·교육 파트너와 함께 만드는 실무중심 교육
            </motion.p>
          </div>
        </div>
      </section>

      {/* 컨트롤 바 */}
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-sm text-gray-600">
              <Filter className="size-4" /> 카테고리
            </span>
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  cat === c ? "border-orange-300 bg-orange-50 text-orange-700" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="search"
              placeholder="협력기관 검색"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full md:w-64 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>
      </div>

      {/* 로고 그리드 — 📱모바일 1컬럼 */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        {items.length === 0 ? (
          <p className="py-16 text-center text-gray-500">조건에 맞는 협력업체가 없습니다.</p>
        ) : (
          <motion.ul
            variants={{ show: { transition: { staggerChildren: 0.04 } } }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {items.map((p) => (
              <motion.li key={p.id} variants={fade}>
                <div className="group w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition" title={p.name}>
                  <LogoBox name={p.name} src={p.logo} />
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 line-clamp-1">{p.name}</span>
                      {p.tag && (
                        <span className="text-[11px] rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-orange-700">
                          {p.tag}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{p.category}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-white p-6 text-center">
          <p className="text-sm text-gray-600">파트너 제안 및 산학협력 문의</p>
          <p className="mt-1 text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">053-944-3355</p>
        </div>
      </section>

      {/* 업로드 가이드 */}
      <div className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-xs text-gray-500">
          <p className="font-medium text-gray-700">로고 업로드 가이드</p>
          <ul className="mt-1.5 list-disc pl-5 space-y-0.5">
            <li>투명 배경 PNG 또는 SVG 권장</li>
            <li>가로형 400×200px 권장(최대 1MB)</li>
            <li>여백(패딩) 포함된 로고가 더 균일하게 보입니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
