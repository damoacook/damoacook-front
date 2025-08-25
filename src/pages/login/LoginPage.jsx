import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post("/api/admin/login/", {
        email,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userEmail", email);


      

      navigate("/");
    } catch (error) {
      setErrorMsg("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white border border-orange-300 rounded-2xl shadow-md">
        {/* 다모아 로고 (텍스트 or 이미지) */}
        <div className="flex justify-center mb-10">
          {/* 이미지 로고 사용 시 아래 주석 해제하고 src 교체 */}
          <img src="images/다모아로고.png" alt="다모아 로고" className="h-40 w-auto" />
          {/* <h1 className="text-3xl font-bold text-orange-500">다모아</h1> */}
        </div>

        <h2 className="text-xl font-semibold text-center text-black mb-6">
          관리자 로그인
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">
              이메일
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              비밀번호
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMsg && (
            <div className="text-sm text-red-500 text-center">{errorMsg}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition duration-200"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
