import ProductRepository from "../repositories/product.repository.js";
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

// ProductDbRepository equivalente
export function createProductDbRepository() {
  // Estas son las implementaciones concretas de la interfaz.
  return {
    save: (product) => {
      return {};
    },

    cleanProduct: (product) => {
      return
    },
  };
}

export function findProductRepository() {
  return {
    findById: (id) => {
      return "found";
    },
  };
}
