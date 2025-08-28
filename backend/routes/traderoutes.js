const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/authmiddleware");
const { buyStock, sellStock, resetAccount, getWallet } = require("../controllers/tradecontroller");

// Trading routes (all require authentication)
router.post("/buy", isLoggedIn, buyStock);
router.post("/sell", isLoggedIn, sellStock);
router.post("/reset", isLoggedIn, resetAccount);
router.get("/wallet", isLoggedIn, getWallet);

module.exports = router;
