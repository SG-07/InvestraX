const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
  symbol: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

watchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });

module.exports = watchlistSchema;