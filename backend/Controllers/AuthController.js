const User = require("../Models/UserModel");
const { createSecretToken } = require("../utils/SecretToken");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);

    console.log("✅ Signup - Generated token:", token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None", // important for cross-site
      secure: true,     // must be true on HTTPS
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 Login attempt:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      console.log("❌ Invalid login credentials for:", email);
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createSecretToken(user._id);
    console.log("✅ Login successful - Generated token:", token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None", // important for cross-site cookies
      secure: true,     // must be true for HTTPS
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.Logout = (req, res) => {
  console.log("🚪 Logging out user...");
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ success: true, message: "Logged out" });
};
