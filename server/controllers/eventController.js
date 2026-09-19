import Event from "../models/Event.js";
import EventRegister from "../models/EventRegister.js";
import getNextSequence from "../utils/generateId.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const {club_id,date, location, title, poster_path, capacity, status, type } = req.body;
    const event_id = await getNextSequence("event_id", "EVT");

    const newEvent = new Event({
      event_id,
      club_id,
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
  // Update Event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

