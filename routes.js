const express = require("express");
const { visitBet261 } = require("./scr");
const path = require("path");
const e = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const message = await visitBet261(res);
    res.send(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/do.js", async (req, res) => {
  const filePath = path.resolve("./do.js");
  res.sendFile(filePath, (err) => {
    res.status(500).send("Erreur interne du server");
  });
});

module.exports = router;
