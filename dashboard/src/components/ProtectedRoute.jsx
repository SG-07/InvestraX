import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    console.log("⏳ ProtectedRoute mounted. Checking authentication...");
    console.log("🌍 API URL from env:", import.meta.env.VITE_API_URL);

    const verifyUser = async () => {
      try {
        console.log("🔐 Sending verify request to:", `${import.meta.env.VITE_API_URL}/auth/verify`);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          { withCredentials: true }
        );

        console.log("✅ Verify request successful. Response:", data);
        setIsAuthenticated(data.status); // ✅ FIXED to match backend key
      } catch (error) {
        console.error("❌ Verification failed:", error);
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, []);

  if (isAuthenticated === null) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("⛔ Not authenticated. Redirecting to:", import.meta.env.VITE_FRONTEND_URL);
    window.location.href = import.meta.env.VITE_FRONTEND_URL;
    return null;
  }

  return children;
};

export default ProtectedRoute;
