import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  Check, 
  Info, 
  Trash2, 
  ArrowUpRight 
} from 'lucide-react';

// Import your existing layout components
import TopNavbar from '../../components/Dashboard/TopNavbar.jsx';
import SideNavbar from '../../components/Dashboard/SideNavbar.jsx';

const ClubAdminRequests = () => {
  // Mock data matching the UI mockup
  const [requests, setRequests] = useState([
    {
      id: 1,
      initials: 'JC',
      name: 'Jane Cooper',
      email: 'jessica.hanson@example.com',
      date: '5/27/15',
    },
    {
      id: 2,
      initials: 'WW',
      name: 'Wade Warren',
      email: 'willie.jennings@example.com',
      date: '5/19/12',
    },
    {
      id: 3,
      initials: 'EH',
      name: 'Esther Howard',
      email: 'd.chambers@example.com',
      date: '3/4/16',
    },
    {
      id: 4,
      initials: 'JW',
      name: 'Jenny Wilson',
      email: 'willie.jennings@example.com',
      date: '3/4/16',
    },
  ]);

  // Action handlers
  const handleApprove = (id) => {
    // Add your approval logic here
    console.log(`Approved request ${id}`);
  };

  const handleDelete = (id) => {
    setRequests(requests.filter((item) => item.id !== id));
  };

  return (
     <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
      <TopNavbar />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        
        {/* Left Navbar */}
        <SideNavbar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          
      
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b-2 border-[#1e293b]">
        <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight">
          Club Admin requests
        </h2>
        <button className="flex items-center gap-1 text-sm font-semibold text-[#0f172a] hover:text-blue-700 transition-colors">
          See More
          <ArrowUpRight size={18} />
        </button>
      </div>

      {/* Table Outer Container */}
      <div className="bg-[#b4c3d4]/60 p-3 rounded-2xl border border-slate-300/80">
        
        {/* Table Header Row */}
        <div className="bg-[#0b192c] text-white rounded-xl px-6 py-3.5 flex items-center justify-between text-sm font-bold shadow-sm mb-3">
          <div className="w-[30%] flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
            <span>Club Admin</span>
            <ArrowUpDown size={14} className="text-gray-300" />
          </div>
          <div className="w-[40%]">E-mail</div>
          <div className="w-[15%]">Date</div>
          <div className="w-[15%] flex items-center justify-end gap-3 text-gray-200">
            <Check size={18} strokeWidth={2.5} />
            <Info size={18} strokeWidth={2.5} />
          </div>
        </div>

        {/* Request Rows List */}
        <div className="space-y-2.5">
          {requests.map((item) => (
            <div
              key={item.id}
              className="bg-[#9bb0c1] hover:bg-[#8ea5b8] transition-colors rounded-xl px-6 py-3 flex items-center justify-between text-sm font-semibold text-[#0f172a]"
            >
              {/* Initials & Name */}
              <div className="w-[30%] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0b192c] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                  {item.initials}
                </div>
                <span className="font-bold text-[#0f172a] truncate">
                  {item.name}
                </span>
              </div>

              {/* Email */}
              <div className="w-[40%] text-[#2c3e50] font-medium truncate pr-2">
                {item.email}
              </div>

              {/* Date */}
              <div className="w-[15%] text-[#0f172a] font-medium">
                {item.date}
              </div>

              {/* Actions */}
              <div className="w-[15%] flex items-center justify-end gap-4">
                <button
                  onClick={() => handleApprove(item.id)}
                  className="text-[#0f172a] hover:text-green-700 transition-colors"
                  title="Approve"
                >
                  <Check size={20} strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-[#a83232] hover:text-red-700 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}

          {/* Empty State when all items are deleted */}
          {requests.length === 0 && (
            <div className="p-8 text-center text-slate-700 font-medium">
              No pending club admin requests.
            </div>
          )}
        </div>

      </div>
    
        </main>

      </div>
    </div>
    
    
  );
};

export default ClubAdminRequests;