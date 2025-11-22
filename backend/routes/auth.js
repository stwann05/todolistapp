import express from "express";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const usersFile = "./data/users.json";
const JWT_SECRET = "RAHASIA_SUPER_AMAN"; // pindah ke .env nanti

// Read users
const getUsers = () => {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile));
};

// Save users
const saveUsers = (data) => {
  fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));
};

// REGISTER
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  const users = getUsers();

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Email sudah terdaftar" });
  }

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Username sudah dipakai" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    email,
    username,
    password: hashedPassword,
  };

  users.push(newUser);
  saveUsers(users);

  res.json({ message: "Register berhasil" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "Email atau password salah" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Email atau password salah" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login berhasil",
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username
    }
  });
});

// ME
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Token diperlukan" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid" });
  }
});

export default router;
