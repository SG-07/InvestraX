import { useEffect, useState } from "react";
import axios from "axios";
import { useGeneralContext } from "./GeneralContext";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useGeneralContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        console.log("⏳ ProtectedRoute: Verifying user...");
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          { withCredentials: true }
        );

        console.log("✅ Verify successful:", data);

        if (data.status) {
          setUser(data.user); // save user in context
        } else {
          window.location.href = import.meta.env.VITE_FRONTEND_URL; // redirect to login
        }
      } catch (err) {
        console.error("❌ Verification failed:", err);
        window.location.href = import.meta.env.VITE_FRONTEND_URL;
      } finally {
        setLoading(false);
      }
    };

    // Only verify if user is not already in context
    if (!user) verifyUser();
    else setLoading(false);
  }, [user, setUser]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-gray-600">
        Loading...
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
