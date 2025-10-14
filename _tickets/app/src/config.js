import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import fs from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import rateLimit from "express-rate-limit";

const NODE_ENV = process.env.NODE_ENV || "development";

const apiLimiter = rateLimit({
  // windowMs: 15 * 60 * 1000, // 15 minutos
  windowMs: 1 * 60 * 1000, // 1 minutos
  max: 100, // Máximo 100 peticiones por IP
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  message: {
    status: 429,
    message: "Demasiadas solicitudes desde esta IP, inténtalo más tarde.",
  },
  // warn: solucion temporal a la desconfianza en proxies no configurados con app.use('trust proxy', [string: ip'|boolean: true]);
  // validate: {xForwardedForHeader: false}
  validate: {
    xForwardedForHeader: false,
  },
  handler: (_req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});
const __dirname = dirname(fileURLToPath(import.meta.url));
const logStream = fs.createWriteStream(join(__dirname, "../access.log"), {
  flags: "a",
});

export default function serverConfig(server) {
  server.disable("x-powered-by"); // Evita exponer que es Express

  // mark: cors
  server.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*", // Ajusta según tu dominio
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  );

  // mark: helmet
  server.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://trusted.cdn.com"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
    }),
  );

  //mark: compresion
  server.use(compression()); // 🔥 Gzip para respuestas

  // mark: express
  server.use(express.json()); // Limitar payloads grandes
  server.use(express.urlencoded({ extended: true, limit: "10kb" }));

  //mark: morgan
  server.use(
    morgan(NODE_ENV === "production" ? "combined" : "dev", {
      stream: logStream,
    }),
  );

  // mark: proxy
  // NOTE: PARA NGROK POR AHORA
  server.set("trust proxy", "190.97.227.44");

  // mark: reate limiter
  server.use("/api", apiLimiter);
}
