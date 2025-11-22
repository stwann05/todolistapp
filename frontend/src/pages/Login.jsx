import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react"; // gunakan lucide-react untuk ikon

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // state untuk intip password
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const res = await fetch("http://192.168.1.2:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return alert(data.message);

    login(data.token, data.user);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
      <div className="w-full max-w-sm p-8 rounded-2xl shadow-xl backdrop-blur-xl bg-white/20 dark:bg-gray-900/40 border border-white/30 dark:border-gray-700 animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-white">
          Welcome Back 👋
        </h1>

        {/* Email */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-200">Email</label>
          <input
            className="mt-1 w-full p-3 rounded-lg bg-white/90 dark:bg-gray-800/70 border"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password dengan mode intip */}
        <div className="mb-6 relative">
          <label className="text-sm font-medium text-gray-200">Password</label>
          <input
            className="mt-1 w-full p-3 rounded-lg bg-white/90 dark:bg-gray-800/70 border pr-10"
            type={showPassword ? "text" : "password"} // toggle tipe
            placeholder="Enter your password"
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

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="mt-4 text-center text-gray-200">
          Belum punya akun?{" "}
          <Link to="/register" className="text-white font-semibold underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
