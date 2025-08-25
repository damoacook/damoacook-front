// src/pages/HrdLectureDetailPage.jsx
import React from 'react';
import { useParams, useLocation, Link, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchHrdLectureDetail } from '../api/lectures';
import Breadcrumbs from '../components/Breadcrumbs';

/** 상태 Pill */
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
      {label}
    </span>
  );
}

/** 숫자 카드 */
function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow transition">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight text-gray-900">{value}</div>
      {sub ? <div className="mt-1 text-xs text-gray-500">{sub}</div> : null}
    </div>
  );
}

/** 스켈레톤 */
function Skeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-6" />
      <div className="h-8 sm:h-10 bg-gray-200 rounded animate-pulse w-3/4 mb-6" />
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
      <div className="h-40 rounded-2xl bg-gray-100 animate-pulse" />
    </div>
  );
}

export default function HrdLectureDetailPage() {
  const { trpr_id } = useParams();
  const { search, state } = useLocation();
  const params = new URLSearchParams(search);
  const tracse_tme = params.get('tracse_tme') || '';
  const torg_id = params.get('torg_id') || '';

  const previewLecture = state?.lecture || null;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['lectures', 'hrd', trpr_id, tracse_tme, torg_id || 'auto'],
    queryFn: () => fetchHrdLectureDetail({ trpr_id, tracse_tme, torg_id: torg_id || undefined }),
    enabled: Boolean(trpr_id && tracse_tme),
  });

  const course = React.useMemo(() => {
    if (data) return data;
    if (!trpr_id && previewLecture) return previewLecture;
    return null;
  }, [data, trpr_id, previewLecture]);

  if (!trpr_id && !previewLecture) return <Navigate to="/lectures?tab=hrd" replace />;
  if (isLoading && !data) return <Skeleton />;

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-center py-8 text-red-500">오류: {error?.message || '불러오기 실패'}</p>
        <div className="text-center">
          <Link to="/lectures?tab=hrd" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            ← HRD 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const title = course?.course_name || course?.title || 'HRD 강의';
  const startDate = course?.start_date || '-';
  const endDate = course?.end_date || '-';
  const statusLbl = course?.status_label || '정보 없음';
  const dDay = course?.d_day || '';
  const applied = course?.applied ?? null;
  const capacity = course?.capacity ?? null;
  const remaining = course?.remaining_slots ?? null;
  const regUrl = course?.registration_url || course?.apply_url || course?.url || '';

  // 진행률
  let progress = null;
  if (applied != null && capacity != null && capacity > 0) {
    progress = Math.min(100, Math.max(0, Math.round((applied / capacity) * 100)));
  }

  return (
    <div className="relative">
      {/* 상단 히어로 */}
      <div className="bg-gradient-to-br from-orange-50 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">

          <Breadcrumbs
            items={[
              { label: '홈', to: '/' },
              { label: '모집과정', to: '/lectures?tab=hrd' },
              { label: title },
            ]}
          />

          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            {title}
          </h1>

          {/* 메타: 넓은 화면에선 줄바꿈(세로), 작은 화면에선 가로 정렬 */}
          <div className="mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-3 flex-wrap lg:flex-col lg:items-start lg:gap-1">
              <div className="text-base text-gray-800">
                교육기간{' '}
                <span className="font-semibold text-gray-900">{startDate}</span> ~{' '}
                <span className="font-semibold text-gray-900">{endDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill label={statusLbl} />
                {dDay && <span className="text-rose-500 font-semibold">{dDay}</span>}
              </div>
            </div>
          </div>

          {/* CTA (상단) */}
          <div className="mt-4">
            {regUrl ? (
              <a
                href={regUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-5 py-2.5 text-white font-semibold shadow-sm hover:bg-orange-700 hover:shadow transition"
              >
                수강신청 바로가기
              </a>
            ) : (
              <span className="text-sm text-gray-500">수강신청 링크가 준비 중입니다.</span>
            )}
          </div>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* 주요 지표 */}
        <div className="grid sm:grid-cols-3 gap-4">
          <StatCard
            label="모집 인원"
            value={
              applied != null || capacity != null
                ? `${applied ?? '-'} / ${capacity ?? '-'}명`
                : '-'
            }
            sub={remaining != null ? `잔여 ${remaining}명` : ''}
          />
        <StatCard label="교육기간" value={`${startDate} ~ ${endDate}`} />
          <StatCard label="상태" value={statusLbl} sub={dDay ? dDay : undefined} />
        </div>

        {/* 진행률 바 */}
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

        {/* 상세 정보 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
          {course?.location && (
            <div className="flex items-start gap-3">
              <span className="text-lg">📍</span>
              <div>
                <div className="text-xs text-gray-500">장소</div>
                <div className="text-sm font-medium text-gray-900">{course.location}</div>
              </div>
            </div>
          )}

          {course?.fee != null && (
            <div className="flex items-start gap-3">
              <span className="text-lg">💳</span>
              <div>
                <div className="text-xs text-gray-500">수강료</div>
                <div className="text-sm font-medium text-gray-900">
                  {Number(course.fee).toLocaleString()}원
                </div>
              </div>
            </div>
          )}

          {course?.empl_rate_6m && (
            <div className="flex items-start gap-3">
              <span className="text-lg">📈</span>
              <div>
                <div className="text-xs text-gray-500">6개월 취업률</div>
                <div className="text-sm font-medium text-gray-900">{course.empl_rate_6m}</div>
              </div>
            </div>
          )}

          {course?.non_insured_rate != null && (
            <div className="flex items-start gap-3">
              <span className="text-lg">🧾</span>
              <div>
                <div className="text-xs text-gray-500">비보험 취업률</div>
                <div className="text-sm font-medium text-gray-900">{course.non_insured_rate}%</div>
              </div>
            </div>
          )}

          {course?.graduates != null && (
            <div className="flex items-start gap-3">
              <span className="text-lg">🎓</span>
              <div>
                <div className="text-xs text-gray-500">수료생 수</div>
                <div className="text-sm font-medium text-gray-900">{course.graduates}명</div>
              </div>
            </div>
          )}
        </div>

        {/* 문의 (멘트 + 큰 전화번호) */}
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

      {/* 모바일 하단 고정 CTA */}
      {regUrl && (
        <div className="fixed inset-x-0 bottom-0 z-10 sm:hidden border-t border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <a
              href={regUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-orange-700 transition"
            >
              수강신청 바로가기
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
