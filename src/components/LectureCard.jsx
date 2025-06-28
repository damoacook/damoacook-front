import React from 'react'
import { Link } from 'react-router-dom'

export default function LectureCard({ lecture, to }) {
  const {
    title, d_day, status_label,
    day_of_week, time,
    start_date, end_date,
    capacity, applied, remain
  } = lecture

  // 배지 색
  const badgeClass =
    status_label === '모집중'      ? 'bg-green-100 text-green-800'
  : status_label === '진행중'      ? 'bg-blue-100 text-blue-800'
  : status_label === '모집 마감'   ? 'bg-red-100 text-red-800'
  :                                'bg-gray-100 text-gray-600'

  // 내부강의인지 HRD인지
  const isAcademy = day_of_week != null

  return (
    <Link to={to} className="block bg-white rounded-lg shadow hover:shadow-md transition">
      {/* 타이틀 + 배지 */}
      <div className="flex justify-between items-start p-4">
        <h3 className="text-lg font-semibold text-gray-800" style={{ minHeight: '3rem' }}>
          {title}
        </h3>

      </div>

      {/* 일정 */}
      <div className="px-4 py-2 flex justify-between items-center text-sm text-gray-600">
        {isAcademy
          ? `${day_of_week} · ${time}`
          : `${start_date} ~ ${end_date}`}
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClass}`}>
          {status_label}
        </span>
      </div>

      {/* D-Day + 현황 */}
        <div className="flex justify-between items-center p-4 text-sm text-gray-700">
        <span className="font-bold text-red-500">{d_day}</span>
        {isAcademy ? (
            <span>모집: <strong>{remain}</strong>명</span>
        ) : (
            null // HRD는 인원 미표시
        )}
        </div>
    </Link>
  )
}