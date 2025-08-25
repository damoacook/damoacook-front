const ACADEMY_BASE = '/api/lectures'
const HRD_BASE     = '/api/lectures/hrd'

/**
 * 내부 강의 리스트 조회
 */
export async function fetchAcademyLectures({ page = 1, page_size = 10 } = {}) {
  const q   = new URLSearchParams({ page, page_size });
  const res = await fetch(`/api/lectures/?${q}`);
  if (!res.ok) throw new Error('Academy lectures fetch failed');
  const data = await res.json();

  return {
    total_count:   data.total_count ?? data.count,
    total_pages:   data.total_pages ?? Math.ceil((data.count ?? 0) / page_size),
    current_page:  data.current_page ?? page,
    next:          data.next,
    previous:      data.previous,
    results:       (data.results || []).map(item => {
      const cap = item.capacity ?? null;
      const app = item.applied ?? null;
      return {
        id:           item.id,
        title:        item.title,
        day_of_week:  item.day_of_week ?? null,
        time:         item.time ?? null,
        start_date:   item.start_date,
        end_date:     item.end_date,
        capacity:     cap,                 // ✅ 서버 값 유지
        applied:      app,                 // ✅ 서버 값 유지
        remain:       item.remain ?? (cap != null && app != null ? Math.max(cap - app, 0) : null),
        status_label: item.status,         // 원본도 유지(카드에서 보정 계산)
        d_day:        item.days_left != null ? `D-${item.days_left}` : null,
      };
    })
  };
}

/**
 * HRD-Net 강의 리스트 조회
 */
export async function fetchHrdLectures({ page = 1, page_size = 10 } = {}) {
  const q   = new URLSearchParams({ page, page_size })
  const res = await fetch(`/api/lectures/hrd/?${q}`)
  if (!res.ok) throw new Error('HRD lectures fetch failed')
  const data = await res.json()

  return {
    total_count:   data.total_count,
    total_pages:   data.total_pages,
    current_page:  data.current_page,
    next:          data.next,
    previous:      data.previous,
    results: data.results.map(item => ({
      process_id:   item.process_id   ?? item.trprId ?? item.trpr_id ?? item.TRPR_ID,
      process_time: item.process_time ?? item.trprDegr ?? item.tracse_tme ?? item.TRACSE_TME,
      // ✅ torg_id 보강
      torg_id:      item.torg_id
                ?? item.trainstCstmrId
                ?? item.trainstCstmrID
                ?? item.torgId
                ?? item.TorgId
                ?? item.torgID
                ?? item.insttOrgNo
                ?? item.trainstId
                ?? item.TRAINST_CSTMR_ID
                ?? item.INSTT_ORG_NO,

      title:        item.title,
      start_date:   item.start_date,
      end_date:     item.end_date,
      capacity:     item.capacity,
      applied:      item.applied,
      remain:       item.remaining_slots,
      status_label: item.status_label,
      d_day:        item.d_day,
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
 * HRD-Net 강의 상세 조회 (trpr_id만 필수, tracse_tme+torg_id는 둘 다 있을 때만 전송)
 * @param {{ trpr_id: string, tracse_tme?: string|number, torg_id?: string|number }} params
 */
export async function fetchHrdLectureDetail({ trpr_id, tracse_tme, torg_id }) {
  if (!trpr_id || !tracse_tme) {
    throw new Error('HRD 상세 조회에는 trpr_id와 tracse_tme가 필요합니다.');
  }
  const q = new URLSearchParams({ tracse_tme: String(tracse_tme) });
  if (torg_id) q.set('torg_id', String(torg_id)); // 있으면 같이 전달
  const res = await fetch(`/api/lectures/hrd/${trpr_id}/?${q.toString()}`);
  if (!res.ok) throw new Error('HRD-Net 강의 상세 조회 실패');
  return res.json();
}

/**
 * ✅ 전체 강의 리스트 조회 (HRD 식별자도 보존)
 */
export async function fetchAllLectures({ page = 1, page_size = 10 } = {}) {
  const q = new URLSearchParams({ page, page_size });
  const res = await fetch(`/api/lectures/all/?${q}`);
  if (!res.ok) throw new Error("전체 강의 조회 실패");
  const data = await res.json();

  return {
    total_count: data.total_count ?? data.count,
    total_pages: data.total_pages ?? Math.ceil((data.count ?? 0) / page_size),
    current_page: data.current_page ?? page,
    next: data.next,
    previous: data.previous,
    results: data.results.map((item) => ({
      // 내부 강의용
      id: item.id ?? null,

      // ✅ HRD 식별자 보존(여러 네이밍 케이스 흡수)
      process_id:   item.process_id   ?? item.trpr_id   ?? item.trprId   ?? item.TRPR_ID ?? null,
      process_time: item.process_time ?? item.tracse_tme?? item.tracseTme?? item.TRACSE_TME ?? null,
      torg_id:      item.torg_id      ?? item.torgId    ?? item.TORG_ID ?? null,

      // 공통 표시 필드
      title:        item.title,
      day_of_week:  item.day_of_week ?? null,
      time:         item.time ?? null,
      start_date:   item.start_date,
      end_date:     item.end_date,
      capacity:     item.capacity ?? null,
      applied:      item.applied ?? null,
      remain:       item.remain ?? null,
      status_label: item.status_label ?? item.status ?? "정보 없음",
      d_day:        item.d_day ?? "D-DAY",
    })),
  };
}

function authHeaders() {
  const token = localStorage.getItem('accessToken');
  // 👉 접두사는 뉴스/갤러리에서 쓰던 걸로 통일하세요.
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function createAcademyLecture(payload) {
  const headers = authHeaders();
  let body;

  if (payload.imageFile instanceof File) {
    const fd = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null) fd.append(k, v);
    });
    body = fd;
    // FormData: Content-Type 자동 설정
  } else {
    body = JSON.stringify(payload);
    // JSON: Content-Type 필요
    Object.assign(headers, { 'Content-Type': 'application/json' });
  }

  const res = await fetch(`/api/lectures/create/`, {
    method: 'POST',
    headers,
    body,
    credentials: 'include',
  });

  if (!res.ok) {
    const text = await res.text().catch(()=>'');
    throw new Error(`강의 생성 실패 (${res.status}) ${text}`);
  }
  return res.json();
}

// 내부 강의 수정  ✅ 엔드포인트: /<id>/update/
export async function updateAcademyLecture(id, payload) {
  const token = localStorage.getItem('accessToken')
  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  const hasFile = payload.imageFile instanceof File
  let body
  if (hasFile) {
    const fd = new FormData()
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null) fd.append(k, v)
    })
    body = fd
  } else {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(payload)
  }

  const res = await fetch(`${ACADEMY_BASE}/${id}/update/`, {
    method: 'PATCH', // 뷰가 UpdateAPIView라 PATCH/PUT 모두 허용
    headers,
    body,
    credentials: 'include',
  })
  if (!res.ok) throw new Error(`강의 수정 실패 (${res.status})`)
  return res.json()
}

// 내부 강의 삭제  ✅ 엔드포인트: /<id>/
export async function deleteAcademyLecture(id) {
  const token = localStorage.getItem('accessToken')
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  const res = await fetch(`${ACADEMY_BASE}/${id}/`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  })
  if (!res.ok) throw new Error(`강의 삭제 실패 (${res.status})`)
  return true
}

