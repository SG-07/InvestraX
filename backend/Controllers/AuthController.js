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

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.json({ message: "Username already exists" });
    }

    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None", // ✅ Needed for cross-site cookies
      secure: true,     // ✅ Required for HTTPS on Render
      path: "/",
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None", 
      secure: true,     
      path: "/",
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.Logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None", // ✅ Match cookie config
    secure: true,     // ✅ Match cookie config
    path: "/",
  });
  res.json({ success: true, message: "Logged out" });
};
