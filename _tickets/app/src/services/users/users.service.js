import { Router } from 'express'
import User from '../../db/schemas/users/user.js'
const users = Router()


users
  .get('/users', async (req, res, next) => {
    console.log(req.ip)  
    // validar roles: admin y god
    try {
      const ids = await User.usersIds()
      res.status(200).json(ids)
    } catch (error) {
      next(error)
    }

            
  })


export default users
