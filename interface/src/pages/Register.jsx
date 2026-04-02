import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


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
    <div className="min-h-screen flex font-sora">

      {/* LEFT SIDE */}
      <div className="w-1/2 bg-[#021129] text-white flex items-center justify-center">
        <div className="text-center px-10">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
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
          <div className="flex mb-6 bg-gray-300 rounded-full p-1">
            <button
              type="button"
              onClick={() => handleRoleChange("Club Member")}
              className={`w-1/2 py-2 rounded-full transition ${formData.role === "Club Member"
                ? "bg-[#021129]  text-white"
                : "text-gray-700"
                }`}
            >
              Club Member
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange("Club Admin")}
              className={`w-1/2 py-2 rounded-full transition ${formData.role === "Club Admin"
                ? "bg-[#021129]  text-white"
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
              className="input"
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="input"
            />

            <input
              type="email"
              name="email"
              placeholder="University Email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input"
              required
            />

            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>

            <button className="w-full bg-[#021129] n text-white py-2 rounded-lg hover:bg-blue-800 transition">
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-500 cursor-pointer hover:underline">Login</Link>
          </p>
          {/* Error Display */}
          {error && (
            <div className="bg-red-300 w-[350px] border-red-500 border-2 rounded-2xl p-2 backdrop-blur-md text-[15px] font-bold text-center">
              {error}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
export default Register;