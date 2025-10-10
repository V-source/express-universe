const sendErrorProd = (err, res) => {
  // Errores operacionales (nuestros ErrorFactory)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      details: err.details,
    });
  }

  // Errores de programación (ej. falla de la DB, bug en el código)
  console.error("ERROR 💥", err); // Registra el error para depuración
  return res.status(500).json({
    status: "error",
    message: "Ha ocurrido un error inesperado. Inténtelo más tarde.",
  });
};

const sendErrorDev = (err, res) => {
  // En desarrollo, enviamos todos los detalles para depuración
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    details: err.details,
    stack: err.stack,
    error: err,
  });
};

const errorHandler = (err, req, res, next) => {
  // console.log(err.errors);
  const errs = {};
  if (err.name === "ValidationError") {
    console.error("Error de validación de Mongoose:");
    // Iteramos sobre los errores para dar detalles específicos.
    //
    // console.log(err.errors)
    for (let field in err.errors) {
      errs[field] = [];
      errs[field].push(err.errors[field].message);
      // console.log(`- Campo: ${field}, Mensaje: ${err.errors[field].message}`);
    }
    // console.log(err)
    return res.status(422).json({ msg: "Campos obligatorios", errors: errs });
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "production") {
    // Si tienes errores específicos de Mongoose, puedes manejarlos aquí
    if (err.name === "CastError") {
      const message = `El ID ${err.value} no es válido.`;
      err = new ErrorFactory(message, "El formato del ID es incorrecto.", 400);
    }

    // Puedes añadir más manejadores aquí para otros tipos de errores

    sendErrorProd(err, res);
  } else {
    sendErrorDev(err, res);
  }
};

export default errorHandler;
