import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// --- holdings ---
export const getHoldings = async () => {
  try {
    return await API.get("/allHoldings");
  } catch (err) {
    console.error("❌ Error fetching holdings:", err.message);
    return { data: { data: [] } }; // fallback safe response
  }
};
// --- watchlist ---
export const getWatchlist = async () => {
  try {
    return await API.get("/watchlist");
  } catch (err) {
    console.error("❌ Error fetching watchlist:", err.message);
    return { data: { data: [] } };
  }
};

export const addToWatchlist = async (symbol) => {
  try {
    return await API.post("/watchlist", { symbol });
  } catch (err) {
    console.error("❌ Error adding to watchlist:", err.message);
    throw err;
  }
};

export const removeFromWatchlist = async (symbol) => {
  try {
    return await API.delete(`/watchlist/${symbol}`);
  } catch (err) {
    console.error("❌ Error removing from watchlist:", err.message);
    throw err;
  }
};

// 📌 Buy/Sell actions
export const buyStock = async (payload) => {
  try {
    return await API.post("/buy", payload);
  } catch (err) {
    console.error("❌ Error buying stock:", err.message);
    throw err;
  }
};

export const sellStock = async (payload) => {
  try {
    return await API.post("/sell", payload);
  } catch (err) {
    console.error("❌ Error selling stock:", err.message);
    throw err;
  }
};

export default API;