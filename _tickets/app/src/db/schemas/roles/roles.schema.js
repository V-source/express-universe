import { Schema, model } from "mongoose";

const RolesSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["administrador", "supervisor", "operador", "cliente", "tecnico"],
      required: [true, "El rol del usuario es obligatorio"],
    },
    //   ──────────────────────────────────────────────────────────────────────
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model("Roles", RolesSchema);

