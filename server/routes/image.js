const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/:slug", async (req, res) => {
  const pathname = path.normalize(`${__dirname}/../images/${req.params.slug}`);
  if (fs.existsSync(pathname)) {
    res.status(200);
    res.sendFile(pathname);
  } else {
    res.status(404);
    res.json({ message: "File not found" });
  }
});

module.exports = router;
