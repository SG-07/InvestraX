const Holdings = require("../Models/HoldingsModel");
const Stocks = require("../Models/StocksModel");

exports.list = async (req, res) => {
  const userId = req.user._id;

  const holdings = await Holdings.find({ userId }).lean();

  // enrich from Stocks for latest price/name
  const out = [];
  for (const h of holdings) {
    const s = await Stocks.findOne({ symbol: h.symbol }).lean();
    const ltp = s?.lastPrice ?? 0;
    const name = s?.name ?? h.symbol;
    const curVal = ltp * h.qty;
    const inv = h.avg * h.qty;
    out.push({
      symbol: h.symbol,
      name,
      qty: h.qty,
      avg: h.avg,
      price: ltp,
      net: Number((curVal - inv).toFixed(2)),
      day: 0,           // placeholder unless you store day change
      isLoss: curVal - inv < 0
    });
  }

  res.json({ data: out });
};

exports.create = async (req, res) => {
  const userId = req.user._id;
  const { symbol, qty, avg } = req.body;
  if (!symbol || !qty || !avg) return res.status(400).json({ error: "symbol, qty, avg required" });

  const doc = await Holdings.create({ userId, symbol, qty, avg });
  res.status(201).json({ data: doc });
};
