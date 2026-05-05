import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function FormTambahCanvasser({ show, onClose }) {
  const [form, setForm] = useState({
    nama: "",
    nohp: "",
    alamat: "",
    area: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Canvasser</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Control
              placeholder="Nama"
              name="nama"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              placeholder="No HP"
              name="nohp"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              as="textarea"
              placeholder="Alamat"
              name="alamat"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              placeholder="Area"
              name="area"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Batal
        </Button>

        <Button variant="danger">Simpan</Button>
      </Modal.Footer>
    </Modal>
  );
}