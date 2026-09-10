import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import clubLinkLogo from '../assets/clublink1.svg';
import Headerimage from '../assets/aboutUs/header.jpg';
import slideImg1 from '../assets/aboutUs/slideShow1.jpg';
import slideImg2 from '../assets/aboutUs/slideShow2.jpg'; 
import slideImg3 from '../assets/aboutUs/slideShow3.jpg'; 
function AboutUs() {

  const sliderImages = [slideImg1, slideImg2, slideImg3];
  const [currentIdx, setCurrentIdx] = useState(0);

  //image slide show
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
         
        {/* Header Section */}
        <div className="relative bg-[#8EA3BA] text-[#1E293B] px-8 py-12 md:px-20 flex flex-col md:flex-row items-center justify-between shadow-sm overflow-hidden">
          
          {/* Background image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url(${Headerimage})` }}
          ></div>

          {/* Logo Placeholder */}
          <div className="relative z-10 flex-1 flex justify-start items-center">
            <img 
              src={clubLinkLogo} 
              alt="Club Link Logo" 
              className="w-60 h-auto opacity-80" 
            />
          </div>
          
          <div className="relative z-10 text-center md:text-right mt-4 md:mt-0">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A]">About Us</h1>
            <p className="text-lg md:text-xl font-medium mt-3 text-[#ffffff]">Your Gateway to Campus Life</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Welcome to Club Link
          </h2>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-2xl mb-10">
            The University Club Management System is a web-based application designed to digitally manage university clubs, their members, and events through a centralized platform. The system provides structured access control with three primary user roles: University Admin, Club Admin, and Club Members.
          </p>

          {/* Auto-sliding Image Container */}
          <div className="w-full max-w-3xl h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg relative bg-slate-300">
            {sliderImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img 
                  src={img} 
                  alt={`Slide ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Dot Indicator */}
            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIdx(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIdx ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;