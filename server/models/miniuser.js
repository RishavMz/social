const mongoose = require("mongoose");

const userMiniSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
});

module.exports = new mongoose.model("MiniUser", userMiniSchema);
