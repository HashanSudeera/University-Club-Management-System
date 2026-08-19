import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // e.g., 'user_id', 'club_id'
  seq: { type: Number, default: 0 }
});

export default mongoose.model('Counter', CounterSchema);