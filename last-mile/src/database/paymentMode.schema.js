import mongoose, { Schema, model } from "mongoose"


const PaymentSchema = new Schema(
  {
    method: {type: String},
    amount: {type: mongoose.Types.Decimal128},
    reference: {type: String},

  },
  {
    timestamps: true,
    versionKey: false,
  },
);


export const PaymentModel = model("Payment", PaymentSchema)
