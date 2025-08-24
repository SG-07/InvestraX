const mongoose = require("mongoose");
const orderSchema = require("../schemas/ordersschema");
module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);