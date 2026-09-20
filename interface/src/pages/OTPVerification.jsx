import React, { useState, useEffect } from 'react';
import loginBg from '../assets/login.jpg';
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Logo from "/clublink.svg";
import { Mail, ShieldCheck } from "lucide-react";

const OTPVerification = () => {
  // Navigation & Auth
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  // Multi-step state
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  // OTP state
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(null);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes

  // Spotlight effect states for the right side
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // ----------------------------------------------------
  // Timer Logic
  // ----------------------------------------------------
  useEffect(() => {
    let timerId;
    if (step === 2 && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
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

  // ----------------------------------------------------
  // Handlers
  // ----------------------------------------------------
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      // 1. Generate the OTP
      // Using 'params' sends the email as a query parameter, which is standard for GET requests.
      const otpResponse = await axios.post("http://localhost:4000/api/auth/generateOTP", {
        email: email
      });

      // Extract the OTP from your backend's response.
      // (Adjust 'otpResponse.data.otp' if your backend names the key differently, like '.code')
      const generatedOtp = otpResponse.data.code;

      console.log(generatedOtp);

      if (!generatedOtp) {
        throw new Error("Failed to generate OTP from server");
      }

      // 2. Send the generated OTP via Email
      await axios.post("http://localhost:4000/api/auth/sendOTPMail", {
        userEmail: email,
        otp: generatedOtp
      });

      // 3. Move to the next step on success
      setError(null);
      setStep(2);
      setTimeLeft(300); // Start 5 min countdown

    } catch (err) {
      handleErrorResponse(err);
    }
  };

  const handleResendOTP = async () => {
    try {
      // 1. Generate a new OTP
      const otpResponse = await axios.post("http://localhost:4000/api/auth/generateOTP", {
        email: email
      });

      
      const generatedOtp = otpResponse.data.code;

      console.log(generatedOtp);

      if (!generatedOtp) {
        throw new Error("Failed to generate a new OTP from the server");
      }

      // 2. Send the newly generated OTP via Email
      await axios.post("http://localhost:4000/api/auth/sendOTPMail", {
        userEmail: email,
        otp: generatedOtp
      });

      // 3. Reset UI state on success
      setError(null);
      setTimeLeft(300); // Reset timer to 5 minutes

    } catch (err) {
      handleErrorResponse(err);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    // Update the specific OTP box value
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Automatically focus the next input field if a number is entered
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to the previous input field on Backspace if the current field is empty
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length < 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      // 1. Verify the OTP using the updated endpoint and payload
      await axios.post("http://localhost:4000/api/auth/verifyOTP", {
        email: email,
        code: otpCode // Updated key from 'otp' to 'code' to match your backend API
      });

      // 2. Clear any previous errors
      setError(null);

      // 3. Navigate to the reset password route
      // We pass the email in the navigation state so the next page knows whose password to update
      navigate('/resetPassword', { state: { email } });

    } catch (err) {
      handleErrorResponse(err);
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

  // TRACK MOUSE POSITION FOR THE GRID SPOTLIGHT
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sora relative">

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
        {/* CSS Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Hover Spotlight Layer */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"
            }`}
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.25), transparent 40%)`,
          }}
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
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-blue-600 hover:underline mt-1 font-semibold"
                >
                  Change Email
                </button>
              </div>

              <form onSubmit={handleVerifySubmit} className="space-y-8">

                {/* OTP Input Group */}
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
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        className="text-blue-600 font-bold hover:underline ml-1"
                      >
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