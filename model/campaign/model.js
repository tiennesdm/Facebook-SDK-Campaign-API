const mongoose = require("mongoose");
const campaignSchema = require('./schema');



module.exports = mongoose.model("campaignSchema", campaignSchema);