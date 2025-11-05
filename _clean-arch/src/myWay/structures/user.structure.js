const userStructure = {
  name: "",
  email: "",
  password: "",
};


export default function createUserEntity(data) {
  const validatedData = validateEntity(data, userStructure);
  
  return Object.freeze({
    ...validatedData,
  });
}



function validateEntity(entryData, structure) {

  let missingKeys = getMissingKeys(entryData, structure);
  if (missingKeys) throw new ValidationError("Missing keys", missingKeys);

  let emptyValues = getEmptyFields(entryData, structure);
  if (emptyValues) throw new ValidationError("Empty fields", emptyValues);

  return {
    ...entryData,
  };
}




// building block
function isEmpty(value) {
  return value === undefined || value === null || value === "";
}


// building block
function getEmptyFields(obj, structure) {
  const requiredKeys = Object.keys(structure);

  const emptyValues = requiredKeys.reduce((acc, key) => {
    if (isEmpty(obj[key])) {
      acc[key] = "Este campo es Obligarorio";
    }
    return acc;
  }, {});

  return Object.keys(emptyValues).length > 0 ? emptyValues : false;
}


/**
 * Comprueba si faltan claves requeridas y devuelve un objeto de errores.
 * @param {object} entryData - Los datos de entrada recibidos (donde se buscan las claves).
 * @param {object} structure - El objeto plantilla que define las claves requeridas.
 * @returns {object|false} Objeto de errores con las claves faltantes, o false si todo está bien.
 */
function getMissingKeys(entryData, structure) {
  const requiredKeys = Object.keys(structure);

  // Usamos reduce para construir el objeto de errores de forma explícita
  const emptyKeys = requiredKeys.reduce((acc, key) => {
    // Si la clave NO existe en entryData, la añadimos al acumulador (acc)
    if (!(key in entryData)) {
      acc[key] = "El campo requerido no fue proporcionado o está mal escrito.";
    }
    return acc;
  }, {}); // Inicializamos el acumulador como un objeto vacío

  // Devolvemos el objeto de errores o false
  return Object.keys(emptyKeys).length > 0 ? emptyKeys : false;
}


class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}

// NOTE: EL SEGUNDO PARAMETRO DE .REDUCE(CALLBACK, INITIALVALUE)
// - El initialValue es el valor que se asigna al acumulador (el primer argumento de la función callback) en la primera iteración del reduce.
// - Al proporcionar un initialValue, evitas errores si intentas usar reduce() en un array vacío, y garantizas que el acumulador tenga el tipo correcto desde el inicio, haciendo el código más predecible y robusto.
