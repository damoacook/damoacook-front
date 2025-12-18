// src/pages/popup/PopupManageForm.jsx
import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ImagePicker from '../../components/ImagePicker';

function authHeaders() {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function PopupManageForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav = useNavigate();

  const [loading, setLoading]   = React.useState(isEdit);
  const [saving, setSaving]     = React.useState(false);

  const [title, setTitle]       = React.useState('');
  const [linkUrl, setLinkUrl]   = React.useState('');
  const [isActive, setIsActive] = React.useState(false);

  const [imageFile, setImageFile]   = React.useState(null);
  const [initialUrl, setInitialUrl] = React.useState('');
  const [imgHint, setImgHint]       = React.useState(''); // 권장/경고 메시지

  // 권장값(세로형)
  const RECO_W = 800;
  const RECO_H = 1200;
  const TOL    = 40; // ±40px 허용

  // 파일의 가로/세로 메타 읽기
  const readImageMeta = (file) =>
    new Promise((resolve) => {
      if (!file) return resolve(null);
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const meta = { w: img.naturalWidth, h: img.naturalHeight };
        URL.revokeObjectURL(url);
        resolve(meta);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    });

  // ImagePicker onChange에 물릴 핸들러
  const handleImageChange = async (file) => {
    setImgHint('');
    setImageFile(null);

    if (!file) return; // 제거한 케이스
    const meta = await readImageMeta(file);
    if (meta) {
      const isPortrait = meta.h >= meta.w;
      const nearReco   = Math.abs(meta.w - RECO_W) <= TOL && Math.abs(meta.h - RECO_H) <= TOL;

      if (!isPortrait) {
        setImgHint('세로형(높이가 더 긴) 이미지를 권장합니다.');
      } else if (!nearReco) {
        setImgHint(`권장 크기 ${RECO_W}×${RECO_H}px(±${TOL}px)와 다릅니다. 그래도 업로드는 가능합니다.`);
      } else {
        setImgHint(`권장 크기(${RECO_W}×${RECO_H}px)에 적합한 이미지예요!`);
      }
    }
    setImageFile(file);
  };

  React.useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/popup/${id}/`);
        setTitle(data.title ?? '');
        setLinkUrl(data.link_url ?? '');
        setIsActive(Boolean(data.is_active));
        setInitialUrl(data.image ?? data.image_url ?? '');;
      } catch {
        alert('팝업 불러오기 실패');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit && !(imageFile instanceof File)) {
      alert('이미지(필수)를 선택해주세요.');
      return;
    }
    try {
      setSaving(true);
      const form = new FormData();
      if (imageFile instanceof File) form.append('image', imageFile);
      form.append('title', title);
      if (linkUrl) form.append('link_url', linkUrl);
      form.append('is_active', String(isActive));

      if (isEdit) {
        await axios.patch(`/api/popup/${id}/`, form, { headers: authHeaders() });
        alert('수정되었습니다.');
      } else {
        await axios.post('/api/popup/', form, { headers: authHeaders() });
        alert('등록되었습니다.');
      }
      nav('/popup/manage');
    } catch {
      alert('저장 실패: 권한/네트워크를 확인해주세요.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">로딩 중…</p>;

  return (
    <form onSubmit={onSubmit} className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">{isEdit ? '팝업 수정' : '팝업 등록'}</h1>

      {/* 이미지 (세로형 권장) */}
      <ImagePicker
        label="팝업 이미지"
        initialUrl={initialUrl}
        value={imageFile}
        onChange={handleImageChange}
        maxSizeMB={5}
        accept="image/*"
        allowRemoveExisting={isEdit && !!initialUrl}
        onToggleRemove={(checked) => {
          if (checked) {
            setImageFile(null);
            setInitialUrl('');
            setImgHint('');
          }
        }}
      />
      <div className="space-y-1">
        <p className="text-xs text-gray-500">
          <b>권장</b> {RECO_W}×{RECO_H}px (세로형), 최대 5MB — PC에서는 우측 상단에 세로로 노출돼요.
        </p>
        {imgHint && (
          <p className={imgHint.includes('적합') ? 'text-sm text-emerald-600' : 'text-sm text-orange-600'}>
            {imgHint}
          </p>
        )}
      </div>

      {/* 제목(선택) */}
      <div>
        <label className="block text-sm font-medium text-gray-800">
          제목 <span className="text-gray-400">(선택)</span>
        </label>
        <input
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예) 9월 모집 안내"
        />
      </div>

      {/* 링크(선택) */}
      <div>
        <label className="block text-sm font-medium text-gray-800">
          연결 링크 <span className="text-gray-400">(선택)</span>
        </label>
        <input
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          type="url"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="https:// …"
        />
      </div>

      {/* 버튼 */}
      <div className="pt-4 flex justify-end gap-2">
        <button type="button" onClick={() => nav(-1)} className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50">
          취소
        </button>
        <button type="submit" disabled={saving} className="rounded bg-orange-600 px-4 py-2 text-white font-semibold hover:bg-orange-700 disabled:opacity-60">
          {saving ? '저장 중…' : '저장'}
        </button>
      </div>
    </form>
  );
}
