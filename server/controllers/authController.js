import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from 'validator'; 
import { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET} from "../config.js";


//register user
const register = async (req, res) => {
  try {
    const { firstName,lastName ,address, email, password,confirmPassword, role ,academicYear} = req.body;

    // 1. All validation moved INSIDE the try block
    if (!firstName || !email || !password || !lastName || !address || !academicYear || !confirmPassword ) {
      throw Error("All fields are required ");
    }
    if (!validator.isEmail(email)) {
      throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }

    if (!password == confirmPassword){
      throw Error('Password not Matched');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      address,
      email,
      password: hashedPassword,
      role,
      academicYear
    });
    
    await user.save();
    
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        email: user.email,
        role: user.role,
        academicYear: user.academicYear
      },
    });

  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(400).json({ error: error.message });
  }
};
//login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation moved INSIDE the try block
    if (!email || !password) {
      throw Error('All fields must be filled');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw Error('Incorrect email');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw Error("Incorrect password");
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
//send access token and user data to frontend
    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        academicYear: user.academicYear,
      },
    });

  } catch (error) {
    // 3. Changed to send back your custom error instead of a generic 500
    console.error("Error logging in user:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    // Standard response format is fine here
    return res.status(401).json({ error: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      accessToken: newAccessToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        academicYear: user.academicYear,
      },
    });
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error.message);
    res.status(500).json({ error: "Server error during logout" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export {register,login,refreshToken,logout,getProfile};