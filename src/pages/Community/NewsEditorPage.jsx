import React from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchNewsDetail,
  createNewsItem,
  updateNewsItem,
} from '../../api/news';
import ImagePicker from '../../components/ImagePicker';

export default function NewsEditorPage() {
  const isAuthed = !!localStorage.getItem('accessToken');
  if (!isAuthed) return <Navigate to="/login" replace />;

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  // 수정 모드면 기존 데이터 로딩
  const { data: detail, isLoading } = useQuery({
    queryKey: ['news', id],
    queryFn: () => fetchNewsDetail(id),
    enabled: isEdit,
  });

  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [imageFile, setImageFile] = React.useState(null);
  const [removeImage, setRemoveImage] = React.useState(false);

  // 기존 데이터 주입
  React.useEffect(() => {
    if (isEdit && detail) {
      setTitle(detail.title || '');
      setContent(detail.content || '');
      // 이미지 프리뷰는 ImagePicker에서 initialUrl로 표시
    }
  }, [isEdit, detail]);

  const createMut = useMutation({
    mutationFn: (payload) => createNewsItem(payload),
    onSuccess: (json) => {
      alert('등록되었습니다.');
      navigate(`/news/${json.id}`);
    },
    onError: (err) => alert(err?.message || '등록 실패'),
  });

  const updateMut = useMutation({
    mutationFn: (payload) => updateNewsItem(id, payload),
    onSuccess: () => {
      alert('수정되었습니다.');
      navigate(`/news/${id}`);
    },
    onError: (err) => alert(err?.message || '수정 실패'),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('제목을 입력하세요.');
    if (!content.trim()) return alert('내용을 입력하세요.');

    if (isEdit) {
      updateMut.mutate({ title, content, imageFile, removeImage });
    } else {
      createMut.mutate({ title, content, imageFile });
    }
  };

  if (isEdit && isLoading) return <p className="text-center py-6">불러오는 중…</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEdit ? '공지사항 수정' : '공지사항 작성'}
      </h1>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">제목</label>
          <input
            type="text"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>

        {/* 내용 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">내용</label>
          <textarea
            rows={10}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </div>

        {/* 이미지 업로드 (버튼형 + 드래그&드롭 + 프리뷰 + 삭제 토글) */}
        <ImagePicker
          label="대표 이미지 (선택)"
          initialUrl={isEdit ? (detail?.image || '') : ''}
          value={imageFile}
          onChange={(file) => setImageFile(file)}
          allowRemoveExisting={isEdit && !!detail?.image}
          onToggleRemove={(flag) => setRemoveImage(flag)}
          maxSizeMB={5}
          accept="image/*"
        />

        <div className="pt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={createMut.isLoading || updateMut.isLoading}
            className="rounded bg-orange-600 px-4 py-2 text-white font-semibold hover:bg-orange-700 disabled:opacity-60"
          >
            {isEdit ? '수정하기' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
