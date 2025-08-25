import React from "react";
import NaverMap from "./NaverMap";

export default function MapWithPreview({
  lat = 35.88699108738317,
  lng = 128.63887592530463,
  title = "다모아요리학원 (2층)",
  previewSrc = "/images/map-placeholder.jpg", // 가벼운 썸네일 이미지
  height = 360,
  autoLoadOnView = true, // 스크롤 진입 시 자동 로드
}) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  // 뷰포트 진입 시 자동 로드
  React.useEffect(() => {
    if (!autoLoadOnView || open === true) return;
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setOpen(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoLoadOnView, open]);

  return (
    <div ref={wrapRef} className="overflow-hidden rounded-2xl ring-1 ring-gray-200">
      {open ? (
        <NaverMap lat={lat} lng={lng} markerTitle={title} height={height} />
      ) : (
        <div className="relative" style={{ height }}>
          <img
            src={previewSrc}
            alt={`${title} 위치 프리뷰`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* 반투명 오버레이 + CTA */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl bg-white/95 px-4 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-white"
            >
              네이버 지도 열기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
