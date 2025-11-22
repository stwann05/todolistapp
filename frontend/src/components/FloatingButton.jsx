import { Plus } from "lucide-react";

export default function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6 z-50
        p-4 rounded-2xl shadow-lg

        bg-blue-600 hover:bg-blue-700 text-white        /* Light mode */
        dark:bg-black dark:hover:bg-gray-900            /* Dark mode */

        transition-all duration-200
      "
    >
      <Plus size={20} />
    </button>
  );
}
