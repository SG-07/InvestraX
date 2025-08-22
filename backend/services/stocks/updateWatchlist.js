const WatchlistModel = require("../../Models/WatchlistModel");
const updateBatch = require("./updateBatch");
const { uniq } = require("./helpers");

async function updateWatchlist() {
  const docs = await WatchlistModel.find({}, "symbol").lean();
  const symbols = uniq(docs.map((d) => d.symbol));
  if (!symbols.length) return;
  console.log("📡 Updating watchlist...");
  await updateBatch(symbols);
}

module.exports = updateWatchlist;