import React from "react";
import { ChevronLeft, ChevronRight, Flame, Wrench, Droplets, Users, Ruler } from "lucide-react";

/** 시설 데이터 (이미지 경로만 네가 쓰는 파일로 맞춰줘) */
const FACILITIES = [
  {
    key: "lab1",
    name: "1실습실 & 강의실",
    desc: "데모 테이블과 프로젝터, 인덕션/가스 화구가 결합된 실전형 실습실입니다.",
    images: [
      "/images/facilities/lab1_01.jpg",
      "/images/facilities/lab1_02.jpg",
      "/images/facilities/lab1_03.jpg",
      "/images/facilities/lab1_04.jpg",
      "/images/facilities/lab1_05.jpg",
    ],
    points: [
      "대형 데모 테이블 + 프로젝터",
      "환기/소화 안전 설비 기준 준수",
      "실전 시험 장비에 맞춘 훈련시설",
    ],
  },
  {
    key: "lab2",
    name: "2실습실 & 강의실",
    desc: "팀별 조리 동선에 최적화된 배치로 시험 동선을 그대로 훈련할 수 있습니다.",
    images: [
      "/images/facilities/lab2_01.jpg",
      "/images/facilities/lab2_02.jpg",
      "/images/facilities/lab2_03.jpg",
      "/images/facilities/lab2_04.jpg",
      "/images/facilities/lab2_05.jpg",
    ],
    points: ["조리동선 최적화", "환기/소화 안전 설비 기준 준수", "실전 시험 장비에 맞춘 훈련시설"],
  },
  {
    key: "lounge",
    name: "라운지 / 안내데스크",
    desc: "상담·접수와 휴식이 가능한 공용 공간입니다.",
    images: [
      "/images/facilities/lounge_01.jpg",
      "/images/facilities/lounge_02.jpg",
      "/images/facilities/lounge_03.jpg",
      "/images/facilities/lounge_04.jpg",
      "/images/facilities/lounge_05.jpg",
    ],
    points: ["수강 상담 / 접수", "개인물품 보관", "휴식공간 · 게시판 안내"],
  },
];

const STATS = [
  { label: "실습실", value: "2개", icon: Wrench },
  { label: "좌석 수", value: "30석", icon: Users },
  { label: "조리대", value: "12개", icon: Ruler },
  { label: "가스 화구", value: "24구", icon: Flame },
  { label: "세척 라인", value: "독립 구역", icon: Droplets },
];

export default function AboutFacilitiesPage() {
  const [activeFacilityIndex, setActiveFacilityIndex] = React.useState(0);
  const activeFacility = FACILITIES[activeFacilityIndex];

  const [activePhotoIndex, setActivePhotoIndex] = React.useState(0);

  // 시설 변경 시 사진 인덱스 초기화
  React.useEffect(() => {
    setActivePhotoIndex(0);
  }, [activeFacilityIndex]);

  const prevPhoto = () => {
    setActivePhotoIndex((i) =>
      i === 0 ? activeFacility.images.length - 1 : i - 1
    );
  };
  const nextPhoto = () => {
    setActivePhotoIndex((i) =>
      i === activeFacility.images.length - 1 ? 0 : i + 1
    );
  };

  return (
    <div className="space-y-10">
      {/* 헤더 */}
      <header className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
          기관 시설 소개
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          실전 시험 기준에 맞춘 실습 환경과 안전·위생 설비를 갖춘 교육공간
        </p>
      </header>

      {/* 핵심 지표 - 카드 */}
      {/* <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow transition"
          >
            <div className="flex items-center gap-3">
              <span className="inline-grid h-10 w-10 place-items-center rounded-xl bg-orange-600/90 text-white">
                <Icon size={18} />
              </span>
              <div>
                <div className="text-xs text-gray-500">{label}</div>
                <div className="text-xl font-bold text-gray-900">{value}</div>
              </div>
            </div>
          </div>
        ))}
      </section> */}

      {/* 시설 탭 (칩) */}
      <nav className="flex gap-2 overflow-x-auto pb-1">
        {FACILITIES.map((f, idx) => {
          const active = idx === activeFacilityIndex;
          return (
            <button
              key={f.key}
              onClick={() => setActiveFacilityIndex(idx)}
              className={[
                "rounded-full px-4 py-2 text-sm whitespace-nowrap transition",
                active
                  ? "bg-orange-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
              ].join(" ")}
              aria-pressed={active}
            >
              {f.name}
            </button>
          );
        })}
      </nav>

      {/* 큰 미리보기 (가로형) */}
      <section className="relative">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl ring-1 ring-gray-200 bg-gray-100">
          {activeFacility.images[activePhotoIndex] ? (
            <img
              src={activeFacility.images[activePhotoIndex]}
              alt={`${activeFacility.name} 미리보기`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
              1600×900 이상 가로형 이미지를 권장합니다.
            </div>
          )}
        </div>

        {/* 좌/우 화살표 */}
        {activeFacility.images.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              aria-label="이전 사진"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow ring-1 ring-gray-200 hover:bg-white"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextPhoto}
              aria-label="다음 사진"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow ring-1 ring-gray-200 hover:bg-white"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </section>

      {/* 썸네일 스트립 */}
      {activeFacility.images.length > 1 && (
        <div className="mt-4 -mx-1">
          <div className="flex gap-3 overflow-x-auto px-1 py-1 snap-x snap-mandatory overscroll-x-contain">
            {activeFacility.images.map((src, i) => {
              const active = i === activePhotoIndex;
              return (
                <button
                  key={src + i}
                  onClick={() => setActivePhotoIndex(i)}
                  className={[
                    // 고정 크기 + 줄바꿈/축소 방지
                    "relative shrink-0 snap-start",
                    "w-[160px] h-[96px]", // 16:9 비율(가로 160px, 세로 96px)
                    "overflow-hidden rounded-xl ring-1 transition",
                    active
                      ? "ring-2 ring-orange-400"
                      : "ring-gray-200 hover:ring-gray-300",
                  ].join(" ")}
                  aria-current={active ? "true" : "false"}
                >
                  <img
                    src={src}
                    alt={`${activeFacility.name} 썸네일 ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 설명/포인트 (한 박스) */}
      <section className="rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm p-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
          {activeFacility.name}
        </h3>
        {activeFacility.desc && (
          <p className="mt-2 text-sm text-gray-700">{activeFacility.desc}</p>
        )}
        {activeFacility.points?.length > 0 && (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {activeFacility.points.map((p, i) => (
              <li key={i} className="flex gap-3 text-gray-800">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500/80" />
                <span className="leading-7">{p}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 안내문 */}
      <p className="text-xs text-gray-500">
        ※ 사진은 대표 컷으로, 배치·장비는 수업 운영에 따라 일부 변경될 수 있습니다.
        {/* 가로형(권장 1600×900) 이미지를 사용하면 가장 깔끔하게 보입니다. */}
      </p>
    </div>
  );
}
