const mongoose = require("mongoose");
const validator = require("validator");

const userModal = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (validator.isEmail(value)) {
          throw new Error("Invalid email" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (validator.isStrongPassword(value)) {
          throw new Error("Enter Strong password" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is invalid");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (validator.isURL(value)) {
          throw new Error("Invalid Photo URL " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is default about value",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userModal);
