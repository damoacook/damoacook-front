import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchGalleryList, deleteGalleryItem } from '../../api/gallery'
import Breadcrumbs from '../../components/Breadcrumbs'

const PAGE_SIZE = 8; // ✅ 고정

export default function GalleryPage() {
  const isAuthed = !!localStorage.getItem('accessToken')
  const navigate = useNavigate()
  const qc = useQueryClient()

  const [sp, setSp] = useSearchParams()
  const page = Number(sp.get('page') || 1)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['gallery', { page }],
    queryFn: () => fetchGalleryList({ page, page_size: PAGE_SIZE }), // ✅ 8개 고정 요청
    keepPreviousData: true,
  })

  const { mutate: remove, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteGalleryItem(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] }),
    onError: (err) => alert(err?.message || '삭제 실패'),
  })


  // 서버가 페이지네이션을 안 주는 경우, 클라이언트에서 임시로 잘라서 보여줌
  const items = data?.results ?? []
  const total = data?.total_count ?? 0
  const totalPages = data?.total_pages ?? 1

  // ✅ 훅은 조기 return보다 위에 (페이지 범위 보정)
  React.useEffect(() => {
    if (page > totalPages) {
      const next = new URLSearchParams(sp)
      next.set('page', String(totalPages))
      setSp(next, { replace: true })
    } else if (page < 1) {
      const next = new URLSearchParams(sp)
      next.set('page', '1')
      setSp(next, { replace: true })
    }
  }, [page, totalPages, sp, setSp])

  if (isLoading) return <p className="text-center py-6">로딩 중…</p>
  if (isError)   return <p className="text-center py-6 text-red-500">오류: {error.message}</p>

  // 숫자 버튼 범위
  const pad = 2
  const start = Math.max(1, page - pad)
  const end = Math.min(totalPages, page + pad)
  const pageList = []
  for (let p = start; p <= end; p++) pageList.push(p)

  // 페이지 이동
  const goPage = (p) => {
    const next = new URLSearchParams(sp)
    next.set('page', String(p))
    setSp(next, { replace: true })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <Breadcrumbs items={[{ label: '홈', to: '/' }, { label: '갤러리' }]} />

      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-bold text-gray-900">갤러리</h1>
        {isAuthed && (
          <Link
            to="/gallery/new"
            className="inline-flex items-center rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition"
          >
            + 새 글
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          아직 등록된 갤러리 이미지가 없습니다.
          {isAuthed && (
            <span className="block mt-4">
              <Link
                to="/gallery/new"
                className="inline-flex items-center rounded border border-orange-300 px-3 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50"
              >
                첫 글 등록하기
              </Link>
            </span>
          )}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map(item => (
              <div key={item.id} className="group rounded overflow-hidden bg-white hover:shadow-md transition ring-1 ring-gray-100">
                <Link to={`/gallery/${item.id}`} className="block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform"
                    loading="lazy"
                  />
                </Link>
                <div className="p-3 space-y-1">
                  <Link to={`/gallery/${item.id}`}>
                    <h2 className="text-sm font-medium text-gray-800 line-clamp-1" title={item.title}>
                      {item.title}
                    </h2>
                  </Link>
                  <p className="text-xs text-gray-500">조회수 {item.views}</p>
                </div>

                {isAuthed && (
                  <div className="flex items-center justify-end gap-2 px-3 pb-3">
                    <button
                      onClick={() => navigate(`/gallery/${item.id}/edit`)}
                      className="text-xs rounded border border-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-50"
                    >
                      수정
                    </button>
                    <button
                      disabled={isDeleting}
                      onClick={() => {
                        if (confirm('정말 삭제할까요?')) remove(item.id)
                      }}
                      className="text-xs rounded border border-red-200 px-2 py-1 text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 중앙 페이지네이션 */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500 text-center">
              총 <b>{total}</b>개 · {page}/{totalPages}페이지
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                      onClick={() => goPage(1)} disabled={page <= 1} aria-label="첫 페이지">«</button>
              <button className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                      onClick={() => goPage(page - 1)} disabled={page <= 1} aria-label="이전 페이지">‹</button>

              {start > 1 && (
                <>
                  <button className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 hover:bg-gray-50"
                          onClick={() => goPage(1)}>1</button>
                  {start > 2 && <span className="px-2 text-gray-400">…</span>}
                </>
              )}

              {pageList.map((p) => (
                <button
                  key={p}
                  onClick={() => goPage(p)}
                  className={
                    p === page
                      ? "px-3 py-2 text-sm rounded border border-orange-200 bg-orange-50 text-orange-700"
                      : "px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              ))}

              {end < totalPages && (
                <>
                  {end < totalPages - 1 && <span className="px-2 text-gray-400">…</span>}
                  <button className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 hover:bg-gray-50"
                          onClick={() => goPage(totalPages)}>{totalPages}</button>
                </>
              )}

              <button className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                      onClick={() => goPage(page + 1)} disabled={page >= totalPages} aria-label="다음 페이지">›</button>
              <button className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                      onClick={() => goPage(totalPages)} disabled={page >= totalPages} aria-label="마지막 페이지">»</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}