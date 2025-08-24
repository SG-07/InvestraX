const Positions = require("../models/positionsmodel");
const Stocks = require("../models/stocksmodel");

exports.list = async (req, res) => {
  const userId = req.user._id;
  const positions = await Positions.find({ userId }).lean();

  const out = [];
  for (const p of positions) {
    const s = await Stocks.findOne({ symbol: p.symbol }).lean();
    const ltp = s?.lastPrice ?? 0;
    const curVal = ltp * p.qty;
    const inv = p.avg * p.qty;
    out.push({
      product: p.product,
      symbol: p.symbol,
      name: s?.name ?? p.symbol,
      qty: p.qty,
      avg: p.avg,
      price: ltp,
      day: 0,
      isLoss: curVal - inv < 0
    });
  }
  res.json({ data: out });
};
