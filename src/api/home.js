import api from './axios';

// 전체 강의
export function fetchLectures() {
  return api.get('/lectures/');
}

// 전체 공지·소식
export function fetchNews() {
  return api.get('/news/');
}

// 활성 팝업 배너
export function fetchPopup() {
  return api.get('/popup/');
}