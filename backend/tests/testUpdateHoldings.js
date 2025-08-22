require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const updateHoldings = require("../services/stocks/updateHoldings");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected for testUpdateHoldings");

    await updateHoldings();

    console.log("🎯 Done testUpdateHoldings");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
  }
})();