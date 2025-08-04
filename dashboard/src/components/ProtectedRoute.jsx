import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

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

        if (data.success) {
          console.log("🎉 User is authenticated.");
          setIsAuthenticated(true);
        } else {
          console.log("⚠️ Verify request returned success=false. Redirecting...");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("❌ Verification failed:", error);
        if (error.response) {
          console.error("📡 Server responded with:", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("📡 No response received from server.");
        }
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, []);

  if (isAuthenticated === null) {
    console.log("⏳ Still verifying... showing loader");
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("⛔ Not authenticated. Redirecting to:", import.meta.env.VITE_FRONTEND_URL);
    window.location.href = import.meta.env.VITE_FRONTEND_URL;
    return null;
  }

  console.log("✅ Authenticated. Rendering protected content.");
  return children;
};

export default ProtectedRoute;
