import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) =>
    toast.error(err, { position: "bottom-left" });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("🚀 Sending login request...");
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        console.log("✅ Login successful:", message);
        setTimeout(() => {
          const redirectURL = "https://investrax-dashboard.onrender.com";
          console.log("🌐 Redirecting to:", redirectURL);
          window.location.href = redirectURL;
        }, 2000);
      } else {
        console.log("❌ Login failed:", message);
        handleError(message);
      }
    } catch (error) {
      console.log("❌ Error in login request:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        handleError(error.response.data.message);
      } else {
        handleError("Something went wrong. Please try again.");
      }
    }

    setInputValue({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#020024] via-[#8fbbcc] to-[#00d4ff] font-sans">
      <div className="bg-white p-8 md:p-12 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-[#00d4ff] text-2xl font-semibold mb-6 text-center">
          Login Account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-600 text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              className="border-b border-gray-400 p-2 outline-none placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-600 text-lg">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              className="border-b border-gray-400 p-2 outline-none placeholder:italic"
            />
          </div>
          <button
            type="submit"
            className="bg-[#00d4ff] text-white py-2 text-lg rounded-md hover:opacity-90"
          >
            Submit
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
