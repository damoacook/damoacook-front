import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function AboutLayout() {
  return (
    <div>
      <nav className="mb-4 space-x-4">
        {['greeting','history','vision','partners'].map((slug) => (
          <NavLink
            key={slug}
            to={slug}
            className={({isActive}) =>
              isActive ? 'font-bold text-orange-500' : 'text-gray-600'
            }
          >
            {slug === 'greeting' ? '인사말'
             : slug === 'history'  ? '연혁'
             : slug === 'vision'   ? '비전'
             : '협력업체'}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}