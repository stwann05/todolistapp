import { useContext } from "react";
import { LogOut, Sun, Moon } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Header({ dark, setDark }) {
  const { user, logout } = useContext(AuthContext);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-3">
      {/* Bar tombol di atas */}
      <div className="flex justify-end items-center gap-2 mb-2 px-3">
        {/* Tombol Dark/Light Mode */}
        <button
          onClick={() => setDark(!dark)}
          className={`
            p-2 rounded-lg shadow-md
            hover:scale-110 transition
            ${dark 
              ? "bg-gray-700 text-gray-200" 
              : "bg-blue-500/80 text-white"}
          `}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Tombol Logout */}
        <button
          onClick={logout}
          className="
            p-2 px-3 rounded-lg
            flex items-center gap-2
            bg-red-600 hover:bg-red-700
            text-white text-sm font-medium
            transition-all duration-200
            hover:scale-105 active:scale-95
            shadow-md
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Header utama */}
      <header
        className={`
          flex items-center justify-between
          p-3 rounded-xl
          backdrop-blur-xl
          border border-white/30 dark:border-gray-700/40
          shadow-md
          ${dark 
            ? "bg-gray-900/80 text-white" 
            : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white"}
        `}
      >
        <div>
          <h1 className="text-xl font-bold">
            Selamat datang{user ? `, ${user.username}` : ""} 👋
          </h1>
          <p className={`text-sm ${dark ? "text-gray-300" : "text-white/90"} mt-1`}>
            {formattedDate}
          </p>
        </div>
      </header>
    </div>
  );
}
