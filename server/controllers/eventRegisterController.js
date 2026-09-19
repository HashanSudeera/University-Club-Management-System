import EventRegister from "../models/EventRegister.js";
import Event from "../models/Event.js";
import getNextSequence from "../utils/generateId.js";

export const registerForEvent = async (req, res) => {
  try {
    const { event_id, addons } = req.body;
    const user_id = req.user.id;   


    //   Verify the event exists 
    const existingEvent = await Event.findOne({ event_id });
    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Prevent duplicate registration (compound index query) 
    const existingRegistration = await EventRegister.findOne({
      user_id,
      event_id: existingEvent._id,
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: "You have already registered for this event",
      });
    }

    //  Capacity check (null-safe: treat missing array as empty)
    const currentCount = (existingEvent.participants ?? []).length;
    if (currentCount >= existingEvent.capacity) {
      return res.status(400).json({
        success: false,
        message: "Event registration is full",
      });
    }

    // Generate unique registration ID
    const eventReg_id = await getNextSequence("eventReg_id", "REG");

    //Persist registration document 
    const newRegistration = new EventRegister({
      eventReg_id,
      user_id,                        
      event_id: existingEvent._id,
      addons: addons || {},
    });
    await newRegistration.save();

    //  Atomically add participant 
  
    await Event.findByIdAndUpdate(
      existingEvent._id,
      { $addToSet: { participants: user_id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Successfully registered for the event",
      data: newRegistration,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Cancel Registration
export const cancelRegistration = async (req, res) => {
  try {
    const { regId } = req.params;

    const registration = await EventRegister.findById(regId);
    if (!registration) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    // Remove user from event participants
    await Event.findByIdAndUpdate(
      registration.event_id,
      { $pull: { participants: registration.user_id } }
    );

    // Delete the registration
    await EventRegister.findByIdAndDelete(regId);

    res.status(200).json({ success: true, message: "Registration cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get My Registrations
export const getMyRegistrations = async (req, res) => {
  try {
    const user_id = req.user.id;

    const registrations = await EventRegister.find({ user_id }).populate("event_id");

    res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Event Participants (Club Admin)
export const getEventParticipants = async (req, res) => {
  try {
    const { eventId } = req.params;

    const participants = await EventRegister.find({ event_id: eventId }).populate("user_id", "firstName lastName email");

    res.status(200).json({ success: true, data: participants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
