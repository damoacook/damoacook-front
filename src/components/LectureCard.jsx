import React from 'react'
import { Link } from 'react-router-dom'

export default function LectureCard({ lecture, disableInternalLink = false }) {
  const {
    title, d_day,
    status_label, status, state, state_label,
    day_of_week, time,
    start_date, end_date,
    capacity, applied, remain,
    id
  } = lecture

  // 학원(자체) 여부
  const isAcademy = day_of_week != null

  // 숫자 안전 변환
  const toNum = (v) => (v === 0 || v === '0') ? 0 : (v != null && v !== '' ? Number(v) : null)
  const cap = toNum(capacity)
  const app = toNum(applied)
  const rem = toNum(remain)

  // 표기 인원 텍스트
  let rightText = ''
  if (isAcademy) {
    const hasBoth = cap != null && cap > 0 && app != null
    rightText = hasBoth
      ? `${app} / ${cap}명`
      : (rem != null ? `잔여 ${Math.max(rem, 0)}명` : (cap != null ? `정원 ${cap}명` : ''))
  } else {
    rightText = cap != null ? `정원 ${cap}명` : ''
  }

  // ===== 날짜 파싱 & 비교 유틸 =====
  const stripTime = (d) => (d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()) : null)
  const parseKDate = (val) => {
    if (!val) return null
    // ISO면 Date에 맡기고, 아니면 직접 연/월/일만 사용(타임존 무시)
    if (/\dT\d/.test(val)) {
      const dt = new Date(val)
      return isNaN(dt) ? null : dt
    }
    const m = String(val).match(/^(\d{4})[-./](\d{1,2})[-./](\d{1,2})/)
    if (!m) {
      const dt = new Date(val)
      return isNaN(dt) ? null : dt
    }
    const y = Number(m[1]), mo = Number(m[2]), d = Number(m[3])
    if (!y || !mo || !d) return null
    return new Date(y, mo - 1, d)
  }
  const computeFromDates = (start, end) => {
    const s = stripTime(parseKDate(start))
    const e = stripTime(parseKDate(end))
    const now = stripTime(new Date())
    if (s && now < s) return '모집중'
    if (s && e) {
      if (now >= s && now <= e) return '진행중'
      if (now > e) return '모집 마감'
    }
    if (s && !e) {
      return now >= s ? '진행중' : '모집중'
    }
    return '' // 판단 불가
  }

  // 문자열 라벨 정규화
  const hasRecruitingText = (raw) => {
    if (!raw) return false
    const s = String(raw).toLowerCase().replace(/\s/g, '')
    return ['모집중','접수중','신청중','open','recruit','recruiting'].some(k => s.includes(k))
  }
  const hasOngoingText = (raw) => {
    if (!raw) return false
    const s = String(raw).toLowerCase().replace(/\s/g, '')
    return ['진행중','운영중','inprogress','ongoing'].some(k => s.includes(k))
  }
  const hasClosedText = (raw) => {
    if (!raw) return false
    const s = String(raw).toLowerCase().replace(/\s/g, '')
    return ['마감','종료','closed','end'].some(k => s.includes(k))
  }

  // 🔥 상태 일관화: 날짜 우선 → 불리언 → 문자열 → D-DAY → 기본값
  const normalizedStatus = (() => {
    const byDate = computeFromDates(start_date, end_date)
    if (byDate) return byDate

    if (lecture?.is_recruiting === true || lecture?.recruiting === true || lecture?.is_open === true)
      return '모집중'

    const raw = status_label || status || state_label || state
    if (hasRecruitingText(raw)) return '모집중'
    if (hasOngoingText(raw))   return '진행중'
    if (hasClosedText(raw))    return '모집 마감'

    if (typeof d_day === 'string' && /^D-\d+/.test(d_day)) return '모집중'

    return '진행중'
  })()

  // 배지 색상
  const badgeClass =
    normalizedStatus === '모집중'     ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
    : normalizedStatus === '진행중'   ? 'bg-blue-50 text-blue-700 ring-blue-200'
    : normalizedStatus === '모집 마감' ? 'bg-rose-50 text-rose-700 ring-rose-200'
    : 'bg-gray-100 text-gray-700 ring-gray-200'

  // 기간 포맷
  const fmt = (d) => {
    if (!d) return ''
    const m = d.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
    if (m) return `${Number(m[2])}.${Number(m[3])}`
    return d // 포맷 불명시 원문 유지
  }
  const period = isAcademy
    ? `${day_of_week ?? ''}${time ? ` · ${time}` : ''}`
    : (start_date && end_date ? `${fmt(start_date)} ~ ${fmt(end_date)}` : `${start_date ?? ''} ~ ${end_date ?? ''}`)

  const cardInner = (
    <div className="
      h-full rounded-2xl border border-gray-100 bg-white
      shadow-sm hover:shadow-lg transition hover:-translate-y-0.5 duration-200 ease-in-out
      relative overflow-hidden
    ">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 opacity-80" />
      <div className="p-4 flex flex-col gap-3 h-full">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2">{title}</h3>

        <div className="flex items-start justify-between gap-2">
          <div className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200">
            <span className="text-xs" aria-hidden>📅</span>
            {period || '-'}
          </div>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold ring-1 ring-inset ${badgeClass}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {normalizedStatus}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between text-sm">
          <span className="text-rose-600 font-semibold">{d_day}</span>
          {rightText && <span className="text-gray-700">{rightText}</span>}
        </div>
      </div>
    </div>
  )

  if (disableInternalLink) return cardInner
  return isAcademy ? (
    <Link to={`/lectures/${id}`} className="block h-full">{cardInner}</Link>
  ) : (
    cardInner
  )
}
