import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // <-- 1. Imported the Navbar

function UserProfile() {
  const initialFormState = {
    firstName: '',
    lastName: '',
    phone: '',
    universityEmail: '',
    address: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile Data:', formData);
  };

  const handleClearAll = () => {
    setFormData(initialFormState);
  };

  return (
    // Added an outer wrapper so the Navbar and the Profile component render together
    <div className="min-h-screen bg-gray-50">
      
      {/* <-- 2. Placed the Navbar at the top of the page --> */}
      <Navbar />

      {/* Your original UserProfile container */}
      <div className="max-w-4xl mx-auto p-8 font-sans bg-white text-[#111827] mt-8 rounded-xl shadow-sm border border-gray-100">
        {/* Header section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Personal info</h1>
          <button 
            type="button" 
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            View profile
          </button>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your display name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-[#F9FAFB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-[#F9FAFB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>
          </div>

          {/* Row 2: Phone & University E-mail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-[#F9FAFB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
                University E-mail
              </label>
              <input
                type="email"
                name="universityEmail"
                value={formData.universityEmail}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-[#F9FAFB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>
          </div>

          {/* Row 3: Your Address */}
          <div>
            <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
              Your Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-[#F9FAFB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
            />
          </div>

          {/* Divider line */}
          <hr className="border-gray-100 my-8" />

          {/* Action Buttons */}
          <div className="flex items-center gap-6 pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-[#111827] text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Update profile
            </button>
            
            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
            >
              {/* Close / X Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear all
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;