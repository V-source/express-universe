import { Schema, model } from "mongoose";
const PermisionsSchema = new Schema(
  {
    permissions: {
      type: String,
      enum: ["create", "read", "update", "delete", "none"],
      required: [true, "El rol del usuario es obligatorio"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


export default model("Permisions", PermisionsSchema);
