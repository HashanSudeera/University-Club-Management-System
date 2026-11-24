import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, Users, ArrowLeft, Download } from 'lucide-react';
import TopNavbar from '../components/Dashboard/TopNavbar.jsx';
import SideNavbar from '../components/Dashboard/SideNavbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [regError, setRegError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/events/${id}`, {
          withCredentials: true,
        });
        setEvent(res.data.data);
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    setRegistering(true);
    setRegError(null);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/eventRegisters/register",
        { event_id: event.event_id, addons: {} },
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
          withCredentials: true,
        }
      );
      setRegistered(true);
      setTicket(res.data.data.ticket_path);
    } catch (err) {
      setRegError(err.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
      <TopNavbar />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <SideNavbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">

            {/* Back Button */}
            <button
              onClick={() => navigate('/events')}
              className="flex items-center gap-2 text-blue-700 font-semibold mb-4 hover:underline"
            >
              <ArrowLeft size={18} /> Back to Events
            </button>

            {loading && <p className="text-center text-gray-500 py-10">Loading...</p>}
            {error && <p className="text-center text-red-500 py-10">{error}</p>}

            {event && (
              <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">

            {/* Top Banner */}
            <div className="h-48 bg-[#031428] flex items-center justify-center overflow-hidden">
             {event.poster_path ? (
                <img
                src={`http://localhost:4000${event.poster_path}`}
                alt={event.title}
                className="w-full h-full object-cover"
                 />
               ) : (
               <span className="text-amber-200 text-6xl font-black opacity-20">EVT</span>
                )}
                   </div>

                {/* Event Info */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h1 className="text-2xl font-bold text-[#031428]">{event.title}</h1>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        event.status === 'Ongoing' ? 'bg-green-100 text-green-700' :
                        event.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {event.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                        {event.type}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-blue-600" />
                      <span>{new Date(event.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-blue-600" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-blue-600" />
                      <span>{event.participants?.length || 0} / {event.capacity} registered</span>
                    </div>
                  </div>

                  
                  {/* Register Button — for Club Members and Club Admins */}
                     {(auth?.role === 'Club Member' || auth?.role === 'Club Admin') && event.type === 'register' && !registered && (
                    <div className="pt-2">
                      {regError && <p className="text-red-500 text-sm mb-2">{regError}</p>}
                      <button
                        onClick={handleRegister}
                        disabled={registering}
                        className="w-full bg-[#031428] text-white py-3 rounded-lg font-semibold text-sm hover:bg-blue-900 transition-colors disabled:opacity-60"
                      >
                        {registering ? "Registering..." : "Register for this Event"}
                      </button>
                    </div>
                  )}

                  {/* Success + Ticket */}
                  {registered && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center space-y-3">
                      <p className="text-green-700 font-bold text-lg">🎉 Successfully Registered!</p>
                      <p className="text-sm text-gray-600">Your ticket is ready. Show this at the entrance.</p>
                      {ticket && (
                        <div className="space-y-2">
                          <img
                            src={`http://localhost:4000${ticket}`}
                            alt="Event Ticket"
                            className="mx-auto rounded-lg shadow border border-gray-200"
                          />
                          <a
                            href={`http://localhost:4000${ticket}`}
                            download
                            className="inline-flex items-center gap-2 bg-[#031428] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-900 transition-colors"
                          >
                            <Download size={16} /> Download Ticket
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default EventDetail;