import { createContext, useContext, useState } from "react";

// Create Context
const GeneralContext = createContext(null);

// Provider Component
export const GeneralContextProvider = ({ children }) => {
  // State for logged-in user
  const [user, setUser] = useState(null);

  // Dashboard data
  const [holdings, setHoldings] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [portfolio, setPortfolio] = useState([]);

  return (
    <GeneralContext.Provider
      value={{
        user,
        setUser,
        holdings,
        setHoldings,
        wallet,
        setWallet,
        portfolio,
        setPortfolio,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

// Hook for easy access
export const useGeneralContext = () => {
  const ctx = useContext(GeneralContext);
  if (!ctx) {
    throw new Error(
      "useGeneralContext must be used within GeneralContextProvider"
    );
  }
  return ctx;
};