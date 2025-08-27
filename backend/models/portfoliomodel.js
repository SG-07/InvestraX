const mongoose = require("mongoose");
const portfolioSchema = require("../schemas/portfolioschema");
module.exports = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);
