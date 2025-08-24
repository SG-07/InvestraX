const mongoose = require("mongoose");
const orderSchema = require("../Schemas/OrdersSchema");
module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);