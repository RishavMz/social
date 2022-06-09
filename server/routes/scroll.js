const express = require("express");
const MiniUser = require("../models/miniuser");

const router = express.Router();

router.get("/all", async (req, res) => {
  await MiniUser.find()
    .then(async (response) => {
      res.status(200);
      res.send(response);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

module.exports = router;
