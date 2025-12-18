import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGalleryDetail, deleteGalleryItem } from '../../api/gallery';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function GalleryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isAuthed = !!localStorage.getItem('accessToken');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['gallery', id],
    queryFn: () => fetchGalleryDetail(id),
  });

  const { mutate: remove, isLoading: deleting } = useMutation({
    mutationFn: () => deleteGalleryItem(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['gallery'] });
      navigate('/gallery');
    },
    onError: (e) => alert(e?.message || '삭제 중 오류가 발생했습니다.'),
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

      {/* 상단: 제목 + 액션 버튼(로그인 시) */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">{data.title}</h1>
        {isAuthed && (
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={`/gallery/${id}/edit`}
              className="rounded border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              수정
            </Link>
            <button
              disabled={deleting}
              onClick={() => {
                if (confirm('정말 삭제할까요? 되돌릴 수 없습니다.')) remove();
              }}
              className="rounded border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 flex justify-between">
        <span>{new Date(data.uploaded_at).toLocaleDateString()}</span>
        <span>조회수: {data.views}</span>
      </p>

      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="block w-full h-auto rounded shadow-md object-contain"
          style={{ maxHeight: '80vh' }} // 큰 세로사진일 때 화면 안에 들어오도록(선택)
        />
      )}

      {data.description && (
        <p className="text-gray-700 whitespace-pre-wrap">{data.description}</p>
      )}
    </div>
  );
}