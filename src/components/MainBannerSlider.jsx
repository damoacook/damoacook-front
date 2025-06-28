// src/components/MainBannerSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function MainBannerSlider({ banners }) {
    return (
        <div className="relative w-screen overflow-hidden">
            <Swiper
                modules={[Autoplay]}                     // ← 모듈 등록
                spaceBetween={0}
                slidesPerView={1}
                loop                                     
                autoplay={{                              
                delay: 5000,                           // 5초마다 자동 전환
                disableOnInteraction: false,           // 스와이프 후에도 자동 재시작
                }}
                className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[700px] w-full"
            >
                {banners.map((b) => (
                    <SwiperSlide
                        key={b.id}
                        className="h-full flex items-stretch"
                        style={{ height: '100%' }}
                    >
                        <a href={b.link_url || '#'} className="relative block h-full w-full">
                            <img
                                src={b.image}
                                alt={b.title}
                                className="w-full h-full object-cover"
                                style={{ height: '100%' }}
                            />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
