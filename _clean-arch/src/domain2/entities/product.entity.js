import entity from "./entity.js";

export default function productEntity(values) {
  const { errors, data } = entity(values, productLayout());
  if (errors) {
    throw errors;
  }
  return data;
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
  };
}
