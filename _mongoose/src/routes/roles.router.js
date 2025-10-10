import { Router } from "express";
import Roles from "../models/Roles/Roles.js";

const rolesRouter = Router();

rolesRouter.post("/register", async (req, res) => {
  try {
    const roleManager = await Roles.registerRol({ ...req.body });
    // Buscar si ya existe
    const existing = await roleManager.findOneByName();
    if (existing) {
      console.log("Rol ya existe");
      res.status(409).json({ message: "Rol ya existe" });
    } else {
      // Crear si no existe
      const saved = await roleManager.createOne();
      console.log("Rol creado:", saved);
      res.status(201).json({ message: "Rol registrado", saved });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

.get('/list-roles', async (_req, res) => {
  try {
    const roles = await Roles.find();  
    res.json(roles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

export default rolesRouter
