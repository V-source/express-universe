// ╭─────────────────────────────────────────────────────────╮
// │                   LOGICAS DEL NEGOCIO                   │
// ╰─────────────────────────────────────────────────────────╯
export default function entity(values, layout) {
  const errors = basicValidation(values, layout);

  let newError = new Error("Campos invalidos o mal formados");
  if (Object.keys(errors).length > 0) {
    newError.errors = { ...errors };
    // throw newError;
  }

  if (values?.email) {
    if (isEmail(values.email)) {
      newError.errors = {};
      isEmail(values.email) && (newError.errors.email = isEmail(values.email));
      throw newError;
    }
  }

  // retorna objeto con errors: en null o con los errores
  return {
    errors: Object.keys(errors).length > 0 ? newError : null,
    data: Object.keys(errors).length > 0 ? null : values,
  };
}

// ╭─────────────────────────────────────────────────────────╮
// │              ESTRUCTURAS DE LAS ENTIDADES               │
// ╰─────────────────────────────────────────────────────────╯
export function userLayout() {
  return {
    name: {
      type: "string",
      max: 50,
    },
    password: {
      type: "string",
      min: 6,
      max: 12,
    },
    email: {
      type: "string",
      max: 50,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  };
}

// ╭─────────────────────────────────────────────────────────╮
// │        PERTENECE A LA CATEGORIA DE COMPOSITIONS         │
// ╰─────────────────────────────────────────────────────────╯
function basicValidation(receviedValues, layout) {
  let errors = {};

  // valida que los datos recibidos tengan las propiedades de la estructura
  for (const prop in layout) {
    getBadKeys(receviedValues, prop) &&
      (errors[prop] = getBadKeys(receviedValues, prop));
  }

  for (const key in receviedValues) {
    isNegative(receviedValues[key]) &&
      (errors[key] = isNegative(receviedValues[key]));

    for (const rule in layout[key]) {
      isEmpty(receviedValues[key]) &&
        (errors[key] = isEmpty(receviedValues[key]));

      isType(receviedValues[key], layout[key].type) &&
        (errors[key] = isType(receviedValues[key], layout[key].type));

      // validar minimo y maximo de caracteres puede ir aqui tambien
      minLength(receviedValues[key], layout[key].min) &&
        (errors[key] = minLength(receviedValues[key], layout[key].min));

      maxLength(receviedValues[key], layout[key].max) &&
        (errors[key] = maxLength(receviedValues[key], layout[key].max));
    }

    itMatch(receviedValues[key], new RegExp(layout[key].match)) &&
      (errors[key] = itMatch(
        receviedValues[key],
        new RegExp(layout[key].match),
      ));

    // lt(receviedValues[key], layout[key].lower) &&
    //   (errors[key] = lt(receviedValues[key], layout[key].lower));

  }

  // valida minimo y maximo de caracteres
  // for (const key in receviedValues) {
  //   for (const rule in layout[key]) {
  //     minLength(receviedValues[key], layout[key].min) &&
  //       (errors[key] = minLength(receviedValues[key], layout[key].min));
  //     maxLength(receviedValues[key], layout[key].max) &&
  //       (errors[key] = maxLength(receviedValues[key], layout[key].max));
  //   }
  // }

  // it match
  // for (const key in receviedValues) {
  //   for (const rule in layout[key]) {
  //     itMatch(receviedValues[key], new RegExp(layout[key].match)) &&
  //       (errors[key] = itMatch(
  //         receviedValues[key],
  //         new RegExp(layout[key].match),
  //       ));
  //   }
  // }

  return errors;
}

// ╭─────────────────────────────────────────────────────────╮
// │           PERTENECEN A LA CATEGORIA DE UNITS            │
// ╰─────────────────────────────────────────────────────────╯
export function isEmpty(value) {
  return value === "" || value === undefined ? "Este campo es obligario" : null;
}

export function isType(value, type) {
  return typeof value !== type ? `El valor debe ser de tipo ${type}` : null;
}

export function isString(value) {
  return typeof value !== "string" ? "El valor debe ser de tipo string" : null;
}

/*
 * valida que los datos recibidos tengan las propiedades de la estructura
 * @param object: objeto con los datos recibidos
 * @param prop: propiedad de la estrucutra que debe tener
 */
export function getBadKeys(object, prop) {
  return !Object.prototype.hasOwnProperty.call(object, prop)
    ? `El campo ${prop} no existe y es requerido`
    : null;
}

export function minLength(value, min) {
  return value.length < min
    ? `El campo debe tener al menos ${min} caracteres`
    : null;
}
export function maxLength(value, max) {
  return value.length > max
    ? `El campo debe tener menos de ${max} caracteres`
    : null;
}
export function itMatch(value, matchValue) {
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !matchValue.test(value)
    ? "El campo no es válido de acuerdo a la regla"
    : null;
}

export function isEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email) ? "El correo no es un correo válido" : null;
}

export function lt(value, min) {
  return value < min ? `El valor debe ser mayor a ${min}` : null;
}
export function gt(value, max) {
  return value > max ? `El valor debe ser menor a ${max}` : null;
}

export function isNegative(value) {
  return value < 0 ? `El valor no puede ser un numero negativo` : null;
}
