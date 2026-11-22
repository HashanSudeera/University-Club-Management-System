import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // store id counter in this model
  seq: { type: Number, default: 0 }
});

export default mongoose.model('Counter', CounterSchema);