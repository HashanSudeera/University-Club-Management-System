import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  CalendarDays, 
  Megaphone, 
  PanelLeftClose, 
  PanelLeftOpen 
} from 'lucide-react';

const SideNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <aside 
      className={`
        bg-white shrink-0 transition-all duration-300 z-50
        /* Mobile: Fixed Bottom Navigation */
        fixed bottom-0 left-0 w-full h-[68px] border-t border-blue-100 flex flex-row
        /* Desktop: Relative Side Navigation */
        md:relative md:h-auto md:border-t-0 md:border-r md:border-blue-50 md:py-1 md:flex-col md:overflow-y-auto
        ${isSidebarOpen ? 'md:w-64' : 'md:w-20'}
      `}
    >
      {/* Toggle Button - Hidden on Mobile */}
      <div className={`hidden md:flex items-center mb-1 ${isSidebarOpen ? 'justify-end px-4' : 'justify-center px-0'}`}>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-blue-300 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors"
          title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-row md:flex-col w-full h-full md:h-auto md:gap-1">
        
        {/* Active Link: Dashboard */}
        <a href="#" className={`
          flex items-center transition-all overflow-hidden font-semibold flex-1 md:flex-none
          /* Mobile */
          flex-col justify-center gap-1 border-t-4 border-blue-600 text-blue-600 bg-blue-50/50
          /* Desktop */
          md:flex-row md:py-3 md:bg-blue-100 md:border-t-0 md:border-l-4 md:gap-4
          ${isSidebarOpen ? 'md:px-6 md:justify-start' : 'md:justify-center md:px-0'}
        `}>
          <LayoutDashboard size={20} className="shrink-0" />
          <span className={`text-[10px] md:text-large-body whitespace-nowrap ${!isSidebarOpen && 'md:hidden'}`}>
            Dashboard
          </span>
        </a>
        
        {/* Inactive Link: Club Explore */}
        <a href="#" className={`
          flex items-center transition-all overflow-hidden flex-1 md:flex-none
          /* Mobile */
          flex-col justify-center gap-1 border-t-4 border-transparent text-blue-400 hover:bg-blue-50
          /* Desktop */
          md:flex-row md:py-3 md:hover:bg-blue-100 md:border-t-0 md:border-l-4 
          ${isSidebarOpen ? 'md:px-6 md:gap-4 md:justify-start' : 'md:justify-center md:px-0'}
        `}>
          <Compass size={20} className="shrink-0" />
          <span className={`text-[10px] md:text-large-body whitespace-nowrap ${!isSidebarOpen && 'md:hidden'}`}>
            <span className="md:hidden">Explore</span>
            <span className="hidden md:inline">Club Explore</span>
          </span>
        </a>
        
        {/* Inactive Link: Events Calendar */}
        <a href="#" className={`
          flex items-center transition-all overflow-hidden flex-1 md:flex-none
          /* Mobile */
          flex-col justify-center gap-1 border-t-4 border-transparent text-blue-400 hover:bg-blue-50
          /* Desktop */
          md:flex-row md:py-3 md:hover:bg-blue-100 md:border-t-0 md:border-l-4 
          ${isSidebarOpen ? 'md:px-6 md:gap-4 md:justify-start' : 'md:justify-center md:px-0'}
        `}>
          <CalendarDays size={20} className="shrink-0" />
          <span className={`text-[10px] md:text-large-body whitespace-nowrap ${!isSidebarOpen && 'md:hidden'}`}>
            <span className="md:hidden">Calendar</span>
            <span className="hidden md:inline">Events Calendar</span>
          </span>
        </a>
        
        {/* Inactive Link: Announcements */}
        <a href="#" className={`
          flex items-center transition-all overflow-hidden flex-1 md:flex-none
          /* Mobile */
          flex-col justify-center gap-1 border-t-4 border-transparent text-blue-400 hover:bg-blue-50
          /* Desktop */
          md:flex-row md:py-3 md:hover:bg-blue-100 md:border-t-0 md:border-l-4 
          ${isSidebarOpen ? 'md:px-6 md:gap-4 md:justify-start' : 'md:justify-center md:px-0'}
        `}>
          <Megaphone size={20} className="shrink-0" />
          <span className={`text-[10px] md:text-large-body whitespace-nowrap ${!isSidebarOpen && 'md:hidden'}`}>
            <span className="md:hidden">News</span>
            <span className="hidden md:inline">Announcements</span>
          </span>
        </a>
        
      </nav>
    </aside>
  );
};

export default SideNavbar;