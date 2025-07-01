import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchGalleryList } from '../../api/gallery'
import Breadcrumbs from '../../components/Breadcrumbs'

export default function GalleryPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGalleryList,
  })

  if (isLoading) return <p className="text-center py-6">로딩 중…</p>
  if (isError) return <p className="text-center py-6 text-red-500">오류: {error.message}</p>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <Breadcrumbs items={[{ label: '홈', to: '/' }, { label: '갤러리' }]} />

      <h1 className="text-3xl font-bold text-gray-900">갤러리</h1>

      {data.results.length === 0 ? (
        <p className="text-center text-gray-500 py-10">아직 등록된 갤러리 이미지가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.results.map(item => (
            <Link
              to={`/gallery/${item.id}`}
              key={item.id}
              className="block group hover:shadow-md transition rounded overflow-hidden bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition"
              />
              <div className="p-3 space-y-1">
                <h2 className="text-sm font-medium text-gray-800">{item.title}</h2>
                <p className="text-xs text-gray-500">조회수 {item.views}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
