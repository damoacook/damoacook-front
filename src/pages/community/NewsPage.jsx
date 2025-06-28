import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchNewsList } from '../../api/news';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function NewsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNewsList,
  });

  if (isLoading) return <p className="text-center py-6">로딩 중…</p>;
  if (isError) return <p className="text-center py-6 text-red-500">오류: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8 space-y-10">
    <Breadcrumbs
      items={[
        { label: '홈', to: '/' },
        { label: '공지사항' },
      ]}
    />

    <h1 className="text-3xl font-bold text-gray-900">공지사항</h1>

    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {data.results.map(news => (
        <li key={news.id} className="aspect-square">
          <Link
            to={`/news/${news.id}`}
            className="flex flex-col justify-between h-full border border-gray-200 rounded-xl p-4 bg-white hover:shadow-lg transition space-y-3"
          >
            {/* 제목 */}
            <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
              {news.title}
            </h2>

            {/* 이미지 or 간략내용 */}
            {news.image ? (
              <div className="w-full aspect-square overflow-hidden rounded-md">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <p className="text-sm text-gray-500 line-clamp-4 whitespace-pre-wrap">
                {news.content}
              </p>
            )}

            {/* 날짜 + 조회수 */}
            <div className="text-sm text-gray-500 flex justify-between mt-auto">
              <span>{new Date(news.created_at).toLocaleDateString()}</span>
              <span>조회수 {news.views}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
  );
}
