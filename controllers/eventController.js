const events = require("../data/events");
const getEvents = (req, res) => {
  res.status(200).json(events);
};

module.exports = {
  getEvents,
};
