const mongoose = require("mongoose");

const transactionEmbeddedSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["BUY", "SELL"], required: true },
    symbol: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true }, // qty * price
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

module.exports = transactionEmbeddedSchema;
