const mongoose = require("mongoose");

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
});

module.exports = new mongoose.model("User", userSchema);
