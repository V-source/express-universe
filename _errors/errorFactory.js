class CustomError {
  constructor({ type, atRoute, tryingTo, message, module }, error) {
    this.type = type;
    this.atRoute = atRoute;
    this.tryingTo = tryingTo;
    this.errorObject = error || null;
    this.stack = (error && error.stack) || null;
    this.message = message || error.message || null;
    this.module = module || null;
  }

  getError() {
    return {
      type: this.type,
      atRoute: this.atRoute,
      tryingTo: this.tryingTo,
      stack: this.stack,
      message: this.message,
      errorObject: this.error,
      fromModule: this.module,
    };
  }
}

export default CustomError;

export function validationError({ tryingTo, message, req, error }) {
  const getErr = new CustomError(
    {
      type: "VALIDATION_ERROR",
      atRoute: req.url,
      tryingTo: tryingTo,
      message: message,
    },
    error || null,
  );

  let err = getErr.getError();

  return getErr;
}

// 🧱 1. Definimos los comportamientos (módulos reutilizables)
// Módulos de comportamiento — funciones puras que añaden capacidades

const canView = (user) => ({
  view: () => console.log(`${user.name} está viendo contenido.`)
});

const canEdit = (user) => ({
  edit: () => console.log(`${user.name} está editando contenido.`)
});

const canDelete = (user) => ({
  delete: () => console.log(`${user.name} eliminó un usuario.`)
});


// ⚙️ 2. Creamos una función base para todos los usuarios
function createUser(name) {
  const user = { name };
  return {
    ...user,
    info: () => console.log(`Usuario: ${name}`)
  };
}


// 🧬 3. Componemos tipos de usuario según lo que necesiten hacer


// Composición funcional: se combinan habilidades en lugar de heredar

function createViewer(name) {
  const user = createUser(name);
  return {
    ...user,
    ...canView(user)
  };
}

function createEditor(name) {
  const user = createUser(name);
  return {
    ...user,
    ...canView(user),
    ...canEdit(user)
  };
}

function createAdmin(name) {
  const user = createUser(name);
  return {
    ...user,
    ...canView(user),
    ...canEdit(user),
    ...canDelete(user)
  };
}


const viewer = createViewer("Ana");
// viewer.info();
// viewer.view();

const editor = createEditor("Carlos");
// editor.info();
// editor.view();
// editor.edit();

const admin = createAdmin("Laura");
// admin.info();
// admin.view();
// admin.edit();
// admin.delete();

