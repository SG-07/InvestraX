require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const WatchlistModel = require("../models/watchlistmodel");

async function seedWatchlist() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("✅ Connected to MongoDB");

    const sampleWatchlist = [
      { userId: "000000000000000000000001", symbol: "TCS.NS", name: "Tata Consultancy Services" },
      { userId: "000000000000000000000001", symbol: "SBIN.NS", name: "State Bank of India" },
      { userId: "000000000000000000000001", symbol: "SUNPHARMA.NS", name: "Sun Pharma" },
      { userId: "000000000000000000000001", symbol: "ITC.NS", name: "ITC" },
    ];

    await WatchlistModel.deleteMany({});
    await WatchlistModel.insertMany(sampleWatchlist);

    console.log("🌱 Watchlist seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding watchlist:", err);
    process.exit(1);
  }
}

seedWatchlist();