// HRD-Net 연동 강의
export async function fetchHrdLectures({ pageParam = 1 }) {
  const res = await fetch(`/api/lectures/hrd/?page=${pageParam}`);
  if (!res.ok) throw new Error("HRD-Net 강의 목록을 불러올 수 없습니다.");
  return res.json();
}

export async function fetchHrdLectureDetail(process_id, tracse_tme, torg_id) {
  const query = `?tracse_tme=${tracse_tme}&torg_id=${torg_id}`;
  const res = await fetch(`/api/lectures/hrd/${process_id}/${query}`);
  if (!res.ok) throw new Error("HRD-Net 강의 상세를 불러올 수 없습니다.");
  return res.json();
}