import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// Imported external components
import TopNavbar from '../components/Dashboard/TopNavbar.jsx';
import SideNavbar from '../components/Dashboard/SideNavbar.jsx';

export default function EventCalendar() {
  return (
    <div className="flex flex-col h-screen bg-[#E5E7EB] font-sans overflow-hidden">
      
      {/* Top Navbar */}
      <TopNavbar />

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <SideNavbar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-hidden flex flex-col">
          <div className="bg-white rounded-lg flex flex-col h-full shadow-sm">
            
            {/* Page Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b-[3px] border-[#0B1727] shrink-0">
              <h2 className="text-[26px] font-bold text-[#0B1727]">Event Calendar</h2>
              <button className="bg-[#0B1727] text-white px-8 py-2.5 rounded text-sm font-medium hover:bg-opacity-90 transition-colors">
                Add Event
              </button>
            </div>

            {/* Calendar Wrapper */}
            <div className="flex-1 p-8 overflow-auto calendar-container">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                // By omitting 'initialDate', it automatically defaults to the current month/day
                headerToolbar={{
                  left: 'title',
                  center: '',
                  // Added navigation so the user can change months
                  right: 'prev,next today' 
                }}
                height="100%"
                fixedWeekCount={false}
              />
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}