const Portfolio = require("../models/portfoliomodel");

// ----------------------
// Helpers
// ----------------------

// Ensure portfolio exists
async function getOrCreatePortfolio(userId) {
  let p = await Portfolio.findOne({ userId });
  if (!p) {
    p = await Portfolio.create({
      userId,
      balance: 1000000, // default ₹10L
      holdings: [],
      positions: [],
      transactions: [],
      watchlist: [],
    });
  }
  return p;
}

// ----------------------
// Controllers
// ----------------------

// BUY stock
exports.buyStock = async (req, res) => {
  try {
    const { symbol, qty, price } = req.body;
    if (!symbol || !qty || !price || qty <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ message: "symbol, qty (>0) and price (>0) are required" });
    }

    const userId = req.user._id;
    const portfolio = await getOrCreatePortfolio(userId);

    const cost = qty * price;
    if (portfolio.balance < cost) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update holdings (weighted avg)
    const h = portfolio.holdings.find((x) => x.symbol === symbol);
    if (h) {
      h.avg = (h.avg * h.qty + cost) / (h.qty + qty);
      h.qty += qty;
    } else {
      portfolio.holdings.push({ symbol, qty, avg: price });
    }

    // Update balance
    portfolio.balance -= cost;

    // Log transaction
    portfolio.transactions.push({
      type: "BUY",
      symbol,
      qty,
      price,
      amount: cost,
      date: new Date(),
    });

    portfolio.updatedAt = new Date();
    await portfolio.save();

    return res.json({
      success: true,
      balance: portfolio.balance,
      holdings: portfolio.holdings,
    });
  } catch (err) {
    console.error("❌ [buyStock] error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// SELL stock
exports.sellStock = async (req, res) => {
  try {
    const { symbol, qty, price } = req.body;
    if (!symbol || !qty || !price || qty <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ message: "symbol, qty (>0) and price (>0) are required" });
    }

    const userId = req.user._id;
    const portfolio = await getOrCreatePortfolio(userId);

    const h = portfolio.holdings.find((x) => x.symbol === symbol);
    if (!h || h.qty < qty) {
      return res.status(400).json({ message: "Not enough shares to sell" });
    }

    const proceeds = qty * price;
    h.qty -= qty;
    if (h.qty === 0) {
      portfolio.holdings = portfolio.holdings.filter((x) => x.symbol !== symbol);
    }

    portfolio.balance += proceeds;

    // Log transaction
    portfolio.transactions.push({
      type: "SELL",
      symbol,
      qty,
      price,
      amount: proceeds,
      date: new Date(),
    });

    portfolio.updatedAt = new Date();
    await portfolio.save();

    return res.json({
      success: true,
      balance: portfolio.balance,
      holdings: portfolio.holdings,
    });
  } catch (err) {
    console.error("❌ [sellStock] error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// RESET account
exports.resetAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const portfolio = await getOrCreatePortfolio(userId);

    portfolio.balance = 1000000; // reset to 10L
    portfolio.holdings = [];
    portfolio.positions = [];
    portfolio.watchlist = [];

    // Log reset transaction
    portfolio.transactions.push({
      type: "RESET",
      amount: 1000000,
      date: new Date(),
    });

    portfolio.updatedAt = new Date();
    await portfolio.save();

    res.json({
      success: true,
      balance: portfolio.balance,
      holdings: portfolio.holdings,
    });
  } catch (err) {
    console.error("❌ [resetAccount] error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// WALLET (alias for balance + transactions)
exports.getWallet = async (req, res) => {
  try {
    const portfolio = await getOrCreatePortfolio(req.user._id);
    res.json({
      balance: portfolio.balance,
      transactions: portfolio.transactions,
    });
  } catch (err) {
    console.error("❌ [getWallet] error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
