const mongoose = require("mongoose");
const holdingSchema = require("../Schemas/HoldingSchema");
module.exports = mongoose.models.Holding || mongoose.model("Holding", holdingSchema);