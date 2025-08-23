const mongoose = require("mongoose");
const orderSchema = require("../Schemas/OrderSchema");
module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);