import Club from "../models/ClubPage.js";
import Membership from "../models/Membership.js"; 
import Event from "../models/Event.js"; 
import Announcement from "../models/Announcement.js"; 
import ClubPost from "../models/ClubPost.js"; 
import mongoose from 'mongoose';

export const getAdminClub = async (req, res) => {
  try {
    // Extract the admin ID from the URL parameters
    const { adminId } = req.params; 

    // Search for a club where the clubadmin_id matches AND status is 'aprove'
    const club = await Club.findOne({ 
        clubadmin_id: adminId,
        status: 'aprove' 
    })
      .populate('membership')
      .populate('event')
      .populate('announcement')
      .populate('club_post');

    // If no club is found, or it exists but is still 'pending'
    if (!club) {
      return res.status(404).json({
        success: false,
        message: "No approved club found for this admin.",
        admin_id: adminId
      });
    }

    // Return the successfully found and approved club
    return res.status(200).json({
      success: true,
      data: club
    });

  } catch (error) {
    console.error("Error fetching admin's club:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while retrieving the club.",
      error: error.message
    });
  }
};