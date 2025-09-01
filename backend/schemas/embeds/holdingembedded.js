const mongoose = require("mongoose");

const holdingEmbeddedSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    qty: { type: Number, required: true, min: 0 },
    avg: { type: Number, required: true, min: 0 },

    investedValue: { type: Number, default: 0 },   // total money invested
    currentValue: { type: Number, default: 0 },    // market value (qty * live price)
    profitLoss: { type: Number, default: 0 },      // currentValue - investedValue

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

module.exports = holdingEmbeddedSchema;
