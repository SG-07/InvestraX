const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const StocksModel = require("../Models/StocksModel");

const indices = [
  { symbol: "^NSEI", name: "NIFTY 50", category: "Index" },
  { symbol: "^BSESN", name: "SENSEX", category: "Index" },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to DB");

    for (const idx of indices) {
      await StocksModel.updateOne(
        { symbol: idx.symbol },
        { $set: idx },
        { upsert: true }
      );
      console.log(`📈 Seeded index: ${idx.name}`);
    }

    console.log("🎉 Indices seeding done!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding indices:", err);
    process.exit(1);
  }
})();