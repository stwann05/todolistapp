import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

const app = express();

app.use(cors());
app.use(express.json());

// Route register, login, me
app.use("/api/auth", authRoutes);

// Route tasks
app.use("/api/tasks", taskRoutes);

// Test home
app.get("/", (req, res) => {
  res.send("Backend JSON berjalan!");
});

app.listen(5000, "0.0.0.0", () =>
  console.log("Server running on http://0.0.0.0:5000")
);
