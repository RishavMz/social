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
});

module.exports = {
  MiniUser: new mongoose.model("MiniUser", userMiniSchema),
  userMiniSchema: userMiniSchema,
};
