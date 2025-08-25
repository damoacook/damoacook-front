import React, { useState, useEffect } from 'react';

export default function PopupBanner({ id, image, onClose }) {
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    const hideUntil = localStorage.getItem(`hidePopupUntil_${id}`);
    if (hideUntil && new Date(hideUntil) > new Date()) {
      onClose(id);
    }
  }, [id, onClose]);

  const handleClose = () => {
    if (dontShowToday) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      localStorage.setItem(`hidePopupUntil_${id}`, tomorrow.toISOString());
    }
    onClose(id);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 팝업 본체 (정중앙) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[90%] max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 닫기 버튼 (우측 상단 X) */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
          >
            ×
          </button>

          {/* 배너 이미지 */}
          <img src={image} alt="팝업 배너" className="w-full object-cover" />

          {/* 버튼 영역 (하단 두 개 버튼) */}
          <div className="flex text-sm border-t divide-x">
            <button
                onClick={handleClose}
                className="w-1/2 p-3 text-gray-700 hover:bg-gray-100"
            >
                닫기
            </button>
            <button
                onClick={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                localStorage.setItem(`hidePopupUntil_${id}`, tomorrow.toISOString());
                handleClose();
                }}
                className="w-1/2 p-3 text-gray-700 hover:bg-gray-100"
            >
                하루 동안 보지 않기
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}
