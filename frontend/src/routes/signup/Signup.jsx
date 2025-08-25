import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [inputValue, setInputValue] = useState({ email: "", password: "", username: "" });
  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) => toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) => toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🟢 Signup attempt:", inputValue);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        { ...inputValue },
        { withCredentials: true }
      );
      console.log("🟢 Signup response:", data);

      const { success, message, user } = data;
      if (success) {
        console.log("✅ User registered:", user);
        handleSuccess(message);
        console.log("🟢 Redirecting to dashboard...");
        // Full reload redirect because dashboard is on a different domain
        window.location.href = import.meta.env.VITE_DASHBOARD_URL;
      } else {
        console.log("🔴 Signup failed:", message);
        handleError(message);
      }
    } catch (error) {
      console.error("❌ Signup request error:", error);
      handleError(error.response?.data?.message || "Something went wrong. Please try again.");
    }

    setInputValue({ email: "", password: "", username: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#020024] via-[#8fbbcc] to-[#00d4ff] font-sans">
      <div className="bg-white p-8 md:p-12 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-[#00d4ff] text-2xl font-semibold mb-6 text-center">
          Signup Account
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
            <label className="text-gray-600 text-lg">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
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
            Submit
          </button>
          <span className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#00d4ff] underline">
              Login
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
