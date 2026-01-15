
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'M.Video Downloader',
      text: 'Developed by Moazzam Sohail. Fast and Free video downloader!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('App link copy ho gaya hai! Ab aap bhej sakte hain.');
      } catch (err) {
        alert('Link: ' + window.location.href);
      }
    }
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      setDeferredPrompt(null);
    } else {
      alert("Mobile Installation Guide:\n1. Browser menu (3 dots) par click karein.\n2. 'Install App' ya 'Add to Home Screen' select karein.\nYe APK ki tarah aapke mobile me save ho jayegi.");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-indigo-600 py-1.5 text-center shadow-lg border-b border-indigo-400/20">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white px-4">
          Developed by Moazzam Sohail
        </p>
      </div>
      
      <nav className="glass-card border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 active-scale">
              <span className="text-white font-black text-lg">M</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">
              M.Video <span className="gradient-text">Downloader</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={handleShare}
              className="p-2.5 text-slate-400 hover:text-white transition-all bg-white/5 rounded-xl active-scale"
              aria-label="Share App"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
            </button>
            <button 
              onClick={handleInstall}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-all font-bold text-xs md:text-sm shadow-lg shadow-indigo-600/30 active-scale"
            >
              INSTALL APK
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
