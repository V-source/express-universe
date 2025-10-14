import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fs from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import serverConfig from "./config.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const logStream = fs.createWriteStream(join(__dirname, "../access.log"), {
  flags: "a",
});

serverConfig(app);
// Configuración de CORS para Express

app.disable("x-powered-by");
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: logStream }));

//  ── DB CONNECTION ───────────────────────────────────────────────────
import "./db/connection.js";

import { handleSocketConnection } from "./services/socket/index.js";
import tickets from "./services/tickets/getTickets.js";
import errorHandler from "./middlewares/errorHandler.js";
import ErrorFactory from "./utils/errorHandlers/factory.js";
import users from "./services/users/users.service.js";
import apklogsRoute from "./services/apklogs.service.js";
import notificationToken from "./services/notifications/storeNotificationToeken.service.js";
import masiveNotification from "./services/notifications/masiveNotifications.service.js";
import usersCount from "./services/admin/usersCount.js";

app.get("/", (req, res) => {
  res.status(200).json({ msg: "express server" });
});

const server = createServer(app);

// Configuración de Socket.io con CORS
const io = new Server(server, {
  cors: {
    origin: "*", // Cambia esto a tu dominio en producción
    // methods: ["POST"]
  },
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  },
});

// Objeto para almacenar los sockets de los clientes
const clients = {};

handleSocketConnection(io, clients);

// Ruta para enviar mensaje al cliente 400
app.get("/message", (req, res) => {
  // const client400 = clients['500']; // Buscar el socket identificado como '500'
  // if (client400 && client500.connected) {
  //   client500.emit('500', {
  //     msg: 'Este es un mensaje masivo enviado desde la ruta /message',
  //     timestamp: new Date().toISOString()
  //   });
  //   res.status(200).json({ msg: 'Mensaje enviado al cliente 500' });
  // } else {
  //   res.status(404).json({ error: 'Cliente 500 no conectado' });
  // }

  if (Object.keys(clients).length > 0) {
    // Enviar a todos los clientes conectados
    io.emit("massive", {
      title: 'Nueva Propmocion Refiere y gana con SucreNete',
      msg: "Refiere y gana con sucrenet. Por cada nuevo referido tendras ganaras 3 dolares. Una vez que rebases el monto de tus servicios podrás retirar el dinero de tu monedero SNet",
      timestamp: new Date().toISOString(),
      totalClients: Object.keys(clients).length,
    });

    res.status(200).json({
      msg: "Mensaje enviado a todos los clientes conectados",
      totalClients: Object.keys(clients).length,
    });
  } else {
    res.status(404).json({ error: "No hay clientes conectados" });
  }
});

// app.use(auth)
// app.use('/api', login)
app.use("/api", tickets);
app.use("/api", users);
app.use("/api", apklogsRoute);
app.use("/api", notificationToken);
app.use("/api", masiveNotification);
app.use("/api", usersCount );

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  console.log(`Ruta no encontrada: ${req.originalUrl}`);
  next(new ErrorFactory(`La ruta ${req.originalUrl} no existe.`, null, 404));
});

// Middleware de manejo de errores global (debe ir al final)
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.io available on http://localhost:${PORT}`);
});
