const express = require("express");
const router = express.Router();
const { buyStock, sellStock, resetAccount, getWallet } = require("../controllers/TradeController");

// Trading routes
router.post("/buy", buyStock);
router.post("/sell", sellStock);
router.post("/reset", resetAccount);
router.get("/wallet", getWallet);

module.exports = router;