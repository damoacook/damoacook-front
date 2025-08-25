export async function fetchGalleryList({ page = 1, page_size = 12, search = '', ordering = '-uploaded_at' } = {}) {
  const qs = new URLSearchParams();
  if (page) qs.set('page', String(page));
  if (page_size) qs.set('page_size', String(page_size));
  if (search) qs.set('search', search);
  if (ordering) qs.set('ordering', ordering);

  const res = await fetch(`/api/gallery/?${qs.toString()}`);
  if (!res.ok) throw new Error('갤러리를 불러오지 못했습니다.');
  return res.json(); // { count, next, previous, results: [...] }
}

export async function fetchGalleryDetail(id) {
  const res = await fetch(`/api/gallery/${id}/`);
  if (!res.ok) throw new Error('갤러리 상세를 불러오지 못했습니다.');
  return res.json();
}

function authHeaders() {
  const token = localStorage.getItem('accessToken'); // ← 네가 쓰는 키
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function createGalleryItem(payload) {
  // payload: { title, description?, imageFile? or imageUrl? }
  const hasFile = payload.imageFile instanceof File;

  let body, headers;
  if (hasFile) {
    const fd = new FormData();
    fd.append('title', payload.title);
    if (payload.description) fd.append('description', payload.description);
    fd.append('image', payload.imageFile);
    body = fd;
    headers = { ...authHeaders() }; // ❗ Content-Type 자동
  } else {
    body = JSON.stringify({
      title: payload.title,
      description: payload.description || '',
      image: payload.imageUrl || '', // 서버가 URL 허용 시만 사용
    });
    headers = { 'Content-Type': 'application/json', ...authHeaders() };
  }

  const res = await fetch('/api/gallery/', {
    method: 'POST',
    headers,
    body,
    credentials: 'include',
  });
  if (!res.ok) throw new Error('갤러리 생성 실패');
  return res.json();
}

export async function updateGalleryItem(id, payload) {
  // payload: { title?, description?, imageFile? or imageUrl? }
  const hasFile = payload.imageFile instanceof File;

  let body, headers;
  if (hasFile) {
    const fd = new FormData();
    if (payload.title !== undefined)       fd.append('title', payload.title);
    if (payload.description !== undefined) fd.append('description', payload.description);
    fd.append('image', payload.imageFile);
    body = fd;
    headers = { ...authHeaders() }; // ❗ Content-Type 자동
  } else {
    body = JSON.stringify({
      ...(payload.title !== undefined ? { title: payload.title } : {}),
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.imageUrl ? { image: payload.imageUrl } : {}),
    });
    headers = { 'Content-Type': 'application/json', ...authHeaders() };
  }

  const res = await fetch(`/api/gallery/${id}/`, {
    method: 'PATCH', // ✅ DRF partial_update
    headers,
    body,
    credentials: 'include',
  });
  if (!res.ok) throw new Error('갤러리 수정 실패');
  return res.json();
}

export async function deleteGalleryItem(id) {
  const res = await fetch(`/api/gallery/${id}/`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('갤러리 삭제 실패');
  return true;
}