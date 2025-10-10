import {Schema, model } from 'mongoose'



export const CommentSchema = new Schema({
  body: {
    type: String,
    required: [true, "El comentario es obligatorio"],
    trim: true,
  },
  
  author: {
    type: Schema.Types.Mixed, // Usamos Mixed para aceptar ObjectId o String
    // required: [true, "El creador del comentario es obligatorio"],
 },

},
  {
  timestamps: true,
  versionKey: false
}
)
const Comments = model("Comments", CommentSchema);
export default Comments
