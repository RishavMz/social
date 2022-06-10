const express = require("express");
const { MiniUser } = require("../models/miniuser");
const jwt = require('jsonwebtoken');
const verifyToken = require('../helpers/jwt');

const router = express.Router();

router.get("/all", verifyToken, async (req, res) => {
  await jwt.verify(req.token, process.env.SECRETKEY , async(err, data) => {
    if(err) {
      res.sendStatus(403);
    } else {
      await MiniUser.find()
      .then(async (response) => {
        res.status(200);
        res.send(response);
      })
      .catch((err) => {
        res.status(500);
        res.send(err);
      });
    }
  });
  
});

module.exports = router;
