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
      const symbol = cleanSymbol(row.attribute);
      await Stock.findOneAndUpdate(
        { symbol },
        {
          $set: {
            price: Number(row.price) || 0,
            priceopen: Number(row.priceopen) || 0,
            high: Number(row.high) || 0,
            low: Number(row.low) || 0,
            volume: Number(row.volume) || 0,
            dataDelay: Number(row.dataDelay) || 0,
            change: Number(row.change) || 0,
            changepct: Number(row.changepct) || 0,
            eps: Number(row.eps) || 0,
            pe: Number(row.pe) || 0,
            marketcap: Number(row.marketcap) || 0,
            high52: Number(row.high52) || 0,
            low52: Number(row.low52) || 0,

            updatedAt: new Date(),
          },
        },
        { new: true, upsert: true }
      );

      count++;
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

function cleanSymbol(raw) {
  return raw.replace(/^.*:/, "");
}
