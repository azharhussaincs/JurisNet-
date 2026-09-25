import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  MapPin,
  Users,
  Scale,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Lawyer, ConnectionItem } from '../../types/index.ts';
import { ConnectionButton } from '../common/ConnectionButton.tsx';

interface DiscoverLawyersViewProps {
  lawyers: Lawyer[];
  connections: ConnectionItem[];
  onConnect: (lawyer: Lawyer) => void;
  onViewProfile: (lawyer: Lawyer) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const DiscoverLawyersView: React.FC<DiscoverLawyersViewProps> = ({
  lawyers,
  connections,
  onConnect,
  onViewProfile,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedPractice, setSelectedPractice] = useState('All');

  const practices = [
    'All',
    'Appellate Advocacy',
    'Commercial Chancery',
    'Antitrust Litigation',
    'White Collar Defense',
    'IP & Patents',
    'Constitutional Law',
    'Energy & Cross-Border',
  ];

  const filteredLawyers = lawyers.filter((lawyer) => {
    // Practice filter
    if (selectedPractice !== 'All') {
      const hasPractice = lawyer.practiceAreas.some(
        (p) => p.toLowerCase().includes(selectedPractice.toLowerCase())
      );
      if (!hasPractice) return false;
    }

    // Search query
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      lawyer.name.toLowerCase().includes(q) ||
      lawyer.firmOrChambers.toLowerCase().includes(q) ||
      lawyer.title.toLowerCase().includes(q) ||
      lawyer.jurisdiction.toLowerCase().includes(q) ||
      lawyer.location.toLowerCase().includes(q) ||
      lawyer.practiceAreas.some((p) => p.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
      {/* Header & Search Bar */}
      <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-2">
            Professional Colleague Directory
          </p>
          <h1 className="font-serif-legal text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Discover Legal Practitioners
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Expand your professional network across federal appellate circuits, international arbitral institutions, and specialist chancery courts.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by advocate name, law firm, practice domain, or court admission..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  onSearchChange('');
                }
              }}
              aria-label="Search legal practitioners"
              className="w-full bg-[#0a0c10] border border-white/[0.1] focus:border-amber-400/50 text-slate-200 placeholder:text-slate-500 text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-md focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search input"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="px-3.5 py-2.5 text-xs text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-md border border-white/[0.08] transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Practice Filter Tags */}
        <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-mono text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            <span>Practice:</span>
          </span>
          {practices.map((practice) => {
            const isSelected = selectedPractice === practice;
            return (
              <button
                key={practice}
                type="button"
                onClick={() => setSelectedPractice(practice)}
                className={`text-xs px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400/[0.14] text-amber-200 border border-amber-400/35 font-medium shadow-sm'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border border-white/[0.06]'
                }`}
              >
                {practice}
              </button>
            );
          })}
        </div>
      </div>

      {/* Discovery Results Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-slate-400">
            {filteredLawyers.length} Verified Counsel Available
          </span>
          {(searchQuery || selectedPractice !== 'All') && (
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                setSelectedPractice('All');
              }}
              className="text-xs text-amber-300 hover:text-amber-200 underline font-mono cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {filteredLawyers.length === 0 ? (
          <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-10 text-center space-y-3">
            <Scale className="w-8 h-8 text-slate-500 mx-auto" />
            <h2 className="font-serif-legal text-lg font-medium text-slate-200">
              No counsel found
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              No legal practitioners matched your query &ldquo;{searchQuery || selectedPractice}&rdquo;. Try adjusting your keywords or clearing filters.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onSearchChange('');
                  setSelectedPractice('All');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs rounded-md transition-all cursor-pointer shadow-sm"
              >
                Clear Search & Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLawyers.map((lawyer) => {
              const isConnected = connections.some(
                (c) => c.lawyer.id === lawyer.id && c.status === 'connected'
              );
              const isPending = connections.some(
                (c) => c.lawyer.id === lawyer.id && c.status === 'pending_sent'
              );

              return (
                <div
                  key={lawyer.id}
                  className="bg-[#10131a] border border-white/[0.08] hover:border-white/[0.14] rounded-lg p-5 flex flex-col justify-between transition-colors shadow-sm"
                >
                  <div>
                    {/* Top Roster Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-mono font-medium border ${lawyer.avatarColor}`}
                      >
                        {lawyer.avatarInitials}
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-amber-200/90 bg-amber-400/[0.06] border border-amber-400/20 px-2 py-0.5 rounded">
                          {lawyer.barNumber}
                        </span>
                      </div>
                    </div>

                    {/* Lawyer Name & Title */}
                    <div className="mb-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onViewProfile(lawyer)}
                          className="font-serif-legal text-base sm:text-lg font-semibold text-slate-100 hover:text-amber-200 transition-colors text-left cursor-pointer"
                        >
                          {lawyer.name}
                        </button>
                        {lawyer.isVerified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                        {lawyer.title}
                      </p>
                      <p className="text-[11px] font-mono text-amber-300/80 mt-1">
                        {lawyer.firmOrChambers}
                      </p>
                    </div>

                    {/* Metadata: Location & Admissions */}
                    <div className="space-y-1 text-xs text-slate-400 mb-3.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{lawyer.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{lawyer.jurisdiction}</span>
                      </div>
                    </div>

                    {/* Bio Excerpt */}
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4 font-sans-legal">
                      {lawyer.bio}
                    </p>

                    {/* Practice Area Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {lawyer.practiceAreas.slice(0, 2).map((p) => (
                        <span
                          key={p}
                          className="text-[10px] text-slate-300 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded"
                        >
                          {p}
                        </span>
                      ))}
                      {lawyer.practiceAreas.length > 2 && (
                        <span className="text-[10px] text-slate-500 font-mono self-center">
                          +{lawyer.practiceAreas.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions & Connection Metrics */}
                  <div className="pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Users className="w-3 h-3 text-slate-500" />
                        <span>{lawyer.connectionsCount} Colleagues</span>
                      </span>
                      {lawyer.mutualConnections > 0 && (
                        <span className="text-[11px] text-amber-300/80 font-mono">
                          {lawyer.mutualConnections} Mutual
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onViewProfile(lawyer)}
                        className="flex-1 py-1.5 px-3 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-semibold rounded-md border border-white/[0.08] transition-colors text-center cursor-pointer"
                      >
                        Profile
                      </button>

                      <ConnectionButton
                        status={
                          isConnected
                            ? 'connected'
                            : isPending
                            ? 'pending'
                            : 'not_connected'
                        }
                        onConnect={() => onConnect(lawyer)}
                        size="sm"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
