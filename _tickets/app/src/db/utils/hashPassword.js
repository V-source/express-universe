import bcrypt from "bcryptjs";

// usa funciones regulares para que this pueda tener efecto.



export async function hashPassword(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next(); // Si la contraseña no se ha modificado, continúa
  }

  try {
    user.password = await bcrypt.hash(user.password, 10);
    next(); // Continuar con la operación de guardado
  } catch (error) {
    next(error); // Pasar el error a Mongoose para que lo maneje
  }
}

export  async function comparePassword(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
