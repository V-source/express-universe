import express from "express";
import fs from "node:fs";
import CustomError, { validationError } from "./errorFactory.js";
import { coreModuleError, errorParams } from "./factories/errorFactorie.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  throw new Error("BROKEN"); // Express lo atrapará por sí solo.
});
app.post("/get-user/:_id", (req, res, next) => {
  if (req.params._id) {
    const error = validationError({
      tryingTo: "get the _id param",
      message: "no valid params received",
      req,
    });
    return next(error);
  }
  res.status(200).send({ msg: "ok", param: req.params._id });
});

app.get("/read-file/:_filename", [
  function(req, res, next) {
    const filename = req.params._filename;
    if (filename === "123") {
      return next(errorParams({ atRoute: req.url, message: "no valid params received"}, Error('no valid params received')))
    }
    fs.readFile(`./${filename}`, "utf-8", (err, data) => {
      res.locals.data = data;
      return next(coreModuleError({ task: "read a file", module: "fs.readFile" }, err));
      // next(customErr);
    });
  },
  function(req, res) {
    res.locals.data = res.locals.data.split(",")[1];
    res.send(res.locals.data);
  },
]);

app.use((req, res, next) => {
  const error = new CustomError(
    {
      type: "ROUTE_NOT_FOUND_ERROR",
      atRoute: req.url,
      tryingTo: "get inexistent path",
      module: "express",
      message: "resource not found",
    },
    null,
  );
  console.log(error);
  res.status(404).send({ msg: "n0000ot found" });
});

// ╭─────────────────────────────────────────────────────────╮
// │                   MARK: ERROR HANDLER                   │
// ╰─────────────────────────────────────────────────────────╯
// se deben invocar al final de todas las peticiones y configuraciones de rutas
// se pueden usar varios
//
function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.type === "route_not_found") {
    return res.status(404).send({ msg: "n0000ot found" });
  }
  if (res.headersSent) {
    return next(err);
  }
  const error = new CustomError(
    {
      type: "express_error",
      atRoute: req.url,
      tryingTo: "get resource",
      module: "express",
    },
    err,
  );
  res.status(500).json({ msg: "express error handler", err: error });
}

// MARK: INVOCA EL ERROR HANDLER
app.use(errorHandler);

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send("Something broke!");
// });

// puedes usar varios manejadores de errores
// app.use(clientErrorHandler)
// app.use(logErrorsHandler)
// app.use(errorHandler)

//   ──────────────────────────────────────────────────────────────────────
//   ──────────────────────────────────────────────────────────────────────
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));
