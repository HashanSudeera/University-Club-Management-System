import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

// Import your new helper functions
import { generateOTP, sendOTPMail, verifyOTPCode } from "../helper/helper.js"; 

import loginBg from '../assets/login.jpg';
import Logo from "/clublink.svg";

const OTPVerification = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); 

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timerId;
    if (step === 2 && timeLeft > 0) {
      timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [step, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // 1. Trigger the loading toast
    const toastId = toast.loading("Sending OTP...");

    try {
      // Generate OTP
      const data = await generateOTP(email);
      const generatedOtp = data.code;

      if (!generatedOtp) {
        throw new Error("Failed to generate OTP from server");
      }

      // Send OTP Mail
      await sendOTPMail(email, generatedOtp);

      // 2. Update toast to success
      toast.success("OTP sent successfully!", { id: toastId });

      // Update UI
      setError(null);
      setStep(2);
      setTimeLeft(300); 
    } catch (err) {
      // 3. Update toast to error
      toast.error("Failed to send OTP. Please try again.", { id: toastId });
      handleErrorResponse(err);
    }
  };

  const handleResendOTP = async () => {
    // 1. Trigger the loading toast
    const toastId = toast.loading("Resending OTP...");

    try {
      const data = await generateOTP(email);
      const generatedOtp = data.code;

      if (!generatedOtp) {
        throw new Error("Failed to generate a new OTP from the server");
      }

      await sendOTPMail(email, generatedOtp);

      // 2. Update toast to success
      toast.success("OTP resend successfully!", { id: toastId });

      setError(null);
      setTimeLeft(300);
    } catch (err) {
      // 3. Update toast to error
      toast.error("Failed to resend OTP.", { id: toastId });
      handleErrorResponse(err);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length < 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    const toastId = toast.loading("Verifying code...");

    try {
      // Verify the OTP
      await verifyOTPCode(email, otpCode);

      toast.success("Verification successful!", { id: toastId });

      // Clear errors and Navigate
      setError(null);
      navigate('/resetPassword', { state: { email } });
    } catch (err) {
      toast.error("Invalid or expired OTP.", { id: toastId });
      handleErrorResponse(err);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleErrorResponse = (err) => {
    if (err.response && err.response.data && err.response.data.error) {
      setError(err.response.data.error);
    } else if (err.message) {
      setError(err.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sora relative">
      
      {/* ADD THE TOASTER HERE for top-right notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Club Link Logo */}
      <div className="absolute top-8 left-8 z-50 flex items-center gap-3 drop-shadow-md">
        <Link to="/">
          <div className="flex items-center gap-2 md:gap-3 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <img src={Logo} alt='Logo' className='w-7 md:w-9 shrink-0' />
            <div>
              <h1 className="text-yellow-500 text-[20px] md:text-[25px] leading-tight font-bold whitespace-nowrap">
                Club Link
              </h1>
              <p className="text-[9px] md:text-[10px] text-blue-100 hidden sm:block leading-none mt-0.5">
                University Club Management System
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* LEFT SIDE */}
      <div className="relative hidden lg:flex w-1/2 items-center justify-center bg-blue-900">
        <img
          src={loginBg}
          alt="University life"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative z-10 p-12 text-white font-sans">
          <h1 className="text-5xl font-bold leading-tight">
            Turning Vision <br /> into Impact.
          </h1>
          <p className="mt-6 text-2xl tracking-[0.3em] font-light italic text-gray-200">VERIFY</p>
        </div>
      </div>

      {/* RIGHT SIDE (Interactive Grid Background) */}
      <div
        className="relative flex w-full lg:w-1/2 items-center justify-center bg-blue-800 p-6 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"}`}
          style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.25), transparent 40%)` }}
        />

        {/* Form Container */}
        <div className="relative z-10 w-full max-w-md rounded-[2.5rem] bg-white p-12 shadow-2xl transition-all duration-500">
          
          {/* STEP 1: ENTER EMAIL */}
          {step === 1 && (
            <>
              <div className="mb-10 flex flex-col items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                  <Mail size={28} className="text-blue-600" /> Reset Password
                </h2>
                <p className="text-gray-400 text-sm mt-2 text-center">
                  Enter your university email address to receive a verification code.
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-8">
                <div className="border-b border-gray-300">
                  <label className="block text-xs text-gray-400 uppercase font-semibold">University Email</label>
                  <input
                    type="email"
                    value={email}
                    className="w-full py-2 outline-none focus:border-blue-500 bg-transparent text-gray-700"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@univ.ac.lk"
                    required
                  />
                </div>

                <button type="submit" className="w-full rounded-xl bg-slate-800 py-4 text-white font-bold hover:bg-slate-700 transition duration-300 shadow-lg">
                  Next
                </button>

                <p className="text-center text-sm text-gray-400">
                  Remember your password? <Link to="/login" className="text-yellow-700 font-bold cursor-pointer hover:underline">Login</Link>
                </p>

                {error && (
                  <div className="bg-red-100 border-red-500 border-2 rounded-2xl p-2 text-red-600 text-[14px] font-bold text-center">
                    {error}
                  </div>
                )}
              </form>
            </>
          )}

          {/* STEP 2: VERIFY OTP */}
          {step === 2 && (
            <>
              <div className="mb-10 flex flex-col items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                  <ShieldCheck size={28} className="text-blue-600" /> Verify OTP
                </h2>
                <p className="text-gray-400 text-sm mt-2 text-center">
                  We sent a 6-digit verification code to <br /> <span className="font-semibold text-gray-700">{email}</span>
                </p>
                <button onClick={() => setStep(1)} className="text-xs text-blue-600 hover:underline mt-1 font-semibold">
                  Change Email
                </button>
              </div>

              <form onSubmit={handleVerifySubmit} className="space-y-8">
                <div className="flex justify-between gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      name="otp"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onFocus={(e) => e.target.select()}
                      className="w-12 h-14 border-2 border-gray-300 rounded-xl text-center text-xl font-bold text-gray-800 bg-transparent outline-none focus:border-blue-500 focus:bg-blue-50 transition-all"
                    />
                  ))}
                </div>

                <div className="flex justify-center mt-4">
                  <span className="text-sm text-gray-500">
                    Didn't receive code?
                    {timeLeft > 0 ? (
                      <span className="text-gray-400 font-bold ml-1">
                        Resend in {formatTime(timeLeft)}
                      </span>
                    ) : (
                      <button type="button" onClick={handleResendOTP} className="text-blue-600 font-bold hover:underline ml-1">
                        Resend OTP
                      </button>
                    )}
                  </span>
                </div>

                <button type="submit" className="w-full rounded-xl bg-slate-800 py-4 text-white font-bold hover:bg-slate-700 transition duration-300 shadow-lg">
                  Verify Code
                </button>

                {error && (
                  <div className="bg-red-100 border-red-500 border-2 rounded-2xl p-2 text-red-600 text-[14px] font-bold text-center">
                    {error}
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;