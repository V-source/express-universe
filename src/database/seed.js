import { PermissionsModel } from "./permissions.schema.js";
import { RolesModel } from "./roles.schema.js";
import { UserModel } from "./user.schema.js";

async function createRolesAndPermissions() {
  const role = { name: "admin", description: "root" };
  const permission = { name: "all", description: "god" };
  const user = {
    name: "elvis",
    email: "villejsdev@gmail.com",
    password: "password",
  };
  // ──────────────────────────────────────────────────────────────────────
  // ╭─────────────────────────────────────────────────────────╮
  // │             BUSCAR ROL, PERMISO Y USUAIRO               │
  // ╰─────────────────────────────────────────────────────────╯
  const isRole = await RolesModel.findOne(role);
  const isPermission = await PermissionsModel.findOne(permission);
  const isUser = await UserModel.findOne({ email: "villejsdev@gmail.com" });

  // ──────────────────────────────────────────────────────────────────────
  // ╭─────────────────────────────────────────────────────────╮
  // │              NUEVO ROL, PERMISO Y USUARIO               │
  // ╰─────────────────────────────────────────────────────────╯
  const newRole = new RolesModel(role);
  const newPermission = new PermissionsModel(permission);
  const newUser = new UserModel(user);
  // ──────────────────────────────────────────────────────────────────────
  // ╭─────────────────────────────────────────────────────────╮
  // │          VALIDAR SI NO EXISTEN PARA REGISTRAR           │
  // ╰─────────────────────────────────────────────────────────╯
  if (!isRole) {
    await newRole.save();
  }

  if (!isPermission) {
    await newPermission.save();
  }

  if (!isUser) {
    newUser.role = newRole;
    newUser.permissions = newPermission;
    await newUser.save();
  }
}

export default createRolesAndPermissions;
