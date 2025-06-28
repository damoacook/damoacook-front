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
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      {/* ── Breadcrumbs ── */}
      <Breadcrumbs
        items={[
          { label: '홈', to: '/' },
          { label: '모집과정', to: '/lectures' },
          { label: data.title },
        ]}
      />

      {/* ── 상세 내용 ── */}
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-64 object-cover mb-4 rounded"
        />
      )}
      <div className="mb-4 text-sm text-gray-700">
        <p><strong>요일/시간:</strong> {data.day_of_week} {data.time}</p>
        <p><strong>기간:</strong> {data.start_date} ~ {data.end_date}</p>
        <p><strong>상태:</strong> {data.status_label} ({data.d_day})</p>
        <p><strong>모집 현황:</strong> {data.applied ?? 0} / {data.capacity ?? 0}명</p>
      </div>
      <div className="whitespace-pre-wrap text-gray-800">{data.description}</div>
    </div>
  )
}
