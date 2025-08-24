const mongoose = require("mongoose");

const holdingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
  symbol: { type: String, required: true },
  qty: { type: Number, required: true, min: 0 },
  avg: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = holdingSchema;
