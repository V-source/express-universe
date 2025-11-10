import entity from "./entity.js";

export default function productEntity(values) {
  // logica de negocio.
  if (values.stock > 0 && values.price <= 0) {
    // Un producto en stock NO puede tener precio cero.
    let newError  = new Error("Campos invalidos o mal formados");
    newError.price =
      "Un producto con stock no puede tener un precio igual o menor a cero.";
      newError.status = 422;
    throw newError
  }

  // console.log(values)

  // if (Object.keys(businessErrors).length > 0) {
  //   console.log(businessErrors);
  //   throw businessErrors;
  // }
  return values;
}
export function productLayout() {
  return {
    name: {
      type: "string",
      min: 5,
      max: 50,
      match: /pencil/,
    },
    price: {
      type: "number",
      lower: 10,
      higher: 10,
    },
    sku: {
      type: "string",
      min: 8,
      max: 8,
      match: /^[A-Z0-9]+$/,
    },
    stock: {
      type: "number",
      min: 0,
    },
  };
}

