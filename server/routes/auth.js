const express = require("express");
const { MiniUser } = require("../models/miniuser");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const newUser = new MiniUser({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      image: req.body.image,
      gender: req.body.gender,
    });
    await newUser.save().then(async () => {
      await bcrypt.hash(req.body.password, 4).then(async (hash) => {
        const dummyUser = new User({
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: hash,
          image: req.body.image,
          likes: [newUser],
          superlikes: [newUser],
          superlikeby: [newUser],
          blocked: [newUser],
          gender: req.body.gender,
          dummy: false,
        });
        await dummyUser.save();
        res.status(201);
        res.send("Successfully created");
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  let data = [];
  try {
    await User.findOne({ email: req.body.email }).then(async (response) => {
      if (response) {
        await bcrypt
          .compare(req.body.password, response.password)
          .then(async (result) => {
            if (result === true) {
                const UserData = {
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                }
                await jwt.sign({UserData}, process.env.SECRETKEY, { expiresIn: '86400s' }, async(err, token) => {
                    data = await User.find({ email: req.body.email });
                    const logindata = {
                        userdata: data,
                        token: token
                    }
                    res.status(200);
                    res.send(logindata);
                  });
              
            }
            else {
                res.status(404);
                res.send("Incorrect password");
            }
          });
      } else {
        res.status(404);
        res.send("User not found");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }
});

router.post("/logout", async (req, res) => {
  await res.send("Logged out");
});

module.exports = router;
