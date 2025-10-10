export async function usersIds () {
 // `this` aquí se refiere al modelo 'User'
  // Usamos .find() con .select() para obtener solo el campo _id
  // y luego .lean() para que devuelva objetos JavaScript planos en lugar de documentos Mongoose
  const ids = await this.find({}, '_id').lean();
  return ids.map(user => user._id); // Mapeamos el resultado a un array de IDs
}

