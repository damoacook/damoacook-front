import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuBox({
  icon: Icon,
  title,
  link,
  boxClass = '',
  iconClass = '',
  titleClass = '',
}) {
  return (
    <Link
      to={link}
      className={`
        ${boxClass}
        flex flex-col items-center justify-center
        bg-white rounded-lg border-2 border-gray-200
        text-orange-500 hover:border-orange-400 hover:text-orange-600
        transition-colors
      `}
    >
      <Icon className={`${iconClass} mb-2`} />
      <span className={titleClass}>{title}</span>
    </Link>
  );
}