import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const verifyUser = async () => {
      try {
        console.log("🔐 Sending verify request...");
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          { withCredentials: true }
        );
        console.log("🔍 Verification response:", data);
        setIsAuthenticated(data.success);
      } catch (error) {
        console.log("❌ Verification failed:", error);
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, []);

  if (isAuthenticated === null) {
    console.log("⏳ Awaiting authentication...");
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    const redirectURL = import.meta.env.VITE_FRONTEND_URL;
    console.log("⛔ Not authenticated. Redirecting to:", redirectURL);
    window.location.href = redirectURL;
    return null;
  }

  console.log("✅ Authenticated. Rendering protected route...");
  return children;
};

export default ProtectedRoute;
