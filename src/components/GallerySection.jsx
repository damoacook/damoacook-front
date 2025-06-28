import React from 'react';

export default function GallerySection({ images }) {
    return (
        <section className="p-6">
            <h2 className="text-2xl font-semibold mb-4">갤러리</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.slice(0, 6).map((img) => (
                    <a
                        key={img.id}
                        href={`/gallery/${img.id}`}
                        className="block overflow-hidden rounded-lg hover:shadow-lg"
                    >
                        <img
                            src={img.image}
                            alt={img.title}
                            className="w-full h-32 object-cover"
                        />
                    </a>
                ))}
            </div>
        </section>
    );
}