const StocksModel = require("../../Models/StocksModel");
const PositionsModel = require("../../Models/PositionsModel");
const WatchlistModel = require("../../Models/WatchlistModel");
const updateBatch = require("./updateBatch");
const { uniq, diff } = require("./helpers");

async function updateRest() {
  const [allDocs, hDocs, wDocs] = await Promise.all([
    StocksModel.find({}, "symbol").lean(),
    PositionsModel.find({}, "symbol").lean(),
    WatchlistModel.find({}, "symbol").lean(),
  ]);

  const all = uniq(allDocs.map((d) => d.symbol));
  const focused = uniq([...hDocs.map((d) => d.symbol), ...wDocs.map((d) => d.symbol)]);

  if (!all.length) return;
  if (focused.length === 0) {
    console.log("ℹ️ No holdings/watchlist → skipping ‘rest’ update.");
    return;
  }

  const rest = diff(all, focused);
  if (!rest.length) {
    console.log("ℹ️ No rest symbols to update.");
    return;
  }

  const batchSize = 10;
  for (let i = 0; i < rest.length; i += batchSize) {
    const batch = rest.slice(i, i + batchSize);
    console.log(`📡 Updating rest batch ${i / batchSize + 1}/${Math.ceil(rest.length / batchSize)}...`);
    await updateBatch(batch);
  }
}

module.exports = updateRest;