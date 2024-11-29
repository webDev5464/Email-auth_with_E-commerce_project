import jwt from "jsonwebtoken"

export default async function UserTokenAccess(req, res, next) {
  try {
    const token = req.cookies.userToke
    const decoded = jwt.verify(token, "secureKey")
    req.userKey = decoded.userId

    next()
  } catch (err) {
    res.status(400).send({
      process: false,
      message: 'Invalid token',
    })
  }
}
