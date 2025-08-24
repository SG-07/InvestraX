const mongoose = require("mongoose");
const { updateHoldingsSymbols } = require("./holdings");
const { updateWatchlistSymbols } = require("./watchlist");
const { updateAllStocks } = require("./allStocks");
const PositionsModel = require("../../models/positionsmodel");
const WatchlistModel = require("../../models/watchlistmodel");

async function startStockUpdater() {
  console.log("🚀 Stock updater running...");

  // Initial full refresh on boot
  console.log("⏳ Running initial full stock update...");
  await updateAllStocks();

  // update holdings every 30s
  setInterval(updateHoldingsSymbols, 30 * 1000);

  // update watchlist every 20s
  setInterval(updateWatchlistSymbols, 20 * 1000);

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