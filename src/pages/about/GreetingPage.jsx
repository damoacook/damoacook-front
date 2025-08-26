// src/sections/DamoaGreetingSection.jsx
import { motion } from "framer-motion";
import { ArrowRight, ChefHat, Award, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

export default function DamoaGreetingSection() {
  return (
    <section className="relative overflow-hidden">
      {/* subtle background (화이트 톤 유지) */}
      <div className="absolute inset-0 -z-10 bg-white" />
      <div className="absolute inset-0 -z-10 opacity-[0.5]">
        {/* 아주 미세한 라디얼 하이라이트 */}
        <div className="h-full w-full bg-[radial-gradient(60%_40%_at_10%_5%,#f3f4f6_0%,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
              <Award size={16} className="text-orange-600" />
              <span>조리기능장 전문 학원</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              다모아요리학원에 오신 걸 환영합니다
            </h1>

            <p className="leading-8 text-gray-700">
              다모아 요리학원은 다년간의 교육 경험과 검증된 합격 노하우를 바탕으로
              <span className="mx-1 font-semibold text-gray-900">조리기능장 전문 교육기관</span>
              으로 자리매김했습니다. 최신 시험 경향을 반영한 커리큘럼과 실무형 실습으로
              자격 취득을 넘어 현장에서 통하는 조리 기술과 메뉴 개발 역량까지 함께 기릅니다.
              개인별 1:1 피드백, 충분한 실습 시간, 실전형 모의평가로 합격까지 체계적으로 지원합니다.
            </p>

            {/* 핵심 포인트 (뉴트럴 카드) */}
            <ul className="grid gap-3 text-gray-900 md:grid-cols-2">
              <li className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-200">
                <ChefHat className="mt-0.5 shrink-0 text-orange-600" />
                <div>
                  <p className="font-semibold">기능장 집중 커리큘럼</p>
                  <p className="text-sm text-gray-600">최신 출제 경향 분석과 단계별 실기 훈련</p>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-200">
                <UtensilsCrossed className="mt-0.5 shrink-0 text-orange-600" />
                <div>
                  <p className="font-semibold">실무형 실습 환경</p>
                  <p className="text-sm text-gray-600">충분한 연습을 위한 최신 설비·개별 실습 동선</p>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-200">
                <Award className="mt-0.5 shrink-0 text-orange-600" />
                <div>
                  <p className="font-semibold">합격까지 밀착관리</p>
                  <p className="text-sm text-gray-600">담임제 코칭, 1:1 피드백, 실전형 모의평가</p>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-200">
                <ArrowRight className="mt-0.5 shrink-0 text-orange-600" />
                <div>
                  <p className="font-semibold">경력 확장 지원</p>
                  <p className="text-sm text-gray-600">현장 적응·메뉴개발·포트폴리오 지도</p>
                </div>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/lectures"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                과정 살펴보기
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/inquiries"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                상담 문의
              </Link>
              <span className="text-xs text-gray-500">* 조리기능장반 상시 모집</span>
            </div>
          </motion.div>

          {/* 오른쪽 카드: 정보 블럭 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-md">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gray-900 text-white">
                  <ChefHat />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Damoa Culinary Academy</p>
                  <h3 className="text-xl font-bold text-gray-900">조리기능장 전문 학원</h3>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-gray-700">
                <p>• 기능장 실기 전 과목 커버 / 출제유형 집중 트레이닝</p>
                <p>• 개인별 체크리스트 기반 진도·숙련도 관리</p>
                <p>• 실제 시험 흐름과 동일한 타임테이블 모의평가</p>
                <p>• 재수강·보강 시스템으로 합격까지 책임 케어</p>
              </div>

              {/* 미니 스탯 */}
              <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-xl border border-gray-200 bg-white text-center text-sm text-gray-800">
                <div className="p-3">
                  <p className="font-extrabold">1:1</p>
                  <p className="text-xs text-gray-500">피드백</p>
                </div>
                <div className="border-l border-gray-200 p-3">
                  <p className="font-extrabold">실기</p>
                  <p className="text-xs text-gray-500">집중훈련</p>
                </div>
                <div className="border-l border-gray-200 p-3">
                  <p className="font-extrabold">모의</p>
                  <p className="text-xs text-gray-500">평가운영</p>
                </div>
              </div>

              {/* 강조 문구: 뉴트럴 링 그라데이션 */}
              <div className="mt-6 rounded-2xl p-[1px] bg-gradient-to-tr from-gray-200 to-gray-100">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-sm leading-7 text-gray-700">
                    오늘 시작하면 가장 빠르게 합격합니다. 다모아와 함께 여러분의 열정을 실력으로,
                    실력을 자격과 경력으로 연결하세요.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
