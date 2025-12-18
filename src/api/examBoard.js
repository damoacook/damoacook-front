function authHeaders() {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 목록 (검색+페이지네이션)
export async function fetchExamList({ page = 1, page_size = 8, search = '' } = {}) {
  const qs = new URLSearchParams();
  qs.set('page', String(page));
  qs.set('page_size', String(page_size));
  if (search) qs.set('search', search);

  const res = await fetch(`/api/exam-board/exam-posts/?${qs.toString()}`);
  if (!res.ok) throw new Error('시험정보 목록을 불러오지 못했습니다.');
  return res.json(); // { total_count, total_pages, current_page, results: [{ no, ...}] }
}

// 상세
export async function fetchExamDetail(id) {
  const res = await fetch(`/api/exam-board/exam-posts/${id}/`);
  if (!res.ok) throw new Error('시험정보 상세를 불러오지 못했습니다.');
  return res.json();
}

// 생성 (첨부 여러 개)
export async function createExamPost({ title, content, status = 'DRAFT', files = [] }) {
  if (!title?.trim()) throw new Error('제목을 입력해주세요.');
  const fd = new FormData();
  fd.append('title', title.trim());
  fd.append('content', content || '');
  fd.append('status', status);
  (files || []).forEach(f => f instanceof File && fd.append('attachments', f));
  const res = await fetch('/api/exam-board/exam-posts/', {
    method: 'POST',
    headers: { ...authHeaders() },
    body: fd,
    credentials: 'include',
  });
  if (!res.ok) throw new Error('시험정보 생성 실패');
  return res.json();
}

// 수정 (부분 수정 + 첨부 추가)
export async function updateExamPost(id, { title, content, status, addFiles = [] }) {
  const fd = new FormData();
  if (title != null)   fd.append('title', title);
  if (content != null) fd.append('content', content);
  if (status != null)  fd.append('status', status);
  (addFiles || []).forEach(f => f instanceof File && fd.append('attachments', f));

  const res = await fetch(`/api/exam-board/exam-posts/${id}/`, {
    method: 'PATCH',
    headers: { ...authHeaders() }, // Content-Type 지정 X (FormData 자동)
    body: fd,
    credentials: 'include',
  });
  if (!res.ok) throw new Error('시험정보 수정 실패');
  return res.json();
}

// 첨부 삭제(관리자)
export async function deleteExamAttachment(attId) {
  const res = await fetch(`/api/exam-board/exam-attachments/${attId}/`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('첨부 삭제 실패');
  return true;
}

// CKEditor 인라인 이미지 업로드
export async function uploadExamInlineImage(file) {
  const form = new FormData();
  form.append('upload', file); // 서버가 request.FILES['upload']로 받음

  const res = await fetch('/api/exam-board/uploads/images/', {
    method: 'POST',
    body: form,
    credentials: 'include', // 세션/JWT-쿠키 기반이면 필수
  });

  if (res.status === 401) throw new Error('로그인이 필요합니다.');
  if (res.status === 403) throw new Error('이미지 업로드 권한이 없습니다(관리자만).');
  if (!res.ok) throw new Error('이미지 업로드 실패');

  return res.json(); // { url }
}