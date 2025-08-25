import { createContext, useContext, useState } from "react";

const GeneralContext = createContext(null);

export const GeneralContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [portfolio, setPortfolio] = useState(null);
  const [transactions, setTransactions] = useState([]);

  return (
    <GeneralContext.Provider
      value={{
        user, setUser,
        holdings, setHoldings,
        wallet, setWallet,
        portfolio, setPortfolio,
        transactions, setTransactions,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const ctx = useContext(GeneralContext);
  if (!ctx) {
    throw new Error("useGeneralContext must be used within GeneralContextProvider");
  }
  return ctx;
};