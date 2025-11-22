import { useEffect, useState, useCallback, useContext } from "react";
import { Header, AddTask, FloatingButton, TaskItem } from "../components";
import { AuthContext } from "../context/AuthContext";

export default function Home({ dark, setDark }) {
  const { token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const API = "http://localhost:5000/api/tasks";

  const authHeader = {
    Authorization: `Bearer ${token}`,
  };

  // FETCH TASKS
  const fetchTasks = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(API, { headers: authHeader });
      const data = await res.json();
      setTasks(data || []);
    } catch (err) {
      setError("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ADD TASK
  const addTask = async () => {
    if (!text.trim()) return;

    setActionLoading(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify({
          text,
          startTime,
          endTime
        }),
      });

      if (!res.ok) throw new Error("Gagal menambahkan task");

      const data = await res.json();
      setTasks((prev) => [...prev, data]);

      setText("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      setError(err.message);
    }
    setActionLoading(false);
  };

  // TOGGLE TASK (FIXED)
  const toggleTask = async (id) => {
    setActionLoading(true);
    try {
      const task = tasks.find((t) => t.id === id);

      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      if (!res.ok) throw new Error("Gagal mengupdate task");

      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
    setActionLoading(false);
  };

  // DELETE TASK (FIXED)
  const deleteTask = async (id) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
      });

      if (!res.ok) throw new Error("Gagal menghapus task");

      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
    setActionLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <Header dark={dark} setDark={setDark} />

      <AddTask
        input={text}
        setInput={setText}
        addTask={addTask}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />

      {error && (
        <div className="bg-red-600/20 border border-red-500 text-red-300 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-700/40 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Belum ada task.</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
              disabled={actionLoading}
            />
          ))}
        </div>
      )}

      <FloatingButton
        onClick={() => document.getElementById("taskInput").focus()}
      />
    </div>
  );
}
