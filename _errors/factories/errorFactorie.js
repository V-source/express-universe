import { basename } from "node:path";
import { fileURLToPath } from "node:url";

// ────────────────────────────────────────────────
// 🧩 Módulos composables (pequeñas unidades puras)
// ────────────────────────────────────────────────

const withType = (type) => ({ type });
const withRoute = (atRoute) => ({ atRoute });
const withTask = (task) => ({ tryingTo: task });
const withMessage = (message) => ({ message });
const withModule = (module) => ({ module });
const withOrigin = (err) => ({
  origin: err.stack.split("\n")[1]?.trim()
  // filePath: fileURLToPath(import.meta.url),
  // fileName: basename(fileURLToPath(import.meta.url)),
});
const withErrorObject = (errorObject) => ({
  errorObject,
  // stack: errorObject?.stack || null,
});
const withTimestamp = () => ({ atTime: new Date().toLocaleTimeString() });

// ────────────────────────────────────────────────
// 🏗️ Factory genérica de errores personalizados
// ────────────────────────────────────────────────

function createError({ type, atRoute, task, message, error }) {
  return {
    ...withTimestamp(),
    ...withType(type),
    ...withRoute(atRoute),
    ...withTask(task),
    ...withMessage(message || error?.message || null),
    ...withErrorObject(error),
  };
}

// ────────────────────────────────────────────────
// 💡 Tipos específicos de error (preconfigurados)
// ────────────────────────────────────────────────

function validationError({ atRoute, task, message, module }) {
  return {
    ...withType("VALIDATION_ERROR"),
    ...withRoute(atRoute),
    ...withTask(task),
    ...withMessage(message),
    ...withModule(module),
    // ...withFilePath(),
  };
}

function mongoError({ task, message }) {
  return createError({
    type: "MONGO_ERROR",
    task,
    message,
  });
}

// ────────────────────────────────────────────────
// 🪶 Comportamiento adicional opcional
// ────────────────────────────────────────────────

const canLog = (error) => ({
  log: () => console.error(`[${error.type}] ${error.message}`),
});

// Decorador que añade logging al error
function withLogging(error) {
  return {
    ...error,
    ...canLog(error),
  };
}

// ────────────────────────────────────────────────
// 🧪 Casos de uso reales
// ────────────────────────────────────────────────

const paramError = createError({
  type: "PARAM_ERROR",
  atRoute: "/users",
  task: "connect to MongoDB",
  message: "Error de conexión con la base de datos",
  error: new Error("Connection refused"),
});

const valError = withLogging(
  validationError({
    atRoute: "/auth",
    task: "validate credentials",
    message: "Email no válido",
  }),
);

export function errorParams({ atRoute, message }, er) {
  const error = validationError({
    atRoute: atRoute,
    task: "validate params",
    message: message,

  })
  return {
    ...error,
    ...withOrigin(er),
  }
};

export function coreModuleError({task, module, message },err) {
  return {
    ...withTimestamp(),
    ...withType("CORE_MODULE_ERROR"),
    ...withOrigin(err),
    ...withTask(task),
    ...withModule(module),
    ...withErrorObject(err),
    ...withMessage(message || err?.message)
}
}

  // base
  function myErr({ message, module, tryingTo }, error) {
    return {
      ...withTimestamp(),
      ...withType("MY_ERROR"),
      ...withMessage(message),
      ...withModule(module),
      ...withTask(tryingTo),
      ...withOrigin(error),
    };
  }

  // ────────────────────────────────────────────────
  // 🧾 Ejemplo de salida
  // ────────────────────────────────────────────────
  let e = new Error("ee");

  const ejError = myErr(
    {
      message: "error personalizado",
      module: "el modulo que quiera indicar",
      tryingTo: "alguna tarea",
    },
    e,
  );

  function log() {
    console.log(ejError);
  }

// console.time("logTrace");

// log();

// console.timeEnd("logTrace");
// dbError.log();
// valError.log();
