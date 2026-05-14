import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";

import {
  List,
  Envelope,
  Telephone,
  Calendar3,
  Clock,
  BoxArrowRight,
  ShieldCheck,
  PencilFill,
  Save,
} from "react-bootstrap-icons";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";

function Profile() {
  const [isOpen, setIsOpen] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    id: "ADM-OUTLET-001",
    nama: "Admin Outlet",
    no_hp: "0812 3456 7890",
    outlet: "Outlet Pusat",
    role: "Administrator",
    join: "01 Januari 2025",
    login: "18 Mei 2026, 09.15 WIB",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="d-flex">
      <SidebarAdmin
        isOpen={isOpen}
        toggleSidebar={() => setIsOpen(!isOpen)}
      />

      <div className="body flex-grow-1">
        <div className="header d-flex align-items-center gap-3 py-3">
          <List
            className="toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
          />

          <div>
            <small className="text-light">ADMIN OUTLET</small>
            <h4 className="fw-bold text-white mb-0">Profil</h4>
          </div>
        </div>

        <Container fluid className="content p-4">
          <div className="mb-4">
            <h5 className="fw-bold mb-1">Profil Saya</h5>
            <p className="text-muted mb-0">
              Kelola informasi akun dan preferensi Anda.
            </p>
          </div>

          <Row className="g-4">
            <Col lg={4}>
              <Card className="profile-card-new">
                <Card.Body className="text-center">
                  <div className="profile-avatar-wrapper">
                    <div className="profile-avatar">
                      AD
                    </div>

                    <button className="profile-edit-avatar">
                      <PencilFill />
                    </button>
                  </div>

                  <h5 className="fw-bold mt-3 mb-2">
                    {profile.nama}
                  </h5>

                  <span className="profile-role-badge">
                    {profile.id}
                  </span>

                  <hr className="my-4" />

                  <div className="profile-info-list">
                    <div className="profile-info-item">
                      <Telephone />

                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-semibold">
                          {profile.no_hp}
                        </span>
                      </div>
                    </div>

                    <div className="profile-info-item">
                      <Calendar3 />

                      <div>
                        <small className="text-muted d-block">
                          Bergabung sejak
                        </small>

                        <span className="fw-semibold">
                          {profile.join}
                        </span>
                      </div>
                    </div>

                    <div className="profile-info-item">
                      <Clock />

                      <div>
                        <small className="text-muted d-block">
                          Login terakhir
                        </small>

                        <span className="fw-semibold">
                          {profile.login}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline-danger"
                    className="w-100 mt-4 profile-logout-btn"
                    onClick={() => setShowLogout(true)}
                  >
                    <BoxArrowRight className="me-2" />
                    Keluar
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={8}>
              <Card className="profile-card-new mb-4">
                <Card.Body>
                  <h5 className="fw-bold mb-4">
                    Informasi Profil
                  </h5>

                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>ID</Form.Label>
                          <Form.Control
                            type="text"
                            name="id"
                            value={profile.id}
                            onChange={handleChange}
                            disabled
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>Role</Form.Label>
                          <Form.Control
                            type="text"
                            name="role"
                            value={profile.role}
                            onChange={handleChange}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>Nama Lengkap</Form.Label>
                          <Form.Control
                            type="text"
                            name="nama"
                            value={profile.nama}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>Outlet</Form.Label>
                          <Form.Control
                            type="text"
                            name="outlet"
                            value={profile.outlet}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>No WhatsApp</Form.Label>
                          <Form.Control
                            type="text"
                            name="no_hp"
                            value={profile.no_hp}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-3">
                      <Button className="btn-danger profile-save-btn">
                        <Save className="me-2" />
                        Simpan Perubahan
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              <Card className="profile-card-new">
                <Card.Body className="d-flex align-items-center gap-3">
                  <div className="profile-security-icon">
                    <ShieldCheck />
                  </div>

                  <div>
                    <h6 className="fw-bold mb-1">
                      Informasi Keamanan
                    </h6>

                    <p className="text-muted mb-0">
                      Kelola keamanan akun Anda dengan menjaga informasi login tetap aman dan tidak membagikannya kepada siapapun.
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {showLogout && (
        <div className="logout-overlay">
          <div className="logout-card">
            <div className="logout-icon">🚪</div>

            <h4 className="fw-bold">KELUAR</h4>

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

export default Profile;