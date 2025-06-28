import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function PartnersSlider({ partners }) {
    return (
        <section className="p-6">
            <h2 className="text-2xl font-semibold mb-4">협력사</h2>
            <Swiper spaceBetween={20} slidesPerView={3} loop autoplay={{ delay: 3000 }}>
                {partners.map((p) => (
                    <SwiperSlide key={p.id} className="flex items-center justify-center">
                        <img src={p.logo} alt={p.name} className="h-16 object-contain" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}