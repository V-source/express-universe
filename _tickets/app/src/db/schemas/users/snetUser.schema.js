import { Schema, model, mongoose } from "mongoose";

const SnetUserSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  tipo: {
    type: String,
    enum: ["Natural", "Juridico"],
    required: true,
    trim: true,
  },
  user_id: {
    type: String,
    ref: "User", // Asume que tienes un modelo 'User'
    required: true,
  },
  persona_id: {
    type: String,
    ref: "Persona", // Asume que tienes un modelo 'Persona'
    required: true,
  },
  juridico_id: {
    type: String,
    ref: "Juridico", // Asume que tienes un modelo 'Juridico'
    default: null,
  },
  saldo: {
    type: Number,
    default: 0,
  },
  empresa_rif: {
    type: String,
    trim: true,
    default: null,
  },
  empresa_nombre: {
    type: String,
    trim: true,
    default: null,
  },
  persona_cedula: {
    type: String,
    trim: true,
    required: true,
  },
  persona_nombre_completo: {
    type: String,
    trim: true,
    required: true,
  },
  usuario_correo: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const SnetUser = model("SnetUser", SnetUserSchema);
export default SnetUser;


// note: esquema de usuario desde api snet
const user = {
  id: 5841,
  tipo: "Natural",
  user_id: 5859,
  persona_id: 5536,
  juridico_id: null,
  saldo: 0,
  empresa_rif: null,
  empresa_nombre: null,
  persona_cedula: "V19762261",
  persona_nombre_completo: "Elvis Joseph Villegas Figueroa",
  usuario_correo: "villejsdev@gmail.com",
};
