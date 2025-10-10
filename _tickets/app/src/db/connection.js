import { createConnection } from "mongoose";
import { db1 } from "./db1/db1.js";

async function connectoDb() {
  try {
//  ── si hay mas de una db ────────────────────────────────────────────
    db1();
  } catch (error) {
    console.log(error);

  }
}

connectoDb();

