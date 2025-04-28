const events = require("../data/events");

const eventSummaries = events.map((event) => ({
  id: event.id,
  title: event.title,
  organizer: event.organizer,
  date: event.date,
  time: event.time,
  venue: event.venue,
  city: event.city,
  image: event.images[0], // Pick the first image as a thumbnail
}));

const getEventSummaries = (req, res) => {
  res.status(200).json(eventSummaries);
};
const getEvents = (req, res) => {
  res.status(200).json(events);
};
module.exports = {
  getEvents,
  getEventSummaries,
};
