import  mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema(
    {
  
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