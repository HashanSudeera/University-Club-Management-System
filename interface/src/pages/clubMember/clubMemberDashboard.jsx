import React from 'react';
import { 
  Image as ImageIcon,
  Calendar as CalendarIcon,
  Clock
} from 'lucide-react';

// Import your new components
import TopNavbar from '../../components/Dashboard/TopNavbar.jsx';
import SideNavbar from '../../components/Dashboard/SideNavbar.jsx';

const ClubMemberDashboard = () => {
    
  // Mock data for clubs
  const clubs = Array(5).fill({
    name: 'Club name',
    description: 'This is a club description',
    category: 'Sport',
  });

  // Mock data for events
  const events = Array(3).fill({
    date: '14',
    month: 'OCT',
    title: 'Sport Meeting',
    time: '4:00 PM - 6:30 PM',
  });

  return (
    <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
      
      {/* 1. Insert Top Navbar Component */}
      <TopNavbar />

      <div className="flex flex-1 overflow-hidden">
        
        {/* 2. Insert Side Navbar Component */}
        <SideNavbar />

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="border-b-2 border-blue-600 mb-6 pb-2">
              <h2 className="text-h3 font-bold text-blue-600">Joined Clubs</h2>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {clubs.map((club, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-sm flex flex-col">
                  {/* Card Image Area */}
                  <div className="h-48 bg-blue-200 flex items-center justify-center">
                    <ImageIcon size={64} className="text-blue-300" strokeWidth={1.5} />
                  </div>
                  {/* Card Details Area */}
                  <div className="bg-blue-600 p-4 flex justify-between items-center h-20">
                    <div>
                      <h3 className="text-white text-h5 font-semibold leading-tight">{club.name}</h3>
                      <p className="text-blue-100 text-regular-body">{club.description}</p>
                    </div>
                    <span className="bg-yellow-500 text-blue-900 px-6 py-1.5 rounded text-regular-body font-semibold">
                      {club.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar (Calendar & Events) */}
        <aside className="w-80 bg-blue-50 shrink-0 p-6 overflow-y-auto border-l border-blue-100/50 space-y-6">
          
          {/* Calendar Widget */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-h4 font-bold text-blue-600">Calendar</h3>
              <div className="flex items-center gap-2">
                <span className="text-h5 text-blue-500">Apr 2026</span>
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-blue-600"></div>
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-regular-body">
              {/* Days of week */}
              <div className="text-blue-300 font-medium">S</div>
              <div className="text-blue-300 font-medium">M</div>
              <div className="text-blue-300 font-medium">T</div>
              <div className="text-blue-300 font-medium">W</div>
              <div className="text-blue-300 font-medium">T</div>
              <div className="text-blue-300 font-medium">F</div>
              <div className="text-blue-300 font-medium">S</div>
              
              {/* Dates Row 1 */}
              <div className="py-1">27</div>
              <div className="py-1">28</div>
              <div className="py-1">29</div>
              <div className="py-1">30</div>
              <div className="py-1">1</div>
              <div className="py-1">2</div>
              <div className="py-1">3</div>
              
              {/* Dates Row 2 */}
              <div className="py-1">4</div>
              <div className="py-1">5</div>
              <div className="py-1 rounded-full bg-white border border-blue-100 flex items-center justify-center w-8 h-8 mx-auto shadow-sm">6</div>
              <div className="py-1">7</div>
              <div className="py-1 rounded-full bg-blue-600 text-white flex items-center justify-center w-8 h-8 mx-auto">8</div>
              <div className="py-1">9</div>
              <div className="py-1">10</div>

              {/* Dates Row 3 */}
              <div className="py-1">11</div>
              <div className="py-1">12</div>
              <div className="py-1">13</div>
              <div className="py-1">14</div>
              <div className="py-1 relative">
                15
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-error"></div>
                  <div className="w-1 h-1 rounded-full bg-warning"></div>
                  <div className="w-1 h-1 rounded-full bg-info"></div>
                </div>
              </div>
              <div className="py-1">16</div>
              <div className="py-1">17</div>

              {/* Dates Row 4 */}
              <div className="py-1">18</div>
              <div className="py-1">19</div>
              <div className="py-1">20</div>
              <div className="py-1">21</div>
              <div className="py-1 relative">
                22
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-error"></div>
                  <div className="w-1 h-1 rounded-full bg-info"></div>
                </div>
              </div>
              <div className="py-1">23</div>
              <div className="py-1">24</div>

              {/* Dates Row 5 */}
              <div className="py-1">25</div>
              <div className="py-1">26</div>
              <div className="py-1">27</div>
              <div className="py-1">28</div>
              <div className="py-1">29</div>
              <div className="py-1">30</div>
              <div className="py-1">31</div>
            </div>
          </div>

          {/* Upcoming Events Widget */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-h5 font-bold text-blue-600">Upcoming Events</h3>
              <CalendarIcon size={20} className="text-blue-400" />
            </div>

            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="flex gap-4 items-center">
                  {/* Date Block */}
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex flex-col items-center justify-center shrink-0">
                    <span className="text-caption font-bold text-blue-400">{event.month}</span>
                    <span className="text-h5 font-bold text-blue-600 leading-none mt-0.5">{event.date}</span>
                  </div>
                  {/* Event Info */}
                  <div>
                    <h4 className="font-bold text-large-body text-blue-600">{event.title}</h4>
                    <div className="flex items-center gap-1.5 text-blue-300 mt-1">
                      <Clock size={12} />
                      <span className="text-caption">{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-regular-body">
              View Calendar
            </button>
          </div>
          
        </aside>
      </div>
    </div>
  );
};

export default ClubMemberDashboard;