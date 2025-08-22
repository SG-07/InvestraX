const mongoose = require("mongoose");

const StocksSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String },
  lastPrice: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: null },  
});

module.exports = mongoose.model("stocks", StocksSchema);