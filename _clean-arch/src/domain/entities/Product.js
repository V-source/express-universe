// src/domain/entities/Product.js

/**
 * @class Product
 * @description Entidad de dominio que representa un Producto.
 * Contiene las reglas de negocio de alto nivel (ej: validación de datos).
 */
class Product {
  constructor(name, description, price, id = null) {
    // Regla de Negocio 1: El nombre es obligatorio
    if (!name || typeof name !== "string") {
      throw new Error(
        "El nombre del producto es obligatorio y debe ser una cadena de texto.",
      );
    }
    // Regla de Negocio 2: El precio debe ser un número positivo
    if (typeof price !== "number" || price <= 0) {
      throw new Error("El precio del producto debe ser un número positivo.");
    }

    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  // Método de negocio de ejemplo
  updatePrice(newPrice) {
    if (typeof newPrice !== "number" || newPrice <= 0) {
      throw new Error("El nuevo precio debe ser un número positivo.");
    }
    this.price = newPrice;
  }

  // Método para exponer el objeto sin exponer la clase interna
  toObject() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
    };
  }
}

export default Product;
// ENTIDAD DE DOMINIO
// * es el medio para validar y asegurar la estructura del modelo de datos informacion.
// * valida que las condiciones criticas o importantes se cumplan para asegurar la integridad de los datos.
// En resumen: Cuando creas un objeto Product, lo haces a través de la Entidad. Si la Entidad te permite crearlo, tienes la garantía de que su estructura es correcta y que cumple con todas las reglas fundamentales de negocio.

// REPOSITORIO DE DOMINIO
// * El Repositorio es el Contrato de Acceso a Datos. (interfaz o contrato son lo mismo en este contexto)
// * Define Métodos: Especifica exactamente qué funciones existen para manipular las Entidades (e.g., save(product), findById(id)).
// * Puente para Casos de Uso: Permite que las instrucciones de negocio (los Casos de Uso) digan: "Necesito el Producto X" o "Guarda este Producto".
// * Aislamiento: Asegura que los Casos de Uso solo se preocupen por el qué (qué información necesitan) y nunca por el cómo (si se usa Mongoose, SQL, o archivos de texto para obtenerla o guardarl
// CASOS DE USO DE APLICACION DE DOMINIO
// * hace uso de las Entidades para validar los datos y dirige a los Repositorios para realizar las interaccion con el almacenamiento.
// * logica especifica que dicta los pasos y condiciones necesarias para completar una tarea de negocio.
// * contine las instrucciones exclusivas de una tarea.  Es la coordinación y el control de las partes necesarias. El Caso de Uso toma el control y dirige a las Entidades para que validen los datos y dirige a los Repositorios para que realicen la interacción con el almacenamiento.

function entidadProducto(name, price) { // debe ser una clase
  // validar datos.  reglas de negocio de alto nivel
  // retorna datos validados y con la estructura para guardar en la base de datos o un error si no cumple con las reglas de negocio.

  if (!name || typeof name !== "string") {
    throw new Error(
      "El nombre del producto es obligatorio y debe ser una cadena de texto.",
    );
  }
  if (typeof price !== "number" || price <= 0) {
    throw new Error("El precio del producto debe ser un número positivo.");
  }
  // Método de negocio de ejemplo
  const updatePrice = (newPrice) => {
    if (typeof newPrice !== 'number' || newPrice <= 0) {
      throw new Error('El nuevo precio debe ser un número positivo.');
    }
    price = newPrice;
  }
  return {
    name: name,
    price: price,
  };
}

function casosDeUso_crearProducto(datos) {
  // implementa entidades y repositorios
  // valida datos con la entidad de producto `entidadProducto()`.
  // y si todo sale bien impelementa el repositorio `crearProducto()` (interfaz o contrato) que gestiona las acciones con la base de datos.

  const producto = entidadProducto(datos.name, datos.price);
  repositorio_prodtucto().guardarProducto(producto);
}

function repositorio_prodtucto() {
  const guardarProducto = () => {
    // implementa la logica para guardar el producto en la base de datos
  };

  const editarProductio = () => {
    // implementa la logica para editar el producto en la base de datos
  };

  const eliminarProducto = () => {
    // implementa la logica para eliminar el producto en la base de datos
  };

  return {
    guardarProducto,
    editarProductio,
    eliminarProducto,
  };
}
