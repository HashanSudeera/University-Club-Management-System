import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Calendar as CalendarIcon, Clock, Users, Settings } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

// Import components
import TopNavbar from '../../components/Dashboard/TopNavbar.jsx';
import SideNavbar from '../../components/Dashboard/SideNavbar.jsx';
import SmallFullCalendar from '../../components/Dashboard/SmallCalendar.jsx'; 

const ClubAdminDashboard = () => {
  // State for fetching the created club
  const [adminClub, setAdminClub] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
    
  // Mock data for joined clubs and right-sidebar events
  const clubs = Array(5).fill({
    name: 'Club name',
    description: 'This is a club description',
    category: 'Sport',
  });

  const eventsList = [
    { date: '14', month: 'OCT', title: 'Sport Meeting', time: '4:00 PM - 6:30 PM' },
    { date: '14', month: 'OCT', title: 'Sport Meeting', time: '4:00 PM - 6:30 PM' },
    { date: '14', month: 'OCT', title: 'Sport Meeting', time: '4:00 PM - 6:30 PM' }
  ];

  const calendarEvents = [
    { title: 'Sport Meeting', date: '2026-07-14', backgroundColor: '#EF4444' }, 
    { title: 'Web Dev Workshop', date: '2026-07-18', backgroundColor: '#F59E0B' }, 
    { title: 'Hackathon Kickoff', date: '2026-07-25', backgroundColor: '#3B82F6' },
  ];

  const handleDateSelection = (dateStr) => {
    alert(`You clicked on: ${dateStr}`);
  };

  // Fetch created club data
  useEffect(() => {
    const fetchCreatedClub = async () => {
      // Safety check in case auth isn't fully loaded yet
      if (!auth?.user?.user_id) return;

      try {
        const adminId = auth.user.user_id; 
        
        const response = await fetch(`http://localhost:4000/api/clubadmin/${adminId}`);
        const result = await response.json();
        
        if (response.ok && result.success) {
          setAdminClub(result.data);
        }
      } catch (error) {
        console.error("Error fetching admin club:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreatedClub();
  }, [auth?.user?.user_id]);
  return (
    <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
      <TopNavbar />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        
        <SideNavbar />

        <div className="flex flex-1 flex-col lg:flex-row overflow-y-auto">
          
          <main className="flex-1 p-4 md:p-6 lg:p-8 order-1">
            <div className="max-w-5xl mx-auto space-y-8">
              
              <div className="block md:hidden">
                <h1 className="text-xl font-bold text-blue-900">
                  Welcome to <span className="text-blue-600">Admin</span> 👋
                </h1>
                <p className="text-xs text-blue-400 mt-0.5">Here is what's happening with your clubs today.</p>
              </div>

              <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 md:p-6 shadow-sm">
                
                <div className="flex justify-between items-center border-b-2 border-blue-900 mb-6 pb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-950">Manage Club</h2>
                  {/* Only show "Add Club" if it finishes loading and no club exists */}
                  {!isLoading && !adminClub && (
                    <Link to='/clubRegister' className="bg-blue-500 hover:bg-blue-300 text-white text-xs md:text-sm font-semibold px-5 md:px-6 py-2 md:py-2.5 rounded-lg transition-colors shadow-sm">
                      Add Club
                    </Link>
                  )}
                </div>

                {/* Conditional UI based on fetch state */}
                {isLoading ? (
                  <div className="flex justify-center items-center h-48 bg-white rounded-xl shadow-sm border border-blue-100 max-w-2xl">
                    <span className="text-blue-900 font-semibold animate-pulse">Loading club details...</span>
                  </div>
                ) : adminClub ? (
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-blue-100 flex flex-col md:flex-row max-w-2xl">
                    
                    <div className="h-48 md:h-auto md:w-1/2 bg-[#899bb1] flex items-center justify-center shrink-0">
                      {adminClub.logo_path ? (
                        <img src={adminClub.logo_path} alt={adminClub.club_name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={64} className="text-[#031428]" strokeWidth={1.5} />
                      )}
                    </div>

                    <div className="bg-[#031428] p-5 md:p-6 flex-1 flex flex-col justify-between text-white space-y-4">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold leading-tight">{adminClub.club_name}</h3>
                          <p className="text-gray-300 text-xs md:text-sm mt-0.5 line-clamp-2">
                            {adminClub.description || 'No description provided.'}
                          </p>
                        </div>
                        <span className="bg-[#f0c05a] text-[#031428] px-3.5 py-1 rounded text-xs font-bold shrink-0">
                          {adminClub.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 py-1">
                        <div className="w-10 h-10 bg-[#899bb1] rounded-lg flex items-center justify-center text-[#031428] shrink-0 font-bold">
                          <Users size={20} strokeWidth={2.2} />
                        </div>
                        <div>
                          <span className="text-[11px] text-gray-300 uppercase tracking-wider block font-semibold leading-none">Member Count</span>
                          <span className="text-base md:text-lg font-bold text-[#f0c05a] leading-tight">
                            {adminClub.membership?.length || 0} Students
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button className="flex-1 bg-[#324861] hover:bg-[#405b7a] text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors text-center shadow-inner">
                          Manage Club
                        </button>
                        <button className="bg-[#899bb1] hover:bg-[#a0b0c4] text-[#031428] p-2.5 rounded-lg transition-colors flex items-center justify-center shrink-0 shadow-inner" title="Club Settings">
                          <Settings size={20} strokeWidth={2.2} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-blue-100 flex flex-col items-center justify-center text-center max-w-2xl">
                    <Users size={48} className="text-blue-300 mb-4" />
                    <h3 className="text-lg font-bold text-blue-900 mb-2">No Club Created Yet</h3>
                    <p className="text-gray-500 text-sm max-w-md">You haven't registered a club yet. Click the "Add Club" button above to get started.</p>
                  </div>
                )}
              </div>

              {/* Joined Clubs */}
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 md:p-6 shadow-sm">
                
                <div className="border-b-2 border-blue-900 mb-6 pb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-950">Joined Clubs</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {clubs.map((club, index) => (
                    <Link to='/club' key={index}>
                    <div className="rounded-xl overflow-hidden shadow-sm flex flex-col bg-white border border-blue-100">
                      <div className="h-40 md:h-48 bg-[#899bb1] flex items-center justify-center">
                        <ImageIcon size={56} className="text-[#031428] md:w-16 md:h-16" strokeWidth={1.5} />
                      </div>
                      <div className="bg-[#031428] p-4 flex justify-between items-center min-h-[5rem]">
                        <div className="pr-2">
                          <h3 className="text-white text-lg font-semibold leading-tight">{club.name}</h3>
                          <p className="text-gray-300 text-sm md:text-base line-clamp-1">{club.description}</p>
                        </div>
                        <span className="bg-[#f0c05a] text-[#031428] px-4 py-1 rounded text-xs md:text-sm font-bold shrink-0">
                          {club.category}
                        </span>
                      </div>
                    </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-[380px] bg-blue-50 shrink-0 p-4 md:p-6 lg:border-l border-t lg:border-t-0 border-blue-100/80 space-y-6 order-2">
            
            <div className="max-w-md mx-auto lg:max-w-none">
              <SmallFullCalendar 
                events={calendarEvents}
                onDateClick={handleDateSelection} 
              />
            </div>

            <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-5 md:p-6 shadow-sm max-w-md mx-auto lg:max-w-none">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-blue-950">Upcoming Events</h3>
                <CalendarIcon size={20} className="text-blue-500" />
              </div>

              <div className="space-y-4">
                {eventsList.map((event, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-200/70 rounded-lg flex flex-col items-center justify-center shrink-0 text-[#031428]">
                      <span className="text-[10px] font-bold uppercase tracking-wider">{event.month}</span>
                      <span className="text-lg md:text-xl font-bold leading-none mt-0.5">{event.date}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-blue-950">{event.title}</h4>
                      <div className="flex items-center gap-1.5 text-blue-600 font-medium mt-1">
                        <Clock size={12} />
                        <span className="text-xs md:text-sm">{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 bg-[#031428] hover:bg-blue-900 text-white font-semibold py-3 rounded-xl transition-colors text-sm md:text-base shadow-sm">
                View Calendar
              </button>
            </div>
            
          </aside>
          
        </div>
      </div>
    </div>
  );
};

export default ClubAdminDashboard;