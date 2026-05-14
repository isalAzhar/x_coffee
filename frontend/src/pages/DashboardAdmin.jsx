import { useState, useEffect } from "react";
import api from "../services/api";
import SidebarAdmin from "../components/SidebarAdmin";
import FormTambahCanvasser from "../components/FormTambahCanvasser";
import FormEditCanvasser from "../components/FormEditCanvasser";

import {
  List,
  Search,
  PencilSquare,
  Trash,
  People,
  CheckCircle,
  XCircle,
  FileEarmarkText,
} from "react-bootstrap-icons";

import {
  Container,
  Card,
  Table,
  Button,
  Form,
} from "react-bootstrap";

  function DashboardAdmin() {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

  const [showTambahModal, setShowTambahModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formEdit, setFormEdit] = useState({
    nama: "",
    nohp: "",
    password: "",
    status: "Aktif",
  });

  const [canvasserList, setCanvasserList] = useState([
    {
      nama: "Andi Pratama",
      nohp: "081234567890",
      password: "andi123",
      status: "Aktif",
    },
    {
      nama: "Rina Sari",
      nohp: "081298765432",
      password: "rina123",
      status: "Aktif",
    },
    {
      nama: "Dedi Saputra",
      nohp: "082112223333",
      password: "dedi123",
      status: "Nonaktif",
    },
    {
      nama: "Salsa Putri",
      nohp: "081355566677",
      password: "salsa123",
      status: "Aktif",
    },
  ]);

  const totalCanvasser = canvasserList.length;

  const canvasserAktif = canvasserList.filter(
    (item) => item.status === "Aktif"
  ).length;

  const canvasserNonaktif = canvasserList.filter(
    (item) => item.status === "Nonaktif"
  ).length;

  const filteredCanvasser = canvasserList.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nohp.toLowerCase().includes(search.toLowerCase()) ||
      item.password.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleTambah = (data) => {
    setCanvasserList((prev) => [
      ...prev,
      {
        ...data,
        status: "Aktif",
      },
    ]);
  };

  const handleOpenEdit = (index) => {
    const itemDipilih = filteredCanvasser[index];

    const indexAsli = canvasserList.findIndex(
      (item) =>
        item.nama === itemDipilih.nama &&
        item.nohp === itemDipilih.nohp
    );

    setEditIndex(indexAsli);
    setFormEdit(canvasserList[indexAsli]);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setEditIndex(null);
    setFormEdit({
      nama: "",
      nohp: "",
      password: "",
      status: "Aktif",
    });
  };

  const handleSaveEdit = () => {
    if (
      formEdit.nama === "" ||
      formEdit.nohp === "" ||
      formEdit.password === "" ||
      formEdit.status === ""
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    const newData = [...canvasserList];
    newData[editIndex] = formEdit;

    setCanvasserList(newData);
    handleCloseEdit();
  };

  const handleDelete = (index) => {
    const konfirmasi = window.confirm(
      "Yakin ingin menghapus canvasser ini?"
    );

    if (konfirmasi) {
      const itemDipilih = filteredCanvasser[index];

      setCanvasserList(
        canvasserList.filter(
          (item) =>
            !(
              item.nama === itemDipilih.nama &&
              item.nohp === itemDipilih.nohp
            )
        )
      );
    }
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
            <small className="text-light">
              ADMIN OUTLET
            </small>

            <h4 className="fw-bold text-white mb-0">
              Dashboard
            </h4>
          </div>
        </div>

        <Container fluid className="content p-4">
          {/* TITLE */}
          <div className="mb-4">
            <h5 className="fw-bold mb-1">
              Selamat datang, Admin Outlet! 👋
            </h5>

            <p className="text-muted mb-0">
              Berikut ringkasan operasional distribusi dan kinerja penjualan hari ini.
            </p>
          </div>

          {/* STAT CARD */}
          <div className="dashboard-stat-wrapper mb-4">
            <Card className="dashboard-stat-card">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="dashboard-stat-icon stat-red">
                  <People />
                </div>

                <div>
                  <p className="mb-1 fw-semibold">
                    Total Canvasser
                  </p>

                  <h4 className="fw-bold mb-0">
                    {totalCanvasser}
                    <small className="ms-2 text-muted">orang</small>
                  </h4>
                </div>
              </Card.Body>
            </Card>

            <Card className="dashboard-stat-card">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="dashboard-stat-icon stat-green">
                  <CheckCircle />
                </div>

                <div>
                  <p className="mb-1 fw-semibold">
                    Canvasser Aktif
                  </p>

                  <h4 className="fw-bold mb-0">
                    {canvasserAktif}
                    <small className="ms-2 text-muted">orang</small>
                  </h4>
                </div>
              </Card.Body>
            </Card>

            <Card className="dashboard-stat-card">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="dashboard-stat-icon stat-orange">
                  <XCircle />
                </div>

                <div>
                  <p className="mb-1 fw-semibold">
                    Canvasser Nonaktif
                  </p>

                  <h4 className="fw-bold mb-0">
                    {canvasserNonaktif}
                    <small className="ms-2 text-muted">orang</small>
                  </h4>
                </div>
              </Card.Body>
            </Card>

            <Card className="dashboard-stat-card">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="dashboard-stat-icon stat-purple">
                  <FileEarmarkText />
                </div>

                <div>
                  <p className="mb-1 fw-semibold">
                    Distribusi Hari Ini
                  </p>

                  <h4 className="fw-bold mb-0">
                    28
                    <small className="ms-2 text-muted">transaksi</small>
                  </h4>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* TABLE */}
          <Card className="custom-card">
            <Card.Body className="p-0">
              <div className="d-flex justify-content-between align-items-center p-4">
                <div>
                  <h5 className="fw-bold mb-1">
                    Data Canvasser
                  </h5>

                  <p className="text-muted mb-0">
                    Daftar canvasser yang bertugas melakukan distribusi.
                  </p>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <div className="search-box">
                    <Search className="search-icon" />

                    <Form.Control
                      type="text"
                      placeholder="Cari canvasser..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="search-input"
                    />
                  </div>

                    <Button
                    className="btn-danger"
                    onClick={() => setShowTambahModal(true)}
                  >
                    + Tambah Canvasser
                  </Button>
                </div>
              </div>

              <Table
                  responsive
                  hover
                  className="table produk-modern-table table-compact mb-0"
                >
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>No Whatsapp</th>
                    <th>Status</th>
                    <th className="text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCanvasser.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center text-muted py-4"
                      >
                        Data canvasser tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredCanvasser.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">
                          {index + 1}
                        </th>

                        <td className="fw-semibold">
                          {item.nama}
                        </td>

                        <td>{item.nohp}</td>

                        <td>{item.password}</td>

                        <td>
                          <span
                            className={
                              item.status === "Aktif"
                                ? "status-pill status-active"
                                : "status-pill status-inactive"
                            }
                          >
                            {item.status}
                          </span>
                        </td>

                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              type="button"
                              className="table-icon-btn"
                              onClick={() => handleOpenEdit(index)}
                            >
                              <PencilSquare />
                            </button>

                            <button
                              type="button"
                              className="table-icon-btn"
                              onClick={() => handleDelete(index)}
                            >
                              <Trash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>

              <div className="produk-table-footer">
                <span>
                  Menampilkan 1 - {filteredCanvasser.length} dari{" "}
                  {canvasserList.length} data
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

      <FormTambahCanvasser
        show={showTambahModal}
        onClose={() => setShowTambahModal(false)}
        onSave={handleTambah}
      />

      <FormEditCanvasser
        show={showEditModal}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
        formEdit={formEdit}
        setFormEdit={setFormEdit}
      />
            </div>
          </div>
        );
      }
      
export default DashboardAdmin;