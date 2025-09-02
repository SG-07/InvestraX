const router = require("express").Router();
const { isLoggedIn } = require("../middleware/authmiddleware");
const ctrl = require("../controllers/portfoliocontroller");

// 📌 Portfolio summary (balance, holdings, PnL, last 10 transactions)
router.get("/summary", isLoggedIn, ctrl.summary);

// 📌 Full transactions history
router.get("/transactions", isLoggedIn, ctrl.transactions);

// 📌 Holdings
router.get("/holdings", isLoggedIn, ctrl.holdings);

// 📌 Positions
router.get("/positions", isLoggedIn, ctrl.positions);

// 📌 Watchlist
router.get("/watchlist", isLoggedIn, ctrl.watchlist);
router.post("/watchlist", isLoggedIn, ctrl.addWatchlist);
router.delete("/watchlist/:symbol", isLoggedIn, ctrl.removeWatchlist);

// 📌 Orders (alias for transactions)
router.get("/orders", isLoggedIn, ctrl.orders);

// 📌 Portfolio breakdown (for charts)
router.get("/breakdown", isLoggedIn, ctrl.breakdown);

// New sell info route
router.get("/sellinfo/:type/:symbol", isLoggedIn, ctrl.sellInfo);


module.exports = router;
