import { createContext, useContext } from "react";

// Create Context
const GeneralContext = createContext(null);

// Provider Component
export const GeneralContextProvider = ({ value, children }) => {
  return (
    <GeneralContext.Provider value={value}>
      {children}
    </GeneralContext.Provider>
  );
};

// Hook for easy access
export const useGeneralContext = () => {
  const ctx = useContext(GeneralContext);
  if (!ctx) {
    throw new Error("useGeneralContext must be used within GeneralContextProvider");
  }
  return ctx;
};
