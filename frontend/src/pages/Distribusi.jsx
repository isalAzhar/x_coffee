import { useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";

import {
  Container,
  Card,
  Table,
  Button,
  Form,
} from "react-bootstrap";

import {
  List,
  Search,
  CheckCircle,
  Truck,
  Box,
  Clock,
  Calendar3,
} from "react-bootstrap-icons";

  function Distribusi() {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");

  const [distribusiList, setDistribusiList] = useState([
    {
      tanggal: "11 Mei 2026, 14.48",
      mitra: "Warung Bu Sari",
      produk: "Kopi Hitam",
      varian: "Sachet 20g",
      jumlah: "25 pcs",
      canvasser: "Andi Pratama",
      status: "Sudah Disetor",
    },
    {
      tanggal: "10 Mei 2026, 14.48",
      mitra: "Warung Pak Tono",
      produk: "Kopi Hitam",
      varian: "Sachet 20g",
      jumlah: "20 pcs",
      canvasser: "Andi Pratama",
      status: "Pending",
    },
    {
      tanggal: "09 Mei 2026, 14.48",
      mitra: "Kedai Mbak Dewi",
      produk: "Kopi Tubruk",
      varian: "Sachet 25g",
      jumlah: "35 pcs",
      canvasser: "Rina Sari",
      status: "Sudah Disetor",
    },
    {
      tanggal: "09 Mei 2026, 14.48",
      mitra: "Kedai Mbak Dewi",
      produk: "Kopi Susu",
      varian: "Sachet 30g",
      jumlah: "30 pcs",
      canvasser: "Rina Sari",
      status: "Pending",
    },
    {
      tanggal: "08 Mei 2026, 14.48",
      mitra: "Warkop Cak Ali",
      produk: "Kopi Robusta Premium",
      varian: "Sachet 25g",
      jumlah: "20 pcs",
      canvasser: "Rina Sari",
      status: "Pending",
    },
  ]);

  const totalDistribusi = distribusiList.length;
  const sudahDisetor = distribusiList.filter(
    (item) => item.status === "Sudah Disetor"
  ).length;
  const pending = distribusiList.filter(
    (item) => item.status === "Pending"
  ).length;

  const handleSetor = (index) => {
    const itemDipilih = filteredDistribusi[index];

    const indexAsli = distribusiList.findIndex(
      (item) =>
        item.tanggal === itemDipilih.tanggal &&
        item.mitra === itemDipilih.mitra &&
        item.produk === itemDipilih.produk
    );

    const newData = [...distribusiList];
    newData[indexAsli].status = "Sudah Disetor";

    setDistribusiList(newData);
  };

  const filteredDistribusi = distribusiList.filter((item) => {
    const cocokSearch =
      item.mitra.toLowerCase().includes(search.toLowerCase()) ||
      item.produk.toLowerCase().includes(search.toLowerCase()) ||
      item.canvasser.toLowerCase().includes(search.toLowerCase());

    const cocokFilter =
      filter === "Semua" ||
      (filter === "Belum disetor" && item.status === "Pending") ||
      (filter === "Sudah disetor" && item.status === "Sudah Disetor");

    return cocokSearch && cocokFilter;
  });

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
            <h4 className="fw-bold text-white mb-0">Distribusi</h4>
          </div>
        </div>

        <Container fluid className="content p-4">
          {/* TITLE + SEARCH */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold mb-1">Monitoring Distribusi</h5>
              <p className="text-muted mb-0">
                Riwayat penitipan kopi dari canvasser ke mitra & status setoran.
              </p>
            </div>

            <div className="search-box distribusi-top-search">
              <Search className="search-icon" />

              <Form.Control
                type="text"
                placeholder="Cari mitra / produk / canvasser..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* FILTER */}
          <div className="filter-tabs mb-4">
            {["Semua", "Belum disetor", "Sudah disetor"].map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* STAT CARD */}
          <div className="distribusi-stat-wrapper mb-4">
            <Card className="dashboard-stat-card">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="dashboard-stat-icon stat-red">
                  <Truck />
                </div>

                <div>
                  <p className="mb-1 fw-semibold">Total Distribusi</p>
                  <h4 className="fw-bold mb-0">
                    {totalDistribusi}
                    <small className="ms-2 text-muted">transaksi</small>
                  </h4>
                </div>
              </Card.Body>
            </Card>

            <Card className="dashboard-stat-card">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="dashboard-stat-icon stat-orange">
                  <Box />
                </div>

                <div>
                  <p className="mb-1 fw-semibold">Sudah Disetor</p>
                  <h4 className="fw-bold mb-0">
                    {sudahDisetor}
                    <small className="ms-2 text-muted">transaksi</small>
                  </h4>
                </div>
              </Card.Body>
            </Card>

            <Card className="dashboard-stat-card">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="dashboard-stat-icon stat-yellow">
                  <Clock />
                </div>

                <div>
                  <p className="mb-1 fw-semibold">Pending</p>
                  <h4 className="fw-bold mb-0">
                    {pending}
                    <small className="ms-2 text-muted">transaksi</small>
                  </h4>
                </div>
              </Card.Body>
            </Card>

            <Card className="dashboard-stat-card">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="dashboard-stat-icon stat-red">
                  <Calendar3 />
                </div>

                <div>
                  <p className="mb-1 fw-semibold">Hari Ini</p>
                  <h4 className="fw-bold mb-0">
                    15
                    <small className="ms-2 text-muted">transaksi</small>
                  </h4>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* TABLE */}
          <Card className="custom-card distribusi-card">
            <Card.Body className="p-0">
              <Table
                  responsive
                  hover
                  className="table produk-modern-table table-compact mb-0"
                >
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>Mitra</th>
                    <th>Produk</th>
                    <th>Jumlah</th>
                    <th>Canvasser</th>
                    <th>Status</th>
                    <th className="text-center">
                      Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDistribusi.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center text-muted py-4">
                        Data distribusi tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredDistribusi.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>

                        <td className="text-muted">{item.tanggal}</td>

                        <td>{item.mitra}</td>

                        <td>
                          <div className="fw-bold">{item.produk}</div>
                          <small className="text-muted">{item.varian}</small>
                        </td>

                        <td>{item.jumlah}</td>

                        <td>{item.canvasser}</td>

                        <td>
                          <span
                            className={
                              item.status === "Sudah Disetor"
                                ? "status-pill status-active"
                                : "status-pill status-pending"
                            }
                          >
                            {item.status}
                          </span>
                        </td>

                        <td>
                          <div className="d-flex justify-content-center">
                            {item.status === "Pending" ? (
                              <button
                                type="button"
                                className="table-icon-btn"
                                onClick={() => handleSetor(index)}
                              >
                                <CheckCircle />
                              </button>
                            ) : (
                              <span className="text-success fw-semibold">
                                Selesai
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>

              <div className="produk-table-footer">
                <span>
                  Menampilkan 1 - {filteredDistribusi.length} dari{" "}
                  {totalDistribusi} data
                </span>

                <div className="d-flex align-items-center gap-2">
                  <Button size="sm" variant="outline-secondary">
                    ‹
                  </Button>

                  <Button size="sm" variant="danger">
                    1
                  </Button>

                  <Button size="sm" variant="outline-secondary">
                    2
                  </Button>

                  <Button size="sm" variant="outline-secondary">
                    3
                  </Button>

                  <Button size="sm" variant="outline-secondary">
                    ›
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default Distribusi;