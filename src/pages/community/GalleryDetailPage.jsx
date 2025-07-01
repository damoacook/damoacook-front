import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGalleryDetail } from '../../api/gallery';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function GalleryDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['gallery', id],
    queryFn: () => fetchGalleryDetail(id),
  });

  if (isLoading) return <p className="text-center py-6">로딩 중…</p>;
  if (isError) return <p className="text-center py-6 text-red-500">오류: {error.message}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <Breadcrumbs
        items={[
          { label: '홈', to: '/' },
          { label: '갤러리', to: '/gallery' },
          { label: data.title },
        ]}
      />

      <h1 className="text-2xl font-bold text-gray-800">{data.title}</h1>

      <p className="text-sm text-gray-500 flex justify-between">
        <span>{new Date(data.uploaded_at).toLocaleDateString()}</span>
        <span>조회수: {data.views}</span>
      </p>

      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full rounded shadow-md object-cover max-h-[600px]"
        />
      )}

      {data.description && (
        <p className="text-gray-700 whitespace-pre-wrap">{data.description}</p>
      )}
    </div>
  );
}