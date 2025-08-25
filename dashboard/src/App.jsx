import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GeneralContextProvider } from "./components/GeneralContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Summary from "./components/Summary";
import Orders from "./components/Orders";
import Holdings from "./components/Holdings";
import Positions from "./components/Positions";
import Funds from "./components/Funds";
import Apps from "./components/Applications";

function App() {
  return (
    <GeneralContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Nested dashboard routes */}
            <Route index element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="positions" element={<Positions />} />
            <Route path="funds" element={<Funds />} />
            <Route path="apps" element={<Apps />} />
            {/* fallback for undefined routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          {/* Optional: public routes can go here */}
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
    </GeneralContextProvider>
  );
}

export default App;