import React from 'react';
import Navbar from '../components/Dashboard/TopNavbar';
import SideNavbar from '../components/Dashboard/SideNavbar';
import clubLinkLogo from '../assets/clublink1.svg';

function clubRegister() {
  return (
    <div>
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar (Left Side) */}
        <SideNavbar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
          
          {/* Hero Banner Area */}
          <div className="relative bg-[#0b1f3d] py-16 flex items-center justify-center overflow-hidden">
            {/* Background Text Watermark (New Club) */}
            <h1 className="absolute text-[11rem] font-black text-white/5 whitespace-nowrap tracking-widest select-none pointer-events-none">
              New Club
            </h1>
            {/* Main Title */}
            <h2 className="relative text-5xl md:text-6xl font-bold text-[#f5d061] tracking-wide z-10">
              Build Your Legacy
            </h2>
          </div>

          {/* Form and Info Section */}
          <div className="p-8 flex justify-center">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Left Form Area */}
              <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold mb-8">Register New Club</h3>

                <form className="space-y-6">
                  {/* Club Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Club Name</label>
                    <input
                      type="text"
                      className="w-full bg-[#e2e4e8] p-3 outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
                    />
                  </div>

                  {/* Club Category Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Club Category</label>
                    <div className="relative">
                      <select className="w-full bg-[#e2e4e8] p-3 outline-none focus:ring-2 focus:ring-blue-500 rounded-sm appearance-none text-gray-600 font-medium">
                        <option>Select a category</option>
                        <option>Academic</option>
                        <option>Sports & Biking</option>
                        <option>Arts & Photography</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {/* Club Description Textarea */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Club Description</label>
                    <textarea
                      rows="4"
                      placeholder="To foster rigorous debate and ethical inquiry among the student body..."
                      className="w-full bg-[#e2e4e8] p-3 outline-none focus:ring-2 focus:ring-blue-500 rounded-sm placeholder-gray-400 font-medium"
                    ></textarea>
                  </div>

                  {/* Upload Box */}
                  <div className="border-[1.5px] border-dashed border-gray-500 rounded-xl p-8 flex flex-col items-center justify-center text-center mt-8">
                    <div className="bg-[#eff1f5] p-3 rounded-full mb-3">
                      <svg className="w-6 h-6 text-[#0b1f3d]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <p className="font-bold text-[#0b1f3d] text-sm">Upload Club Logo</p>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase">Optimize size: 1200 x 800 pixels.<br/>JPG, PNG or WEBP format.</p>
                    <button type="button" className="mt-4 px-4 py-1.5 text-xs font-bold border border-gray-400 rounded-md hover:bg-gray-100">
                      Browse Files
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <button type="submit" className="bg-[#0b1f3d] text-white px-10 py-3 rounded-md font-bold text-sm hover:bg-blue-950 transition">
                      Submit Registration
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Info Area */}
              <div className="bg-[#bac1ca] p-8 rounded-xl h-full">
                <h4 className="text-xl font-bold mb-4 text-black">Registration Steps</h4>
                <ol className="list-none space-y-1.5 mb-8 text-black font-semibold text-sm">
                  <li>1. Fill the form</li>
                  <li>2. Upload the club logo.</li>
                  <li>3. Submit the form.</li>
                </ol>

                <h4 className="text-xl font-bold mb-3 text-black">Registration Info</h4>
                <p className="text-black font-semibold text-sm pr-4">
                  We need more info about club Description.
                </p>
              </div>

            </div>
          </div>
        </main>
      </div>

    </div>
  );
}

export default clubRegister;