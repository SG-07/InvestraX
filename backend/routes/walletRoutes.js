const express = require("express");
const {
  getWallet,
  resetWallet,
  getTransactions,
} = require("../controllers/walletcontroller");
const { isLoggedIn } = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/", isLoggedIn, getWallet);
router.post("/reset", isLoggedIn, resetWallet);
router.get("/transactions", isLoggedIn, getTransactions);

module.exports = router;
