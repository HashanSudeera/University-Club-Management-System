// import User model   
import User from '../models/User.js'; 

// Profile update function
export const updateUserProfile = async (req, res) => {
  try {
    // catch Frontend data
    const { firstName, lastName, phone, universityEmail, address } = req.body;
    
    // grt logged user ID එක 
    const userId = req.body.userId; 

    if (!userId) {
      return res.status(400).json({ message: "User ID not enter" });
    }

    // update Database   
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        phone,
        universityEmail,
        address
      },
      { new: true } // return Updated data
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Can't Find User " });
    }

    // successfull response
    res.status(200).json({
      message: "Profile update successfuly!",
      user: updatedUser
    });

  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "server error. try again!" });
  }
};

// Backend data request route,for display current details in frontend
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId; //  catch ID from URL
        const user = await User.findById(userId); // find user in DB accordin that ID
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // if found user, pass to frontend
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

