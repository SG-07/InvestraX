import { createContext, useContext, useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // ✅ Added user state
  const [wallet, setWallet] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [portfolio, setPortfolio] = useState({});

  // BuyActionWindow state
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

  return (
    <GeneralContext.Provider
      value={{
        user,
        setUser,
        wallet,
        setWallet,
        holdings,
        setHoldings,
        setPortfolio, 
        transactions,
        setTransactions,
        isBuyWindowOpen,
        selectedStock,
        openBuyWindow,
        closeBuyWindow,
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

// Custom hook to use context
export const useGeneralContext = () => useContext(GeneralContext);
