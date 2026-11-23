import EventRegister from "../models/EventRegister.js";
import Event from "../models/Event.js";
import getNextSequence from "../utils/generateId.js";
import User from "../models/User.js";
import generateTicket from "../utils/generateTicket.js";

export const registerForEvent = async (req, res) => {
  try {
    const { event_id, addons } = req.body;
    const user_id = req.user.id;

    // Verify the event exists
    const existingEvent = await Event.findOne({ event_id });
    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Prevent duplicate registration
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

    // Capacity check
    const currentCount = (existingEvent.participants ?? []).length;
    if (currentCount >= existingEvent.capacity) {
      return res.status(400).json({
        success: false,
        message: "Event registration is full",
      });
    }

    // Generate unique registration ID using Counter
    const eventReg_id = await getNextSequence("eventReg_id", "REG");

    // Save registration
    const newRegistration = new EventRegister({
      eventReg_id,
      user_id,
      event_id: existingEvent._id,
      addons: addons || {},
    });
    await newRegistration.save();
        await newRegistration.save();

    // Get user details for ticket
    const user = await User.findById(user_id);
    const userName = `${user.firstName} ${user.lastName}`;

    // Generate QR ticket
    const ticket_path = await generateTicket({
      eventReg_id,
      userName,
      eventTitle: existingEvent.title,
      eventDate: existingEvent.date,
      eventLocation: existingEvent.location || "TBA",
    });

    // Save ticket path to registration
    newRegistration.ticket_path = ticket_path;
    await newRegistration.save();

    // Atomically add participant to event

    // Atomically add participant to event
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
