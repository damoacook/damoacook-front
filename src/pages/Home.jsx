// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainBannerSlider from "../components/MainBannerSlider";
import MenuBox from "../components/MenuBox";
import PopupBanner from "../components/PopupBanner";
import LectureCard from "../components/LectureCard";
import { FaBook, FaSchool, FaImages, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import axios from "axios";
import { fetchAcademyLectures, fetchHrdLectures } from "../api/lectures";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { fetchNewsList } from "../api/news";
import { fetchGalleryList } from "../api/gallery";
import "swiper/css";
import "swiper/css/navigation";
import FacilityShowcaseHome from "../sections/FacilityShowcaseHome";
import InquiryCtaSection from "../sections/InquiryCtaSection";
import PartnersSection from "../sections/PartnersSection";
import ContactMapCta from "../sections/ContactMapCta";
import { PARTNERS } from "../data/partners";

const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } };
const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1 } };

/** 문자열 상태 판별 (공백 제거 + 대소문자 무시) */
function hasRecruitingText(raw) {
  if (!raw) return false;
  const s = String(raw).toLowerCase().replace(/\s/g, "");
  const keys = [
    "모집중", "진행중", "접수중", "운영중",
    "open", "recruit", "recruiting", "inprogress", "ongoing",
  ];
  return keys.some((k) => s.includes(k));
}

/** 강의 하나의 “모집중/진행중” 여부 판별 (내부/HRD 공통) */
function isRecruitingLecture(l) {
  // 불리언 플래그 우선
  if (l?.is_recruiting === true || l?.recruiting === true || l?.is_open === true) return true;

  // 숫자 코드(예: 1=모집중, 2=진행중)
  if (typeof l?.status === "number" && [1, 2].includes(l.status)) return true;
  if (typeof l?.state === "number" && [1, 2].includes(l.state)) return true;

  // 문자열 라벨/필드 여러 개 시도
  return (
    hasRecruitingText(l?.status_label) ||
    hasRecruitingText(l?.status_display) ||
    hasRecruitingText(l?.status) ||
    hasRecruitingText(l?.state_label) ||
    hasRecruitingText(l?.state) ||
    hasRecruitingText(l?.phase)
  );
}

/** 강의별 상세 링크 (내부 / HRD 모두 지원) */
function getLectureLink(lec) {
  if (lec.type === "academy" && lec.id != null) {
    return `/lectures/${lec.id}`;
  }
  if (lec.type === "hrd" && lec.process_id) {
    const q = new URLSearchParams();
    if (lec.process_time) q.set("tracse_tme", lec.process_time);
    if (lec.torg_id)     q.set("torg_id", lec.torg_id);
    const qs = q.toString();
    return `/lectures/hrd/${lec.process_id}${qs ? `?${qs}` : ""}`;
  }
  return "/lectures";
}

/** 리스트 중복 제거용 키 생성 */
function makeKey(l, idx) {
  if (l.type === "academy") return `A-${l.id ?? `i${idx}`}`;
  const has3 = l.process_id && l.process_time && l.torg_id;
  return has3
    ? `H-${l.process_id}-${l.process_time}-${l.torg_id}`
    : `H-${l.title ?? "no"}-${l.start_date ?? "no"}-${idx}`;
}

export default function HomePage() {
  const [popupBanners, setPopupBanners] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [news, setNews] = useState([]);
  const [gallery, setGallery] = useState([]);

  // 팝업
  useEffect(() => {
    axios
      .get("/api/popup/")
      .then((res) => {
        const items = Array.isArray(res.data) ? res.data : [];
        const active = items.filter((i) => i.is_active);
        const pick = active[0] || items[0] || null;

        const now = new Date();
        const visible = pick
          ? [pick].filter((item) => {
              const hideUntil = localStorage.getItem(`hidePopupUntil_${item.id}`);
              return !hideUntil || new Date(hideUntil) <= now;
            })
          : [];

        setPopupBanners(visible);
      })
      .catch((err) => console.error("팝업 로딩 실패:", err));
  }, []);

  // 🔥 모집중 강의 로드 (내부 + HRD 합치기, 상태 정규화)
  useEffect(() => {
    async function loadLectures() {
      try {
        const [academy, hrd] = await Promise.all([
          fetchAcademyLectures({ page: 1, page_size: 12 }),
          fetchHrdLectures({ page: 1, page_size: 12 }),
        ]);

        const aList = (academy.results ?? [])
          .filter(isRecruitingLecture)
          .map((l) => ({ ...l, type: "academy" }));

        const hList = (hrd.results ?? [])
          .filter(isRecruitingLecture)
          .map((l) => ({ ...l, type: "hrd" }));

        // 중복 제거
        const merged = [...aList, ...hList];
        const seen = new Set();
        const uniq = [];
        merged.forEach((l, i) => {
          const key = makeKey(l, i);
          if (!seen.has(key)) {
            seen.add(key);
            uniq.push(l);
          }
        });

        setLectures(uniq.slice(0, 12));
      } catch (e) {
        console.error("강의 불러오기 실패:", e);
      }
    }
    loadLectures();
  }, []);

  // 공지/갤러리
  useEffect(() => {
    async function loadExtra() {
      try {
        const [n, g] = await Promise.all([fetchNewsList(), fetchGalleryList()]);
        setNews(n?.results?.slice(0, 4) ?? []);
        setGallery(g?.results?.slice(0, 4) ?? []);
      } catch (e) {
        console.error("공지/갤러리 로딩 실패:", e);
      }
    }
    loadExtra();
  }, []);

  const dummyBanners = [
    { id: 1, image: "/images/damoa.jpg", title: "첫 번째 배너" },
    { id: 2, image: "/images/damoa1.jpg", title: "두 번째 배너" },
    { id: 3, image: "/images/damoa2.jpg", title: "세 번째 배너" },
  ];

  const menus = [
    { icon: FaBook, title: "모집과정", link: "/lectures" },
    { icon: FaSchool, title: "학원소개", link: "/about" },
    { icon: FaImages, title: "갤러리", link: "/gallery" },
    { icon: FaMapMarkerAlt, title: "위치안내", link: "/location" },
  ];

  const partnersHome = React.useMemo(
    () => PARTNERS.map(p => ({ name: p.name, logo: p.logo || null })),
    []
  );

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(30%_40%_at_10%_10%,rgba(255,159,67,0.12),transparent),radial-gradient(25%_35%_at_90%_20%,rgba(244,63,94,0.10),transparent),linear-gradient(to_bottom,white,white)]" />

      {popupBanners.map((b) => (
        <PopupBanner
          key={b.id}
          id={b.id}
          image={b.image}
          onClose={(id) => setPopupBanners((prev) => prev.filter((p) => p.id !== id))}
        />
      ))}

      <motion.section variants={fadeIn} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
        <MainBannerSlider banners={dummyBanners} />
      </motion.section>

      {/* 메뉴 */}
      <motion.section
        className="container mx-auto px-4 mt-10 md:mt-14 relative z-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
          <div className="col-span-2 md:col-span-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {menus.map((m) => (
                <motion.div key={m.title} variants={fadeUp} whileHover={{ scale: 1.02 }}>
                  <MenuBox
                    icon={m.icon}
                    title={m.title}
                    link={m.link}
                    boxClass="w-full h-32 rounded-2zl bg-white/70 backdrop-blur border border-orange-100 shadow-sm hover:shadow-md transition"
                    iconClass="text-3xl text-orange-600"
                    titleClass="text-sm text-gray-800"
                  />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col items-center rounded-2xl border border-orange-100 bg-white/70 p-5 shadow-sm">
            <p className="text-base md:text-lg font-semibold mb-2">수강신청 및 문의</p>
            <div className="flex items-center space-x-3">
              <FaPhone className="text-3xl text-orange-700" />
              <span className="text-3xl md:text-4xl font-bold tracking-tight">053-944-3355</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 모집중인 과정 */}
      {lectures.length > 0 && (
        <motion.section
          className="container mx-auto mt-10 md:mt-14 relative px-4 pb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-xl font-semibold">모집중인 과정</h2>
            <Link to="/lectures" className="text-sm text-gray-500 hover:text-orange-600">
              전체보기 →
            </Link>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerGroup={1}
            loop={false}
            className="lecture-swiper"
            breakpoints={{ 320:{slidesPerView:1}, 640:{slidesPerView:2}, 1024:{slidesPerView:3}, 1280:{slidesPerView:4} }}
          >
            {lectures.map((lec, idx) => {
              const to = getLectureLink(lec);
              const key =
                lec.type === "academy"
                  ? `lec-A-${lec.id ?? `i${idx}`}`
                  : (lec.process_id && lec.process_time && lec.torg_id)
                    ? `lec-H-${lec.process_id}-${lec.process_time}-${lec.torg_id}`
                    : `lec-H-${lec.title ?? "no"}-${lec.start_date ?? "no"}-${idx}`;

              return (
                <SwiperSlide key={key} style={{ minWidth: "240px" }}>
                  <Link to={to} className="block">
                    <LectureCard lecture={lec} disableInternalLink />
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.section>
      )}

      {/* 공지/갤러리 */}
      <motion.section
        className="bg-white/90 py-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.5 }}
      >
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 공지 */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">공지사항</h2>
                <Link to="/news" className="text-sm text-gray-500 hover:text-orange-600 transition-colors">
                  전체보기 →
                </Link>
              </div>
              <ul className="divide-y divide-gray-200 rounded-xl border border-gray-100 bg-white/70 backdrop-blur">
                {news.map((item) => (
                  <li key={item.id} className="py-3 px-4 hover:bg-orange-50/50 transition">
                    <Link to={`/news/${item.id}`} className="text-sm text-gray-800 hover:text-orange-600 line-clamp-1">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 갤러리 */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">갤러리</h2>
                <Link to="/gallery" className="text-sm text-gray-500 hover:text-orange-600 transition-colors">
                  전체보기 →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {gallery.map((item) => (
                  <Link key={item.id} to={`/gallery/${item.id}`} className="group relative overflow-hidden rounded-xl">
                    <img
                      src={item.thumbnail ?? item.image}
                      alt={item.title}
                      className="h-32 w-full object-cover transition-transform group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-xl bg-black/30 opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="pointer-events-none absolute bottom-2 left-2 text-white text-sm">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </motion.section>

      {/* ✅ 시설 소개 */}
      <FacilityShowcaseHome />
      
      {/* ✅ 지도 */}
      <ContactMapCta />

      {/* ✅ 수강문의 */}
      <InquiryCtaSection />

      {/* ✅ 협력업체 */}
      <PartnersSection partners={partnersHome} />
    </div>
  );
}
