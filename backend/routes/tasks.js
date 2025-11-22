import express from "express";
import fs from "fs";
import jwt from "jsonwebtoken";

const router = express.Router();
const tasksFile = "./data/tasks.json";
const JWT_SECRET = "RAHASIA_SUPER_AMAN";

// Middleware auth
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token diperlukan" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid" });
  }
};

// Read tasks
const getAllTasks = () => {
  if (!fs.existsSync(tasksFile)) return [];
  return JSON.parse(fs.readFileSync(tasksFile));
};

// Save tasks
const saveAllTasks = (data) => {
  fs.writeFileSync(tasksFile, JSON.stringify(data, null, 2));
};

// GET all tasks user
router.get("/", authMiddleware, (req, res) => {
  const allTasks = getAllTasks();
  const userTasks = allTasks.find(u => u.userId === req.user.id)?.tasks || [];
  res.json(userTasks);
});

// POST new task (now supports time)
router.post("/", authMiddleware, (req, res) => {
  const { text, startTime, endTime } = req.body;
  if (!text) return res.status(400).json({ message: "Text task wajib diisi" });

  const allTasks = getAllTasks();
  let userTasksObj = allTasks.find(u => u.userId === req.user.id);

  if (!userTasksObj) {
    userTasksObj = { userId: req.user.id, tasks: [] };
    allTasks.push(userTasksObj);
  }

  const newTask = { 
    id: Date.now(),
    text,
    startTime: startTime || null,
    endTime: endTime || null,
    completed: false
  };

  userTasksObj.tasks.push(newTask);
  saveAllTasks(allTasks);

  res.json(newTask);
});

// PUT update task (supports time)
router.put("/:id", authMiddleware, (req, res) => {
  const taskId = Number(req.params.id);
  const { startTime, endTime } = req.body;

  const allTasks = getAllTasks();
  const userTasksObj = allTasks.find(u => u.userId === req.user.id);
  if (!userTasksObj) return res.status(404).json({ message: "Tasks user tidak ditemukan" });

  const task = userTasksObj.tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ message: "Task tidak ditemukan" });

  // toggle or update fields
  if (req.body.completed !== undefined) task.completed = req.body.completed;
  if (startTime !== undefined) task.startTime = startTime;
  if (endTime !== undefined) task.endTime = endTime;

  saveAllTasks(allTasks);

  res.json(task);
});

// DELETE task
router.delete("/:id", authMiddleware, (req, res) => {
  const taskId = Number(req.params.id);
  const allTasks = getAllTasks();

  const userTasksObj = allTasks.find(u => u.userId === req.user.id);
  if (!userTasksObj) return res.status(404).json({ message: "Tasks user tidak ditemukan" });

  const index = userTasksObj.tasks.findIndex(t => t.id === taskId);
  if (index === -1) return res.status(404).json({ message: "Task tidak ditemukan" });

  userTasksObj.tasks.splice(index, 1);
  saveAllTasks(allTasks);

  res.json({ message: "Task berhasil dihapus" });
});

export default router;
