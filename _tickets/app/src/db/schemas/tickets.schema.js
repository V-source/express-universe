import { Schema, model } from "mongoose";
import { CommentSchema } from "./comments.schema.js";



const TicketsSchema = new Schema(
  {
    //  ── Campos para el creador del ticket (referencia polimórfica) ──────
    creatorId: {
      type: Schema.Types.Mixed, // Usamos Mixed para aceptar ObjectId o String
      required: [true, "El creador del ticket es obligatorio"],
      trim: true,
    },
    creatorType: {
      type: String,
      enum: ["user", "client"], // 'User' para el personal, 'Client' para el externo
      required: [true, "El tipo de creador es obligatorio"],
    },
    //  ──────────────────────────────────────────────────────────────────────
    subject: {
      type: String,
      required: [true, "El asunto es obligatorio"],
      // requiered: true,
      trim: true,
      minlength: [5, "El asunto debe tener al menos 5 caracteres"],
    },
    //  ──────────────────────────────────────────────────────────────────────
    description: {
      type: String,
      // required: [true, "La descripción es obligatoria"],
      trim: true,
    },
    //  ──────────────────────────────────────────────────────────────────────
    currentStatus: {
      // Estado actual del ticket
      type: String,
      enum: ["Abierto", "Cerrado", "En espera", "En progreso"],
      default: "Abierto",
    },
    closedReason: {
      type: String,
      enum: ["Resuelto", "Duplicado", "No compete a la empresa"],
    },
    //  ──────────────────────────────────────────────────────────────────────
    assignedTo: {
      // Técnico asignado
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    assignedBy: {
      // Operador o Administrador que asignó el ticket
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    attachments: [
      {
        url: String,
        uploadedAt: Date,
      },
    ],
    comments: [ {
      body: {
        type: String,
        required: [true, "La descripción/comentario es obligatorio/a"],
        trim: true,
      minlength: [5, "La descripción/comentario debe tener al menos 5 caracteres"],
      },
      author: Schema.Types.Mixed,
    } ],
    //  ──────────────────────────────────────────────────────────────────────
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model("Tickets", TicketsSchema);
