import { Schema, model } from "mongoose"


const ClientSchema = new Schema(
  {
    name: {type: String, trim: true, required: true},
    lastname: {type: String, trim: true, required: true},
    dni: {type: String, trim: true, required: true},
    email: {type: String, trim: true, required: true, unique: true},
    address: {type: String, trim: true, required: true},
    sailingPlan: {type: String, trim: true, required: true},
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


export const ClientModel = model("Client", ClientSchema)
