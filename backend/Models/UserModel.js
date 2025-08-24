const mongoose = require("mongoose");
const userSchema = require("../Schemas/UserSchema");

module.exports = mongoose.model("User", userSchema);