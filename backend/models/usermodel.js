const mongoose = require("mongoose");
const userSchema = require("../schemas/userschema");

module.exports = mongoose.model("User", userSchema);