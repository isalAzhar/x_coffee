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
import logo from "../assets/logo-xcoffee.png";

export default function SidebarAdmin({ isOpen, toggleSidebar }) {
  const [active, setActive] = useState("Dashboard");

  const menu = [
    { name: "Dashboard", icon: <House /> },
    { name: "Produk", icon: <Box /> },
    { name: "Mitra", icon: <People /> },
    { name: "Distribusi", icon: <Truck /> },
    { name: "Laporan", icon: <FileEarmarkText /> },
    { name: "Profil", icon: <Person /> },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

      {/* HEADER */}
        <div className="sidebar-header">

          <div className="d-flex align-items-center gap-2">
            
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
            onClick={() => setActive(item.name)}
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