
import React from 'react';
import Header from './components/Header';
import DownloaderSection from './components/DownloaderSection';
import Features from './components/Features';
import Footer from './components/Footer';

const App: React.FC = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'M.Video Downloader',
          text: 'Get the official M.Video Downloader by Moazzam Sohail. Fast & Free!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] selection:bg-indigo-500/30">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <Header />
        <main>
          <DownloaderSection />
          
          <section className="px-6 mb-20">
            <div className="max-w-4xl mx-auto glass-card p-8 rounded-[2rem] border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-indigo-900/10 to-transparent">
              <div>
                <h3 className="text-2xl font-bold mb-2">Pasand Ayi? Share Karein!</h3>
                <p className="text-slate-400">Doston ke sath app ka link share karein takay wo bhi video download kar sakein.</p>
              </div>
              <button 
                onClick={handleShare}
                className="bg-white text-indigo-900 font-bold px-8 py-4 rounded-2xl shadow-xl hover:bg-indigo-50 transition-all flex items-center gap-3 whitespace-nowrap active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                Share App Link
              </button>
            </div>
          </section>

          <Features />
          
          <section id="supported" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="glass-card p-12 rounded-[3rem] text-center bg-gradient-to-br from-indigo-900/20 to-slate-900/50">
                <h3 className="text-3xl font-bold mb-6">Ready to download?</h3>
                <p className="text-slate-400 mb-10 max-w-xl mx-auto">
                  Developed by <span className="text-indigo-400 font-bold">Moazzam Sohail</span> for everyone. Thousands of users choose M.Video Downloader for its simplicity and speed.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">1.2M+ Daily Downloads</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Fast & Secure SSL</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
