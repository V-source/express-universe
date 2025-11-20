import UserEntity from "../../domains/users/user.entity.js";

export default class CreateUserCase {
  constructor(aplicationRepo) {
    this.userRepository = aplicationRepo;
  }

  async execute({ id = null, name, email, password, age }) {
    // implementar aqui toda las unidades o composiciones de validaciones que definiste en otros ejemplos

    if (!name || !email || !password) {
      // implementar aqui la fabrica de errores http que definiste en otros ejemplos
      throw new Error("Todos los campos son obligatorios", {
        cause: {
          status: 400,
          errors: {
            name: "El campo name es obligatorio",
            email: "El campo email es obligatorio",
            password: "El campo password es obligatorio",
          },
        },
      });
    }
    try {
      const user = new UserEntity(id, name, email, password, age);

      const userCreated = await this.userRepository.save(user);
      return await userCreated;
    } catch (error) { 
      throw error
    }
    // imprimir en el logger
  }
}
