import { Schema, model } from 'mongoose'


const SnetToken = new Schema({
  token: {
    type: String,
    trim: true,
  } 
},
  {
    timestamps: true,
    versionKey: false
  }
)

const Token = model('Token', SnetToken)
export default Token
