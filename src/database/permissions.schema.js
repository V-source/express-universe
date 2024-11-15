import { Schema, model } from "mongoose"


const PermissionsSchema = new Schema(
  {
    name: {type: String, trim: true, required: true, unique: true},
    description: {type: String, trim: true, requierd: true},
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


export const PermissionsModel = model("Permissions", PermissionsSchema)
