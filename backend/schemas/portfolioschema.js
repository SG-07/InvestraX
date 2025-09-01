const mongoose = require("mongoose");
const holdingEmbeddedSchema = require("./embeds/holdingembedded");
const positionEmbeddedSchema = require("./embeds/positionembedded");
const watchlistEmbeddedSchema = require("./embeds/watchlistembedded");
const transactionEmbeddedSchema = require("./embeds/transactionembedded");

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },

  balance: { type: Number, default: 1000000 },
  holdings: [holdingEmbeddedSchema],
  positions: [positionEmbeddedSchema],
  watchlist: [watchlistEmbeddedSchema],
  transactions: [transactionEmbeddedSchema],
  
  // Derived fields
  totalValue: { type: Number, default: 1000000 },
  investedValue: { type: Number, default: 0 },
  profitLoss: { type: Number, default: 0 },

  updatedAt: { type: Date, default: Date.now },
});

module.exports = portfolioSchema;
