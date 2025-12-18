import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from "./components/MainLayout";

// Top-level pages
import HomePage from './pages/Home';
import LecturesPage from './pages/LecturesPage';
import LectureDetailPage from './pages/LectureDetailPage'
import HrdLectureDetailPage from './pages/HrdLectureDetailPage'
import LectureEditorPage from './pages/LectureEditorPage';
import CertificateDetailPage from './pages/certificates/CertificateDetailPage'
import InquiryPage from './pages/inquiries/InquiryPage';
import LoginPage from './pages/login/LoginPage';
import PopupManageList from './pages/popup/PopupManageList';
import PopupManageForm from './pages/popup/PopupManageForm';

// About pages
import AboutLayout from './pages/about/AboutLayout';
import GreetingPage from './pages/about/GreetingPage';
import HistoryPage  from './pages/about/HistoryPage';
import VisionPage   from './pages/about/VisionPage';
import PartnersPage from './pages/about/PartnersPage';
import FacilitiesPage from "./pages/about/FacilitiesPage";
import LocationSection from "./pages/about/LocationSection";

// Community pages
import CommunityLayout from './components/CommunityLayout';
import NewsPage from './pages/Community/NewsPage';
import NewsDetailPage from './pages/Community/NewsDetailPage';
import NewsEditorPage from './pages/Community/NewsEditorPage';
import GalleryPage from './pages/Community/GalleryPage';
import GalleryDetailPage from './pages/Community/GalleryDetailPage';
import GalleryEditorPage from './pages/Community/GalleryEditorPage';
// import ExamPage from './pages/Community/ExamPage';
// import ExamDetailPage from './pages/Community/ExamDetailPage';
// import ExamEditorPage from './pages/Community/ExamEditorPage';
import RequireAuth from './routes/RequireAuth';

import LegalPrivacy from "./pages/LegalPrivacy";


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
          <Route path="lectures/hrd/preview" element={<HrdLectureDetailPage />} />
          <Route path="lectures/new" element={<LectureEditorPage />} />
          <Route path="lectures/:id/edit" element={<LectureEditorPage />} />
          <Route path="/lectures/:id" element={<LectureDetailPage />} />
          <Route path="inquiries" element={<InquiryPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/popup/manage" element={<PopupManageList />} />
          <Route path="/popup/manage/new" element={<PopupManageForm />} />
          <Route path="/popup/manage/:id/edit" element={<PopupManageForm />} />

          {/* ── About (중첩 라우트) */}
          <Route path="about" element={<AboutLayout />}>
            {/* /about 또는 /about/greeting 모두 인사말 */}
            <Route index element={<GreetingPage />} />
            <Route path="greeting" element={<GreetingPage />} />
            {/* 추가 구현 시 주석 해제 */}
            <Route path="history"  element={<HistoryPage  />} />
            <Route path="vision"   element={<VisionPage   />} />
            <Route path="partners" element={<PartnersPage />} />
            <Route path="facilities" element={<FacilitiesPage />} />
            <Route path="location" element={<LocationSection />} />
          </Route>

          {/* ── Community (중첩 라우트) */}
          <Route path="/news" element={<CommunityLayout />}>
            <Route index element={<NewsPage />} />
            <Route path="new" element={<NewsEditorPage />} />
            <Route path=":id" element={<NewsDetailPage />} />
            <Route path=":id/edit" element={<NewsEditorPage />} />
          </Route>

          <Route path="/gallery" element={<CommunityLayout />}>
            <Route index element={<GalleryPage />} />
            <Route path=":id" element={<GalleryDetailPage />} />
            {/* 작성(신규) — 로그인 필요 */}
            <Route path="new" element={<RequireAuth><GalleryEditorPage /></RequireAuth>}/>
            {/* 수정 — 로그인 필요 */}
            <Route path=":id/edit" element={<RequireAuth><GalleryEditorPage /></RequireAuth>}/>
          </Route>
          <Route path="/certificates/:slug" element={<CertificateDetailPage />} />
          
          {/* <Route path="/exam" element={<CommunityLayout />}>
            <Route index element={<ExamPage />} />
            <Route path=":id" element={<ExamDetailPage />} />
            <Route
              path="new"
              element={
                <RequireAuth>
                  <ExamEditorPage mode="create" />
                </RequireAuth>
              }
            />
            <Route
              path=":id/edit"
              element={
                <RequireAuth>
                  <ExamEditorPage mode="edit" />
                </RequireAuth>
              }
            />
          </Route> */}
          {/* ── 그 외: 홈으로 리다이렉트 */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          <Route path="/privacy" element={<LegalPrivacy />} />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}