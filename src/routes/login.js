import { Router } from "express";
import { UserModel } from "../database/user.schema.js";
const route = Router();

const login = route.get("/api/login", async (req, res) => {
  // const data = { email, password } = req.body;
  // console.log(data);
  const user = await UserModel.findOne({email: 'villejsdev@gmail.com'}).populate('role').populate('permissions').exec() 
  console.log(user)
  // validar usuario
  if(!user) {
    return res.json({msg: 'no eres usuario'})
  }
  return res.status(200).json(user)
  // genera token
  //
});

export default login
