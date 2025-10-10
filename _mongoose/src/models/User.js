import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  active: { type: Boolean, default: true },
}, { timestamps: true });

/* ---------------- MÉTODOS DE DOCUMENTO ---------------- */

// Compara contraseñas (login)
userSchema.methods.checkPassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// Desactiva al usuario (soft delete)
userSchema.methods.deactivate = async function () {
  this.active = false;
  return await this.save();
};

/* ---------------- MÉTODOS ESTÁTICOS ---------------- */

// Buscar por email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

// Buscar usuarios activos
userSchema.statics.findActiveUsers = function () {
  return this.find({ active: true });
};

// Registro (con hash automático)
userSchema.statics.register = async function (name, email, password) {
  const existing = await this.findByEmail(email);
  if (existing) throw new Error("El correo ya está registrado");

  const hashed = await bcrypt.hash(password, 10);
  const user = await this.create({ name, email, password: hashed });
  return user;
};

/* ---------------- MÉTODOS COMBINADOS ---------------- */
// Login
userSchema.statics.login = async function (email, password) {
  const user = await this.findByEmail(email);
  if (!user) throw new Error("Usuario no encontrado");

  const valid = await user.checkPassword(password);
  if (!valid) throw new Error("Contraseña incorrecta");

  return user;
};

export default mongoose.model("User", userSchema);
