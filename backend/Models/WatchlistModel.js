const mongoose = require("mongoose");
const watchlistSchema = require("../Schemas/WatchlistSchema");
module.exports = mongoose.models.Watchlist || mongoose.model("Watchlist", watchlistSchema);