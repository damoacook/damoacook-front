import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Lectures from "../pages/Lectures"
import Contact from "../pages/Contact"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}