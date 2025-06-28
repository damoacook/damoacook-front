import React from 'react';

export default function NewsSection({ news }) {
    return (
        <section className="p-6">
            <h2 className="text-2xl font-semibold mb-4">최신 공지·소식</h2>
            <ul className="space-y-2">
                {news.map((n) => (
                    <li key={n.id}>
                        <a
                            href={`/news/${n.id}`}
                            className="flex justify-between hover:underline"
                        >
                            <span>{n.title}</span>
                            <time className="text-xs text-gray-500">
                                {new Date(n.created_at).toLocaleDateString()}
                            </time>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}