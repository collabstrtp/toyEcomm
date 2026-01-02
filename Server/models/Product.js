const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema({
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
    type: [String], // multiple materials allowed
    default: [],
  },

  color: {
    type: [String], // multiple colors allowed
    default: [],
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

  popular: { type: Boolean, default: false },
  ratings: [ratingSchema],
});

module.exports = mongoose.model("Product", ProductSchema);
