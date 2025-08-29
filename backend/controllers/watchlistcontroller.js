const Watchlist = require("../models/watchlistmodel");
const Stocks = require("../models/stocksmodel"); 
const formatStockData = require("../utils/formatStockData");


// Get user's watchlist with stock details
exports.list = async (req, res) => {
  const userId = req.user._id;
  const items = await Watchlist.find({ userId }).lean();

  const out = [];
  for (const w of items) {
    const s = await Stocks.findOne({ symbol: w.symbol }).lean();

    if (!s) continue;

    out.push({
      symbol: w.symbol,
      name: s.name,
      price: s.price ?? 0,
      change: s.change ?? 0,
      changepct: s.changepct ?? 0,
      isDown: (s.change ?? 0) < 0,
    });
  }
  res.json({ data: out });
};

// Add stock to watchlist
exports.add = async (req, res) => {
  const userId = req.user._id;
  const { symbol } = req.body;
  if (!symbol) return res.status(400).json({ error: "symbol required" });

  const doc = await Watchlist.findOneAndUpdate(
    { userId, symbol },
    { $setOnInsert: { userId, symbol } },
    { upsert: true, new: true }
  );
  res.status(201).json({ data: doc });
};

// Remove stock from watchlist
exports.remove = async (req, res) => {
  const userId = req.user._id;
  const { symbol } = req.params;
  await Watchlist.deleteOne({ userId, symbol });
  res.json({ success: true });
};

// Search stocks by name
exports.search = async (req, res) => {
  const { name } = req.query;
  if (!name || !name.trim())
    return res.status(400).json({ error: "Name is required" });

  try {
    const regex = new RegExp(name.trim(), "i");
    const stocks = await Stocks.find({ name: regex }).limit(10).lean();

    const result = stocks.map((s) => ({
      symbol: s.symbol,
      name: s.name,
      price: s.price,
      change: s.change,
      changepct: s.changepct,
    }));

    res.json({ data: result });
  } catch (err) {
    console.error("❌ Failed to search stocks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
