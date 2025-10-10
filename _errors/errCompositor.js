const hasType = (type) => ({ type });

const hasContext = ({ atRoute, tryingTo, module }) => ({
  atRoute,
  tryingTo,
  module
});

const hasMessage = (message, error) => ({
  message: message || error?.message || null,
});

const hasStack = (error) => ({
  stack: error?.stack || null,
  errorObject: error || null,
});

const canLog = (error) => ({
  log: () => console.error(`[${error.type}] ${error.message}`)
});


function createCustomError({ type, atRoute, tryingTo, message, module }, error) {
  const base = {
    timestamp: new Date(),
  };

  // Composición de comportamientos
  return {
    ...base,
    ...hasType(type),
    ...hasContext({ atRoute, tryingTo, module }),
    ...hasMessage(message, error),
    ...hasStack(error),
    ...canLog({ type, message }),
  };
}


const dbError = createCustomError(
  {
    type: "DatabaseError",
    atRoute: "/users",
    tryingTo: "connect to MongoDB",
    message: "Error de conexión con la base de datos",
    module: "DatabaseModule",
  },
  new Error("Connection refused")
);

// dbError.log();

// console.log(dbError);



const canReport = (error) => ({
  report: () => console.log(`Reportando a servidor: ${error.message}`)
});

function createNetworkError(info, error) {
  const err = createCustomError(info, error);
  return {
    ...err,
    ...canReport(err),
  };
}

const netErr = createNetworkError(
  {
    type: "NetworkError",
    atRoute: "/api/data",
    tryingTo: "fetch data",
    message: "Timeout al conectar con el servidor",
  },
  new Error("ETIMEDOUT")
);

// netErr.log();
// netErr.report();
// console.log(netErr)
