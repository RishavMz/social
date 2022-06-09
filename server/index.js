const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//****************************************************/

const PORT = process.env.PORT || 5000;
const DATABASEURL = process.env.DATABASEURL;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(DATABASEURL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const db = mongoose.connection;
db.on("error", (error) => console.log(error));

//****************************************************/

const initialize = require("./helpers/init");
setTimeout(async () => {
  await initialize();
}, 1000);

//****************************************************/

app.get("/", (req, res) => {
  res.send("Server running");
});

//****************************************************/

const scrollRouter = require("./routes/scroll");
app.use("/scroll", scrollRouter);

const imageRouter = require("./routes/image");
app.use("/image", imageRouter);

//****************************************************/

app.listen(PORT, () => {
  console.log("Server up and running on port " + PORT);
});
