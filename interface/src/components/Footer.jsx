import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-slate-300 text-slate-800 py-5 px-8 md:px-20 mt-16 border-t border-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Club Link</h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
            University Club Management System designed to streamline campus activities, club events, and student communications securely.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-xs text-slate-600">
            <li><Link to="/" className="hover:text-slate-900 transition">Home</Link></li>
            <li><Link to="/dashboard" className="hover:text-slate-900 transition">Dashboard</Link></li>
            <li><Link to="/about" className="hover:text-slate-900 transition">About Us</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} University Club Management System.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;