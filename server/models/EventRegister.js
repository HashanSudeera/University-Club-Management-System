import mongoose from "mongoose";
const EventRegisterSchema = new mongoose.Schema({
  //
  eventReg_id: 
        { type: String,
         unique: true },
  user_id:
        { type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true },
  addons:
   { type: mongoose.Schema.Types.Mixed } // Flexible type for various addons.
}, { timestamps: true });

export default mongoose.model("EventRegister", EventRegisterSchema);