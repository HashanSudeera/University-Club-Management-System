import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroImage from "../assets/campus-cover.jpg";

function Home() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/65" />

        {/* Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-6 text-center">
          <div className="max-w-4xl">
            {/* Small Badge */}
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 mb-6 backdrop-blur-sm">
              <span className="text-sm font-medium text-slate-200">
                🎓 University Club Management System
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-yellow-400 leading-tight">
              Welcome to
              <span className="block text-yellow-400">ClubLink</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl mx-auto text-base md:text-xl leading-relaxed text-slate-200">
              Your ultimate gateway to explore, join, and manage university
              clubs seamlessly.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/Register"
                className="rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm md:text-base font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 pb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
            Discover • Connect • Grow
          </p>
        </div>
      </section>

      {/* ================= STATISTICS SECTION ================= */}
      <section className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {/* Students */}
            <div>
              <h3 className="text-4xl font-black text-slate-900">1.2k+</h3>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Active Students
              </p>
            </div>

            {/* Clubs */}
            <div className="sm:border-l sm:border-r border-slate-200">
              <h3 className="text-4xl font-black text-slate-900">50</h3>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Registered Clubs
              </p>
            </div>

            {/* Events */}
            <div>
              <h3 className="text-4xl font-black text-slate-900">10</h3>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Upcoming Events
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clubs Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Featured Clubs</h2>
          <Link to="/explore" className="text-sm font-semibold text-sky-700 hover:underline">
            View All Clubs &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Club Card 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="h-40 bg-slate-300 w-full"></div>
              <div className="p-5">
                <span className="text-xs font-semibold bg-sky-100 text-sky-800 px-2.5 py-1 rounded-full">IT Club</span>
                <h3 className="text-lg font-bold text-slate-900 mt-3">Club name</h3>
                <p className="text-xs text-slate-500 mt-1">Empowering tech enthusiasts and developers.</p>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Link to="/club" className="block text-center w-full py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                View Details
              </Link>
            </div>
          </div>

          {/* Club Card 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="h-40 bg-slate-300 w-full"></div>
              <div className="p-5">
                <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">Cultural</span>
                <h3 className="text-lg font-bold text-slate-900 mt-3">Club name</h3>
                <p className="text-xs text-slate-500 mt-1">Celebrating arts, traditions, and diversity.</p>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Link to="/club" className="block text-center w-full py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                View Details
              </Link>
            </div>
          </div>

          {/* Club Card 3 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="h-40 bg-slate-300 w-full"></div>
              <div className="p-5">
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">Sports</span>
                <h3 className="text-lg font-bold text-slate-900 mt-3">Club name</h3>
                <p className="text-xs text-slate-500 mt-1">Promoting physical fitness and team spirit.</p>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Link to="/club" className="block text-center w-full py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="bg-[#0b1b3d] text-white rounded-2xl p-8 md:p-10 shadow-md">
          <h2 className="text-2xl font-bold mb-1">Upcoming Events</h2>
          <p className="text-xs text-slate-400 mb-6">Check out scheduled club activities and join us.</p>

          <div className="flex flex-col gap-4">
            {/* Event Item 1 */}
            <div className="bg-[#112752] p-4 rounded-xl flex items-center justify-between border border-sky-900/50">
              <div className="flex items-center gap-4">
                <div className="bg-amber-100 text-amber-900 rounded-lg px-3 py-2 text-center font-bold">
                  <span className="block text-[10px] uppercase text-amber-700">Mar</span>
                  <span className="text-lg">14</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">Event Name</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Time: 10:00 AM &bull; Location: Auditorium</p>
                </div>
              </div>
              <span className="text-xs bg-sky-950 text-sky-300 px-3 py-1.5 rounded-lg border border-sky-800">Upcoming</span>
            </div>

            {/* Event Item 2 */}
            <div className="bg-[#112752] p-4 rounded-xl flex items-center justify-between border border-sky-900/50">
              <div className="flex items-center gap-4">
                <div className="bg-amber-100 text-amber-900 rounded-lg px-3 py-2 text-center font-bold">
                  <span className="block text-[10px] uppercase text-amber-700">Mar</span>
                  <span className="text-lg">26</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">Event Name</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Time: 02:00 PM &bull; Location: Main Hall</p>
                </div>
              </div>
              <span className="text-xs bg-sky-950 text-sky-300 px-3 py-1.5 rounded-lg border border-sky-800">Upcoming</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;