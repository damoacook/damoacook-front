// src/pages/LecturesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAcademyLectures, fetchHrdLectures } from '../api/lectures';
import LectureCard from '../components/LectureCard';

export default function LecturesPage() {
  // 내부 강의
  const academyQuery = useInfiniteQuery({
    queryKey: ['lectures', 'academy'],
    queryFn: ({ pageParam = 1 }) => fetchAcademyLectures({ page: pageParam }),
    getNextPageParam: last => {
      if (!last.next) return undefined;
      const url = new URL(last.next, window.location.origin);
      return url.searchParams.get('page');
    },
  });

  // HRD-Net 강의
  const hrdQuery = useInfiniteQuery({
    queryKey: ['lectures', 'hrd'],
    queryFn: ({ pageParam = 1 }) => fetchHrdLectures({ page: pageParam }),
    getNextPageParam: last => last.next && new URL(last.next, window.location.origin).searchParams.get('page'),
  })

  if (academyQuery.isLoading || hrdQuery.isLoading) {
    return <p className="text-center py-8">로딩 중…</p>;
  }
  if (academyQuery.isError || hrdQuery.isError) {
    return <p className="text-center py-8 text-red-500">데이터 로딩 실패!</p>;
  }

  return (
    <div className="space-y-16">
      {/* 내부 강의 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">내부 강의</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {academyQuery.data.pages.flatMap((page, pi) =>
          page.results.map((lec, idx) => (
            <LectureCard
              key={`academy-${lec.id}-${pi}-${idx}`}
              to={`/lectures/${lec.id}`}
              lecture={lec}
            />
          ))
        )}
        </div>
        {academyQuery.hasNextPage && (
          <div className="text-center mt-8">
            <button
              onClick={() => academyQuery.fetchNextPage()}
              disabled={academyQuery.isFetchingNextPage}
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              {academyQuery.isFetchingNextPage ? '불러오는 중…' : '더 보기'}
            </button>
          </div>
        )}
      </section>

       {/* HRD-Net 강의 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">HRD-Net 강의</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hrdQuery.data.pages.flatMap((page, pi) =>
            page.results.map((hrd, idx) => (
              <Link
                key={`${hrd.process_id}-${pi}-${idx}`}
                to={{
                  pathname: `/lectures/hrd/${hrd.process_id}`,
                  search:   `?tracse_tme=${hrd.process_time}&torg_id=${hrd.torg_id}`
                }}
              >
                <LectureCard
                to={`/lectures/hrd/${hrd.process_id}?tracse_tme=${hrd.process_time}&torg_id=${hrd.torg_id}`}
                lecture={hrd}
              />
              </Link>
            ))
          )}
        </div>
        {/* … 페이징 버튼 생략 … */}
      </section>
    </div>
  )
}