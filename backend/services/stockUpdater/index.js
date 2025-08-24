const mongoose = require("mongoose");
const { updateHoldingsSymbols } = require("./holdings");
const { updateWatchlistSymbols } = require("./watchlist");
const { updateAllStocks } = require("./allStocks");
const PositionsModel = require("../../Models/PositionsModel");
const WatchlistModel = require("../../Models/WatchlistModel");

async function startStockUpdater() {
  console.log("🚀 Stock updater running...");

  // update holdings every 30s
  setInterval(updateHoldingsSymbols, 30 * 1000);

  // update watchlist every 60s
  setInterval(updateWatchlistSymbols, 60 * 1000);

  // update all stocks every 5 min if user has nothing in holdings/watchlist
  setInterval(async () => {
    const holdingsCount = await PositionsModel.countDocuments();
    const watchlistCount = await WatchlistModel.countDocuments();

    if (holdingsCount === 0 && watchlistCount === 0) {
      console.log("📡 User has no holdings/watchlist → Updating all stocks...");
      await updateAllStocks();
    }
  }, 5 * 60 * 1000);
}

module.exports = { startStockUpdater };