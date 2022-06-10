const fake = require("../models/faker.json");
const { MiniUser } = require("../models/miniuser");
const { User } = require('../models/user');

async function fillFakeData() {
  try {
    await fake.forEach(async (element) => {
      const newUser = new MiniUser({
        firstname: element.firstname,
        lastname: element.lastname,
        image: element.image,
        gender: element.gender,
      });
      await newUser.save().then(async()=>{
        const dummyUser = new User({
          email: element.firstname+'@'+element.lastname+'.com',
          firstname: element.firstname,
          lastname: element.lastname,
          password: element.firstname+element.lastname,
          image: element.image,
          likes: [newUser],
          superlikes:[newUser],
          superlikeby: [newUser],
          blocked: [newUser],
          gender: element.gender,
          dummy: true
        })
        await dummyUser.save();
      })
      

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
