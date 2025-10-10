
import express from "express";
import User from "../models/User.js";

const userRouter = express.Router();

// Registrar nuevo usuario
userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.register(name, email, password);
    res.status(201).json({ message: "Usuario registrado", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    res.json({ message: "Login exitoso", user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Obtener usuarios activos
userRouter.get("/active", async (_req, res) => {
  try {
    const users = await User.findActiveUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Desactivar usuario (requiere ID)
userRouter.patch("/:id/deactivate", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    await user.deactivate();
    res.json({ message: "Usuario desactivado", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default userRouter;
