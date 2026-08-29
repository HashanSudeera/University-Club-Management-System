import mongoose from "mongoose";

const EventRegisterSchema = new mongoose.Schema(
  {
    eventReg_id: {
      type: String,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    addons: {
      type: mongoose.Schema.Types.Mixed, // Flexible type for various addons.
    },
  },
  { timestamps: true }
);

//  prevents duplicate registrations even under concurrent load.
EventRegisterSchema.index({ user_id: 1, event_id: 1 }, { unique: true });

export default mongoose.model("EventRegister", EventRegisterSchema);
