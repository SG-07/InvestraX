const StocksModel = require("../../Models/StocksModel");
const updateBatch = require("./updateBatch");
const { uniq } = require("./helpers");

async function updateAllStocks() {
  const docs = await StocksModel.find({}, "symbol").lean();
  const symbols = uniq(docs.map((d) => d.symbol));
  if (!symbols.length) return console.log("⚠️ No stocks in DB to update");

  const batchSize = 10;
  for (let i = 0; i < symbols.length; i += batchSize) {
    const batch = symbols.slice(i, i + batchSize);
    console.log(`📡 Updating all-stocks batch ${i / batchSize + 1}/${Math.ceil(symbols.length / batchSize)}...`);
    await updateBatch(batch);
  }
}

module.exports = updateAllStocks;