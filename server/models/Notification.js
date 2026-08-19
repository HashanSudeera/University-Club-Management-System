import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
{
  //
    notifi_id: {
        type: String,
        unique: true 
    },
    recipient: {
        type: String,
        required: true 
    }, // Indicates 'club' or 'personal'
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' },
    club: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Club' 
    },
    type: { 
        type: String, 
        enum: ['ADMIN_REQUEST', 'ANNOUNCEMENT', 'CLUB_EVENT', 'CLUB_POST', 'PROMOTION'], //
        required: true 
    },
    title: {
        type: String,
        required: true 
    },
    message: {
        type: String,
        required: true },
        referenceId: { type: mongoose.Schema.Types.ObjectId } // Dynamic reference
}, { timestamps: true });

export default mongoose.model('Notification', NotificationSchema);
