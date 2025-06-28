import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuBox({ icon: Icon, title, link, boxClass }) {
  return (
    <Link
      to={link}
      className={`
        ${boxClass}                 /* 외부에서 받은 w-24 h-24 */
        flex flex-col items-center justify-center
        bg-white rounded-lg border-2 border-gray-200
        hover:border-orange-400 transition-colors
      `}
    >
      {/* 
        아이콘은 상단, 텍스트는 하단.
        text-orange-500 로 기본 색 지정 
      */}
      <Icon className="text-3xl mb-1 text-orange-500" />
      <span className="text-xs text-orange-500">{title}</span>
    </Link>
  );
}