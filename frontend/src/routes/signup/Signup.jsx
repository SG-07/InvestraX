import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "", username: "", password: "" });
  const { email, username, password } = inputValue;
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (msg) => toast.error(msg, { position: "bottom-left" });
  const handleSuccess = (msg) => toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        inputValue,
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        handleError(message);
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || "Something went wrong. Try again.";
      handleError(errMsg);
    } finally {
      setLoading(false);
      setInputValue({ email: "", username: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#020024] via-[#8fbbcc] to-[#00d4ff] font-sans">
      <div className="bg-white p-8 md:p-12 rounded-xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl text-[#00d4ff] font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleOnChange}
            className="border-b border-gray-400 p-2 outline-none placeholder:italic focus:border-[#00d4ff]"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleOnChange}
            className="border-b border-gray-400 p-2 outline-none placeholder:italic focus:border-[#00d4ff]"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleOnChange}
            className="border-b border-gray-400 p-2 outline-none placeholder:italic focus:border-[#00d4ff]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#00d4ff] text-white py-2 rounded-md hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#00d4ff] underline">
            Login
          </Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
