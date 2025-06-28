import api from './axios';

// 전체 강의를 가져옵니다.
export function fetchLectures() {
  return api.get('/lectures/');
}

// 전체 공지·소식을 가져옵니다.
export function fetchNews() {
  return api.get('/news/');
}

// 활성 팝업 배너를 가져옵니다.
export function fetchPopup() {
  return api.get('/popup/');
}