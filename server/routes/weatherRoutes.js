const express = require("express");
const router = express.Router();

const { getWeather } = require("../controllers/weatherController");
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, getWeather);

module.exports = router;
