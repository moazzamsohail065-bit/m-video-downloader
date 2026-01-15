
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">M</span>
          </div>
          <span className="font-bold">M.Video Downloader</span>
        </div>
        
        <div className="flex gap-8 text-sm text-slate-500">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        
        <p className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} M.Video Downloader. Developed by <span className="text-indigo-400 font-semibold">Moazzam Sohail</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
