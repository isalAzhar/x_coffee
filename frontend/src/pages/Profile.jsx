import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import SidebarAdmin from "../components/SidebarAdmin";
import profil from "../assets/profile.png";
import { List } from "react-bootstrap-icons";

import { Container, Row, Col, Card } from "react-bootstrap";

export default function Profile() {

  const [isOpen, setIsOpen] = useState(true);
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  const profile = {
    nama: "Tasya Cantika",
    no_hp: "08123456789",
    role: "Admin Outlet",
  };

  const handleLogout = async () => {
    try {

      // LOGOUT API
      await api.post("/logout");

      // HAPUS SESSION LOGIN
      localStorage.clear();

      // KEMBALI KE LOGIN
      navigate("/");

    } catch (err) {

      console.log(err);

      // tetap logout frontend
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="d-flex">

      {/* SIDEBAR */}
      <SidebarAdmin
        isOpen={isOpen}
        toggleSidebar={() => setIsOpen(!isOpen)}
      />

      {/* MAIN CONTENT */}
      <div className="main-content flex-grow-1">

        {/* HEADER */}
        <div className="header d-flex align-items-center gap-3">

          <List
            className="toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
          />

          <div>
            <small className="text-light">
              ADMIN OUTLET
            </small>

            <h4 className="fw-bold text-white mb-0">
              Profile
            </h4>
          </div>

        </div>

        {/* CONTENT */}
        <Container fluid className="content p-4">

          <Row className="justify-content-center">

            <Col md={6}>

              <Card className="profile-card text-center">

                <Card.Body>

                  {/* FOTO */}
                  <img
                    src={profil}
                    alt="profil"
                    className="rounded-circle mb-3"
                    width="120"
                    height="120"
                  />

                  <h5 className="fw-bold">
                    {profile.nama}
                  </h5>

                  {/* ROLE */}
                  <p className="text-muted mb-2">
                    {profile.role}
                  </p>

                  {/* DATA */}
                  <div className="text-start mt-4">

                    <div className="mb-3">
                      <small className="text-muted">
                        Nama
                      </small>

                      <h6 className="fw-bold">
                        {profile.nama}
                      </h6>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted">
                        Role
                      </small>

                      <h6 className="fw-bold">
                        {profile.role}
                      </h6>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted">
                        No WhatsApp
                      </small>

                      <h6 className="fw-bold">
                        {profile.no_hp}
                      </h6>
                    </div>

                  </div>

                  {/* BUTTON LOGOUT */}
                  <button
                    onClick={() => setShowLogout(true)}
                    className="btn btn-danger mt-4 w-100"
                  >
                    Keluar
                  </button>

                </Card.Body>

              </Card>

            </Col>

          </Row>

        </Container>
      </div>

      {/* MODAL LOGOUT */}
      {showLogout && (
        <div className="logout-overlay">

          <div className="logout-card">

            <div className="logout-icon">
              🚪
            </div>

            <h4 className="fw-bold">
              KELUAR
            </h4>

            <p className="text-muted">
              Apakah anda yakin ingin keluar?
            </p>

            <button
              className="btn btn-danger w-100 mb-2"
              onClick={handleLogout}
            >
              Keluar
            </button>

            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => setShowLogout(false)}
            >
              Tidak
            </button>

          </div>

        </div>
      )}

    </div>
  );
}