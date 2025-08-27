const User = require("../models/usermodel");

// GET wallet info
exports.getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("balance");
    res.json({ balance: user.balance });
  } catch (err) {
    console.error("❌ Wallet fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// RESET wallet
exports.resetWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.balance = 200000; // reset to 2L
    user.holdings = [];
    user.transactions.push({
      type: "RESET",
      symbol: "-",
      qty: 0,
      price: 0,
      amount: 200000,
    });

    await user.save();

    res.json({
      message: "Wallet reset successfully",
      balance: user.balance,
      holdings: user.holdings,
    });
  } catch (err) {
    console.error("❌ Wallet reset error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all transactions of logged-in user
exports.getTransactions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("transactions");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ transactions: user.transactions });
  } catch (err) {
    console.error("❌ Transaction fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
