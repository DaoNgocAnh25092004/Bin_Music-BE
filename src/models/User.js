const mongoose = require("mongoose");

// Create a new mongoose schema
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    authProviders: [
      {
        provider: {
          type: String,
          required: true,
        },
        providerId: {
          type: String,
          required: true,
        },
      },
    ],
    password: {
      type: String,
      required: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
