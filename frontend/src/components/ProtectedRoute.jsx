import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("user"); // Tambahan pengecekan data user
  const location = useLocation();

  // 1. Cek apakah semua data esensial ada
  // Jika salah satu tidak ada, anggap tidak terautentikasi
  if (!token || !role || !user) {
    // Menghapus sisa data yang mungkin pincang (misal ada token tapi tidak ada role)
    localStorage.clear(); 
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 2. Cek kecocokan Role
  if (allowedRole && role !== allowedRole) {
    // Jika role tidak sesuai, lempar kembali ke login
    return <Navigate to="/" replace />;
  }

  // 3. Jika lolos semua validasi
  return children;
};

export default ProtectedRoute;