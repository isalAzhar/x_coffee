import { useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import FormEditMitra from "../components/FormEditMitra";

import {
  List,
  Search,
  PencilSquare,
  Trash,
  People,
  Shop,
  FileEarmarkText,
} from "react-bootstrap-icons";

import {
  Container,
  Card,
  Table,
  Button,
  Form,
} from "react-bootstrap";

function Mitra() {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formEdit, setFormEdit] = useState({
    nama: "",
    pemilik: "",
    nohp: "",
    alamat: "",
    status: "Aktif",
  });

  const [mitraList, setMitraList] = useState([
    {
      nama: "Warung Bu Sari",
      pemilik: "Sari Wulandari",
      nohp: "081234567890",
      alamat: "Jl. Melati No. 12, Yogyakarta",
      status: "Aktif",
    },
    {
      nama: "Warkop Cak Ali",
      pemilik: "Ali Hidayat",
      nohp: "081298765432",
      alamat: "Jl. Kaliurang Km 5, Sleman",
      status: "Aktif",
    },
    {
      nama: "Kedai Mbak Dewi",
      pemilik: "Dewi Lestari",
      nohp: "082112233445",
      alamat: "Jl. Gejayan No. 45, Yogyakarta",
      status: "Aktif",
    },
    {
      nama: "Kantin Pak Joko",
      pemilik: "Joko Santoso",
      nohp: "081355566677",
      alamat: "Jl. Seturan No. 88, Sleman",
      status: "Aktif",
    },
    {
      nama: "Cafe Santai",
      pemilik: "Budi Raharjo",
      nohp: "082177788899",
      alamat: "Jl. Palagan Tentara Pelajar No. 21, Sleman",
      status: "Nonaktif",
    },
  ]);

  const totalMitra = mitraList.length;
  const mitraAktif = mitraList.filter((item) => item.status === "Aktif").length;
  const mitraNonaktif = mitraList.filter(
    (item) => item.status === "Nonaktif"
  ).length;

  const filteredMitra = mitraList.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.pemilik.toLowerCase().includes(search.toLowerCase()) ||
      item.nohp.toLowerCase().includes(search.toLowerCase()) ||
      item.alamat.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenEdit = (index) => {
    setEditIndex(index);
    setFormEdit(filteredMitra[index]);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setEditIndex(null);
    setFormEdit({
      nama: "",
      pemilik: "",
      nohp: "",
      alamat: "",
      status: "Aktif",
    });
  };

  const handleSaveEdit = () => {
    if (
      formEdit.nama === "" ||
      formEdit.pemilik === "" ||
      formEdit.nohp === "" ||
      formEdit.alamat === "" ||
      formEdit.status === ""
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    const indexAsli = mitraList.findIndex(
      (item) =>
        item.nama === filteredMitra[editIndex].nama &&
        item.nohp === filteredMitra[editIndex].nohp
    );

    const newData = [...mitraList];
    newData[indexAsli] = formEdit;

    setMitraList(newData);
    handleCloseEdit();
  };

  const handleDelete = (index) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus mitra ini?");

    if (konfirmasi) {
      const itemDipilih = filteredMitra[index];

      setMitraList(
        mitraList.filter(
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
        <div className="header d-flex align-items-center gap-3 py-3">
          <List className="toggle-btn" onClick={() => setIsOpen(!isOpen)} />

          <div>
            <small className="text-light">ADMIN OUTLET</small>
            <h4 className="fw-bold text-white mb-0">Mitra</h4>
          </div>
        </div>

        <Container fluid className="content p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="fw-bold mb-1">Daftar Mitra</h5>
              <p className="text-muted mb-0">
                Kelola data mitra yang bekerja sama dengan outlet.
              </p>
            </div>

            <div className="search-box">
              <Search className="search-icon" />

              <Form.Control
                type="text"
                placeholder="Cari mitra..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="mitra-stat-wrapper mb-4">
            <Card className="mitra-stat-card">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="mitra-stat-icon">
                  <People />
                </div>

                <div>
                  <p className="mb-1 fw-semibold">Total Mitra</p>
                  <h4 className="fw-bold mb-0">
                    {totalMitra}
                    <small className="ms-2 text-muted">mitra</small>
                  </h4>
                </div>
              </Card.Body>
            </Card>

            <Card className="mitra-stat-card">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="mitra-stat-icon">
                  <Shop />
                </div>

                <div>
                  <p className="mb-1 fw-semibold">Mitra Aktif</p>
                  <h4 className="fw-bold mb-0">
                    {mitraAktif}
                    <small className="ms-2 text-muted">mitra</small>
                  </h4>
                </div>
              </Card.Body>
            </Card>

            <Card className="mitra-stat-card">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="mitra-stat-icon">
                  <FileEarmarkText />
                </div>

                <div>
                  <p className="mb-1 fw-semibold">Mitra Nonaktif</p>
                  <h4 className="fw-bold mb-0">
                    {mitraNonaktif}
                    <small className="ms-2 text-muted">mitra</small>
                  </h4>
                </div>
              </Card.Body>
            </Card>
          </div>

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
                    <th>Nama Mitra</th>
                    <th>Pemilik</th>
                    <th>No WhatsApp</th>
                    <th>Alamat</th>
                    <th>Status</th>
                    <th className="text-center">
                      Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMitra.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-4">
                        Data mitra tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredMitra.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>

                        <td className="fw-semibold">{item.nama}</td>

                        <td>{item.pemilik}</td>

                        <td>{item.nohp}</td>

                        <td>{item.alamat}</td>

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
                  Menampilkan 1 - {filteredMitra.length} dari {totalMitra} data
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
                    5
                  </Button>

                  <Button size="sm" variant="outline-secondary">
                    ›
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>

        <FormEditMitra
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
export default Mitra;