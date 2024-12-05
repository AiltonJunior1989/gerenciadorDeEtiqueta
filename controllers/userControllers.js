import User from '../models/userModel.js'

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

    const user = await User.create({
      re,
      nome,
      senha
    })

    res.status(201).json({ message: "Usuário registrado com sucesso" })

  } catch (err) {
    res.status(400).json({ message: err.message })
  }

}

export const loginUser = async (req, res) => {

}