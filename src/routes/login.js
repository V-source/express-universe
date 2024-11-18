import { Router } from "express";
import { UserModel } from "../database/user.schema.js";
import { createToken } from "../utils/token.util.js";
const route = Router();

const login = route.post("/api/login", async (req, res) => {
  const errors = {
    login: ''
  }
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
// ──────────────────────────────────────────────────────────────────────
// ╭─────────────────────────────────────────────────────────╮
// │                     VALIDAR USUARIO                     │
// ╰─────────────────────────────────────────────────────────╯
  if (!user) {
    errors.login = ['usuario y/o contraseña inválidos']
    return res.status(401).json(errors);
  }
// ──────────────────────────────────────────────────────────────────────
// ╭─────────────────────────────────────────────────────────╮
// │                   VALIDAR CONTRASEÑA                    │
// ╰─────────────────────────────────────────────────────────╯
  if (user.password !== password) {
    errors.login = ['usuario y/o contraseña inválidos']
    return res.status(401).json(errors);
  }
// ──────────────────────────────────────────────────────────────────────
// ╭─────────────────────────────────────────────────────────╮
// │                      GENERA TOKEN                       │
// ╰─────────────────────────────────────────────────────────╯
  const token = createToken(user._id);
  console.log(token)

// ──────────────────────────────────────────────────────────────────────
  res
    .header("Autrhorization", token)
    .status(200)
    .json({ auth: true, msg: "success" });
});

export default login;
