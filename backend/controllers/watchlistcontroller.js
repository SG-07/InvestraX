const Watchlist = require("../models/watchlistmodel");
const Stocks = require("../models/stocksmodel");

exports.list = async (req, res) => {
  const userId = req.user._id;
  const items = await Watchlist.find({ userId }).lean();

  const out = [];
  for (const w of items) {
    const s = await Stocks.findOne({ symbol: w.symbol }).lean();
    out.push({
      symbol: w.symbol,
      name: s?.name ?? w.symbol,
      price: s?.lastPrice ?? 0,
      percent: "",      // optional
      isDown: false     // optional
    });
  }
  res.json({ data: out });
};

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

exports.remove = async (req, res) => {
  const userId = req.user._id;
  const { symbol } = req.params;
  await Watchlist.deleteOne({ userId, symbol });
  res.json({ success: true });
};
