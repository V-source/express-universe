export default class ProductController {
  // tip: los casos de uso se inyectan en el constructor
  constructor(createUserCase) {
    this.createUserCase = createUserCase;

    // Es buena práctica bindear 'this' para que Express pueda llamar a los métodos
    this.createUser = this.createUser.bind(this);
    // Sólo se requiere si pasas el método así:
    // router.post("/", userController.createUser);
  }
  // mark: aqui se manipulan los objetos req, res de express
  async createUser(req, res, next) {
    try {
      // 1. Llamar al Caso de Uso, pasándole los datos crudos
      const user = await this.createUserCase.execute({ ...req.body });
      // 2. Formatear la respuesta. Usamos product.toObject() para obtener un JSON simple.
      // res.status(201).json(product.toObject());

      return res.status(201).json(user);
    } catch (error) {
      next(error);
      // console.error(error);
      // Manejo de errores. Si falla la validación de la Entidad, el error se captura aquí.
      // res.status(500).json({ message: error.message });
    }
  }
}
