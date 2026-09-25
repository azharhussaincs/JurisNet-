import React from 'react';
import { Scale, Home, User, Users, Compass, Search, ArrowLeft, X } from 'lucide-react';
import { NavSection, Lawyer } from '../../types/index.ts';

interface TopNavProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  currentUser: Lawyer;
  onBackToIntro: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onViewLawyerProfile?: (lawyer: Lawyer) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentSection,
  onSelectSection,
  currentUser,
  onBackToIntro,
  searchQuery,
  onSearchChange,
  onViewLawyerProfile,
}) => {
  const navItems: { id: NavSection; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'discover', label: 'Discover Lawyers', icon: Compass },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0c10]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Wordmark & Search */}
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <button
            type="button"
            onClick={() => onSelectSection('home')}
            className="flex items-center gap-3 shrink-0 cursor-pointer group text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50 rounded"
          >
            <div className="w-8 h-8 rounded border border-amber-400/30 bg-amber-400/[0.06] group-hover:bg-amber-400/[0.1] flex items-center justify-center text-amber-200 shadow-sm transition-colors">
              <Scale className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif-legal text-xl font-medium tracking-tight text-white group-hover:text-amber-100 transition-colors">
                JurisNet
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-amber-300/70 -mt-1">
                Legal Network
              </span>
            </div>
          </button>

          {/* Quick Search */}
          <div className="relative max-w-xs w-full hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search counsel, practice, jurisdiction..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentSection !== 'discover' && e.target.value.trim().length > 0) {
                  onSelectSection('discover');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && currentSection !== 'discover') {
                  onSelectSection('discover');
                }
                if (e.key === 'Escape') {
                  onSearchChange('');
                }
              }}
              aria-label="Search legal network"
              className="w-full bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] text-slate-200 placeholder:text-slate-500 text-xs pl-8 pr-7 py-1.5 rounded-md border border-white/[0.08] focus:border-amber-400/40 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Primary Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50 ${
                  isActive
                    ? 'bg-white/[0.1] text-white border border-white/[0.12] shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Zone: Return to Developer Group & User Profile Badge */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Return to Developer Group Button */}
          <button
            onClick={onBackToIntro}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50"
            title="Return to Developer Group Introduction"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px] hidden sm:inline">Developer Group</span>
            <span className="font-mono text-[11px] sm:hidden">Intro</span>
          </button>

          <div className="w-[1px] h-4 bg-white/[0.08] hidden sm:block" />

          {/* User Quick Profile Button */}
          <button
            type="button"
            onClick={() => {
              if (onViewLawyerProfile) {
                onViewLawyerProfile(currentUser);
              } else {
                onSelectSection('profile');
              }
            }}
            className="flex items-center gap-2.5 pl-1.5 py-1 pr-2 rounded-md hover:bg-white/[0.04] transition-colors cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50"
            aria-label="View your counsel profile"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-medium border ${currentUser.avatarColor}`}>
              {currentUser.avatarInitials}
            </div>
            <div className="hidden lg:block text-left leading-tight">
              <p className="text-xs font-medium text-slate-200 truncate max-w-[120px]">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-amber-300/80 font-mono">
                {currentUser.barNumber}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
