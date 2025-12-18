// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState({
    about: false,
    lectures: false,
    certificates: false,
    news: false,
    inquiries: false,
  });

  // 로그인 = 관리자
  const [accessToken, setAccessToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken') || null);
    setUserEmail(localStorage.getItem('userEmail') || null);
    // 라우트 변경 시 모바일 메뉴 닫기 & 아코디언 초기화
    setMobileOpen(false);
    setSubmenuOpen({
      about: false,
      lectures: false,
      certificates: false,
      news: false,
      inquiries: false,
    });
  }, [location.pathname]);

  const isLoggedIn = !!accessToken;
  const isAdmin = isLoggedIn;

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
    setAccessToken(null);
    setUserEmail(null);
    navigate('/');
  };

  const toggleSubmenu = (key) => {
    setSubmenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 자격증 과정 임시 비표시
  const SHOW_CERT_MENUS = false;

  return (
    <header>
      {/* 상단 로그인 바 */}
      <div className="bg-orange-300 text-white text-xs h-6 flex items-center justify-end px-4 space-x-4">
        {isLoggedIn ? (
          <>
            {isAdmin && (
              <Link
                to="/popup/manage"
                className="inline-flex items-center gap-1 hover:underline"
                title="팝업 관리"
              >
                <FiSettings className="text-sm" />
                팝업 관리
              </Link>
            )}
            <span>{userEmail || '관리자'} 님</span>
            <button onClick={handleLogout} className="hover:underline">
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">
            관리자 로그인
          </Link>
        )}
      </div>

      {/* 메인 내비 */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
          {/* 로고 */}
          <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center">
            <img src="/images/다모아요리학원로고.jpg" alt="로고" className="h-15 mr-2" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {/* 드롭다운: 학원소개 */}
              <li className="relative group">
                <button className="flex items-center gap-1 text-gray-800 hover:text-orange-500">
                  학원소개 <FaChevronDown className="text-xs" />
                </button>
                <ul
                  className="
                    absolute top-full left-0 mt-0 w-44 rounded bg-white shadow-lg divide-y divide-gray-100 z-20
                    opacity-0 invisible translate-y-1 pointer-events-none
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto
                    transition-all duration-150
                  "
                >
                  {[
                    ['인사말', '/about/greeting'],
                    ['연혁', '/about/history'],
                    ['시설소개', '/about/facilities'],
                    ['비전', '/about/vision'],
                    ['협력업체', '/about/partners'],
                    ['위치안내', '/about/location'], 
                  ].map(([label, to]) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="block px-4 py-2 text-gray-800 hover:text-orange-500 hover:bg-gray-50"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* 일반 메뉴 */}
              <li>
                <Link to="/lectures" className="text-gray-800 hover:text-orange-500">
                  모집과정
                </Link>
              </li>

              {/* 드롭다운: 자격증과정 (임시 비표시) */}
              {SHOW_CERT_MENUS && (
                <li className="relative group">
                  <button className="flex items-center gap-1 text-gray-800 hover:text-orange-500">
                    자격증과정 <FaChevronDown className="text-xs" />
                  </button>
                  <ul
                    className="
                      absolute top-full left-0 mt-0 w-56 rounded bg-white shadow-lg divide-y divide-gray-100 z-20
                      opacity-0 invisible translate-y-1 pointer-events-none
                      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto
                      transition-all duration-150
                    "
                  >
                    {[
                      ['한식조리기능사', '/certificates/korean'],
                      ['중식조리기능사', '/certificates/chinese'],
                      ['양식조리기능사', '/certificates/western'],
                      ['일식조리기능사', '/certificates/japanese'],
                      ['복어조리기능사', '/certificates/blowfish'],
                      ['떡제조기능사', '/certificates/ricecake'],
                      ['한식조리산업기사', '/certificates/korean-industry'],
                      ['중식조리산업기사', '/certificates/chinese-industry'],
                      ['조리기능장', '/certificates/masterchef'],
                    ].map(([label, to]) => (
                      <li key={to}>
                        <Link
                          to={to}
                          className="block px-4 py-2 text-gray-800 hover:text-orange-500 hover:bg-gray-50"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}

              {/* 드롭다운: 학원소식 (깜빡임 제거 버전) */}
              <li className="relative group">
                <button className="flex items-center gap-1 text-gray-800 hover:text-orange-500">
                  학원소식 <FaChevronDown className="text-xs" />
                </button>
                <ul
                  className="
                    absolute top-full left-0 mt-0 w-44 rounded bg-white shadow-lg divide-y divide-gray-100 z-20
                    opacity-0 invisible translate-y-1 pointer-events-none
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto
                    transition-all duration-150
                  "
                >
                  {[
                    ['공지사항', '/news'],
                    ['갤러리', '/gallery'],
                    // ['시험정보', '/exam'],
                  ].map(([label, to]) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="block px-4 py-2 text-gray-800 hover:text-orange-500 hover:bg-gray-50"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* 수강문의 */}
              <li>
                <Link to="/inquiries" className="text-gray-800 hover:text-orange-500">
                  수강문의
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden text-gray-600 text-xl"
            aria-label="모바일 메뉴"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200">
            <ul className="flex flex-col">
              {/* 관리자 전용 항목 */}
              {isAdmin && (
                <li className="border-b">
                  <Link
                    to="/popup/manage"
                    className="w-full flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    <FiSettings className="mr-2" />
                    팝업 관리
                  </Link>
                </li>
              )}

              {[
                {
                  key: 'about',
                  label: '학원소개',
                  links: [
                    ['인사말', '/about/greeting'],
                    ['연혁', '/about/history'],
                    ['시설소개', '/about/facilities'],
                    ['비전', '/about/vision'],
                    ['협력업체', '/about/partners'],
                    ['위치안내', '/about/location'], 
                  ],
                },
                {
                  key: 'lectures',
                  label: '모집과정',
                  links: [['전체 과정 보기', '/lectures']],
                },
                // 자격증 과정 임시 숨김
                ...(SHOW_CERT_MENUS
                  ? [
                      {
                        key: 'certificates',
                        label: '자격증과정',
                        links: [
                          ['한식조리기능사', '/certificates/korean'],
                          ['중식조리기능사', '/certificates/chinese'],
                          ['양식조리기능사', '/certificates/western'],
                          ['일식조리기능사', '/certificates/japanese'],
                          ['복어조리기능사', '/certificates/blowfish'],
                          ['떡제조기능사', '/certificates/ricecake'],
                          ['한식조리산업기사', '/certificates/korean-industry'],
                          ['중식조리산업기사', '/certificates/chinese-industry'],
                          ['조리기능장', '/certificates/masterchef'],
                        ],
                      },
                    ]
                  : []),
                {
                  key: 'news',
                  label: '학원소식',
                  links: [
                    ['공지사항', '/news'],
                    ['갤러리', '/gallery'],
                    // ['시험정보', '/exam'],
                  ],
                },
                {
                  key: 'inquiries',
                  label: '수강문의',
                  links: [['수강문의 하기', '/inquiries']],
                },
              ].map(({ key, label, links }) => (
                <li className="border-b" key={key}>
                  <button
                    onClick={() => toggleSubmenu(key)}
                    className="w-full flex justify-between items-center px-4 py-3 text-gray-800"
                    aria-expanded={!!submenuOpen[key]}
                    aria-controls={`mobile-sub-${key}`}
                  >
                    {label}
                    <FaChevronDown
                      className={`transition-transform ${submenuOpen[key] ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* 아코디언 */}
                  <div
                    id={`mobile-sub-${key}`}
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                      submenuOpen[key] ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <ul className="py-1 bg-white">
                      {links.map(([name, to]) => (
                        <li key={to}>
                          <Link
                            to={to}
                            className="block px-6 py-2 text-gray-800 hover:bg-gray-50"
                            onClick={() => {
                              setSubmenuOpen((prev) => ({ ...prev, [key]: false }));
                              setMobileOpen(false);
                            }}
                          >
                            {name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
