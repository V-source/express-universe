
import jwt from 'jsonwebtoken'

const skt = process.env.TOKEN_SECRET_SIGN


export function verifyToken(req, res, next) {
  try{

    const authHeader = req.headers.authorization

    if (typeof authHeader === 'undefined') return res.json({ error: 'no hay cabecera de autorización' })

    const token = authHeader.split(' ')[1]
    const payload = jwt.verify(token, skt)
    req.userId = payload.userId 
    next()
  } catch(error) {
    res.status(401).json({error: error.message})
  }

}



/*
 * el token retorna en su payload:
 * exp: es el tiempo de expiracion.
 * esto es útil para validar si el token ha expirado.
 * 
 * user try permite manejar el tiempo de expiracion del token
 * */


