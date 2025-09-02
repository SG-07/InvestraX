import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: true,
});

// ---------------------------- AUTH ----------------------------
export const AuthAPI = {
  signup: (data) => API.post("/auth/signup", data),
  login: (data) => API.post("/auth/login", data),
  verify: () => API.get("/auth/verify"),
  logout: () => API.post("/auth/logout"),
};

// ----------- PORTFOLIO (wallet + holdings + positions + watchlist) ------------
export const PortfolioAPI = {
  summary: () => API.get("/portfolio/summary"),
  holdings: () => API.get("/portfolio/holdings"),
  positions: () => API.get("/portfolio/positions"),
  transactions: () => API.get("/portfolio/transactions"),
  orders: () => API.get("/portfolio/orders"),
  watchlist: () => API.get("/portfolio/watchlist"),
  getWatchlist: () => API.get("/portfolio/watchlist"),
  addWatchlist: (symbol) => API.post("/portfolio/watchlist", { symbol }),
  removeWatchlist: (symbol) => API.delete(`/portfolio/watchlist/${symbol}`),
  breakdown: () => API.get("/portfolio/breakdown"),
};

// ---------------------------- TRADES (buy / sell) ----------------------------
export const TradeAPI = {
  buy: (data) => API.post("/trade/buy", data),
  sell: (data) => API.post("/trade/sell", data),
  reset: () => API.post("/trade/reset"),
  wallet: () => API.get("/trade/wallet"),
};

// ---------------------------- STOCKS ----------------------------
export const StocksAPI = {
  list: (params) => API.get("/stocks", { params }),
  getOne: (symbol) => API.get(`/stocks/${symbol}`),
  categories: () => API.get("/stocks/categories"),
  sensex: () => API.get("/stocks/market/sensex"),
  nifty: () => API.get("/stocks/market/nifty"),
};
