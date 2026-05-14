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
} from "react-bootstrap-icons";

function Laporan() {
  const [isOpen, setIsOpen] = useState(true);
  const [tab, setTab] = useState("Per Mitra");
  const [search, setSearch] = useState("");

  const laporanMitra = [
    {
      nama: "Warung Bu Sari",
      totalSetoran: "Rp 1.250.000",
      totalItem: "125 pcs",
      totalProduk: 3,
      jumlahTransaksi: 4,
      tanggalTerakhir: "18 Mei 2026, 14.48",
    },
    {
      nama: "Warung Pak Tono",
      totalSetoran: "Rp 980.000",
      totalItem: "98 pcs",
      totalProduk: 2,
      jumlahTransaksi: 3,
      tanggalTerakhir: "18 Mei 2026, 13.21",
    },
    {
      nama: "Kedai Mbak Dewi",
      totalSetoran: "Rp 1.475.000",
      totalItem: "148 pcs",
      totalProduk: 4,
      jumlahTransaksi: 5,
      tanggalTerakhir: "18 Mei 2026, 11.05",
    },
    {
      nama: "Warkop Cak Ali",
      totalSetoran: "Rp 760.000",
      totalItem: "76 pcs",
      totalProduk: 3,
      jumlahTransaksi: 2,
      tanggalTerakhir: "17 Mei 2026, 16.32",
    },
    {
      nama: "Kantin Pak Joko",
      totalSetoran: "Rp 540.000",
      totalItem: "54 pcs",
      totalProduk: 2,
      jumlahTransaksi: 2,
      tanggalTerakhir: "17 Mei 2026, 09.15",
    },
    {
      nama: "Kopi Corner",
      totalSetoran: "Rp 890.000",
      totalItem: "86 pcs",
      totalProduk: 3,
      jumlahTransaksi: 3,
      tanggalTerakhir: "16 Mei 2026, 17.20",
    },
  ];

  const laporanCanvasser = [
    {
      nama: "Andi Pratama",
      totalSetoran: "Rp 2.230.000",
      totalItem: "223 pcs",
      totalProduk: 5,
      jumlahTransaksi: 7,
      tanggalTerakhir: "18 Mei 2026, 14.48",
    },
    {
      nama: "Rina Sari",
      totalSetoran: "Rp 2.775.000",
      totalItem: "278 pcs",
      totalProduk: 6,
      jumlahTransaksi: 8,
      tanggalTerakhir: "18 Mei 2026, 11.05",
    },
    {
      nama: "Dedi Saputra",
      totalSetoran: "Rp 1.430.000",
      totalItem: "140 pcs",
      totalProduk: 4,
      jumlahTransaksi: 5,
      tanggalTerakhir: "17 Mei 2026, 16.32",
    },
    {
      nama: "Salsa Putri",
      totalSetoran: "Rp 1.020.000",
      totalItem: "102 pcs",
      totalProduk: 3,
      jumlahTransaksi: 4,
      tanggalTerakhir: "16 Mei 2026, 15.40",
    },
  ];

  const laporanProduk = [
    {
      nama: "Kopi Hitam",
      totalSetoran: "Rp 1.850.000",
      totalItem: "185 pcs",
      totalProduk: "Sachet 20g",
      jumlahTransaksi: 6,
      tanggalTerakhir: "18 Mei 2026, 14.48",
    },
    {
      nama: "Kopi Tubruk",
      totalSetoran: "Rp 1.575.000",
      totalItem: "157 pcs",
      totalProduk: "Sachet 25g",
      jumlahTransaksi: 5,
      tanggalTerakhir: "18 Mei 2026, 11.05",
    },
    {
      nama: "Kopi Susu",
      totalSetoran: "Rp 1.320.000",
      totalItem: "132 pcs",
      totalProduk: "Sachet 30g",
      jumlahTransaksi: 4,
      tanggalTerakhir: "17 Mei 2026, 16.32",
    },
    {
      nama: "Kopi Robusta Premium",
      totalSetoran: "Rp 1.100.000",
      totalItem: "110 pcs",
      totalProduk: "Sachet 25g",
      jumlahTransaksi: 3,
      tanggalTerakhir: "17 Mei 2026, 09.15",
    },
  ];

  const getDataLaporan = () => {
    if (tab === "Per Canvasser") return laporanCanvasser;
    if (tab === "Per Produk") return laporanProduk;
    return laporanMitra;
  };

  const getNamaKolom = () => {
    if (tab === "Per Canvasser") return "Canvasser";
    if (tab === "Per Produk") return "Produk";
    return "Mitra";
  };

  const getKolomProduk = () => {
    if (tab === "Per Produk") return "Varian";
    return "Total Produk";
  };

  const dataLaporan = getDataLaporan();

  const filteredData = dataLaporan.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

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
            <h4 className="fw-bold text-white mb-0">Laporan</h4>
          </div>
        </div>

        <Container fluid className="content p-4">
          {/* TITLE */}
          <div className="mb-4">
            <h5 className="fw-bold mb-1">Laporan Penjualan</h5>
            <p className="text-muted mb-0">
              Semua penjualan yang sudah disetor.
            </p>
          </div>

          {/* TABS + SEARCH */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="laporan-tabs">
              {["Per Mitra", "Per Canvasser", "Per Produk"].map((item) => (
                <button
                  key={item}
                  className={tab === item ? "active" : ""}
                  onClick={() => {
                    setTab(item);
                    setSearch("");
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="search-box">
              <Search className="search-icon" />

              <Form.Control
                type="text"
                placeholder={`Cari ${getNamaKolom().toLowerCase()}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* TABLE */}
          <Card className="custom-card">
            <Card.Body className="p-0">
              <Table
                  responsive
                  hover
                  className="table produk-modern-table table-compact mb-0"
                >
                <thead>
                  <tr>
                    <th>No</th>
                    <th>{getNamaKolom()}</th>
                    <th>Total Setoran</th>
                    <th>Total Item</th>
                    <th>{getKolomProduk()}</th>
                    <th>Jumlah Transaksi</th>
                    <th>Tanggal Terakhir Setor</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center text-muted py-4"
                      >
                        Data laporan tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>

                        <td className="fw-bold">
                          {item.nama}
                        </td>

                        <td>{item.totalSetoran}</td>

                        <td>{item.totalItem}</td>

                        <td>{item.totalProduk}</td>

                        <td>{item.jumlahTransaksi}</td>

                        <td>{item.tanggalTerakhir}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>

              <div className="produk-table-footer">
                <span>
                  Menampilkan 1 - {filteredData.length} dari{" "}
                  {filteredData.length} data
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

export default Laporan;