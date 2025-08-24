const Holdings = require("../../models/holdingsmodel");
const { updateBatch } = require("./batch");
const { uniq } = require("../../utils/helper");

async function updateHoldingsSymbols() {
  try {
    const holdings = await Holdings.find({}, "symbol").lean();
    const symbols = uniq(holdings.map(h => h.symbol));
    if (!symbols.length) {
      return console.log("ℹ️ No holdings to update");
    }

    console.log("📡 Updating holdings...");
    await updateBatch(symbols);
  } catch (err) {
    console.error("❌ Error updating holdings:", err.message);
  }
}

module.exports = { updateHoldingsSymbols };