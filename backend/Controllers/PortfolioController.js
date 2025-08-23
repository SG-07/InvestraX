const Holdings = require("../Models/HoldingsModel");
const Stocks = require("../Models/StocksModel");

exports.summary = async (req, res) => {
  const userId = req.user._id;
  const holdings = await Holdings.find({ userId }).lean();

  let investment = 0, currentValue = 0;
  for (const h of holdings) {
    const s = await Stocks.findOne({ symbol: h.symbol }).lean();
    const ltp = s?.lastPrice ?? 0;
    investment += h.avg * h.qty;
    currentValue += ltp * h.qty;
  }

  const pnl = currentValue - investment;
  const pnlPct = investment > 0 ? (pnl / investment) * 100 : 0;

  res.json({
    data: {
      investment: +investment.toFixed(2),
      currentValue: +currentValue.toFixed(2),
      pnl: +pnl.toFixed(2),
      pnlPct: +pnlPct.toFixed(2),
    },
  });
};
