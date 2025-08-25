// src/pages/CertificateDetailPage.jsx

import { useParams } from 'react-router-dom'
import certificateData from "../../data/certificates";

export default function CertificateDetailPage() {
  const { slug } = useParams()
  const data = certificateData[slug]

  if (!data) {
    return <p className="text-center py-20 text-red-500">존재하지 않는 자격증입니다.</p>
  }

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* 상단 이미지 */}
      <section className="relative">
        <img
          src={data.imageTop}
          alt={data.title}
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h2 className="text-lg tracking-wide">COOKING LICENSE</h2>
          <h1 className="text-4xl font-bold mt-2">{data.title}</h1>
          <p className="mt-2 text-sm">{data.subtitle}</p>
        </div>
      </section>

      {/* 소개 영역 */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">자격증 소개</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <p>{data.description}</p>
            <p className="font-bold">{data.subtitle}</p>
          </div>
          <div className="space-y-4">
            {/* 첫 번째 이미지: 자연 비율, 적당한 높이 */}
            {data.images[0] && (
              <img
                src={data.images[0]}
                alt="첫 번째 이미지"
                className="rounded-lg w-full max-w-md h-[250px] object-cover mx-auto"
              />
            )}

            {/* 두 번째 이미지: 수직으로 작게 */}
            {data.images[1] && (
              <img
                src={data.images[1]}
                alt="두 번째 이미지"
                className="rounded-lg w-full max-w-md h-[150px] object-cover mx-auto"
              />
            )}
          </div>
        </div>
      </section>

      {/* 시험 정보 */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6">시험정보</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">필기시험</h3>
              <ul className="list-disc list-inside">
                {data.examInfo.written.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">실기시험</h3>
              <ul className="list-disc list-inside">
                {data.examInfo.practical.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Top 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition"
      >
        Top
      </button>
    </div>
  )
}
