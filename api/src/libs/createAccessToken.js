import jwt from 'jsonwebtoken'
export default function createAccessToken(payload) {
  //payload, valor que se quiere guardar en el token
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: '1h',
      },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}
