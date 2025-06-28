import axios from 'axios';

export default axios.create({
  baseURL: '/api',      // 도메인, 포트 정보 없이 /api로만
  headers: { 'Content-Type': 'application/json' },
});