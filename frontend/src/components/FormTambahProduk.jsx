import { Modal, Form, Button } from "react-bootstrap";

export default function FormTambahProduk({
  show,
  onClose,
  formProduk,
  setFormProduk,
  onSave,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormProduk({
      ...formProduk,
      [name]: value,
    });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormProduk({
        ...formProduk,
        foto: URL.createObjectURL(file),
      });
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Produk</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Foto Produk</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
            />
          </Form.Group>

          {formProduk.foto && (
            <div className="mb-3">
              <img
                src={formProduk.foto}
                alt="Preview Produk"
                className="preview-produk"
              />
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Nama Produk</Form.Label>
            <Form.Control
              type="text"
              name="nama"
              placeholder="Contoh: Kopi Tubruk"
              value={formProduk.nama}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Varian</Form.Label>
            <Form.Control
              type="text"
              name="varian"
              placeholder="Contoh: Sachet 25g"
              value={formProduk.varian}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Harga</Form.Label>
            <Form.Control
              type="text"
              name="harga"
              placeholder="Contoh: Rp 3.500"
              value={formProduk.harga}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Stok</Form.Label>
            <Form.Control
              type="number"
              name="stok"
              placeholder="Contoh: 500"
              value={formProduk.stok}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Batal
        </Button>

        <Button variant="danger" onClick={onSave}>
          Tambah Produk
        </Button>
      </Modal.Footer>
    </Modal>
  );
}