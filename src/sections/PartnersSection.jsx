import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

function LogoOrText({ name, logo }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        loading="lazy"
        className="max-h-12 w-auto object-contain transition-transform hover:scale-[1.02]"
      />
    );
  }
  return (
    <span className="inline-flex h-12 items-center justify-center rounded-xl bg-gray-50 px-4 text-sm font-semibold text-gray-600 ring-1 ring-gray-200">
      {name}
    </span>
  );
}

export default function PartnersStrip({ partners = [] }) {
  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 md:py-18">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
            협력 네트워크
          </div>
          <h2 className="mt-2 text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
            함께 성장하는 파트너
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            산학·기관 협력으로 실무형 교육 품질을 높입니다
          </p>
        </div>

        <div className="relative overflow-hidden">
          <Swiper
            modules={[Autoplay, FreeMode]}
            freeMode
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={3000}
            loop
            slidesPerView={2}
            breakpoints={{
              480: { slidesPerView: 3 },
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
              1280: { slidesPerView: 7 },
            }}
            spaceBetween={28}
          >
            {[...partners, ...partners].map((p, idx) => (
              <SwiperSlide key={`${p.name}-${idx}`}>
                <div className="flex h-16 items-center justify-center">
                  <LogoOrText name={p.name} logo={p.logo} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}