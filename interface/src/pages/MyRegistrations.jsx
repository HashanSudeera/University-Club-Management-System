import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Download, Trash2, Ticket, AlertCircle } from 'lucide-react';
import TopNavbar from '../components/Dashboard/TopNavbar.jsx';
import SideNavbar from '../components/Dashboard/SideNavbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const MyRegistrations = () => {
  const { auth } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  // Fetch all registrations of current user
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/eventRegisters/my", {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
          withCredentials: true,
        });
        setRegistrations(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load registrations");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.accessToken) {
      fetchRegistrations();
    }
  }, [auth]);

  // Cancel a registration
  const handleCancel = async (regId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this registration?");
    if (!confirmCancel) return;

    setCancellingId(regId);
    try {
      await axios.delete(`http://localhost:4000/api/eventRegisters/${regId}`, {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
        withCredentials: true,
      });

      // Remove the cancelled registration from UI
      setRegistrations((prev) => prev.filter((item) => item._id !== regId));
      alert("Registration cancelled successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel registration.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
      <TopNavbar />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <SideNavbar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* Page Header */}
            <div className="border-b-2 border-blue-900 pb-3 flex justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-blue-950">My Registrations</h1>
                <p className="text-sm text-gray-600 mt-1">View your event passes and tickets</p>
              </div>
              <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">
                {registrations.length} {registrations.length === 1 ? 'Event' : 'Events'}
              </span>
            </div>

            {/* Loading & Error States */}
            {loading && (
              <div className="text-center py-12 text-gray-500 font-medium">
                Loading your registrations...
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && registrations.length === 0 && (
              <div className="bg-white rounded-2xl border border-blue-100 p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 mb-4">
                  <Ticket size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">No Registrations Found</h2>
                <p className="text-gray-500 text-sm mb-6">
                  You haven't registered for any events yet. Check out the explore tab!
                </p>
                <a
                  href="/events"
                  className="bg-[#031428] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-900 transition-colors inline-block"
                >
                  Browse Events
                </a>
              </div>
            )}

            {/* Registrations List */}
            {!loading && !error && registrations.length > 0 && (
              <div className="grid grid-cols-1 gap-6">
                {registrations.map((reg) => {
                  const event = reg.event_id;
                  const ticketUrl = reg.ticket_path ? `http://localhost:4000${reg.ticket_path}` : null;

                  return (
                    <div
                      key={reg._id}
                      className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 flex flex-col md:flex-row gap-6 items-center"
                    >
                      {/* Ticket Preview or QR Placeholder */}
                      <div className="w-full md:w-56 shrink-0 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden flex flex-col items-center justify-center p-3 text-center">
                        {ticketUrl ? (
                          <img
                            src={ticketUrl}
                            alt="Ticket Pass"
                            className="w-full h-auto rounded-lg shadow-sm"
                          />
                        ) : (
                          <div className="py-8 text-gray-400 flex flex-col items-center gap-2">
                            <Ticket size={40} />
                            <span className="text-xs font-medium">Digital Pass</span>
                          </div>
                        )}
                        <span className="text-[11px] font-bold text-blue-900 mt-2 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                          ID: {reg.eventReg_id}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 space-y-3 w-full">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-xl font-bold text-[#031428]">
                              {event?.title || "Event Title"}
                            </h2>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Registered on: {new Date(reg.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          {event?.status && (
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-700">
                              {event.status}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                          {event?.date && (
                            <div className="flex items-center gap-2">
                              <Calendar size={15} className="text-blue-600 shrink-0" />
                              <span>{new Date(event.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          )}
                          {event?.location && (
                            <div className="flex items-center gap-2">
                              <MapPin size={15} className="text-blue-600 shrink-0" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Addons display if present */}
                        {reg.addons && Object.keys(reg.addons).length > 0 && (
                          <div className="bg-gray-50 border border-gray-100 rounded-lg p-2.5 text-xs text-gray-600 flex flex-wrap gap-3">
                            {Object.entries(reg.addons).map(([k, v]) => (
                              <span key={k}>
                                <strong className="capitalize">{k.replace('_', ' ')}:</strong> {String(v)}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                          {ticketUrl && (
                            <a
                              href={ticketUrl}
                              download={`Ticket-${reg.eventReg_id}.png`}
                              className="inline-flex items-center gap-2 bg-[#031428] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-900 transition-colors shadow-sm"
                            >
                              <Download size={14} /> Download Ticket
                            </a>
                          )}

                          <button
                            onClick={() => handleCancel(reg._id)}
                            disabled={cancellingId === reg._id}
                            className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors disabled:opacity-50"
                          >
                            <Trash2 size={14} />
                            {cancellingId === reg._id ? "Cancelling..." : "Cancel Registration"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default MyRegistrations;