import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export default function CommunityLayout() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">커뮤니티</h1>
        <p className="text-gray-600 text-sm">다모아 요리학원의 공지사항 및 갤러리를 확인해보세요.</p>
      </div>

      {/* 탭 메뉴 (선택사항) */}
      {/* <div className="flex gap-4 border-b pb-2">
        <NavLink
          to="."
          className={({ isActive }) =>
            `text-sm font-medium pb-1 border-b-2 ${
              isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
            } hover:text-blue-600`
          }
        >
          공지사항
        </NavLink>
      </div> */}

      {/* 각 커뮤니티 페이지 */}
      <Outlet />
    </div>
  )
}
