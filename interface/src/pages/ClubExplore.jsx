import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Search, 
  ChevronDown, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

// Import your existing layout components
import TopNavbar from '../components/Dashboard/TopNavbar.jsx';
import SideNavbar from '../components/Dashboard/SideNavbar.jsx';

const ClubExplore = () => {
  // State for interactivity
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for clubs (6 cards to fill the 3x2 grid shown in the design)
  const clubs = Array(6).fill({
    name: 'Club name',
    description: 'This is a club description',
    category: 'Sport',
  });

  // Pagination page numbers
  const pages = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
      <TopNavbar />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        
        {/* Left Navbar */}
        <SideNavbar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            
            {/* Main Outer Container Box */}
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm space-y-6">
              
              {/* Page Title & Header Border */}
              <div className="border-b-2 border-blue-900 pb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-950">Club Explore</h1>
              </div>

              {/* ========================================================
                  1. SEARCH & FILTER BAR
              ======================================================== */}
              <div className="bg-white/80 border border-blue-100 rounded-xl p-3 md:p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
                
                {/* Search Input Box */}
                <div className="relative flex-1 w-full">
                  <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Find by name or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#f1f5f9] hover:bg-[#e2e8f0]/60 focus:bg-white text-sm md:text-base text-gray-800 placeholder-gray-400 pl-11 pr-4 py-3 rounded-lg border border-transparent focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Category Dropdown & Filter Icon Button */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  
                  {/* Category Dropdown */}
                  <div className="relative flex-1 md:w-48">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full appearance-none bg-[#f1f5f9] hover:bg-[#e2e8f0]/60 text-sm md:text-base text-gray-600 font-medium px-4 py-3 pr-10 rounded-lg border border-transparent focus:border-blue-500 focus:outline-none cursor-pointer transition-all"
                    >
                      <option value="All Categories">All Categories</option>
                      <option value="Sport">Sport</option>
                      <option value="Academic">Academic</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Technical">Technical</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>

                  {/* Sort / Filter Icon Button */}
                  <button 
                    className="bg-[#f1f5f9] hover:bg-[#e2e8f0] text-gray-700 p-3 rounded-lg transition-colors flex items-center justify-center shrink-0 border border-transparent hover:border-gray-300"
                    title="Filter Options"
                  >
                    <SlidersHorizontal size={20} />
                  </button>

                </div>

              </div>

              {/* ========================================================
                  2. CLUBS GRID (3 Columns on Desktop, 2 on Tablet, 1 on Mobile)
              ======================================================== */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {clubs.map((club, index) => (
                  <div 
                    key={index} 
                    className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col bg-white border border-blue-100 group cursor-pointer"
                  >
                    {/* Club Image Placeholder */}
                    <div className="h-44 bg-[#899bb1] group-hover:bg-[#7a8da5] transition-colors flex items-center justify-center">
                      <ImageIcon size={60} className="text-[#031428]" strokeWidth={1.5} />
                    </div>
                    
                    {/* Club Details Footer */}
                    <div className="bg-[#031428] p-4 flex justify-between items-center min-h-[5rem]">
                      <div className="pr-2">
                        <h3 className="text-white text-base md:text-lg font-bold leading-tight group-hover:text-[#f0c05a] transition-colors">
                          {club.name}
                        </h3>
                        <p className="text-gray-300 text-xs md:text-sm line-clamp-1 mt-0.5">
                          {club.description}
                        </p>
                      </div>
                      <span className="bg-[#f0c05a] text-[#031428] px-3.5 py-1 rounded text-xs font-bold shrink-0 shadow-sm">
                        {club.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ========================================================
                  3. PAGINATION FOOTER
              ======================================================== */}
              <div className="flex justify-center pt-6 pb-2">
                <div className="bg-[#e2e8f0]/80 border border-gray-300/60 rounded-2xl px-2 md:px-4 py-2 flex items-center gap-1 md:gap-2 shadow-inner max-w-full overflow-x-auto">
                  
                  {/* Previous Button */}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 md:p-2 rounded-lg hover:bg-white text-gray-600 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    title="Previous Page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {/* Page Number Buttons */}
                  <div className="flex items-center gap-1">
                    {pages.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`w-8 h-8 md:w-9 md:h-9 rounded-full text-xs md:text-sm font-bold flex items-center justify-center transition-all ${
                          currentPage === pageNumber
                            ? 'bg-[#031428] text-white shadow-md'
                            : 'text-gray-700 hover:bg-white hover:shadow-sm'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pages.length))}
                    disabled={currentPage === pages.length}
                    className="p-1.5 md:p-2 rounded-lg hover:bg-white text-gray-600 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                    title="Next Page"
                  >
                    <ChevronRight size={18} />
                  </button>

                </div>
              </div>

            </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default ClubExplore;