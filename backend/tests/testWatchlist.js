require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const { updateWatchlistSymbols } = require("../services/stockUpdater/watchlist");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to DB");

    await updateWatchlistSymbols();

    console.log("🎉 Watchlist update test finished");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();