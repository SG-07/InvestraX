const User = require("../Models/UserModel");

// BUY stock
exports.buyStock = async (req, res) => {
  try {
    const { symbol, qty, price } = req.body;
    const user = await User.findById(req.user._id);

    const cost = qty * price;
    if (user.balance < cost) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct balance & update holdings
    user.balance -= cost;
    let holding = user.holdings.find(h => h.symbol === symbol);
    if (holding) {
      holding.avg = (holding.avg * holding.qty + cost) / (holding.qty + qty);
      holding.qty += qty;
    } else {
      user.holdings.push({ symbol, qty, avg: price });
    }

    // 💾 Add transaction log
    user.transactions.push({
      type: "BUY",
      symbol,
      qty,
      price,
      amount: cost
    });

    await user.save();
    res.json({ success: true, balance: user.balance, holdings: user.holdings });
  } catch (err) {
    console.error("❌ Buy error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// SELL stock
exports.sellStock = async (req, res) => {
  try {
    const { symbol, qty, price } = req.body;
    const user = await User.findById(req.user._id);

    const holding = user.holdings.find(h => h.symbol === symbol);
    if (!holding || holding.qty < qty) {
      return res.status(400).json({ message: "Not enough shares to sell" });
    }

    const proceeds = qty * price;
    holding.qty -= qty;
    if (holding.qty === 0) {
      user.holdings = user.holdings.filter(h => h.symbol !== symbol);
    }

    user.balance += proceeds;

    // 💾 Add transaction log
    user.transactions.push({
      type: "SELL",
      symbol,
      qty,
      price,
      amount: proceeds
    });

    await user.save();
    res.json({ success: true, balance: user.balance, holdings: user.holdings });
  } catch (err) {
    console.error("❌ Sell error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// RESET account
exports.resetAccount = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    user.balance = 200000;
    user.holdings = [];
    user.transactions.push({ type: "RESET", amount: 200000 });

    await user.save();
    res.json({ success: true, balance: user.balance, holdings: user.holdings });
  } catch (err) {
    console.error("❌ Reset error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
