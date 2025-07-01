// src/pages/HomePage.jsx
import React from 'react';
import MainBannerSlider from '../components/MainBannerSlider';
import MenuBox from '../components/MenuBox';
import { FaBook, FaSchool, FaImages, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function HomePage() {
  const dummyBanners = [
    { id: 1, image: '/images/damoa.jpg',  title: '첫 번째 배너' },
    { id: 2, image: '/images/damoa1.jpg', title: '두 번째 배너' },
    { id: 3, image: '/images/damoa2.jpg', title: '세 번째 배너' },
  ];

  const menus = [
    { icon: FaBook,         title: '모집과정', link: '/lectures' },
    { icon: FaSchool,       title: '학원소개', link: '/about'    },
    { icon: FaImages,       title: '갤러리',   link: '/gallery'  },
    { icon: FaMapMarkerAlt, title: '위치안내', link: '/location' },
  ];

  return (
    <div className="space-y-12">
      {/* 1) 메인 배너 (좌우 여백 없이 꽉 차게) */}
      <div className="overflow-hidden">
        <MainBannerSlider banners={dummyBanners} />
      </div>

      {/* 2) 메뉴 + 전화번호 영역 */}
      <section className="container mx-auto px-4 mt-8 md:mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
          {/* ─── 메뉴 영역 ─── mobile:2cols, desktop:4cols */}
          <div className="col-span-2 md:col-span-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {menus.map((m) => (
                <MenuBox
                  key={m.title}
                  icon={m.icon}
                  title={m.title}
                  link={m.link}
                  boxClass="w-full h-32"
                  iconClass="text-3xl text-orange-500"
                  titleClass="text-sm text-gray-700"
                />
              ))}
            </div>
          </div>

          {/* 전화번호 영역 */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center">
            {/* 문구 추가 */}
            <p className="text-base md:text-lg font-semibold mb-2">
              수강신청 및 문의
            </p>
            {/* 아이콘 + 번호 */}
            <div className="flex items-center space-x-3">
              <FaPhone className="text-3xl text-orange-700" />
              <span className="text-3xl md:text-4xl font-bold">
                053-944-3355
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
