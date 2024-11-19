import { Router } from "express";
import { TokenModel } from "../database/token.db";

const logOut = Router()

logOut.post('/api/logOut', async (req, res) => {
  const delToken = await TokenModel.deleteMany({ client: user._id })
  console.log(delToken)
})
