function authHeaders() {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 공지사항 목록 조회 (페이지네이션 지원, 8개 고정)
export async function fetchNewsList({ page = 1, page_size = 8 } = {}) {
  const qs = new URLSearchParams();
  qs.set('page', String(page));
  qs.set('page_size', String(page_size));

  const res = await fetch(`/api/news/?${qs.toString()}`);
  if (!res.ok) throw new Error('공지사항 목록을 불러오지 못했습니다.');
  return res.json(); // { total_count, total_pages, current_page, results: [...] }
}

// 공지사항 상세 조회
export async function fetchNewsDetail(id) {
  const res = await fetch(`/api/news/${id}/`);
  if (!res.ok) throw new Error('공지사항 상세를 불러오지 못했습니다.');
  return res.json();
}

// 공지사항 생성
export async function createNewsItem({ title, content, imageFile }) {
  if (!title?.trim()) throw new Error('제목을 입력해주세요.');
  if (!content?.trim()) throw new Error('내용을 입력해주세요.');

  const fd = new FormData();
  fd.append('title', title.trim());
  fd.append('content', content);
  if (imageFile instanceof File) fd.append('image', imageFile);

  const res = await fetch('/api/news/', {
    method: 'POST',
    headers: { ...authHeaders() },
    body: fd,
    credentials: 'include',
  });
  if (!res.ok) throw new Error('공지사항 생성 실패');
  return res.json();
}

// 공지사항 수정
export async function updateNewsItem(id, { title, content, imageFile, removeImage = false }) {
  const fd = new FormData();
  if (title != null)   fd.append('title', title);
  if (content != null) fd.append('content', content);

  //  삭제 전용 플래그
  if (removeImage) fd.append('remove_image', 'true');

  // 새 파일이 있으면 교체
  if (imageFile instanceof File) fd.append('image', imageFile);

  const res = await fetch(`/api/news/${id}/`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}` },
    body: fd,                 // ← Content-Type 직접 지정하지 않기
    credentials: 'include',
  });
  if (!res.ok) throw new Error('공지사항 수정 실패');
  return res.json();
}

// 공지사항 삭제
export async function deleteNewsItem(id) {
  const res = await fetch(`/api/news/${id}/`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('공지사항 삭제 실패');
  return true;
}