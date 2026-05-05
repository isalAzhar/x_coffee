import React, { useState } from "react";
import SidebarCanvassing from "../components/SidebarCanvassing";
import FormTambahMitra from "../components/FormTambahMitra";
import { List } from "react-bootstrap-icons";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
} from "react-bootstrap";

export default function DashboardCanvassing() {
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const mitra = [
    {
      nama: "Warkop Cak Ali",
      jenis: "Robusta",
      jumlah: 20,
      terjual: 15,
      posisi: [-6.23, 106.81],
    },
    {
      nama: "Kantin Pak Joko",
      jenis: "Arabica",
      jumlah: 15,
      terjual: 15,
      posisi: [-6.21, 106.82],
    },
  ];

  return (
    <div className="d-flex">
      {/* SIDEBAR */}
      <SidebarCanvassing
        isOpen={isOpen}
        toggleSidebar={() => setIsOpen(!isOpen)}
      />

      {/* MAIN */}
      <div className="main-content flex-grow-1">

        {/* HEADER */}
        <div className="header d-flex align-items-center gap-3">
          <List onClick={() => setIsOpen(!isOpen)} className="toggle-btn" />

          <div>
            <small className="text-light">CANVASSING</small>
            <h4 className="fw-bold text-white mb-0">Peta Kerja</h4>
          </div>
        </div>

        {/* CONTENT */}
        <Container fluid className="content p-4">

          {/* TITLE DASHBOARD */}
            <div className="mb-4">
              <h5 className="fw-bold mb-1">
                Dashboard Operasional Canvassing X Coffee
              </h5>
              <p className="text-muted mb-0">
                Kelola penjualan, titipan kopi, dan mitra langsung dari lapangan
              </p>
            </div>

          {/* ================= STATS ================= */}
          <Row className="g-3 mb-4">

            <Col md={3}>
              <Card className="custom-card">
                <Card.Body>
                  <small className="text-muted">Total Mitra</small>
                  <h3 className="fw-bold mb-1">50</h3>
                  <p className="text-muted small">Mitra aktif</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="custom-card">
                <Card.Body>
                  <small className="text-muted">Total Titipan</small>
                  <h4>74</h4>
                  <p className="text-muted small">Produk dititipkan</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="custom-card">
                <Card.Body>
                  <small className="text-muted">Total Terjual</small>
                  <h4>120 pcs</h4>
                  <p className="text-muted small">Produk terjual</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="custom-card">
                <Card.Body>
                  <small className="text-muted">Sisa Stok</small>
                  <h4>40 pcs</h4>
                  <p className="text-muted small">Stok tersisa</p>
                </Card.Body>
              </Card>
            </Col>

          </Row>

          {/* ================= TABLE ================= */}
          <Card className="custom-card mb-4">
            <Card.Body>

              <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0">Data Mitra </h5>

                <Button
                  className="btn-coffee"
                  onClick={() => setShowModal(true)}
                >
                  + Tambah Mitra
                </Button>
              </div>

              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Nama Mitra</th>
                    <th>Jenis Kopi</th>
                    <th>Jumlah</th>
                    <th>Terjual</th>
                    <th>Sisa</th>
                  </tr>
                </thead>

                <tbody>
                  {mitra.map((m, i) => (
                    <tr key={i}>
                      <td>{m.nama}</td>
                      <td>{m.jenis}</td>
                      <td>{m.jumlah}</td>
                      <td>{m.terjual}</td>
                      <td>{m.jumlah - m.terjual}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

            </Card.Body>
          </Card>
        </Container>

        {/* MODAL */}
        <FormTambahMitra
          show={showModal}
          onClose={() => setShowModal(false)}
        />

      </div>
    </div>
  );
}