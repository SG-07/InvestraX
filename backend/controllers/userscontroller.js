module.exports.me = async (req, res) => {
  res.json({ data: req.user });
};
