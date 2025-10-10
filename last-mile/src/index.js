import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fs from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import login from "./routes/login.js";
import initDb from "./database/index.db.js";
import createRolesAndPermissions from "./database/seed.js";
import instalation from "./routes/instalation.js";
import logout from "./routes/logout.js";

// ──────────────────────────────────────────────────────────────────────
// ╭─────────────────────────────────────────────────────────╮
// │                        CONSTANTS                        │
// ╰─────────────────────────────────────────────────────────╯
const server = express();
const PORT = process.env.PORT || 9999;
const __dirname = dirname(fileURLToPath(import.meta.url));
const logStream = fs.createWriteStream(join(__dirname, process.env.LOGS_DIR), {
  flags: "a",
});

// ──────────────────────────────────────────────────────────────────────
// ╭─────────────────────────────────────────────────────────╮
// │                         CONFIG                          │
// ╰─────────────────────────────────────────────────────────╯
server.use(
  cors({
    origin: '*',
    // origin: "http://localhost:5173",
    // origin: "exp://192.168.100.251:8081",
    credentials: true,
  }),
);
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan("combined", { stream: logStream }));

// ──────────────────────────────────────────────────────────────────────
// ╭─────────────────────────────────────────────────────────╮
// │                     DATABSE && SEED                     │
// ╰─────────────────────────────────────────────────────────╯
initDb()
createRolesAndPermissions()

// ──────────────────────────────────────────────────────────────────────

// ╭─────────────────────────────────────────────────────────╮
// │                          RUTAS                          │
// ╰─────────────────────────────────────────────────────────╯

server.get("/", (req, res) => {
  res.status(200).json({ msg: "express server" });
});

server.use(login)
server.use(instalation)
server.use(logout)

// ──────────────────────────────────────────────────────────────────────
// ╭─────────────────────────────────────────────────────────╮
// │                      ERROR HANDLER                      │
// ╰─────────────────────────────────────────────────────────╯

server.use((error, _req, _res, next) => {
  if (error?.json) {
    console.log(error.json());
  } else {
    // console.log('Handled Error: '+error?.message)
    console.log(error.stack);
  }
  next();
});
// ──────────────────────────────────────────────────────────────────────
// ╭─────────────────────────────────────────────────────────╮
// │                     RUN THE SERVER                      │
// ╰─────────────────────────────────────────────────────────╯
server.listen(PORT, () => {
  console.log(`server on port: ${PORT}`);
});

