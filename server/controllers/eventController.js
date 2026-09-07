import Event from "../models/Event.js";
import EventRegister from "../models/EventRegister.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const { date, location, title, poster_path, capacity, status, type } = req.body;

    const newEvent = new Event({
      date,
      location,
      title,
      poster_path,
      capacity,
      status,
      type
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({ success: true, data: savedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("participants");
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("participants");
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Register for Event
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { addons } = req.body;
    const user_id = req.user.id; // Extracted from verifyToken middleware

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const registration = new EventRegister({
      user_id,
      addons
    });
    const savedRegistration = await registration.save();

    event.participants.push(savedRegistration._id);
    await event.save();

    res.status(201).json({
      success: true,
      message: "Successfully registered for event",
      data: savedRegistration
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};