import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({
  //

  event_id:
             { type: String,
              unique: true },
  title:
             { type: String,
               required: true },
  date:
             { type: Date,
              required: true },
  location:
             { type: String },
  poster_path:
             { type: String },
  capacity:
             { type: Number },
  participants:
             [{ type: mongoose.Schema.Types.ObjectId,
                ref: 'User' }], //
  status:
             { type: String, 
               enum: ['Ongoing', 'completed', 'postponed'], //
               default: 'Ongoing'
    },
  type:     { type: String, 
               enum: ['open', 'register'] //
  }
}, { timestamps: true });

export default mongoose.model("Event", EventSchema);