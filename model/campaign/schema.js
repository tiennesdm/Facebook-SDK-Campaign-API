const mongoose = require("mongoose");
const campaignSchema = mongoose.Schema({
    campaignName: { type: String, required: true },
    campaignStatus: { type: String, required: true },
    campaignCategory: { type: String, required: true },
    campaignObjective: { type: String, required: true },
    campaignId: { type: String, required: true, unique: true },
    creatorTokenID: { type: mongoose.Schema.Types.ObjectId, ref: "tokenSchema", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
module.exports = campaignSchema;