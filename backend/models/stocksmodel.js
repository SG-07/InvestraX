const mongoose = require("mongoose");
const stockSchema = require("../schemas/stockschema");
module.exports = mongoose.models.Stock || mongoose.model("Stock", stockSchema);