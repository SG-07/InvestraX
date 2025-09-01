import { createContext, useContext, useState, useEffect } from "react";
import BuyActionWindow from "./BuyActionWindow";
import { PortfolioAPI } from "../services/api";

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(0);
  const [holdings, setHoldings] = useState([]);
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

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await PortfolioAPI.summary();
        setPortfolio(data);
        setWallet(data.totalValue ?? 0);
      } catch (err) {
        console.error("Failed to load portfolio summary:", err.message);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        user, setUser,
        wallet, setWallet,
        holdings, setHoldings,
        portfolio, setPortfolio,
        transactions, setTransactions,
        isBuyWindowOpen, selectedStock,
        openBuyWindow, closeBuyWindow,
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
