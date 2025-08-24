const yahooFinance = require("yahoo-finance2").default;

yahooFinance.suppressNotices(["yahooSurvey"]);

/**
 * Fetch quotes for one or multiple symbols
 * @param {string|string[]} symbols
 */
async function fetchQuotes(symbols) {
  try {
    const result = await yahooFinance.quote(symbols);
    return Array.isArray(result) ? result : [result];
  } catch (err) {
    console.error("❌ Yahoo API error:", err.message);
    return [];
  }
}

/**
 * Fetch single quote by symbol
 * @param {string} symbol
 */
async function fetchQuote(symbol) {
  try {
    return await yahooFinance.quote(symbol);
  } catch (err) {
    console.error(`❌ Yahoo API error for ${symbol}:`, err.message);
    return null;
  }
}

module.exports = { fetchQuotes, fetchQuote };