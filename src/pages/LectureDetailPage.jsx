// src/pages/LectureDetailPage.jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchLecture, deleteAcademyLecture } from '../api/lectures';
import Breadcrumbs from '../components/Breadcrumbs';

/** 날짜 유틸: 로컬 기준 날짜 차이(일) */
function daysBetween(fromISO, toISO) {
  if (!fromISO || !toISO) return null;
  const a = new Date(`${fromISO}T00:00:00`);
  const b = new Date(`${toISO}T00:00:00`);
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / 86400000); // 24*60*60*1000
}
function todayISO() {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth() + 1).padStart(2, '0');
  const d = String(t.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 상태 Pill (HRD와 동일 톤) */
function StatusPill({ label }) {
  const tone =
    label === '모집중'
      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
      : label === '진행중'
      ? 'bg-blue-50 text-blue-700 ring-blue-200'
      : label === '모집 마감'
      ? 'bg-rose-50 text-rose-700 ring-rose-200'
      : 'bg-gray-100 text-gray-700 ring-gray-200';
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${tone}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {label ?? '정보 없음'}
    </span>
  );
}

/** 숫자 카드 (HRD와 동일) */
function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow transition">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight text-gray-900">{value}</div>
      {sub ? <div className="mt-1 text-xs text-gray-500">{sub}</div> : null}
    </div>
  );
}

export default function LectureDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthed = !!localStorage.getItem('accessToken');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['lecture', id],
    queryFn: () => fetchLecture(id),
  });

  const delMut = useMutation({
    mutationFn: () => deleteAcademyLecture(id),
    onSuccess: () => {
      alert('삭제되었습니다.');
      navigate('/lectures?tab=academy');
    },
    onError: (err) => alert(err?.message || '삭제 실패'),
  });

  if (isLoading) return <p className="text-center py-10">로딩 중…</p>;
  if (isError)   return <p className="text-center py-10 text-red-500">오류: {error.message}</p>;
  if (!data)     return null;

  const title = data.title || '학원 강의';

  // 기간
  const startDate = data.start_date || '-';
  const endDate   = data.end_date   || '-';

  // 유틸
  function daysBetween(fromISO, toISO) {
    if (!fromISO || !toISO) return null;
    const a = new Date(`${fromISO}T00:00:00`);
    const b = new Date(`${toISO}T00:00:00`);
    return Math.round((b.getTime() - a.getTime()) / 86400000);
  }
  function todayISO() {
    const t = new Date();
    const y = t.getFullYear();
    const m = String(t.getMonth() + 1).padStart(2, '0');
    const d = String(t.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const today = todayISO();
  const startDiff = startDate !== '-' ? daysBetween(today, startDate) : null;
  const endDiff   = endDate   !== '-' ? daysBetween(today, endDate)   : null;

  // ✅ 상태는 start/end 위치로 판단(백엔드 status 없을 때도 안전)
  let statusLabel = data.status || '정보 없음';
  if (startDiff != null || endDiff != null) {
    if (startDiff != null && startDiff > 0) {
      statusLabel = '모집중';
    } else if (
      (startDiff != null && startDiff <= 0) &&
      (endDiff   != null && endDiff   >= 0)
    ) {
      statusLabel = '진행중';
    } else if (endDiff != null && endDiff < 0) {
      statusLabel = '종료';
    }
  }

  // ✅ D-DAY는 항상 "개강일 기준"으로만 표기 (백엔드 days_left 무시)
  let dDayDisplay = null;
  if (startDiff != null) {
    if (startDiff > 0)      dDayDisplay = `D-${startDiff}`;
    else if (startDiff === 0) dDayDisplay = 'D-DAY';
    else                      dDayDisplay = null; // 이미 개강함
  }

  // 보조표시: "개강까지 N일"
  let startSub = '';
  if (startDiff != null) {
    if (startDiff > 0)      startSub = `개강까지 ${startDiff}일`;
    else if (startDiff === 0) startSub = '오늘 개강';
    else                      startSub = ''; // 개강 후
  }

  // 모집 현황 (applied/capacity 우선, 없으면 remain)
  const hasBoth = typeof data.applied === 'number' && typeof data.capacity === 'number' && data.capacity > 0;
  const applied = hasBoth ? data.applied : null;
  const capacity = hasBoth ? data.capacity : null;
  const remaining = hasBoth
    ? Math.max(capacity - applied, 0)
    : (typeof data.remain === 'number' ? data.remain : null);

  // 진행률
  const progress = hasBoth ? Math.min(100, Math.max(0, Math.round((applied / capacity) * 100))) : null;

  return (
    <div className="relative">
      {/* 상단 히어로 (HRD와 동일 레이아웃/톤) */}
      <div className="bg-gradient-to-br from-orange-50 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
          <Breadcrumbs
            items={[
              { label: '홈', to: '/' },
              { label: '모집과정', to: '/lectures?tab=academy' },
              { label: title },
            ]}
          />

          {/* 우측 상단 관리자 버튼 */}
          {isAuthed && (
            <div className="mt-2 flex justify-end gap-2">
              <Link
                to={`/lectures/${id}/edit`}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                수정
              </Link>
              <button
                onClick={() => { if (confirm('정말 삭제하시겠습니까?')) delMut.mutate(); }}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-60"
                disabled={delMut.isLoading}
              >
                삭제
              </button>
            </div>
          )}

          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            {title}
          </h1>

          {/* 메타: 넓은 화면에서 줄바꿈(세로), 작은 화면에서 가로 정렬 */}
          <div className="mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-3 flex-wrap lg:flex-col lg:items-start lg:gap-1">
              <div className="text-base text-gray-800">
                교육기간{' '}
                <span className="font-semibold text-gray-900">{startDate}</span> ~{' '}
                <span className="font-semibold text-gray-900">{endDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill label={statusLabel} />
                {dDayDisplay && <span className="text-rose-500 font-semibold">{dDayDisplay}</span>}
              </div>
            </div>
          </div>

          {/* (자체 강의는 상단 CTA 없음) */}
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* 주요 지표 */}
        <div className="grid sm:grid-cols-3 gap-4">
          <StatCard
            label="모집 인원"
            value={
              hasBoth
                ? `${applied} / ${capacity}명`
                : (remaining != null ? `잔여 ${remaining}명` : '-')
            }
            sub={hasBoth && remaining != null ? `잔여 ${remaining}명` : undefined}
          />
          <StatCard
            label="교육기간"
            value={`${startDate} ~ ${endDate}`}
            sub={startSub || undefined}
          />
          <StatCard
            label="상태"
            value={statusLabel || '정보 없음'}
            sub={dDayDisplay || undefined}
          />
        </div>

        {/* 진행률 바 (applied/capacity가 있을 때만) */}
        {progress != null && (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <div className="font-medium text-gray-900">모집 진행률</div>
              <div className="text-gray-500">{progress}%</div>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-2 rounded-full bg-orange-500 transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* 상세 정보 (요일/시간 등) */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
          {(data.day_of_week || data.time) && (
            <div className="flex items-start gap-3">
              <span className="text-lg">⏰</span>
              <div>
                <div className="text-xs text-gray-500">요일 / 시간</div>
                <div className="text-sm font-medium text-gray-900">
                  {data.day_of_week || '-'}{data.time ? ` · ${data.time}` : ''}
                </div>
              </div>
            </div>
          )}

          {data.description && (
            <div className="flex items-start gap-3">
              <span className="text-lg">📝</span>
              <div>
                <div className="text-xs text-gray-500">과정 소개</div>
                <div className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                  {data.description}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 문의 (HRD와 동일 톤) */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-7 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">문의</h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            수강 관련하여 궁금하신 점이 있으시다면 언제든 전화 주세요. <br className="hidden sm:block" />
            친절하고 자세하게 안내해드리겠습니다.
          </p>
          <a
            href="tel:0539443355"
            className="mt-4 inline-flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 hover:opacity-90"
          >
            <span role="img" aria-label="phone">📞</span>
            053-944-3355
          </a>
        </div>
      </div>
    </div>
  );
}
