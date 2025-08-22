require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const updateBatch = require("../services/stocks/updateBatch");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected for testUpdateBatch");

    // test with some symbols you know exist in DB
    await updateBatch(["TCS.NS", "INFY.NS", "RELIANCE.NS"]);

    console.log("🎯 Done testUpdateBatch");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
  }
})();