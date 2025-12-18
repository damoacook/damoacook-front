import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNewsList, deleteNewsItem } from '../../api/news';
import Breadcrumbs from '../../components/Breadcrumbs';

const PAGE_SIZE = 8; // 8개 고정

export default function NewsPage() {
  const isAuthed = !!localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const qc = useQueryClient();

  // URL 쿼리(page) 동기화
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get('page') || 1);

  // 목록 조회
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['news', { page }],
    queryFn: () => fetchNewsList({ page, page_size: PAGE_SIZE }),
    keepPreviousData: true,
  });

  // 삭제
  const { mutate: remove, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteNewsItem(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['news'] }),
    onError: (err) => alert(err?.message || '삭제 실패'),
  });

  // 응답 매핑
  const items = data?.results ?? [];
  const total = data?.total_count ?? 0;
  const totalPages = data?.total_pages ?? 1;

  // 훅은 조기 return보다 위! (페이지 범위 보정)
  React.useEffect(() => {
    if (!totalPages) return;
    if (page > totalPages) {
      const next = new URLSearchParams(sp);
      next.set('page', String(totalPages));
      setSp(next, { replace: true });
    } else if (page < 1) {
      const next = new URLSearchParams(sp);
      next.set('page', '1');
      setSp(next, { replace: true });
    }
  }, [page, totalPages, sp, setSp]);

  if (isLoading) return <p className="text-center py-6">로딩 중…</p>;
  if (isError)   return <p className="text-center py-6 text-red-500">오류: {error.message}</p>;

  // 페이지네이션 숫자 버튼 범위
  const pad = 2;
  const start = Math.max(1, page - pad);
  const end = Math.min(totalPages, page + pad);
  const pageList = [];
  for (let p = start; p <= end; p++) pageList.push(p);

  // 페이지 이동
  const goPage = (p) => {
    const next = new URLSearchParams(sp);
    next.set('page', String(p));
    setSp(next, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8 space-y-10">
      <Breadcrumbs items={[{ label: '홈', to: '/' }, { label: '공지사항' }]} />

      {/* 헤더 */}
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-bold text-gray-900">공지사항</h1>
        {isAuthed && (
          <Link
            to="/news/new"
            className="inline-flex items-center rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition"
          >
            + 새 글
          </Link>
        )}
      </div>

      {/* 목록 */}
      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          등록된 공지사항이 없습니다.
          {isAuthed && (
            <span className="block mt-4">
              <Link
                to="/news/new"
                className="inline-flex items-center rounded border border-orange-300 px-3 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50"
              >
                첫 글 등록하기
              </Link>
            </span>
          )}
        </p>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((news) => (
              <li key={news.id} className="aspect-auto">
                <div className="flex flex-col h-full border border-gray-200 rounded-xl p-4 bg-white hover:shadow-lg transition">
                  <Link to={`/news/${news.id}`} className="flex-1 space-y-3 block">
                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">{news.title}</h2>

                    {news.image ? (
                      <div className="w-full aspect-[4/3] overflow-hidden rounded-md">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="block w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 line-clamp-4 whitespace-pre-wrap">
                        {news.content}
                      </p>
                    )}

                    <div className="text-sm text-gray-500 flex justify-between mt-auto">
                      <span>{new Date(news.created_at).toLocaleDateString()}</span>
                      <span>조회수 {news.views}</span>
                    </div>
                  </Link>

                  {isAuthed && (
                    <div className="flex items-center justify-end gap-2 pt-3">
                      <button
                        onClick={() => navigate(`/news/${news.id}/edit`)}
                        className="text-xs rounded border border-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-50"
                      >
                        수정
                      </button>
                      <button
                        disabled={isDeleting}
                        onClick={() => { if (confirm('정말 삭제할까요?')) remove(news.id); }}
                        className="text-xs rounded border border-red-200 px-2 py-1 text-red-600 hover:bg-red-50 disabled:opacity-60"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* 중앙 페이지네이션 */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500 text-center">
              총 <b>{total}</b>개 · {page}/{totalPages}페이지
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                onClick={() => goPage(1)}
                disabled={page <= 1}
                aria-label="첫 페이지"
              >
                «
              </button>
              <button
                className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                onClick={() => goPage(page - 1)}
                disabled={page <= 1}
                aria-label="이전 페이지"
              >
                ‹
              </button>

              {start > 1 && (
                <>
                  <button
                    className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => goPage(1)}
                  >
                    1
                  </button>
                  {start > 2 && <span className="px-2 text-gray-400">…</span>}
                </>
              )}

              {pageList.map((p) => (
                <button
                  key={p}
                  onClick={() => goPage(p)}
                  className={
                    p === page
                      ? 'px-3 py-2 text-sm rounded border border-orange-200 bg-orange-50 text-orange-700'
                      : 'px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }
                  aria-current={p === page ? 'page' : undefined}
                >
                  {p}
                </button>
              ))}

              {end < totalPages && (
                <>
                  {end < totalPages - 1 && <span className="px-2 text-gray-400">…</span>}
                  <button
                    className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => goPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                onClick={() => goPage(page + 1)}
                disabled={page >= totalPages}
                aria-label="다음 페이지"
              >
                ›
              </button>
              <button
                className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                onClick={() => goPage(totalPages)}
                disabled={page >= totalPages}
                aria-label="마지막 페이지"
              >
                »
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}