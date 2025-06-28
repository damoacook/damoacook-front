// src/pages/HrdLectureDetailPage.jsx
import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchHrdLectureDetail } from '../api/lectures'
import Breadcrumbs from '../components/Breadcrumbs'

export default function HrdLectureDetailPage() {
  const { trpr_id } = useParams()
  const { search }  = useLocation()
  const params      = new URLSearchParams(search)
  const tracse_tme  = params.get('tracse_tme') || ''
  const torg_id     = params.get('torg_id')    || ''

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['lectures', 'hrd', trpr_id, tracse_tme, torg_id],
    queryFn:   () => fetchHrdLectureDetail({ trpr_id, tracse_tme, torg_id }),
  })

  if (isLoading) return <p className="text-center py-6">로딩 중…</p>
  if (isError)   return <p className="text-center py-6 text-red-500">오류: {error.message}</p>

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-10">
    <Breadcrumbs
        items={[
        { label: '홈', to: '/' },
        { label: '모집과정', to: '/lectures' },
        { label: data.course_name || 'HRD 강의' },
        ]}
    />

    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{data.course_name}</h1>

    <div className="text-base sm:text-lg text-gray-800 leading-relaxed bg-gray-50 p-5 rounded-md space-y-2">
        <p><strong>교육기간:</strong> {data.start_date} ~ {data.end_date}</p>
        <p><strong>강의 상태:</strong> {data.status_label} <span className="text-red-500 font-semibold">({data.d_day})</span></p>
        <p><strong>모집 인원:</strong> {data.applied} / {data.capacity}명</p>
        <p><strong>장소:</strong> {data.location || '온라인'}</p>
        <p><strong>수강료:</strong> {Number(data.fee).toLocaleString()}원</p>
        <p><strong>6개월 취업률:</strong> {data.empl_rate_6m}</p>
        <p><strong>비보험 취업률:</strong> {data.non_insured_rate}%</p>
        <p><strong>수료생 수:</strong> {data.graduates}명</p>
    </div>

    {/* ── 과정 요약 ── */}
    {data.summary && (
        <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-900">과정 요약</h2>
        <p className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">{data.summary}</p>
        </div>
    )}

    {/* ── 문의 ── */}
    <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-900">문의 전화</h2>
        <p className="text-base text-gray-700">053-944-3355</p>
    </div>

    {/* ── 강의 바로가기 ── */}
    {data.registration_url && (
        <div className="pt-4 text-right">
        <a
            href={data.registration_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-blue-600 text-white text-base rounded-full hover:bg-blue-700 hover:scale-[1.02] transition font-semibold"
        >
            수강신청 바로가기
        </a>
        </div>
    )}
    </div>
  )
}
