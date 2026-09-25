import React from 'react';
import { ArrowRight, Scale, ShieldCheck, GraduationCap, BookOpen } from 'lucide-react';

interface DeveloperIntroProps {
  onEnter: () => void;
}

interface DeveloperMember {
  name: string;
  credential: string;
  roleHint: string;
}

const developers: DeveloperMember[] = [
  {
    name: 'Azhar Hussain',
    credential: 'MSAI (72908)',
    roleHint: 'AI Systems & Architecture',
  },
  {
    name: 'Haris Javeed',
    credential: 'MSAI (75722)',
    roleHint: 'Platform Engineering & State',
  },
  {
    name: 'Usman Kayani',
    credential: 'PhD (6678)',
    roleHint: 'Research & Advanced Analytics',
  },
];

export const DeveloperIntro: React.FC<DeveloperIntroProps> = ({ onEnter }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#0a0c10] text-slate-100 flex flex-col justify-between overflow-hidden selection:bg-amber-900/30 selection:text-amber-200">
      {/* Background Architectural Grid Lines */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Vignette */}
      <div 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-amber-500/[0.04] to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Top Header Monogram */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-7 pb-4 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-amber-400/30 bg-amber-400/[0.05] flex items-center justify-center text-amber-200 shadow-sm">
            <Scale className="w-4 h-4" strokeWidth={1.75} />
          </div>
          <span className="font-serif-legal text-lg font-medium tracking-wide text-slate-100">
            JurisNet
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase text-amber-300/80 bg-amber-400/[0.05] px-3 py-1 rounded-full border border-amber-400/20">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
          <span>Legal Professional Network</span>
        </div>
      </header>

      {/* Central Visual Focus */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-8 sm:py-10 flex-1 flex flex-col justify-center items-center">
        {/* Project Header */}
        <div className="w-full text-center mb-8">
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-amber-300/80 mb-2">
            Platform Engineering
          </p>
          <h1 className="font-serif-legal text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-3">
            Developer Group
          </h1>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto" />
        </div>

        {/* Developer Identities Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {developers.map((dev) => (
            <div
              key={dev.name}
              className="group relative bg-[#10131a] hover:bg-[#131722] border border-white/[0.08] hover:border-amber-400/30 rounded-lg p-5 sm:p-6 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400/50 group-hover:bg-amber-400 transition-colors" />
                  <span className="text-[11px] font-mono tracking-wide text-amber-300/80 group-hover:text-amber-200 transition-colors">
                    {dev.roleHint}
                  </span>
                </div>
                <h2 className="font-serif-legal text-xl sm:text-2xl font-semibold text-slate-100 mb-1 tracking-tight group-hover:text-white transition-colors">
                  {dev.name}
                </h2>
              </div>

              <div className="pt-3 mt-3 border-t border-white/[0.06]">
                <div className="text-xs font-mono tracking-wide text-slate-300 font-medium">
                  {dev.credential}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Assignment & Academic Information Panel */}
        <div className="w-full bg-[#0d1017] border border-white/[0.08] rounded-lg p-5 sm:p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-center">
            {/* Left Block: Assignment details */}
            <div className="space-y-1.5 md:border-r md:border-white/[0.08] md:pr-6">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-amber-300/80 shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
                  Assignment 1 — Task 1
                </span>
              </div>
              <p className="text-sm font-medium text-slate-200">
                <span className="text-slate-400">Subject: </span>
                <span className="font-semibold text-white">Agentic AI</span>
              </p>
              <p className="text-xs text-slate-400">
                <span className="text-slate-400">Instructor: </span>
                <span className="text-slate-300 font-medium">Ms Afia</span>
              </p>
            </div>

            {/* Right Block: University details */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-4 h-4 text-amber-300/80 shrink-0" />
                <h3 className="font-serif-legal text-base font-semibold text-white tracking-wide">
                  Riphah International University
                </h3>
              </div>
              <p className="text-xs font-mono text-slate-400 pl-6">
                G-7, Islamabad
              </p>
            </div>
          </div>
        </div>

        {/* Primary Action Button: Enter Platform */}
        <div className="flex flex-col items-center">
          <button
            onClick={onEnter}
            type="button"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-slate-100 hover:bg-white text-slate-950 font-semibold text-sm tracking-wide rounded-md transition-all duration-150 hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] active:scale-[0.99] cursor-pointer"
          >
            <span>Enter Platform</span>
            <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-slate-950 group-hover:translate-x-0.5 transition-all duration-150" />
          </button>
        </div>
      </main>

      {/* Institutional Legal Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-6 py-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          &copy; {new Date().getFullYear()} JurisNet. Verified Legal Professional Network.
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span>Enterprise Confidentiality</span>
          <span>&middot;</span>
          <span>Privilege Safeguarded</span>
        </div>
      </footer>
    </div>
  );
};
