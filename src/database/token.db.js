import { Schema, model } from "mongoose"


const TokenSchema = new Schema(
  {
    client: {type: Schema.Types.ObjectId, ref: 'User'},
    token: {type: String},
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


export const TokenModel = model("Token", TokenSchema)
