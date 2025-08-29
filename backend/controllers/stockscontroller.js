const Stocks = require("../models/stocksmodel");
const formatStockData = require("../utils/formatStockData");

// ✅ Helper: Escape regex safely
function escapeRegExp(str = "") {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 📌 List stocks with filter, pagination, and sorting
exports.list = async (req, res) => {
  try {
    const { category, q, page = 1, limit = 50, sort = "name", order = "asc" } = req.query;

    const filter = {};
    if (category) {
      const cats = String(category)
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      if (cats.length) filter.category = { $in: cats };
    }

    if (q) {
      const rx = new RegExp(escapeRegExp(String(q)), "i");
      filter.$or = [{ symbol: rx }, { name: rx }];
    }

    const sortMap = { name: "name", symbol: "symbol", price: "price", updated: "updatedAt" };
    const sortField = sortMap[sort] || "name";
    const sortOrder = String(order).toLowerCase() === "desc" ? -1 : 1;

    const skip = (Math.max(1, +page) - 1) * Math.max(1, +limit);

    const [items, total] = await Promise.all([
      Stocks.find(filter).sort({ [sortField]: sortOrder }).skip(skip).limit(+limit).lean(),
      Stocks.countDocuments(filter),
    ]);

    res.json({
      data: items.map(formatStockData),
      meta: {
        total,
        page: +page,
        limit: +limit,
        pages: Math.ceil(total / +limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching stocks", details: err.message });
  }
};

// 📌 Get one stock by symbol
exports.getOne = async (req, res) => {
  try {
    const rx = new RegExp("^" + escapeRegExp(req.params.symbol) + "$", "i");
    const stock = await Stocks.findOne({ symbol: rx });
    if (!stock) return res.status(404).json({ error: "Not found" });

    res.json({ data: formatStockData(stock) });
  } catch (err) {
    res.status(500).json({ error: "Error fetching stock", details: err.message });
  }
};

// 📌 Get distinct categories
exports.categories = async (_req, res) => {
  try {
    const cats = await Stocks.distinct("category");
    res.json({ data: cats.sort() });
  } catch (err) {
    res.status(500).json({ error: "Error fetching categories", details: err.message });
  }
};

// 📌 Get Sensex (special symbol)
exports.getSensex = async (_req, res) => {
  try {
    const sensex = await Stocks.findOne({ symbol: "INDEXBOM:SENSEX" }).sort({ updatedAt: -1 });
    if (!sensex) return res.status(404).json({ error: "Sensex data not found" });

    res.json({ success: true, data: sensex });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Get Nifty (special symbol)
exports.getNifty = async (_req, res) => {
  try {
    const nifty = await Stocks.findOne({ symbol: "INDEXNSE:NIFTY_50" }).sort({ updatedAt: -1 });
    if (!nifty) return res.status(404).json({ error: "Nifty data not found" });

    res.json({ success: true, data: nifty });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

