require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const updateWatchlist = require("../services/stocks/updateWatchlist");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected for testUpdateWatchlist");

    await updateWatchlist();

    console.log("🎯 Done testUpdateWatchlist");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
  }
})();
