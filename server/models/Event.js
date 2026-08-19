const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  //
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String },
  poster_path: { type: String },
  capacity: { type: Number },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], //
  status: { 
    type: String, 
    enum: ['Ongoing', 'completed', 'postponed'], //
    default: 'Ongoing'
  },
  type: { 
    type: String, 
    enum: ['open', 'register'] //
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);