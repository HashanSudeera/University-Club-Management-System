// import React, { useState } from 'react';
// import loginBg from '../assets/login.jpg';
// import { useAuth } from "../context/AuthContext";
// import { useNavigate , Link } from "react-router-dom";
// import axios from "axios";



// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // State for the toggle

//   const { setAuth } = useAuth();
//   const navigate = useNavigate();

//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:4000/api/auth/login", {
//         email,
//         password
//       }, {
//         withCredentials: true,
//       });

//       // setAuth({ accessToken: res.data.accessToken, role: res.user.role }); was incorrect
//       setAuth({ accessToken: res.data.accessToken, role: res.data.user.role });
//       console.log(res.data);
//       navigate("/"); // Redirect to home after successful login
//     } catch (err) {
//       // 2. Robust error checking for Axios
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error);
//       } else if (err.message) {
//         setError(err.message); // Captures network errors (e.g., server down)
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="flex h-screen w-full overflow-hidden font-sora">
//       {/* Left Section:*/}
//       <div className="relative hidden lg:flex w-1/2 items-center justify-center bg-blue-900">
//         <img
//           src={loginBg}
//           alt="University life"
//           className="absolute inset-0 h-full w-full object-cover opacity-40"
//         />
//         <div className="relative z-10 p-12 text-white font-sans">
//           <h1 className="text-5xl font-bold leading-tight">
//             Turning Vision <br /> into Impact.
//           </h1>
//           <p className="mt-6 text-2xl tracking-[0.3em] font-light italic text-gray-200">ACCESS</p>
//         </div>
//       </div>

//       {/* Right Section: Form */}
//       <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#022c5e] p-6">
//         <div className="w-full max-w-md rounded-[2.5rem] bg-white p-12 shadow-2xl">
//           <div className="mb-10 flex flex-col items-center">
//             <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
//               <span role="img" aria-label="grad-cap">🎓</span> Login
//             </h2>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-8">
//             <div className="border-b border-gray-300">
//               <label className="block text-xs text-gray-400 uppercase font-semibold">University Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 className="w-full py-2 outline-none focus:border-blue-500 bg-transparent text-gray-700"
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="name@univ.ac.lk"
//                 required
//               />
//             </div>

//             <div className="border-b border-gray-300 relative">
//               <label className="block text-xs text-gray-400 uppercase font-semibold">Password</label>
//               <input
//                 type={showPassword ? "text" : "password"} // Switches between text and password
//                 value={password}
//                 className="w-full py-2 outline-none focus:border-blue-500 bg-transparent text-gray-700 pr-10"
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 required
//               />
//               {/*  Toggle Button */}
//               <button
//                 type="button"
//                 className="absolute right-0 bottom-2 text-gray-400 hover:text-blue-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >

//               </button>
//             </div>

//             <button type="submit" className="w-full rounded-xl bg-slate-800 py-4 text-white font-bold hover:bg-slate-700 transition duration-300 shadow-lg">
//               Login
//             </button>

//             <p className="text-center text-sm text-gray-400">
//               Do you have an account? <Link to="/register" className="text-orange-600 font-bold cursor-pointer hover:underline">Register</Link>
//             </p>
//             {error ? <div className="bg-red-300 border-red-500 border-2 rounded-2xl p-2 backdrop-blur-md text-[15px] font-bold">{error}</div> : <></>}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React from 'react';
import loginBg from '../assets/login.jpg';
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Changed component name to UserProfile to match its route configuration
function Login() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout request error:", err);
    } finally {
      setAuth(null);
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sora">
      {/* Left Section: Visual Banner */}
      <div className="relative hidden lg:flex w-1/2 items-center justify-center bg-blue-900">
        <img
          src={loginBg}
          alt="University life"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative z-10 p-12 text-white font-sans">
          <h1 className="text-5xl font-bold leading-tight">
            Managing Your <br /> Academic Profile.
          </h1>
          <p className="mt-6 text-2xl tracking-[0.3em] font-light italic text-gray-200">DASHBOARD</p>
        </div>
      </div>

      {/* Right Section: Content Card */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#022c5e] p-6">
        <div className="w-full max-w-md rounded-[2.5rem] bg-white p-12 shadow-2xl">
          <div className="mb-10 flex flex-col items-center">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
              <span role="img" aria-label="user-avatar">👤</span> User Profile
            </h2>
          </div>

          <div className="space-y-8">
            <div className="border-b border-gray-300 pb-2">
              <label className="block text-xs text-gray-400 uppercase font-semibold">Current System Role</label>
              <p className="w-full py-2 font-bold text-gray-700 text-lg">
                {auth?.role || "Loading..."}
              </p>
            </div>

            <div className="border-b border-gray-300 pb-2">
              <label className="block text-xs text-gray-400 uppercase font-semibold">Access Status</label>
              <p className="w-full py-2 text-green-600 font-semibold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
                Authenticated Session
              </p>
            </div>

            <div className="pt-4 space-y-4">
              <Link 
                to="/" 
                className="block w-full text-center rounded-xl bg-slate-800 py-4 text-white font-bold hover:bg-slate-700 transition duration-300 shadow-lg"
              >
                Back to Dashboard
              </Link>

              <button 
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl border-2 border-red-500 bg-transparent py-4 text-red-600 font-bold hover:bg-red-50 transition duration-300"
              >
                Logout from Account
              </button>
            </div>

            <p className="text-center text-sm text-gray-400">
              Need assistance? <Link to="/AboutUs" className="text-orange-600 font-bold cursor-pointer hover:underline">Contact Support</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;