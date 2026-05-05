import React from "react";
import {
  House,
  Box,
  People,
  Truck,
  FileEarmarkText,
  Person,
} from "react-bootstrap-icons";

export default function Sidebar() {
  return (
    <div
      className="sidebar p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h4 className="fw-bold">X Coffee</h4>
      <p className="text-muted small">Admin Outlet</p>

      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <a className="nav-link active mb-2" href="#">
            <House className="me-2" /> Dashboard
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <Box className="me-2" /> Produk
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <People className="me-2" /> Mitra
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <Truck className="me-2" /> Distribusi
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <FileEarmarkText className="me-2" /> Laporan
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <Person className="me-2" /> Profil
          </a>
        </li>
      </ul>
    </div>
  );
}