import { Trash2 } from "lucide-react";

export default function TaskItem({ task, onToggle, onDelete, disabled }) {
  if (!task) return null;

  return (
    <div
      className={`
        flex items-center justify-between gap-4 p-3 rounded-xl border
        bg-blue-500 border-blue-600
        dark:bg-gray-800 dark:border-gray-700
        transition-all duration-200
        hover:bg-blue-600 dark:hover:bg-gray-700
      `}
    >
      <div className="flex flex-col flex-1">
        <label className="flex items-center gap-3">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={task.completed ?? false}
            onChange={onToggle}
            disabled={disabled}
            className="w-5 h-5 accent-blue-200 dark:accent-blue-400"
          />

          {/* Task Text */}
          <span
            className={
              task.completed
                ? "line-through text-gray-200 dark:text-gray-500"
                : "text-white dark:text-gray-100"
            }
          >
            {task.text}
          </span>
        </label>

        {/* Time row */}
        {(task.startTime || task.endTime) && (
          <span className="text-xs text-white/80 dark:text-gray-400 ml-8 mt-1">
            ⏰ {task.startTime || "?"} - {task.endTime || "?"}
          </span>
        )}
      </div>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        disabled={disabled}
        className="
          text-red-200 hover:text-red-300
          dark:text-red-400 dark:hover:text-red-300
          transition
        "
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
