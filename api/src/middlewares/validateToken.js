import jwt from 'jsonwebtoken'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies
  if (!token)
    return res
      .status(401)
      .json({ error: 'No tiene autorizacion para esta peticion' })

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalido' })
    }
    req.user = user
    next()
  })
}
