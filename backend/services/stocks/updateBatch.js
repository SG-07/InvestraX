const yahooFinance = require("yahoo-finance2").default;
const StocksModel = require("../../Models/StocksModel");


async function updateBatch(symbols) {
  if (!symbols.length) return;

  try {
    const quotes = await yahooFinance.quote(symbols);
    const arr = Array.isArray(quotes) ? quotes : [quotes];

    for (const q of arr) {
      if (!q || !q.symbol) continue;

      const updated = await StocksModel.findOneAndUpdate(
        { symbol: q.symbol },
        {
          lastPrice: q.regularMarketPrice,
          updatedAt: new Date(),
          lastUpdated: new Date(),
        },
        { new: true }
      );

      if (updated) {
        console.log(`✅ Updated ${q.symbol}: ₹${q.regularMarketPrice}`);
      } else {
        console.log(`⚠️ Skipping unknown stock (not in DB): ${q.symbol}`);
      }
    }
  } catch (err) {
    console.error("❌ Error updating batch:", err.message);
  }
}

module.exports = updateBatch;