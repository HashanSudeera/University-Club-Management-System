import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast'; // Import hot-toast

// Alias the helper function to avoid colliding with the component name
import { updatePassword } from "../helper/helper.js"; 
import loginBg from '../assets/login.jpg';
import Logo from "/clublink.svg";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the email passed from the OTPVerification page via navigate state
  const email = location.state?.email;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Security check: If someone navigates to this page directly without an email in state, send them to login
  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation via Toast
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Trigger loading toast
    const toastId = toast.loading("Updating password...");

    try {
      // Pass the email from router state and the new password to your API
      await updatePassword(email, password);

      // Update toast to success
      toast.success("Password updated successfully! Redirecting...", { id: toastId });
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Extract error message and update toast to error
      let errorMessage = "Something went wrong. Please try again.";
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // If email is missing, we render nothing briefly while the useEffect redirects
  if (!email) return null; 

  return (
    <div className="flex h-screen w-full overflow-hidden font-sora relative">
      
      {/* Add the Toaster here for top-right notifications */}
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
          <p className="mt-6 text-2xl tracking-[0.3em] font-light italic text-gray-200">SECURE</p>
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
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.25), transparent 40%)`,
          }}
        />

        {/* Form Container */}
        <div className="relative z-10 w-full max-w-md rounded-[2.5rem] bg-white p-12 shadow-2xl">
          <div className="mb-10 flex flex-col items-center">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
              <span role="img" aria-label="lock"><Lock size={24} className="text-blue-600" /></span> Reset Password
            </h2>
            <p className="text-gray-400 text-sm mt-2 text-center">
              Create a new strong password for <span className="font-semibold text-gray-600">{email}</span>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="border-b border-gray-300 relative">
              <label className="block text-xs text-gray-400 uppercase font-semibold">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="w-full py-2 outline-none focus:border-blue-500 bg-transparent text-gray-700 pr-10"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-0 bottom-2 text-gray-400 hover:text-blue-500 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="border-b border-gray-300 relative">
              <label className="block text-xs text-gray-400 uppercase font-semibold">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                className="w-full py-2 outline-none focus:border-blue-500 bg-transparent text-gray-700 pr-10"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-0 bottom-2 text-gray-400 hover:text-blue-500 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button type="submit" className="w-full rounded-xl bg-slate-800 py-4 text-white font-bold hover:bg-slate-700 transition duration-300 shadow-lg">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;