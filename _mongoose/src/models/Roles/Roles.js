import { Schema, model } from "mongoose";
import { _registerRol } from "./Statics.js";
const RolesSchema = new Schema(
  {
    name: { type: String, requried: true, trim: true, unique: true },
    description: { type: String, requried: true, trim: true },
    module: { type: String, requried: true, trim: true },
    action: { type: String, requried: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

//  ══ STATICS ═════════════════════════════════════════════════════════
RolesSchema.statics.registerRol = function(values) {
  return _registerRol(this, values)
}

//   ══════════════════════════════════════════════════════════════════════
const Roles = model("Roles", RolesSchema);
export default Roles;

//   ══════════════════════════════════════════════════════════════════════
