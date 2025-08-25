const fetch = require("node-fetch");

async function wakeDashboard() {
  const dashboardURL = process.env.DASHBOARD_URL;
  try {
    const res = await fetch(dashboardURL, { method: "GET" });
    if (res.ok) console.log("✅ Dashboard pinged successfully from backend");
    else console.warn("⚠️ Dashboard ping returned status:", res.status);
  } catch (err) {
    console.warn("⚠️ Failed to ping dashboard from backend:", err);
  }
}

module.exports = wakeDashboard;