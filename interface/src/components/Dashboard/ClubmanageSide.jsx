import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Users } from 'lucide-react';

function ClubmanageSide() {
  return (<>
    {/* Sidebar */}
    <aside className="w-72 flex flex-col py-8 shrink-0">
      <div className="px-6 mb-4">
        <h3 className="text-caption font-bold text-grey-400 tracking-wider uppercase">
          Management Console
        </h3>
      </div>
      
      <nav className="flex flex-col gap-1 px-4">
        <NavLink 
          to='/clubmanage'
          className={({ isActive }) => 
            `flex items-center gap-3 w-full px-4 py-3 rounded-md font-semibold text-large-body transition-colors ${
              isActive 
                ? 'bg-blue-100 text-blue-900' 
                : 'text-grey-400 hover:bg-grey-100'
            }`
          }
        >
          <Shield size={20} />
          Club Profile
        </NavLink>
        
        <NavLink 
          to='/clubmembermanage'
          className={({ isActive }) => 
            `flex items-center gap-3 w-full px-4 py-3 rounded-md font-semibold text-large-body transition-colors ${
              isActive 
                ? 'bg-blue-100 text-blue-900' 
                : 'text-grey-400 hover:bg-grey-100'
            }`
          }
        >
          <Users size={20} />
          Members Management
        </NavLink>
      </nav>
    </aside></>
  );
}

export default ClubmanageSide;