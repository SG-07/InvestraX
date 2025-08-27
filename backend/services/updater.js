const axios = require("axios");
const csv = require("csvtojson");
const Stock = require("../models/stocksmodel");
const cron = require("node-cron");

const SHEET_CSV_URL = process.env.SHEET_CSV_URL;

async function updateStocksFromSheet() {
  try {
    const { data } = await axios.get(SHEET_CSV_URL);
    const rows = await csv().fromString(data);

    let count = 0;
    for (let row of rows) {
      await Stock.findOneAndUpdate(
        { symbol: row.attribute },
        {
          price: Number(row.price) || 0,
          priceopen: Number(row.priceopen) || 0,
          high: Number(row.high) || 0,
          low: Number(row.low) || 0,
          volume: Number(row.volume) || 0,
          dataDelay: Number(row.dataDelay) || 0,
          updatedAt: new Date(),
        },
        { new: true, upsert: true }
      );

      count++;
      console.log(`📈 ${row.attribute} → ₹${row.price}`);
    }

    console.log(`✅ Stocks updated from sheet: ${count} rows`);
  } catch (err) {
    console.error("❌ Error updating from sheet:", err.message);
  }
}

// ⏰ Schedule job wrapper
function startSheetUpdater() {
  cron.schedule("* * * * *", updateStocksFromSheet); // every 1 min
  console.log("⏰ Sheet updater cron scheduled every minute");
}

module.exports = { updateStocksFromSheet, startSheetUpdater };
