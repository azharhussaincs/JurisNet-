import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Check,
  MapPin,
  Scale,
  Search,
  ExternalLink,
  Compass,
  X,
} from 'lucide-react';
import { Lawyer, ConnectionItem } from '../../types/index.ts';

interface NetworkViewProps {
  connections: ConnectionItem[];
  onAcceptConnection: (lawyerId: string) => void;
  onDeclineConnection: (lawyerId: string) => void;
  onRemoveConnection: (lawyerId: string) => void;
  onViewLawyerProfile: (lawyer: Lawyer) => void;
  onNavigateToDiscover?: () => void;
}

export const NetworkView: React.FC<NetworkViewProps> = ({
  connections,
  onAcceptConnection,
  onDeclineConnection,
  onRemoveConnection,
  onViewLawyerProfile,
  onNavigateToDiscover,
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const pendingReceived = connections.filter((c) => c.status === 'pending_received');
  const activeConnections = connections.filter((c) => c.status === 'connected');

  const filteredActive = activeConnections.filter((item) => {
    if (!searchFilter.trim()) return true;
    const query = searchFilter.toLowerCase();
    return (
      item.lawyer.name.toLowerCase().includes(query) ||
      item.lawyer.firmOrChambers.toLowerCase().includes(query) ||
      item.lawyer.practiceAreas.some((p) => p.toLowerCase().includes(query)) ||
      item.lawyer.location.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
      {/* Top Banner & Network Metrics */}
      <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div>
            <h1 className="font-serif-legal text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Professional Colleague Network
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Verified legal practitioners, advocates, and jurists in your active network.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 bg-white/[0.03] border border-white/[0.08] rounded-md text-center">
              <span className="block text-lg font-mono font-bold text-amber-200">
                {activeConnections.length}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Connected
              </span>
            </div>

            <div className="px-3.5 py-2 bg-white/[0.03] border border-white/[0.08] rounded-md text-center">
              <span className="block text-lg font-mono font-bold text-slate-200">
                {pendingReceived.length}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Invitations
              </span>
            </div>
          </div>
        </div>

        {/* Search within connected colleagues */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative max-w-md w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by name, practice area, or firm..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearchFilter('');
                }
              }}
              aria-label="Filter connected colleagues"
              className="w-full bg-[#0a0c10] border border-white/[0.08] focus:border-amber-400/50 text-slate-200 placeholder:text-slate-500 text-xs pl-8 pr-8 py-2 rounded-md focus:outline-none transition-colors"
            />
            {searchFilter && (
              <button
                type="button"
                onClick={() => setSearchFilter('')}
                aria-label="Clear filter input"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Showing {filteredActive.length} of {activeConnections.length} colleagues
          </span>
        </div>
      </div>

      {/* PENDING INVITATIONS SECTION */}
      {pendingReceived.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-legal text-lg font-semibold text-white flex items-center gap-2">
              <span>Pending Connection Inquiries</span>
              <span className="px-2 py-0.5 bg-amber-400/10 text-amber-300 font-mono text-xs rounded border border-amber-400/20">
                {pendingReceived.length}
              </span>
            </h2>
            <span className="text-xs text-slate-400">
              Awaiting your professional review
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingReceived.map((item) => (
              <div
                key={item.lawyer.id}
                className="bg-[#10131a] border border-amber-400/25 rounded-lg p-5 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <button
                      type="button"
                      onClick={() => onViewLawyerProfile(item.lawyer)}
                      className="flex items-start gap-3 text-left group cursor-pointer"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-medium border shrink-0 ${item.lawyer.avatarColor}`}
                      >
                        {item.lawyer.avatarInitials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif-legal text-base font-semibold text-slate-100 group-hover:text-amber-200 transition-colors">
                            {item.lawyer.name}
                          </h3>
                          {item.lawyer.isVerified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400">
                          {item.lawyer.title}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {item.lawyer.firmOrChambers}
                        </p>
                      </div>
                    </button>

                    <span className="text-[10px] font-mono text-amber-300/80 bg-amber-400/[0.08] border border-amber-400/20 px-2 py-0.5 rounded shrink-0">
                      {item.lawyer.barNumber}
                    </span>
                  </div>

                  {item.note && (
                    <div className="bg-[#0b0e14] border border-white/[0.06] rounded-md p-2.5 text-xs text-slate-300 italic mb-4">
                      &ldquo;{item.note}&rdquo;
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.lawyer.practiceAreas.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] text-slate-300 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions: Accept or Decline */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onDeclineConnection(item.lawyer.id)}
                    className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.06] rounded-md border border-white/[0.08] transition-colors cursor-pointer"
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    onClick={() => onAcceptConnection(item.lawyer.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-slate-100 hover:bg-white active:bg-slate-200 text-slate-950 text-xs font-semibold rounded-md transition-all cursor-pointer shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept Connection</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ACTIVE CONNECTIONS DIRECTORY */}
      <section className="space-y-4">
        <h2 className="font-serif-legal text-lg font-semibold text-white">
          Active Colleagues ({filteredActive.length})
        </h2>

        {activeConnections.length === 0 ? (
          <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-10 text-center space-y-3">
            <Users className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="font-serif-legal text-lg font-medium text-slate-200">
              No connections yet
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Build your verified legal network by connecting with colleagues, co-counsel, and specialist barristers.
            </p>
            {onNavigateToDiscover && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateToDiscover}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs rounded-md transition-all cursor-pointer shadow-sm"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Discover Lawyers</span>
                </button>
              </div>
            )}
          </div>
        ) : filteredActive.length === 0 ? (
          <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-8 text-center space-y-3">
            <Search className="w-7 h-7 text-slate-500 mx-auto" />
            <p className="text-sm text-slate-200 font-medium">
              No colleagues match &ldquo;{searchFilter}&rdquo;
            </p>
            <p className="text-xs text-slate-400">
              Check spelling or try searching by practice domain or location.
            </p>
            <button
              type="button"
              onClick={() => setSearchFilter('')}
              className="px-3.5 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-amber-200 border border-white/[0.1] rounded-md text-xs transition-colors cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredActive.map((item) => (
              <div
                key={item.lawyer.id}
                className="bg-[#10131a] border border-white/[0.08] hover:border-white/[0.14] rounded-lg p-5 flex flex-col justify-between transition-colors shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <button
                      type="button"
                      onClick={() => onViewLawyerProfile(item.lawyer)}
                      className="flex items-start gap-3 text-left group cursor-pointer"
                    >
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-mono font-medium border shrink-0 ${item.lawyer.avatarColor}`}
                      >
                        {item.lawyer.avatarInitials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif-legal text-base font-semibold text-slate-100 group-hover:text-amber-200 transition-colors">
                            {item.lawyer.name}
                          </h3>
                          {item.lawyer.isVerified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400">
                          {item.lawyer.title}
                        </p>
                        <p className="text-[11px] text-amber-300/80 font-mono mt-0.5">
                          {item.lawyer.firmOrChambers}
                        </p>
                      </div>
                    </button>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-slate-400 block">
                        {item.connectedDate ? `Since ${item.connectedDate}` : 'Connected'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{item.lawyer.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{item.lawyer.jurisdiction}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.lawyer.practiceAreas.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] text-slate-300 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => onViewLawyerProfile(item.lawyer)}
                    className="text-amber-300 hover:text-amber-200 font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemoveConnection(item.lawyer.id)}
                    className="text-slate-500 hover:text-rose-400 text-xs transition-colors cursor-pointer"
                    title="Remove from your professional network"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
