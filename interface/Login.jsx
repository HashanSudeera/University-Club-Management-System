import React, { useState } from 'react';
import loginBg from './assets/login.jpg'; 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for the toggle

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data for Backend:", { email, password });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Section:*/}
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
          <p className="mt-6 text-2xl tracking-[0.3em] font-light italic text-gray-200">ACCESS</p>
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#022c5e] p-6">
        <div className="w-full max-w-md rounded-[2.5rem] bg-white p-12 shadow-2xl">
          <div className="mb-10 flex flex-col items-center">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
              <span role="img" aria-label="grad-cap">🎓</span> Login
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
                type={showPassword ? "text" : "password"} // Switches between text and password
                value={password}
                className="w-full py-2 outline-none focus:border-blue-500 bg-transparent text-gray-700 pr-10"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required 
              />
              {/*  Toggle Button */}
              <button 
                type="button"
                className="absolute right-0 bottom-2 text-gray-400 hover:text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button type="submit" className="w-full rounded-xl bg-slate-800 py-4 text-white font-bold hover:bg-slate-700 transition duration-300 shadow-lg">
              Login
            </button>

            <p className="text-center text-sm text-gray-400">
              Do you have an account? <span className="text-orange-600 font-bold cursor-pointer hover:underline">Register</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;