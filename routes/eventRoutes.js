const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventSummaries,
} = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/summary", getEventSummaries);

module.exports = router;
