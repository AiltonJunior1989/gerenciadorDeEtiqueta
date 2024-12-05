import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  re: {
    type: Number,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })

export default mongoose.model("User", userSchema)