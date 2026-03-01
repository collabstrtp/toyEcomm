const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  rating: { type: Number, required: true },
  review: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPercent: {
      type: Number,
      default: 0,
    },

    ageGroup: {
      type: String,
      required: true,
      enum: ["0-2", "3-5", "6-8", "9-12", "13+"],
    },

    gender: {
      type: String,
      required: true,
      enum: ["boys", "girls", "unisex"],
    },

    material: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    brand: {
      type: String,
    },

    isEducational: {
      type: Boolean,
      default: false,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    popular: {
      type: Boolean,
      default: false,
    },

    ratings: [ratingSchema],

    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    available: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  },
);

// create text index on name & description for search
ProductSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", ProductSchema);
