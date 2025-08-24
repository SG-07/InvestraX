const router = require("express").Router();
const { buyStock, sellStock, resetAccount } = require("../Controllers/TradeController");

router.post("/buy", buyStock);
router.post("/sell", sellStock);
router.post("/reset", resetAccount);

module.exports = router;
