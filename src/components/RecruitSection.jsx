import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function RecruitSection({ lectures }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    return (
        <section
            ref={ref}
            className={`p-6 transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
            <h2 className="text-2xl font-semibold mb-4">현재 모집중</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {lectures.map((l) => (
                    <div
                        key={l.id}
                        className="border rounded-lg overflow-hidden hover:shadow-lg"
                    >
                        <img
                            src={l.image}
                            alt={l.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold">{l.title}</h3>
                            <p className="text-sm text-gray-600">
                                {l.day_of_week} · {l.time}
                            </p>
                            <span className="mt-2 inline-block text-sm text-green-600">
                                모집중
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}