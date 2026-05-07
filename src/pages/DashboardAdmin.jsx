import React from "react";
import Sidebar from "../components/SidebarAdmin";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import { Bell } from "react-bootstrap-icons";

export default function DashboardAdmin() {
  return (
    <div className="d-flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-grow-1">

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom bg-white">
          <div>
            <small className="text-muted">ADMIN OUTLET</small>
            <h3>Dashboard</h3>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Bell size={20} />
            <div className="text-end">
              <div className="fw-bold">Pak Budi</div>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <Container fluid className="p-4">

          {/* ===== STATS ===== */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <p className="text-muted">Total Mitra</p>
                  <h4>5</h4>
                  <small>Mitra terdaftar</small>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <p className="text-muted">Total Penjualan</p>
                  <h4>Rp 747.000</h4>
                  <small>12 transaksi</small>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <p className="text-muted">Total Distribusi</p>
                  <h4>290 pcs</h4>
                  <small>10 titipan</small>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <p className="text-muted">Setoran Tertunda</p>
                  <h4>Rp 747.000</h4>
                  <small>Belum ditarik</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* ===== CHART + STOCK ===== */}
          <Row className="mb-4">
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5>Penjualan 7 hari</h5>
                  <p className="text-muted small">Total nilai penjualan harian (Rupiah).</p>

                  <div
                    className="d-flex align-items-end gap-3"
                    style={{ height: "200px" }}
                  >
                    {[20, 50, 80, 60, 90, 55, 30].map((val, i) => (
                      <div
                        key={i}
                        className="bg-dark"
                        style={{
                          width: "40px",
                          height: `${val * 2}px`,
                        }}
                      ></div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5>Stok hampir habis</h5>

                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      <strong>Kantin Pak Joko</strong>
                      <br />
                      <small>Kopi Tubruk</small>
                    </div>
                    <Badge bg="warning">4 pcs</Badge>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      <strong>Warkop Cak Ali</strong>
                      <br />
                      <small>Kopi Robusta</small>
                    </div>
                    <Badge bg="danger">Habis</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* ===== TABLE ===== */}
          <Row>
            <Col>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5>Top Mitra</h5>

                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Mitra</th>
                        <th>Pemilik</th>
                        <th>Alamat</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Warung Bu Sari</td>
                        <td>Sari</td>
                        <td>Jakarta</td>
                        <td className="text-end">Rp 235.000</td>
                      </tr>

                      <tr>
                        <td>Warkop Cak Ali</td>
                        <td>Ali</td>
                        <td>Jakarta</td>
                        <td className="text-end">Rp 191.000</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </div>
  );
}