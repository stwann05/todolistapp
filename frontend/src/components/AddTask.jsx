export default function AddTask({
  input,
  setInput,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  addTask,
}) {
  // 24 JAM
  const hours = Array.from({ length: 24 }, (_, i) =>
    `${i.toString().padStart(2, "0")}:00`
  );

  return (
    <div
      className="
        flex flex-wrap gap-3 mb-6 mt-6 px-2
      "
    >
      {/* Input Task */}
      <input
        id="taskInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task..."
        className="
          px-4 py-3 rounded-lg flex-1 min-w-[180px]
          border bg-white text-black
          dark:bg-gray-800 dark:text-white
          focus:ring-2 focus:ring-blue-500
          transition
        "
      />

      {/* Dropdown Start Time */}
      <select
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="
          px-3 py-3 rounded-lg border
          bg-white text-black
          dark:bg-gray-800 dark:text-white
          min-w-[110px]
        "
      >
        <option value="">Mulai</option>
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      {/* Dropdown End Time */}
      <select
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="
          px-3 py-3 rounded-lg border
          bg-white text-black
          dark:bg-gray-800 dark:text-white
          min-w-[110px]
        "
      >
        <option value="">Selesai</option>
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      {/* Tombol Add */}
      <button
        onClick={addTask}
        className="
          px-5 py-3 rounded-lg
          bg-blue-600 hover:bg-blue-700 text-white
          dark:bg-black dark:hover:bg-gray-900
          transition min-w-[90px]
        "
      >
        Add
      </button>
    </div>
  );
}
