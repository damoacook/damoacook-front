import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const isAuthed = !!localStorage.getItem('accessToken'); // 또는 access_token
  const loc = useLocation();
  if (!isAuthed) return <Navigate to="/login" replace state={{ from: loc }} />;
  return children;
}