import ProductRepository from "../../domain/repositories/ProductReposisrory.js";

export default class ProductDbRepository extends ProductRepository {
  save(product) {
    // throw new Error("Método save() debe ser implementado");
    console.log("Guardando producto en la base de datos...");
    return true;
  }

  findById(id) {
    console.log("Buscando producto en la base de datos...");
    // throw new Error("Método findById() debe ser implementado");
  }
}

// export function DbRepositoryFactory() {
//   return new DbRepository();
// }
