// src/pages/LectureDetailPage.jsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchLecture } from '../api/lectures'
import Breadcrumbs from '../components/Breadcrumbs'

export default function LectureDetailPage() {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['lecture', id],
    queryFn: () => fetchLecture(id),
  })

  if (isLoading) return <p>로딩 중…</p>
  if (isError) return <p className="text-red-500">오류: {error.message}</p>

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-10">
    <Breadcrumbs
        items={[
        { label: '홈', to: '/' },
        { label: '모집과정', to: '/lectures' },
        { label: data.title },
        ]}
    />


    {/* ── 제목 ── */}
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{data.title || data.course_name}</h1>

    {/* ── 이미지 (옵션) ── */}
    {data.image && (
        <img
        src={data.image}
        alt={data.title}
        className="w-full h-64 object-cover rounded-lg shadow-sm"
        />
    )}

    <div className="text-base sm:text-lg text-gray-800 leading-relaxed bg-gray-50 p-5 rounded-md space-y-2">
        <p><strong>요일/시간:</strong> {data.day_of_week} {data.time}</p>
        <p><strong>기간:</strong> {data.start_date} ~ {data.end_date}</p>
        <p><strong>상태:</strong> {data.status_label} <span className="text-red-500 font-semibold">({data.d_day})</span></p>
        <p><strong>모집 현황:</strong> {data.applied ?? 0} / {data.capacity ?? 0}명</p>
    </div>

    {/* ── 설명 ── */}
    {data.description && (
        <div className="text-base text-gray-800 whitespace-pre-wrap leading-relaxed">
        {data.description}
        </div>
    )}

      {/* ── 문의 ── */}
    <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-900">문의 전화</h2>
        <p className="text-base text-gray-700">053-944-3355</p>
    </div>
    </div>
  )
}
