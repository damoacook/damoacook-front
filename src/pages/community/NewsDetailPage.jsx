import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchNewsDetail } from '../../api/news'
import Breadcrumbs from '../../components/Breadcrumbs'

export default function NewsDetailPage() {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['news', id],
    queryFn: () => fetchNewsDetail(id),
  })

  if (isLoading) return <p className="text-center py-6">로딩 중…</p>
  if (isError) return <p className="text-center py-6 text-red-500">오류: {error.message}</p>

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs
        items={[
          { label: '홈', to: '/' },
          { label: '공지사항', to: '/news' },
          { label: data.title },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>

      <div className="text-sm text-gray-500 flex justify-between items-center">
        <span>작성일: {new Date(data.created_at).toLocaleDateString()}</span>
        <span>조회수: {data.views}</span>
      </div>

      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full max-h-96 object-cover rounded-lg shadow-sm"
        />
      )}

      <div className="whitespace-pre-wrap text-base sm:text-lg text-gray-800 leading-relaxed">
        {data.content}
      </div>
    </div>
  )
}
