import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNewsDetail, deleteNewsItem } from '../../api/news';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isAuthed = !!localStorage.getItem('accessToken');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['news', id],
    queryFn: () => fetchNewsDetail(id),
  });

  const { mutate: remove, isLoading: isDeleting } = useMutation({
    mutationFn: () => deleteNewsItem(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['news'] });
      qc.removeQueries({ queryKey: ['news', id] });
      alert('삭제되었습니다.');
      navigate('/news');
    },
    onError: (err) => {
      alert(err?.message || '삭제에 실패했습니다.');
    },
  });

  if (isLoading) return <p className="text-center py-6">로딩 중…</p>;
  if (isError) return <p className="text-center py-6 text-red-500">오류: {error.message}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs
        items={[
          { label: '홈', to: '/' },
          { label: '공지사항', to: '/news' },
          { label: data.title },
        ]}
      />

      {/* 상단 타이틀 + 액션 */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>

        {isAuthed && (
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={`/news/${id}/edit`}
              className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              수정
            </Link>
            <button
              disabled={isDeleting}
              onClick={() => {
                if (confirm('정말 삭제할까요?')) remove();
              }}
              className="rounded border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500 flex justify-between items-center">
        <span>작성일: {new Date(data.created_at).toLocaleDateString()}</span>
        <span>조회수: {data.views}</span>
      </div>

      {/* ✅ 업로드 원본 크기 그대로 표시 (자르지 않음) */}
      {data.image && (
        <div className="rounded-lg shadow-sm overflow-auto">
          <img
            src={data.image}
            alt={data.title}
            className="block w-full h-auto object-contain"
            style={{ maxHeight: '80vh' }} />
        </div>
      )}

      <div className="whitespace-pre-wrap text-base sm:text-lg text-gray-800 leading-relaxed">
        {data.content}
      </div>
    </div>
  );
}