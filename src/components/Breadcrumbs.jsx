// src/components/Breadcrumbs.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex space-x-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {item.to ? (
              <Link to={item.to} className="hover:text-orange-500">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800">{item.label}</span>
            )}
            {idx < items.length - 1 && (
              <span className="mx-2 select-none text-gray-400">&gt;</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}