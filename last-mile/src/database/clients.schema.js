import { Schema, model } from "mongoose"


const ClientSchema = new Schema(
  {
    name: {type: String, trim: true, required: true}, // nombre
    lastname: {type: String, trim: true, required: true}, // apellido
    dni: {type: String, trim: true, required: true}, // cedula
    email: {type: String, trim: true, required: true, unique: true}, // correo
    address: {type: String, trim: true, required: true}, // direccion
    sailingPlan: {type: String, trim: true, required: true}, // plan y/o servicio
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


export const ClientModel = model("Client", ClientSchema)
