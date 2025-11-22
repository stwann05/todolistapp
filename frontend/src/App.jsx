import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, AuthProvider } from "./context/AuthContext";

export default function App() {
  const [dark, setDark] = useState(false);

  // Aktifkan class dark di <html>
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">

        <Routes>
          {/* Halaman Home → protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home dark={dark} setDark={setDark} />
              </ProtectedRoute>
            }
          />

          {/* Halaman publik */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </div>
    </AuthProvider>
  );
}
