const mongoose = require("mongoose");

const watchlistEmbeddedSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

module.exports = watchlistEmbeddedSchema;
