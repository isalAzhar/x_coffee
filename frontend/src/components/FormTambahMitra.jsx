import { Modal, Button, Form } from "react-bootstrap";

export default function FormTambahMitra({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      
      <Modal.Header closeButton>
        <Modal.Title>Tambah Mitra</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Nama Warung</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nama warung"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nama Pemilik</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nama pemilik"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nomor WhatsApp</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nomor WhatsApp anda"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan alamat"
            />
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Batal
        </Button>
        <Button variant="primary">
          Simpan
        </Button>
      </Modal.Footer>

    </Modal>
  );
}