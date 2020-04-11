const mongoose = require("mongoose");
const tokenSchema = require('./schema');



module.exports = mongoose.model("tokenSchema", tokenSchema);