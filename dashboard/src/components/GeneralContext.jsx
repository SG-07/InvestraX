import { createContext, useContext, useState, useEffect } from "react";
import BuyActionWindow from "./BuyActionWindow";
import { PortfolioAPI } from "../services/api";

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [portfolio, setPortfolio] = useState({});

  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState({ symbol: null, price: null });

  const openBuyWindow = (symbol, price = null) => {
    setSelectedStock({ symbol, price });
    setIsBuyWindowOpen(true);
  };

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStock({ symbol: null, price: null });
  };

  // ✅ unified fetch method
  const refreshPortfolio = async () => {
    try {
      const { data } = await PortfolioAPI.summary();
      setPortfolio(data);
      setWallet(data.totalValue ?? 0);

      if (data.holdings) setHoldings(data.holdings);
      if (data.positions) setPositions(data.positions);
      if (data.transactions) setTransactions(data.transactions);
    } catch (err) {
      console.error("Failed to load portfolio summary:", err.message);
    }
  };

  useEffect(() => {
    refreshPortfolio();
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        user, setUser,
        wallet, setWallet,
        holdings, setHoldings,
        positions, setPositions,
        portfolio, setPortfolio,
        transactions, setTransactions,
        isBuyWindowOpen, selectedStock,
        openBuyWindow, closeBuyWindow,
        refreshPortfolio,   // ✅ exposed
      }}
    >
      {children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          symbol={selectedStock.symbol}
          price={selectedStock.price}
          onClose={closeBuyWindow}
        />
      )}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => useContext(GeneralContext);
