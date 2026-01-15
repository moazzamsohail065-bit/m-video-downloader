
import React from 'react';

const features = [
  {
    title: "Ultra High Speed",
    description: "Our distributed servers ensure you get maximum download speeds for every video.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    )
  },
  {
    title: "Multi-Platform Support",
    description: "One tool for all. Download from TikTok, IG, FB, YT, Twitter, and many more platforms.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.015 9.015 0 0 1 8.716 2.253M12 3a9.015 9.015 0 0 0-8.716 2.253m0 0A8.969 8.969 0 0 1 2.148 6M12 3c2.4 0 4.5 3.582 4.5 8s-2.1 8-4.5 8c-2.4 0-4.5-3.582-4.5-8s2.1-8 4.5-8Z" />
      </svg>
    )
  },
  {
    title: "100% Free & Unlimited",
    description: "No subscription, no hidden costs. Download unlimited videos daily without any restriction.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    )
  }
];

const Features: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Why Choose M.Video Downloader?</h3>
          <p className="text-slate-400">Everything you need in a modern downloader tool.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl group hover:border-indigo-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-600/10 text-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
