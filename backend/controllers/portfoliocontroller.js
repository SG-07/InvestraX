const Portfolio = require("../models/portfoliomodel");
const Stocks = require("../models/stocksmodel");

// Ensure portfolio exists
async function getPortfolio(userId) {
  return Portfolio.findOne({ userId }).lean();
}

/* ---------------- SUMMARY ---------------- */
exports.summary = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user._id }).lean();
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    let investedValue = 0;
    let currentValue = portfolio.balance;
    let todayPL = 0;

    const holdingsOut = [];
    for (const h of portfolio.holdings) {
      const s = await Stocks.findOne({ symbol: h.symbol }).lean();
      if (!s) continue;

      const ltp = s.price ?? 0;
      const prevClose = s.prevClose ?? ltp;

      const curVal = ltp * h.qty;
      const inv = h.avg * h.qty;

      investedValue += inv;
      currentValue += curVal;
      todayPL += (ltp - prevClose) * h.qty;

      holdingsOut.push({
        symbol: h.symbol,
        name: s?.name ?? h.symbol,
        product: "CNC",
        qty: h.qty,
        avg: h.avg,
        price: ltp,
        net: +(curVal - inv).toFixed(2),
        day: +((ltp - prevClose) * h.qty).toFixed(2),
        isLoss: curVal - inv < 0,
      });
    }

    const positionsOut = [];
    for (const p of portfolio.positions || []) {
      const s = await Stocks.findOne({ symbol: p.symbol }).lean();
      if (!s) continue;

      const ltp = s.price ?? 0;
      const prevClose = s.prevClose ?? ltp;

      const curVal = ltp * p.qty;
      const inv = p.avg * p.qty;

      positionsOut.push({
        symbol: p.symbol,
        name: s?.name ?? p.symbol,
        product: p.product ?? "NRML",
        qty: p.qty,
        avg: p.avg,
        price: ltp,
        net: +(curVal - inv).toFixed(2),
        day: +((ltp - prevClose) * p.qty).toFixed(2),
        isLoss: curVal - inv < 0,
      });
    }

    const watchlistOut = [];
    for (const w of portfolio.watchlist) {
      const s = await Stocks.findOne({ symbol: w.symbol }).lean();
      if (s) {
        watchlistOut.push({
          symbol: s.symbol,
          name: s.name,
          price: s.price ?? 0,
          change: s.change ?? 0,
          changepct: s.changepct ?? 0,
          isDown: (s.change ?? 0) < 0,
        });
      }
    }

    const profitLoss = currentValue - investedValue;

    res.json({
      balance: portfolio.balance,
      investedValue: +investedValue.toFixed(2),
      totalValue: +currentValue.toFixed(2),
      todayPL: +todayPL.toFixed(2),
      profitLoss: +profitLoss.toFixed(2),
      holdings: holdingsOut,
      positions: positionsOut,
      watchlist: watchlistOut,
      transactions: portfolio.transactions.slice(-10).reverse(), // last 10
    });
  } catch (err) {
    console.error("❌ Error in portfolio summary:", err);
    res.status(500).json({ message: "Failed to fetch summary" });
  }
};


/* ---------------- TRANSACTIONS ---------------- */
exports.transactions = async (req, res) => {
  try {
    const portfolio = await getPortfolio(req.user._id);
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    res.json({ transactions: portfolio.transactions });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

/* ---------------- HOLDINGS ---------------- */
exports.holdings = async (req, res) => {
  try {
    const portfolio = await getPortfolio(req.user._id);
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    const out = [];
    for (const h of portfolio.holdings) {
      const s = await Stocks.findOne({ symbol: h.symbol }).lean();
      if (!s) continue;

      const ltp = s.price ?? 0;
      const prevClose = s.prevClose ?? ltp;

      const curVal = ltp * h.qty;
      const inv = h.avg * h.qty;

      out.push({
        symbol: h.symbol,
        name: s?.name ?? h.symbol,
        product: "CNC", // holdings are always CNC (cash & carry)
        qty: h.qty,
        avg: h.avg,
        price: ltp,
        net: +(curVal - inv).toFixed(2),            // overall P&L
        day: +((ltp - prevClose) * h.qty).toFixed(2), // daily P&L
        isLoss: curVal - inv < 0,
      });
    }

    res.json({ data: out });
  } catch (err) {
    console.error("❌ Error in portfolio holdings:", err);
    res.status(500).json({ message: "Failed to fetch holdings" });
  }
};

/* ---------------- POSITIONS ---------------- */
exports.positions = async (req, res) => {
  try {
    const portfolio = await getPortfolio(req.user._id);
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    const out = [];
    for (const p of portfolio.positions || []) {
      const s = await Stocks.findOne({ symbol: p.symbol }).lean();
      if (!s) continue;

      const ltp = s.price ?? 0;
      const prevClose = s.prevClose ?? ltp;

      const curVal = ltp * p.qty;
      const inv = p.avg * p.qty;

      out.push({
        symbol: p.symbol,
        name: s?.name ?? p.symbol,
        product: p.product ?? "NRML", // default for F&O / intraday
        qty: p.qty,
        avg: p.avg,
        price: ltp,
        net: +(curVal - inv).toFixed(2),            // overall P&L
        day: +((ltp - prevClose) * p.qty).toFixed(2), // daily P&L
        isLoss: curVal - inv < 0,
      });
    }

    res.json({ data: out });
  } catch (err) {
    console.error("❌ Error in portfolio positions:", err);
    res.status(500).json({ message: "Failed to fetch positions" });
  }
};

/* ---------------- WATCHLIST ---------------- */
exports.watchlist = async (req, res) => {
  try {
    const portfolio = await getPortfolio(req.user._id);
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    const out = [];
    for (const w of portfolio.watchlist) {
      const s = await Stocks.findOne({ symbol: w.symbol }).lean();
      if (s) {
        out.push({
          symbol: s.symbol,
          name: s.name,
          price: s.price ?? 0,
          change: s.change ?? 0,
          changepct: s.changepct ?? 0,
          isDown: (s.change ?? 0) < 0,
        });
      }
    }
    res.json({ data: out });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch watchlist" });
  }
};

exports.addWatchlist = async (req, res) => {
  const { symbol } = req.body;
  if (!symbol) return res.status(400).json({ error: "Symbol required" });

  const portfolio = await Portfolio.findOne({ userId: req.user._id });
  if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

  if (!portfolio.watchlist.some(w => w.symbol === symbol)) {
    portfolio.watchlist.push({ symbol });
    await portfolio.save();
  }
  res.status(201).json({ data: portfolio.watchlist });
};

exports.removeWatchlist = async (req, res) => {
  const { symbol } = req.params;
  const portfolio = await Portfolio.findOne({ userId: req.user._id });
  if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

  portfolio.watchlist = portfolio.watchlist.filter(w => w.symbol !== symbol);
  await portfolio.save();

  res.json({ success: true });
};

/* ---------------- ORDERS (alias) ---------------- */
exports.orders = async (req, res) => {
  try {
    const portfolio = await getPortfolio(req.user._id);
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    res.json({ data: portfolio.transactions });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


/* ---------------- Stocks Breakdown ---------------- */
exports.breakdown = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user._id }).lean();
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    const allocations = [];
    let totalValue = 0;

    // Calculate current value of each holding
    for (const h of portfolio.holdings) {
      const s = await Stocks.findOne({ symbol: h.symbol }).lean();
      if (!s) continue;

      const ltp = s.price ?? 0;
      const curVal = ltp * h.qty;
      totalValue += curVal;

      allocations.push({
        symbol: h.symbol,
        name: s?.name ?? h.symbol,
        value: curVal,
      });
    }

    // Convert to percentages
    const breakdown = allocations.map(item => ({
      symbol: item.symbol,
      name: item.name,
      value: +item.value.toFixed(2),
      percentage: totalValue > 0 ? +((item.value / totalValue) * 100).toFixed(2) : 0
    }));

    res.json({
      totalValue: +totalValue.toFixed(2),
      breakdown
    });

  } catch (err) {
    console.error("❌ Error in portfolio breakdown:", err);
    res.status(500).json({ message: "Failed to fetch breakdown" });
  }
};

/* ---------------- SELL INFO ---------------- */
exports.sellInfo = async (req, res) => {
  try {
    const { symbol, type } = req.params; // type = 'holding' | 'position'
    const portfolio = await Portfolio.findOne({ userId: req.user._id }).lean();
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    let item;
    if (type === "holding") {
      item = portfolio.holdings.find(h => h.symbol === symbol);
    } else if (type === "position") {
      item = portfolio.positions.find(p => p.symbol === symbol);
    }

    if (!item) return res.status(404).json({ message: `${type} not found` });

    const stock = await Stocks.findOne({ symbol: symbol }).lean();
    if (!stock) return res.status(404).json({ message: "Stock data not found" });

    const ltp = stock.price ?? 0;
    const currentValue = +(ltp * item.qty).toFixed(2);
    const investedValue = +(item.avg * item.qty).toFixed(2);
    const profitLoss = +(currentValue - investedValue).toFixed(2);
    const profitLossPct = investedValue > 0 ? +((profitLoss / investedValue) * 100).toFixed(2) : 0;

    res.json({
      symbol: item.symbol,
      name: stock?.name ?? item.symbol,
      qty: item.qty,
      avgBuyPrice: item.avg,
      currentPrice: ltp,
      currentValue,
      investedValue,
      profitLoss,
      profitLossPct
    });
  } catch (err) {
    console.error("❌ Error in sell info:", err);
    res.status(500).json({ message: "Failed to fetch sell info" });
  }
};