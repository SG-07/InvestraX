const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

module.exports.userVerification = async (req, res) => {
  console.log("📡 /auth/verify called");
  console.log("📦 Cookies received:", req.cookies);

  const token = req.cookies.token;
  if (!token) {
    console.log("❌ No token found in cookies");
    return res.json({ status: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log("🔑 Token decoded:", decoded);

    const user = await User.findById(decoded.id).select("username email");
    if (!user) {
      console.log("❌ No user found for this token");
      return res.json({ status: false });
    }

    console.log("✅ User verified:", user.email);
    res.json({ status: true, user });
  } catch (err) {
    console.error("❌ Token verification failed:", err);
    res.json({ status: false });
  }
};
