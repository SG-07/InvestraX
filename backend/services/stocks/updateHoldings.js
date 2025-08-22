const PositionsModel = require("../../Models/PositionsModel");
const updateBatch = require("./updateBatch");
const { uniq } = require("./helpers");

async function updateHoldings() {
  const docs = await PositionsModel.find({}, "symbol").lean();
  const symbols = uniq(docs.map((d) => d.symbol));
  if (!symbols.length) return;
  console.log("📡 Updating holdings...");
  await updateBatch(symbols);
}

module.exports = updateHoldings;