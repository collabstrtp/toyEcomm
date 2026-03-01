const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "shipped", "delivered"],
      default: "pending",
    },
    reviewSent: {
      type: Boolean,
      default: false, // Track if review email has been sent
    },
    reviewed: {
      type: Boolean,
      default: false, // Track if user has submitted review
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
