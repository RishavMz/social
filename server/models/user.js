const mongoose = require("mongoose");
const { userMiniSchema } = require('./miniuser')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  likes: {
    type: [userMiniSchema],
  },
  superlikes: {
    type: [userMiniSchema],
  },
  superlikeby: {
    type: [userMiniSchema],
  },
  blocked: {
    type: [userMiniSchema],
  },
  gender: {
    type: String,
    require: true,
  },
  dummy: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("User", userSchema);
