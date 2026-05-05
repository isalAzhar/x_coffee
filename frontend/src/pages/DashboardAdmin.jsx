import { useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import FormTambahCanvasser from "../components/FormTambahCanvasser";
import { List } from "react-bootstrap-icons";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
} from "react-bootstrap";

export default function DashboardAdmin() {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="d-flex">
      
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
            <small className="text-light">ADMIN OUTLET</small>
            <h4 className="fw-bold text-white mb-0">Dashboard</h4>
          </div>
        </div>

        {/* CONTENT */}
        <Container fluid className="content p-4">

          {/* TITLE DASHBOARD */}
            <div className="mb-4">
              <h5 className="fw-bold mb-1">
                Dashboard Operasional X Coffee
              </h5>
              <p className="text-muted mb-0">
                Ringkasan operasional distribusi dan kinerja penjualan harian
              </p>
            </div>

          {/* STATS */}
          <Row className="g-3 mb-4">
            <Col md={3}>
              <Card className="custom-card">
                <Card.Body>
                  <small className="text-muted">Total Canvasser</small>
                  <h3 className="fw-bold mb-1">50</h3>
                  <p className="text-muted extra small">
                    Canvasser terdaftar
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="custom-card">
                <Card.Body>
                  <small className="text-muted">Total Mitra</small>
                  <h4>74</h4>
                  <p className="text-muted extra small">
                    Mitra terdaftar
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="custom-card">
                <Card.Body>
                  <small className="text-muted">Total Penjualan</small>
                  <h4>Rp 895.000</h4>
                  <p className="text-muted extra small">
                    30 transaksi
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="custom-card">
                <Card.Body>
                  <small className="text-muted">Total Distribusi</small>
                  <h4>429 Pcs</h4>
                  <p className="text-muted extra small">
                    25 titipan
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* TABLE */}
          <Card className="custom-card">
            <Card.Body>

              <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0">Data Canvasser</h5>

                <Button
                  className="btn-coffee"
                  onClick={() => setShowModal(true)}
                >
                  + Tambah Canvassing
                </Button>
              </div>

              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>No HP</th>
                    <th>Area</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Ahmad Hidayat</td>
                    <td>08123456789</td>
                    <td>Bandung</td>
                    <td>
                      <Badge bg="success">Aktif</Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="warning" className="me-2">
                        Edit
                      </Button>
                      <Button size="sm" variant="danger">
                        Hapus
                      </Button>
                    </td>
                  </tr>

                  <tr>
                    <td>Siti Pertiwi</td>
                    <td>08987654321</td>
                    <td>Cimahi</td>
                    <td>
                      <Badge bg="secondary">Nonaktif</Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="warning" className="me-2">
                        Edit
                      </Button>
                      <Button size="sm" variant="danger">
                        Hapus
                      </Button>
                    </td>
                  </tr>
                </tbody>

              </Table>

            </Card.Body>
          </Card>

        </Container>

        {/* MODAL */}
        <FormTambahCanvasser
          show={showModal}
          onClose={() => setShowModal(false)}
        />

      </div>
    </div>
  );
}