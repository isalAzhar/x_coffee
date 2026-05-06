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
  const [canvasserList, setCanvasserList] = useState([]);
  const handleTambah = (data) => {
    setCanvasserList((prev) => [...prev, data]);
  };
  const handleDelete = (index) => {
  const newData = canvasserList.filter((_, i) => i !== index);
  setCanvasserList(newData);
};

  return (
    <div className="d-flex">

      <SidebarAdmin
        isOpen={isOpen}
        toggleSidebar={() => setIsOpen(!isOpen)}
      />

      <div className="body flex-grow-1">

        {/* HEADER */}
        <div className="header d-flex align-items-center gap-3 py-3">
          <List
            className="toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
          />

          <div>
            <small className="text-light">ADMIN OUTLET</small>
            <h4 className="fw-bold text-white mb-0">Dashboard</h4>
          </div>
        </div>

        <Container fluid className="content p-4">

          {/* TITLE */}
          <div className="mb-4">
            <h5 className="fw-bold mb-1">
              Dashboard Operasional X Coffee
            </h5>
            <p className="text-muted mb-0">
              Ringkasan operasional distribusi dan kinerja penjualan harian
            </p>
          </div>

          {/* TABLE */}
          <Card className="custom-card">
            <Card.Body>

              <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0">Data Canvasser</h5>

                <Button
                  className="btn-coffee"
                  onClick={() => setShowModal(true)}
                >
                  + Tambah Canvasser
                </Button>
              </div>

              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>No Whatsapp</th>
                    <th>Password</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {/* 🔥 DATA DINAMIS */}
                  {canvasserList.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        Belum ada data
                      </td>
                    </tr>
                  ) : (
                    canvasserList.map((item, index) => (
                      <tr key={index}>
                        <td>{item.nama}</td>
                        <td>{item.nohp}</td>
                        <td>{item.password}</td>
                        <td>
                          <Badge bg="success">Aktif</Badge>
                        </td>
                        <td>
                        <Button
                          size="sm"
                          variant="warning"
                          className="me-2"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(index)}
                        >
                          Hapus
                        </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

              </Table>

            </Card.Body>
          </Card>

        </Container>

        {/* MODAL (HANYA 1X) */}
        <FormTambahCanvasser
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleTambah}
        />

      </div>
    </div>
  );
}