const yahooFinance = require("yahoo-finance2").default;

async function test() {
  try {
    const quote = await yahooFinance.quote("RELIANCE.NS");
    console.log("✅ RELIANCE:", quote.regularMarketPrice, quote.currency);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

test();