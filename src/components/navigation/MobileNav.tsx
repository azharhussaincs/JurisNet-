import React from 'react';
import { Home, Users, Compass, User } from 'lucide-react';
import { NavSection } from '../../types/index.ts';

interface MobileNavProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentSection,
  onSelectSection,
}) => {
  const items: { id: NavSection; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c0e14]/95 backdrop-blur-lg border-t border-white/[0.08] px-3 py-1.5 flex items-center justify-around safe-area-bottom shadow-lg"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectSection(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center min-h-[44px] min-w-[56px] py-1 px-2 rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50 ${
              isActive
                ? 'text-amber-200 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-amber-300' : ''}`} />
            <span className="text-[10px] tracking-wide">
              {item.label}
            </span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-amber-400 mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
