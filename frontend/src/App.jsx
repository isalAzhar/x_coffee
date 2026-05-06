import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardAdmin from "./pages/DashboardAdmin";
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