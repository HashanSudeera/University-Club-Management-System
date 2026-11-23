import Club from "../models/ClubPage.js";
import getNextSequence from "../utils/generateId.js";

export const createClub = async (req, res) => {
  try {

    const {
      club_name,
      category,
      description,
      logo_path,
      banner_path
    } = req.body;

    // 1. Validate required fields
    if (!club_name || !category) {
      return res.status(400).json({
        success: false,
        message: "Club name and category are required"
      });
    }

    // 2. Generate custom club ID
    const clubId = await getNextSequence("club_id", "CLB");

    // 3. Create club
    const club = await Club.create({
      club_id: clubId,
      club_name,
      category,
      description,
      logo_path,
      banner_path,

      // Logged-in user
      createdBy: req.user.id,

      // Default status
      status: "pending"
    });

    // 4. Send response
    res.status(201).json({
      success: true,
      message: "Club created successfully and sent for approval",
      data: club
    });

  } catch (error) {

    console.error("Error creating club:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};