import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardAdmin from "./pages/DashboardAdmin";
import Produk from"./pages/Produk";
import MitraAdmin from "./pages/MitraAdmin";
import Distribusi from "./pages/Distribusi";
import Laporan from "./pages/Laporan";
import DashboardCanvassing from "./pages/DashboardCanvassing";
import Profile from "./pages/Profile";

import './index.css';

function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* ADMIN */}
      <Route path="/admin" element={
      <ProtectedRoute allowedRole="admin">
      <DashboardAdmin />
      </ProtectedRoute>
      } />

      {/* PRODUK */}
      <Route
        path="/produk"
        element={
          <ProtectedRoute allowedRole="admin">
            <Produk />
          </ProtectedRoute>
        }
      />
      {/* MITRA ADMIN */}
      <Route
        path="/mitra"
        element={
          <ProtectedRoute allowedRole="admin">
            <MitraAdmin />
          </ProtectedRoute>
        }
      />
      {/* DISTRIBUSI */}
      <Route
        path="/distribusi"
        element={
          <ProtectedRoute allowedRole="admin">
            <Distribusi />
          </ProtectedRoute>
        }
      />

      {/* DISTRIBUSI */}
      <Route
        path="/laporan"
        element={
          <ProtectedRoute allowedRole="admin">
            <Laporan />
          </ProtectedRoute>
        }
      />

      {/* CANVASSING */}
      <Route path="/canvassing" element={
      <ProtectedRoute allowedRole="canvassing">
      <DashboardCanvassing />
      </ProtectedRoute>
      } />

       {/* profile */}
      <Route path="/profile" element={
      <ProtectedRoute allowedRole="admin">
      <Profile />
      </ProtectedRoute>
      } />


      {/* DEFAULT REDIRECT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
  
}

export default App;