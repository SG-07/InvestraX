const mongoose = require("mongoose");
const userSchema = require("../schemas/userschema");
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
