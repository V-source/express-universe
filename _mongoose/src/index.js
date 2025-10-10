import "dotenv/config.js";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import rolesRouter from "./routes/roles.router.js";

const app = express();
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/roles", rolesRouter);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar:", err));

// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
