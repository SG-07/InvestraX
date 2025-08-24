const mongoose = require("mongoose");
const holdingSchema = require("../schemas/holdingschema");
module.exports =
  mongoose.models.Holding || mongoose.model("Holding", holdingSchema);
