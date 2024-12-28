import jwt from "jsonwebtoken"

export const validateToken = async (req, res, next) => {
  // console.log("Entrei")
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if(!authHeader) {
    return res.status(401).json({message: "Acesso negado!"})
  }
  // console.log(authHeader)
  let token = authHeader.split(' ')[1]
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" })
  }
  try {

    const decoded = jwt.verify(token, process.env.SECRET)
    console.log(decoded.user)
    req.user = decoded.user
    next()

  } catch (error) {
    return res.status(400).json({ message: "Token inválido" })
  }
}
