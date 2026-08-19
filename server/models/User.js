import mongoose from "mongoose";
import getNextSequence from "../utils/generateId.js";

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String, 
      unique: true 
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['Club Member', 'Club Admin','Uni Admin'],
      default: 'Club Member',
      required: true
    },
    academicYear: {
      type: String,
      required: true,
      enum: ['1st Year', '2nd Year', '3rd Year', '4th Year']
    },
    clubs: [{
      type: mongoose.Schema.Types.ObjectId, //club array
      ref: 'Club'
    }]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
