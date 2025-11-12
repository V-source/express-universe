class CreateUserCase {
  constructor(aplicationRepo) {
    this.userRepository = aplicationRepo;
  }

  async execute({ id, name, email, password, age }) {
    if (!name || !email || !password || !age) {
      throw new Error("Todos los campos son obligatorios", {
        cause: {
          message: "Todos los campos son obligatorios",
          status: 400,
          errors: {
            name: "El campo name es obligatorio",
            email: "El campo email es obligatorio",
            password: "El campo password es obligatorio",
            age: "El campo age es obligatorio",
          },
        },
      });
    }
    try {
      const user = new UserEntity(id, name, email, password, age);
      const userCreated = this.userRepository.save(user);
      return await userCreated;
    } catch (error) {}

    // imprimir en el logger
    console.log(error);
  }
}
