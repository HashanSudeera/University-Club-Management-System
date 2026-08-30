import mongoose from "mongoose";

const ClubSchema = new mongoose.Schema(
  {
    club_id: {
      type: String,
      unique: true,
      required: true
    },

    club_name: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    logo_path: {
      type: String
    },

    banner_path: {
      type: String
    },

    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    membership: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Membership"
      }
    ],

    event: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
      }
    ],

    announcement: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Announcement"
      }
    ],

    club_post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClubPost"
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Club", ClubSchema);