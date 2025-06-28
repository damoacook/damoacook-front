import React from 'react'
import { Link } from 'react-router-dom'

export default function LectureCard({ lecture }) {
  const {
    title, d_day, status_label,
    day_of_week, time,
    start_date, end_date,
    capacity, applied, remain,
    id
  } = lecture

  const isAcademy = day_of_week != null

  const badgeClass =
    status_label === '모집중' ? 'bg-green-50 text-green-700'
    : status_label === '진행중' ? 'bg-blue-50 text-blue-700'
    : status_label === '모집 마감' ? 'bg-red-50 text-red-700'
    : 'bg-gray-100 text-gray-600'

  const content = (
    <div className="h-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:ring-2 hover:ring-gray-100 hover:-translate-y-1 transition-all duration-200 ease-in-out flex flex-col justify-between space-y-4">
      {/* ── 제목 ── */}
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
        {title}
      </h3>

      {/* ── 일정 & 상태 ── */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        {isAcademy ? `${day_of_week} · ${time}` : `${start_date} ~ ${end_date}`}
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass}`}>
          {status_label}
        </span>
      </div>

      {/* ── D-Day & 모집 현황 ── */}
      <div className="flex justify-between items-center text-sm text-gray-700 mt-auto">
        <span className="text-red-500 font-semibold">{d_day}</span>
        {isAcademy && <span>모집: <strong>{remain}</strong>명</span>}
      </div>
    </div>
  )

  return isAcademy ? (
    <Link to={`/lectures/${id}`} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  )
}
