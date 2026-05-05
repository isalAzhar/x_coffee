import React from "react";
import {
  List,
  Map,
  Box,
  People,
  Cash,
  Person,
} from "react-bootstrap-icons";

export default function SidebarCanvassing({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar p-3 ${isOpen ? "open" : "closed"}`}>

      <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
        {isOpen && (
          <div>
            <h5 className="mb-0 fw-bold">X Coffee</h5>
            <small className="text-muted">Canvasser</small>
          </div>
        )}

        <List size={22} style={{ cursor: "pointer" }} onClick={toggleSidebar} />
      </div>

      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <a className="nav-link active-sidebar">
            <Map className="me-2" />
            {isOpen && "Peta Mitra"}
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link">
            <Box className="me-2" />
            {isOpen && "Titip Kopi"}
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link">
            <People className="me-2" />
            {isOpen && "Riwayat"}
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link">
            <Cash className="me-2" />
            {isOpen && "Setoran"}
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link">
            <Person className="me-2" />
            {isOpen && "Profil"}
          </a>
        </li>
      </ul>
    </div>
  );
}