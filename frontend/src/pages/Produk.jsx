import { useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import FormTambahProduk from "../components/FormTambahProduk";
import FormEditProduk from "../components/FormEditProduk";

import {
  List,
  Search,
  PencilSquare,
  Trash,
} from "react-bootstrap-icons";

import {
  Container,
  Card,
  Table,
  Button,
  Form,
} from "react-bootstrap";

function Produk() {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

  const [showTambah, setShowTambah] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formProduk, setFormProduk] = useState({
    nama: "",
    varian: "",
    harga: "",
    stok: "",
    foto: "",
  });

  const [produkList, setProdukList] = useState([
    {
      nama: "Kopi Tubruk",
      varian: "Sachet 25g",
      harga: "Rp 3.500",
      stok: 500,
      foto: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=500",
    },
    {
      nama: "Kopi Susu",
      varian: "Sachet 30g",
      harga: "Rp 4.000",
      stok: 420,
      foto: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500",
    },
    {
      nama: "Kopi Hitam",
      varian: "Sachet 20g",
      harga: "Rp 3.000",
      stok: 380,
      foto: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500",
    },
  ]);

  const resetForm = () => {
    setFormProduk({
      nama: "",
      varian: "",
      harga: "",
      stok: "",
      foto: "",
    });
    setEditIndex(null);
  };

  const handleOpenTambah = () => {
    resetForm();
    setShowTambah(true);
  };

  const handleCloseTambah = () => {
    setShowTambah(false);
    resetForm();
  };

  const handleOpenEdit = (index) => {
    setFormProduk(produkList[index]);
    setEditIndex(index);
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    resetForm();
  };

  const validasiForm = () => {
    if (
      formProduk.nama === "" ||
      formProduk.varian === "" ||
      formProduk.harga === "" ||
      formProduk.stok === ""
    ) {
      alert("Semua field wajib diisi!");
      return false;
    }

    return true;
  };

  const handleTambahProduk = () => {
    if (!validasiForm()) return;

    setProdukList([
      ...produkList,
      {
        ...formProduk,
        stok: Number(formProduk.stok),
      },
    ]);

    handleCloseTambah();
  };

  const handleEditProduk = () => {
    if (!validasiForm()) return;

    const newData = [...produkList];

    newData[editIndex] = {
      ...formProduk,
      stok: Number(formProduk.stok),
    };

    setProdukList(newData);
    handleCloseEdit();
  };

  const handleDelete = (index) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus produk ini?");

    if (konfirmasi) {
      setProdukList(produkList.filter((_, i) => i !== index));
    }
  };

  const filteredProduk = produkList.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

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
            <h4 className="fw-bold text-white mb-0">Produk</h4>
          </div>
        </div>

        <Container fluid className="content p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="fw-bold mb-1">Daftar Produk Kopi</h5>
              <p className="text-muted mb-0">
                Kelola katalog produk yang didistribusikan ke mitra.
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <div className="search-box">
                <Search className="search-icon" />

                <Form.Control
                  type="text"
                  placeholder="Cari produk..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
              </div>

              <Button className="btn-danger" onClick={handleOpenTambah}>
                + Tambah Produk
              </Button>
            </div>
          </div>

          <Card className="custom-card produk-card">
            <Card.Body className="p-0">
              <Table
                responsive
                hover
                className="table produk-modern-table table-compact mb-0"
              >
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Produk</th>
                    <th>Varian</th>
                    <th>Harga</th>
                    <th>Stok Outlet</th>
                    <th className="text-center">
                      Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProduk.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        Produk tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredProduk.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>

                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div className="produk-img">
                              {item.foto ? (
                                <img
                                  src={item.foto}
                                  alt={item.nama}
                                  className="produk-foto"
                                />
                              ) : (
                                item.nama.charAt(0)
                              )}
                            </div>

                            <span className="fw-bold">{item.nama}</span>
                          </div>
                        </td>

                        <td>{item.varian}</td>

                        <td className="fw-bold text-danger">
                          {item.harga}
                        </td>

                        <td>{item.stok} pcs</td>

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
                  Menampilkan 1 - {filteredProduk.length} dari{" "}
                  {produkList.length} data
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

        <FormTambahProduk
          show={showTambah}
          onClose={handleCloseTambah}
          formProduk={formProduk}
          setFormProduk={setFormProduk}
          onSave={handleTambahProduk}
        />

        <FormEditProduk
          show={showEdit}
          onClose={handleCloseEdit}
          formProduk={formProduk}
          setFormProduk={setFormProduk}
          onSave={handleEditProduk}
        />
      </div>
    </div>
  );
}

export default Produk;