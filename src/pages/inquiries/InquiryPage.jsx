import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { sendInquiry } from '../../api/inquiry';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FaChevronDown } from 'react-icons/fa';

export default function InquiryPage() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: sendInquiry,
    onSuccess: () => {
      setShowSuccessModal(true);
      reset();
    },
    onError: (error) => {
      alert('오류 발생: ' + error.message);
    },
  });

  const onSubmit = (data) => {
    const fullPhone = `${data.phonePrefix}-${data.phone1}-${data.phone2}`;
    mutation.mutate({
      name: data.name,
      phone: fullPhone,
      message: data.message,
    });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-8 relative">
      <Breadcrumbs items={[{ label: '홈', to: '/' }, { label: '수강문의' }]} />
      <h1 className="text-3xl font-bold text-gray-900">수강문의</h1>

      <p className="text-sm text-gray-600">
        문의 내용을 확인한 후 담당자가 입력하신 연락처로 빠르게 연락드리겠습니다.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md space-y-6">

        {/* 이름 */}
        <div>
          <label className="block text-sm font-medium mb-1">이름</label>
          <input
            {...register('name', { required: '이름을 입력해주세요.' })}
            placeholder="성함을 입력해주세요."
            className="w-full border rounded-md px-4 py-2 text-sm"
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* 전화번호 */}
        <div>
          <label className="block text-sm font-medium mb-1">전화번호</label>
          <div className="flex items-center gap-2">
            <select
              {...register('phonePrefix', { required: true })}
              className="w-1/3 border rounded-md px-3 py-2 text-sm"
            >
              {['010', '011', '016', '017', '018', '019'].map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>

            <span className="text-gray-500 text-lg font-semibold">-</span>

            <input
              {...register('phone1', {
                required: true,
                pattern: /^\d{3,4}$/
              })}
              inputMode="numeric"
              pattern="\d*"
              maxLength={4}
              placeholder="1234"
              className="w-1/3 border rounded-md px-3 py-2 text-sm text-center"
              onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
            />

            <span className="text-gray-500 text-lg font-semibold">-</span>

            <input
              {...register('phone2', {
                required: true,
                pattern: /^\d{4}$/
              })}
              inputMode="numeric"
              pattern="\d*"
              maxLength={4}
              placeholder="5678"
              className="w-1/3 border rounded-md px-3 py-2 text-sm text-center"
              onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
            />
          </div>
          {(errors.phone1 || errors.phone2) && (
            <p className="text-sm text-red-500 mt-1">숫자만 입력해주세요.</p>
          )}
        </div>

        {/* 문의 내용 */}
        <div>
          <label className="block text-sm font-medium mb-1">문의 내용</label>
          <textarea
            {...register('message', { required: '문의 내용을 입력해주세요.' })}
            placeholder="문의하실 내용을 입력해 주세요."
            rows={5}
            className="w-full border rounded-md px-4 py-2 text-sm"
          />
          {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
        </div>

        {/* 개인정보 동의 */}
        <div className="space-y-2 text-sm text-gray-700">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('agree', { required: '동의가 필요합니다.' })} />
            개인정보 수집·이용에 동의합니다. <span className="text-red-500 text-xs">(필수)</span>
          </label>
          {errors.agree && <p className="text-xs text-red-500">{errors.agree.message}</p>}

          <button
            type="button"
            onClick={() => setShowPrivacy(prev => !prev)}
            className="text-xs text-gray-600 underline flex items-center gap-1"
          >
            <FaChevronDown
              className={`transition-transform duration-300 text-gray-500 ${showPrivacy ? 'rotate-180' : 'rotate-0'}`}
            />
            <span>자세히 보기</span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              showPrivacy ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded border mt-2 space-y-1">
              <p><strong>수집 항목:</strong> 이름, 연락처, 수강 관련 이력</p>
              <p><strong>이용 목적:</strong> 맞춤 수강 안내 및 상담</p>
              <p><strong>보유 기간:</strong> 수집일로부터 최대 3년 보관 후 파기</p>
            </div>
          </div>
        </div>

        {/* 전송 버튼 */}
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full bg-orange-400 text-white font-semibold py-2 rounded hover:bg-orange-600 transition"
        >
          {mutation.isLoading ? '전송 중...' : '문의하기'}
        </button>
      </form>

      {/* ✅ 전송 완료 모달 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl shadow-lg p-6 w-80 text-center space-y-4">
            {/* ❌ 닫기 버튼 */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
            >
              ×
            </button>

            <h2 className="text-lg font-semibold">문의 완료</h2>
            <p className="text-sm text-gray-600">
              수강 문의가 정상적으로 접수되었습니다.<br />빠른 시일 내에 연락드리겠습니다.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
