import EventRegister from "../models/EventRegister.js";
import Event from "../models/Event.js";

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
    const customRegId = `REG-${existingEvent._id}-${Date.now()}`;

    //Persist registration document 
    const newRegistration = new EventRegister({
      eventReg_id: customRegId,
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

   // Get all participants registered for an event (Club Admin only)
   export const getEventParticipants = async (req, res) => {
    try {
    const { eventId } = req.params;

    const participants = await EventRegister.find({ event_id: eventId })
      .populate("user_id", "firstName lastName email academicYear address")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: participants.length,
      data: participants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};