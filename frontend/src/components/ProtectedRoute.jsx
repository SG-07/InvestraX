
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/auth/verify", {
          withCredentials: true,
        });
        setIsAuthenticated(data.success);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    verifyUser();
  }, []);

  if (isAuthenticated === null) return null; // or loading spinner

  // 🔁 If not authenticated, redirect to main site
  if (!isAuthenticated) {
    window.location.href = "http://localhost:5173/";
    return null;
  }

  return children;
};

export default ProtectedRoute;
