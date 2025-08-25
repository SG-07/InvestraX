const User = require("../models/usermodel");   
const { createSecretToken } = require("../utils/secrettoken");

// ----------------- SIGNUP -----------------
module.exports.Signup = async (req, res) => {
  console.log("🟢 Signup request received:", req.body);

  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      console.log("🔴 Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("🔴 User already exists:", email);
      return res.json({ message: "User already exists", success: false });
    }

    const user = await User.create({ email, password, username });
    console.log("✅ New user created:", user.email);

    const token = createSecretToken(user._id);
    console.log("🔑 Token generated for user:", user.email);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        username: user.username,
        email: user.email,
        balance: user.balance,
        holdings: user.holdings,
      },
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------- LOGIN -----------------
module.exports.Login = async (req, res) => {
  console.log("🟢 Login request received:", req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("🔴 Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("🔴 User not found:", email);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("🔴 Incorrect password for user:", email);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = createSecretToken(user._id);
    console.log("🔑 Token generated for user:", email);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        username: user.username,
        email: user.email,
        balance: user.balance,
        holdings: user.holdings,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------- LOGOUT -----------------
module.exports.Logout = (_req, res) => {
  console.log("🟢 Logout request received");
  res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ success: true, message: "Logged out" });
};

// ----------------- VERIFY -----------------
module.exports.Verify = (req, res) => {
  console.log("🟢 Verify request received, user:", req.user?.email);
  res.json({
    status: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      username: req.user.username,
      balance: req.user.balance,
      holdings: req.user.holdings,
    },
  });
};
