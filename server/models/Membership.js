import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema({
    membership_id: {
        type: String, 
        unique: true 
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    club_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true 
    },
    club_role: { 
        type: String, 
        enum: ['Member', 'Secretary', 'Treasure', 'President'],
        default: 'Member'
    },
    join_date: {
        type: Date,
        default: Date.now 
    } 
});

export default mongoose.model('Membership', MembershipSchema);