const fake = require("../models/faker.json");
const MiniUser = require("../models/miniuser");

async function fillFakeData() {
  try {
    await fake.forEach(async (element) => {
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
