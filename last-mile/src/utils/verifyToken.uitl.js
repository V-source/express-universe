import jwt from 'jsonwebtoken'
const skt = process.env.TOKEN_SECRET


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
