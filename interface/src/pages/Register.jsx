import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // Imported eye icons
import Logo from "/clublink.svg";


function Register() {
  const navigate = useNavigate();
  // SINGLE STATE (BEST PRACTICE)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    academicYear: "",
    role: "Club Member",
  });

  const [error, setError] = useState(null);

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE ROLE CHANGE
  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role: role,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post("http://localhost:4000/api/auth/register", formData, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      // 2. Robust error checking for Axios
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message); // Captures network errors (e.g., server down)
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex font-sora relative">

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
      <div className="w-1/2 bg-[#021129] text-white flex items-center justify-center relative">
        <div className="text-center px-10">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
            CLUB PORTAL
          </span>

          <h1 className="text-[40px] mt-6 font-semibold leading-snug">
            Your legacy starts <br /> with your club.
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex items-center justify-center bg-gray-200">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

          <h2 className="text-xl font-semibold text-center mb-4">
            Create An Account
          </h2>

          {/* ROLE SWITCH */}
          <div className="flex mb-6 bg-gray-300 rounded-full p-1 text-sm font-semibold">
            <button
              type="button"
              onClick={() => handleRoleChange("Club Member")}
              className={`w-1/2 py-2 rounded-full transition ${formData.role === "Club Member"
                ? "bg-[#021129] text-white"
                : "text-gray-700"
                }`}
            >
              Club Member
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange("Club Admin")}
              className={`w-1/2 py-2 rounded-full transition ${formData.role === "Club Admin"
                ? "bg-[#021129] text-white"
                : "text-gray-700"
                }`}
            >
              Club Admin
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="input w-full"
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="input w-full"
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="input w-full"
            />

            <input
              type="email"
              name="email"
              placeholder="University Email"
              value={formData.email}
              onChange={handleChange}
              className="input w-full"
              required
            />

            {/* Password with Eye Icon */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input w-full pr-10" // Add padding right for icon
                required
              />
              <button
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#021129] transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password with Eye Icon */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input w-full pr-10" // Add padding right for icon
                required
              />
              <button
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#021129] transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="input w-full text-gray-600"
            >
              <option value="" disabled>Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>

            <button className="w-full bg-[#021129] text-white font-bold py-3 mt-2 rounded-lg hover:bg-blue-800 transition shadow-md">
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-600 font-bold cursor-pointer hover:underline">Login</Link>
          </p>

          {/* Error Display */}
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 rounded-lg p-3 text-[14px] font-semibold text-center">
              {error}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Register;