import mongoose from "mongoose";

const ClubPostSchema = new mongoose.Schema({
    post_id: { 
        type: String, 
        unique: true 
    },
    post_title: {
        type: String,
        required: true 
    },
    description: {
        type: String 
    },
    post_image: {
        type: String 
    },
    publish_date: {
        type: Date,
        default: Date.now 
    }
});

export default mongoose.model('ClubPost', ClubPostSchema);