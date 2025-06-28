export async function fetchNewsList() {
  const res = await fetch('/api/news/');
  if (!res.ok) throw new Error('공지사항 목록을 불러오지 못했습니다.');
  return res.json();
}

export async function fetchNewsDetail(id) {
  const res = await fetch(`/api/news/${id}/`);
  if (!res.ok) throw new Error('공지사항 상세를 불러오지 못했습니다.');
  return res.json();
}