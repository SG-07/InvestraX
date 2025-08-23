const mongoose = require("mongoose");
const userSchema = require("../Schemas/UserSchema");
module.exports = mongoose.models.User || mongoose.model("User", userSchema);