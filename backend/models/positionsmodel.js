const mongoose = require("mongoose");
const positionSchema = require("../schemas/positionschema");
module.exports = mongoose.models.Position || mongoose.model("Position", positionSchema);
