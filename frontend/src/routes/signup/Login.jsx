import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) => toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) => toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { ...inputValue },
        { withCredentials: true }
      );
      console.log("🟢 Login response:", data);

      const { success, message, user } = data;
      if (success) {
        handleSuccess(message);
        console.log("🟢 Redirecting to dashboard...");
        // Full reload redirect because dashboard is on a different domain
        window.location.href = import.meta.env.VITE_DASHBOARD_URL;
      } else {
        console.log("🔴 Login failed:", message);
        handleError(message);
      }
    } catch (error) {
      console.error("❌ Login request error:", error);
      handleError(error.response?.data?.message || "Something went wrong. Please try again.");
    }

    setInputValue({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#020024] via-[#8fbbcc] to-[#00d4ff] font-sans">
      <div className="bg-white p-8 md:p-12 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-[#00d4ff] text-2xl font-semibold mb-6 text-center">
          Login Account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-lg">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              className="border-b border-gray-400 p-2 outline-none placeholder:italic"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-lg">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              className="border-b border-gray-400 p-2 outline-none placeholder:italic"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#00d4ff] text-white py-2 text-lg rounded-md hover:opacity-90"
          >
            Login
          </button>
          <span className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#00d4ff] underline">
              Signup
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
