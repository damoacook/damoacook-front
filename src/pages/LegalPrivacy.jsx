// src/pages/LegalPrivacy.jsx
import React from "react";

export default function LegalPrivacy() {
  /** ====== 쉽게 수정할 수 있는 기본 정보 ====== */
  const ORG = {
    name: "다모아요리학원",
    officer: "고평현 대표",        // 개인정보 보호책임자
    tel: "053-944-3355",
    email: "damoacook@naver.com",
    address: "대구광역시 동구 아양로 239 (신암동 1545), 2층",
  };

  const ENFORCE_DATE = "2025-08-25"; // 시행일

  /** CCTV 안내(필요 시 문구만 수정) */
  const CCTV = {
    purpose:
      "시설 안전 및 화재·범죄 예방, 분쟁 해결(개인정보 보호법 제25조)",
    locations:
      "출입구, 복도, 실습실 일부(설치 위치·촬영범위는 현장 안내문으로 고지)",
    retention: "촬영일로부터 최대 30일(사고 조사·법령상 필요한 경우 연장 가능)",
    storage: "보안이 적용된 녹화장치(NVR 등) 및 잠금 구역 보관",
    access: "관리책임자 및 최소한의 접근권한을 부여받은 담당자",
    outsourcing: "없음(필요 시 업체명·연락처를 본 방침에 즉시 반영)",
    request:
      "열람·사본 요청은 본인확인 후 가능하며, 타인의 권리 침해 우려 시 제한될 수 있습니다.",
  };

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 헤더 */}
      <header>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          개인정보 처리방침
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {ORG.name}(이하 “회사”)는 『개인정보 보호법』 등 관계 법령을 준수하며,
          이용자의 개인정보를 적법하게 처리·안전하게 관리합니다. 본 방침은
          이용자 권리 보호와 신속한 고충처리를 위해 개인정보 처리 기준을
          알리기 위한 것입니다.
        </p>
      </header>

      {/* 제1조 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">
          제1조(처리 목적·항목·보유기간)
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          회사는 아래 목적을 위해 필요한 최소한의 개인정보를 수집·이용하며,
          목적 달성 또는 보유기간 경과 시 지체 없이 파기합니다(법령상 별도
          보존 의무가 있는 경우 제외).
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border-b text-left">구분</th>
                <th className="p-2 border-b text-left">처리 목적</th>
                <th className="p-2 border-b text-left">법적 근거</th>
                <th className="p-2 border-b text-left">수집 항목</th>
                <th className="p-2 border-b text-left">보유·이용기간</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="p-2 border-t">상담 신청</td>
                <td className="p-2 border-t">수강 상담, 문의 응대, 상담 이력 관리</td>
                <td className="p-2 border-t">
                  개인정보 보호법 제15조 제1항 제1호(동의)
                </td>
                <td className="p-2 border-t">
                  이름, 연락처(휴대전화), (선택) 이메일, 문의내용, 상담일시,
                  접속기록(IP/UA)
                </td>
                <td className="p-2 border-t">수집일로부터 3년</td>
              </tr>
              <tr className="align-top">
                <td className="p-2 border-t">마케팅(선택)</td>
                <td className="p-2 border-t">이벤트/소식 안내, 만족도 조사 등</td>
                <td className="p-2 border-t">
                  개인정보 보호법 제15조 제1항 제1호(동의)
                </td>
                <td className="p-2 border-t">이름, 연락처, (선택) 이메일</td>
                <td className="p-2 border-t">동의 철회 시까지 또는 1년</td>
              </tr>
              <tr className="align-top">
                <td className="p-2 border-t">웹사이트 이용</td>
                <td className="p-2 border-t">
                  서비스 품질 개선, 보안/오류 모니터링, 통계
                </td>
                <td className="p-2 border-t">
                  정당한 이익(보안·운영), 쿠키 동의(해당 시)
                </td>
                <td className="p-2 border-t">
                  쿠키, 접속기록(IP/UA), 페이지 이용기록
                </td>
                <td className="p-2 border-t">최대 6개월(통계·보안 목적)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          * 수집 항목은 서비스/양식에 따라 달라질 수 있습니다. 민감정보는
          수집·이용하지 않습니다.
        </p>
      </section>

      {/* 제2조 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">
          제2조(만 14세 미만 아동)
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          회사는 만 14세 미만 아동의 개인정보를 원칙적으로 수집하지 않습니다.
          불가피하게 수집이 필요한 경우 법정대리인 동의를 얻겠습니다.
        </p>
      </section>

      {/* 제3조 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">
          제3조(개인정보의 제3자 제공)
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          회사는 원칙적으로 이용자 동의 없이 개인정보를 제3자에게 제공하지
          않습니다. 다만 법령에 특별한 규정이 있거나, 생명·신체·재산 보호가
          급박한 경우 등 법이 정한 예외에 한하여 제공할 수 있습니다.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          ※ 현재 회사는 개인정보를 제3자에게 제공하지 않습니다.
        </p>
      </section>

      {/* 제4조 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">
          제4조(처리의 위탁)
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          회사는 원활한 서비스 제공을 위해 아래 업무를 위탁할 수 있으며,
          수탁자 변경 시 본 방침에 공지합니다.
        </p>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>
            <span className="font-medium">호스팅/인프라</span> : 자체 서버 또는
            클라우드(AWS/NCP 등) — 서버 운영 및 보안 관리
          </li>
          <li>
            <span className="font-medium">이메일/문자 발송</span> : (운영 시)
            알림/공지 발송 대행
          </li>
        </ul>
        <p className="mt-1 text-xs text-gray-500">
          * 실제 사용 중인 수탁사가 있다면 상호/업무 범위를 정확히 기입하세요.
        </p>
      </section>

      {/* 제5조 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">
          제5조(파기 절차 및 방법)
        </h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>보유기간 경과 또는 처리 목적 달성 시 지체 없이 파기합니다.</li>
          <li>전자파일: 복구 불가능한 방법으로 영구 삭제</li>
          <li>종이문서: 분쇄 또는 소각</li>
        </ul>
      </section>

      {/* 제6조 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">제6조(이용자 권리)</h2>
        <p className="mt-1 text-sm text-gray-600">
          이용자는 본인에 관한 개인정보에 대해 열람·정정·삭제·처리정지를 요구할
          수 있습니다. 회사는 요청을 받은 날부터 10일 이내에 답변합니다.
        </p>
        <p className="mt-1 text-sm text-gray-600">
          요청 방법: 홈페이지, 이메일({ORG.email}), 전화({ORG.tel})
        </p>
      </section>

      {/* 제7조 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">
          제7조(안전성 확보조치)
        </h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>관리적 조치: 내부관리계획 수립·교육, 정기 점검</li>
          <li>기술적 조치: 접근권한 관리, 암호화 전송(HTTPS), 로그기록 보관</li>
          <li>물리적 조치: 자료보관구역·서버실 접근 통제</li>
        </ul>
      </section>

      {/* 제8조 - CCTV */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">
          제8조(영상정보처리기기(CCTV) 운영·관리)
        </h2>
        <div className="mt-1 text-sm text-gray-700 space-y-2">
          <p>
            설치 목적/근거: {CCTV.purpose}
          </p>
          <p>설치 위치/촬영 범위: {CCTV.locations}</p>
          <p>보관 기간: {CCTV.retention}</p>
          <p>보관 장소/방법: {CCTV.storage}</p>
          <p>관리책임자/접근권한자: {ORG.officer} 및 {CCTV.access}</p>
          <p>업무 위탁: {CCTV.outsourcing}</p>
          <p>
            열람 등 요구: {CCTV.request} (문의: {ORG.tel}, {ORG.email})
          </p>
          <p className="text-xs text-gray-500">
            * 현장에는 촬영 중 표지판을 부착하며, 반출·제공은 법령에 따라 제한됩니다.
          </p>
        </div>
      </section>

      {/* 제9조 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">
          제9조(국외 이전 및 민감정보)
        </h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>회사는 개인정보를 국외로 이전하지 않습니다.</li>
          <li>민감정보(건강, 사상·신념 등)는 처리하지 않습니다.</li>
        </ul>
      </section>

      {/* 제10조 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">
          제10조(개인정보 보호책임자)
        </h2>
        <div className="mt-2 text-sm text-gray-700">
          <p>
            개인정보 보호책임자: <b>{ORG.officer}</b>
          </p>
          <p>
            연락처: <b>{ORG.tel}</b> / 이메일: <b>{ORG.email}</b>
          </p>
          <p>주소: {ORG.address}</p>
        </div>
      </section>

      {/* 제11조 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">
          제11조(권익침해 구제)
        </h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>개인정보침해신고센터: 국번없이 118</li>
          <li>개인정보분쟁조정위원회: 1833-6972</li>
          <li>대검찰청: 1301 / 경찰청: 182</li>
        </ul>
      </section>

      {/* 제12조 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">
          제12조(고지 및 시행)
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          본 방침의 내용 추가·삭제·수정이 있을 시 최소 7일 전에 홈페이지
          공지사항으로 고지합니다.
        </p>
        <p className="mt-1 text-sm text-gray-600">시행일: {ENFORCE_DATE}</p>
      </section>
    </section>
  );
}
