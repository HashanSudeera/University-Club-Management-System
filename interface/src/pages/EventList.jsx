import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, Users, ChevronRight } from 'lucide-react';
import TopNavbar from '../components/Dashboard/TopNavbar.jsx';
import SideNavbar from '../components/Dashboard/SideNavbar.jsx';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/events/", {
          withCredentials: true,
        });
        setEvents(res.data.data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
      <TopNavbar />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <SideNavbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm space-y-6">

              {/* Header */}
              <div className="border-b-2 border-blue-900 pb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-950">Events</h1>
              </div>

              {/* Loading */}
              {loading && (
                <p className="text-center text-gray-500 py-10">Loading events...</p>
              )}

              {/* Error */}
              {error && (
                <p className="text-center text-red-500 py-10">{error}</p>
              )}

              {/* Events Grid */}
              {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  {events.length === 0 && (
                    <p className="text-gray-500 col-span-3 text-center py-10">No events found.</p>
                  )}
                  {events.map((event) => (
                    <div
                      key={event._id}
                      className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col bg-white border border-blue-100 group cursor-pointer"
                      onClick={() => navigate(`/events/${event._id}`)}
                    >
                      
                      {/* Event Banner */}
                     <div className="h-32 bg-[#031428] flex items-center justify-center overflow-hidden">
                     {event.poster_path ? (
                      <img
                          src={`http://localhost:4000${event.poster_path}`}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          />
                         ) : (
                        <span className="text-amber-200 text-4xl font-black opacity-20">EVT</span>
                    )}
                    </div>

                      {/* Event Details */}
                      <div className="p-4 flex flex-col gap-2 flex-1">
                        <h3 className="text-base font-bold text-[#031428] group-hover:text-blue-700 transition-colors">
                          {event.title}
                        </h3>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar size={13} />
                          <span>{new Date(event.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>

                        {event.location && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <MapPin size={13} />
                            <span>{event.location}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Users size={13} />
                          <span>{event.participants?.length || 0} / {event.capacity} spots</span>
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            event.status === 'Ongoing' ? 'bg-green-100 text-green-700' :
                            event.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {event.status}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                            {event.type}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Button */}
                      <div className="bg-[#031428] px-4 py-3 flex justify-between items-center">
                        <span className="text-white text-xs font-semibold">View Details</span>
                        <ChevronRight size={16} className="text-amber-200" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventList;