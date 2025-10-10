import mogoose, { Schema, model, } from "mongoose"


const TechSchema = new Schema(
  {
    technicianname: {type: String, required: true}, // nombre del tecnico
    seller: {type: String, required: true, trim: true}, // vendedor
    napBoxPower: {type: mongoose.Types.Decimal128, required: true, trim: true}, // potencia de caja NAP
    output: {type: mongoose.Types.Decimal128, required: true, trim: true}, // salida
    mac: {type: String, required: true, trim: true}, // direccion MAC
    onu: {type: String, required: true, trim: true}, // equipo ONU
    tensioners: {type: Number, required: true, trim: true}, //tensores
    staples: {type: Number, required: true, trim: true}, // grapas
    tirrap: {type: Number, required: true, trim: true}, // tirrap
    fiberMetters: {type: Number, required: true, trim: true}, // metros de fibra
    coordinates: {type: String, required: true, trim: true}, // coordenadas
    note: {type: String, required: true, trim: true},
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


export const TechModel = model("Tech", TechSchema)
