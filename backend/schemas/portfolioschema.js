const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = portfolioSchema;