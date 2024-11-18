import jwt from 'jsonwebtoken';

const tsk = process.env.TOKEN_SECRET;


export function createToken(id) {
  const token = jwt.sign({userId: id}, tsk, {expiresIn: '24h'})
  return token
}

