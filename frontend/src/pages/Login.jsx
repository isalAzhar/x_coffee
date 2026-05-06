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
  const navigate = useNavigate();

  // 🔥 AUTO REDIRECT JIKA SUDAH LOGIN
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "admin") navigate("/admin");
      if (role === "canvassing") navigate("/canvassing");
      if (role === "mitra") navigate("/mitra");
    }
  }, []);

  // 🔥 HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      setError("Anda harus menyetujui syarat dan ketentuan");
      return;
    }

    try {
      const res = await api.post("/login", {
        phone: form.no_hp,
        password: form.password
      });

      console.log("LOGIN SUCCESS:", res.data);

      // 🔥 SIMPAN DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      setError("");

      const role = res.data.user.role; 

      // 🔥 REDIRECT SESUAI ROLE
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "canvassing") {
        navigate("/canvassing");
      } 
      // else if (role === "mitra") {
      //   navigate("/mitra/dashboard");
      // }

    } catch (err) {
      console.log("LOGIN ERROR:", err);

      setError(
        err.response?.data?.message || "Login gagal, periksa data Anda"
      );
    }
  };

  return (
    <div className="login-container d-flex">

      {/* ===== LEFT ===== */}
      <div className="left-panel d-flex flex-column justify-content-center align-items-center text-center text-white">
        <img src={logo} alt="logo" className="logo mb-4" />

        <p className="small">EST. 2024</p>

        <h1 className="fw-bold">
          BREW.<br />
          MANAGE.<br />
          <span className="text-scale">SCALE.</span>
        </h1>

        <p className="mt-3 small">
          Sistem manajemen operasional kopi<br />
          untuk efisiensi tinggi
        </p>
      </div>

      {/* ===== RIGHT ===== */}
      <div className="right-panel d-flex justify-content-center align-items-center">

        <div className="login-box">

          <div className="text-center mb-4">
            <h6 className="text-muted">X COFFEE</h6>
            <h3 className="fw-bold">Masuk ke Dashboard</h3>
            <p className="text-muted small">
              Selamat datang kembali! Masukkan akun Anda.
            </p>
          </div>

          {/* FORM */}
          <div className="mb-3">
            <label>No. WhatsApp</label>
            <input
              type="text"
              className="form-control"
              placeholder="08xxxxxxxxxx"
              value={form.no_hp}
              onChange={(e) =>
                setForm({ ...form, no_hp: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Masukkan password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label small">
              Saya menyetujui <span className="text-coffee">Syarat dan Ketentuan</span> X Coffee
            </label>
          </div>

          <button className="btn-warning">
            MASUK
          </button>

          <div className="text-center mt-4 small text-muted">
            Butuh bantuan? <span className="text-coffee">Hubungi admin</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;