import { Modal, Button, Form } from "react-bootstrap";

export default function FormTambahCanvasser({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      
      <Modal.Header closeButton>
        <Modal.Title>Tambah Canvasser</Modal.Title>
      </Modal.Header>

      <Form>
        <Modal.Body>

          <Form.Group className="mb-3">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nama"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>No WhatsApp</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Masukkan nomor WhatsApp anda"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" className="btn-coffee">
            Simpan
          </Button>
        </Modal.Footer>

      </Form>
    </Modal>
  );
}