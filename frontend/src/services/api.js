import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// 1. Request Interceptor: Otomatis kirim token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 2. Response Interceptor: Tangani error (Token Expired / Server Mati)
api.interceptors.response.use(
    (response) => response, // Jika sukses, kembalikan response seperti biasa
    (error) => {
        // Jika server memberikan status 401 (Unauthorized) 
        // atau error tidak memiliki response (artinya Backend mati/down)
        if (error.response?.status === 401 || !error.response) {
            console.error("Sesi tidak valid atau server mati. Melakukan logout otomatis...");
            
            // Hapus semua data sisa login di browser
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user");

            // Paksa user kembali ke halaman login agar tidak terjebak di dashboard
            if (window.location.pathname !== "/") {
                window.location.href = "/";
            }
        }
        return Promise.reject(error);
    }
);

export default api;