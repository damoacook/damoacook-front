import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from "./components/MainLayout";

// Top-level pages
import HomePage from './pages/Home';
import LecturesPage from './pages/LecturesPage';
import LectureDetailPage from './pages/LectureDetailPage'
import HrdLectureDetailPage from './pages/HrdLectureDetailPage'
import CertificatesPage from './pages/certificates/CertificatesPage';
import InquiryPage from './pages/inquiries/InquiryPage';
import LocationPage from './pages/location/LocationPage';
import LoginPage from './pages/login/LoginPage';

// About pages
import AboutLayout from './pages/about/AboutLayout';
import GreetingPage from './pages/about/GreetingPage';
// import HistoryPage  from './pages/about/HistoryPage';
// import VisionPage   from './pages/about/VisionPage';
// import PartnersPage from './pages/about/PartnersPage';

// Community pages
import CommunityLayout from './components/CommunityLayout';
import NewsPage from './pages/community/NewsPage';
import NewsDetailPage from './pages/community/NewsDetailPage';
import GalleryPage from './pages/community/GalleryPage';
import GalleryDetailPage from './pages/community/GalleryDetailPage';


export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          {/* ── 홈 */}
          <Route path="/" element={<HomePage />} />

          {/* ── 강의, 자격증, 문의, 오시는 길, 로그인 */}
          <Route path="lectures" element={<LecturesPage />} />
          {/* HRD-Net 강의 상세 (쿼리: ?tracse_tme=xx&torg_id=yy) - 더 구체적인 라우트를 먼저 */}
          <Route path="lectures/hrd/:trpr_id" element={<HrdLectureDetailPage />} />
          <Route path="/lectures/:id" element={<LectureDetailPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="inquiries" element={<InquiryPage />} />
          <Route path="location" element={<LocationPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* ── About (중첩 라우트) */}
          <Route path="about" element={<AboutLayout />}>
            {/* /about 또는 /about/greeting 모두 인사말 */}
            <Route index element={<GreetingPage />} />
            <Route path="greeting" element={<GreetingPage />} />
            {/* 추가 구현 시 주석 해제 */}
            {/* <Route path="history"  element={<HistoryPage  />} />
            <Route path="vision"   element={<VisionPage   />} />
            <Route path="partners" element={<PartnersPage />} /> */}
          </Route>

          {/* ── Community (중첩 라우트) */}
          <Route path="/news" element={<CommunityLayout />}>
            <Route index element={<NewsPage />} />
            <Route path=":id" element={<NewsDetailPage />} />
          </Route>
          <Route path="/gallery" element={<CommunityLayout />}>
            <Route index element={<GalleryPage />} />
            <Route path=":id" element={<GalleryDetailPage />} />
          </Route>

          {/* ── 그 외: 홈으로 리다이렉트 */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}