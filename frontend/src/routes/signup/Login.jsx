import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const notifyError = (msg) => toast.error(msg, { position: "bottom-left" });
  const notifySuccess = (msg) => toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        inputValue,
        { withCredentials: true }
      );

      if (data.success) {
        notifySuccess(data.message);
        setTimeout(() => {
          window.location.replace(import.meta.env.VITE_DASHBOARD_URL);
        }, 1500);
      } else {
        notifyError(data.message);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) notifyError(err.response.data.message);
      else notifyError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setInputValue({ email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#020024] via-[#8fbbcc] to-[#00d4ff] font-sans">
      <div className="bg-white p-8 md:p-12 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-[#00d4ff] text-2xl font-semibold mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleOnChange}
            required
            className="border-b border-gray-400 p-2 outline-none placeholder:italic"
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleOnChange}
            required
            className="border-b border-gray-400 p-2 outline-none placeholder:italic"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#00d4ff] text-white py-2 text-lg rounded-md hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
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
