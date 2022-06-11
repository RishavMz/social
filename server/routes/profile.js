const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require('fs');


const imageStorage = multer.diskStorage({
  destination: './images',
  filename: function (req, file, cb) {
    cb(null, file.originalname)
}
});
const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Please upload a png or jpg Image"));
    }
    cb(undefined, true);
  },
});
router.post(
  "/image",
  imageUpload.single('file'),
  (req, res) => {
    console.log("Image uploaded");
    fs.rename(`images/${req.file.originalname}`, `images/${req.body.name}.png`, function(err) {
      if ( err ) console.log('ERROR: ' + err);
  });
    console.log(req.body.file, req.body.name)
    console.log(req.file)
    res.send(req.body.file);
  },
  (error, req, res, next) => {
    console.log(error.message)
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
