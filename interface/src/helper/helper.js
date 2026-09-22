import axios from "axios";

// Define your base URL so you don't have to repeat it everywhere
const AUTH_URL = "http://localhost:4000/api/auth";

export const generateOTP = async (email) => {
  const response = await axios.post(`${AUTH_URL}/generateOTP`, { email });
  return response.data; 
};

export const sendOTPMail = async (email, otp) => {
  const response = await axios.post(`${AUTH_URL}/sendOTPMail`, {
    userEmail: email,
    otp: otp,
  });
  return response.data;
};

export const verifyOTPCode = async (email, code) => {
  const response = await axios.post(`${AUTH_URL}/verifyOTP`, {
    email: email,
    code: code,
  });
  return response.data;
};

export const updatePassword = async (email,password) => {
  const response = await axios.put(`${AUTH_URL}/resetpwd`,{
    email : email,
    password: password,
  });
  return response.data;
};