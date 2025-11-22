import { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Cek token + data user saat pertama load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    const savedUsername = localStorage.getItem("username");

    if (savedToken && savedEmail && savedUsername) {
      setToken(savedToken);
      setUser({
        email: savedEmail,
        username: savedUsername,
      });
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      setToken(null);
      setUser(null);
    }

    setLoadingAuth(false);
  }, []);

  // LOGIN
  const login = (token, userData) => {
    setToken(token);
    setUser({
      email: userData.email,
      username: userData.username,
    });

    localStorage.setItem("token", token);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("username", userData.username);
  };

  // LOGOUT
  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

// Protected Route
export function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useContext(AuthContext);

  if (loadingAuth)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
