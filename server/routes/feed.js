const express = require("express");
const { MiniUser } = require("../models/miniuser");
const { User } = require('../models/user')
const jwt = require('jsonwebtoken');
const verifyToken = require('../helpers/jwt');

const router = express.Router();

router.post("/all", verifyToken, async (req, res) => {
  await jwt.verify(req.token, process.env.SECRETKEY , async(err, data) => {
    if(err) {
      res.sendStatus(403);
    } else {
      await MiniUser.find()
      .then(async (response) => {
        res.status(200);
        res.send(response.filter(x => {
          var p=1;
          req.body.data.blocked.forEach(element => {
            if(element.image == x.image) {
              p=0;
              return false;
            }
          });
          return true;
        }));
      })
      .catch((err) => {
        res.status(500);
        res.send(err);
      });
    }
  });
});

router.post('/like', async(req, res) => {
  try {
    const userdata = new MiniUser({
      firstname: req.body.receiver.firstname,
      lastname: req.body.receiver.lastname,
      image: req.body.receiver.image,
    });
    await User.updateOne({email: req.body.sender.email}, 
      {
          $push: {  likes : userdata  }
      }).then(async()=>{
        await User.updateOne({image: req.body.receiver.image}, 
          {
              $inc: {  likecount : 1  }
          }).then(()=>{
            console.log("done")
            res.send("Liked")
          })
      })
    
  } catch(err) 
  {
    console.log(err)
  }
})

router.post('/superlike', async(req, res) => {
  try {
    const userdata = new MiniUser({
      firstname: req.body.receiver.firstname,
      lastname: req.body.receiver.lastname,
      image: req.body.receiver.image,
    });
    const user1data = new MiniUser({
      firstname: req.body.sender.firstname,
      lastname: req.body.sender.lastname,
      image: req.body.sender.image,
    });
    await User.updateOne({email: req.body.sender.email}, 
      {
          $push: {  superlikes : userdata  }
      }).then(async()=>{
        await User.updateOne({image: req.body.receiver.image}, 
          {
            $push: {  superlikeby : user1data  }
          }).then(()=>{
            res.send("Liked")
          })
      })
  } catch(err) 
  {
    console.log(err)
  }
})

router.post('/block', async(req, res) => {
  try {
    const userdata = new MiniUser({
      firstname: req.body.receiver.firstname,
      lastname: req.body.receiver.lastname,
      image: req.body.receiver.image,
    });
    const user1data = new MiniUser({
      firstname: req.body.sender.firstname,
      lastname: req.body.sender.lastname,
      image: req.body.sender.image,
    });
    await User.updateOne({email: req.body.sender.email}, 
      {
          $push: {  blocked : userdata  }
      }).then(async()=>{
        await User.updateOne({image: req.body.receiver.image}, 
          {
            $push: {  blockedby : user1data  }
          }).then(()=>{
            res.send("Blocked")
          })
      })
  } catch(err) 
  {
    console.log(err)
  }
})

module.exports = router;
