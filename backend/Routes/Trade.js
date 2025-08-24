const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");

// ✅ Buy stock
router.post("/buy", async (req, res) => {
  try {
    const { symbol, name, qty, price } = req.body;
    const user = await User.findById(req.user._id);

    const cost = qty * price;
    if (user.balance < cost) {
      return res.status(400).json({ error: "Not enough balance" });
    }

    // update holdings
    let stock = user.holdings.find(h => h.symbol === symbol);
    if (stock) {
      stock.avg = (stock.avg * stock.qty + price * qty) / (stock.qty + qty);
      stock.qty += qty;
    } else {
      user.holdings.push({ symbol, name, qty, avg: price });
    }

    user.balance -= cost;
    user.transactions.push({ type: "BUY", symbol, qty, price, amount: cost });
    await user.save();

    res.json({ success: true, balance: user.balance, holdings: user.holdings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Sell stock
router.post("/sell", async (req, res) => {
  try {
    const { symbol, qty, price } = req.body;
    const user = await User.findById(req.user._id);

    let stock = user.holdings.find(h => h.symbol === symbol);
    if (!stock || stock.qty < qty) {
      return res.status(400).json({ error: "Not enough stock to sell" });
    }

    const revenue = qty * price;
    stock.qty -= qty;
    if (stock.qty === 0) {
      user.holdings = user.holdings.filter(h => h.symbol !== symbol);
    }

    user.balance += revenue;
    user.transactions.push({ type: "SELL", symbol, qty, price, amount: revenue });
    await user.save();

    res.json({ success: true, balance: user.balance, holdings: user.holdings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Reset wallet
router.post("/reset", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.balance = 200000;
    user.holdings = [];
    user.transactions.push({ type: "RESET", amount: 200000 });
    await user.save();

    res.json({ success: true, balance: user.balance, holdings: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get wallet info
router.get("/wallet", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ balance: user.balance, holdings: user.holdings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
