const mongoose = require("mongoose");
const tokenSchema = mongoose.Schema({
    token: { type: String, required: true },
    status: { type: Boolean, required: true },
    accountId: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
module.exports = tokenSchema;