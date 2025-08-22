require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");

const PositionsModel = require("../../Models/PositionsModel");
const WatchlistModel = require("../../Models/WatchlistModel");

const updateAllStocks = require("./updateAll");
const updateHoldings = require("./updateHoldings");
const updateWatchlist = require("./updateWatchlist");
const updateRest = require("./updateRest");

async function startUpdater() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("✅ Connected to MongoDB for stock updater");

  // holdings every 30s
  setInterval(updateHoldings, 30 * 1000);

  // watchlist every 60s
  setInterval(updateWatchlist, 60 * 1000);

  // rest every 5min
  setInterval(updateRest, 5 * 60 * 1000);

  // if user has NO holdings & NO watchlist → update ALL every 60s
  setInterval(async () => {
    const [hc, wc] = await Promise.all([
      PositionsModel.countDocuments(),
      WatchlistModel.countDocuments(),
    ]);
    if (hc === 0 && wc === 0) {
      console.log("📡 No holdings/watchlist → updating ALL stocks...");
      await updateAllStocks();
    }
  }, 60 * 1000);

  // initial run
  const [hc, wc] = await Promise.all([
    PositionsModel.countDocuments(),
    WatchlistModel.countDocuments(),
  ]);
  if (hc === 0 && wc === 0) {
    await updateAllStocks();
  } else {
    await updateHoldings();
    await updateWatchlist();
  }
}

startUpdater();