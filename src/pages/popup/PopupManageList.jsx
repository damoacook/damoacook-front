import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function authHeaders() {
  const token = localStorage.getItem('accessToken');
  // MultiPartParser/FormParser만 있으므로 JSON 말고 FormData나 x-www-form-urlencoded로 보내자
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function fd(obj) {
  const form = new FormData();
  Object.entries(obj).forEach(([k, v]) => form.append(k, String(v)));
  return form;
}

export default function PopupManageList() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const nav = useNavigate();

  const load = React.useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/popup/');
      const rows = Array.isArray(data) ? data : (data?.results ?? []);
      setItems(rows);
    } catch (e) {
      alert('팝업 목록 로딩 실패');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  // ✅ 핵심: 선택한 id만 활성(true), 나머지 true였던 것들은 false로
  const setActiveOnly = async (id) => {
    try {
      // 현재 활성 목록 파악
      const actives = items.filter(it => it.is_active && it.id !== id);

      // 1) 선택한 팝업 활성화
      await axios.patch(`/api/popup/${id}/`, fd({ is_active: true }), { headers: authHeaders() });

      // 2) 기존 활성들은 비활성화
      if (actives.length) {
        await Promise.all(
          actives.map(it =>
            axios.patch(`/api/popup/${it.id}/`, fd({ is_active: false }), { headers: authHeaders() })
          )
        );
      }

      alert('활성화 되었습니다. (다른 팝업은 비활성화)');
      load();
    } catch (e) {
      alert('활성화 실패: 권한/네트워크를 확인해주세요.');
    }
  };

  const deactivate = async (id) => {
    try {
      await axios.patch(`/api/popup/${id}/`, fd({ is_active: false }), { headers: authHeaders() });
      load();
    } catch {
      alert('비활성화 실패');
    }
  };

  const remove = async (id) => {
    if (!confirm('정말 삭제할까요?')) return;
    try {
      await axios.delete(`/api/popup/${id}/`, { headers: authHeaders() });
      load();
    } catch {
      alert('삭제 실패');
    }
  };

  if (loading) return <p className="p-6">로딩 중…</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">팝업 관리</h1>
        <Link
          to="/popup/manage/new"
          className="rounded bg-orange-600 px-3 py-2 text-white text-sm font-semibold hover:bg-orange-700"
        >
          + 새 팝업
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">등록된 팝업이 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(item => (
            <li key={item.id} className="border rounded-xl bg-white overflow-hidden">
              <div className="aspect-[4/3] bg-gray-50">
                {(item.image_url || item.image) ? (
                  <img src={item.image_url ?? ''} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">이미지 없음</div>
                )}
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold line-clamp-1">{item.title || '제목 없음'}</h3>
                  {item.is_active ? (
                    <span className="text-xs rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5">활성</span>
                  ) : (
                    <span className="text-xs rounded-full bg-gray-100 text-gray-600 px-2 py-0.5">비활성</span>
                  )}
                </div>
                {item.link_url && (
                  <a href={item.link_url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline">
                    링크 열기
                  </a>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => nav(`/popup/manage/${item.id}/edit`)}
                    className="rounded border border-gray-200 px-2 py-1 text-sm hover:bg-gray-50"
                  >
                    수정
                  </button>
                  {item.is_active ? (
                    <button
                      onClick={() => deactivate(item.id)}
                      className="rounded border border-gray-200 px-2 py-1 text-sm hover:bg-gray-50"
                    >
                      비활성
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveOnly(item.id)}
                      className="rounded bg-orange-600 px-2 py-1 text-sm text-white hover:bg-orange-700"
                    >
                      활성화(단일)
                    </button>
                  )}
                  <button
                    onClick={() => remove(item.id)}
                    className="rounded border border-red-200 px-2 py-1 text-sm text-red-600 hover:bg-red-50"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
