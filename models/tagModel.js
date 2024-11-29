import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  maquina: {
    type: String,
    required: true
  },
  subconjunto: {
    type: String,
    required: true
  },
  conteudo: {
    type: String,
    required: true
  },
  criadaEm: {
    type: Date,
    required: true
  },
  venceEm:{
    type: Date,
    required: true
  },
  encerradaEm: {
    type: Date,
    required: true
  }
})

export default mongoose.model("Tag", tagSchema);