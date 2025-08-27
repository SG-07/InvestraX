const Stocks = require("../models/stocksmodel");
const yahooFinance = require("yahoo-finance2").default;

yahooFinance.suppressNotices(["yahooSurvey"]);

function escapeRegExp(str = "") {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function refreshIfStale(doc) {
  const MAX_AGE_MS = 60 * 1000;
  const stale = !doc.updatedAt || (Date.now() - doc.updatedAt.getTime()) > MAX_AGE_MS;
  if (stale) {
    try {
      const q = await yahooFinance.quote(doc.symbol);
      doc.lastPrice = q.regularMarketPrice ?? doc.lastPrice ?? 0;
      doc.updatedAt = new Date();
      await doc.save();
    } catch (e) {
      console.error("Yahoo refresh error:", e.message);
    }
  }
  return doc;
}

exports.list = async (req, res) => {
  try {
    const { category, q, page = 1, limit = 50, sort = "name", order = "asc" } = req.query;

    const filter = {};
    if (category) {
      const cats = String(category).split(",").map(c => c.trim()).filter(Boolean);
      if (cats.length) filter.category = { $in: cats };
    }
    if (q) {
      const rx = new RegExp(escapeRegExp(String(q)), "i");
      filter.$or = [{ symbol: rx }, { name: rx }];
    }

    const sortMap = { name: "name", symbol: "symbol", price: "lastPrice", updated: "updatedAt" };
    const sortField = sortMap[sort] || "name";
    const sortOrder = String(order).toLowerCase() === "desc" ? -1 : 1;

    const skip = (Math.max(1, +page) - 1) * Math.max(1, +limit);
    const [items, total] = await Promise.all([
      Stocks.find(filter).sort({ [sortField]: sortOrder }).skip(skip).limit(+limit).lean(),
      Stocks.countDocuments(filter),
    ]);

    res.json({ data: items, meta: { total, page: +page, limit: +limit, pages: Math.ceil(total / +limit) } });
  } catch (err) {
    res.status(500).json({ error: "Error fetching stocks" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const rx = new RegExp("^" + escapeRegExp(req.params.symbol) + "$", "i");
    const doc = await Stocks.findOne({ symbol: rx });
    if (!doc) return res.status(404).json({ error: "Not found" });
    const fresh = await refreshIfStale(doc);
    res.json({ data: fresh });
  } catch (err) {
    res.status(500).json({ error: "Error fetching stock" });
  }
};

exports.categories = async (_req, res) => {
  try {
    const cats = await Stocks.distinct("category");
    res.json({ data: cats.sort() });
  } catch {
    res.status(500).json({ error: "Error fetching categories" });
  }
};
