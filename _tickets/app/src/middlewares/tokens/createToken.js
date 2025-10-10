import jwt from 'jsonwebtoken';

const tsk = process.env.TOKEN_SECRET_SIGN;

export function createToken(id) {
  // const {id} = user;
  const token = jwt.sign({userId: id}, tsk, {expiresIn: '18h'})
  return token
}
