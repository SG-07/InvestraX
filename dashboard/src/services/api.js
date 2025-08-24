import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // needed for cookies
});

/* ---------------- AUTH ---------------- */
export const verifyUser = () => API.get("/auth/verify");
export const loginUser = (payload) => API.post("/auth/login", payload);
export const registerUser = (payload) => API.post("/auth/register", payload); // ✅ fixed to match backend
export const logoutUser = () => API.post("/auth/logout");

/* ---------------- HOLDINGS ---------------- */
export const getHoldings = () => API.get("/api/holdings");

/* ---------------- WATCHLIST ---------------- */
export const getWatchlist = () => API.get("/api/watchlist");
export const addToWatchlist = (symbol) => API.post("/api/watchlist", { symbol });
export const removeFromWatchlist = (symbol) => API.delete(`/api/watchlist/${symbol}`);

/* ---------------- ORDERS ---------------- */
export const getOrders = () => API.get("/api/orders");
export const placeOrder = (payload) => API.post("/api/orders", payload);

/* ---------------- ACTIONS (buy/sell) ---------------- */
export const buyStock = (payload) => API.post("/api/buy", payload);
export const sellStock = (payload) => API.post("/api/sell", payload);

/* ---------------- PORTFOLIO ---------------- */
export const getPortfolio = () => API.get("/api/portfolio");

/* ---------------- WALLET (to add/reset balance) ---------------- */
export const getWallet = () => API.get("/api/users/wallet");
export const resetWallet = () => API.post("/api/users/reset");
export const getTransactions = () => API.get("/api/wallet/transactions");

export default API;
