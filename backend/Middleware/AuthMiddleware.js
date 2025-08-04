const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

module.exports.userVerification = async (req, res) => {
  const token = req.cookies.token;
  console.log("🔑 Token from cookies:", token); // log token

  if (!token) {
    console.log("🚫 No token found in cookies");
    return res.json({ status: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log("✅ Token decoded:", decoded);

    const user = await User.findById(decoded.id).select("username email");
    if (!user) {
      console.log("⚠️ No user found for token id");
      return res.json({ status: false });
    }

    console.log("👤 User verified:", user);
    res.json({ status: true, user });
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    res.json({ status: false });
  }
};
