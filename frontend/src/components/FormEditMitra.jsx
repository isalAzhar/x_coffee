import { Modal, Form, Button, Row, Col } from "react-bootstrap";

export default function FormEditMitra({
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
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Data Mitra</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Mitra</Form.Label>
                <Form.Control
                  type="text"
                  name="nama"
                  value={formEdit.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama mitra"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Pemilik</Form.Label>
                <Form.Control
                  type="text"
                  name="pemilik"
                  value={formEdit.pemilik}
                  onChange={handleChange}
                  placeholder="Masukkan nama pemilik"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>No WhatsApp</Form.Label>
                <Form.Control
                  type="text"
                  name="nohp"
                  value={formEdit.nohp}
                  onChange={handleChange}
                  placeholder="Masukkan nomor whatsapp"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status Mitra</Form.Label>
                <Form.Select
                  name="status"
                  value={formEdit.status}
                  onChange={handleChange}
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="alamat"
              value={formEdit.alamat}
              onChange={handleChange}
              placeholder="Masukkan alamat mitra"
            />
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