import React from 'react';
import { Image as ImageIcon, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";

// Import components
import TopNavbar from '../../components/Dashboard/TopNavbar.jsx';
import SideNavbar from '../../components/Dashboard/SideNavbar.jsx';
import SmallFullCalendar from '../../components/Dashboard/SmallCalendar.jsx'; 

const ClubMemberDashboard = () => {
    
  // Mock data for clubs
  const clubs = Array(5).fill({
    name: 'Club name',
    description: 'This is a club description',
    category: 'Sport',
  });

  // Mock data for right-sidebar event list
  const eventsList = [
    { date: '14', month: 'JUL', title: 'Sport Meeting', time: '4:00 PM - 6:30 PM' },
    { date: '18', month: 'JUL', title: 'Web Dev Workshop', time: '1:00 PM - 3:00 PM' },
    { date: '25', month: 'JUL', title: 'Hackathon Kickoff', time: '9:00 AM - 5:00 PM' }
  ];

  // FullCalendar Event Format
  const calendarEvents = [
    { title: 'Sport Meeting', date: '2026-07-14', backgroundColor: '#EF4444' }, // Red Dot
    { title: 'Web Dev Workshop', date: '2026-07-18', backgroundColor: '#F59E0B' }, // Yellow Dot
    { title: 'Hackathon Kickoff', date: '2026-07-25', backgroundColor: '#3B82F6' }, // Blue Dot
  ];

  const handleDateSelection = (dateStr) => {
    alert(`You clicked on: ${dateStr}`);
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
      <TopNavbar />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        
        {/* Left Navbar */}
        <SideNavbar />

        <div className="flex flex-1 flex-col lg:flex-row overflow-y-auto">
          
          {/* Main Content Area */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 order-1">
            <div className="max-w-5xl mx-auto">
              
              {/* NEW: Mobile-Only Welcome Greeting ('block md:hidden') */}
              <div className="block md:hidden mb-4">
                <h1 className="text-xl font-bold text-blue-900">
                  Welcome to <span className="text-blue-600">Name</span> 👋
                </h1>
                <p className="text-xs text-blue-400 mt-0.5">Here is what's happening with your clubs today.</p>
              </div>

              {/* Joined Clubs Header */}
              <div className="border-b-2 border-blue-600 mb-6 pb-2">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-600">Joined Clubs</h2>
              </div>
              
              {/* Clubs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {clubs.map((club, index) => (
                  <Link to='/club'>
                  <div key={index} className="rounded-xl overflow-hidden shadow-sm flex flex-col bg-white">
                    <div className="h-40 md:h-48 bg-blue-200 flex items-center justify-center">
                      <ImageIcon size={56} className="text-blue-300 md:w-16 md:h-16" strokeWidth={1.5} />
                    </div>
                    <div className="bg-blue-600 p-4 flex justify-between items-center min-h-[5rem]">
                      <div className="pr-2">
                        <h3 className="text-white text-lg font-semibold leading-tight">{club.name}</h3>
                        <p className="text-blue-100 text-sm md:text-base line-clamp-1">{club.description}</p>
                      </div>
                      <span className="bg-yellow-500 text-blue-900 px-4 py-1 rounded text-xs md:text-sm font-semibold shrink-0">
                        {club.category}
                      </span>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          </main>

          {/* Right Sidebar (Calendar & Events) */}
          <aside className="w-full lg:w-100 bg-blue-50 shrink-0 p-4 md:p-6 lg:border-l border-t lg:border-t-0 border-blue-100/80 space-y-6 order-2">
            
            {/* FullCalendar Mini Widget */}
            <div className="max-w-md mx-auto lg:max-w-none">
              <SmallFullCalendar 
                events={calendarEvents}
                onDateClick={handleDateSelection} 
              />
            </div>

            {/* Upcoming Events Widget */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 md:p-6 shadow-sm max-w-md mx-auto lg:max-w-none">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-blue-600">Upcoming Events</h3>
                <CalendarIcon size={20} className="text-blue-400" />
              </div>

              <div className="space-y-4">
                {eventsList.map((event, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-lg flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-blue-400">{event.month}</span>
                      <span className="text-lg md:text-xl font-bold text-blue-600 leading-none mt-0.5">{event.date}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-blue-600">{event.title}</h4>
                      <div className="flex items-center gap-1.5 text-blue-300 mt-1">
                        <Clock size={12} />
                        <span className="text-xs md:text-sm">{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm md:text-base">
                View Calendar
              </button>
            </div>
            
          </aside>
          
        </div>
      </div>
    </div>
  );
};

export default ClubMemberDashboard;