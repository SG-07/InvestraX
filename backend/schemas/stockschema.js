const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  category: { type: String, default: "General" },
  lastPrice: { type: Number, default: 0 },
  updatedAt: { type: Date, default: null },
  lastUpdated: { type: Date, default: null }, // from API fetch
});

module.exports = stockSchema;
