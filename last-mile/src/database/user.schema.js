import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    role: {type: Schema.Types.ObjectId, ref: 'Roles'},
    permissions: {type: Schema.Types.ObjectId, ref: 'Permissions'},
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserModel = model("User", UserSchema);
