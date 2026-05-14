import { Modal, Form, Button } from "react-bootstrap";

export default function FormEditCanvasser({
  show,
  onClose,
  onSave,
  formEdit,
  setFormEdit,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormEdit({
      ...formEdit,
      [name]: value,
    });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Canvasser</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nama Canvasser</Form.Label>
            <Form.Control
              type="text"
              name="nama"
              value={formEdit.nama}
              onChange={handleChange}
              placeholder="Masukkan nama canvasser"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>No Whatsapp</Form.Label>
            <Form.Control
              type="text"
              name="nohp"
              value={formEdit.nohp}
              onChange={handleChange}
              placeholder="Masukkan nomor whatsapp"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              value={formEdit.password}
              onChange={handleChange}
              placeholder="Masukkan password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formEdit.status}
              onChange={handleChange}
            >
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Batal
        </Button>

        <Button variant="danger" onClick={onSave}>
          Simpan Perubahan
        </Button>
      </Modal.Footer>
    </Modal>
  );
}