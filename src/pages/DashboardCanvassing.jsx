import React, { useState } from "react";
import SidebarCanvassing from "../components/SidebarCanvassing";
import FormTambahMitra from "../components/FormTambahMitra";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
} from "react-bootstrap";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// FIX ICON MARKER
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function DashboardCanvassing() {
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const mitra = [
    {
      nama: "Warung Bu Sari",
      alamat: "Jakarta Pusat",
      stok: 50,
      status: "aman",
      posisi: [-6.200, 106.816],
    },
    {
      nama: "Kantin Pak Joko",
      alamat: "Jakarta Pusat",
      stok: 17,
      status: "aman",
      posisi: [-6.210, 106.82],
    },
    {
      nama: "Warkop Cak Ali",
      alamat: "Jakarta Selatan",
      stok: 1,
      status: "sedikit",
      posisi: [-6.23, 106.81],
    },
    {
      nama: "Kedai Mbak Dewi",
      alamat: "Jakarta Selatan",
      stok: 25,
      status: "aman",
      posisi: [-6.24, 106.83],
    },
  ];

  const getBadge = (status) => {
    if (status === "aman") return "success";
    if (status === "sedikit") return "warning";
    return "danger";
  };

  return (
    <div className="d-flex">
      <SidebarCanvassing isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`main-content flex-grow-1 ${isOpen ? "" : "expanded"}`}>

        {/* HEADER */}
        <div className="header d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">CANVASSING</small>
            <h4 className="fw-bold">Peta Mitra</h4>
          </div>
        </div>

        {/* MODAL */}
        <FormTambahMitra
          show={showModal}
          onClose={() => setShowModal(false)}
        />

        <Container fluid className="p-4">
          <Row>

            {/* LEFT LIST */}
            <Col md={4}>
              <Card className="custom-card">
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
                    <h5>Mitra di sekitar</h5>
                    <Badge bg="secondary">{mitra.length}</Badge>
                  </div>

                  <Form.Control
                    placeholder="Cari mitra..."
                    className="mb-3"
                  />

                  {mitra.map((m, i) => (
                    <div key={i} className="p-3 border rounded mb-2">
                      <strong>{m.nama}</strong>
                      <br />
                      <small>{m.alamat}</small>

                      <div className="mt-2">
                        <small>Total stok: {m.stok} pcs</small>
                      </div>

                      <Badge bg={getBadge(m.status)} className="mt-2">
                        {m.status}
                      </Badge>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* RIGHT SIDE */}
            <Col md={8}>

              {/* BUTTON */}
              <div className="d-flex justify-content-end mb-3">
                <Button
                  className="btn-coffee"
                  onClick={() => setShowModal(true)}
                >
                  + Tambah Mitra
                </Button>
              </div>

              {/* MAP */}
              <Card className="custom-card">
                <Card.Body style={{ height: "500px", width: "100%" }}>
                  <MapContainer
                    center={[-6.220, 106.820]}
                    zoom={13}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "12px",
                    }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {mitra.map((m, i) => (
                      <Marker key={i} position={m.posisi}>
                        <Popup>
                          <strong>{m.nama}</strong>
                          <br />
                          {m.alamat}
                          <br />
                          Stok: {m.stok} pcs
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </Card.Body>
              </Card>

            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}