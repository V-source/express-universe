import mongoose, { Schema, model } from "mongoose";
import { hashPassword, comparePassword } from "../../utils/hashPassword.js";
import { usersIds } from "./statics/usersIds.js";

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio."],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: (props) =>
          `${props.value} no es un formato de correo electrónico válido.`,
      },
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria."],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres."],
      maxlength: [16, "La contraseña no debe exceder los 16 caracteres."],
    },

    role: {
      type: String,
      required: [true, "El rol es obligatorio."],
      lowercase: true,
      enum: ["administrador", "operador", "supervisor", "tecnico", "god"],
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


// Hook 'pre' para hashear la contraseña antes de guardar
UsersSchema.pre("save", hashPassword);

// Método para comparar contraseñas de forma asíncrona
UsersSchema.methods.comparePassword = comparePassword;

// devolver ids
UsersSchema.statics.usersIds = usersIds

  export default model("User", UsersSchema);
