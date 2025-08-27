const router = require("express").Router();
const { isLoggedIn } = require("../middleware/authmiddleware");
const Stock = require("../models/stocksmodel"); 

// GET Sensex data
router.get("/sensex", isLoggedIn, async (req, res) => {
  try {
    const sensexData = await Stock.findOne({ symbol: "SENSEX" });
    if (!sensexData) {
      return res.status(404).json({ message: "Sensex data not found" });
    }
    res.json(sensexData);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Sensex data", error: err.message });
  }
});

// GET Nifty data
router.get("/nifty", isLoggedIn, async (req, res) => {
  try {
    const niftyData = await Stock.findOne({ symbol: "NIFTY" });
    if (!niftyData) {
      return res.status(404).json({ message: "Nifty data not found" });
    }
    res.json(niftyData);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Nifty data", error: err.message });
  }
});

module.exports = router;
