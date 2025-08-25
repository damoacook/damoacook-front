import React from "react";
import { Trophy, GraduationCap, Users } from "lucide-react";

export default function TrustStrip() {
  const items = [
    { icon: Trophy,   label: "수상", value: "대상·장관상 다수" },
    { icon: GraduationCap, label: "합격자", value: "기능장·산업기사 다수 배출" },
    { icon: Users,    label: "만족도", value: "수강생 추천 98%" },
  ];

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-3">
          {items.map(({ icon: I, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 shadow-sm"
            >
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-600 text-white">
                <I size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-semibold text-gray-900">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
