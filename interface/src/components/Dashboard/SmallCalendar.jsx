import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const SmallCalendar = ({ onDateClick, events = [] }) => {

  // Custom renderer: Turns FullCalendar's default bulky event bars into tiny dots!
  const renderEventDot = (eventInfo) => {
    return (
      <div className="flex justify-center items-center w-full mt-0.5">
        <div 
          className="w-1.5 h-1.5 rounded-full shadow-sm"
          style={{ backgroundColor: eventInfo.event.backgroundColor || '#2563eb' }}
          title={eventInfo.event.title}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm small-fc-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        
        // Compact Header for Sidebar
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next'
        }}
        
        // Settings for a compact widget look
        height="auto"
        contentHeight="auto"
        fixedWeekCount={false} // Only shows 5 weeks if 6 aren't needed
        showNonCurrentDates={true}
        
        // Event & Click Handling
        events={events}
        eventContent={renderEventDot}
        dateClick={(info) => {
          if (onDateClick) onDateClick(info.dateStr);
        }}
      />

      {/* CSS Overrides to transform FullCalendar into a sleek sidebar widget */}
      <style jsx="true">{`
        /* Remove ugly table borders and background fills */
        .small-fc-wrapper .fc-theme-standard td,
        .small-fc-wrapper .fc-theme-standard th,
        .small-fc-wrapper .fc-theme-standard .fc-scrollgrid,
        .small-fc-wrapper .fc-col-header {
          border: none !important;
          background: transparent !important;
        }

        /* Style the Title (e.g. "July 2026") */
        .small-fc-wrapper .fc-toolbar-title {
          font-size: 1rem !important;
          font-weight: 700 !important;
          color: #011a39 !important; /* Tailwind blue-600 */
        }

        /* Style Prev/Next Arrows */
        .small-fc-wrapper .fc-button {
          background: transparent !important;
          border: none !important;
          color: #011a39 !important; /* Tailwind blue-500 */
          padding: 0.2rem 0.4rem !important;
          box-shadow: none !important;
        }
        .small-fc-wrapper .fc-button:hover {
          background: #b0b9c3 !important; /* Tailwind blue-100 */
          color: #011d3f !important;
          border-radius: 9999px !important;
        }
        .small-fc-wrapper .fc-button:focus {
          box-shadow: none !important;
        }

        /* Days of Week Header (Sun, Mon, Tue...) - FIXED BACKGROUND HERE */
        .small-fc-wrapper .fc-col-header-cell-cushion {
          font-size: 0.75rem !important;
          font-weight: 600 !important;
          color: #55687e !important; /* Tailwind blue-300 */
          padding-bottom: 8px !important;
          text-decoration: none !important;
          background: transparent !important; /* Changed from red to transparent */
          display: block !important;
          width: 100% !important;
        }

        /* Day Cell Frame */
        .small-fc-wrapper .fc-daygrid-day-frame {
          min-height: 42px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: flex-start !important;
          padding-top: 2px !important;
          cursor: pointer;
        }

        /* Day Numbers */
        .small-fc-wrapper .fc-daygrid-day-top {
          display: flex !important;
          justify-content: center !important;
          width: 100% !important;
        }
        .small-fc-wrapper .fc-daygrid-day-number {
          font-size: 0.85rem !important;
          color: #374151 !important;
          width: 26px !important;
          height: 26px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 9999px !important;
          text-decoration: none !important;
          transition: all 0.15s ease-in-out;
        }
        
        /* Hover effect on day numbers */
        .small-fc-wrapper .fc-daygrid-day:hover .fc-daygrid-day-number {
          background-color: #dbeafe !important; /* Tailwind blue-100 */
          color: #1e3a8a !important;
        }

        /* Highlight TODAY */
        .small-fc-wrapper .fc-day-today {
          background: transparent !important;
        }
        .small-fc-wrapper .fc-day-today .fc-daygrid-day-number {
          background-color: #b59e6d !important; /* Tailwind blue-600 */
          color: #ffffff !important;
          font-weight: bold !important;
          box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);
        }

        /* Prevent event spacing issues */
        .small-fc-wrapper .fc-daygrid-day-events {
          margin: 0 !important;
          width: 100% !important;
          display: flex !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          gap: 2px !important;
        }
        .small-fc-wrapper .fc-daygrid-event-harness {
          margin: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default SmallCalendar;