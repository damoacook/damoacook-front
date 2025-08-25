import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAcademyLectures, fetchHrdLectures } from '../api/lectures';
import LectureCard from '../components/LectureCard';
import Breadcrumbs from '../components/Breadcrumbs';

const PAGE_SIZE = 9;

/** HRD/내부 강의 링크 만들기
 * - 내부: /lectures/:id
 * - HRD : /lectures/hrd/:trpr_id?tracse_tme=...&torg_id=...
 * - 세 값(trpr_id, tracse_tme, torg_id) 중 하나라도 없으면 null (링크 비활성)
 */
function getLectureLink(lec) {
  if (lec?.id != null) return `/lectures/${lec.id}`;

  const process_id   = lec.process_id   ?? lec.trpr_id ?? lec.trprId ?? lec.TRPR_ID;
  const process_time = lec.process_time ?? lec.trprDegr ?? lec.tracse_tme ?? lec.TRACSE_TME;

  if (!process_id || !process_time) return null;

  const q = new URLSearchParams();
  q.set('tracse_tme', String(process_time));
  // ❌ torg_id는 더 이상 필요 없음 (백엔드가 고정값으로 채움)

  return `/lectures/hrd/${process_id}?${q.toString()}`;
}

export default function LecturesPage() {
  const [sp, setSp] = useSearchParams();

  // 기본 탭: HRD
  const tab   = sp.get('tab') || 'hrd';
  const pageA = Number(sp.get('pageA') || 1);
  const pageH = Number(sp.get('pageH') || 1);

  // 학원 강의
  const {
    data: academyData,
    isLoading: isLoadingA,
    isError: isErrorA,
    error: errorA,
  } = useQuery({
    queryKey: ['lectures', 'academy', { pageA, page_size: PAGE_SIZE }],
    queryFn:  () => fetchAcademyLectures({ page: pageA, page_size: PAGE_SIZE }),
    keepPreviousData: true,
  });

  // HRD 강의
  const {
    data: hrdData,
    isLoading: isLoadingH,
    isError: isErrorH,
    error: errorH,
  } = useQuery({
    queryKey: ['lectures', 'hrd', { pageH, page_size: PAGE_SIZE }],
    queryFn:  () => fetchHrdLectures({ page: pageH, page_size: PAGE_SIZE }),
    keepPreviousData: true,
  });

  // 탭/페이지 이동
  const goTab = (nextTab) => {
    const next = new URLSearchParams(sp);
    next.set('tab', nextTab);
    if (nextTab === 'academy') next.set('pageA', '1');
    else                       next.set('pageH', '1');
    setSp(next, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goPageA = (p) => {
    const next = new URLSearchParams(sp);
    next.set('tab', 'academy');
    next.set('pageA', String(p));
    setSp(next, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goPageH = (p) => {
    const next = new URLSearchParams(sp);
    next.set('tab', 'hrd');
    next.set('pageH', String(p));
    setSp(next, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 데이터
  const aItems      = academyData?.results ?? [];
  const aTotal      = academyData?.total_count ?? 0;
  const aTotalPages = academyData?.total_pages ?? Math.max(1, Math.ceil(aTotal / PAGE_SIZE));

  const hItems      = hrdData?.results ?? [];
  const hTotal      = hrdData?.total_count ?? 0;
  const hTotalPages = hrdData?.total_pages ?? Math.max(1, Math.ceil(hTotal / PAGE_SIZE));

  // 페이지 범위 보정
  React.useEffect(() => {
    const next = new URLSearchParams(sp);
    let changed = false;

    if (tab === 'academy') {
      if (pageA < 1)                 { next.set('pageA', '1'); changed = true; }
      if (pageA > aTotalPages)       { next.set('pageA', String(aTotalPages || 1)); changed = true; }
    } else {
      if (pageH < 1)                 { next.set('pageH', '1'); changed = true; }
      if (pageH > hTotalPages)       { next.set('pageH', String(hTotalPages || 1)); changed = true; }
    }
    if (changed) setSp(next, { replace: true });
  }, [tab, pageA, pageH, aTotalPages, hTotalPages, sp, setSp]);

  const loading = tab === 'academy' ? isLoadingA : isLoadingH;
  const isErr   = tab === 'academy' ? isErrorA   : isErrorH;
  const err     = tab === 'academy' ? errorA     : errorH;
  if (loading) return <p className="text-center py-8">로딩 중…</p>;
  if (isErr)   return <p className="text-center py-8 text-red-500">오류: {err.message}</p>;

  // 현재 탭 바인딩
  const items      = tab === 'academy' ? aItems : hItems;
  const total      = tab === 'academy' ? aTotal : hTotal;
  const totalPages = tab === 'academy' ? aTotalPages : hTotalPages;
  const page       = tab === 'academy' ? pageA : pageH;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8 space-y-10">
      <Breadcrumbs items={[{ label: '홈', to: '/' }, { label: '모집과정' }]} />

      {/* 헤더 */}
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-bold text-gray-900">모집과정</h1>
        {tab === 'academy' && (
          <Link
            to="/lectures/new"
            className="inline-flex items-center rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition"
          >
            + 과정 등록
          </Link>
        )}
      </div>

      {/* 탭: HRD 먼저 */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => goTab('hrd')}
          className={
            tab === 'hrd'
              ? 'px-4 py-2 text-sm font-semibold border-b-2 border-orange-500 text-orange-700'
              : 'px-4 py-2 text-sm text-gray-600 hover:text-gray-900'
          }
        >
          HRD-Net 강의
        </button>
        <button
          onClick={() => goTab('academy')}
          className={
            tab === 'academy'
              ? 'px-4 py-2 text-sm font-semibold border-b-2 border-orange-500 text-orange-700'
              : 'px-4 py-2 text-sm text-gray-600 hover:text-gray-900'
          }
        >
          학원 강의
        </button>
      </div>

      {/* 목록 */}
      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          현재 {tab === 'academy' ? '학원' : 'HRD'} 강의가 없습니다.
          {tab === 'academy' && (
            <span className="block mt-4">
              <Link
                to="/lectures/new"
                className="inline-flex items-center rounded border border-orange-300 px-3 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50"
              >
                첫 과정 등록하기
              </Link>
            </span>
          )}
        </p>
      ) : (
        <>
          {/* 카드 그리드 */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((lec, idx) => {
              const key =
                lec.id != null
                  ? `lec-${lec.id}`
                  : `hrd-${(lec.process_id ?? lec.trpr_id ?? 'noid')}-${lec.start_date ?? ''}-${idx}`;

              const to = getLectureLink(lec);

              return (
                <li key={key} className="h-full">
                  {to ? (
                    <Link to={to} className="block h-full">
                      {/* 내부에 중첩 링크 생기지 않게 막음 */}
                      <LectureCard lecture={lec} disableInternalLink />
                    </Link>
                  ) : (
                    <div
                      className="block h-full opacity-60 cursor-not-allowed"
                      title="상세 이동 불가: 회차/기관ID 누락"
                    >
                      <LectureCard lecture={lec} disableInternalLink />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* 페이지네이션 */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPage={tab === 'academy' ? goPageA : goPageH}
          />
        </>
      )}
    </div>
  );
}

/** 깔끔하게 분리한 페이지네이션 */
function Pagination({ page, totalPages, onPage }) {
  const pad = 2;
  const start = Math.max(1, page - pad);
  const end   = Math.min(totalPages, page + pad);

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <p className="text-sm text-gray-500 text-center">
        {page}/{totalPages}페이지
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                onClick={() => onPage(1)} disabled={page <= 1} aria-label="첫 페이지">«</button>
        <button className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                onClick={() => onPage(page - 1)} disabled={page <= 1} aria-label="이전 페이지">‹</button>

        {start > 1 && (
          <>
            <button className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => onPage(1)}>1</button>
            {start > 2 && <span className="px-2 text-gray-400">…</span>}
          </>
        )}

        {Array.from({ length: end - start + 1 }).map((_, i) => {
          const p = start + i;
          return (
            <button key={p} onClick={() => onPage(p)}
              className={
                p === page
                  ? 'px-3 py-2 text-sm rounded border border-orange-200 bg-orange-50 text-orange-700'
                  : 'px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 hover:bg-gray-50'
              }
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          );
        })}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="px-2 text-gray-400">…</span>}
            <button className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => onPage(totalPages)}>{totalPages}</button>
          </>
        )}

        <button className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                onClick={() => onPage(page + 1)} disabled={page >= totalPages} aria-label="다음 페이지">›</button>
        <button className="px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                onClick={() => onPage(totalPages)} disabled={page >= totalPages} aria-label="마지막 페이지">»</button>
      </div>
    </div>
  );
}
