const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
  symbol: { type: String, required: true },
  qty: { type: Number, required: true }, // intraday / open P&L context
  avg: { type: Number, required: true },
  product: { type: String, enum: ["CNC", "MIS", "NRML"], default: "CNC" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = positionSchema;
