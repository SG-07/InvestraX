const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["BUY", "SELL", "RESET"], required: true },
  symbol: { type: String },
  qty: { type: Number },
  price: { type: Number },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

module.exports = transactionSchema;
