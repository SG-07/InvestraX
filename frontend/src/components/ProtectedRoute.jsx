import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          { withCredentials: true }
        );
        setIsAuthenticated(data.success); // success should be true/false
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    verifyUser();
  }, []);

  if (isAuthenticated === null) return null; // or loading spinner

  // 🔁 If not authenticated, redirect to frontend
  if (!isAuthenticated) {
    window.location.href = import.meta.env.VITE_FRONTEND_URL;
    return null;
  }

  return children;
};

export default ProtectedRoute;
