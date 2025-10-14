import { connect } from "mongoose";
import { seeder } from "../seeders/seeder.js";
import { usersSeed, rolesSeed, ticketsSeed, departmentsSeed } from "../seeders/seeds.js";
import User from "../schemas/users/user.js";
import Roles from "../schemas/roles/roles.schema.js";
import Tickets from "../schemas/tickets.schema.js";
import Department from "../schemas/departments/deparments.schema.js";

export async function db1() {
  try {
    const db1 = await connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log(`Conectado a la base de datos: ${db1.connections[0].name}`);
    //  ── mark: seeder ────────────────────────────────────────────────────
    // seeder(Roles, rolesSeed, "role");
    // seeder(User, usersSeed, "email");
    // seeder(Department, departmentsSeed, "name");
    // seeder(Tickets, ticketsSeed, "email");
    //   ──────────────────────────────────────────────────────────────────────
  } catch (error) {
    console.log(error);
  }
}
