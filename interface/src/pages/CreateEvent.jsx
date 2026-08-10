import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Calendar, 
  Megaphone, 
  Bell, 
  User, 
  Camera, 
  ChevronDown 
} from 'lucide-react';

import TopNavbar from '../components/Dashboard/TopNavbar.jsx';
import SideNavbar from '../components/Dashboard/SideNavbar.jsx';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    dateTime: '',
    location: '',
    description: '',
    category: '',
    poster: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, poster: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Data:', formData);
  };

  return (
    <div className="min-h-screen bg-[#EFEFEF] flex flex-col font-sans text-slate-800">
      {/* Top Bar */}
      <TopNavbar />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideNavbar/>

        {/* Event Form Card */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
            
            <div className="lg:col-span-7 p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#001220] pb-4 mb-6 border-b border-gray-200">
                  Create New Event
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Event Name
                    </label>
                    <input
                      type="text"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleChange}
                      className="w-full bg-[#E5E7EB] border-b-2 border-gray-600 px-4 py-3 rounded-t-md text-sm focus:outline-none focus:bg-gray-200 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange}
                        className="w-full bg-[#E5E7EB] border-b-2 border-gray-600 px-3 py-3 rounded-t-md text-sm text-gray-700 focus:outline-none focus:bg-gray-200 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-[#E5E7EB] border-b-2 border-gray-600 px-4 py-3 rounded-t-md text-sm focus:outline-none focus:bg-gray-200 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Elaborate on the vision and itinerary for this event..."
                      className="w-full bg-[#E5E7EB] border-b-2 border-gray-600 p-4 rounded-t-md text-sm placeholder-gray-500 focus:outline-none focus:bg-gray-200 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-[#E5E7EB] border-b-2 border-gray-600 px-4 py-3 rounded-t-md text-sm text-gray-700 appearance-none focus:outline-none focus:bg-gray-200 transition-colors cursor-pointer"
                      >
                        <option value="" disabled>Select a category</option>
                        <option value="academic">Academic / Educational</option>
                        <option value="sports">Sports & Fitness</option>
                        <option value="cultural">Cultural & Arts</option>
                        <option value="tech">Technology & Workshops</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
                    </div>
                  </div>

                  <div>
                    <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 text-center bg-gray-50/50 flex flex-col items-center justify-center space-y-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                        <Camera size={20} />
                      </div>
                      <div className="text-xs font-bold text-gray-700">Upload Event Poster</div>
                      <p className="text-[10px] text-gray-400">
                        Optimal size: 1200 × 630 pixels.<br />
                        JPG, PNG or WEBP formats.
                      </p>
                      <label className="mt-2 inline-block bg-white border border-gray-300 rounded-md px-3 py-1 text-[11px] font-semibold text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50">
                        Browse Files
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      {formData.poster && (
                        <p className="text-xs text-emerald-600 font-medium mt-1">
                          Selected: {formData.poster.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#001220] text-white py-3 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-colors shadow-md"
                    >
                      Publish Event
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Side Branding */}
            <div className="lg:col-span-5 bg-[#001220] relative flex items-end p-12 overflow-hidden min-h-[300px] lg:min-h-full">
              <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
                <div className="w-96 h-96 border-[16px] border-white rounded-full flex items-center justify-center">
                  <div className="w-64 h-64 border-[12px] border-white rounded-full" />
                </div>
              </div>

              <div className="relative z-10 text-left">
                <h2 className="text-5xl font-black text-amber-200 leading-tight tracking-wide">
                  Start <br />
                  Something <br />
                  New
                </h2>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateEvent;