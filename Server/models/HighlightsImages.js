const mongoose = require("mongoose");

const highlightsImagesSchema = new mongoose.Schema({
    images: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
});     

module.exports = mongoose.model("HighlightsImages", highlightsImagesSchema);