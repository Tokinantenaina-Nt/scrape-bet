const express = require("express");
const { visitBet261 } = require("./scr");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const message = await visitBet261();
    res.send(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
