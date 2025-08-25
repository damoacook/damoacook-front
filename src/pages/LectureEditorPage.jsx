import React from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchLecture,
  createAcademyLecture,
  updateAcademyLecture,
} from '../api/lectures';
import Breadcrumbs from '../components/Breadcrumbs';

export default function LectureEditorPage() {
  const isAuthed = !!localStorage.getItem('accessToken');
  if (!isAuthed) return <Navigate to="/login" replace />;

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  // 수정이면 기존 데이터 로드
  const { data: detail, isLoading } = useQuery({
    queryKey: ['lectures', 'academy', id],
    queryFn: () => fetchLecture(id),
    enabled: isEdit,
  });

  const [title, setTitle] = React.useState('');
  const [dayOfWeek, setDayOfWeek] = React.useState(''); // 예: 월/수/금
  const [time, setTime] = React.useState('');           // 예: 19:00~22:00
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [capacity, setCapacity] = React.useState('');   // 숫자 문자열
  const [applied, setApplied] = React.useState('');     // 숫자 문자열
  const [description, setDescription] = React.useState('');

  // 기존 데이터 주입
  React.useEffect(() => {
    if (isEdit && detail) {
      setTitle(detail.title ?? '');
      setDayOfWeek(detail.day_of_week ?? '');
      setTime(detail.time ?? '');
      setStartDate(detail.start_date ?? '');
      setEndDate(detail.end_date ?? '');
      setDescription(detail.description ?? '');
      setCapacity(
        typeof detail.capacity === 'number' ? String(detail.capacity) : ''
      );
      setApplied(
        typeof detail.applied === 'number' ? String(detail.applied) : ''
      );
    }
  }, [isEdit, detail]);

  const createMut = useMutation({
    mutationFn: (payload) => createAcademyLecture(payload),
    onSuccess: (json) => {
      alert('과정이 등록되었습니다.');
      navigate(`/lectures/${json.id}`);
    },
    onError: (err) => alert(err?.message || '등록 실패'),
  });

  const updateMut = useMutation({
    mutationFn: (payload) => updateAcademyLecture(id, payload),
    onSuccess: () => {
      alert('과정이 수정되었습니다.');
      navigate(`/lectures/${id}`);
    },
    onError: (err) => alert(err?.message || '수정 실패'),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('제목을 입력하세요.');
    if (!startDate)    return alert('시작일을 선택하세요.');
    if (!endDate)      return alert('종료일을 선택하세요.');

    // 날짜 역전 방지
    const s = new Date(`${startDate}T00:00:00`);
    const eDate = new Date(`${endDate}T00:00:00`);
    if (eDate < s) {
      return alert('종료일이 시작일보다 빠를 수 없습니다.');
    }

    // 빈 값은 아예 필드 생략(null 금지)
    const payload = {
      type: 'academy',
      title: title.trim(),
      start_date: startDate,
      end_date: endDate,
      description: (description ?? '').trim(),
      ...(dayOfWeek.trim() ? { day_of_week: dayOfWeek.trim() } : {}),
      ...(time.trim() ? { time: time.trim() } : {}),
    };
    if (capacity !== '') payload.capacity = Number(capacity);
    if (applied  !== '') payload.applied  = Number(applied);

    if (isEdit) updateMut.mutate(payload);
    else        createMut.mutate(payload);
  };

  if (isEdit && isLoading) return <p className="text-center py-6">불러오는 중…</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: '홈', to: '/' },
          { label: '모집과정', to: '/lectures?tab=academy' },
          { label: isEdit ? '과정 수정' : '과정 등록' },
        ]}
      />

      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {isEdit ? '과정 수정' : '과정 등록'}
      </h1>

      {/* 안내 배너: 신청 인원 수동 관리 */}
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <strong className="font-semibold">알림</strong> — 본 사이트는 수강신청 연동이 없어
        <span className="font-semibold"> ‘신청 인원’은 자동 집계되지 않습니다.</span>
        <br className="hidden sm:block" />
        모집 진행 중에는 ‘신청 인원’을 가끔 확인하시고 직접 업데이트해주세요.
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">과정명</label>
          <input
            type="text"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예) 한식조리기능사(실기)"
            required
          />
        </div>

        {/* 요일/시간 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">요일(선택)</label>
            <input
              type="text"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              placeholder="예) 월/수/금"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">시간(선택)</label>
            <input
              type="text"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="예) 19:00 ~ 22:00"
            />
          </div>
        </div>

        {/* 기간 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">시작일</label>
            <input
              type="date"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">종료일</label>
            <input
              type="date"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* 정원/신청 인원 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              정원(선택)
            </label>
            <input
              type="number"
              min="0"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="예) 20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              신청 인원(선택)
            </label>
            <input
              type="number"
              min="0"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={applied}
              onChange={(e) => setApplied(e.target.value)}
              placeholder="예) 8"
            />
            <p className="mt-1 text-xs text-gray-500">
              * 자동 집계되지 않으므로 수시로 직접 업데이트 해주세요.
            </p>
          </div>
        </div>

        {/* 설명 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">설명(선택)</label>
          <textarea
            className="mt-1 w-full min-h-32 rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="수업 소개, 준비물, 강사 안내 등"
          />
        </div>

        {/* 버튼 */}
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
