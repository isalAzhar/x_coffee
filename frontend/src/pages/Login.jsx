import { useState, useEffect } from "react";
import coffee from "../assets/coffe.png";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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
    <div className="container-fluid">
      <div className="row vh-100">

        {/* KIRI */}
        <div className="col-md-7 d-none d-md-block p-0 position-relative">
          <img 
            src={coffee} 
            alt="kopi"
            className="w-100 h-100 object-fit-cover"
          />

          <div 
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          ></div>

          <div className="position-absolute bottom-0 start-0 p-5 text-white">
            <h1 className="fw-bold">
              X COFFE.<br/>
              MANAGE.<br/>
              <span className="text-warning">SCALE.</span>
            </h1>

            <p className="mt-3">
              Sistem manajemen operasional kopi untuk efisiensi tinggi.
            </p>
          </div>
        </div>

        {/* KANAN */}
        <div className="col-md-5 d-flex align-items-center justify-content-center">

          <div style={{ maxWidth: "400px", width: "100%" }}>

            <h6 className="text-muted">X COFFEE</h6>
            <h3 className="fw-bold mb-3">Masuk ke Dashboard</h3>

            <form onSubmit={handleSubmit}>

              {/* NO HP */}
              <div className="mb-3">
                <label className="form-label">No WhatsApp</label>
                <input
                  type="text"
                  className={`form-control border-secondary ${error && !agree ? "" : error ? "is-invalid" : ""}`}
                  placeholder="Masukkan No WhatsApp Anda"
                  value={form.no_hp}
                  onChange={(e) => {
                    setForm({ ...form, no_hp: e.target.value });
                    setError("");
                  }}
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control border-secondary ${error && !agree ? "" : error ? "is-invalid" : ""}`}
                  placeholder="Masukkan password"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setError("");
                  }}
                />
              </div>

              {/* CHECKBOX */}
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className={`form-check-input ${error && !agree ? "is-invalid" : ""}`}
                  id="terms"
                  checked={agree}
                  onChange={(e) => {
                    setAgree(e.target.checked);
                    setError("");
                  }}
                />
                <label 
                  className="form-check-label text-secondary" 
                  htmlFor="terms"
                  style={{ fontSize: "0.9rem" }}
                >
                  Saya menyetujui Syarat dan Ketentuan X Coffe
                </label>
              </div>

              {/* BUTTON */}
              <button 
                className="btn btn-warning w-100"
                disabled={!form.no_hp || !form.password}
              >
                LOGIN
              </button>

              {/* ERROR */}
              {error && (
                <small className="text-danger d-block mt-2">
                  {error}
                </small>
              )}

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;