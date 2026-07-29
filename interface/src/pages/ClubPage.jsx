import React from 'react';
import TopNavbar from '../components/Dashboard/TopNavbar';
import SideNavbar from '../components/Dashboard/SideNavbar';

function ClubPage() {
  return (
    <div className="min-h-screen bg-[#eef1f6] font-sans flex flex-col">
      
      {/* Top Navigation - Full Width Top */}
      <TopNavbar />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar Navigation */}
        <SideNavbar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* ==========================================
                1. HEADER SECTION (Banner & Profile)
                ========================================== */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative">
              
              {/* Banner Image Container */}
              <div 
                className="w-full h-48 md:h-[240px] bg-cover bg-center rounded-xl relative overflow-hidden bg-gray-200" 
                style={{ backgroundImage: "url('/sports.jpg')" }}
              >
                {/* Banner image only - Title has been moved below */}
              </div>
              
              {/* Below Banner Container (Avatar, Desc, Title, Buttons) */}
              <div className="relative pt-3 pb-2 px-2 flex flex-col lg:flex-row justify-between items-start lg:items-center min-h-[70px] gap-6">
                
                {/* Left Side: Avatar, Description, & Title */}
                <div className="flex items-start">
                  
                  {/* Floating Circular Avatar */}
                  <div className="absolute -bottom-[-8px] left-4 w-[110px] h-[110px] bg-white rounded-full flex items-center justify-center text-4xl shadow-sm border-[4px] border-white shrink-0 z-20">
                    👟
                  </div>
                  
                  {/* Text Container (Margin left leaves room for the floating avatar) */}
                  <div className="ml-[132px] mt-1 flex flex-col">
                    <h1 className="text-2xl md:text-[28px] font-extrabold text-[#0a192f] tracking-tight leading-tight mt-0.5">
                      Athletic Club
                    </h1>
                    <p className="text-gray-500 text-sm md:text-[15px] max-w-md leading-relaxed">
                      A vibrant club of University of Colombo to explore more sports activities.
                    </p>
                    
                  </div>
                </div>

                {/* Right Side: Members Count and Action Buttons */}
                <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto mt-2 lg:mt-0 pl-[132px] lg:pl-0">
                  
                  {/* Member Count */}
                  <div className="flex items-center gap-3">
                    {/* Overlapping Profile Avatars */}
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white flex items-center justify-center text-xs shadow-sm z-20">👨‍🎓</div>
                      <div className="w-8 h-8 rounded-full bg-slate-500 border-2 border-white flex items-center justify-center text-xs shadow-sm z-10">👩‍🎓</div>
                      <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-white flex items-center justify-center text-xs shadow-sm z-0">🧑‍🎓</div>
                    </div>
                    
                    {/* Member Counter Text */}
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider leading-none">Members</span>
                      <span className="text-sm font-bold text-[#0a192f] mt-0.5">56 Students</span>
                    </div>
                  </div>

                  {/* Action Buttons Side-by-Side */}
                  <div className="flex items-center gap-3">
                    {/* Join Club Button */}
                    <button className="bg-[#0a192f] hover:bg-slate-800 text-white font-medium px-6 py-2.5 rounded-lg transition-colors cursor-pointer shadow-sm text-sm">
                      Join Club
                    </button>

                    {/* Club Manage Button */}
                    <button className="bg-[#f8fafc] hover:bg-gray-100 text-gray-700 font-medium px-6 py-2.5 rounded-lg border border-gray-200 transition-colors cursor-pointer shadow-sm text-sm">
                      Manage
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* ==========================================
                2. CONTENT CARDS (2x2 Grid)
                ========================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Latest Announcements */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
                <h2 className="text-[17px] font-bold text-[#0a192f] mb-4">Latest Announcements</h2>
                <hr className="border-gray-100 mb-5" />
                <div className="flex-1 bg-[#f4f6f9] rounded-xl p-8 text-center border border-dashed border-gray-300 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Announcements cards will go here...</p>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
                <h2 className="text-[17px] font-bold text-[#0a192f] mb-4">Upcoming Events</h2>
                <hr className="border-gray-100 mb-5" />
                <div className="flex-1 bg-[#f4f6f9] rounded-xl p-8 text-center border border-dashed border-gray-300 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Events list will go here...</p>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
                <h2 className="text-[17px] font-bold text-[#0a192f] mb-4">Recent Activities</h2>
                <hr className="border-gray-100 mb-5" />
                <div className="flex-1 bg-[#f4f6f9] rounded-xl p-8 text-center border border-dashed border-gray-300 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Activity cards (posts) will go here...</p>
                </div>
              </div>

              {/* Club Members */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
                <h2 className="text-[17px] font-bold text-[#0a192f] mb-4">Club Members</h2>
                <hr className="border-gray-100 mb-5" />
                <div className="flex-1 bg-[#f4f6f9] rounded-xl p-8 text-center border border-dashed border-gray-300 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Members list will go here...</p>
                </div>
              </div>

            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default ClubPage;