import React from 'react';
import TopNavbar from '../components/Dashboard/TopNavbar';
import SideNavbar from '../components/Dashboard/SideNavbar';

function ClubPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <SideNavbar />

      
      <div className="flex-1 flex flex-col">
        
        <TopNavbar />

        
        <main className="flex-1 p-6 overflow-y-auto">
          
          {/* 1. Header section */}
          <div className="bg-slate-800 text-white rounded-xl p-8 mb-6 relative overflow-hidden shadow-lg">
            {/* ( Placeholder Image) */}
            <div 
               className ="w-full h-64 bg-cover bg-center flrx flex-col justify-center relative px-8 py-12 rounded-lg" style={{ backgroundImage: "url('/sports.jpg')"}} >
            </div>
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* club logo and name */}
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-800 font-bold text-xl shadow-md border-2 border-white">
                  👟
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Athletic Club</h1>
                  <p className="text-slate-300 text-sm mt-1 max-w-xl">
                    A vibrant club of University of Colombo to explore more sports activities.
                  </p>
                </div>
              </div>

              {/* Buttons and Members*/}
    <div className="flex flex-col gap-4 mt-6">
      
      {/*  Both Action Buttons Side-by-Side */}
      <div className="flex flex-row items-center gap-4">
        
        {/* Join Club Button */}
         <button className="bg-slate-800/80 hover:bg-slate-700 text-white font-medium px-6 py-2.5 rounded-full border border-gray-600 transition duration-200 cursor-pointer">
    
         Join Club
        </button>

        {/* Club Manage Button */}
        <button className="bg-slate-800/80 hover:bg-slate-700 text-white font-medium px-6 py-2.5 rounded-full border border-gray-600 transition duration-200 cursor-pointer">
          Club Manage
        </button>

      </div>

      {/* Member Count */}
      <div className="flex items-center gap-2 pl-1">
        
        {/* Overlapping Profile Avatars */}
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-[10px] select-none">👩‍🎓</div>
          <div className="w-6 h-6 rounded-full bg-slate-600 border-2 border-slate-900 flex items-center justify-center text-[10px] select-none">👨‍🎓</div>
          <div className="w-6 h-6 rounded-full bg-slate-500 border-2 border-slate-900 flex items-center justify-center text-[10px] select-none">🧑‍🎓</div>
        </div>
        
        {/* Member Counter Text */}
        <div className="flex items-center gap-1.5 text-xs text-gray-300">
          <span className="text-gray-400">Member Count:</span>
          <span className="font-semibold text-amber-400">56 Students</span>
        </div>

      </div>

    </div>
    {/* ===================================================== */}

  </div>
</div>

          {/* 2. Two clumn layout  */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left side column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Latest Announcements Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Latest Announcements</h2>
                <p className="text-gray-400 text-sm">Announcements cards will go here...</p>
              </div>

              {/* Recent Activities Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h2>
                <p className="text-gray-400 text-sm">Activity cards (posts) will go here...</p>
              </div>
            </div>

            {/* right side column */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Events</h2>
                <p className="text-gray-400 text-sm">Events list will go here...</p>
              </div>{/* Club Members */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Club Members</h2>
                <p className="text-gray-400 text-sm">Members list will go here...</p>
              </div>
            </div>

          </div></main>
      </div>
    </div>
  );
}

export default ClubPage;