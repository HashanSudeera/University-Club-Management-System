import  mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema(
    {
      announcement_id: {
        type: String,
        unique: true 
    },
  
    title: {
      type: String, 
      required: true 
    },

    description: { 
      type: String, 
      required: true 
    },

    category: { 
      type: String 
    } 
  }, 
  { timestamps: true }
);

export default mongoose.model ("Announcement", AnnouncementSchema);