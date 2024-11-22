import { Router } from "express";
import { TokenModel } from "../database/token.db.js";

const logout = Router()

logout.post('/api/logout', async (req, res) => {
  const data = req.body
  const tokenId = data.token.split('|').pop()
  console.log(tokenId) 
  const delToken = await TokenModel.deleteOne({_id: tokenId})

  if(delToken) {
    console.log(delToken)
    return res.status(200).json({msg: 'logout success'}) 
  } 
  console.log('error')
  return res.status(400).json({msg: 'error al eliminar el token'})
})


export default logout
