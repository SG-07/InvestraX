const Stocks = require("../models/stocksmodel");
const formatStockData = require("../utils/formatStockData");

// ✅ Helper: Escape regex safely
function escapeRegExp(str = "") {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 📌 List stocks with filter, pagination, and sorting
exports.list = async (req, res) => {
  try {
    const {
      category,
      q,
      page = 1,
      limit = 100,
      sort = "name",
      order = "asc",
    } = req.query;

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

    const sortMap = {
      name: "name",
      symbol: "symbol",
      price: "price",
      updated: "updatedAt",
    };
    const sortField = sortMap[sort] || "name";
    const sortOrder = String(order).toLowerCase() === "desc" ? -1 : 1;

    const skip = (Math.max(1, +page) - 1) * Math.max(1, +limit);

    const [items, total] = await Promise.all([
      Stocks.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(+limit)
        .lean(),
      Stocks.countDocuments(filter),
    ]);

    const response = {
      data: items.map(formatStockData),
      meta: {
        total,
        page: +page,
        limit: +limit,
        pages: Math.ceil(total / +limit),
      },
    };

    console.log("📊 [List] Filter:", filter);
    console.log("📤 [List] Sending response:", {
      count: response.data.length,
      meta: response.meta,
    });

    res.json(response);
  } catch (err) {
    console.error("❌ [List] Error:", err.message);
    res
      .status(500)
      .json({ error: "Error fetching stocks", details: err.message });
  }
};

// 📌 Get one stock by symbol
exports.getOne = async (req, res) => {
  try {
    const rx = new RegExp("^" + escapeRegExp(req.params.symbol) + "$", "i");
    const stock = await Stocks.findOne({ symbol: rx }).lean();

    console.log("📊 [GetOne] Symbol query:", req.params.symbol);
    console.log("📊 [GetOne] Raw DB result:", stock);

    if (!stock) {
      console.log("⚠️ [GetOne] Stock not found");
      return res.status(404).json({ error: "Not found" });
    }

    const response = { data: formatStockData(stock) };
    console.log("📤 [GetOne] Sending response:", response);

    res.json(response);
  } catch (err) {
    console.error("❌ [GetOne] Error:", err.message);
    res
      .status(500)
      .json({ error: "Error fetching stock", details: err.message });
  }
};

// 📌 Get distinct categories
exports.categories = async (_req, res) => {
  try {
    const cats = await Stocks.distinct("category");
    const response = { data: cats.sort() };

    console.log("📊 [Categories] Found categories:", response.data);

    res.json(response);
  } catch (err) {
    console.error("❌ [Categories] Error:", err.message);
    res
      .status(500)
      .json({ error: "Error fetching categories", details: err.message });
  }
};

// 📌 Get Sensex (special symbol)
exports.getSensex = async (_req, res) => {
  try {
    const sensex = await Stocks.findOne({ symbol: "SENSEX" })
      .sort({ updatedAt: -1 })
      .lean();

    if (!sensex) {
      console.log("⚠️ [Sensex] No data found in DB");
      return res.status(404).json({ error: "Sensex data not found" });
    }

    const response = { success: true, data: sensex };

    res.json(response);
  } catch (err) {
    console.error("❌ [Sensex] Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Get Nifty (special symbol)
exports.getNifty = async (_req, res) => {
  try {
    const nifty = await Stocks.findOne({ symbol: "NIFTY_50" })
      .sort({ updatedAt: -1 })
      .lean();

    if (!nifty) {
      console.log("⚠️ [Nifty] No data found in DB");
      return res.status(404).json({ error: "Nifty data not found" });
    }

    const response = { success: true, data: nifty };

    res.json(response);
  } catch (err) {
    console.error("❌ [Nifty] Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
