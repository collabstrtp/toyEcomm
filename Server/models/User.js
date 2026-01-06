const mongoose = require("mongoose");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  number: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    required: false,
  },
  addresses: [
    {
      type: {
        type: String,
        required: true,
        enum: ["Home", "Work", "Other"],
        default: "Home",
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      isDefault: {
        type: Boolean,
        default: false,
      },
    },
  ],
  profilePic: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  phoneOTP: {
    type: String,
    default: null,
  },
  phoneOTPExpiry: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
