const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symbol: { type: String, required: true },
  qty: { type: Number, required: true },
  avgPrice: { type: Number, required: true }, 
});

module.exports = mongoose.model("Portfolio", portfolioSchema);