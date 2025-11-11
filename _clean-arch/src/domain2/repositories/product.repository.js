export default class ProductRepository {
  save(product) {
    throw new Error("Método save() debe ser implementado");
  }

  findById(id) {
    throw new Error("Método findById() debe ser implementado");
  }
}

// La función 'create' toma la implementación concreta (como inyección de dependencia)
export function productRepository(implementation) {
  if(typeof implementation !== "object") {
    throw new Error("El repositorio debe ser un objeto");
  }
  const shouldDo = ["save", "findById", "updateProduct", "deleteProduct"];
  const repository = {...implementation};

  shouldDo.map((e) => {
    if (!(e in implementation) || typeof repository[e] !== "function") {
      // repository[e] = () => {
      //   throw new Error(`El metodo ${e} no cumple con el contrato`);
      // };
      repository[e] = () => {
        throw new Error(`Este metodo no cumple con el contrato`);
        return "Este metodo no cumple con el contrato";
      };
    }
  });

  // Object.keys(implementation).map((e) => {
  //   if (!shouldDo.includes(e)) {
  //     repository[e] = () => {throw new Error(`Este metodo no cumple con el contrato`)}
  //   }
  // })
  console.log(repository);

  return repository;

  // 4. Devolver el repositorio completo (con implementaciones reales o funciones de error).
}
