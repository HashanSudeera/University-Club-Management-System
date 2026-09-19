// කලින් හදාගත්තු User model එක import කරගන්න
import User from '../models/User.js'; // Model ෆයිල් එකේ නමට අනුව මේක වෙනස් වෙන්න පුළුවන්

// Profile update කරන function එක
export const updateUserProfile = async (req, res) => {
  try {
    // Frontend එකෙන් එවන දත්ත ටික ගන්නවා
    const { firstName, lastName, phone, universityEmail, address } = req.body;
    
    // දැනට ලොග් වෙලා ඉන්න යූසර්ගේ ID එක ගන්න ඕනේ
    // (මේක ඔයාගේ authentication ක්‍රමය අනුව req.user.id හෝ වෙනත් විදිහකින් එන්න පුළුවන්. 
    // දැනට උදාහරණයක් විදිහට req.body එකෙන්ම userId එක එනවා කියලා හිතමු)
    const userId = req.body.userId; 

    if (!userId) {
      return res.status(400).json({ message: "User ID එකක් ලබා දී නැත." });
    }

    // Database එකේ අදාල යූසර්ව හොයාගෙන විස්තර ටික update කරනවා
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        phone,
        universityEmail,
        address
      },
      { new: true } // Update වුන අලුත් දත්ත ටිකම return කරන්න මේක දානවා
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User කෙනෙක් සොයාගැනීමට නොහැක." });
    }

    // සාර්ථක වුනාම response එකක් යවනවා
    res.status(200).json({
      message: "Profile එක සාර්ථකව යාවත්කාලීන විය!",
      user: updatedUser
    });

  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "සර්වර් එකේ දෝෂයක්. කරුණාකර නැවත උත්සාහ කරන්න." });
  }
};

// Backend එකෙන් දත්ත ඉල්ලන route එක,for display current details in frontend
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId; // URL එකෙන් එන ID එක ගන්නවා
        const user = await User.findById(userId); // ඒ ID එකට අදාල යූසර්ව DB එකෙන් හොයනවා
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // යූසර්ව හම්බුනොත් එයාගේ දත්ත ටික Frontend එකට යවනවා
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  updateUserProfile
};