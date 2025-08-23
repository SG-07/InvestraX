const mongoose = require("mongoose");
const stockSchema = require("../Schemas/StockSchema");
module.exports = mongoose.models.Stock || mongoose.model("Stock", stockSchema);