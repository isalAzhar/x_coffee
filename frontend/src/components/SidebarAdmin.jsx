import {
  House,
  Box,
  People,
  Truck,
  FileEarmarkText,
  Person,
  List,
} from "react-bootstrap-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-xcoffee.png";

export default function SidebarAdmin({ isOpen, toggleSidebar }) {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

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

      {/* HEADER */}
        <div className="sidebar-header">
          <div className="sidebar-header d-flex align-items-center gap-2">
            
            {/* LOGO */}
            <img
              src={logo}
              alt="logo"
              className="sidebar-logo"
            />

            {/* TEXT (hilang saat close) */}
            {isOpen && (
              <div>
                <h5 className="mb-0">X Coffee</h5>
                <small>Admin Outlet</small>
              </div>
            )}

          </div>
        </div>

      {/* MENU */}
      <div className="sidebar-menu-wrapper">
        {menu.map((item) => (
          <div
            key={item.name}
            onClick={() => {
            setActive(item.name);
            navigate(item.path); }}
            className={`sidebar-item ${
              active === item.name ? "active" : ""
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