//
// import { getUserById } from "../database/libs/getUser.js";
//
// export async function hasPermissions(req, res, next) {
//   const { role, permissions } = await getUserById(req.userId);
//
//   if (role !== "admin" || !permissions.includes("all")) {
//     return res
//       .status(403)
//       .json({ error: "no tines permiso para realizar esta operacion" });
//   }
//   return next();
// }
