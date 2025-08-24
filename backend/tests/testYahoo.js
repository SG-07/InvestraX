const { fetchQuotes, fetchQuote } = require("../services/yahoo");

(async () => {
  console.log("🔎 Testing single fetch for RELIANCE.NS");
  const quote = await fetchQuote("RELIANCE.NS");
  console.log("Result:", quote?.regularMarketPrice);

  console.log("\n🔎 Testing batch fetch for [TCS.NS, INFY.NS]");
  const quotes = await fetchQuotes(["TCS.NS", "INFY.NS"]);
  quotes.forEach((q) => {
    console.log(`→ ${q.symbol}: ₹${q.regularMarketPrice}`);
  });
})();