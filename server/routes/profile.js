const express = require('express');
const multer = require('multer')
const router = express.Router();
var http = require('http')
var path = require('path')
var fs = require('fs')

const imageStorage = multer.diskStorage({
  destination: 'images', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
           + path.extname(file.originalname))
  }
});
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png)$/)) { 
       return cb(new Error('Please upload a png Image'))
     }
   cb(undefined, true)
}
}) 
router.post('/image', imageUpload.single('image'), (req, res) => {
  console.log("Image uploaded")
  res.send(req.file)
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

module.exports = router;