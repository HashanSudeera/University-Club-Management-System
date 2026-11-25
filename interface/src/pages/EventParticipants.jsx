import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Download, Search, AlertCircle } from 'lucide-react';
import TopNavbar from '../components/Dashboard/TopNavbar.jsx';
import SideNavbar from '../components/Dashboard/SideNavbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const EventParticipants = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await axios.get(`http://localhost:4000/api/events/${id}`, {
          withCredentials: true,
        });
        setEvent(eventRes.data.data);

        const partRes = await axios.get(`http://localhost:4000/api/eventRegisters/event/${id}`, {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
          withCredentials: true,
        });
        setParticipants(partRes.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load participants");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.accessToken) {
      fetchData();
    }
  }, [id, auth]);

  const filteredParticipants = participants.filter((p) => {
    const fullName = `${p.user_id?.firstName || ''} ${p.user_id?.lastName || ''}`.toLowerCase();
    const email = (p.user_id?.email || '').toLowerCase();
    const regId = (p.eventReg_id || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    return fullName.includes(q) || email.includes(q) || regId.includes(q);
  });

  const handleExportCSV = () => {
    if (participants.length === 0) return alert("No participants to export!");

    const headers = ["Reg ID", "First Name", "Last Name", "Email", "Academic Year", "Addons", "Registered At"];
    const rows = participants.map((p) => [
      p.eventReg_id,
      p.user_id?.firstName || '',
      p.user_id?.lastName || '',
      p.user_id?.email || '',
      p.user_id?.academicYear || '',
      JSON.stringify(p.addons || {}).replace(/"/g, '""'),
      new Date(p.createdAt).toLocaleString(),
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Participants-${event?.title || 'Event'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
      <TopNavbar />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <SideNavbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">

            <button
              onClick={() => navigate(`/events/${id}`)}
              className="flex items-center gap-2 text-blue-700 font-semibold hover:underline text-sm"
            >
              <ArrowLeft size={16} /> Back to Event Details
            </button>

            <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  Attendee Roster
                </span>
                <h1 className="text-2xl font-bold text-[#031428] mt-2">
                  {event?.title || "Event Participants"}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Total Registered: <strong className="text-blue-900">{participants.length}</strong> / {event?.capacity || '∞'} spots
                </p>
              </div>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 bg-[#031428] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-900 transition-colors shadow-sm"
              >
                <Download size={16} /> Export to CSV
              </button>
            </div>

            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or registration ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-blue-100 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 shadow-sm"
              />
            </div>

            {loading && <div className="text-center py-12 text-gray-500">Loading participants...</div>}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {!loading && !error && (
              <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
                {filteredParticipants.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 text-sm">
                    {searchQuery ? "No matching participants found." : "No participants have registered for this event yet."}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                      <thead className="bg-[#031428] text-white text-xs uppercase font-semibold">
                        <tr>
                          <th className="py-3 px-4">#</th>
                          <th className="py-3 px-4">Reg ID</th>
                          <th className="py-3 px-4">Participant Name</th>
                          <th className="py-3 px-4">Email</th>
                          <th className="py-3 px-4">Year</th>
                          <th className="py-3 px-4">Addons</th>
                          <th className="py-3 px-4">Registered Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredParticipants.map((p, index) => (
                          <tr key={p._id} className="hover:bg-blue-50/50 transition-colors">
                            <td className="py-3.5 px-4 font-medium text-gray-400">{index + 1}</td>
                            <td className="py-3.5 px-4 font-bold text-blue-900">{p.eventReg_id}</td>
                            <td className="py-3.5 px-4 font-semibold text-gray-900">
                              {p.user_id?.firstName} {p.user_id?.lastName}
                            </td>
                            <td className="py-3.5 px-4">{p.user_id?.email}</td>
                            <td className="py-3.5 px-4">{p.user_id?.academicYear || 'N/A'}</td>
                            <td className="py-3.5 px-4">
                              {p.addons && Object.keys(p.addons).length > 0 ? (
                                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
                                  {Object.entries(p.addons).map(([k, v]) => `${k}: ${v}`).join(', ')}
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs">—</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-xs text-gray-500">
                              {new Date(p.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default EventParticipants;