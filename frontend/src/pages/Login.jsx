import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import logo from "../assets/logo.png";

const Login = () => {
  const [form, setForm] = useState({
    no_hp: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔥 VALIDASI AKTIF SAAT COMPONENT DILOAD
  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (token && role) {
        try {
          // Lakukan "ping" ringan ke server untuk cek apakah backend hidup & token valid
          await api.get("/user-profile"); // Sesuaikan endpoint profile Anda
          
          // Jika sukses, baru redirect
          if (role === "admin") navigate("/admin");
          else if (role === "canvassing") navigate("/canvassing");
          else if (role === "mitra") navigate("/mitra");
        } catch (err) {
          // Jika gagal (server mati atau token expired), bersihkan storage
          console.warn("Sesi tidak valid atau server mati, membersihkan data...");
          localStorage.clear();
        }
      }
    };

    validateSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.no_hp || !form.password) {
      setError("Nomor WhatsApp dan password wajib diisi");
      return;
    }

    if (!agree) {
      setError("Anda harus menyetujui syarat dan ketentuan");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/login", {
        phone: form.no_hp,
        password: form.password
      });

      // SIMPAN DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      const userRole = res.data.user.role; 

      // REDIRECT BERDASARKAN ROLE
      if (userRole === "admin") navigate("/admin");
      else if (userRole === "canvassing") navigate("/canvassing");
      else navigate("/");

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      if (!err.response) {
        setError("Server tidak merespons. Pastikan backend sudah dijalankan.");
      } else {
        setError(err.response.data.message || "Login gagal, silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex">
      <div className="left-panel d-flex flex-column justify-content-center align-items-center text-center text-white">
        <img src={logo} alt="logo" className="logo mb-4" />
        <p className="small">EST. 2024</p>
        <h1 className="fw-bold">BREW.<br />MANAGE.<br /><span className="text-scale">SCALE.</span></h1>
        <p className="mt-3 small">Sistem manajemen operasional kopi<br />untuk efisiensi tinggi</p>
      </div>

      <div className="right-panel d-flex justify-content-center align-items-center">
        <div className="login-box">
          <div className="d-flex align-items-center gap-2 mb-3">
            <img src={logo} alt="logo" style={{ width: "40px" }} />
            <small className="text-muted">X COFFEE</small>
          </div>

          <h3 className="fw-bold">Masuk ke Dashboard</h3>
          <p className="text-muted mb-4">Selamat datang kembali! Masukkan akun Anda.</p>

          {error && (
            <div className="alert alert-danger p-2 small" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold">No. WhatsApp</label>
              <input
                type="text"
                className="form-control"
                placeholder="08xxxxxxxxxx"
                value={form.no_hp}
                onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Masukkan password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="form-check mb-3">
              <input 
                type="checkbox" 
                className="form-check-input" 
                id="checkAgree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label className="form-check-label small" htmlFor="checkAgree">
                Saya menyetujui <span className="text-coffee">Syarat dan Ketentuan</span> X Coffee
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-warning w-100 fw-bold" 
              disabled={loading}
            >
              {loading ? "MEMPROSES..." : "MASUK"}
            </button>
          </form>

          <div className="text-center mt-4 small text-muted">
            Butuh bantuan? <span className="text-coffee fw-bold" style={{cursor: 'pointer'}}>Hubungi admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;