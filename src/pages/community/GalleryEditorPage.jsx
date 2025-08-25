import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchGalleryDetail,
  createGalleryItem,
  updateGalleryItem,
} from '../../api/gallery';

export default function GalleryEditorPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: detail, isLoading } = useQuery({
    queryKey: ['gallery', id],
    queryFn: () => fetchGalleryDetail(id),
    enabled: isEdit,
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (detail && isEdit) {
      setTitle(detail.title ?? '');
      setDescription(detail.description ?? '');
    }
  }, [detail, isEdit]);

  const preview = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return detail?.image || '';
  }, [imageFile, detail?.image]);

  const { mutate: save, isLoading: saving } = useMutation({
    mutationFn: async () => {
      if (isEdit) {
        return updateGalleryItem(id, { title, description, imageFile });
      }
      // 생성: 파일 또는 URL을 쓰고 싶다면 payload 확장
      return createGalleryItem({ title, description, imageFile });
    },
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ['gallery'] });
      if (res?.id) navigate(`/gallery/${res.id}`);
      else navigate('/gallery');
    },
    onError: (e) => setError(e?.message || '저장 중 오류가 발생했습니다.'),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError('제목을 입력해 주세요.');
      return;
    }
    if (!isEdit && !imageFile) {
        setError('이미지를 넣어주세요.');
        return;
    }
    save();
  };

  useEffect(() => {
    return () => { if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview); };
  }, [preview]);

  if (isEdit && isLoading) return <div className="max-w-4xl mx-auto px-4 py-10">로딩 중…</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {isEdit ? '갤러리 수정' : '갤러리 작성'}
        </h1>
        <Link to="/gallery" className="text-sm text-gray-500 hover:text-orange-600">← 목록으로</Link>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200/60">
              {preview ? (
                <img src={preview} alt="미리보기" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">미리보기</div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">제목</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">설명 (선택)</label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">이미지 변경 (선택)</label>
              <input
                type="file"
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-700 file:mr-3 file:rounded file:border-0 file:bg-orange-600 file:px-3 file:py-2 file:text-white hover:file:bg-orange-700"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center justify-end gap-3">
          <Link to={isEdit ? `/gallery/${id}` : '/gallery'} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            취소
          </Link>
          <button type="submit" disabled={saving} className="rounded-lg bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 disabled:opacity-60">
            {isEdit ? '수정하기' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
}