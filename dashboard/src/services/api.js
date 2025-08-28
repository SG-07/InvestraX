import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/* ---------------- AUTH ---------------- */
export const AuthAPI = {
  verify: () => API.get("/auth/verify"),
  login: (payload) => API.post("/auth/login", payload),
  register: (payload) => API.post("/auth/register", payload),
  logout: () => API.post("/auth/logout"),
};

/* ---------------- HOLDINGS ---------------- */
export const HoldingsAPI = {
  list: () => API.get("/api/holdings"),
};

/* ---------------- WATCHLIST ---------------- */
export const WatchlistAPI = {
  list: () => API.get("/api/watchlist"),
  add: (symbol) => API.post("/api/watchlist", { symbol }),
  remove: (symbol) => API.delete(`/api/watchlist/${symbol}`),
  searchByName: (name) => API.get(`/api/watchlist/search?name=${encodeURIComponent(name)}`),
};

/* ---------------- ORDERS ---------------- */
export const OrdersAPI = {
  list: () => API.get("/api/orders"),
  place: (payload) => API.post("/api/orders", payload),
};

/* ---------------- TRADING ACTIONS ---------------- */
export const TradeAPI = {
  buy: (payload) => API.post("/api/buy", payload),
  sell: (payload) => API.post("/api/sell", payload),
  resetAccount: () => API.post("/api/reset"),
};

/* ---------------- PORTFOLIO ---------------- */
export const PortfolioAPI = {
  summary: () => API.get("/api/portfolio/summary"),
  chart: () => API.get("/api/holdings"),
};

/* ---------------- WALLET ---------------- */
export const WalletAPI = {
  get: () => API.get("/api/wallet"),
  reset: () => API.post("/api/wallet/reset"),
  transactions: () => API.get("/api/wallet/transactions"),
};

/* ---------------- MARKET ---------------- */
export const MarketAPI = {
  nifty: () => API.get("/api/stocks/market/nifty"),
  sensex: () => API.get("/api/stocks/market/sensex"),
};

/* ---------------- POSITIONS ---------------- */
export const PositionsAPI = {
  list: () => API.get("/api/positions"),
};

export default API;
