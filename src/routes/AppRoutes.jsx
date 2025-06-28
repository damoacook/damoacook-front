import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import LecturesPage from "../pages/LecturesPage"
import LectureDetailPage from '../pages/LectureDetailPage';
import HrdLectureDetailPage from '../pages/HrdLectureDetailPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="lectures" element={<LecturesPage />} />
        <Route path="lectures/hrd/:process_id" element={<HrdLectureDetailPage />} />
        <Route path="lectures/:id" element={<LectureDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}