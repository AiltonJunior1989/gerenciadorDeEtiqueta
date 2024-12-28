import Tag from "../models/tagModel.js"

export const getTags = async (req, res) => {
  console.log(req.user)
  try {
    const { dataInicial, dataFinal, tipo, area, maquina } = req.query
    // console.log(area, maquina)
    // console.log(dataInicial)
    // console.log(dataFinal)
    if (dataInicial && dataFinal && maquina) {
      const tags = await Tag.find({
        criadaEm: { $gte: new Date(dataInicial), $lte: new Date(dataFinal) },
        maquina: {$eq: maquina}
      })
      res.status(200).json({ tags: tags, qtd: tags.length })
    } else if (area && maquina) {
      const tags = await Tag.find({
        area: { $eq: area },
        maquina: { $eq: maquina }
      })
      res.status(200).json({ tags: tags, qtd: tags.length })
    } else if (area) {
      const tags = await Tag.find({
        area: { $eq: area }
      })
      res.status(200).json({ tags: tags, qtd: tags.length })
    } else {
      const tags = await Tag.find();
      res.status(200).json({ tags: tags, qtd: tags.length })
    }
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

export const createTags = async (req, res) => {
  console.log(req.body)
  console.log(req.user)
  const { tipo, area, maquina, subconjunto, conteudo } = req.body
  let data = new Date()
  let dataVence = new Date()
  // dataVence.setDate(data.getDate() + 30)
  // console.log(data)
  // console.log(dataVence)

  const tag = await Tag.create({
    tipo,
    area,
    maquina,
    subconjunto,
    conteudo,
    criadaEm: data,
    venceEm: dataVence,
    encerradaEm: data,
    userId: req.user.id
  })
  res.status(201).json({ message: 'Create Tag.' });
}

export const updateTag = async (req, res) => {
  try {
    const id = req.params.id
    const tag = await Tag.findById(id)
    if (!tag) {
      throw new Error("Etiqueta não encontrada");
    }
    const updateTag = await Tag.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(updateTag)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteTag = async (req, res) => {
  try {
    const id = req.params.id
    const tag = await Tag.findById(id)
    if (!tag) {
      throw new Error("Etiqueta não encontrada");
    }

    console.log(req.user)

    if(tag.userId.toString() !== req.user.id) {
      throw new Error("Você não pode excluir etiqueta que não é sua!");
    }

    await Tag.findByIdAndDelete(id)
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

