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
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-6">
      {/* ── Breadcrumbs ── */}
      <Breadcrumbs
        items={[
          { label: '홈', to: '/' },
          { label: '모집과정', to: '/lectures' },
          { label: data.course_name || 'HRD 강의' },
        ]}
      />

      {/* ── 타이틀 ── */}
      <h1 className="text-2xl font-bold">{data.course_name}</h1>

      {/* ── 요약 정보 ── */}
      <div className="text-sm text-gray-700 space-y-1">
        <p><strong>교육기간:</strong> {data.start_date} ~ {data.end_date}</p>
        <p><strong>강의 상태:</strong> {data.status_label} ({data.d_day})</p>
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
          <h2 className="font-semibold mb-1">과정 요약</h2>
          <p className="text-gray-800 whitespace-pre-wrap">{data.summary}</p>
        </div>
      )}

      {/* ── 문의 전화 ── */}
      <div>
        <h2 className="font-semibold mb-1">문의 전화</h2>
        <p className="text-gray-800">053-944-3355</p>
      </div>

      {/* ── 강의 바로가기 버튼 ── */}
      {data.registration_url && (
        <div className="pt-4 text-right">
          <a
            href={data.registration_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            강의 바로가기
          </a>
        </div>
      )}
    </div>
  )
}
