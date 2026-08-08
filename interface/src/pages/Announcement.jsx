import React, { useState } from 'react';
import TopNavbar from '../components/Dashboard/TopNavbar';
import SideNavbar from '../components/Dashboard/SideNavbar';

const Announcements = () => {
  // To check if the pop up open or close
  const [isOpen, setIsOpen] = useState(false);
  
  const announcementList = [
    {
      id: 1,
      title: "Internal Debate Competition Finalists",
      description: "Congratulations to the finalists for the upcoming inter-collegiate challenge. Mandatory briefing this Friday at the Student Union Room 402.",
      tag: "Debate Society",
      time: "2 hours ago",
      icon: "📢",
      iconBg: "bg-amber-500/20 text-amber-600"
    },
    {
      id: 2,
      title: "Practice Session Cancelled",
      description: "The rowing practice scheduled for tomorrow morning is cancelled due to weather warnings. Stay safe everyone.",
      tag: "Varsity Rowing",
      time: "Yesterday",
      icon: "ℹ️",
      iconBg: "bg-slate-200 text-slate-700"
    },
    {
      id: 3,
      title: "Internal Debate Competition Finalists",
      description: "Congratulations to the finalists for the upcoming inter-collegiate challenge. Mandatory briefing this Friday at the Student Union Room 402.",
      tag: "Debate Society",
      time: "2 hours ago",
      icon: "📢",
      iconBg: "bg-amber-500/20 text-amber-600"
    },
    {
      id: 4,
      title: "Practice Session Cancelled",
      description: "The rowing practice scheduled for tomorrow morning is cancelled due to weather warnings. Stay safe everyone.",
      tag: "Varsity Rowing",
      time: "Yesterday",
      icon: "ℹ️",
      iconBg: "bg-slate-200 text-slate-700"
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
      
      {/* 1. Top navbar */}
      <TopNavbar />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        
        {/* 2. Left sidebar */}
        <SideNavbar />

        {/* 3. Main content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            
            {/* Outer Container Box (Matches ClubExplore) */}
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm space-y-6">
              
              {/* Title & Add Button Header */}
              <div className="flex justify-between items-center border-b-2 border-blue-900 pb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-950">Announcements</h1>
                
                <button 
                  onClick={() => setIsOpen(true)} 
                  className="bg-[#031428] hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  + Add Announcement
                </button>
              </div>

              {/* Announcements List Container */}
              <div className="flex flex-col gap-4 pt-2">
                {announcementList.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className="bg-white border border-blue-100 rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow relative group cursor-pointer"
                  >
                    {/* Left Side Icon */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl shadow-sm ${announcement.iconBg}`}>
                      {announcement.icon}
                    </div>

                    {/* Texts and Details */}
                    <div className="flex-1 pr-20">
                      <h2 className="text-sm md:text-base font-bold text-[#031428] group-hover:text-blue-700 transition-colors leading-tight">
                        {announcement.title}
                      </h2>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed max-w-3xl">
                        {announcement.description}
                      </p>
                      
                      <span className="inline-block mt-3 bg-[#f1f5f9] border border-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-bold">
                        {announcement.tag}
                      </span>
                    </div>

                    {/* Right Side Time */}
                    <span className="absolute top-5 right-5 text-xs text-gray-400 font-medium whitespace-nowrap">
                      {announcement.time}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* New Announcement Modal Pop up */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#031428]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          {/* Modal Box */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-8 relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold text-[#031428] mb-6">
              New Announcement
            </h2>

            {/* Form Fields */}
            <div className="flex flex-col gap-5">
              
              {/* 1. Announcement Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Title</label>
                <input 
                  type="text" 
                  placeholder="Enter announcement title..."
                  className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white text-gray-800 placeholder-gray-400 transition-all"
                />
              </div>

              {/* 2. Category Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                <div className="relative">
                  <select 
                    className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white text-gray-800 transition-all appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="debate">Debate Society</option>
                    <option value="rowing">Varsity Rowing</option>
                    <option value="general">General</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    ▼
                  </div>
                </div>
              </div>

              {/* 3. Content Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Content</label>
                <textarea 
                  rows="5"
                  placeholder="Provide full details of your announcement here..."
                  className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white text-gray-800 placeholder-gray-400 transition-all resize-none"
                ></textarea>
              </div>

              {/* 4. Action Button */}
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-full bg-[#031428] hover:bg-slate-800 text-white font-medium text-sm py-3.5 rounded-xl transition-colors mt-2 shadow-sm"
              >
                Post Announcement
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Announcements;