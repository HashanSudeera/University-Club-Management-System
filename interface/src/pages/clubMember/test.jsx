import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Needed for drag & drop and cell clicks

export default function test() {
  const [events, setEvents] = useState([
    { id: '1', title: 'Annual General Meeting', start: '2026-07-15T10:00:00', end: '2026-07-15T12:00:00' },
    { id: '2', title: 'Web Dev Workshop', start: '2026-07-18', allDay: true }
  ]);

  const handleDateClick = (arg) => {
    alert(`Clicked on date: ${arg.dateStr} — trigger modal to add club event!`);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        editable={true} // Enables drag-and-drop resizing
        selectable={true}
        events={events}
        dateClick={handleDateClick}
        height="auto"
      />
    </div>
  );
}