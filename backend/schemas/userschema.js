const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const holdingSchema = require("./holdingschema");
const transactionSchema = require("./transactionschema");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 200000 }, // ₹2L starting balance
  holdings: [holdingSchema],
  transactions: [transactionSchema],
  createdAt: { type: Date, default: Date.now },
});

// Password hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = userSchema;
