import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardAdmin />} />
    </Routes>
  );
}

export default App;