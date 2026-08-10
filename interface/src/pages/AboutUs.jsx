import React from 'react';
import Navbar from '../components/Navbar';
import clubLinkLogo from '../assets/clublink1.svg';

function AboutUs() {
  return (
    <div>
      <Navbar />
       
       {/* Header Section */}
        <div className="bg-[#8EA3BA] text-[#1E293B] px-8 py-12 md:px-20 flex flex-col md:flex-row items-center justify-between shadow-sm">

          {/* Large Logo Placeholder */}
            <div className="flex-1 flex justify-start items-center">
                <img 
                src={clubLinkLogo} 
                alt="Club Link Logo" 
                className="w-60 h-auto opacity-70" 
                />
            </div>
          
          {/* Header Titles */}
          <div className="text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A]">About Us</h1>
            <p className="text-lg md:text-2xl font-medium mt-5 text-[#ffffff]">Your Gateway to Campus Life</p>
          </div>
        </div>

        {/* vertical space */}
        <div className="max-w-5xl mx-auto py-5 px-6"></div>
         
        {/* Description Section */}
        <div className="bg-slate-300 rounded-xl flex overflow-hidden mx-12 min-h-[300px]">
          {/* left side description */}
          <div className="flex-1 p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Description</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              The University Club Management System is a web-based platform designed 
              to safely manage university club activities, and communication between 
              students and administration. This system provides specialized tools for 
              student clubs, administrators, and general students.
            </p>
          </div>
          {/* rigth side image */}
          <div className="flex-1 bg-slate-500 flex justify-center items-center p-6">
            <div className="w-4/5 h-36 bg-slate-400 rounded-lg flex justify-center items-center">
              <span className="text-4xl"></span> 
            </div>
          </div>
        </div>

    </div>
  );
}

export default AboutUs;