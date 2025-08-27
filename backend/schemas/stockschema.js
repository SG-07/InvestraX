const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  category: { type: String, default: "General" },
  price: { type: Number, default: 0 },
  priceopen: { type: Number, default: 0 },
  high: { type: Number, default: 0 },
  low: { type: Number, default: 0 },
  volume: { type: Number, default: 0 },
  dataDelay: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = stockSchema;