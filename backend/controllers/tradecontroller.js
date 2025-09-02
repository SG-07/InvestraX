const Portfolio = require("../models/portfoliomodel");
const Stocks = require("../models/stocksmodel"); 

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
    const { symbol, quantity, price, type } = req.body;
    if (!symbol || !quantity || !price || quantity <= 0 || price <= 0 || !type) {
      return res.status(400).json({ message: "symbol, quantity, price, and type (L/S) are required" });
    }

    const userId = req.user._id;
    const portfolio = await getOrCreatePortfolio(userId);

    const cost = quantity * price;
    if (portfolio.balance < cost) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    if (type === "L") {
      // Long-term / holdings
      const h = portfolio.holdings.find(x => x.symbol === symbol);
      if (h) {
        h.avg = (h.avg * h.qty + cost) / (h.qty + quantity);
        h.qty += quantity;
      } else {
        portfolio.holdings.push({ symbol, qty: quantity, avg: price });
      }
    } else if (type === "S") {
      // Short-term / positions
      const p = portfolio.positions.find(x => x.symbol === symbol);
      if (p) {
        p.avg = (p.avg * p.qty + cost) / (p.qty + quantity);
        p.qty += quantity;
      } else {
        portfolio.positions.push({ symbol, qty: quantity, avg: price });
      }
    } else {
      return res.status(400).json({ message: "Invalid type. Use 'L' or 'S'" });
    }

    portfolio.balance -= cost;

    // Log transaction
    portfolio.transactions.push({
      type: "BUY",
      symbol,
      qty: quantity,
      price,
      amount: cost,
      category: type,
      date: new Date(),
    });

    portfolio.updatedAt = new Date();
    await portfolio.save();

    return res.json({
      success: true,
      balance: portfolio.balance,
      holdings: portfolio.holdings,
      positions: portfolio.positions,
    });
  } catch (err) {
    console.error("❌ [buyStock] error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// SELL stock
exports.sellStock = async (req, res) => {
  try {
    const { symbol, quantity, type } = req.body;
    if (!symbol || !quantity || quantity <= 0 || !type) {
      console.warn("⚠️ Invalid request payload:", req.body);
      return res.status(400).json({ message: "symbol, quantity, and type (L/S) are required" });
    }

    if (!req.user || !req.user._id) {
      console.error("❌ req.user is missing. Auth middleware not attaching user?");
      return res.status(401).json({ message: "Unauthorized - user not found" });
    }

    const userId = req.user._id;
    const portfolio = await getOrCreatePortfolio(userId);

    let arr;
    if (type === "L") arr = portfolio.holdings || [];
    else if (type === "S") arr = portfolio.positions || [];
    else {
      console.warn("⚠️ Invalid type provided:", type);
      return res.status(400).json({ message: "Invalid type. Use 'L' or 'S'" });
    }

    const item = arr.find(x => x.symbol === symbol);
    if (!item || item.qty < quantity) {
      console.warn(`⚠️ Not enough shares to sell. Found:`, item);
      return res.status(400).json({ message: "Not enough shares to sell" });
    }

    const stock = await Stocks.findOne({ symbol }).lean();
    if (!stock) {
      console.error("❌ Stock not found in DB:", symbol);
      return res.status(404).json({ message: "Stock data not found" });
    }

    const ltp = stock.price ?? 0;

    const proceeds = quantity * ltp;
    item.qty -= quantity;
    if (item.qty === 0) {
      arr.splice(arr.indexOf(item), 1);
    }

    portfolio.balance += proceeds;

    // Log transaction
    portfolio.transactions.push({
      type: "SELL",
      symbol,
      qty: quantity,
      price: ltp, // ✅ backend price
      amount: proceeds,
      category: type,
      date: new Date(),
    });

    portfolio.updatedAt = new Date();
    await portfolio.save();

    return res.json({
      success: true,
      balance: portfolio.balance,
      holdings: portfolio.holdings,
      positions: portfolio.positions,
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
