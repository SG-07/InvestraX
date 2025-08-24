const User = require("../models/usermodel");   
const { createSecretToken } = require("../utils/secrettoken");

// ----------------- SIGNUP -----------------
module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ message: "User already exists" });

    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);

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
        balance: user.balance,       // 🆕 include balance
        holdings: user.holdings,     // 🆕 include holdings
      },
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------- LOGIN -----------------
module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = createSecretToken(user._id);
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
        balance: user.balance,       // 🆕 include balance
        holdings: user.holdings,     // 🆕 include holdings
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------- LOGOUT -----------------
module.exports.Logout = (_req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ success: true, message: "Logged out" });
};

// ----------------- VERIFY -----------------
module.exports.Verify = (req, res) => {
  // Reaches here only if userVerification middleware passed
  res.json({
    status: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      username: req.user.username,
      balance: req.user.balance,   // 🆕 include balance
      holdings: req.user.holdings, // 🆕 include holdings
    },
  });
};
