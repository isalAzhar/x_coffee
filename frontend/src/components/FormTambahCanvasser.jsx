import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import api from "../services/api";

export default function FormTambahCanvasser({ show, onClose, onSave }) {

  const [form, setForm] = useState({
    nama: "",
    nohp: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {

  try {

    // KIRIM KE BACKEND
    const res = await api.post("/canvassers", {
      name: form.nama,
      phone: form.nohp,
      password: form.password,
    });

    // KIRIM HASIL API KE DASHBOARD
    onSave(res.data.data);

    // TUTUP MODAL
    onClose();

    // RESET FORM
    setForm({
      nama: "",
      nohp: "",
      password: "",
    });

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message ||
      "Gagal menambahkan canvasser"
    );
  }
};

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Canvasser</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <h6>Nama Canvasser</h6>
            <Form.Control
              placeholder="Masukan Nama Canvasser"
              name="nama"
              value={form.nama}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <h6>No Whatsapp</h6>
            <Form.Control
              placeholder="Masukan No Whatsapp"
              name="nohp"
              value={form.nohp}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <h6>Password</h6>
            <Form.Control
              type="password"
              placeholder="Masukan Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Batal
        </Button>

        <Button variant="danger" onClick={handleSave}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
}