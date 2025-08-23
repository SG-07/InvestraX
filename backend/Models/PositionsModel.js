const mongoose = require("mongoose");
const positionSchema = require("../Schemas/PositionSchema");
module.exports = mongoose.models.Position || mongoose.model("Position", positionSchema);