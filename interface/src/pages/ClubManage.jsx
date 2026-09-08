import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import { Shield, Users, X } from 'lucide-react';
import TopNav from '../components/Dashboard/TopNavbar';
import SideBar from '../components/Dashboard/ClubmanageSide';

export default function ClubManage() {
  const navigate = useNavigate(); // Initialize navigation
  
  // Store the initial saved state
  const [savedData, setSavedData] = useState({
    clubName: "Chess club",
    description: "Tell about your club",
    logoUpdated: false,
    bannerUpdated: false
  });

  // Store the current form state
  const [formData, setFormData] = useState(savedData);
  
  // Track if there are unsaved changes
  const [hasChanges, setHasChanges] = useState(false);

  // Compare current form data with saved data whenever form data changes
  useEffect(() => {
    const isChanged = 
      formData.clubName !== savedData.clubName ||
      formData.description !== savedData.description ||
      formData.logoUpdated !== savedData.logoUpdated ||
      formData.bannerUpdated !== savedData.bannerUpdated;
      
    setHasChanges(isChanged);
  }, [formData, savedData]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simulate saving changes
  const handleSaveChanges = () => {
    setSavedData(formData);
    setHasChanges(false);
  };

  // Simulate image changes to trigger the save bar
  const triggerImageChange = (type) => {
    setFormData((prev) => ({ ...prev, [type]: true }));
  };

  // Handle back button click
  const handleBack = () => {
    // Navigate back one step in browser history
    navigate(-1); 
  };

  return (
    <div className="min-h-screen bg-grey-50 font-sans text-blue-900 flex flex-col">
      <TopNav />

      <div className="flex-1 flex justify-center px-4 overflow-y-auto">
        <div className="flex w-full max-w-[1200px] relative">
          
          <SideBar/>

          {/* Main Content Area */}
          <main className="flex-1 px-8 py-10 relative flex flex-col">
            <div className="max-w-4xl relative flex-1">
              
              {/* Updated Close Button with handleBack */}
              <button 
                onClick={handleBack}
                className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center border border-blue-400 rounded-full text-blue-400 hover:bg-blue-100 transition-colors"
                title="Go Back"
              >
                <X size={16} />
              </button>

              <h2 className="text-h3 font-bold mb-2">Club Profile</h2>
              <p className="text-regular-body text-grey-300 max-w-2xl mb-10">
                Personalize your club's public profile to stand out to the university community. Update your logo, banner, and bio to showcase your organization's unique identity and attract new members.
              </p>

              {/* Form Fields */}
              <div className="space-y-8">
                
                {/* Editable Club Name */}
                <div>
                  <label htmlFor="clubName" className="block text-large-body text-blue-500 font-semibold mb-2">
                    Club Name
                  </label>
                  <input 
                    id="clubName"
                    name="clubName"
                    type="text" 
                    value={formData.clubName}
                    onChange={handleChange}
                    className="w-full max-w-md bg-blue-100 text-blue-900 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  />
                </div>

                <hr className="border-blue-300/30" />

                {/* Logo */}
                <div>
                  <h4 className="text-large-body text-blue-500 font-semibold mb-1">Logo</h4>
                  <p className="text-regular-body text-grey-300 mb-3">We recommend an image at least 512px x 512px</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => triggerImageChange('logoUpdated')}
                      className="bg-blue-500 text-white px-6 py-2 rounded-md text-regular-body font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Change Club Logo
                    </button>
                    <button 
                      onClick={() => triggerImageChange('logoUpdated')}
                      className="bg-blue-100 text-error px-6 py-2 rounded-md text-regular-body font-semibold hover:bg-blue-200 transition-colors"
                    >
                      Remove Club Logo
                    </button>
                  </div>
                </div>

                <hr className="border-blue-300/30" />

                {/* Banner */}
                <div>
                  <h4 className="text-large-body text-blue-500 font-semibold mb-1">Banner</h4>
                  <p className="text-regular-body text-grey-300 mb-3">We recommend an image at least 512px x 512px</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => triggerImageChange('bannerUpdated')}
                      className="bg-blue-500 text-white px-6 py-2 rounded-md text-regular-body font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Change banner
                    </button>
                    <button 
                      onClick={() => triggerImageChange('bannerUpdated')}
                      className="bg-blue-100 text-error px-6 py-2 rounded-md text-regular-body font-semibold hover:bg-blue-200 transition-colors"
                    >
                      Remove banner
                    </button>
                  </div>
                </div>

                <hr className="border-blue-300/30" />

                {/* Editable Description */}
                <div className="pb-8">
                  <h4 className="text-large-body text-blue-500 font-semibold mb-1">Description</h4>
                  <p className="text-regular-body text-grey-300 mb-3">Tell students what your organization is about and why they should join.</p>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full max-w-2xl h-32 bg-blue-100 text-blue-900 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow resize-none"
                  ></textarea>
                </div>

              </div>
              
              {/* Dynamic Pop-up Unsaved Changes Footer */}
              <div 
                className={`sticky bottom-10 mt-10 max-w-3xl flex items-center justify-between border border-blue-200 bg-grey-50/95 backdrop-blur-md px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out z-10 ${
                  hasChanges 
                    ? 'opacity-100 translate-y-0 visible' 
                    : 'opacity-0 translate-y-8 invisible'
                }`}
              >
                <span className="text-large-body text-blue-900 font-semibold">You have unsaved changes.</span>
                <button 
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md text-regular-body font-semibold hover:bg-blue-600 transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}