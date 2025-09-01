const mongoose = require("mongoose");

const positionEmbeddedSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    qty: { type: Number, required: true },
    avg: { type: Number, required: true },
    product: { type: String, enum: ["CNC", "MIS", "NRML"], default: "CNC" },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

module.exports = positionEmbeddedSchema;
