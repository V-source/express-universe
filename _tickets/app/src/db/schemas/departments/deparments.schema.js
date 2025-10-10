import mongoose, { Schema, model } from "mongoose";
const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del departamento es obligatorio."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;
