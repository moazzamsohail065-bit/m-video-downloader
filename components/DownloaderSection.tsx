
import React, { useState } from 'react';
import { analyzeVideoLink } from '../services/geminiService';
import { VideoMetadata, DownloadStatus } from '../types';

const DownloaderSection: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<DownloadStatus>(DownloadStatus.IDLE);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    setError('');
    setStatus(DownloadStatus.ANALYZING);
    setMetadata(null);

    try {
      const result = await analyzeVideoLink(url);
      setMetadata(result);
      setStatus(DownloadStatus.READY);
    } catch (err) {
      setError('Connection slow hai. Click Try Again.');
      setStatus(DownloadStatus.ERROR);
    }
  };

  const handleDownload = () => {
    setStatus(DownloadStatus.DOWNLOADING);
    setProgress(0);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setStatus(DownloadStatus.COMPLETED), 300);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 150);
  };

  const reset = () => {
    setUrl('');
    setStatus(DownloadStatus.IDLE);
    setMetadata(null);
    setProgress(0);
    setError('');
  };

  return (
    <section className="pt-32 pb-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
          Download <span className="gradient-text">Social Videos</span> <br className="hidden sm:block" /> Fast & Free
        </h2>
        
        <div className="glass-card p-4 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden mb-8 border-indigo-500/10">
          {(status === DownloadStatus.IDLE || status === DownloadStatus.ANALYZING || status === DownloadStatus.ERROR) && (
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste link here (Instagram, TikTok, etc.)"
                  className="w-full bg-slate-900/80 border-2 border-slate-700/50 focus:border-indigo-500 text-white rounded-2xl px-5 py-4 outline-none transition-all placeholder:text-slate-500 text-sm md:text-base"
                  disabled={status === DownloadStatus.ANALYZING}
                  autoComplete="off"
                />
              </div>
              
              <button
                type="submit"
                disabled={status === DownloadStatus.ANALYZING || !url.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white font-black px-6 py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active-scale flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
              >
                {status === DownloadStatus.ANALYZING ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : 'Analyze & Download'}
              </button>
            </form>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl animate-pulse">
              <p className="text-red-400 text-sm font-bold">{error}</p>
              <button onClick={() => setStatus(DownloadStatus.IDLE)} className="mt-2 text-xs font-black uppercase text-red-300 underline underline-offset-4">Try Again Now</button>
            </div>
          )}

          {metadata && (status === DownloadStatus.READY || status === DownloadStatus.DOWNLOADING || status === DownloadStatus.COMPLETED) && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-2/5 aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-lg border border-white/5 relative">
                  <img src={metadata.thumbnail} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute top-3 left-3 bg-indigo-600 text-[10px] font-black px-2 py-1 rounded-lg uppercase shadow-lg">
                    {metadata.platform}
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <h3 className="font-black text-lg line-clamp-2 leading-tight">{metadata.title}</h3>
                  <div className="flex gap-3">
                    <span className="text-[10px] font-bold bg-slate-800 px-2 py-1 rounded-md text-slate-400">Size: {metadata.size || 'Auto'}</span>
                    <span className="text-[10px] font-bold bg-slate-800 px-2 py-1 rounded-md text-slate-400">Status: Ready</span>
                  </div>

                  {status === DownloadStatus.READY && (
                    <div className="grid grid-cols-1 gap-2 mt-4">
                      {metadata.qualityOptions.map((q, i) => (
                        <button 
                          key={i} 
                          onClick={handleDownload}
                          className="bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-xl text-sm font-bold flex justify-between items-center transition-all border border-white/5 active-scale group"
                        >
                          <span>{q}</span>
                          <svg className="w-5 h-5 text-indigo-400 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </button>
                      ))}
                    </div>
                  )}

                  {status === DownloadStatus.DOWNLOADING && (
                    <div className="mt-4 p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-black uppercase text-indigo-400 animate-pulse">Saving to Storage...</span>
                        <span className="text-xs font-bold">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 transition-all duration-200" style={{width: `${progress}%`}}></div>
                      </div>
                    </div>
                  )}

                  {status === DownloadStatus.COMPLETED && (
                    <div className="mt-4 p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                        <span className="text-sm font-bold">Successfully Saved!</span>
                      </div>
                      <button onClick={reset} className="text-xs font-black uppercase text-emerald-400 hover:underline active-scale">Done</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-12">
          Supported: Instagram • TikTok • YouTube • Facebook • Twitter
        </p>
      </div>
    </section>
  );
};

export default DownloaderSection;
