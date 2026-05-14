import {
  House,
  Box,
  People,
  Truck,
  FileEarmarkText,
  Person,
} from "react-bootstrap-icons";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-xcoffee.png";

export default function SidebarAdmin({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <House />, path: "/admin" },
    { name: "Produk", icon: <Box />, path: "/produk" },
    { name: "Mitra", icon: <People />, path: "/mitra" },
    { name: "Distribusi", icon: <Truck />, path: "/distribusi" },
    { name: "Laporan", icon: <FileEarmarkText />, path: "/laporan" },
    { name: "Profil", icon: <Person />, path: "/profile" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <div className="sidebar-header d-flex align-items-center gap-2">
          <img src={logo} alt="logo" className="sidebar-logo" />

          {isOpen && (
            <div>
              <h5 className="mb-0">X Coffee</h5>
              <small>Admin Outlet</small>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-menu-wrapper">
        {menu.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`sidebar-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}