const ACADEMY_BASE = '/api/lectures'
const HRD_BASE     = '/api/lectures/hrd'

/**
 * 내부 강의 리스트 조회
 */
export async function fetchAcademyLectures({ page = 1, page_size = 10 } = {}) {
  const q   = new URLSearchParams({ page, page_size })
  const res = await fetch(`${ACADEMY_BASE}/?${q}`)
  if (!res.ok) throw new Error('Academy lectures fetch failed')
  const data = await res.json()

  return {
    total_count:   data.total_count ?? data.count,
    total_pages:   data.total_pages ?? Math.ceil((data.count ?? 0) / page_size),
    current_page:  data.current_page ?? page,
    next:          data.next,
    previous:      data.previous,
    results:       data.results.map(item => ({
      id:           item.id,
      title:        item.title,
      day_of_week:  item.day_of_week,
      time:         item.time,
      start_date:   item.start_date,
      end_date:     item.end_date,
      capacity:     null,
      applied:      null,
      remain:       item.remain,
      status_label: item.status,
      d_day:        `D-${item.days_left}`,
    }))
  }
}
/**
 * HRD-Net 강의 리스트 조회
 */
export async function fetchHrdLectures({ page = 1, page_size = 10 } = {}) {
  const q   = new URLSearchParams({ page, page_size })
  const res = await fetch(`${HRD_BASE}/?${q}`)
  if (!res.ok) throw new Error('HRD lectures fetch failed')
  const data = await res.json()

  return {
    total_count:   data.total_count,
    total_pages:   data.total_pages,
    current_page:  data.current_page,
    next:          data.next,
    previous:      data.previous,
    results:       data.results.map(item => ({
      process_id:    item.process_id,
      process_time:  item.process_time,
      torg_id:       item.torg_id,
      title:         item.title,
      start_date:    item.start_date,
      end_date:      item.end_date,
      capacity:      item.capacity,
      applied:       item.applied,
      remain:        item.remaining_slots,
      status_label:  item.status_label,
      d_day:         item.d_day,
    }))
  }
}

/**
 * 내부 강의 상세 조회
 */
export async function fetchLecture(id) {
  const res = await fetch(`${ACADEMY_BASE}/${id}/`)
  if (!res.ok) throw new Error('강의 상세 조회 실패')
  return res.json()
}

/**
 * HRD-Net 강의 상세 조회
 * @param {{ trpr_id: string, tracse_tme: string, torg_id: string }} params
 */
export async function fetchHrdLectureDetail({ trpr_id, tracse_tme, torg_id }) {
  const q = new URLSearchParams({ tracse_tme, torg_id })
  const res = await fetch(`${HRD_BASE}/${trpr_id}/?${q}`)
  if (!res.ok) throw new Error('HRD-Net 강의 상세 조회 실패')
  return res.json()
}