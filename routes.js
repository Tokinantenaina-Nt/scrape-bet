const express = require("express");
const { visitBet261 } = require("./scr");
const path = require("path");
const e = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send("Scraping bet ...");
});
router.get("/scrape", async (req, res) => {
  try {
    const message = await visitBet261(res);
    res.send(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/do", async (req, res) => {
  const filePath = path.resolve("./do");
  if (filePath) res.sendFile(filePath);
  else {
    (err) => res.status(500).send("Erreur interne du server");
  }
});

module.exports = router;
