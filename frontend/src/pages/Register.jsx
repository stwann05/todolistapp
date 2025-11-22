import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!email || !username || !password) {
      return alert("Semua field wajib diisi!");
    }

    try {
      const res = await fetch("http://192.168.1.2:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message || "Registrasi gagal");

      alert(data.message);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan. Cek console untuk detail.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
      <div className="w-full max-w-sm p-8 rounded-2xl shadow-xl backdrop-blur-xl bg-white/20 dark:bg-gray-900/40 border border-white/30 dark:border-gray-700 animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-white dark:text-gray-100">
          Create Account 🌙
        </h1>

        {/* Email */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-200 dark:text-gray-300">
            Email
          </label>
          <input
            className="mt-1 w-full p-3 rounded-lg bg-white/90 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 outline-none transition"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Username */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-200 dark:text-gray-300">
            Username
          </label>
          <input
            className="mt-1 w-full p-3 rounded-lg bg-white/90 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 outline-none transition"
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="text-sm font-medium text-gray-200 dark:text-gray-300">
            Password
          </label>
          <input
            className="mt-1 w-full p-3 rounded-lg bg-white/90 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 outline-none transition pr-10"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30 transition active:scale-95"
        >
          Register
        </button>

        <p className="mt-4 text-center text-gray-200 dark:text-gray-300">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
