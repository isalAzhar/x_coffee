import React, { useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import FormTambahCanvasser from "../components/FormTambahCanvasser";

import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
} from "react-bootstrap";
import { Bell } from "react-bootstrap-icons";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DashboardAdmin() {
  const [isOpen, setIsOpen] = useState(true);
const toggleSidebar = () => setIsOpen(!isOpen);

  const [showModal, setShowModal] = useState(false);

  const data = {
    labels: ["28 Apr", "29 Apr", "30 Apr", "01 Mei", "02 Mei", "03 Mei", "04 Mei"],
    datasets: [
      {
        label: "Penjualan",
        data: [0, 80, 150, 120, 180, 110, 60],
        backgroundColor: "#5D4037",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value + "k",
        },
      },
    },
  };

  return (
    <div className="d-flex">
      <SidebarAdmin isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`main-content flex-grow-1 ${isOpen ? "" : "expanded"}`}>

        {/* HEADER */}
        <div className="header d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">ADMIN OUTLET</small>
            <h4 className="fw-bold">Dashboard</h4>
          </div>
        </div>

        <Container fluid className="p-4">

          {/* STATS */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="custom-card">
                <Card.Body>
                  <p className="text-muted">Total Canvasser</p>
                  <h3>50</h3>
                  <small>Canavsser terdaftar</small>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="custom-card">
                <Card.Body>
                  <p className="text-muted">Total Mitra</p>
                  <h3>74</h3>
                  <small>Mitra terdaftar</small>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="custom-card">
                <Card.Body>
                  <p className="text-muted">Total Penjualan</p>
                  <h3>Rp 895.000</h3>
                  <small>30 transaksi</small>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="custom-card">
                <Card.Body>
                  <p className="text-muted">Total Distribusi</p>
                  <h3>429 Pcs</h3>
                  <small>25 titipan</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* CHART + STOCK */}
          <Row className="mb-4">
            <Col md={8}>
              <Card className="custom-card">
                <Card.Body>
                  <h5>Penjualan 7 hari terakhir</h5>
                  <p className="text-muted small">
                    Total nilai penjualan harian (Rupiah)
                  </p>

                  <Bar data={data} options={options} />
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Button
                className="btn-coffee w-100 mb-3"
                onClick={() => setShowModal(true)}
              >
                + Tambah Canvasser
              </Button>

              <Card className="custom-card">
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
                      <small>Kopi Robusta Premium</small>
                    </div>
                    <Badge bg="danger">Habis</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* TABLE */}
          <Card className="custom-card">
            <Card.Body>
              <h5>Top Mitra</h5>

              <Table striped hover responsive>
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
                    <td>Sari Wulandari</td>
                    <td>Jakarta</td>
                    <td className="text-end">Rp 235.000</td>
                  </tr>

                  <tr>
                    <td>Warkop Bu Ayu</td>
                    <td>Ayu</td>
                    <td>Bogor</td>
                    <td className="text-end">Rp 100.000</td>
                  </tr>

                  <tr>
                    <td>Warung Pak Dadang</td>
                    <td>Dadang</td>
                    <td>Bogor</td>
                    <td className="text-end">Rp 355.000</td>
                  </tr>

                  <tr>
                    <td>Kantin Bu Dewi</td>
                    <td>Dewi Ratna</td>
                    <td>Bogor</td>
                    <td className="text-end">Rp 123.000</td>
                  </tr>

                  <tr>
                    <td>Kantin Bu Tuti</td>
                    <td>Hastuti</td>
                    <td>Jakarta</td>
                    <td className="text-end">Rp 250.000</td>
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