const mongoose = require("mongoose");

const transactionEmbeddedSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["BUY", "SELL"], required: true },
    symbol: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: ["L", "S"] },
    date: { type: Date, default: Date.now },
  },
  { _id: false, toJSON: { virtuals: true } }
);

transactionEmbeddedSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.date = obj.date.toISOString(); // convert date to string
  return obj;
};

module.exports = transactionEmbeddedSchema;