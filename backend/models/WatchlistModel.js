const mongoose = require("mongoose");
const watchlistSchema = require("../schemas/watchlistschema");
module.exports = mongoose.models.Watchlist || mongoose.model("Watchlist", watchlistSchema);