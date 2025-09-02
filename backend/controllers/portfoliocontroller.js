const Portfolio = require("../models/portfoliomodel");
const Stocks = require("../models/stocksmodel");

// ----------------------
// Helpers
// ----------------------

// Ensure portfolio exists
async function getPortfolio(userId) {
  const portfolio = await Portfolio.findOne({ userId }).lean();
  if (!portfolio) return null;

  // Convert transaction dates to ISO strings
  const transactions = (portfolio.transactions || []).map(tx => ({
    ...tx,
    date: tx.date instanceof Date ? tx.date.toISOString() : tx.date
  }));

  return { ...portfolio, transactions };
}

/* ---------------- SUMMARY ---------------- */
exports.summary = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user._id }).lean();
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    let investedValue = 0;
    let currentValue = portfolio.balance; // include available balance
    let todayPL = 0;

    const holdingsOut = [];
    for (const h of portfolio.holdings) {
      const s = await Stocks.findOne({ symbol: h.symbol }).lean();
      if (!s) continue;

      const ltp = s.price ?? 0;
      const prevClose = s.prevClose ?? ltp;
      const curVal = ltp * h.qty;
      const inv = h.avg * h.qty;
      const net = curVal - inv;
      const day = (ltp - prevClose) * h.qty;

      investedValue += inv;
      currentValue += curVal;
      todayPL += day;

      // 🔍 Debug logs
      console.log("---- Holding Debug ----");
      console.log("Symbol:", h.symbol, "Qty:", h.qty, "Avg:", h.avg);
      console.log("LTP:", ltp, "Invested:", inv, "Current:", curVal, "Net P&L:", net, "Day P&L:", day);

      holdingsOut.push({
        symbol: h.symbol,
        name: s?.name ?? h.symbol,
        product: "CNC",
        qty: h.qty,
        avg: h.avg,
        price: ltp,
        investedValue: +inv.toFixed(2),
        currentValue: +curVal.toFixed(2),
        net: +net.toFixed(2),
        day: +day.toFixed(2),
        isLoss: net < 0,
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
      const net = curVal - inv;
      const day = (ltp - prevClose) * p.qty;

      // 🔍 Debug logs
      console.log("---- Position Debug ----");
      console.log("Symbol:", p.symbol, "Qty:", p.qty, "Avg:", p.avg);
      console.log("LTP:", ltp, "Invested:", inv, "Current:", curVal, "Net P&L:", net, "Day P&L:", day);

      positionsOut.push({
        symbol: p.symbol,
        name: s?.name ?? p.symbol,
        product: p.product ?? "NRML",
        qty: p.qty,
        avg: p.avg,
        price: ltp,
        investedValue: +inv.toFixed(2),
        currentValue: +curVal.toFixed(2),
        net: +net.toFixed(2),
        day: +day.toFixed(2),
        isLoss: net < 0,
      });
    }

    const watchlistOut = [];
    for (const w of portfolio.watchlist || []) {
      const s = await Stocks.findOne({ symbol: w.symbol }).lean();
      if (!s) continue;

      // 🔍 Debug logs
      console.log("---- Watchlist Debug ----");
      console.log("Symbol:", s.symbol, "Price:", s.price, "Change:", s.change, "Change%:", s.changepct);

      watchlistOut.push({
        symbol: s.symbol,
        name: s.name,
        price: s.price ?? 0,
        change: s.change ?? 0,
        changepct: s.changepct ?? 0,
        isDown: (s.change ?? 0) < 0,
      });
    }

    const profitLoss = currentValue - investedValue;
    const profitLossPct = investedValue > 0 ? (profitLoss / investedValue) * 100 : 0;

    // 🔍 Final Debug
    console.log("====== Portfolio Summary ======");
    console.log("Balance:", portfolio.balance);
    console.log("Invested:", investedValue);
    console.log("Total Current:", currentValue);
    console.log("Today P&L:", todayPL);
    console.log("Net P&L:", profitLoss);
    console.log("Net P&L %:", profitLossPct);

    // convert transaction dates before sending
    const transactionsOut = (portfolio.transactions || []).map(tx => ({
      ...tx,
      date: tx.date instanceof Date ? tx.date.toISOString() : tx.date
    }));

    res.json({
      balance: +portfolio.balance.toFixed(2),
      investedValue: +investedValue.toFixed(2),
      totalValue: +currentValue.toFixed(2),
      profitLoss: +profitLoss.toFixed(2),
      profitLossPct: +profitLossPct.toFixed(2),
      todayPL: +todayPL.toFixed(2),
      holdings: holdingsOut,
      positions: positionsOut,
      watchlist: watchlistOut,
      transactions: transactionsOut.slice(-10).reverse(),
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

    res.json(portfolio.transactions); // array directly
  } catch (err) {
    console.error("❌ Failed to fetch transactions:", err);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

/* ---------------- HOLDINGS ---------------- */
exports.holdings = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user._id }).lean();
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Fetch all stock symbols in holdings in one query
    const symbols = portfolio.holdings.map((h) => h.symbol);
    const stocks = await Stocks.find({ symbol: { $in: symbols } }).lean();

    // Lookup table for stocks
    const stockMap = {};
    stocks.forEach((s) => {
      stockMap[s.symbol] = s;
    });

    const data = portfolio.holdings.map((h) => {
      const s = stockMap[h.symbol];
      if (!s) return null;

      const ltp = s.price ?? 0;
      const change = s.change ?? 0;
      const changepct = s.changepct ?? 0;

      const investedValue = h.avg * h.qty;
      const currentValue = ltp * h.qty;
      const net = currentValue - investedValue;

      return {
        symbol: h.symbol,
        company: s.name ?? h.symbol,
        stocksQuantity: h.qty,
        avg: h.avg,
        price: ltp,

        // New fields for P&L
        investedValue: +investedValue.toFixed(2),
        currentValue: +currentValue.toFixed(2),
        net: +net.toFixed(2),

        // Day performance
        day: +(change * h.qty).toFixed(2),
        dayPct: +changepct.toFixed(2),
      };
    }).filter(Boolean);

    res.json({ data });
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
        product: p.product ?? "NRML",
        qty: p.qty,
        avg: p.avg,
        price: ltp,
        net: +(curVal - inv).toFixed(2),
        day: +((ltp - prevClose) * p.qty).toFixed(2),
        isLoss: curVal - inv < 0,
      });
    }

    res.json(out); // send array directly
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

    res.json(out); // send array directly
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch watchlist" });
  }
};

/* ---------------- WATCHLIST MUTATIONS ---------------- */
exports.addWatchlist = async (req, res) => {
  const { symbol } = req.body;
  if (!symbol) return res.status(400).json({ error: "Symbol required" });

  const portfolio = await Portfolio.findOne({ userId: req.user._id });
  if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

  if (!portfolio.watchlist.some(w => w.symbol === symbol)) {
    portfolio.watchlist.push({ symbol });
    await portfolio.save();
  }
  res.status(201).json(portfolio.watchlist); // send array directly
};

exports.removeWatchlist = async (req, res) => {
  const { symbol } = req.params;
  const portfolio = await Portfolio.findOne({ userId: req.user._id });
  if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

  portfolio.watchlist = portfolio.watchlist.filter(w => w.symbol !== symbol);
  await portfolio.save();

  res.json(portfolio.watchlist); // send updated array directly
};

/* ---------------- ORDERS (alias for transactions) ---------------- */
exports.orders = async (req, res) => {
  try {
    const portfolio = await getPortfolio(req.user._id);
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    res.json(portfolio.transactions); // send array directly
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
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

    const breakdown = allocations.map(item => ({
      symbol: item.symbol,
      name: item.name,
      value: +item.value.toFixed(2),
      percentage: totalValue > 0 ? +((item.value / totalValue) * 100).toFixed(2) : 0
    }));

    res.json(breakdown); // send array directly
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

    const stock = await Stocks.findOne({ symbol }).lean();
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
