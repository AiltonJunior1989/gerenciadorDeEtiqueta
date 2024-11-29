import Tag from "../models/tagModel.js"

export const getTags = async (req, res) => {
  try {
    const { dataInicial, dataFinal, tipo } = req.query

    // if(!dataInicial || !dataFinal || !tipo) {
    //   return dataInicial = null, dataFinal = null, tipo = null
    // }

    if (dataInicial || dataFinal || tipo) {
      const tags = await Tag.find({
        $or: [
          {
            criadaEm: {
              $gte: dataInicial
            }
          },
          {
            criadaEm: {
              $lte: dataFinal
            }
          },
          {
            tipo: {
              $eq: tipo
            }
          }
        ]
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
  const { tipo, area, maquina, subconjunto, conteudo } = req.body
  let data = new Date().toDateString()
  let dataVence = new Date().toDateString()
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
    encerradaEm: data
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

export const deleteTag = async (req,res) => {
  try {
    const id = req.params.id
    const tag = await Tag.findById(id)
    if (!tag) {
      throw new Error("Etiqueta não encontrada");
    }
    await Tag.findByIdAndDelete(id)
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

