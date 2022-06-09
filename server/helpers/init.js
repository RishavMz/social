const fake = require("../models/faker.json");
const MiniUser = require("../models/miniuser");
const User = require('../models/user');

async function fillFakeData() {
  try {
    await fake.forEach(async (element) => {
      const fakedata = new MiniUser({
        firstname:"",
        lastname:"",
        image:"",
        gender:""
      });
      const dummyUser = new User({
        firstname: element.firstname,
        lastname: element.lastname,
        image: element.image,
        likes: [fakedata],
        superlikes:[fakedata],
        superlikeby: [fakedata],
        blocked: [fakedata],
        gender: element.gender,
        dummy: true
      })
      await dummyUser.save();
      const newUser = new MiniUser({
        firstname: element.firstname,
        lastname: element.lastname,
        image: element.image,
        gender: element.gender,
      });
      await newUser.save();
    });
  } catch (err) {
    console.log(err);
  }
}

async function initialize() {
  await MiniUser.find()
    .then((res) => {
      if(res.length === 0) {
      fillFakeData();
        console.log("Faker data filled")
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = initialize;
