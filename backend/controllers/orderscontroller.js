const Orders = require("../models/ordersmodel");

exports.list = async (req, res) => {
  const userId = req.user._id;
  const orders = await Orders.find({ userId }).sort({ createdAt: -1 }).lean();
  res.json({ data: orders });
};

exports.create = async (req, res) => {
  const userId = req.user._id;
  const { symbol, qty, price, side } = req.body;
  if (!symbol || !qty || !price || !side) {
    return res.status(400).json({ error: "symbol, qty, price, side are required" });
  }
  const order = await Orders.create({ userId, symbol, qty, price, side });
  res.status(201).json({ data: order });
};
