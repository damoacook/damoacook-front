import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { sendInquiry } from "../api/inquiry";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function InquiryCtaSection() {
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: { phonePrefix: "010" } });

  const mutation = useMutation({
    mutationFn: sendInquiry,
    onSuccess: () => {
      setSent(true);
      reset({ phonePrefix: "010" });
    },
    onError: (err) => {
      alert(err?.message || "전송 실패: 잠시 후 다시 시도해주세요.");
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
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-14">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2 items-center">
          {/* Left: copy */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
              수강문의 바로하기
            </h2>
            <p className="mt-3 text-sm md:text-[15px] leading-7 text-gray-700">
              문의를 남겨주시면 담당자가 빠르게 연락드립니다. 과정·시간표·비용 등
              궁금한 점을 편하게 적어주세요.
            </p>

            <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50/60 p-4 text-sm text-orange-900">
              <b className="font-semibold">연락 가능 시간</b> : 평일 10:00–18:00
              <br />
              <span className="text-[13px] text-orange-800/80">
                * 수업 시간대에는 답변이 다소 지연될 수 있어요.
              </span>
            </div>

            <div className="mt-4 text-sm text-gray-600">
                전체 양식으로 작성하길 원하시면{" "}
                <Link
                    to="/inquiries"   //  a → Link
                    className="font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800"
                >
                    수강문의 페이지
                </Link>
                로 이동하세요.
                </div>
          </div>

          {/* Right: mini form */}
          <div className="rounded-2xl bg-white p-5 md:p-6 shadow-sm ring-1 ring-gray-200">
            {sent ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center">
                <p className="text-green-800 font-semibold">접수 완료!</p>
                <p className="mt-1 text-sm text-green-800/90">
                  빠른 시일 내에 연락드리겠습니다. 감사합니다 🙌
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  또 문의하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* 이름 */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    이름
                  </label>
                  <input
                    {...register("name", { required: "이름을 입력해주세요." })}
                    placeholder="성함을 입력해주세요."
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* 전화번호 */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    전화번호
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      {...register("phonePrefix", { required: true })}
                      className="w-1/3 border rounded-md px-3 py-2 text-sm"
                    >
                      {["010", "011", "016", "017", "018", "019"].map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                    <span className="text-gray-400">-</span>
                    <input
                      {...register("phone1", {
                        required: true,
                        pattern: /^\d{3,4}$/,
                      })}
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="1234"
                      className="w-1/3 border rounded-md px-3 py-2 text-sm text-center"
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/\D/g, ""))
                      }
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      {...register("phone2", {
                        required: true,
                        pattern: /^\d{4}$/,
                      })}
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="5678"
                      className="w-1/3 border rounded-md px-3 py-2 text-sm text-center"
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </div>
                  {(errors.phone1 || errors.phone2) && (
                    <p className="text-xs text-red-500 mt-1">
                      숫자만 정확히 입력해주세요.
                    </p>
                  )}
                </div>

                {/* 문의 내용 */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    문의 내용
                  </label>
                  <textarea
                    {...register("message", {
                      required: "문의 내용을 입력해주세요.",
                    })}
                    rows={4}
                    placeholder="예) 조리기능장반 일정/비용이 궁금합니다."
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* 개인정보 동의 */}
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("agree", { required: "동의가 필요합니다." })}
                    />
                    개인정보 수집·이용에 동의합니다.{" "}
                    <span className="text-red-500 text-xs">(필수)</span>
                  </label>
                  {errors.agree && (
                    <p className="text-xs text-red-500">{errors.agree.message}</p>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowPrivacy((v) => !v)}
                    className="text-xs text-gray-600 underline flex items-center gap-1"
                  >
                    <FaChevronDown
                      className={`transition-transform duration-300 text-gray-500 ${
                        showPrivacy ? "rotate-180" : "rotate-0"
                      }`}
                    />
                    <span>자세히 보기</span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      showPrivacy ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="text-[12px] text-gray-600 bg-gray-50 p-3 rounded border mt-2 space-y-1">
                      <p>
                        <strong>수집 항목:</strong> 이름, 연락처, 수강 관련 이력
                      </p>
                      <p>
                        <strong>이용 목적:</strong> 맞춤 수강 안내 및 상담
                      </p>
                      <p>
                        <strong>보유 기간:</strong> 수집일로부터 최대 3년 보관 후 파기
                      </p>
                    </div>
                  </div>
                </div>

                {/* 제출 */}
                <button
                  type="submit"
                  disabled={mutation.isLoading}
                  className="w-full rounded-lg bg-orange-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:opacity-60"
                >
                  {mutation.isLoading ? "전송 중…" : "문의하기"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
