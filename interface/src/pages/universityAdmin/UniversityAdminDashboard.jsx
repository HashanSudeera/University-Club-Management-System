import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import {
  Image as ImageIcon,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Box,
  Bookmark,
  ArrowUpRight,
  Check,
  Trash2,
  Info,
  Volume2,
  ArrowUpDown
} from 'lucide-react';
// Import components
import TopNavbar from '../../components/Dashboard/TopNavbar.jsx';
import SideNavbar from '../../components/Dashboard/SideNavbar.jsx';
import SmallFullCalendar from '../../components/Dashboard/SmallCalendar.jsx';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// 1. ඔයා කොපි කරපු Data ටිකයි Tooltip එකයි මෙතනට (Main component එකට උඩින්) දාන්න.
const dummyClubData = [
  { name: 'Art Club', memberCount: 150 },
  { name: 'Sports Club', memberCount: 120 },
  { name: 'IT Club', memberCount: 90 },
  { name: 'Drama Club', memberCount: 40 }
];

//Pie chart blue theam colors
const COLORS = ['#004B73', '#1798D9', '#57C0F8', '#E6EEF4']; 
const totalMembers = dummyClubData.reduce((sum, club) => sum + club.memberCount, 0);

// Detail card
const CustomTooltip = ({ active, payload, coordinate }) => {
  if (active && payload && payload.length && coordinate) {
    const data = payload[0].payload;
    const percentage = ((data.memberCount / totalMembers) * 100).toFixed(1);

    const cx = 140;
    const cy = 140;

    const mx = coordinate.x;
    const my = coordinate.y;

    const angle = Math.atan2(my - cy, mx - cx);

   // Distance pie chart & card
    const outerRadius = 90

    const x = cx + outerRadius * Math.cos(angle);
    const y = cy + outerRadius * Math.sin(angle);

    const isRight = Math.cos(angle) >= 0;
    const isBottom = Math.sin(angle) >= 0;

    return (
      <div
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          transform: `translate(${isRight ? '0%' : '-100%'}, ${isBottom ? '0%' : '-100%'})`,
        }}
        className="z-50 bg-white p-3.5 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-gray-100 min-w-[160px] pointer-events-none transition-transform duration-75 ease-out"
      >
        {/* Header with color dot */}
        <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-1.5">
          <span
            className="w-3 h-3 rounded-full shrink-0 shadow-sm"
            style={{ backgroundColor: payload[0].color || data.fill }}
          ></span>
          <h4 className="font-bold text-gray-800 text-xs sm:text-sm truncate">
            {data.name}
          </h4>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1 text-xs sm:text-sm">
          <div className="flex justify-between items-center gap-3">
            <span className="text-gray-500 font-medium">Members:</span>
            <span className="font-bold text-[#004B73]">{data.memberCount}</span>
          </div>
          <div className="flex justify-between items-center gap-3">
            <span className="text-gray-500 font-medium">Percentage:</span>
            <span className="font-bold text-[#1798D9]">{percentage}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const UniversityAdminDashboard = () => {

  // Mock data for clubs (kept untouched as requested)
  const clubs = Array(5).fill({
    name: 'Club name',
    description: 'This is a club description',
    category: 'Sport',
  });

  // Mock data for right-sidebar event list
  const eventsList = [
    { date: '14', month: 'OCT', title: 'Sport Meeting', time: '4:00 PM - 6:30 PM' },
    { date: '14', month: 'OCT', title: 'Sport Meeting', time: '4:00 PM - 6:30 PM' },
    { date: '14', month: 'OCT', title: 'Sport Meeting', time: '4:00 PM - 6:30 PM' }
  ];

  // FullCalendar Event Format
  const calendarEvents = [
    { title: 'Sport Meeting', date: '2026-07-14', backgroundColor: '#EF4444' },
    { title: 'Web Dev Workshop', date: '2026-07-18', backgroundColor: '#F59E0B' },
    { title: 'Hackathon Kickoff', date: '2026-07-25', backgroundColor: '#3B82F6' },
  ];

  // ========================================================
  // NEW: MOCK DATA FOR UNIVERSITY ADMIN MIDDLE SECTION
  // ========================================================
  const adminRequests = [
    { initials: 'JC', name: 'Jane Cooper', email: 'jessica.hanson@example.com', date: '5/27/15' },
    { initials: 'WW', name: 'Wade Warren', email: 'willie.jennings@example.com', date: '5/19/12' },
    { initials: 'EH', name: 'Esther Howard', email: 'd.chambers@example.com', date: '3/4/16' },
    { initials: 'JW', name: 'Jenny Wilson', email: 'willie.jennings@example.com', date: '3/4/16' },
  ];

  const announcements = [
    {
      title: 'Internal Debate Competition Finalists',
      time: '2 hours ago',
      content: 'Congratulations to the finalists for the upcoming inter-collegiate challenge. Mandatory briefing this Friday at the Student Union Room 402.',
      club: 'Debate Society',
      icon: <Volume2 size={20} className="text-[#031428]" />
    },
    {
      title: 'Practice Session Cancelled',
      time: 'Yesterday',
      content: 'Due to unexpected venue maintenance, today\'s evening practice session is officially cancelled. We will resume normal schedule next Monday.',
      club: 'Sports Council',
      icon: <Info size={20} className="text-[#031428]" />
    }
  ];

  const handleDateSelection = (dateStr) => {
    alert(`You clicked on: ${dateStr}`);
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
      <TopNavbar />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">

        {/* Left Navbar */}
        <SideNavbar />

        <div className="flex flex-1 flex-col lg:flex-row overflow-y-auto">

          {/* Main Content Area */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 order-1">
            <div className="max-w-5xl mx-auto space-y-8">

              {/* Mobile-Only Welcome Greeting ('block md:hidden') */}
              <div className="block md:hidden">
                <h1 className="text-xl font-bold text-blue-900">
                  Welcome to <span className="text-blue-600">Name</span> 👋
                </h1>
                <p className="text-xs text-blue-400 mt-0.5">Here is what's happening with your clubs today.</p>
              </div>

              {/* ========================================================
                  1. OVERVIEW STATS SECTION
              ======================================================== */}
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 md:p-6 shadow-sm">
                <div className="border-b-2 border-blue-900 mb-6 pb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-950">Overview</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Total User */}
                  <div className="bg-[#031428] rounded-xl p-5 flex items-center justify-between text-white shadow-sm">
                    <div>
                      <p className="text-xs md:text-sm text-gray-300 font-medium">Total User</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#f0c05a] mt-1">40,689</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#1e324a] rounded-xl flex items-center justify-center text-[#6882a0]">
                      <Users size={24} />
                    </div>
                  </div>

                  {/* Card 2: Total Club */}
                  <div className="bg-[#031428] rounded-xl p-5 flex items-center justify-between text-white shadow-sm">
                    <div>
                      <p className="text-xs md:text-sm text-gray-300 font-medium">Total Club</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#f0c05a] mt-1">100</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#1e324a] rounded-xl flex items-center justify-center text-[#f0c05a]">
                      <Box size={24} />
                    </div>
                  </div>

                  {/* Card 3: Total Completed Events */}
                  <div className="bg-[#031428] rounded-xl p-5 flex items-center justify-between text-white shadow-sm">
                    <div>
                      <p className="text-xs md:text-sm text-gray-300 font-medium leading-tight">Total Completed<br />Events</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#f0c05a] mt-1">34</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#0e3b3e] rounded-xl flex items-center justify-center text-[#2dd4bf]">
                      <Bookmark size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Club status pie chart */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 w-full">
                <h3 className="text-lg font-bold mb-8 text-[#0B2447]">Members Overview</h3>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
                  
                  {/* Chart Container (280px x 280px) */}
                  <div className="relative h-[280px] w-[280px] flex-shrink-0 flex items-center justify-center">
                    
                    {/*Center totsl mrmbers*/}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                      <span className="text-4xl font-extrabold text-[#004B73]">{totalMembers}</span>
                      <span className="text-sm text-gray-500 font-medium mt-1">Total Members</span>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dummyClubData}
                          cx="50%"
                          cy="50%"
                          innerRadius={75}
                          outerRadius={105}
                          paddingAngle={0} 
                          dataKey="memberCount"
                          stroke="#ffffff"
                          strokeWidth={2}
                          isAnimationActive={true}
                          animationDuration={1200}
                        >
                          {dummyClubData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        
                        {/* Cursor tracking for dynamic positioning */}
                        <Tooltip 
                          content={<CustomTooltip />} 
                          position={{ x: 0, y: 0 }}
                          cursor={{ fill: 'transparent' }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Right Side: Club Category Names */}
                  <div className="flex flex-col gap-4">
                    {dummyClubData.map((entry, index) => (
                      <div key={`legend-${index}`} className="flex items-center gap-3">
                        <span 
                          className="w-4 h-4 rounded-full shrink-0" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span className="font-medium text-gray-600 text-[15px]">
                          {entry.name}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* ========================================================
                  2. CLUB ADMIN REQUESTS TABLE
              ======================================================== */}
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 md:p-6 shadow-sm">
                <div className="flex justify-between items-center border-b-2 border-blue-900 mb-6 pb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-950">Club Admin requests</h2>
                  <button className="flex items-center gap-1 text-sm font-semibold text-blue-950 hover:text-blue-700 transition-colors">
                    See More <ArrowUpRight size={16} />
                  </button>
                </div>

                {/* Table Container */}
                <div className="bg-[#b3c2d4] rounded-xl overflow-hidden shadow-inner p-2 md:p-3 space-y-2">

                  {/* Table Header */}
                  <div className="bg-[#031428] text-white px-4 py-3 rounded-lg flex items-center justify-between text-xs md:text-sm font-semibold">
                    <div className="flex items-center gap-2 w-1/3">
                      <span>Club Admin</span>
                      <ArrowUpDown size={14} className="text-gray-400 cursor-pointer" />
                    </div>
                    <div className="w-1/3 hidden md:block">E-mail</div>
                    <div className="w-1/6">Date</div>
                    <div className="flex items-center justify-end gap-3 w-1/6">
                      <Check size={18} />
                      <Info size={18} />
                    </div>
                  </div>

                  {/* Table Rows */}
                  {adminRequests.map((req, idx) => (
                    <div key={idx} className="bg-[#98acc3]/60 hover:bg-[#98acc3] px-4 py-3 rounded-lg flex items-center justify-between text-xs md:text-sm text-[#031428] font-medium transition-colors">

                      {/* Name & Avatar */}
                      <div className="flex items-center gap-3 w-1/3">
                        <div className="w-8 h-8 bg-[#031428] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          {req.initials}
                        </div>
                        <span className="font-bold truncate">{req.name}</span>
                      </div>

                      {/* Email (Hidden on mobile) */}
                      <div className="w-1/3 hidden md:block text-gray-800 truncate pr-2">
                        {req.email}
                      </div>

                      {/* Date */}
                      <div className="w-1/6 text-gray-800 font-semibold">{req.date}</div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-3 w-1/6 text-[#031428]">
                        <button className="p-1 hover:bg-white/40 rounded transition-colors" title="Approve">
                          <Check size={18} strokeWidth={2.5} />
                        </button>
                        <button className="p-1 hover:bg-white/40 rounded text-red-900 transition-colors" title="Delete">
                          <Trash2 size={18} strokeWidth={2} />
                        </button>
                      </div>

                    </div>
                  ))}

                </div>
              </div>

              {/* ========================================================
                  3. ANNOUNCEMENT FEED SECTION
              ======================================================== */}
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 md:p-6 shadow-sm">
                <div className="flex justify-between items-center border-b-2 border-blue-900 mb-6 pb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-950">Announcement</h2>
                  <button className="flex items-center gap-1 text-sm font-semibold text-blue-950 hover:text-blue-700 transition-colors">
                    See More <ArrowUpRight size={16} />
                  </button>
                </div>

                {/* Announcement Cards List */}
                <div className="space-y-4">
                  {announcements.map((item, idx) => (
                    <div key={idx} className="bg-[#b3c2d4] rounded-xl p-4 md:p-5 flex flex-col md:flex-row gap-4 items-start justify-between shadow-sm">

                      <div className="flex gap-4 items-start flex-1">
                        {/* Icon Box */}
                        <div className="w-10 h-10 bg-[#f0c05a] rounded-lg flex items-center justify-center shrink-0 shadow-inner mt-0.5">
                          {item.icon}
                        </div>

                        {/* Text Content */}
                        <div className="space-y-1">
                          <h4 className="text-base md:text-lg font-bold text-[#031428] leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-xs md:text-sm text-[#1e324a] leading-relaxed">
                            {item.content}
                          </p>
                          <span className="inline-block text-xs font-bold text-[#d97706] pt-1">
                            {item.club}
                          </span>
                        </div>
                      </div>

                      {/* Timestamp */}
                      <span className="text-xs font-semibold text-[#324861] shrink-0 md:self-start">
                        {item.time}
                      </span>

                    </div>
                  ))}
                </div>
              </div>

              {/* ========================================================
                  4. JOINED CLUBS SECTION (Original Section Kept Untouched)
              ======================================================== */}
              <div className="border-b-2 border-blue-600 mb-6 pb-2 pt-4">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-600">Joined Clubs</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {clubs.map((club, index) => (
                  <Link key={index} to='/club'>
                    <div className="rounded-xl overflow-hidden shadow-sm flex flex-col bg-white">
                      <div className="h-40 md:h-48 bg-blue-200 flex items-center justify-center">
                        <ImageIcon size={56} className="text-blue-300 md:w-16 md:h-16" strokeWidth={1.5} />
                      </div>
                      <div className="bg-blue-600 p-4 flex justify-between items-center min-h-[5rem]">
                        <div className="pr-2">
                          <h3 className="text-white text-lg font-semibold leading-tight">{club.name}</h3>
                          <p className="text-blue-100 text-sm md:text-base line-clamp-1">{club.description}</p>
                        </div>
                        <span className="bg-yellow-500 text-blue-900 px-4 py-1 rounded text-xs md:text-sm font-semibold shrink-0">
                          {club.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </main>

          {/* Right Sidebar (Calendar & Events) - Kept Untouched */}
          <aside className="w-full lg:w-100 bg-blue-50 shrink-0 p-4 md:p-6 lg:border-l border-t lg:border-t-0 border-blue-100/80 space-y-6 order-2">

            {/* FullCalendar Mini Widget */}
            <div className="max-w-md mx-auto lg:max-w-none">
              <SmallFullCalendar
                events={calendarEvents}
                onDateClick={handleDateSelection}
              />
            </div>

            {/* Upcoming Events Widget */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 md:p-6 shadow-sm max-w-md mx-auto lg:max-w-none">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-blue-600">Upcoming Events</h3>
                <CalendarIcon size={20} className="text-blue-400" />
              </div>

              <div className="space-y-4">
                {eventsList.map((event, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-lg flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-blue-400">{event.month}</span>
                      <span className="text-lg md:text-xl font-bold text-blue-600 leading-none mt-0.5">{event.date}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-blue-600">{event.title}</h4>
                      <div className="flex items-center gap-1.5 text-blue-300 mt-1">
                        <Clock size={12} />
                        <span className="text-xs md:text-sm">{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm md:text-base">
                View Calendar
              </button>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};

export default UniversityAdminDashboard;