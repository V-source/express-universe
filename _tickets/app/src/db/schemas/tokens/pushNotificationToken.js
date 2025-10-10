import { Schema, model } from "mongoose";

const PushNotificationToken = new Schema(
  {
    token: {
      type: String,
      trim: true,
      unique: true,
    },
    client: {
      email: { type: String, unique: true, trim: true },
    },
    clietsCount: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Middleware 'post' para 'save'
PushNotificationToken.post("save", async function (doc, next) {
  try {
    // Referencia al modelo para poder hacer el conteo
    const PushNotification = this.constructor;

    // Contar el número total de documentos en la colección
    const totalClientes = await PushNotification.countDocuments({});

    // Actualizar el campo 'clientesCoutn' del documento recién creado/guardado
    // Nota: Usamos `doc` que es el documento que se acaba de guardar
    doc.clietsCount = totalClientes;

    // Guardamos el documento nuevamente con el campo actualizado
    // Usamos { new: true, overwrite: true } para asegurarnos de que solo se actualice este campo
    // y no se genere un bucle infinito del middleware
    await PushNotification.findByIdAndUpdate(
      doc._id,
      { clietsCount: totalClientes },
      { new: true },
    );

    // Continuar con el siguiente middleware o finalización
    next();
  } catch (error) {
    console.error("Error en el middleware 'post-save':", error);
    next(error);
  }
});

async function usersCount() {
  try {
    const count = await this.countDocuments({});
    return count;
  } catch (error) {
    console.error("Error al contar documentos:", error);
    return 0; // Retorna 0 en caso de error
  }
}

PushNotificationToken.statics.usersCount = usersCount;

const PushNotification = model("PushNotification", PushNotificationToken);

export default PushNotification;
