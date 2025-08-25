// src/components/ImagePicker.jsx
import React from 'react';

const BYTES_MB = (mb) => mb * 1024 * 1024;

export default function ImagePicker({
  label = '이미지',
  required = false,             // ✅ 추가: (선택) 표기 제어
  initialUrl = '',
  value = null,
  onChange,
  maxSizeMB = 5,
  accept = 'image/*',
  allowRemoveExisting = false,
  onToggleRemove,

  // ✅ 추가: 권장 사이즈 및 도움말
  recommendedWidth,
  recommendedHeight,
  helper,                       // 예: '권장 1200×800px, 최대 5MB'
  hardEnforce = false,          // ✅ true면 권장 사이즈 아닐 때 업로드 막음, false면 경고만
  tolerance = 0,                // ✅ 허용 오차(px), 예: 20주면 ±20px 허용
}) {
  const [preview, setPreview] = React.useState(initialUrl || '');
  const [dragOver, setDragOver] = React.useState(false);
  const [error, setError] = React.useState('');
  const [warn, setWarn] = React.useState(''); // ✅ 경고 메시지

  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    if (!value) setPreview(initialUrl || '');
  }, [initialUrl]); // eslint-disable-line

  const openFileDialog = () => fileInputRef.current?.click();

  const clearFile = () => {
    setError('');
    setWarn('');
    setPreview('');
    onChange?.(null);
    onToggleRemove?.(true);
  };

  const validateDimension = (imgW, imgH) => {
    if (!recommendedWidth || !recommendedHeight) return { ok: true, msg: '' };

    const within =
      Math.abs(imgW - recommendedWidth) <= tolerance &&
      Math.abs(imgH - recommendedHeight) <= tolerance;

    if (within) return { ok: true, msg: '' };

    const msg = `권장 ${recommendedWidth}×${recommendedHeight}px (현재 ${imgW}×${imgH}px)`;
    return hardEnforce ? { ok: false, msg } : { ok: true, msg }; // 강제면 실패, 아니면 경고
  };

  const setFile = (file) => {
    if (!file) return;
    setError('');
    setWarn('');

    if (accept && accept !== '*/*' && !file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있어요.');
      return;
    }
    if (file.size > BYTES_MB(maxSizeMB)) {
      setError(`파일 용량이 너무 커요. 최대 ${maxSizeMB}MB까지 가능합니다.`);
      return;
    }

    // 이미지 사이즈 체크 위해 먼저 DataURL 로드
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      const img = new Image();
      img.onload = () => {
        const { width: w, height: h } = img;
        const dim = validateDimension(w, h);
        if (!dim.ok) {
          setError(dim.msg);
          return;
        }
        if (dim.msg) setWarn(dim.msg);
        setPreview(url);
        onToggleRemove?.(false);
        onChange?.(file);
      };
      img.onerror = () => {
        setError('이미지를 읽는 중 오류가 발생했습니다.');
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  const onInputChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
    e.target.value = '';
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    setFile(file);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}{' '}
          {!required && <span className="text-gray-400">(선택)</span>}
        </label>
      )}

      {/* 권장/도움말 */}
      {(recommendedWidth && recommendedHeight) || helper ? (
        <p className="text-xs text-gray-500">
          {helper
            ? helper
            : `권장 ${recommendedWidth}×${recommendedHeight}px, 최대 ${maxSizeMB}MB`}
        </p>
      ) : null}

      <div
        className={[
          'relative rounded-lg border-2 border-dashed p-4 transition',
          dragOver ? 'border-orange-400 bg-orange-50/50' : 'border-gray-300 bg-gray-50',
        ].join(' ')}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        aria-label="이미지 업로드 영역"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openFileDialog()}
      >
        {preview ? (
          <div className="overflow-hidden rounded-md">
            <img src={preview} alt="미리보기" className="block w-full max-h-[360px] object-cover" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16l5-5 4 4 5-6 4 5" />
            </svg>
            <p className="text-sm text-gray-600">
              이미지를 드래그해서 업로드하거나{' '}
              <button type="button" onClick={openFileDialog} className="text-orange-600 underline underline-offset-2">
                파일 선택
              </button>
            </p>
            <p className="text-xs text-gray-400">최대 {maxSizeMB}MB · {accept}</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={onInputChange}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={openFileDialog}
          className="rounded bg-white border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          {preview ? '이미지 교체' : '이미지 추가'}
        </button>

        {(preview || value) && (
          <button
            type="button"
            onClick={clearFile}
            className="rounded bg-white border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
          >
            이미지 제거
          </button>
        )}

        {allowRemoveExisting && (
          <label className="inline-flex items-center gap-2 rounded border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700">
            <input type="checkbox" onChange={(e) => onToggleRemove?.(e.target.checked)} />
            기존 이미지 삭제
          </label>
        )}
      </div>

      {warn && !error && <p className="text-xs text-amber-600">{warn}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
