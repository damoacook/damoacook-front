export async function fetchGalleryList() {
  const res = await fetch('/api/gallery/');
  if (!res.ok) throw new Error('갤러리를 불러오지 못했습니다.');
  return res.json();
}

export async function fetchGalleryDetail(id) {
  const res = await fetch(`/api/gallery/${id}/`);
  if (!res.ok) throw new Error('갤러리 상세를 불러오지 못했습니다.');
  return res.json();
}