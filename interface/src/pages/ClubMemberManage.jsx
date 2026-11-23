import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, X, Search, SlidersHorizontal, UserMinus, MoreVertical, UserPlus, Link2 } from 'lucide-react';
import TopNav from '../components/Dashboard/TopNavbar';
import SideBar from '../components/Dashboard/ClubmanageSide';

// Dummy data based on the reference image structure
const MOCK_MEMBERS = [
  { id: 1, name: 'Maleesha', username: 'maleesha0819', avatar: 'M', memberSince: '2 days ago', joinedSystem: '5 months ago', method: '2H2tNTpUC', role: '' },
  { id: 2, name: 'Maleesha', username: 'maleesha26', avatar: 'M', memberSince: '28 days ago', joinedSystem: '1 month ago', method: 'trrfjmKur', role: '' },
  { id: 3, name: 'Musico', username: 'Musico#2915', avatar: 'Mu', memberSince: '5 months ago', joinedSystem: '5 years ago', method: 'Unknown', role: 'Musico' },
  { id: 4, name: 'praveen123', username: 'praveen1230656', avatar: 'P', memberSince: '5 months ago', joinedSystem: '5 months ago', method: 'Pw8HXnkT', role: '' },
  { id: 5, name: 'Pavith', username: 'pavith0775', avatar: 'Pa', memberSince: '5 months ago', joinedSystem: '5 months ago', method: 'Pw8HXnkT', role: '' },
  { id: 6, name: 'Maleesha PC', username: 'maleesha0739_16450', avatar: 'M', memberSince: '5 months ago', joinedSystem: '5 months ago', method: 'Pw8HXnkT', role: '' },
  { id: 7, name: 'Hiruni', username: 'hiruni0848', avatar: 'H', memberSince: '5 months ago', joinedSystem: '5 months ago', method: 'Pw8HXnkT', role: '' },
  { id: 8, name: 'Sudeera', username: 'hashansudeera', avatar: 'S', memberSince: '5 months ago', joinedSystem: '5 years ago', method: 'Unknown', role: '' },
];

export default function ClubMemberManage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleBack = () => {
    navigate(-2);
  };

  return (
    <div className="min-h-screen bg-grey-50 font-sans text-blue-900 flex flex-col">
      <TopNav />

      <div className="flex-1 flex justify-center px-4 overflow-y-auto">
        <div className="flex w-full max-w-[1200px] relative">
          
          <SideBar/>

          {/* Main Content Area */}
          <main className="flex-1 px-4 md:px-8 py-10 relative flex flex-col">
            <div className="w-full relative flex-1">
              
              <button 
                onClick={handleBack}
                className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center border border-blue-400 rounded-full text-blue-400 hover:bg-blue-100 transition-colors z-10"
                title="Go Back"
              >
                <X size={16} />
              </button>

              <h2 className="text-h3 font-bold mb-2 text-blue-900">Club Members</h2>
              
              {/* Settings Toggle Area (Adapted from Reference) */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-grey-200">
                <div className="max-w-2xl">
                  <p className="text-regular-body text-grey-300">
                    Enabling this will show the members page in the club's public profile, allowing students to see quickly who has recently joined your club.
                  </p>
                </div>

              </div>

              {/* Table Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h3 className="text-large-body font-bold text-blue-900">Recent Members</h3>
                
                <div className="flex items-center gap-3">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-300" />
                    <input 
                      type="text" 
                      placeholder="Search by username or ID" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-white border border-grey-200 rounded-md text-regular-body focus:outline-none focus:border-blue-500 w-64"
                    />
                  </div>
                  
                  {/* Sort Button */}
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-grey-200 rounded-md text-regular-body font-semibold text-blue-900 hover:bg-blue-50 transition-colors">
                    <SlidersHorizontal size={14} />
                    Sort
                  </button>
                  
                  {/* Prune/Remove Button */}
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#fee2e2] text-error rounded-md text-regular-body font-semibold hover:bg-[#fca5a5] transition-colors">
                    <UserMinus size={14} />
                    Prune
                  </button>
                </div>
              </div>

              {/* Members Table */}
              <div className="bg-white border border-grey-200 rounded-lg overflow-x-auto shadow-sm">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-grey-200 bg-grey-50">
                      <th className="p-4 w-12"><input type="checkbox" className="rounded border-grey-300" /></th>
                      <th className="p-4 text-caption font-bold text-grey-400 uppercase tracking-wider">Name</th>
                      <th className="p-4 text-caption font-bold text-grey-400 uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:text-blue-500">Member Since <SlidersHorizontal size={10} /></th>
                      <th className="p-4 text-caption font-bold text-grey-400 uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:text-blue-500">Joined System <SlidersHorizontal size={10} /></th>
                      <th className="p-4 text-caption font-bold text-grey-400 uppercase tracking-wider">Join Method</th>
                      <th className="p-4 text-caption font-bold text-grey-400 uppercase tracking-wider flex items-center gap-1">Roles <SlidersHorizontal size={10} /></th>
                      <th className="p-4 text-caption font-bold text-grey-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_MEMBERS.map((member) => (
                      <tr key={member.id} className="border-b border-grey-50 hover:bg-blue-50/50 transition-colors group">
                        <td className="p-4"><input type="checkbox" className="rounded border-grey-300" /></td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-large-body">
                              {member.avatar}
                            </div>
                            <div>
                              <div className="font-bold text-blue-900 text-regular-body">{member.name}</div>
                              <div className="text-caption text-grey-300">{member.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-regular-body text-blue-900">{member.memberSince}</td>
                        <td className="p-4 text-regular-body text-blue-900">{member.joinedSystem}</td>
                        <td className="p-4">
                          {member.method !== 'Unknown' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-grey-50 border border-grey-200 rounded text-caption text-blue-500 font-semibold">
                              <Link2 size={10} />
                              {member.method}
                            </span>
                          ) : (
                            <span className="text-caption text-grey-300 font-semibold">{member.method}</span>
                          )}
                        </td>
                        <td className="p-4">
                          {member.role && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-caption font-bold">
                              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                              {member.role}
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-grey-300 hover:text-blue-500 hover:bg-blue-100 rounded-md transition-colors">
                              <UserPlus size={16} />
                            </button>
                            <button className="p-2 text-grey-300 hover:text-blue-500 hover:bg-blue-100 rounded-md transition-colors">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Footer */}
              <div className="mt-4 text-regular-body text-grey-300">
                Showing <span className="font-bold text-blue-900">{MOCK_MEMBERS.length}</span> members
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}