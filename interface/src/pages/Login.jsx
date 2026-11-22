import React, { useState } from 'react';
import loginBg from '../assets/login.jpg';
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff, University } from "lucide-react"; 
import Logo from "/clublink.svg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  // Spotlight effect states for the right side
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password
      }, {
        withCredentials: true,
      });

      setAuth({ accessToken: res.data.accessToken, role: res.data.user.role , user: res.data.user });
      console.log(res.data);
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
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
      
      {/* Club Link Logo - Absolute Top Left */}
      <div className="absolute top-8 left-8 z-50 flex items-center gap-3 drop-shadow-md">
        <Link to="/">
          <div className="flex items-center gap-2 md:gap-3 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <img src={Logo} alt='Logo' className='w-7 md:w-9 shrink-0' />
            <div>
              <h1 className="text-yellow-500 text-[20px] md:text-[25px] leading-tight font-bold whitespace-nowrap">
                Club Link
              </h1>
              {/* Hides the long subtitle on very small screens so it doesn't break */}
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
          className="absolute h-full w-full object-cover opacity-40"
        />
        <div className="relative z-10 p-12 text-white font-sans">
          <h1 className="text-5xl font-bold leading-tight">
            Turning Vision <br /> into Impact.
          </h1>
          <p className="mt-6 text-2xl tracking-[0.3em] font-light italic text-gray-200">ACCESS</p>
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
            <h2 className="text-h3 font-bold flex items-center gap-2 text-gray-800 text-2xl">
              <span role="img" aria-label="grad-cap"><University size={35}/></span> Login
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
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

            <div className="border-b border-gray-300 relative">
              <label className="block text-xs text-gray-400 uppercase font-semibold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="w-full py-2 outline-none focus:border-blue-500 bg-transparent text-gray-700 pr-10"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              
              {/* Added Eye Icons to the toggle button */}
              <button
                type="button"
                className="absolute right-0 bottom-2 text-gray-400 hover:text-blue-500 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <div className="flex flex-row-reverse"> 
              <Link to="/OTPVerification" className="text-sm text-blue-600 font-bold cursor-pointer hover:underline">Forget Password?</Link>
            </div>
           
            <button type="submit" className="w-full rounded-xl bg-slate-800 py-4 text-white font-bold hover:bg-slate-700 transition duration-300 shadow-lg">
              Login
            </button>

            <p className="text-center text-sm text-gray-500">
              Do you have an account? <Link to="/register" className="text-yellow-700 font-bold cursor-pointer hover:underline">Register</Link>
            </p>
            {error ? <div className="bg-red-100 border-red-500 border-2 rounded-2xl p-2 text-red-700 text-center text-[15px] font-bold">{error}</div> : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;