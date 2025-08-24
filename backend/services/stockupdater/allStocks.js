const Stocks = require("../../models/stocksmodel");
const { fetchQuotes } = require("../yahoo");
const { uniq, diff } = require("../../utils/helper");

const STALE_MS = 60 * 1000; // 1 minute

// Small helper: break an array into chunks
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

async function updateAllStocks() {
  console.log("📡 Updating all stale stocks...");

  try {
    const cutoff = new Date(Date.now() - STALE_MS);

    // Only get stocks that are stale or missing updatedAt
    const staleStocks = await Stocks.find({
      $or: [
        { updatedAt: { $lt: cutoff } },
        { updatedAt: { $exists: false } },
      ],
    }).select("symbol");

    if (!staleStocks.length) {
      console.log("ℹ️ No stale stocks to update");
      return;
    }

    const symbols = uniq(staleStocks.map((s) => s.symbol));
    const batches = chunk(symbols, 10);

    for (let i = 0; i < batches.length; i++) {
      console.log(`📡 Updating batch ${i + 1}/${batches.length}...`);

      const quotes = await fetchQuotes(batches[i]);
      const list = Array.isArray(quotes) ? quotes : [quotes];

      // Symbols that successfully came back from Yahoo
      const returnedSymbols = list.filter(Boolean).map((q) => q.symbol);
      // Find which symbols failed
      const failedSymbols = diff(batches[i], returnedSymbols);

      for (const q of list) {
        if (!q) continue; // skip null
        await Stocks.updateOne(
          { symbol: q.symbol },
          {
            lastPrice: q.regularMarketPrice,
            updatedAt: new Date(),
          }
        );
        console.log(`✅ Updated ${q.symbol}: ₹${q.regularMarketPrice}`);
      }

      if (failedSymbols.length) {
        console.warn(`⚠️ Failed to fetch: ${failedSymbols.join(", ")}`);
      }
    }

    console.log("🎯 Done updating stale stocks");
  } catch (err) {
    console.error("❌ Error in updateAllStocks:", err.message);
  }
}

module.exports = { updateAllStocks };