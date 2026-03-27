const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true,
    enum: [
      "HomePage",
      "CategoryPage",
      "ProductPage",
      "AboutUsPage",
      "BlogPage",
    ],
    message:
      "Page name must be one of the following: HomePage, CategoryPage, ProductPage, AboutUsPage, BlogPage",
  },
  urls: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("BannerImages", bannerSchema);
