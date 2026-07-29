import React from 'react';
import Navbar from '../components/Navbar';


const Home = () => {
  // Sample Data matching the visual structure
  const featuredClubs = [
    { id: 1, name: "Club name", category: "Category", catBg: "bg-purple-100 text-purple-700", desc: "description about club" },
    { id: 2, name: "Club name", category: "Category", catBg: "bg-amber-100 text-amber-700", desc: "description about club" },
    { id: 3, name: "Club name", category: "Category", catBg: "bg-emerald-100 text-emerald-700", desc: "description about club" }
  ];

  const upcomingEvents = [
    { id: 1, date: "24", month: "OCT", title: "Event Name", time: "time", location: "Location" },
    { id: 2, date: "26", month: "OCT", title: "Event Name", time: "time", location: "Location" }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#001D4A] font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-[#FFFDF9] px-6 py-12 md:px-16 md:py-20 lg:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-[#001D4A]">
            Connect, <br />
            Lead, and <br />
            <span className="text-[#A07855]">Grow.</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:max-w-md">
            Discover student-led communities, build professional skills, and create unforgettable university memories.
          </p>
          <button className="bg-[#001D4A] text-white text-sm font-medium px-6 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-all">
            Explore club
          </button>
        </div>
        
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Replace src with your actual asset path */}
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
              alt="Students studying together" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* STATS COUNTER BAR */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#001D4A]">1.2k+</div>
            <div className="text-xs md:text-sm text-gray-500 font-medium mt-1">Active Students</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#001D4A]">50</div>
            <div className="text-xs md:text-sm text-gray-500 font-medium mt-1">Student Clubs</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#001D4A]">10</div>
            <div className="text-xs md:text-sm text-gray-500 font-medium mt-1">Weekly Events</div>
          </div>
        </div>
      </section>

      {/* FEATURED CLUBS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Featured Clubs</h2>
          <a href="#" className="text-xs md:text-sm font-semibold text-[#001D4A] hover:underline flex items-center gap-1">
            View all directories 
            <span className="text-base">→</span>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredClubs.map((club) => (
            <div key={club.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col transition-all">
              {/* Card Image Placeholder */}
              <div className="bg-[#C5CCD6] aspect-[4/3] w-full" />
              
              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col items-start">
                <span className={`text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-md uppercase ${club.catBg}`}>
                  {club.category}
                </span>
                <h3 className="text-lg font-bold mt-3 mb-1">{club.name}</h3>
                <p className="text-gray-400 text-xs lowercase mb-6">{club.desc}</p>
                
                <button className="w-full mt-auto border border-gray-200 hover:border-[#001D4A] hover:bg-[#001D4A] hover:text-white text-gray-700 text-xs font-semibold py-2.5 rounded-full transition-all text-center">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-[#001D4A] text-white rounded-[2rem] p-8 md:p-12 shadow-lg">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Upcoming Events</h2>
            <p className="text-blue-200 opacity-80 text-xs mt-1">Mark your calendars for this week's .</p>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-[#082754] rounded-xl p-4 flex items-center gap-5 hover:bg-opacity-80 transition-all border border-blue-900/40">
                {/* Date Badge */}
                <div className="bg-[#FCD8A5] text-[#001D4A] flex flex-col items-center justify-center font-bold rounded-xl w-16 h-16 shrink-0 shadow-inner">
                  <span className="text-[10px] tracking-wider leading-none uppercase text-opacity-80">{event.month}</span>
                  <span className="text-2xl leading-tight font-black">{event.date}</span>
                </div>

                {/* Event Text Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-base tracking-tight truncate">{event.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-blue-200/70 mt-1">
                    <span className="flex items-center gap-1">🕒 {event.time}</span>
                    <span className="flex items-center gap-1">📍 {event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;