const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

module.exports.userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ status: false });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id).select("username email");
    if (!user) return res.json({ status: false });
    res.json({ status: true, user });
  } catch (err) {
    res.json({ status: false });
  }
};
