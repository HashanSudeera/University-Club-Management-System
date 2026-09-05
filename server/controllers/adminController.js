import User from '../models/User.js'; 

export const getUserStats = async (req, res) => {
    try {
        // count without University Admin
        const totalUsers = await User.countDocuments({ role: { $ne: 'Uni Admin' } });
        
        // Club Admins & embers count
        const clubAdmins = await User.countDocuments({ role: 'Club Admin' });
        const clubMembers = await User.countDocuments({ role: 'Club Member' });

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                clubAdmins,
                clubMembers
            }
        });
    } catch (error) {
        console.error("Error fetching user stats:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};