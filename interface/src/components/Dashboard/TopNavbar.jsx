import React from 'react';
import { Bell } from 'lucide-react';
import Logo from "../../assets/clublink.svg";

const TopNavbar = () => {
  return (
    <header className="h-[72px] bg-blue-900 text-white flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <img src={Logo} alt='logo here' className='w-9'/>
        <div>
          <h1 className="text-yellow-500 text-[25px] leading-tight font-bold">Club Link</h1>
          <p className="text-[10px] text-blue-100">University Club Management System</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 bg-blue-800 rounded-full hover:bg-blue-700 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-error rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-large-body leading-tight">Name</p>
            <p className="text-regular-body text-blue-200">Club member</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;