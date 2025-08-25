import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GeneralContextProvider } from "./components/GeneralContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Summary from "./components/Summary";
import Orders from "./components/Orders";
import Holdings from "./components/Holdings";
import Positions from "./components/Positions";
import Funds from "./components/Funds";
import Applications from "./components/Applications"; 

function App() {
  return (
    <GeneralContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="positions" element={<Positions />} />
            <Route path="funds" element={<Funds />} />
            <Route path="apps" element={<Applications />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </GeneralContextProvider>
  );
}

export default App;