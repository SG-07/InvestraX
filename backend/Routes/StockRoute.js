// Routes/StocksRoute.js
const router = require("express").Router();
const StocksModel = require("../Models/StocksModel");
const yahooFinance = require("yahoo-finance2").default;

yahooFinance.suppressNotices(["yahooSurvey"]);

/* ------------------------- helpers ------------------------- */
function escapeRegExp(str = "") {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function toNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

// 🔹 Helper: Refresh stock if stale
async function refreshIfStale(stockDoc) {
  const MAX_AGE_MS = 60 * 1000; // 1 min
  const isStale = !stockDoc.updatedAt || (Date.now() - stockDoc.updatedAt.getTime()) > MAX_AGE_MS;

  if (isStale) {
    try {
      const quote = await yahooFinance.quote(stockDoc.symbol);
      stockDoc.lastPrice = quote.regularMarketPrice;
      stockDoc.updatedAt = new Date();
      await stockDoc.save();
      console.log(`♻️ Refreshed ${stockDoc.symbol}: ₹${quote.regularMarketPrice}`);
    } catch (err) {
      console.error(`❌ Failed to refresh ${stockDoc.symbol}:`, err.message);
    }
  }

  return stockDoc;
}

/* 
  GET /stocks
  (supports filtering, sorting, pagination)
*/
router.get("/", async (req, res) => {
  try {
    const { category, q, sort = "name", order = "asc", page, limit } = req.query;

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
      price: "lastPrice",
      updated: "updatedAt",
    };
    const sortField = sortMap[sort] || "name";
    const sortOrder = String(order).toLowerCase() === "desc" ? -1 : 1;

    const pg = Math.max(1, toNumber(page, 1));
    const lm = Math.min(100, Math.max(1, toNumber(limit, 50)));
    const skip = (pg - 1) * lm;

    const [items, total] = await Promise.all([
      StocksModel.find(filter).sort({ [sortField]: sortOrder }).skip(skip).limit(lm).lean(),
      StocksModel.countDocuments(filter),
    ]);

    res.json({
      data: items,
      meta: { total, page: pg, limit: lm, pages: Math.ceil(total / lm) },
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching stocks" });
  }
});

/*
  GET /stocks/categories
  → distinct list of categories
*/
router.get("/categories", async (_req, res) => {
  try {
    const categories = await StocksModel.distinct("category");
    res.json({ data: categories.sort() });
  } catch (err) {
    res.status(500).json({ error: "Error fetching categories" });
  }
});

/*
  GET /stocks/search?q=...
  → returns first 20 for quick lookups, auto-refresh stale stocks
*/
router.get("/search", async (req, res) => {
  try {
    const q = String(req.query.q || "").trim();
    if (!q) return res.json({ data: [] });

    const rx = new RegExp(escapeRegExp(q), "i");
    const docs = await StocksModel.find({ $or: [{ symbol: rx }, { name: rx }] })
      .limit(20);

    const refreshed = [];
    for (const doc of docs) {
      refreshed.push(await refreshIfStale(doc));
    }

    res.json({ data: refreshed });
  } catch (err) {
    res.status(500).json({ error: "Error searching stocks" });
  }
});

/*
  GET /stocks/:symbol
  → get one stock by symbol, auto-refresh if stale
*/
router.get("/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const rx = new RegExp("^" + escapeRegExp(symbol) + "$", "i");
    const stock = await StocksModel.findOne({ symbol: rx });

    if (!stock) return res.status(404).json({ error: "Stock not found" });

    const fresh = await refreshIfStale(stock);
    res.json(fresh);
  } catch (err) {
    res.status(500).json({ error: "Error fetching stock" });
  }
});

module.exports = router;
