import User from '../models/userModel.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {

  try {
    const { re, nome, senha } = req.body
    if (!re || !nome || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos!" })
    }

    const userAvailable = await User.findOne({ re })
    if (userAvailable) {
      return res.status(400).json({ message: "Usuário já cadastrado!" })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const user = await User.create({
      re,
      nome,
      senha: senhaCriptografada
    })

    res.status(201).json({ message: "Usuário registrado com sucesso" })

  } catch (err) {
    res.status(400).json({ message: err.message })
  }

}

export const loginUser = async (req, res) => {
  const { re, senha } = req.body
  // console.log(req.body)

  if (!re || !senha) {
    return res.status(400).json({ message: "Preencha todos os campos!" })
  }

  const user = await User.findOne({ re })
  // console.log(user._id)
  if (!user) {
    return res.status(404).json({ message: "Usuário nã encontrado!" })
  }

  const confereSenha = await bcrypt.compare(senha, user.senha)

  if (!confereSenha) {
    return res.status(400).json({ message: "Senha incorreta, tente novamente!" })
  }

  const tokenAcesso = jwt.sign({
    user: {
      id: user._id,
      re: user.re,
      nome: user.nome
    }
  },
    process.env.SECRET
  )

  return res.status(200).json({ tokenAcesso })

}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    return res.status(200).json({
      user: user.nome,
      re: user.re,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}