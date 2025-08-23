const mongoose = require("mongoose");
const portfolioSchema = require("../Schemas/PortfolioSchema");
module.exports = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);