const Stocks = require("../../models/stocksmodel");
const { fetchQuotes } = require("../yahoo");

async function updateBatch(symbols) {
  try {
    const quotes = await fetchQuotes(symbols);

    for (const q of quotes) {
      if (!q || !q.symbol) continue;

      await Stocks.findOneAndUpdate(
        { symbol: q.symbol },
        {
          lastPrice: q.regularMarketPrice,
          updatedAt: new Date(),
          lastUpdated: new Date(),
        },
        { upsert: true }
      );

      console.log(`✅ Updated ${q.symbol}: ₹${q.regularMarketPrice}`);
    }
  } catch (err) {
    console.error("❌ Error in updateBatch:", err.message);
  }
}

module.exports = { updateBatch };