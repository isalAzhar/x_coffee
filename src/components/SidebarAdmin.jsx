import {
  House,
  Box,
  People,
  Truck,
  FileEarmarkText,
  Person,
  List,
} from "react-bootstrap-icons";

export default function SidebarAdmin({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar p-3 ${isOpen ? "open" : "closed"}`}>

      {/* HEADER + TOGGLE */}
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
        
        {isOpen && (
          <div>
            <h5 className="fw-bold mb-0">X Coffee</h5>
            <small className="text-muted">Admin Outlet</small>
          </div>
        )}

        {/* BUTTON TOGGLE */}
        <List
          size={24}
          style={{ cursor: "pointer" }}
          onClick={toggleSidebar}
        />
      </div>

      {/* MENU */}
      <ul className="nav flex-column mt-4">

        <li className="nav-item">
          <a className="nav-link active-sidebar">
            <House className="me-2" />
            {isOpen && "Dashboard"}
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link">
            <Box className="me-2" />
            {isOpen && "Produk"}
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link">
            <People className="me-2" />
            {isOpen && "Mitra"}
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link">
            <Truck className="me-2" />
            {isOpen && "Distribusi"}
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link">
            <FileEarmarkText className="me-2" />
            {isOpen && "Laporan"}
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