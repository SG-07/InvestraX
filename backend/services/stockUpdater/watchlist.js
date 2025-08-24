const Watchlist = require("../../Models/WatchlistModel");
const { updateBatch } = require("./batch");
const { uniq } = require("../../utils/helper");

async function updateWatchlistSymbols() {
  try {
    const items = await Watchlist.find({}, "symbol").lean();
    const symbols = uniq(items.map(w => w.symbol));
    if (!symbols.length) {
      return console.log("ℹ️ No watchlist to update");
    }

    console.log("📡 Updating watchlist...");
    await updateBatch(symbols);
  } catch (err) {
    console.error("❌ Error updating watchlist:", err.message);
  }
}

module.exports = { updateWatchlistSymbols };