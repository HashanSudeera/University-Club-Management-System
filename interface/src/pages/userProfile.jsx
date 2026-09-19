import React, { useState, useEffect } from 'react'; // add useEffect 
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // import AuthContext 

function UserProfile() {
  const { auth } = useAuth(); // catch data from loged user
  const initialFormState = {
    firstName: '',
    lastName: '',
    phone: '',
    universityEmail: '',
    address: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(''); // Modern popup message state eka
  const [errors, setErrors] = useState({});

  // show current data on frontend in database
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Auth object:", auth); // 1. auth eke monawada thiyenne balanna

      const userId = auth?.user?.id || auth?.user?._id;
      console.log("Extracted userId:", userId); // 2. userId eka allagannawada balanna

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching from: http://localhost:4000/api/users/profile/${userId}`);
        const response = await axios.get(`http://localhost:4000/api/users/profile/${userId}`);
        console.log("Response data from backend:", response.data); // 3. data enawada balanna

        const userData = response.data;

        // Labunu data ape form eke state ekata set karanawa
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          phone: userData.phone || '',
          universityEmail: userData.universityEmail || '',
          address: userData.address || ''
        });
      } catch (error) {
        console.error('Loading error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (auth) {
      fetchUserData(); // function call
    }
  }, [auth]);  // auth eka wenas weddi meka nawatha kriyatmaka wei

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation එක: හිස් ෆීල්ඩ්ස් තියෙනවද බලනවා
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // ඩේටා හිස් නම් රික්වෙස්ට් එක බේකන්ඩ් එකට යන්න දෙන්නේ නැත
    }

    setErrors({}); // එරර් නැත්නම් ඒවා ක්ලියර් කරමු

    try {
      const userId = auth?.user?.id || auth?.user?._id;
      if (!userId) {
        alert('Please log first');
        return;
      }

      const payload = {
        ...formData,
        userId: userId
      };

      const response = await axios.put('http://localhost:4000/api/users/update-profile', payload, {
        withCredentials: true
      });

      if (response.status === 200) {
        setSuccessMessage('Profile update successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }

    } catch (error) {
      console.error('error genarate during Update:', error);
      alert('Error, Try again !');
    }
  };

  const handleClearAll = () => {
    setFormData(initialFormState);
    setErrors({}); // ක්ලියර් කළාම එරර්ස් ටිකත් නැති කර දමමු
  };

  return (
    // Added an outer wrapper so the Navbar and the Profile component render together
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Modern Success Toast Notification */}
      {successMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-800 transition-all transform animate-bounce">
          <div className="bg-emerald-500 text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-sm">Success!</h4>
            <p className="text-xs text-gray-300">{successMessage}</p>
          </div>
        </div>
      )}

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
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => {
                  handleChange(e);
                  setErrors(prev => ({ ...prev, firstName: '' }));
                }}
                className={`w-full px-4 py-3 border rounded-xl bg-[#F9FAFB] placeholder-gray-400 focus:outline-none transition-all ${errors.firstName ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-gray-200'
                  }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  ⚠️ {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => {
                  handleChange(e);
                  setErrors(prev => ({ ...prev, lastName: '' }));
                }}
                className={`w-full px-4 py-3 border rounded-xl bg-[#F9FAFB] placeholder-gray-400 focus:outline-none transition-all ${errors.lastName ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-gray-200'
                  }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  ⚠️ {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                className={`w-full px-4 py-3 border rounded-xl bg-[#F9FAFB] placeholder-gray-400 focus:outline-none transition-all border-gray-200 focus:ring-2 focus:ring-gray-200`}
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
                className={`w-full px-4 py-3 border rounded-xl bg-[#F9FAFB] placeholder-gray-400 focus:outline-none transition-all border-gray-200 focus:ring-2 focus:ring-gray-200`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
              Your Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => {
                handleChange(e);
                setErrors(prev => ({ ...prev, address: '' }));
              }}
              className={`w-full px-4 py-3 border rounded-xl bg-[#F9FAFB] placeholder-gray-400 focus:outline-none transition-all ${errors.address ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-gray-200'
                }`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                ⚠️ {errors.address}
              </p>
            )}
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