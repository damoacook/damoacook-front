// src/components/Header.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaChevronDown,
  FaBars,
  FaTimes,
} from 'react-icons/fa'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState({
    about: false,
    lectures: false,
    news: false,
  })

  const toggleSubmenu = key => {
    setSubmenuOpen(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <header>
      {/* 상단 로그인 바 */}
      <div className="bg-orange-300 text-white text-xs h-6 flex items-center justify-end px-4">
        <Link to="/login" className="hover:underline">
          로그인
        </Link>
      </div>

      {/* 메인 내비 */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
          {/* 로고 */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 flex items-center"
          >
            <img
              src="/images/다모아로고.png"
              alt="로고"
              className="h-15 mr-2"
            />
            다모아요리학원
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {/* 드롭다운 */}
              <li className="relative group">
                <button className="flex items-center gap-1 text-gray-800 hover:text-orange-500">
                  학원소개 <FaChevronDown className="text-xs" />
                </button>
                <ul className="absolute top-full left-0 mt-0 w-40 bg-white shadow-lg rounded divide-y divide-gray-100 hidden group-hover:block z-10">
                  {[
                    ['인사말', '/about/greeting'],
                    ['연혁', '/about/history'],
                    ['비전', '/about/vision'],
                    ['협력업체', '/about/partners'],
                    ['위치안내', '/location'],
                  ].map(([label, to]) => (
                    <li key={to}>
                      <Link to={to} className="block px-4 py-2 text-gray-800 hover:text-orange-500 hover:bg-gray-100">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* 일반 메뉴 */}
              <li>
                <Link
                  to="/lectures"
                  className="text-gray-800 hover:text-orange-500"
                >
                  모집과정
                </Link>
              </li>

              {/* 또 다른 드롭다운 */}
              <li className="relative group">
                <button className="flex items-center gap-1 text-gray-800 hover:text-orange-500">
                  학원소식 <FaChevronDown className="text-xs" />
                </button>
                <ul className="absolute top-full left-0 mt-0 w-40 bg-white shadow-lg rounded divide-y divide-gray-100 hidden group-hover:block z-10">
                  {[
                    ['공지사항', '/news'],
                    ['갤러리', '/gallery'],
                  ].map(([label, to]) => (
                    <li key={to}>
                      <Link to={to} className="block px-4 py-2 text-gray-800 hover:text-orange-500 hover:bg-gray-100">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* 수강문의 메뉴 */}
              <li>
                <Link
                  to="/inquiries"
                  className="text-gray-800 hover:text-orange-500"
                >
                  수강문의
                </Link>
              </li>
              {/* …추가 메뉴 */}
            </ul>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden text-gray-600 text-xl"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200">
            <ul className="flex flex-col">
              {/* 학원소개 토글 */}
              <li className="border-b">
                <button
                  onClick={() => toggleSubmenu('about')}
                  className="w-full flex justify-between items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
                >
                  학원소개
                  <FaChevronDown className={submenuOpen.about ? 'rotate-180' : ''} />
                </button>

                {/* 하위메뉴 */}
                {submenuOpen.about && (
                  <ul>
                    {[
                      ['인사말', '/about/greeting'],
                      ['연혁', '/about/history'],
                      ['비전', '/about/vision'],
                      ['협력업체', '/about/partners'],
                      ['위치안내', '/location'],
                    ].map(([label, to]) => (
                      <li key={to} className="pl-8 bg-orange-400">
                        <Link
                          to={to}
                          className="block py-2 text-white hover:text-orange-600"
                          onClick={() => {
                          // 메뉴 선택 후 닫기
                          setSubmenuOpen(prev => ({ ...prev, about: false }))
                          setMobileOpen(false)
                        }}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* 2. 모집과정 */}
            <li className="border-b">
              <button
                onClick={() => toggleSubmenu('lectures')}
                className="w-full flex justify-between items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
              >
                모집과정
                <FaChevronDown className={submenuOpen.lectures ? 'rotate-180' : ''} />
              </button>
              {submenuOpen.lectures && (
                <ul>
                  <li className="pl-8 bg-orange-400">
                    <Link
                      to="/lectures"
                      className="block py-2 text-white hover:text-orange-600"
                      onClick={() => {
                        setSubmenuOpen(prev => ({ ...prev, lectures: false }))
                        setMobileOpen(false)
                      }}
                    >
                      전체 과정 보기
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 3. 학원소식 */}
            <li className="border-b">
              <button
                onClick={() => toggleSubmenu('news')}
                className="w-full flex justify-between items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
              >
                학원소식
                <FaChevronDown className={submenuOpen.news ? 'rotate-180' : ''} />
              </button>
              {submenuOpen.news && (
                <ul>
                  {[
                    ['공지사항', '/news'],
                    ['갤러리', '/gallery']
                  ].map(([label, to]) => (
                    <li key={to} className="pl-8 bg-orange-400">
                      <Link
                        to={to}
                        className="block py-2 text-white hover:text-orange-600"
                        onClick={() => {
                          setSubmenuOpen(prev => ({ ...prev, news: false }))
                          setMobileOpen(false)
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

              {/* 수강문의 */}
            <li className="border-b">
              <button
                onClick={() => toggleSubmenu('inquiries')}
                className="w-full flex justify-between items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
              >
                수강문의
                <FaChevronDown className={submenuOpen.inquiries ? 'rotate-180' : ''} />
              </button>
              {submenuOpen.inquiries && (
                <ul>
                  <li className="pl-8 bg-orange-400">
                    <Link
                      to="/inquiries"
                      className="block py-2 text-white hover:text-orange-600"
                      onClick={() => {
                        setSubmenuOpen(prev => ({ ...prev, inquiries: false }))
                        setMobileOpen(false)
                      }}
                    >
                      수강문의 하기
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            {/* …필요한 만큼 메뉴 추가 */}
          </ul>
        </nav>
      )}
      </div>
    </header>
  )
}
