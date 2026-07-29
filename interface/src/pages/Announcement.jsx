import React, {useState} from 'react';
import TopNavbar from '../components/Dashboard/TopNavbar';
import SideNavbar from '../components/Dashboard/SideNavbar';



const Announcements = () => {
  
  // To check if the pop up open or close
  const [isOpen, setIsOpen] = useState(false);
  const announcementList = [
    {
      id: 1,
      title: "Internal Debate Competition Finalists",
      description: "Congratulations to the finalists for the upcoming inter-collegiate challenge. Mandatory briefing this Friday at the Student Union Room 402.",
      tag: "Debate Society",
      time: "2 hours ago",
      icon: "📢",
      iconBg: "bg-amber-500/20 text-amber-400"
    },
    {
      id: 2,
      title: "Practice Session Cancelled",
      description: "The rowing practice scheduled for tomorrow morning is cancelled due to weather warnings. Stay safe everyone.",
      tag: "Varsity Rowing",
      time: "Yesterday",
      icon: "ℹ️",
      iconBg: "bg-slate-700 text-slate-300"
    },
    {
      id: 3,
      title: "Internal Debate Competition Finalists",
      description: "Congratulations to the finalists for the upcoming inter-collegiate challenge. Mandatory briefing this Friday at the Student Union Room 402.",
      tag: "Debate Society",
      time: "2 hours ago",
      icon: "📢",
      iconBg: "bg-amber-500/20 text-amber-400"
    },
    {
      id: 4,
      title: "Practice Session Cancelled",
      description: "The rowing practice scheduled for tomorrow morning is cancelled due to weather warnings. Stay safe everyone.",
      tag: "Varsity Rowing",
      time: "Yesterday",
      icon: "ℹ️",
      iconBg: "bg-slate-700 text-slate-300"
    }
  ]; 

  return (
    <div className="flex h-screen w-full bg-slate-200 text-slate-900 font-sans overflow-hidden">
      
      {/* left sidebar*/}
      <SideNavbar />

      {/* right content */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* 2. Top navbar */}
        <TopNavbar />

        {/* 3. Main announcement content*/}
        <div className="p-6">
          
          {/* outer border container */}
          <div className="w-full border border-blue-500/30 rounded-xl bg-slate-900 p-6 shadow-xl">
            
            {/* Title and Add Button */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-700 mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-slate-100">Announcements</h1>
              
              <button onClick={() => setIsOpen(true)} className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium px-5 py-2 rounded-lg border border-slate-600 transition duration-200 cursor-pointer">
                Add Announcements
              </button>
            </div>

            {/* Announcements List Container */}
            <div className="flex flex-col gap-4 p-6 bg-slate-50 min-h-screen">
              {announcementList.map((announcement) => (
                <div 
                  key={announcement.id} 
                  className="bg-gray-100/80 border-border-gray-200/60  rounded-xl p-5 flex items-start gap-4 hover:bg-gray-100  transition duration-200 relative">
                
                  {/* Left Side */}
                  <div className={'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base font-bold ${announcement.iconBg}'}>
                    {announcement.icon}
                  </div>

                  {/*  Texts and Details */}
                  <div className="flex-1 pr-16">
                    <h2 className="text-sm sm:text-base font-semibold text-slate-800 tracking-wide">
                      {announcement.title}
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed max-w-3xl"></p>
                    {announcement.description}
                    
                    <span className="inline-block text-[11px] text-slate-500 mt-3 font-medium px-2 py-0.5 bg-gray-200/70 rounded-md">
                      {announcement.tag}
                    </span>
                  </div>

                  {/* Right Side */}
                  <span className="absolute top-5 right-5 text-xs text-slate-400 whitespace-nowrap">
                    {announcement.time}
                  </span>

                </div>
              ))}
            </div>

          </div>
          
        </div>

      </div>
      {/* new anncouncement model pop up */}
{isOpen && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
    {/* Modal Box */}
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
      
      {/* Close Button-close popup */}
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-xl font-bold text-slate-800 mb-5">
        New Announcements
      </h2>

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        
        {/* 1. Announcement Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-500">Announcement Title</label>
          <input 
            type="text" 
            placeholder="Enter announcement title..."
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-400 text-slate-800 placeholder:text-slate-400 transition"
          />
        </div>

        {/* 2. Category Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-500">Category</label>
          <select 
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-400 text-slate-700 transition appearance-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>Select a category</option>
            <option value="debate">Debate Society</option>
            <option value="rowing">Varsity Rowing</option>
            <option value="general">General</option>
          </select>
        </div>

        {/* 3. Content Textarea */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-500">Content</label>
          <textarea 
            rows="5"
            placeholder="Provide full details of your announcement here..."
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-400 text-slate-800 placeholder:text-slate-400 transition resize-none"
          ></textarea>
        </div>

        {/* 4. Action Button */}
        <button 
          onClick={() => setIsOpen(false)} 
          className="w-full bg-slate-900 text-white font-medium text-sm py-3.5 rounded-xl hover:bg-slate-800 transition mt-2 shadow-sm"
        >
          Post Announcements
        </button>

      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Announcements;